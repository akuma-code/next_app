'use server'

import { signIn } from "@/auth/auth"
import { _log } from "@/Helpers/helpersFns"
import { getOneUserByEmail } from "@/Services/userService"
import { AuthError } from "next-auth"

interface LoginError {
    message?: string
    callbackUrl?: string
}
export async function authenticate(prevState: any, data: FormData) {
    let errorState = { callbackUrl: "" } as LoginError
    try {
        return await signIn('credentials', data)
        console.info("Login success")
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "AccessDenied": {
                    errorState.message = "Доступ закрыт"
                    return errorState
                }
                case "CredentialsSignin": {
                    errorState.message = "Ошибка при вводе пароля или мыла"
                    return errorState
                }
                case "AdapterError": {
                    errorState.message = "Ошибка Адаптера"
                    return errorState
                }
                // case "CallbackRouteError": {
                //     errorState.message = "Маршрут колбэка сломан!"
                //     return errorState
                // }
                case "EventError": {
                    errorState.message = "Ошибка ивента"
                    return errorState
                }
                case "InvalidCallbackUrl": {
                    errorState.message = "Неверный путь колбэка"
                    return errorState
                }
                case "Verification": {
                    errorState.message = "Верификация не верефицирована"
                    return errorState
                }
                case "MissingCSRF": {
                    errorState.message = "Нет CSRF Токена!"
                    return errorState
                }
                default: {
                    errorState.message = "Авторизация провалена!"
                    return errorState

                }
            }
        }
        throw e
    }


}


//   let error: AuthError = {}

//     const { email } = Object.fromEntries(data) as { email: string, password: string }

//     const user = await getOneUser({ email })
//         .then(
//             u => _log({ user: u }),
//             err => error.message = "Find user error"
//         )


//     if (!user) {
//         error.message = "User not found!"
//         return error
//     }

//
//     return error