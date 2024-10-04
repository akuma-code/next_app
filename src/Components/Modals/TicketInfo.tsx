"use client";

import { useTicket } from "@/Hooks/MRT/Ticket/useTicket";
import { MRT_Player } from "@/Hooks/useGetEventPlayers";
import { useToggle } from "@/Hooks/useToggle";
import { getOneTicket } from "@/Services/tickets/ticketService";
import {
    mdiAlphabeticalVariantOff,
    mdiAlphaTBoxOutline,
    mdiBallot,
    mdiImageEditOutline,
    mdiInformationVariantCircleOutline,
    mdiTicketAccount,
} from "@mdi/js";
import Icon from "@mdi/react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Typography,
} from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    const { applyTicket, openTicket, removeTicket } = useTicket();
    const q = useQuery({
        enabled: open,
        queryKey: ["ticket_playerId", id],
        queryFn: () => getOneTicket({ where: { playerId: id } }),
        staleTime: 60 * 1000,
    });
    // if (!q.isSuccess) return null;
    const t = q.data || null;

    return (
        <>
            <IconButton
                key={"info_" + row.id}
                onClick={c.toggle}
                color="warning"
            >
                <Icon path={mdiBallot} size={1} />
            </IconButton>
            <Dialog open={open} onClose={c.off}>
                <DialogContent>
                    {q.data && (
                        <Typography>
                            Осталось: {q.data.amount} / {q.data.limit}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <IconButton
                        title="extend"
                        onClick={() =>
                            openTicket({ id, name, ticket: t }, { limit: 10 })
                        }
                    >
                        <Icon path={mdiTicketAccount} size={1} />
                    </IconButton>

                    <IconButton title="create">
                        <Icon path={mdiImageEditOutline} size={1} />
                    </IconButton>
                    <IconButton
                        title="remove"
                        color="error"
                        onClick={() => removeTicket({ id, name, ticket: t })}
                    >
                        <Icon path={mdiAlphabeticalVariantOff} size={1} />
                    </IconButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

// const useTicketMutate=(playerId:number, payload:unknown)=>{
//     const q = useMutation({
//         mutationKey:["ticket", playerId],
//         mnutationFn:(playerId, payload)=>

//     })
// }

export default TicketInfo;
