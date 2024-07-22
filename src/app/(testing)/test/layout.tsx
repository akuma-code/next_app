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
        <Grid container columns={ 10 }>
            <Grid item md={ 2 } flexDirection={ 'column' } display={ 'flex' }>
                <Link href={ '/test' }>Test</Link>
                <Link href={ '/test/list' } >List</Link>
            </Grid>
            <Grid item md={ 4 } sx={ { bgcolor: 'lightgray' } }>
                @children
                { children }
            </Grid>
            <Grid item md={ 4 } sx={ { bgcolor: 'grey' } }>
                @view
                { view }
            </Grid>

        </Grid>
    );
}

export default TestLayout;

