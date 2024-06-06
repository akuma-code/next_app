// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import Credentials, { type CredentialInput } from 'next-auth/providers/credentials';
// import { User } from '@prisma/client';
// import prisma from './prisma/client/client';
// import { createSession } from '@/app/lib/session';
// import { redirect } from 'next/navigation';
// import { pageUrl } from '@/paths';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { validateUser } from '@/ClientComponents/MRT/MRT_Users/validators';
// export const { auth, signIn, signOut, handlers } = NextAuth({
//     adapter: PrismaAdapter(prisma),
//     ...authConfig,
//     providers: [
//         Credentials({
//             credentials: { nickname: {}, password: {} },
//             authorize: async (credentials) => {
//                 let user: User | null = null
//                 try {
//                     const { nickname, password } = credentials
//                     if (typeof nickname === 'string') {
//                         user = await getUser(nickname)
//                         if (!user) return null

//                         // if (!validateUser(credentials as User)) { throw new Error('Credential failure') }
//                         if (user.password === password as string) {
//                             const s = await createSession(user.uuid)

//                             return s
//                         } else {
//                             console.log("________Password incorrect!")
//                             throw new Error('Credential failure')
//                         }
//                     } else {
//                         // console.log('Credential failure')
//                         return null
//                     }
//                 } catch (error) {
//                     console.log('Invalid credentials: ');
//                     return null
//                     // throw new Error('Credential failure')
//                 }



//                 // } else {
//                 //     console.log('Invalid credentials');
//                 //     throw new Error('Credential failure')
//                 // }
//             }
//         }),

//     ],
//     debug: true

// });

// export async function getUser(nick: string): Promise<User | null> {
//     try {
//         const user = await prisma.user.findUnique({ where: { nickname: nick } })
//         return user
//     } catch (error) {
//         console.error('Failed to fetch user:', error);
//         throw new Error('Failed to fetch user.');
//     }
// }