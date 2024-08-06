"use client";

import LoadSpinner from "@/ClientComponents/UI/Loader/LoadSpinner";
import { _dbDateParser } from "@/Helpers/dateFuncs";
import { getDBOneEventData } from "@/Services/events/db_event";
import { Box, Fade, Skeleton, Typography } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
interface BoardProps {
    lastId?: number;
}
export const Board: React.FC<BoardProps> = ({ lastId }) => {
    const [loading, start] = useTransition();
    const [current, setCurrent] = useState<any | undefined>(undefined);

    useEffect(() => {
        if (!lastId) return setCurrent(undefined);
        start(async () => {
            const e = await getDBOneEventData(
                { id: lastId },
                {
                    id: true,
                    date_formated: true,
                    players: true,
                    pairs: true,
                    eventInfo: false,
                }
            );
            setCurrent(e as any);
        });
    }, [lastId]);
    if (!current) return <Skeleton animation="pulse" />;
    return (
        <Fade in={current !== undefined}>
            <Box>
                <>
                    <Typography>Last Id: {lastId} </Typography>

                    <Typography>
                        {current &&
                            _dbDateParser(current.date_formated).dd_mmmm}
                    </Typography>
                </>
            </Box>
        </Fade>
    );
};
