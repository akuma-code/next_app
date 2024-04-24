import { Box, Divider } from "@mui/material";
import { FormEvent, Suspense } from "react";
import DtoStpList from "./DtoListView";
import { FormCreate } from "./FormCreate";
import { SeedDbForm } from "./SeedDbForm";


function AministratorPage() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    }
    return (
        <Box>
            <SeedDbForm />
            <Suspense fallback={ <div>Loading...</div> }>

                <FormCreate />
                <Divider>DB Names</Divider>

                <DtoStpList />
            </Suspense>
        </Box>);
}


export default AministratorPage;


