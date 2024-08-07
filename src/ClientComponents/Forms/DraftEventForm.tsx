import { getPlayers } from "@/Services/playerService";
import { Autocomplete, Card } from "@mui/material";
import NameInput from "./PlayerNameInput";

export const CreateDraftEventForm: React.FC<{ eventId: number }> = async ({
    eventId,
}) => {
    const options = await getPlayers().then((r) =>
        r.map((p) => ({ id: p.id, name: p.name }))
    );
    return (
        <form>
            <NameInput options={options} />
        </form>
    );
};
