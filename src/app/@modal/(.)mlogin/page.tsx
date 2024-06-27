import { ModalContainer } from "@/ClientComponents/UI/ModalContainer";
import { Container } from "@mui/material";
import Link from "next/link";


export default async function ModalPage() {
    return (
        <Container>
            <Link href={ '/' }>Close</Link>
        </Container>
    )
}