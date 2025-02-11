import { NextResponse } from 'next/server'
import logger from '@/lib/logger'

export async function GET() {
  try {
    logger.info({ msg: 'Handling GET request', path: '/api/example' })
    
    // Your route logic here
    
    return NextResponse.json({ message: 'Success' })
  } catch (error) {
    logger.error({
      msg: 'Error in GET request',
      path: '/api/example',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}