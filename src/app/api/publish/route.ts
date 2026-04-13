import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO  = process.env.GITHUB_REPO
const FILE_PATH    = 'neozap-data.json'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS })
}

export async function POST(req: NextRequest) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'Missing GitHub env vars' }, { status: 500, headers: CORS })
  }

  try {
    const data = await req.json()

    // Clean — strip base64 images, keep only URLs
    const cleaned = {
      ...data,
      cards: (data.cards || []).map((card: Record<string, unknown>) => ({
        ...card,
        imgCol:  isDataURI(card.imgCol)  ? null : card.imgCol,
        imgChip: isDataURI(card.imgChip) ? null : card.imgChip,
        imgBack: isDataURI(card.imgBack) ? null : card.imgBack,
        colors: ((card.colors as Record<string, unknown>[]) || []).map((c: Record<string, unknown>) => ({
          hex: c.hex, name: c.name,
        })),
      })),
    }

    const jsonString = JSON.stringify(cleaned)
    const content = Buffer.from(jsonString).toString('base64')

    const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`
    const ghHeaders = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    }

    // Get existing SHA
    let sha: string | undefined
    const getRes = await fetch(fileUrl, { headers: ghHeaders })
    if (getRes.ok) {
      const existing = await getRes.json()
      sha = existing.sha
    }

    const putRes = await fetch(fileUrl, {
      method: 'PUT',
      headers: ghHeaders,
      body: JSON.stringify({
        message: `Admin publish — ${new Date().toISOString()}`,
        content,
        ...(sha ? { sha } : {}),
      }),
    })

    if (!putRes.ok) {
      const err = await putRes.json()
      return NextResponse.json({ error: err }, { status: 500, headers: CORS })
    }

    const sizeMB = Buffer.byteLength(jsonString) / (1024 * 1024)
    return NextResponse.json({
      success: true,
      cards: cleaned.cards.length,
      sizeMB: sizeMB.toFixed(2),
    }, { headers: CORS })

  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500, headers: CORS })
  }
}

function isDataURI(val: unknown): boolean {
  return typeof val === 'string' && val.startsWith('data:')
}
