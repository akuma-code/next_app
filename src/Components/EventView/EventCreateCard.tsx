"use client";

import { avatarColor } from "@/ClientComponents/EventsList";
import { _formated_date } from "@/Helpers/dateFuncs";
import { _log } from "@/Helpers/helpersFns";
import { name_letters } from "@/Helpers/stringFns";
import { useGetAllPlayers } from "@/Hooks/useGetEventPlayers";
import { deleteEvent, makeNewEvent } from "@/Services/eventService";
import { mdiAccountCashOutline } from "@mdi/js";
import Icon from "@mdi/react";
import {
    Autocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    FormControl,
    FormLabel,
    Stack,
    TextField,
    ToggleButton,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useMemo, useState } from "react";
import { IPlayer } from "./EventBlank";

interface CreateEventCardProps {
    // ExtendButtonBase<IconButtonTypeMap<{}, "button">>
}

type AcValueChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    value: { id: number; name: string; ticket?: any | null }[],
    reason: AutocompleteChangeReason,
    details?:
        | AutocompleteChangeDetails<{
              id: number;
              name: string;
              ticket?: any | null;
          }>
        | undefined
) => void | undefined;

export const EventCreateCard: React.FC<CreateEventCardProps> = () => {
    const initEvent = {
        date_formated: _formated_date(dayjs()),
        players: [],
        title: "Тренировка",
        isDraft: false,
        cost: 1,
    };
    const [ev, setEvent] = useState<{
        date_formated: string;
        players: IPlayer[];
        title: string;
        isDraft: boolean;
        cost: number;
    }>(initEvent);
    const r = useRouter();

    const [ac_value, setAcValue] = useState("");
    const [eventDate, setEventDate] = useState<Dayjs | null>(() => dayjs());
    const [all_players, isLoading] = useGetAllPlayers();
    const [ac_select, setAcSelect] = useState(all_players);

    const ac_options = useMemo(() => all_players, [all_players]);

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
        setAcSelect((prev) => new_value);
    };
    const handleSubmitEvent = async () => {
        // on()
        const event_data = {
            ...ev,
            players: ac_select,
            date_formated: _formated_date(eventDate),
        };

        _log(event_data);
        await makeNewEvent(event_data);
        // await updateEvent({ id: event_data.id, _new_data: event_data }).finally(() => off())
        r.push("/avangard/events/");
    };

    const handleDelete = async (id: number) => {
        // on()
        if (confirm("Delete event?")) {
            await deleteEvent(id);
            // .finally(() => off())
            r.push("/avangard/events");
        }
    };
    return (
        <>
            <Card>
                <CardHeader title={ev.title} subheader={`Новый ивент`} />
                <CardActions>
                    <ButtonGroup
                        variant="contained"
                        size="small"
                        component={Stack}
                        direction={"row"}
                        fullWidth
                    >
                        <Button onClick={handleSubmitEvent} color="primary">
                            Сохранить
                        </Button>
                        {/* <Button onClick={ () => handleDelete(event.id) } disabled={ isChanging }>Удалить</Button> */}
                        <Button color="info" href={"/avangard/events/"}>
                            Назад
                        </Button>
                    </ButtonGroup>
                </CardActions>

                <CardContent>
                    <Stack rowGap={1} maxWidth={300}>
                        <TextField
                            name="title"
                            value={ev.title}
                            size="small"
                            onChange={changeTitleHandler}
                            helperText={"Изменить название"}
                        />
                        <DatePicker
                            name="date"
                            value={eventDate}
                            onChange={setEventDate}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    helperText: "изменить дату",
                                },
                            }}
                        />

                        <Stack
                            direction={"row"}
                            alignItems={"start"}
                            spacing={2}
                        >
                            <FormControl color="info">
                                <FormLabel sx={{ gap: 1 }} component={Stack}>
                                    <TextField
                                        InputProps={{
                                            type: "number",
                                            margin: "dense",
                                            sx: {
                                                textAlign: "end",
                                                maxWidth: 100,
                                            },
                                            startAdornment: (
                                                <Icon
                                                    path={mdiAccountCashOutline}
                                                    size={1.5}
                                                    color={"darkblue"}
                                                    className="mr-2"
                                                />
                                            ),
                                        }}
                                        size="small"
                                        name="cost"
                                        value={ev.cost}
                                        onChange={(e) =>
                                            setEvent((prev) => ({
                                                ...prev,
                                                cost: Number(e.target.value),
                                            }))
                                        }
                                    />
                                    <Typography>Event Cost</Typography>
                                </FormLabel>
                            </FormControl>

                            <FormControl>
                                <FormLabel sx={{ gap: 1 }} component={Stack}>
                                    <ToggleButton
                                        fullWidth
                                        selected={ev.isDraft}
                                        value={ev.isDraft}
                                        onChange={() =>
                                            setEvent((p) => ({
                                                ...p,
                                                isDraft: !p.isDraft,
                                            }))
                                        }
                                        color={ev.isDraft ? "error" : "warning"}
                                        sx={{
                                            bgcolor: ev.isDraft
                                                ? "error.main"
                                                : "info.light",
                                        }}
                                    >
                                        Черновик: {ev.isDraft ? "on " : "off"}
                                    </ToggleButton>
                                </FormLabel>
                            </FormControl>
                        </Stack>

                        <Autocomplete
                            multiple
                            disableCloseOnSelect
                            forcePopupIcon
                            filterSelectedOptions
                            size="small"
                            autoHighlight
                            loading={isLoading}
                            value={ac_select}
                            onChange={handleAcValueChange}
                            inputValue={ac_value}
                            onInputChange={handleInputChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    helperText={"Изменить состав"}
                                />
                            )}
                            options={ac_options}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            noOptionsText="......"
                            limitTags={3}
                            ListboxProps={{
                                sx: {
                                    ["& .MuiListItem-root"]: { bgcolor: "red" },
                                },
                            }}
                            getLimitTagsText={(more) => (
                                <Avatar
                                    sizes="small"
                                    sx={{
                                        height: 25,
                                        width: 25,
                                        fontSize: 14,
                                        bgcolor: avatarColor(more),
                                    }}
                                >
                                    +{more}
                                </Avatar>
                            )}
                            renderTags={(selected, getTagProps) => {
                                return selected.map((p, index) => {
                                    const { key, ...rest } = getTagProps({
                                        index,
                                    });

                                    const label = name_letters(p.name);
                                    return (
                                        <Chip
                                            variant="filled"
                                            label={label}
                                            {...rest}
                                            key={index}
                                        />
                                    );
                                });
                            }}
                        />
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
};

EventCreateCard.displayName = "____CreateEventCard";
