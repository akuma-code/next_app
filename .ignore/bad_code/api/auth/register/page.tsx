import LoginForm from "@/ClientComponents/LoginForm";
import RegisterForm from "@/ClientComponents/RegisterForm";
import { Typography } from "@mui/material";


export default function RegisterPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex  w-full items-start rounded-lg bg-blue-500 p-3 ">
                    <div className="w-32 text-white md:w-full md:text-center">

                        <RegisterForm />
                    </div>
                </div>
            </div>
        </main>
    );
}