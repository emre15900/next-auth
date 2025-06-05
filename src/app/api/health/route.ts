import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
      status: 'healthy'
    };

    return NextResponse.json(healthcheck, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        message: 'Service is not healthy',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
} 