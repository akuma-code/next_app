import 'server-only'
import { cache } from 'react'
import { auth } from './auth'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export const verifySession = cache(async () => {
    //   const cookie = cookies().get('session')?.value
    const session = await auth()

    if (!session) {
        console.error("NO SESSION FOUND")
        // redirect('/api/auth/login')
        return { isAuth: false, user: null, role: null }
    }

    return { isAuth: true, user: session.user, role: session.user.role }
})

