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
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
interface ToolbarProps {
    total: number;
    perPage?: string;
    page?: string;
}
export const EventsToolbar = (props: ToolbarProps) => {
    const [page, setPage] = useState(props?.page || 1);
    const [perPage, setPerPage] = useState<number | "all">(
        Number(props?.perPage) || "all"
    );
    const totalPages = useMemo(
        () =>
            typeof perPage === "number"
                ? Math.round(props.total / Number(perPage)) + 1
                : perPage === "all" || !perPage
                  ? 1
                  : props.total,
        [perPage, props.total]
    );
    const r = useRouter();
    const p = usePathname();
    const [Path, setPath] = useState("");
    const query = useQuerySearch();
    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage((prev) => value);
        const s = value
            ? query("page", value.toString())
            : new URLSearchParams().delete("page");

        const path = value ? `${p}?${s}` : p;

        setPath((prev) => path);
    };
    const handleChangeRpp = (v: number | "all") => {
        setPerPage(v);
        const pp = query("perPage", v.toString());
        const path = typeof v === "number" ? `${p}?${pp}` : p;
        console.log(path);

        setPath((prev) => path);
    };
    useEffect(() => {
        Path !== "" && r.replace(Path);
        return () => setPath("");
    }, [Path, r]);
    return (
        <Stack spacing={2} alignItems={"baseline"} maxWidth={"100%"}>
            <ButtonGroup size="small" variant="contained" fullWidth>
                {[1, 5, 10, 15, 20, 25, "all"].map((pp) => (
                    // <Link key={pp} href={{ query: { perPage: pp } }}>
                    <Button
                        key={pp}
                        color={pp === perPage ? "info" : "inherit"}
                        onClick={() => handleChangeRpp(pp as number | "all")}
                    >{`${pp}`}</Button>
                    // </Link>
                ))}
            </ButtonGroup>
            <Pagination
                page={+page}
                onChange={handleChangePage}
                count={totalPages}
            />
        </Stack>
    );
};
