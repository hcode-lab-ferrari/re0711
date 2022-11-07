import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
    password: String(process.env.SECRET_COOKIE_PASSWORD),
    cookieName: 'ferrari-hcodelab/iron-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
}

declare module 'iron-session' {
    interface IronSessionData {
        token: string;
    }
}