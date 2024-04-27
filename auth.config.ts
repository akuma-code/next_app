
import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma/client/client';
export const authConfig = {
    pages: {
        signIn: '/api/auth',
        // newUser: '/view/users',
        // signOut: '/api/auth/logout'
    },
    // adapter: PrismaAdapter(prisma),
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            try {
                const isLoggedIn = !!auth?.user;
                const isOnDashboard = nextUrl.pathname.startsWith('/api/auth');
                if (isOnDashboard) {
                    if (isLoggedIn) return true;
                    return false; // Redirect unauthenticated users to login page
                } else if (isLoggedIn) {
                    return Response.redirect(new URL('/', nextUrl));
                }
                return true
            } catch (error) {
                console.log('authconfig error')
            }

        },
    },
    providers: []
} satisfies NextAuthConfig