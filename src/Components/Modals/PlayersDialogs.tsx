"use client";

import { _log } from "@/Helpers/helpersFns";
import { useConnectPlayer } from "@/Hooks/MRT/Events/useConnectPlayer";
import { createPlayer, getPlayers } from "@/Services/playerService";
import {
    mdiCheck,
    mdiClose,
    mdiRadioboxIndeterminateVariant
} from "@mdi/js";
import Icon from "@mdi/react";
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState, useTransition } from "react";

async function getData() {
    return await getPlayers();
}



export const ConnectDialog = ({
    event,
    show,
    onClose,
}: {
    event: Prisma.EventGetPayload<{
        select: {
            id: true;
            date_formated: true;
            players: { select: { id: true; name: true } };
            pairs: true;
            cost: true;
            title: true;
            _count: { select: { players: true } };
        };
    }>;
    show: boolean;
    onClose: () => void;
}) => {
    // const [open, { on, off }] = useToggle(show);
    const eventIds = event.players.map((p) => p.id);
    const [filter, setFilter] = useState("");
    const q = useQuery({
        queryKey: ["players", "all"],
        queryFn: getData,
        placeholderData: keepPreviousData,
        select: (data) => data.filter((d) => !eventIds.includes(d.id)),
        enabled: show,
    });
    const filtered = useMemo(() => {
        if (filter === "") return q.data
        return q.data?.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()))
    }, [filter, q.data])
    const { mutateAsync: add, isPending } = useConnectPlayer(event.id);

    if (q.error) {
        _log(q.error);
        return <Box>Fetch players error</Box>;
    }

    return (
        <Dialog open={ show } onClose={ onClose }>
            <DialogTitle justifyContent={ "center" } textAlign={ "center" }>
                <Box
                    component={ Stack }
                    alignContent={ "center" }
                    alignItems={ "center" }

                >
                    <Box
                        component={ Stack }
                        alignContent={ "center" }
                        alignItems={ "center" }
                        direction={ 'row' }
                    >

                        Добавить { isPending ? (
                            <Icon
                                path={ mdiRadioboxIndeterminateVariant }
                                size={ 1 }
                                spin={ 1 }
                            />
                        ) : null
                        }
                    </Box>
                    <TextField
                        value={ filter }
                        onChange={ (e) => setFilter(e.target.value) }
                        size="small"
                        margin="none"
                    />
                </Box>
            </DialogTitle>
            <DialogContent>
                <Stack direction={ "column" } spacing={ 1 } justifyContent={ "left" }>
                    { filtered?.map((p) => (
                        <Button
                            disabled={ isPending }

                            sx={ {
                                textAlign: "left",
                                justifyContent: "space-between",
                                bgcolor: "lightblue",
                            } }
                            variant="outlined"
                            size="small"
                            key={ p.id }
                            onClick={ () => add(p) }
                        >
                            { p.name }


                        </Button>
                    )) }
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export const CreatePlayerDialog = ({
    onClose,
    show,
}: {
    show: boolean;
    onClose: () => void;
}) => {
    const [player, setPlayer] = useState({ name: "" });
    const [isCreating, start] = useTransition();


    const handleClose = () => {
        onClose();
    };

    const onCreate = () => {

        start(async () => {
            const words = player.name.split(" ")
            const name = words.map(w => w
                .split("")
                .map((s, idx) => idx === 0 ? s.toUpperCase() : s)
                .join(""))
                .join(" ")

            await createPlayer(name).then(() => setPlayer({ name: "" }))
        });
        handleClose();
    };


    return (
        <Dialog open={ show } onClose={ handleClose }>
            <DialogTitle>Создать игрока</DialogTitle>
            <DialogContent>
                <Box
                    m={ 1 }
                    p={ 1 }
                    display={ "flex" }
                    alignItems={ "center" }
                    flexDirection={ "row" }
                    gap={ 1 }
                >
                    <TextField
                        size="small"
                        name={ "name" }
                        value={ player.name }
                        onChange={ (e) =>
                            setPlayer((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        variant="outlined"
                        label={ `Введите имя` }
                        margin="none"
                    />
                    <ButtonGroup
                        sx={ { pt: 0 } }
                        size="small"
                        disabled={ isCreating }
                    >
                        <Button
                            color="warning"
                            sx={ { bgcolor: "success.main" } }
                            type="submit"
                            title="Подтвердить"
                            onClick={ onCreate }
                            disabled={ isCreating }
                        >
                            <Icon path={ mdiCheck } size={ 1 } color={ "success" } />
                        </Button>
                        <Button
                            onClick={ handleClose }
                            sx={ { bgcolor: "error.main" } }
                            title="Вернуть начальное значение"
                        >
                            <Icon path={ mdiClose } size={ 1 } color={ "#000" } />
                        </Button>
                    </ButtonGroup>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
