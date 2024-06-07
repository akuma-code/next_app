import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { UserAuthPayload } from './auth'



const secretKey = process.env.AUTH_SECRET
const encodeKey = new TextEncoder().encode(secretKey)

type SessionPayload = {
    userUuid: string
    expiresAt: Date
    name: string
}


export async function encrypt(payload: UserAuthPayload) {
    console.log({ encodeKey })
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encodeKey)
}

export async function decrypt(user: string) {
    try {
        const { payload } = await jwtVerify(user, encodeKey, {
            algorithms: ['HS256']
        })
        console.log({ payload })
        return payload
    } catch (e) {
        console.log('failed to verify session', e)

    }
}