"use client";

import { useQuerySearch } from "@/Hooks/useQuerySearch";
import { useToggle } from "@/Hooks/useToggle";
import { Button, ButtonGroup } from "@mui/material";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const RestoreButtons: React.FC<{ restore?: string }> = () => {
    const path = usePathname();
    const s = useSearchParams();
    const q = useQuerySearch(s.toString());
    const [load, { on, off, toggle }] = useToggle(s.has("log"));
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
            sx={{ width: 500 }}
        >
            <Button
                onClick={() =>
                    router.replace(path + "?" + q("data", "players"))
                }
            >
                Игроки
            </Button>
            <Button
                onClick={() => router.replace(path + "?" + q("data", "events"))}
            >
                Тренировки
            </Button>
            <Button
                onClick={() => router.replace(path + "?" + q("data", "users"))}
            >
                Пользователи
            </Button>

            <Button
                color={load ? "error" : "success"}
                variant="contained"
                onClick={() => {
                    load ? off() : on();
                    router.push(path + "?" + q("log", isLog));
                }}
            >
                Log {load ? "off" : "on"}
            </Button>
        </ButtonGroup>
    );
};
