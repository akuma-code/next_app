"use client";

import { _log, _promptVar } from "@/Helpers/helpersFns";
import { useQuerySearch } from "@/Hooks/useQuerySearch";
import { useToggle } from "@/Hooks/useToggle";
import { seedEvents } from "@/Services/eventService";
import { seedPlayers } from "@/Services/playerService";
import { Button, ButtonGroup } from "@mui/material";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const RestoreButtons: React.FC<{ restore?: string }> = () => {
    const [load, { on, off, toggle }] = useToggle(false);

    const path = usePathname();
    const s = useSearchParams();
    const q = useQuerySearch(s.toString());
    const router = useRouter();
    const isLog = useMemo(
        () => (load === true ? ("on" as const) : ("off" as const)),
        [load]
    );
    // _log(Object.entries(s.))
    return (
        <ButtonGroup
            variant="contained"
            fullWidth
            size="small"
            sx={{ maxWidth: 500 }}
        >
            <Button
                onClick={() => router.push(path + "?" + q("data", "players"))}
            >
                Игроки
            </Button>
            <Button
                onClick={() => router.push(path + "?" + q("data", "events"))}
            >
                Тренировки
            </Button>
            <Button
                onClick={() => router.push(path + "?" + q("data", "players"))}
            >
                Пользователи
            </Button>

            <Button
                color={load ? "error" : "success"}
                variant="contained"
                onClick={() => {
                    !load ? on() : off();
                    router.push(path + "?" + q("log", isLog));
                }}
            >
                Log {load ? "off" : "on"}
            </Button>
        </ButtonGroup>
    );
};
