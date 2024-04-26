import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { User } from '@prisma/client';
import prisma from './prisma/client/client';
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials, req) {
                const { nickname, password, role } = credentials
                if (typeof password === 'string' && typeof nickname === 'string') {

                    const user = await getUser(nickname)
                    if (!user) return null
                    if (password === user?.password) return user
                    return null
                }
                console.log('Invalid credentials');
                return null
            }
        }),

    ],
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