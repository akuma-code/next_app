import EditPlayerForm from "@/ClientComponents/EditPlayerForm";
import { BackButton } from "@/ClientComponents/UI/BackButton";
import DeleteButton from "@/ClientComponents/UI/DeleteButton";
import { getOnePlayer } from "@/Services/playerService";
import allP from "@/utils/playersList";
import { DeleteTwoTone } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";

interface OnePlayerPropsPage {
    params: {
        id: string;
    };
    searchParams: { id: string; action: string };
}

// export const dynamicParams = true
// export const config = { staticPageGenerationTimeout: 120 }
// export const staticPageGenerationTimeout = 120
export async function generateStaticParams() {
    try {
        const players = await allP();
        const result = players.map((p) => ({ ...p, id: `${p.id}` }));
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Generation error");
    }
}

const OnePlayerPage: React.FunctionComponent<OnePlayerPropsPage> = async (
    params
) => {
    const id = params.params.id || null;
    if (!id) return <div>Invalid Id</div>;

    const player = await getOnePlayer(+id);
    if (!player) return <div>No player found, {id}</div>;

    const { info, name, createdAt, events } = player;
    const date = dayjs(new Date(createdAt)).format("DD/MM/YYYY");
    const showEdit = params.searchParams.action === "edit";
    return (
        <Stack direction={"row"}>
            <Stack>
                <div>ID: {id}</div>
                <Typography variant="body1">name: {name}</Typography>
                {info && (
                    <Typography variant="body1">
                        RTTF: {info.rttf_score}
                    </Typography>
                )}
                <Typography variant="body1">Создан: {date}</Typography>

                <Stack direction={"row"} spacing={4}>
                    {/* <Link href={ '/avangard/players' } className=" w-fit p-1">
                        Back
                    </Link> */}
                    <BackButton />
                    <DeleteButton deleteId={+id}>
                        Delete
                        <DeleteTwoTone />
                    </DeleteButton>
                    {!showEdit && (
                        <Link
                            href={{
                                pathname: `/avangard/players/${id}`,
                                query: { action: "edit" },
                            }}
                            className="border-2 border-black w-fit p-1"
                        >
                            Edit
                        </Link>
                    )}
                </Stack>
            </Stack>
            {showEdit && <EditPlayerForm player={player} />}
        </Stack>
    );
};

export default OnePlayerPage;
