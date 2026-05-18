import { NextRequest } from 'next/server'

const FUNNEL_URL = 'https://tpg-funnel.alwaysencrypted.com/gumroad-purchase'
const SHARED_SECRET = process.env.GUMROAD_WEBHOOK_SECRET || ''

/**
 * Gumroad sends form-urlencoded sale pings. Configure in Gumroad:
 *   Settings -> Advanced -> Ping URL
 *     https://training.theproblemguide.com/api/gumroad/webhook?secret=YOUR_SECRET
 */
export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const secret = url.searchParams.get('secret') || ''
  if (SHARED_SECRET && secret !== SHARED_SECRET) {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }

  let payload: Record<string, string> = {}
  const ct = req.headers.get('content-type') || ''
  try {
    if (ct.includes('application/json')) {
      payload = await req.json()
    } else {
      const text = await req.text()
      for (const pair of text.split('&')) {
        const [k, v] = pair.split('=')
        if (k) payload[decodeURIComponent(k)] = decodeURIComponent((v || '').replace(/\+/g, ' '))
      }
    }
  } catch {
    return Response.json({ error: 'bad body' }, { status: 400 })
  }

  // Forward to funnel which sends the onboarding-link email
  try {
    await fetch(FUNNEL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        buyer_email: payload.email,
        buyer_name: payload.full_name || payload.purchaser_full_name,
        product_id: payload.product_id,
        product_permalink: payload.product_permalink,
        sale_id: payload.sale_id,
        price: payload.price,
        raw: payload,
      }),
    })
  } catch (_) {
    // best-effort -- still ack to Gumroad
  }

  return Response.json({ ok: true })
}
