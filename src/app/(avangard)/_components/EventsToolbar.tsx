"use client";

import { useQuerySearch } from "@/Hooks/useQuerySearch";
import { Pagination } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
interface ToolbarProps {
    total: number;
}
export const EventsToolbar = (props: ToolbarProps) => {
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const r = useRouter();
    const p = usePathname();
    const query = useQuerySearch();
    useEffect(() => {
        const s = query("page", page.toString());
        r.replace(p + "?" + s);
    }, [p, page, query, r]);
    return (
        <Pagination page={page} onChange={handleChange} count={props.total} />
    );
};
