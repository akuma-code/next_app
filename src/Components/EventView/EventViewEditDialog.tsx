"use client";

import { IEvent_Front } from "@/ClientComponents/EventsList";
import { _dbDateParser, _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { name_letters } from "@/Helpers/stringFns";
import { useGetAllPlayers } from "@/Hooks/useGetEventPlayers";
import { useToggle } from "@/Hooks/useToggle";
import { updateEventPlayers } from "@/Services/eventService";
import { SettingsTwoTone } from "@mui/icons-material";
import {
    Autocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    Box,
    Button,
    ButtonTypeMap,
    Checkbox,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    ExtendButtonBase,
    IconButton,
    IconButtonTypeMap,
    Stack,
    TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import {
    ChangeEvent,
    ReactElement,
    SyntheticEvent,
    useMemo,
    useState,
} from "react";
import { IPlayer } from "./EventBlank";

interface EditEventDialogProps {
    event: IEvent_Front;
    buttonVariant?: "base" | "icon";
    // ExtendButtonBase<IconButtonTypeMap<{}, "button">>
}

type AcValueChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    value: IPlayer[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IPlayer> | undefined
) => void | undefined;
export const EventViewEditDialog: React.FC<EditEventDialogProps> = ({
    event,
    buttonVariant = "base",
}) => {
    const { id, date_formated, players, title, cost } = event;
    const [ev, setEvent] = useState(event);
    const [open, control] = useToggle();
    const [isChanged, change_control] = useToggle();
    const [ac_value, setAcValue] = useState("");
    const [ac_select, setAcSelect] = useState<IPlayer[]>(players);
    const [eventDate, setEventDate] = useState<Dayjs | null>(
        () => _dbDateParser(date_formated)._dayjs
    );
    const [all_players, isLoading] = useGetAllPlayers();
    function changeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        return setEvent((prev) => ({ ...prev, title: e.target.value }));
    }
    function handleInputChange(
        event: SyntheticEvent<Element, Event>,
        value: string
    ) {
        // change_control.on()
        setAcValue(value);
    }
    const handleAcValueChange: AcValueChangeHandler = (
        e,
        new_value,
        reason,
        details
    ) => {
        // _log({ reason })
        // _log({ details })
        // change_control.on()
        setAcSelect((prev) => new_value);
    };
    const ac_options = useMemo(() => all_players, [all_players]);
    const handleSubmitEvent = async () => {
        const event_data = {
            ...ev,
            players: ac_select,
            date_formated: _formated_date(eventDate),
            cost: ev.cost,
        };

        _log({ event_data });
        await updateEventPlayers({ id: event_data.id, _new_data: event_data });
        control.off();
    };
    return null;
    // (
    // <>
    //     <div>
    //         {buttonVariant === "base" ? (
    //             <Button
    //                 onClick={control.toggle}
    //                 variant="outlined"
    //                 size="small"
    //             >
    //                 Изменить
    //             </Button>
    //         ) : (
    //             <IconButton onClick={control.toggle}>
    //                 <SettingsTwoTone />
    //             </IconButton>
    //         )}
    //     </div>
    //     <Dialog open={open} onClose={control.off}>
    //         <DialogTitle>
    //             <Box display={"flex"} justifyContent={"space-between"}>
    //                 Edit Event id: {id}
    //                 <Button
    //                     onClick={handleSubmitEvent}
    //                     disabled={isChanged}
    //                 >
    //                     Submit
    //                 </Button>
    //             </Box>
    //         </DialogTitle>
    //         <DialogContent>
    //             <Stack rowGap={1} maxWidth={300}>
    //                 <TextField
    //                     name="title"
    //                     value={ev.title}
    //                     size="small"
    //                     onChange={changeTitleHandler}
    //                     helperText={"Изменить название"}
    //                 />
    //                 <DatePicker
    //                     name="date"
    //                     value={eventDate}
    //                     onChange={setEventDate}
    //                     slotProps={{
    //                         textField: {
    //                             size: "small",
    //                             helperText: "изменить дату",
    //                         },
    //                     }}
    //                 />

    //                 <Autocomplete
    //                     multiple
    //                     disableCloseOnSelect
    //                     loading={isLoading}
    //                     value={ac_select}
    //                     onChange={handleAcValueChange}
    //                     inputValue={ac_value}
    //                     onInputChange={handleInputChange}
    //                     renderInput={(params) => <TextField {...params} />}
    //                     options={ac_options}
    //                     getOptionLabel={(option) => option.name}
    //                     isOptionEqualToValue={(option, value) =>
    //                         option.id === value.id
    //                     }
    //                     renderOption={(props, option, { selected }) => {
    //                         const p = props;
    //                         return (
    //                             <li {...p}>
    //                                 <Checkbox
    //                                     style={{
    //                                         marginRight: 4,
    //                                         marginLeft: 4,
    //                                     }}
    //                                     checked={selected}
    //                                 />
    //                                 {option.name}
    //                             </li>
    //                         );
    //                     }}
    //                     limitTags={6}
    //                     getLimitTagsText={(more) =>
    //                         `+${more}, итого: ${ac_select.length}`
    //                     }
    //                     renderTags={(selected, getTagProps) =>
    //                         selected.map((p, index) => {
    //                             const { key, ...rest } = getTagProps({
    //                                 index,
    //                             });

    //                             const label = name_letters(p.name);
    //                             return (
    //                                 <Chip
    //                                     variant="filled"
    //                                     label={label}
    //                                     {...rest}
    //                                     key={p.name}
    //                                 />
    //                             );
    //                         })
    //                     }
    //                 />
    //             </Stack>
    //         </DialogContent>
    //     </Dialog>
    // </>
    // );
};

EventViewEditDialog.displayName = "____EditEventDialog";
