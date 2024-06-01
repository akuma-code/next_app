'use client'

import { _dbDateParser, _formated_date } from "@/Helpers/dateFuncs";
import { CloseTwoTone, InsertCommentTwoTone, CheckCircleTwoTone } from "@mui/icons-material";
import { Autocomplete, Box, ButtonGroup, Card, CardContent, CardHeader, Grid, IconButton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Player } from "@prisma/client";
import dayjs from "dayjs";
import { useState } from "react";
import { createForm } from 'react-any-shape-form'

type Member = Pick<Player, 'id' | 'name'>
interface DraftEventProps {
    options?: { id: number, label: string }[]
}
const DraftForm = createForm({


    members: [] as Member[]
})
const initState = { members: [] as Member[] }
const DraftEventForm: React.FC<DraftEventProps> = ({ options }) => {

    const [eventState, setState] = useState(initState)
    const title_date = _dbDateParser(_formated_date(dayjs())).dd_mmmm
    const ac_options = options ? options : eventState.members.map(m => ({ ...m, label: m.name }))
    return (
        <Card elevation={ 4 }>
            <CardHeader title='Запись на тренировку' subheader={ title_date } />

            <CardContent>

                <DraftForm
                    onFinish={ state => setState(state) }
                    initialState={ initState }
                >
                    <Grid container spacing={ 2 } gridRow={ 4 }>
                        {/* <Grid item xs={ 12 }>
                            <DraftForm.Item
                                name="title"
                                onChange={ value => value }
                            >
                                {
                                    ({ value, onChange }) =>
                                        <TextField fullWidth value={ value } onChange={ (e) => onChange(e.target.value) } />
                                }
                            </DraftForm.Item>
                        </Grid> */}
                        <Grid item xs={ 10 } columnGap={ 2 } direction={ 'row' }>
                            <DraftForm.Item
                                name="members"
                                onChange={ value => value }

                            >
                                { ({ value, onChange }) =>
                                    <>
                                        <Autocomplete
                                            freeSolo
                                            autoHighlight
                                            size="small"
                                            options={ ac_options }
                                            renderInput={ (params) =>
                                                <TextField { ...params }
                                                // InputProps={ {
                                                //     startAdornment: <InputAdorment />
                                                // } }
                                                />
                                            }
                                        />
                                    </>

                                }
                            </DraftForm.Item>
                        </Grid>
                        <Grid item xs={ 2 }>

                            <IconButton
                                title="Сохранить"
                                edge={ 'end' }
                                color="success"
                                sx={ { border: '1px solid', mr: 2, } }
                                size="small"
                                type="submit"
                            >
                                <CheckCircleTwoTone />
                            </IconButton>
                        </Grid>
                    </Grid>


                </DraftForm>
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