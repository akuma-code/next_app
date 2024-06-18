'use client'

import { CredentialsLoginForm } from "@/ClientComponents/auth/CredentialsForm"
import { useCallback, useMemo } from "react"

type ProviderName = "Credentials" | "github"
export const FormProvider: React.FC<{ providers: { id: string, name: ProviderName }[] }> = ({ providers }) => {



    return (
        <div>FormSelector</div>
    )
}