import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { getOnePlayer } from "@/Services/playerService";
import allP from "@/utils/playersList";
import { DeleteTwoTone } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";

interface OnePlayerPropsPage {
    params: {
        id: string
    },
    searchParams: { id: string, action: string }
}

// export async function generateStaticParams() {
//     const players = await allP()
//     const res = players.map(p => ({ id: `${p.id}` }))
//     return res
// }

const OnePlayerPage: React.FunctionComponent<OnePlayerPropsPage> = async (params) => {
    const id = params.params?.id ?? params.searchParams?.id
    if (!id) return <div>Invalid Id</div>
    const player = await getOnePlayer(+id)
    if (!player) return <div>No player found, { id }</div>
    const { info, name, createdAt } = player;
    const date = dayjs(new Date(createdAt)).format('DD/MM/YYYY')
    const showEdit = params?.searchParams?.action === 'edit'
    return (
        <Stack direction={ 'row' } gap={ 2 }>


            <Stack>
                <div>ID: { id }</div>
                <Typography variant="body1">name: { name }</Typography>
                {
                    info &&

                    <Typography variant="body1">RTTF: { info.rttf_score }</Typography>
                }
                <Typography variant="body1">Создан: { date }</Typography>

                <Stack direction={ 'row' } spacing={ 4 }>

                    <Link href={ '/admin/players' } className=" w-fit p-1">
                        Back
                    </Link>
                    <DeleteButton deleteId={ +id } >
                        Delete
                        <DeleteTwoTone />
                    </DeleteButton>
                    {
                        !showEdit &&
                        <Link href={ {
                            pathname: `/admin/players/${id}`,
                            query: { action: 'edit', id },
                        } }
                            className="border-2 border-black w-fit p-1">
                            Edit
                        </Link>
                    }

                </Stack>
            </Stack>
            { showEdit &&
                <EditPlayerForm player={ player } />
            }

        </Stack>
    );
}

export default OnePlayerPage;