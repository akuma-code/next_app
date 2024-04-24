import { Box, Button, Divider, Stack } from "@mui/material";
import { StpControl } from "../../../../prisma/controllers/stpService";
import { Stp } from "@prisma/client";
import { FormCreate } from "./FormCreate";
import StpListView from "./StpList";
import DtoStpList from "./DtoListView";
import { Suspense } from "react";


function AministratorPage() {
    return (
        <Box>
            <form target="/api/db/saved" method="POST">
                <input type="hidden" name="limit" />
                <button type="submit" formAction="/api/db/saved">
                    Seed db
                </button>
            </form>
            <Suspense fallback={ <div>Loading...</div> }>

                <FormCreate />
                <Divider>DB Names</Divider>

                <DtoStpList />
            </Suspense>
        </Box>);
}


export default AministratorPage;