import { Box, Grid, Typography } from "@mui/material";
import { getPlayerInfo } from "../actions";
import { PlayerInfoCard } from "../../_components/PlayerCard";
import { Prisma } from "@prisma/client";
import allP from "@/utils/playersList";
import EventsInfoPlayer from "../../_components/EventsPlayerInfo";
const _select = {
    id: true,
    name: true,
    events: { select: { id: true, date_formated: true } },
} satisfies Prisma.PlayerSelect;

const PlayerInfoPage = async ({ params }: { params: { id: string } }) => {
    const all_names = await allP().then((p) => p.map((pl) => pl.name));
    const id = params.id;
    const { player, events, pairs, ticket } = await getPlayerInfo({
        where: { id: Number(id) },
        select: _select,
    });
    const { alldata } = await fetch(
        "https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/backup/"
    ).then((res) => res.json());

    return (
        <Grid
            container
            columns={12}
            sx={{
                "& .MuiGrid-item": {
                    border: "1px solid black",
                    m: 1,
                },
            }}
        >
            <Grid item>{player && <PlayerInfoCard player={player} />}</Grid>
            <Grid item>{events && <EventsInfoPlayer events={events} />}</Grid>
        </Grid>
    );
};

export default PlayerInfoPage;
