import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { auth, UserAuthPayload } from './auth'
import bcrypt from "bcrypt"
import { _log } from '@/Helpers/helpersFns'
import { UserRole } from '@prisma/client'


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


export async function hashPass(password: string) {
    return await bcrypt.hash(password, 5)
}
export function hashPassSync(password: string) {
    return bcrypt.hashSync(password, 5)
}

export async function hashCompare(pass: string, compareWith: string) {
    return await bcrypt.compare(pass, compareWith)
}

