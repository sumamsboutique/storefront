import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'production',
    service: "Sumam's Boutique",
  }

  return NextResponse.json(healthData, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
