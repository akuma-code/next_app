"use client";

import { _dbDateParser } from "@/Helpers/dateFuncs";
import { useSetPathQuery } from "@/Hooks/useSetPathQuery";
import { mdiArrowLeftBoldBox, mdiArrowRightBoldBox } from "@mdi/js";
import Icon from "@mdi/react";
import {
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

type ItemListProps = {
    items: {
        id: number;
        date_formated: string;
        _count?: { players: number; pairs: number };
    }[];
};
const validPage = (page: number) => (page > 0 ? page : 0);

export const ItemsList: React.FC<ItemListProps> = ({ items }) => {
    const [loading, start] = useTransition();
    const search = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const initRpp = Number(search.get("rpp") ?? 10);
    const initPage = Number(search.get("page") ?? 0);
    const [order, setOrder] = useState({ rpp: initRpp, page: initPage });
    const handleOrder = (rpp: number, page: number) => {
        start(async () => {
            const validPage = page <= 0 ? 0 : page;
            const params = new URLSearchParams(search);
            params.set("rpp", rpp.toString());
            params.set("page", validPage.toString());
            setOrder((prev) => ({ ...prev, rpp, page: validPage }));

            const url = `${pathname}?${params.toString()}`;
            router.push(url);
        });
    };

    const list = useMemo(() => {
        const dates = items.map((i) => {
            return {
                id: i.id,
                date: _dbDateParser(i.date_formated).dd_mmmm,
                count: { ...i._count },
            };
        });
        return dates;
    }, [items]);

    const text = (
        item: {
            count: { players?: number; pairs?: number };
            date: string;
        },
        count?: number
    ) => {
        const primary = (
            <span className="flex flex-row justify-between">
                <b>{item.date} </b>
                <code> [всего: {item.count.players || ""}] </code>
            </span>
        );
        const secondary = `${
            item.count.pairs ? "индивидуально: " + item.count.pairs : ""
        }`;
        return { primary, secondary };
    };

    return (
        <Box>
            <List
                disablePadding
                sx={{
                    [`& .MuiListItemText-root`]: { border: "1px solid", p: 1 },
                }}
            >
                <ListItem dense>
                    <ButtonGroup fullWidth size="small" variant="contained">
                        <Button
                            startIcon={
                                <Icon path={mdiArrowLeftBoldBox} size={1} />
                            }
                            color={"warning"}
                            disabled={loading || order.page === 0}
                            onClick={() =>
                                handleOrder(10, validPage(--order.page))
                            }
                        >
                            Назад
                        </Button>
                        <Button
                            endIcon={
                                <Icon path={mdiArrowRightBoldBox} size={1} />
                            }
                            color={"primary"}
                            disabled={loading || order.rpp > items.length}
                            onClick={() =>
                                handleOrder(10, validPage(++order.page))
                            }
                        >
                            Вперед
                        </Button>
                    </ButtonGroup>
                </ListItem>
                {list.map((i, idx) => (
                    <Link href={{ query: { eventId: i.id } }} key={i.id}>
                        <ListItemText
                            key={i.id}
                            {...text(i, idx + 1)}
                            primaryTypographyProps={{
                                // fontWeight: "bold",
                                textTransform: "full-width",
                            }}
                            secondaryTypographyProps={{
                                textAlign: "justify",
                                color: "warning.dark",
                            }}
                        />
                    </Link>
                ))}
            </List>
        </Box>
    );
};
