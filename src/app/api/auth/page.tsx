import LoginForm from "@/ClientComponents/LoginForm";
import { Typography } from "@mui/material";


export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-start rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-full md:text-center">
                        <Typography variant="body1">

                            Войдите в учетную запись или зарегестрируйтесь
                        </Typography>
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}