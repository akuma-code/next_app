"use client";

import { queryFetch } from "@/app/providers";
import { _log } from "@/Helpers/helpersFns";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { NextApiResponse } from "next";
import useSWR from "swr";
import React, { useEffect } from "react";
import {
    BackupTable,
    EVR,
    PlayersTable,
    PLR,
} from "@/ClientComponents/UserTable/PlayersMRT";
import { PlayerWithInfo } from "@/Services/playerService";
import UsersMRT from "@/ClientComponents/UserTable/UsersMRT";
import { DTO_User } from "@/ClientComponents/userList";
import { useSearchParams } from "next/navigation";

interface BackupApiResponse {
    tsx: string;
    json: string;
}

type ApiPlayersResponse = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    info: {
        uuid: string;
        rttf_score: number | null;
        playerId: number;
    } | null;
}[];

type ApiEventsResponse = {
    id: number;
    date_formated: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
    players?: ApiPlayersResponse;
}[];

type FetchedPlayers = Pick<PlayerWithInfo, "id" | "name"> & {
    info: { rttf_score?: number };
};
export const CommonBackup = ({ restore = "all" }: { restore?: string }) => {
    const query = useQuery({
        queryKey: [`/api/backup?data=${restore}`, restore],
        // queryFn: queryFetch,
        // enabled: !!restore
    });

    const query2 = useQuery({
        queryKey: ["/api/backup/events"],
    });

    console.log(query2.data);
    const q = useSearchParams();
    const log = q.get("log");
    if (query.isLoading)
        return (
            <Box height={"2rem"} p={4}>
                <LinearProgress variant="indeterminate" color={"primary"} />
            </Box>
        );
    if (query.error) return <Box>{query.error.message}</Box>;
    if (!query.data) return <Box>No data Fetched</Box>;

    // if (restore === "players" || restore === "events") {
    //     // _log({ restore })
    //     const _d =
    //         restore === "players"
    //             ? (query.data as PLR[])
    //             : (query.data as EVR[]);
    //     return <BackupTable restore={restore} data={_d} />;
    // }

    log === "on" && console.table(query.data);

    return (
        <Box>
            {query.isSuccess && restore === "users" ? (
                <UsersMRT users={query.data as DTO_User[]} />
            ) : restore === "all" ? (
                <>
                    {/* <Typography>Fetched data keys:</Typography> */}
                    {Object.values(query.data)}
                </>
            ) : restore === "players" ? (
                <BackupTable restore={restore} data={query.data as PLR[]} />
            ) : restore === "events" ? (
                <BackupTable restore={restore} data={query.data as PLR[]} />
            ) : (
                "nothing selected"
            )}
        </Box>
    );
};

const PlayerRow = ({ player }: { player: { id: number; name: string } }) => {
    const { id, name } = player;

    return (
        <Typography>
            id:{id}. {name}
        </Typography>
    );
};
const EventRow = (event: {
    id: number;
    title?: string;
    date_formated: string;
    players: { id: number; name: string }[];
}) => {
    const { id, date_formated, players, title } = event;

    return (
        <Typography>
            id:{id}, дата:{date_formated}, кол-во игроков: {players.length}
        </Typography>
    );
};
CommonBackup.displayname = "___BACKUP";
const fetcher = (resource: string, init?: RequestInit | undefined) =>
    fetch(resource, init).then((res) => res.json());
