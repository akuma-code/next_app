import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import { getOnePlayer } from "@/Services/playerService";
import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";

interface OnePlayerPropsPage {
    params?: {
        id: number
    }
}

const OnePlayerPage: React.FunctionComponent<OnePlayerPropsPage> = async (params) => {
    const id = params.params?.id
    if (!id) return <div>Invalid Id</div>
    const player = await getOnePlayer(+id)
    if (!player) return <div>No player found, { id }</div>
    const { PlayerInfo, name, createdAt } = player;
    const date = dayjs(new Date(createdAt)).format('DD/MM/YYYY')
    return (
        <Stack direction={ 'row' }>


            <Stack>
                <div>ID: { id }</div>
                <Typography variant="body1">name: { name }</Typography>
                {
                    PlayerInfo &&

                    <Typography variant="body1">RTTF: { PlayerInfo.rttf_score }</Typography>
                }
                <Typography variant="body1">Создан: { date }</Typography>

                <Stack direction={ 'row' } spacing={ 4 }>

                    <Link href={ '/avangard/players' } className="border-2 border-black w-fit p-1">
                        Back
                    </Link>
                    <Link href={ {
                        pathname: `/avangard/players/${id}`,
                        query: { form: 'edit' },
                    } }
                        className="border-2 border-black w-fit p-1">
                        Edit
                    </Link>
                    <Link href={ '/avangard/players' } className="border-2 border-black w-fit p-1">
                        Delete
                    </Link>
                </Stack>
            </Stack>
            <EditPlayerForm player={ player } />

        </Stack>
    );
}

export default OnePlayerPage;