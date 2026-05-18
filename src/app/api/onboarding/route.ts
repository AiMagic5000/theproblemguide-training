import { NextRequest } from 'next/server'

const FUNNEL_URL = 'https://tpg-funnel.alwaysencrypted.com/onboarding'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const required = ['buyerName', 'buyerEmail', 'businessName', 'businessNiche', 'offerName', 'offerDescription', 'brandVoice', 'domainPref1', 'domainPref2', 'domainPref3', 'forwardPhone']
  for (const k of required) {
    if (!body[k] || String(body[k]).trim() === '') {
      return Response.json({ error: `Missing required field: ${k}` }, { status: 400 })
    }
  }

  // Store in Supabase
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/onboarding_submissions`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        buyer_name: body.buyerName,
        buyer_email: body.buyerEmail,
        gumroad_order_id: body.gumroadOrderId || null,
        payload: body,
        created_at: new Date().toISOString(),
      }),
    })
  } catch (_) {
    // best-effort
  }

  // Notify via funnel (email to xscore10 + buyer ack)
  try {
    const r = await fetch(FUNNEL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!r.ok) {
      const txt = await r.text().catch(() => '')
      return Response.json({ error: 'Notify failed', details: txt }, { status: 502 })
    }
  } catch (e: any) {
    return Response.json({ error: 'Funnel unreachable', details: e?.message }, { status: 502 })
  }

  return Response.json({ ok: true })
}
