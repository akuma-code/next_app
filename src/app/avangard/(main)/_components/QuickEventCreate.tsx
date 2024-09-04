"use client";

import LoadSpinner from "@/ClientComponents/UI/Loader/LoadSpinner";
import { _formated_date } from "@/Helpers/dateFuncs";
import useMediaDetect from "@/Hooks/useMediaDetect";
import { useToggle } from "@/Hooks/useToggle";
import { makeNewEvent } from "@/Services/eventService";
import {
    mdiArrowDownBoldHexagonOutline,
    mdiArrowRightBoldHexagonOutline,
    mdiNewBox,
    mdiNewspaperPlus,
    mdiSphereOff,
    mdiStickerEmoji,
} from "@mdi/js";
import Icon from "@mdi/react";
import { SettingsTwoTone } from "@mui/icons-material";
import { alpha, SpeedDialAction, Zoom } from "@mui/material";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { Suspense, useTransition } from "react";

type Props = {
    children?: React.ReactNode;
};
export function QuickEventCreate({ children }: Props) {
    const { isMobile } = useMediaDetect();
    const [drop, c] = useToggle(false);
    const [isPending, start] = useTransition();
    const router = useRouter();
    return (
        <Box
            sx={{
                transform: "translateZ(10)",
                flexGrow: 1,
                zIndex: 50,
                width: 50,

                // position: "relative",
            }}
        >
            <SpeedDial
                direction="down"
                ariaLabel="Fast actions"
                sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    bgcolor: (t) =>
                        drop ? alpha(t.palette.primary.main, 0.7) : "inherit",
                    transition: "all 0.3s ease-in",
                    borderRadius: "1.6rem",
                }}
                onOpen={c.on}
                onClose={c.off}
                open={drop}
                icon={
                    <SpeedDialIcon
                        openIcon={
                            <Icon
                                path={mdiArrowDownBoldHexagonOutline}
                                size={1}
                                color="#ff4848"
                            />
                        }
                        icon={<SettingsTwoTone />}
                    />
                }
            >
                <SpeedDialAction
                    tooltipOpen={!isMobile}
                    tooltipPlacement="right"
                    icon={<Icon path={mdiNewBox} size={1} />}
                    tooltipTitle={"Быстрый старт"}
                    onClick={quickCreate.bind(null)}
                />
                <SpeedDialAction
                    tooltipOpen={!isMobile}
                    tooltipPlacement="right"
                    icon={<Icon path={mdiNewspaperPlus} size={1} />}
                    tooltipTitle={"Создать тренировку"}
                    onClick={() => router.push("/avangard/events/create")}
                />

                {children}
            </SpeedDial>
        </Box>
    );
}

async function quickCreate() {
    const today = _formated_date(dayjs());
    const title = "Тренировка " + today;
    const e = await makeNewEvent(
        { date_formated: today, title, players: [], isDraft: false },
        { cost: 1 }
    );

    return e;
}
