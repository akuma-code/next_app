import RegisterForm from "@/ClientComponents/RegisterForm";
import { Container } from "@mui/material";



export default async function RegisterPage() {



    return (
        <Container maxWidth={ "sm" } sx={ { mt: 3 } }>

            <RegisterForm />
        </Container>
    )
}

