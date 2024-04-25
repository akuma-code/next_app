
import { StpData } from "@/Types/StpInterfaces";
import { Box } from "@mui/material";
import { StpListItem } from "./StpListItem";


async function StpDataListPage({ params }: { params?: { limit?: number } }) {


    return (
        <Box>
            NO DATA
        </Box>
    );
}


export async function getData(limit = 2): Promise<[StpData[], number, number]> {

    try {
        const tu = `/api/db/saved`
        const res = await fetch(tu)
        if (!res.ok) {
            throw new Error("Fetch data error")
        }

        return res.json()
    } catch (error) {

        throw new Error("get data error!")
    }

}
export default StpDataListPage;

// async function getQueryData() {
//     const query_client =  getQueryClient()
//     await query_client.ensureQueryData({
//         queryKey: ['fetch_stp_data'],
//         queryFn: () => fetch('http://localhost:3000/api/stp_data'),
//         gcTime: 1000 * 10
//     })


//     return query_client
// }