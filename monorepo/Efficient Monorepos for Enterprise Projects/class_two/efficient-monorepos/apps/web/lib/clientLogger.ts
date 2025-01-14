// lib/clientLogger.ts
const log = async (level: 'info' | 'error', message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console[level](message);
  } else {
    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, message }),
      });
    } catch (error) {
      console.error('Logging failed:', error);
    }
  }
};

const clientLogger = {
  info: (msg: string) => log('info', msg),
  error: (msg: string) => log('error', msg),
};

export default clientLogger;
