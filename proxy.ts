import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { OTP_ROUTES, PUBLIC_ROUTES, auth } from "@/auth"
import { removeLocaleFromPath } from './lib/remove-locale-from-path';
import { routing } from './i18n/routing';
import logger from './lib/logger';

const intlMiddleware = createMiddleware(routing);


const authMiddleware = auth((req) => {
    const { nextUrl } = req;
    let { pathname } = nextUrl;
    const isLoggedIn = !!req.auth;

    // Generate nonce and set CSP headers
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    // In development, we can't use 'strict-dynamic' because Next.js static chunks don't have nonces
    // In production, we use strict-dynamic for better security
    const scriptSrc = process.env.NODE_ENV === "production"
        ? `'self' 'nonce-${nonce}' 'strict-dynamic'`
        : `'self' 'nonce-${nonce}' 'unsafe-eval'`;

    const cspHeader = `
    default-src 'self';
    connect-src 'self' http://statistiek.rijksoverheid.nl/ppms.php;
    script-src ${scriptSrc};
    style-src 'self' 'unsafe-inline';
    media-src 'self' https://www.rovid.nl;
    img-src 'self' http://statistiek.rijksoverheid.nl https://www.rovid.nl ${process.env.MAP_TILE_CSP_VALUES || ''} blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${process.env.NODE_ENV === "production" ? "upgrade-insecure-requests;" : ""}
  `;
    // // upgrade-insecure-requests;
    const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

    pathname = removeLocaleFromPath(pathname)

    const isPublicRoute = PUBLIC_ROUTES.some((route) => {
        if (route.exact) {
            return route.path === pathname;
        }
        return pathname.startsWith(route.path);
    });

    if (pathname === '/api/auth/session') {
        const redirectUrl = new URL(`/`, nextUrl);
        return Response.redirect(redirectUrl);
    }

    const isAPIRoute = pathname.startsWith('/api');

    logger.debug("middleware", { path: pathname, login: isLoggedIn, isPublicRoute, isAPIRoute });

    if (isAPIRoute) {
        return;
    }

    if (isPublicRoute) {
        const resp = intlMiddleware(req);

        // Merge headers from both responses
        const response = resp || NextResponse.next();
        response.headers.set('x-nonce', nonce);
        response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

        return response;
    }

    if (!isLoggedIn) {
        const currentURL = `${nextUrl.pathname}${nextUrl.search}`;
        const encodedURL = encodeURIComponent(currentURL);
        const redirectUrl = new URL(`/auth/login?redirectTo=${encodedURL}`, nextUrl.origin);
        return Response.redirect(redirectUrl);
    }

    const otpConfigForPath = OTP_ROUTES.find((route) => {
        if (route.exact) {
            return route.path === pathname;
        }
        return pathname.startsWith(route.path);
    });
    if (otpConfigForPath) {
        let requestOTP = true;
        const lastOTP = req.auth?.lastOTP;
        if (lastOTP !== null) {
            if (otpConfigForPath.types.includes('email')) {
                const lastEmailOTP = lastOTP?.email;
                if (lastEmailOTP && lastEmailOTP * 1000 > Date.now() - otpConfigForPath.maxAge * 1000) {
                    requestOTP = false;
                }
            }

            if (requestOTP && otpConfigForPath.types.includes('sms')) {
                const lastSMSOTP = lastOTP?.sms;
                if (lastSMSOTP && lastSMSOTP * 1000 > Date.now() - otpConfigForPath.maxAge * 1000) {
                    requestOTP = false;
                }
            }
        }

        if (requestOTP) {
            logger.debug('requesting OTP');
            const allowedOTPTypes = otpConfigForPath.types.join(',');
            const newSearchParams = new URLSearchParams(nextUrl.search);
            newSearchParams.set('types', allowedOTPTypes);
            newSearchParams.set('otpRedirect', nextUrl.pathname);

            const redirectUrl = new URL(`/auth/otp?${newSearchParams.toString()}`, nextUrl);
            return Response.redirect(redirectUrl);
        }
    }

    const resp = intlMiddleware(req);

    // Merge headers from both responses
    const response = resp || NextResponse.next();
    response.headers.set('x-nonce', nonce);
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

    return response;
})


export default function proxy(req: NextRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
    missing: [
        { type: "header", key: "next-action" },
    ],
};