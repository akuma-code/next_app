'use client'
import { StpData } from "@/Types/StpInterfaces";
import { getDataList } from "@/dataStore/stp_list";
import { Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface DtoStpListProps {
    limit?: number
}

const DtoStpList: React.FC<DtoStpListProps> = ({ limit }) => {
    // const [data,setData]=useState(()=>getDataList())
    const query = useQuery({
        queryKey: ['saved_stps'],
        queryFn: () => getDataList(limit)
    })

    const add = (n: StpData) => {
        const fd = new FormData()
        fd.append('stp', JSON.stringify(n))



    }

    return (
        <Box>


            <ol>
                { query.isSuccess ? query.data[0].map(n =>

                    <li key={ n.name }>
                        <Button onClick={ () => add(n) }
                        >{ n.name }</Button>
                    </li>
                ) : null }
            </ol>
        </Box>);
}

export default DtoStpList;

