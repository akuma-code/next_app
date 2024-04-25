'use client'
import { getDataList } from "@/dataStore/stp_list";
import { Box, Button } from "@mui/material";
import React, { Suspense, useState } from "react";
import { StpControl } from "../../../../prisma/controllers/stpService";
import { useQuery } from "@tanstack/react-query";
import { StpData } from "@/Types/StpInterfaces";

interface DtoStpListProps {

}

const DtoStpList: React.FC<DtoStpListProps> = () => {
    // const [data,setData]=useState(()=>getDataList())
    const query = useQuery({
        queryKey: ['saved_stps'],
        queryFn: () => getDataList()
    })
    const data = query.isSuccess ? query.data : []
    const add = (n: StpData) => {
        const fd = new FormData()
        fd.append('stp', JSON.stringify(n))
        fetch('/api/db/stp', { method: 'POST' })


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

function await_data() {
    const d = getDataList()
    const res = []
    d.then(d => res.push(d))

}