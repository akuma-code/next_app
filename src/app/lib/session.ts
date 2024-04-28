import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import prisma from '../../../prisma/client/client'


const secretKey = process.env.AUTH_SECRET
const encodeKey = new TextEncoder().encode(secretKey)

type SessionPayload = {
    userId: string
    expiresAt: Date
}
export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodeKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodeKey, {
            algorithms: ['HS256']
        })
        return payload
    } catch (e) {
        console.log('failed to verify session')
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })
    try {
        cookies().set(
            'session', session, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/'
        }
        )
    } catch (error) {
        console.log("Cookie error: ", error)
    }

    return await prisma.userSession.create({ data: { userId } })

}