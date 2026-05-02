import { NextResponse } from 'next/server'

export async function GET() {
  const kumaUrl = process.env.UPTIME_KUMA_URL
  const slug = process.env.UPTIME_KUMA_SLUG
  const fullUrl = `${kumaUrl}/api/status-page/${slug}`
  
  console.log('KUMA fetch URL:', fullUrl)

  const res = await fetch(fullUrl, { cache: 'no-store' })
  
  console.log('KUMA response status:', res.status)
  console.log('KUMA content-type:', res.headers.get('content-type'))

  const data = await res.json()
  return NextResponse.json(data)
}