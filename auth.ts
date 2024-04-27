import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials, { type CredentialInput } from 'next-auth/providers/credentials';
import { User } from '@prisma/client';
import prisma from './prisma/client/client';
import { createSession } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { pageUrl } from '@/paths';
import { PrismaAdapter } from '@auth/prisma-adapter';
export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials, req) {
                const { nickname, password, role } = credentials
                if (typeof password === 'string' && typeof nickname === 'string') {

                    const user = await getUser(nickname)
                    if (!user) return null
                    if (user.password) {
                        const s = await createSession(user.id)
                        // redirect(pageUrl.users)
                        return user
                    }

                    return null
                } else {
                    console.log('Invalid credentials');
                    throw new Error('Credential failure')
                    // return null
                }
            }
        }),

    ],
    // adapter: PrismaAdapter(prisma),
});

async function getUser(nick: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({ where: { nickname: nick } })
        return user
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}