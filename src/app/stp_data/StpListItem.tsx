'use client';
import { StpData } from "@/Types/StpInterfaces";
import { Button } from "@mui/material";
import { _toDb, createStpFromStpData } from "../../../prisma/controllers/stpService";
import prisma from "../../../prisma/client/client";
import { createDbItem } from "../actions";

type StpListItemProps = {
    stp: StpData
    onClickFn?: (item: StpData) => void
}
export function StpListItem({ stp, onClickFn }: StpListItemProps) {


    return <li key={ stp.id } className="list-decimal list-inside">
        <Button type="submit" name={ stp.name } >

            { stp.name }
        </Button>
    </li>;
}
