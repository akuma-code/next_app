import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import prisma from '../../../prisma/client/client'
import { getUser } from '../../../auth'
import { User } from '@prisma/client'


const secretKey = process.env.AUTH_SECRET
const encodeKey = new TextEncoder().encode(secretKey)

type SessionPayload = {
    userUuid: string
    expiresAt: Date
    name: string
}
export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encodeKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodeKey, {
            algorithms: ['HS256']
        })
        return payload
    } catch (e) {
        console.log('failed to verify session', e)

    }
}

export async function createSession(userUuid: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const user = await prisma.user.findUnique({ where: { uuid: userUuid } })
    if (!user) throw new Error("User not found")
    const session = await encrypt({ userUuid, expiresAt, name: user.nickname })
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

        return await prisma.userSession.create({ data: { userUuid, userName: user.nickname } })
    } catch (error) {
        throw new Error("Create session error")
    }


}

export async function verifySession(uuid: string) {
    const s = cookies().get('session')
    const decripted = await decrypt((s?.value))!
    const duuid = decripted?.userUuid
    console.log("decrypted: ", decripted)
    console.log("verified: ", duuid === uuid)
    return duuid === uuid

}