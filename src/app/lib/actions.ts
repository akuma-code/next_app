'use server'
import { AuthError } from 'next-auth';
import { auth, signIn } from '../../../auth';
import prisma from '../../../prisma/client/client';
import { Prisma, UserRoles } from '@prisma/client';
import { redirect } from 'next/navigation';
import { pageUrl } from '@/paths';
import { createSession } from './session';
import { createUser } from './userService';

// ...

export async function authenticate(
    prevState: any,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);

        // await createSession(id)
        // return formData
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return new Error('Invalid credentials.')

                default:
                    return new Error('Something went wrong.')
            }
        }
        console.log("AUTH ERROR: ", error)
        // throw new Error('Something went wrong while auth')
    }
}
type CreateFormState = {
    nickname: string
    password: string
    error?: string | null
    role?: UserRoles
    id?: string
} | undefined
export async function register(
    prev: any,
    formdata: FormData
) {
    const nickname = formdata.get('nickname')
    const password = formdata.get('password')
    if (!nickname || !password) return
    try {
        // const user = await prisma.user.create({
        //     data: { nickname: nick as string, password: pass as string }
        // })
        const validatedInputs = validateCreateFields(nickname as string, password as string)
        const new_user = await createUser(validatedInputs)

        return new_user

    } catch (error) {
        // if (error instanceof AuthError) {
        //     switch (error.type) {
        //         case 'CredentialsSignin':
        //             return 'Invalid credentials.';

        //         default:
        //             return 'Something went wrong.';
        //     }
        // }
        console.log(error)
        throw new Error("Register error")
    }
}


const userNickName = Prisma.validator<Prisma.UserSelect>()({
    nickname: true
})

const validateCreateFields = (
    nickname: string,
    password: string,

) => {
    return Prisma.validator<Prisma.UserCreateInput>()({
        nickname,
        password,

    })
}

const findUser = (nickname: string) => {
    return Prisma.validator<Prisma.UserWhereInput>()({
        nickname
    })
}