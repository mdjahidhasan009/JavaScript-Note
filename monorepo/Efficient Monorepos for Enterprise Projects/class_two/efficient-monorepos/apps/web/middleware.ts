import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import logger from './lib/logger'

export function middleware(request: NextRequest) {
  const requestId = crypto.randomUUID()
  const start = Date.now()

  logger.info({
    requestId,
    url: request.url,
    method: request.method,
    msg: 'Incoming request'
  })

  const response = NextResponse.next()
  
  response.headers.set('x-request-id', requestId)

  const end = Date.now()
  const duration = end - start

  logger.info({
    requestId,
    duration,
    status: response.status,
    msg: 'Request completed'
  })

  return response
}