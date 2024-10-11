"use client";

import { useQuerySearch } from "@/Hooks/useQuerySearch";
import {
    Button,
    ButtonGroup,
    IconButton,
    Pagination,
    Stack,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
interface ToolbarProps {
    total: number;
}
export const EventsToolbar = (props: ToolbarProps) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState<number | "all">(10);
    const counter = isNaN(Number(perPage))
        ? Math.floor(props.total / Number(perPage)) + 1
        : props.total;
    const q = new URLSearchParams().toString();
    const r = useRouter();
    const p = usePathname();
    const [Path, setPath] = useState(p);
    const query = useQuerySearch();
    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        const s = query("page", page.toString());
        console.log(s);
        // r.replace(p + "?" + s);

        const path = value ? `${p}?${s}` : p;
        r.replace(path);
    };
    const handleChangeRpp = (v: number | "all") => {
        setPerPage(v);
        const pp = query("perPage", perPage.toString());
        const path = v ? `${p}?${pp}` : p;
        console.log(path);
        r.replace(path);
    };
    useEffect(() => {
        const pp = query("perPage", perPage.toString());
        const p = query("page", page.toString());
        const q = `${pp}&${p}`;
        setPath(q);
        // r.replace(p + "?" + q);
    }, [page, perPage, query]);
    return (
        <Stack spacing={4} flexDirection={"row"} alignItems={"center"}>
            <Pagination
                page={page}
                onChange={handleChangePage}
                count={counter}
            />
            <ButtonGroup size="small" variant="outlined">
                {[5, 10, 15, "all"].map((pp) => (
                    <Link key={pp} href={{ query: { perPage: pp } }}>
                        <Button
                            onClick={() =>
                                handleChangeRpp(pp as number | "all")
                            }
                        >{`${pp}`}</Button>
                    </Link>
                ))}
            </ButtonGroup>
        </Stack>
    );
};
