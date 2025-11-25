import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { fetchCASEParticipantAPI } from "./lib/server/case-backend"
import logger from "./lib/logger"
import "next-auth/jwt"

export const PUBLIC_ROUTES = [
    { path: '/', exact: true },

    { path: '/auth/login', exact: true },
    { path: '/auth/aanmelden', exact: true },
    { path: '/melden', exact: true },
    { path: '/auth/wachtwoord-vergeten', exact: true },

    // These routes and their children will be public:
    { path: '/algemeen', exact: false },
    { path: '/404', exact: false },
    { path: '/link', exact: false },
    { path: '/informatie', exact: false },
    { path: '/onderzoek', exact: false },
    { path: '/nieuws', exact: false },

]


type Route = {
    path: string;
    exact: boolean;
    types: string[];
    maxAge: number;
}

export const OTP_ROUTES: Array<Route> = [
    { path: '/settings/password', exact: true, types: ['email'], maxAge: 60 * 60 * 24, },
    { path: '/settings/email', exact: true, types: ['email'], maxAge: 60 * 60 * 24, },
    { path: '/settings/phone', exact: true, types: ['email'], maxAge: 60 * 60 * 24, },
    {
        path: '/dashboard/persoonlijke-gegevens', exact: false, types: process.env.NODE_ENV === 'development' ? ['email', 'sms'] : ['sms'],
        maxAge: 60 * 60 * 24,
    },
    /*{ path: '/dashboard/data', exact: false, types: ['sms'], maxAge: 60 * 60 * 24, },
    { path: '/dashboard', exact: false, types: ['email', 'sms'], maxAge: 60 * 60 * 24, },
    */
]

interface CredentialsUser extends User {
    tokenInfos: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        selectedProfile: string;
        lastOTP?: {
            sms?: number;
            email?: number;
        }
    }
    userInfos: {
        id: string;
        account: {
            accountID: string;
            accountConfirmedAt: number;
            preferredLanguage: string;
        }
        profiles: {
            id: string;
            avatarID: string;
            alias: string;
            mainProfile: boolean;
            createdAt: number;
        }[];
    }
}

type EmailPasswordCredentials = {
    email: string;
    password: string;
}

const authorizeCredentials = async (credentials: EmailPasswordCredentials) => {
    if (!credentials.email || !credentials.password) {
        throw new Error('Missing email or password');
    }

    // Simple login with email and password:
    const resp = await fetchCASEParticipantAPI(
        '/v1/auth/login',
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                instanceID: process.env.INSTANCE_ID,
            }),
            revalidate: 0,
        }
    )
    if (resp.status > 201) {
        throw new Error(`Error: ${resp.status} - ${resp.body.error}`);
    }
    const user = resp.body.user;
    const tokenInfos = resp.body.token;

    if (!user || !tokenInfos) {
        throw new Error("Unexpected response from server.")
    }

    return {
        id: user.id,
        email: user.account.accountID,
        image: user.profiles[0].avatarID,
        userInfos: user,
        tokenInfos,
    }
}

type OTPCredentials = {
    accessToken: string;
    otp: string;
}

const authorizeOTP = async (credentials: OTPCredentials) => {
    if (!credentials.accessToken || !credentials.otp) {
        throw new Error('Missing access token or OTP');
    }

    const resp = await fetchCASEParticipantAPI(
        '/v1/auth/otp/verify',
        credentials.accessToken,
        {
            method: 'POST',
            body: JSON.stringify({
                code: credentials.otp
            }),
            revalidate: 0,
        }
    )
    if (resp.status !== 200) {
        throw new Error(`Error: ${resp.status} - ${resp.body.error}`);
    }
    const user = resp.body.user;
    const tokenInfos = resp.body.token;

    if (!user || !tokenInfos) {
        throw new Error("Unexpected response from server.")
    }

    return {
        id: user.id,
        email: user.account.accountID,
        image: user.profiles[0].avatarID,
        userInfos: user,
        tokenInfos,
    }
}

type TempTokenCredentials = {
    tempToken: string;
    accessToken: string;
    password: string;
}

const authorizeTempToken = async (credentials: TempTokenCredentials) => {
    if (!credentials.tempToken) {
        throw new Error('Missing temp token');
    }

    const accessToken = credentials.accessToken;
    const password = credentials.password;

    const resp = await fetchCASEParticipantAPI(
        '/v1/auth/login-with-temptoken',
        undefined,
        {
            method: 'POST',
            revalidate: 0,
            body: JSON.stringify({
                tempToken: credentials.tempToken,
                password: password,
                accessToken: accessToken,
            })
        }
    )
    if (resp.status !== 200) {
        throw new Error(`Error: ${resp.status} - ${resp.body.error}`);
    }

    const user = resp.body.user;
    const tokenInfos = resp.body.token;

    if (!user || !tokenInfos) {
        throw new Error("Unexpected response from server.")
    }

    return {
        id: user.id,
        email: user.account.accountID,
        image: user.profiles[0].avatarID,
        userInfos: user,
        tokenInfos,
    }
}

type RefreshTokenCredentials = {
    refreshToken: string;
    accessToken: string;
}

const authorizeRefreshToken = async (credentials: RefreshTokenCredentials) => {
    if (!credentials.refreshToken) {
        throw new Error('Missing refresh token');
    }

    if (!credentials.accessToken) {
        throw new Error('Missing access token');
    }

    const accessToken = credentials.accessToken;
    const refreshToken = credentials.refreshToken;

    const resp = await fetchCASEParticipantAPI(
        '/v1/auth/token/renew',
        accessToken,
        {
            method: 'POST',
            revalidate: 0,
            body: JSON.stringify({
                refreshToken: refreshToken,
            })
        }
    )
    if (resp.status > 201) {
        logger.error('Error refreshing token: ' + JSON.stringify(resp))
        throw new Error(`Error: ${resp.status} - ${resp.body.error}`);
    }

    const user = resp.body.user;
    const tokenInfos = resp.body.token;

    if (!user || !tokenInfos) {
        throw new Error("Unexpected response from server.")
    }

    return {
        id: user.id,
        email: user.account.accountID,
        image: user.profiles[0].avatarID,
        userInfos: user,
        tokenInfos,
    }
}

const logoutSession = async (accessToken: string) => {
    const resp = await fetchCASEParticipantAPI(
        '/v1/auth/logout',
        accessToken,
        {
            method: 'POST',
            revalidate: 0,
        }
    )
    if (resp.status > 201) {
        logger.error('Error logging out: ' + JSON.stringify(resp))
        throw new Error(`Error: ${resp.status} - ${resp.body.error}`);
    }
    logger.info('Logged out session');

    return resp.body;
}

const credentialsProvider = Credentials({
    credentials: {
        type: {},
        email: {},
        password: {},
        // for OTP:
        accessToken: {},
        refreshToken: {},
        otp: {},
        // for login with token:
        tempToken: {},
    },
    authorize: async (credentials) => {
        switch (credentials.type) {
            case 'credentials':
                return await authorizeCredentials(credentials as EmailPasswordCredentials);
            case 'otp':
                return await authorizeOTP(credentials as OTPCredentials);
            case 'tempToken':
                return await authorizeTempToken(credentials as TempTokenCredentials);
            case 'refreshToken':
                return await authorizeRefreshToken(credentials as RefreshTokenCredentials);
            default:
                throw new Error(`Unknown credentials type: ${credentials.type}`);
        }
    }
})


export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/login',
    },
    providers: [
        credentialsProvider
    ],
    callbacks: {
        async jwt({ token, user, trigger }) {
            if (trigger === 'signIn') {
                if (!user) {
                    console.error('No user in jwt signIn callback')
                    return token
                }

                const currentUser = user as CredentialsUser

                token.accessToken = currentUser.tokenInfos.accessToken;
                token.refreshToken = currentUser.tokenInfos.refreshToken;
                token.expiresAt = Date.now() + currentUser.tokenInfos.expiresIn * 1000;
                token.accountConfirmed = currentUser.userInfos.account.accountConfirmedAt > 0;
                token.lastOTP = currentUser.tokenInfos.lastOTP;
                return token
            } else {
                if (token && token.expiresAt && token.expiresAt < Date.now()) {
                    console.log('Token expired, refreshing...')
                    const resp = await fetchCASEParticipantAPI(
                        '/v1/auth/token/renew',
                        token.accessToken,
                        {
                            method: 'POST',
                            revalidate: 0,
                            body: JSON.stringify({
                                refreshToken: token.refreshToken,
                            })
                        }
                    )
                    if (resp.status > 201) {
                        console.error('Error refreshing token', resp)
                        token.accessToken = undefined;
                        token.refreshToken = undefined;
                        token.expiresAt = undefined;
                        token.lastOTP = undefined;
                        token.accountConfirmed = false;
                        token.error = 'RefreshAccessTokenError'
                        return token
                    }

                    const newToken = resp.body.token;
                    const currentUser = resp.body.user;
                    token.accessToken = newToken.accessToken;
                    token.refreshToken = newToken.refreshToken;
                    token.expiresAt = Date.now() + newToken.expiresIn * 1000;
                    token.lastOTP = newToken.lastOTP;
                    token.accountConfirmed = currentUser.account.accountConfirmedAt > 0;
                    return token
                }
            }

            return token
        },
        async session({ session, token }) {
            if (token && token.accessToken) {
                return {
                    ...session,
                    CASE_API_accessToken: token.accessToken,
                    CASE_API_refreshToken: token.refreshToken,
                    accountConfirmed: token.accountConfirmed,
                    lastOTP: token.lastOTP,
                    user: {
                        ...session.user,
                        id: token.sub,
                    }
                };
            } else {
                session.user = {
                    id: '',
                    email: '',
                    emailVerified: new Date(0),
                    image: '',
                };
                delete session.CASE_API_accessToken;
                delete session.CASE_API_refreshToken;
                delete session.accountConfirmed;
                delete session.lastOTP;
            }

            // console.log('session token', { token })
            // console.log('session', { session })
            return session
        },
    },
    events: {
        async signOut(message) {
            if ('token' in message && message.token) {
                await logoutSession(message.token.accessToken ?? '')
            }
        }
    },
    logger: {
        // debug: (...args) => console.log(...args),
        error: (...args) => console.error(JSON.stringify({
            time: new Date().toISOString(),
            ...args[0]
        })),
        warn: (...args) => console.warn(JSON.stringify(args)),
    }
})

declare module "next-auth" {
    interface User {
        sub?: string;
        roles?: string[];
    }

    interface Session {
        CASE_API_accessToken?: string;
        CASE_API_refreshToken?: string;
        lastOTP?: {
            sms?: number;
            email?: number;
        }
        accountConfirmed?: boolean;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        accessToken?: string
        refreshToken?: string
        expiresAt?: number
        renewSessionAt?: number
        accountConfirmed?: boolean
        lastOTP?: {
            sms?: number;
            email?: number;
        }
        error?: "RefreshAccessTokenError" | "LoginFailed"
    }
}