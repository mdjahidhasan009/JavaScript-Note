import { NextRequest, NextResponse } from 'next/server';
import logger, { LogLevel } from '../../../lib/logger';



export async function POST(request: NextRequest) {
  const { level, message }: { level: LogLevel; message: string } = await request.json();
  if (logger[level]) {
    logger[level](message);
  } 
    logger.info(message);
  
  return NextResponse.json({ status: 'Logged' });
}
