import { Grid } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

interface ContainerLayoutProps {
    children: React.ReactNode
    view: React.ReactNode

}


export const metadata: Metadata = {
    title: "Test page",


};

const TestLayout: React.FC<ContainerLayoutProps> = ({ children, view }) => {
    return (
        <Grid container columns={ 12 }>
            <Grid item md={ 2 } flexDirection={ 'column' } display={ 'flex' }>
                <Link href={ '/test/list' }>List</Link>
                <Link href={ '/test' }>Test</Link>
            </Grid>
            <Grid item md={ 4 }>
                { view }
            </Grid>
            <Grid item md={ 4 }>

                { children }
            </Grid>

        </Grid>
    );
}

export default TestLayout;

