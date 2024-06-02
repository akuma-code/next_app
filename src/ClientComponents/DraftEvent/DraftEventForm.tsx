'use client'

import { _dbDateParser, _formated_date } from "@/Helpers/dateFuncs";
import { useDraftEvent } from "@/Hooks/DEvent/useDraftEventState";
import { CloseTwoTone, InsertCommentTwoTone, CheckCircleTwoTone } from "@mui/icons-material";
import { Autocomplete, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Chip, FilledInput, Grid, IconButton, ListItemButton, OutlinedInput, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Player } from "@prisma/client";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { createForm } from 'react-any-shape-form'

type Member = Pick<Player, 'id' | 'name'>
interface DraftEventProps {
    options: { id: number, name: string }[]
}
const DraftForm = createForm({


    members: [] as Member[]
})
const initState = { members: [] as Member[] }


const DraftEventForm: React.FC<DraftEventProps> = ({ options }) => {
    // const [state, setAC] = useState({ input: "", members: [] as Member[] })
    const [eventState, setState] = useState(initState)
    const [ac_value, setName] = useState("")
    const { state, options: ac_options, dispatch } = useDraftEvent({ players: options })
    const title_date = _dbDateParser(_formated_date(dayjs())).dd_mmmm


    const onFinish = async (formData: FormData) => {
        dispatch.add(ac_value)




    }
    // const ac_options = useMemo(() => options.map(o => ({ id: o.id, label: o.name })), [])
    return (
        <Card elevation={ 4 }>
            <CardHeader title='Запись на тренировку' subheader={ title_date } />
            <CardActions>
                <Button onClick={ async () => await dispatch.createEventDraft(state.members) }>Create</Button> </CardActions>
            <CardContent>

                <form id="ed_form" name="draft_form" action={ onFinish }>


                    <Grid container spacing={ 2 } gridRow={ 4 }>

                        <Grid item xs={ 8 } columnGap={ 2 } >

                            {/* <Autocomplete
                                freeSolo

                                autoHighlight
                                size="small"
                                loading
                                options={ ac_options }

                                noOptionsText={ "No options" }
                                renderInput={ (params) => <TextField name="member" { ...params } />
                                }
                                inputValue={ ac_value.name }
                                onInputChange={ (e, v) => setName({ name: v }) }


                            /> */}
                            <TextField size="small" name="candidate" value={ ac_value } onChange={ e => setName(e.target.value) } />



                        </Grid>
                        <Grid item xs={ 2 }>

                            <IconButton
                                title="Сохранить"
                                edge={ 'end' }
                                color="success"
                                sx={ { border: '1px solid', bgcolor: 'primary.main', color: 'primary.dark' } }
                                size="small"
                                type="submit"
                            >
                                <CheckCircleTwoTone />
                            </IconButton>
                        </Grid>
                    </Grid>
                </form>


            </CardContent>
        </Card>
    );
}


const InputAdorment = () => (
    <ButtonGroup>
        <IconButton
            title="Сохранить" edge={ 'end' } color="success" sx={ { border: '1px solid', mr: 1, ml: 0 } } size="small"
        >
            <CheckCircleTwoTone />
        </IconButton>
        {/* <IconButton
                                                                title="Очистить" edge={ 'end' } color='error' sx={ { border: '1px solid', mr: 1 } } size="small"
                                                            >
                                                                <CloseTwoTone />
                                                            </IconButton> */}
    </ButtonGroup>)

DraftEventForm.displayName = "____DraftEventForm"
export default DraftEventForm;