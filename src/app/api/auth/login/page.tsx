import { CredentialsLoginForm } from "@/ClientComponents/auth/CredentialsForm";
import { _log } from "@/Helpers/helpersFns";
import { signIn } from "@/auth/auth";
import { Button, Container, Stack } from "@mui/material";



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