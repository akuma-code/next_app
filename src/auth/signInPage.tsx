import * as React from "react";
import type { AuthProvider } from "@toolpad/core";
import { SignInPage } from "@toolpad/core/SignInPage";
import { AuthError } from "next-auth";
import { signIn } from "./auth";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function SignInToolPage() {
    // function SignUpLink() {
    //     "use server";
    //     return <Link href="/api/auth/register">Registration</Link>;
    // }
    return (
        <SignInPage
            providers={[{ id: "credentials", name: "credentials" }]}
            signIn={async (
                provider: AuthProvider,
                formData: FormData,
                callbackUrl?: string
            ) => {
                "use server";
                try {
                    return await signIn(provider.id, {
                        ...(formData && {
                            email: formData.get("email"),
                            password: formData.get("password"),
                        }),
                        redirectTo: callbackUrl,
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
                }
            }}
        />
    );
}
