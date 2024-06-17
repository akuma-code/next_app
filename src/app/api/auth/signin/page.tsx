import { Button, Container } from "@mui/material";
import SignInForm from "../../../../auth/SignInForm";
import { getCsrfToken } from "next-auth/react";
import { AuthError } from "next-auth"
import { providerMap, signIn } from "@/auth/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { _log } from "@/Helpers/helpersFns";

async function SignInPage({ request }: { request: NextRequest }) {

    // const { url } = request
    // const { href } = new URL(await request.url)

    return (
        <div className="flex flex-col gap-2">
            { Object.values(providerMap).map((provider) => (
                <form key={ provider.id }
                    action={ async () => {
                        "use server"
                        try {
                            await signIn(provider.id)
                        } catch (error) {
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
                    <Button type="submit" variant="outlined">
                        <span>Sign in with { provider.name }</span>
                    </Button>
                </form>
            )) }
        </div>
    )
}

export default SignInPage