import logger from "../logger";

/**
 * Validates if a redirect URL is a safe local URL
 * @param url - The URL to validate (must be a local path starting with /)
 * @returns The validated local URL or undefined if invalid
 */
export function validateRedirectUrl(url: string | undefined): string | undefined {
    if (!url) {
        return undefined;
    }

    // Only allow local URLs that start with '/'
    if (!url.startsWith('/')) {
        logger.warn('Redirect URL rejected - must be a local path starting with /: ' + url);
        return undefined;
    }

    // Block dangerous patterns and schemes
    if (url.includes('//') ||
        url.startsWith('javascript:') ||
        url.startsWith('data:') ||
        url.startsWith('vbscript:') ||
        url.startsWith('file:')) {
        console.warn('Redirect URL rejected - contains dangerous pattern:', url);
        return undefined;
    }

    return url;
}