'use client'


type ProviderName = "Credentials" | "github"
export const FormProvider: React.FC<{ providers: { id: string, name: ProviderName }[] }> = ({ providers }) => {



    return (
        <div>FormSelector</div>
    )
}