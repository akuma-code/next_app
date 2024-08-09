import { getPlayers } from "@/Services/playerService";
import {
    Autocomplete,
    Card,
    FormControl,
    FormHelperText,
    Grid,
    List,
    ListItem,
    MenuItem,
    TextField,
} from "@mui/material";
import NameInput from "./PlayerNameInput";
import prisma from "@/client/client";
import { getSelected } from "@/Services/board/boardActions";
import { getMasters } from "@/Services/masterService";

export const CreateDraftEventForm: React.FC<{ eventId: number }> = async ({
    eventId,
}) => {
    const options = await getPlayers().then((r) =>
        r.map((p) => ({ id: p.id, name: p.name }))
    );
    const masters = await getMasters();
    const selected_players = await getSelected(eventId);
    return (
        <Grid
            container
            bgcolor={"secondary.light"}
            p={1}
            gap={1}
            sx={{
                [`& .MuiGrid-item`]: { p: 1, border: "1px solid" },
            }}
        >
            <Grid item md={4}>
                <NameInput options={options} />
            </Grid>
            <Grid item md={3}>
                Players
                <List>
                    {selected_players &&
                        selected_players.map((p) => (
                            <ListItem key={p.id}>{p.name}</ListItem>
                        ))}
                </List>
            </Grid>
            <Grid item md={3}>
                <FormControl fullWidth>
                    <TextField
                        select
                        placeholder="Master"
                        defaultValue={""}
                        variant="filled"
                    >
                        {masters.map((m) => (
                            <MenuItem key={m.id} value={m.name}>
                                {m.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormHelperText>Резерв столов: </FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    );
};
