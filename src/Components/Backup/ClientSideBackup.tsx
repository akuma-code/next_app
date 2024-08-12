"use client";

import { getBackup } from "@/app/admin/actions";
import { getImportantData } from "@/app/api/backup/events/actions";
import LoadSpinner from "@/ClientComponents/UI/Loader/LoadSpinner";
import { _dbDateParser } from "@/Helpers/dateFuncs";
import { mdiArchiveArrowUpOutline } from "@mdi/js";
import Icon from "@mdi/react";
import {
    alpha,
    Box,
    Button,
    ButtonGroup,
    Chip,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useCallback } from "react";
// console.table(db_data);
async function getData() {
    return await getBackup();
}
async function saveData() {
    const data = await getImportantData();
    // await writeFileFn("./public/json", data);
    return data;
}

export const ClientBackup = (props: { filename?: string }) => {
    const q = useQuery({
        queryKey: ["/api/backup"],
        queryFn: getData,
        select: (data) => {
            let { events, pairs } = data;
            events.map((e: any) => ({
                ...e,
                date_formated: e.date_formated,
                id: e.id,
                title: e.title,
                players: e.players.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                })),
            }));
            pairs.map((p) => ({
                masterId: p.firstPlayerId,
                playerId: p.secondPlayerId,
            }));
            return { events, pairs };
        },
    });
    // const b = useQuery({
    //     queryKey: ["api", "backup", "data"],
    //     queryFn: saveData,
    // });
    const exportData = useCallback(() => {
        const data = q.data;
        if (q.error) return console.error("Data fetch failure!");
        if (q?.data?.events && q?.data?.events?.length < 1)
            return console.log("Events not found");
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        const fname = dayjs().format("YYYY-MM-DD") + ".json";
        link.download = fname;

        link.click();
    }, [q.data, q.error]);
    // const exportAnyData = useCallback(() => {
    //     const data = b.data;
    //     if (b.error) return console.error("Data fetch failure!");
    //     const jsoned = JSON.stringify(data);
    //     const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    //         jsoned
    //     )}`;
    //     const link = document.createElement("a");
    //     link.href = jsonString;
    //     const fname = dayjs().format("YYYY-MM-DD") + ".json";
    //     link.download = "plain_data.json";

    //     link.click();
    // }, [b.data, b.error]);

    // q.isSuccess && console.log(q.data);
    return (
        <Box p={1} gap={2} border={"1px solid"} borderRadius={"1rem"}>
            {/* <Typography variant="h4" component={"div"} minWidth={290}>
                Cписок ивентов
            </Typography> */}
            {q.isLoading ? (
                <LoadSpinner />
            ) : (
                <Box
                    maxWidth={300}
                    gap={1}
                    display={"flex"}
                    flexDirection={"column"}
                >
                    <Chip
                        label={"Всего ивентов: " + q.data?.events.length}
                        size="medium"
                        variant="outlined"
                        color="warning"
                        sx={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                        icon={
                            <Icon path={mdiArchiveArrowUpOutline} size={0.9} />
                        }
                    />
                    <Button
                        fullWidth
                        onClick={exportData}
                        variant="contained"
                        color={"info"}
                        sx={{
                            bgcolor: (theme) =>
                                alpha(theme.palette.info.dark, 0.7),
                        }}
                    >
                        Обновить data.json
                    </Button>
                    {q.isSuccess && (
                        <Box
                            color={"success"}
                            maxHeight={500}
                            maxWidth={300}
                            flexWrap={"wrap"}
                            // width={ '30vw' }
                            bgcolor={"inherit"}
                            display={"flex"}
                            flexDirection={"column"}
                        >
                            {q.data.events.map((e) => (
                                <Link
                                    href={"/avangard/events/" + e.id}
                                    key={e.id}
                                    className="hover:underline"
                                >
                                    <Typography px={1}>
                                        {_dbDateParser(e.date_formated).dd_mmmm}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>
                    )}
                </Box>
            )}
            {/* <form action={saver}> */}

            <ButtonGroup size={"small"}>
                {/* <Button
                    variant="contained"
                    color={"info"}
                    onClick={exportAnyData}
                >
                    Сохранить чистые данные
                </Button> */}
            </ButtonGroup>
            {/* </form> */}
            {q.error && <Box>q error: {q.error.message}</Box>}
            {/* {b.error && <Box>b error: {b.error.message}</Box>} */}
        </Box>
    );
};
