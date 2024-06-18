import { Button, ButtonGroup, Container, Stack, TextField, Typography } from "@mui/material";
import SignInForm from "../../../../auth/SignInForm";
import { getCsrfToken } from "next-auth/react";
import { AuthError } from "next-auth"
import { providerMap, signIn } from "@/auth/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { _log } from "@/Helpers/helpersFns";
import RegisterForm from "@/ClientComponents/RegisterForm";
import { SignInButton } from "@/ClientComponents/auth/SignInButton";
import { BuiltInProviderType } from "next-auth/providers";
import BackButton from "../../../../ClientComponents/UI/BackButton";
import { CredentialsLoginForm } from "@/ClientComponents/auth/CredentialsForm";



async function SignInPage() {

    // const { url } = request
    // const { href } = new URL(await request.url)

    return (
        <Container maxWidth={ 'md' } >
            <Stack direction={ { sm: 'column', md: 'row' } } gap={ 2 } justifyContent={ 'center' } p={ 2 }>
                <CredentialsLoginForm provider={ { id: 'credentials', name: "Credentials" } } />
                {/* { Object.values(providerMap).map((provider) => {
                    if (provider.name === "Github") return <GitHubsLoginForm provider={ provider } key={ provider.id } />
                    if (provider.name === 'Credentials') return <CredentialsLoginForm provider={ provider } key={ provider.id } />

                }) } */}
            </Stack>
        </Container>
    )
}


const GitHubsLoginForm = ({ provider }: { provider: { id: string, name: string } }) => {

    return (

        <form key={ provider.id }
            action={ async (fd) => {
                "use server"
                try {
                    await signIn(provider.id, fd)
                } catch (error) {
                    console.log(Object.fromEntries(fd))

                    _log(error)
                    throw error
                }
            } }
        >
            <Container>
                <Button type="submit" variant="contained" color="info">
                    Войти через Github
                </Button>



            </Container>
        </form>
    );
}
async function authAction(formdata: FormData) {

}
export default SignInPage