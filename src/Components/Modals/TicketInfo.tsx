"use client";

import { MRT_Player } from "@/Hooks/useGetEventPlayers";
import { useToggle } from "@/Hooks/useToggle";
import { getOneTicket } from "@/Services/tickets/ticketService";
import { mdiInformationVariantCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import { MRT_Row } from "material-react-table";

export const TicketInfo = ({
    row,
    // open,
    // onClose,
}: {
    row: MRT_Row<MRT_Player>;
    // open: boolean;
    // onClose: () => void;
}) => {
    const [open, c] = useToggle();
    const { original } = row;
    const { hasTicket, id, name } = original;
    const q = useQuery({
        enabled: open,
        queryKey: ["ticket", "player", id],
        queryFn: () => getOneTicket({ where: { playerId: id } }),
        staleTime: 60 * 1000,
    });

    return (
        <>
            <IconButton key={"info_" + row.id} onClick={c.toggle}>
                <Icon path={mdiInformationVariantCircleOutline} size={1} />
            </IconButton>
            <Dialog open={open} onClose={c.off}>
                <DialogContent>
                    {q.data && (
                        <Typography>
                            Осталось: {q.data.amount} / {q.data.limit}
                        </Typography>
                        // <Gauge
                        //     width={100}
                        //     height={100}
                        //     value={q.data?.amount || 0}
                        //     valueMax={q.data?.limit || 10}
                        //     startAngle={0}
                        //     endAngle={0}
                        //     text={({ value, valueMax }) =>
                        //         `${value} / ${valueMax}`
                        //     }
                        //     sx={{
                        //         [`& .${gaugeClasses.valueText}`]: {
                        //             fontSize: 12,
                        //             // transform: "translate(0px, 0px)",
                        //         },
                        //     }}
                        // />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TicketInfo;
