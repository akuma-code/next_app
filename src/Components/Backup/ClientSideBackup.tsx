"use client";

import { alpha, Box, Button, ButtonGroup, Chip, Divider, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import db_data from "@/dataStore/allData/all_data.json";
import { useCallback } from "react";
import { getBackup, getBackupEvents } from "@/app/admin/actions";
import { _date, _dbDateParser } from "@/Helpers/dateFuncs";
import Icon from "@mdi/react";
import { mdiSigma } from "@mdi/js";
import dayjs from "dayjs";
import Link from "next/link";
import { updateEventDates } from "@/Services/utils";
import { fetcherJson } from "@/Helpers/fetcher";
// console.table(db_data);
async function getData() {
    return await getBackup();
}
const updater = updateEventDates.bind(null)
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
                players: e.players.map((p: any) => ({ id: p.id, name: p.name })),
            }));
            pairs.map((p) => ({
                masterId: p.firstPlayerId,
                playerId: p.secondPlayerId,
            }));
            return { events, pairs };
        },
    });

    const exportData = useCallback(() => {
        const data = q.data;
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        const fname = dayjs().format('YYYY-MM-DD') + '.json'
        link.download = fname;

        link.click();
    }, [q.data]);
    // q.isSuccess && console.log(q.data);
    return (
        <Box mx={ 2 } gap={ 2 }>

            <Typography variant="h4" component={ 'div' }>

                список ивентов
            </Typography>
            { q.isSuccess && (
                <Box color={ "success" }
                    maxHeight={ 300 }
                    maxWidth={ 500 }
                    flexWrap={ 'wrap' }
                    // width={ '30vw' }
                    bgcolor={ 'inherit' }
                    display={ 'flex' }
                    flexDirection={ 'column' }>

                    { q.data.events.map((e) => (
                        <Typography key={ e.id } px={ 1 }>{ _dbDateParser(e.date_formated).dd_mmmm }</Typography>
                    )) }


                    <Chip
                        label={ q.data.events.length }
                        size="small"
                        variant="outlined"
                        color="warning"
                        sx={ { color: 'black', fontWeight: 'bold', fontSize: 16 } }
                        icon={
                            <Icon path={ mdiSigma }
                                size={ .9 } />
                        }
                    />
                </Box>
            ) }
            <form action={ updater }>
                <ButtonGroup>
                    <Button
                        onClick={ exportData }
                        variant="contained"
                        color={ "info" }
                        sx={ {
                            bgcolor: (theme) => alpha(theme.palette.info.dark, 0.7),

                        } }
                    >
                        Сохранить как JSON
                    </Button>

                    <Button href="/api/backup" LinkComponent={ Link }
                        variant="contained"
                        color={ "info" }>
                        SyncPairs
                    </Button>

                    <Button type="submit"
                        variant="contained"
                        color={ "info" }>
                        Update Data
                    </Button>
                </ButtonGroup>
            </form>
            { q.error && <Box>{ q.error.message }</Box> }
        </Box>
    );
};
