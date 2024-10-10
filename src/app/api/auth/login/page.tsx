import { CredentialsInputs } from "@/ClientComponents/auth/CredentialsForm";
import { _log } from "@/Helpers/helpersFns";
import { signIn } from "@/auth/auth";
import SignInToolPage from "@/auth/signInPage";
import { Button, Container, Stack } from "@mui/material";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

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
                        try {
                            return await signIn("credentials", {
                                ...(fd && {
                                    email: fd.get("email"),
                                    password: fd.get("password"),
                                }),
                                redirectTo: callbackUrl ?? "/",
                            });
                        } catch (error) {
                            // The desired flow for successful sign in in all cases
                            // and unsuccessful sign in for OAuth providers will cause a `redirect`,
                            // and `redirect` is a throwing function, so we need to re-throw
                            // to allow the redirect to happen
                            // Source: https://github.com/vercel/next.js/issues/49298#issuecomment-1542055642
                            // Detect a `NEXT_REDIRECT` error and re-throw it
                            if (
                                error instanceof Error &&
                                error.message === "NEXT_REDIRECT"
                            ) {
                                throw error;
                            }
                            // Handle Auth.js errors
                            if (error instanceof AuthError) {
                                return {
                                    error:
                                        error.type === "CredentialsSignin"
                                            ? "Неверный пароль!"
                                            : "Другая херня с авторизацией!",
                                    type: error.type,
                                };
                            }
                            // An error boundary must exist to handle unknown errors
                            return {
                                error: "Неизвестно",
                                type: "UnknownError",
                            };
                        } finally {
                            revalidatePath("/");
                        }
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
