import { Button, Container, Stack, TextField } from "@mui/material";
import SignInForm from "../../../../auth/SignInForm";
import { getCsrfToken } from "next-auth/react";
import { AuthError } from "next-auth"
import { providerMap, signIn } from "@/auth/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { _log } from "@/Helpers/helpersFns";
import LoginForm from "@/ClientComponents/LoginForm";

async function SignInPage() {

    // const { url } = request
    // const { href } = new URL(await request.url)

    return (
        <div className="flex flex-col gap-2">
            { Object.values(providerMap).map((provider) => (
                <form key={ provider.id }
                    action={ async (fd) => {
                        "use server"
                        try {
                            await signIn(provider.id, fd)
                        } catch (error) {
                            console.log(Object.fromEntries(fd))
                            // Signin can fail for a number of reasons, such as the user
                            // not existing, or the user not having the correct role.
                            // In some cases, you may want to redirect to a custom error
                            // if (error instanceof AuthError) {
                            //     return redirect('/admin')
                            // }

                            // Otherwise if a redirects happens NextJS can handle it
                            // so you can just re-thrown the error and let NextJS handle it.
                            // Docs:
                            // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                            _log(error)
                            throw error
                        }
                    } }
                >
                    <Stack rowGap={ 2 } sx={ { bgcolor: 'background.paper', p: 1 } }>

                        <TextField
                            sx={ { flexGrow: 1 } }
                            defaultValue={ "" }
                            name='email'
                            color='warning'
                            id='inp-email'
                            size='small'
                            placeholder='введите email'
                            type='email'
                            label="Email"
                            required

                        />




                        <TextField
                            sx={ { flexGrow: 1, } }
                            defaultValue={ "" }
                            name='password'
                            color='warning'
                            id='passinput'
                            type='password'
                            autoComplete='on'
                            size='small'
                            placeholder='введите пароль'
                            required
                            label="Пароль"
                        />




                    </Stack>
                    <Button type="submit" variant="outlined">
                        <span>Sign in with { provider.name }</span>
                    </Button>

                </form>
            )) }
        </div>
    )
}
async function authAction(formdata: FormData) {

}
export default SignInPage