import { CredentialsInputs } from "@/ClientComponents/auth/CredentialsForm";
import { _log } from "@/Helpers/helpersFns";
import { signIn } from "@/auth/auth";
import SignInToolPage from "@/auth/signInPage";
import { Button, Container, Stack } from "@mui/material";

async function SignInPage({
    searchParams,
}: {
    searchParams: { callbackUrl: string };
}) {
    const callbackUrl = searchParams?.callbackUrl || "/";

    return (
        <Container maxWidth={"md"}>
            <Stack
                direction={{ sm: "column", md: "row" }}
                gap={2}
                justifyContent={"center"}
                p={2}
            >
                <form
                    action={async (fd) => {
                        "use server";
                        const { email, password } = Object.fromEntries(fd);
                        await signIn("credentials", {
                            email,
                            password,
                            redirectTo: callbackUrl,
                        });
                    }}
                >
                    <CredentialsInputs />
                </form>
            </Stack>
        </Container>
    );
}

const GitHubsLoginForm = ({
    provider,
}: {
    provider: { id: string; name: string };
}) => {
    return (
        <form
            key={provider.id}
            action={async (fd) => {
                "use server";
                try {
                    await signIn(provider.id, fd);
                } catch (error) {
                    console.log(Object.fromEntries(fd));

                    _log(error);
                    throw error;
                }
            }}
        >
            <Container>
                <Button type="submit" variant="contained" color="info">
                    Войти через Github
                </Button>
            </Container>
        </form>
    );
};

export default SignInToolPage;
