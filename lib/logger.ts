type LogLevel = 'info' | 'warn' | 'error' | 'debug';
type LogMeta = Record<string, unknown>;

interface Logger {
    info: (message: string, meta?: LogMeta) => void;
    warn: (message: string, meta?: LogMeta) => void;
    error: (message: string, meta?: LogMeta) => void;
    debug: (message: string, meta?: LogMeta) => void;
}

const colors: Record<string, string> = {
    info: '\x1b[36m', // cyan
    warn: '\x1b[33m', // yellow
    error: '\x1b[31m', // red
    debug: '\x1b[35m', // magenta
    reset: '\x1b[0m',  // reset color
};

function getTimestamp(): string {
    const now = new Date();
    return now.toISOString();
}

function formatMessage(level: LogLevel, message: string, meta: LogMeta = {}): string {
    const timestamp = getTimestamp();
    const color = colors[level] || colors.reset;

    // Format meta object if it exists
    let metaStr = '';
    if (Object.keys(meta).length > 0) {
        metaStr = ` ${JSON.stringify(meta)}`;
    }

    return `${color}[${timestamp}] [${level.toUpperCase()}]${colors.reset} ${message}${metaStr}`;
}

const logger: Logger = {
    info: (message: string, meta?: LogMeta): void => {
        console.log(formatMessage('info', message, meta));
    },

    warn: (message: string, meta?: LogMeta): void => {
        console.warn(formatMessage('warn', message, meta));
    },

    error: (message: string, meta?: LogMeta): void => {
        console.error(formatMessage('error', message, meta));
    },

    debug: (message: string, meta?: LogMeta): void => {
        if (process.env.NODE_ENV !== 'production') {
            console.debug(formatMessage('debug', message, meta));
        }
    }
};

export default logger;