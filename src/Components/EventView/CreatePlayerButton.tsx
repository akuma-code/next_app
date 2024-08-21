"use client";

import { createPlayer } from "@/Services/playerService";
import {
    mdiFormTextboxPassword,
    mdiCheck,
    mdiReply,
    mdiAccountAlert,
    mdiCloseBox,
    mdiClose,
} from "@mdi/js";
import Icon from "@mdi/react";
import {
    Button,
    IconButton,
    Popover,
    Box,
    TextField,
    ButtonGroup,
} from "@mui/material";
import { useState, useTransition } from "react";

async function create_player(name: string) {
    return await createPlayer(name);
}

const CreatePlayerBtn: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [player, setPlayer] = useState({ name: "" });
    const [isCreating, start] = useTransition();
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onCreate = () => {
        start(async () => {
            await createPlayer(player.name);
        });
    };

    // function handleReset() {
    //     setState(prev => input)
    // }
    const show = Boolean(anchorEl);
    return (
        <>
            <Button
                title="создать нового игрока"
                color="error"
                onClick={handleOpen}
                size="small"
                variant="contained"
                sx={{ alignItems: "center" }}
                disabled={isCreating}
            >
                Создать нового
                <Icon path={mdiAccountAlert} size={0.8} />
            </Button>

            <Popover
                open={show}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                slotProps={{
                    paper: {
                        elevation: 1,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: -2,

                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                bottom: 0,
                                left: 80,
                                width: 20,
                                height: 20,
                                bgcolor: "background.paper",
                                transform: "translateY(50%) rotate(135deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
            >
                <Box
                    m={1}
                    p={1}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"row"}
                    gap={1}
                >
                    <TextField
                        size="small"
                        name={"name"}
                        value={player.name}
                        onChange={(e) =>
                            setPlayer((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        variant="outlined"
                        label={`Введите имя`}
                    />
                    <ButtonGroup sx={{ pt: 0 }} size="small">
                        <Button
                            color="warning"
                            sx={{ bgcolor: "success.main" }}
                            type="submit"
                            title="Подтвердить"
                            onClick={onCreate}
                        >
                            <Icon path={mdiCheck} size={1} color={"success"} />
                        </Button>
                        <Button
                            onClick={handleClose}
                            sx={{ bgcolor: "error.main" }}
                            title="Вернуть начальное значение"
                        >
                            <Icon path={mdiClose} size={1} color={"#000"} />
                        </Button>
                    </ButtonGroup>
                </Box>
            </Popover>
        </>
    );
};

export default CreatePlayerBtn;
