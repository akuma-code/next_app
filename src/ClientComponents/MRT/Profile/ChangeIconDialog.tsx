import Icon from "@mdi/react"
import { Button, Dialog, DialogContent, Grid } from "@mui/material"
import { useState } from "react"






export const ChangeIconDialog: React.FC<ChangeIconDProps> = ({ btn_title, icons, selectIcon }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button color="secondary" variant="contained" onClick={ () => setOpen(true) }>{ btn_title }</Button>
            <Dialog open={ open }
                onClose={ () => setOpen(false) }

            >
                <DialogContent>
                    <Grid container
                        gap={ 1 }
                        // gridTemplateColumns={ 3 }
                        // gridTemplateRows={ 4 }
                        columns={ { xs: 12, md: 9 } }
                    >
                        { icons.map((i, idx) =>
                            <Grid item key={ i.title }
                                onClick={ () => selectIcon(idx) }
                                sx={ { border: '1px solid grey', cursor: 'pointer', p: 1 } }
                                display={ 'flex' }
                                justifyContent={ 'center' }
                                alignItems={ 'center' }
                                direction={ 'column' }
                                sm={ 3 }
                                md={ 2 }
                            >

                                <Icon
                                    title={ i.title }
                                    path={ i.path }
                                    size={ 4 }
                                    aria-labelledby={ `icon_labeledby_${idx}` }
                                />
                                { i.title }
                            </Grid>
                        ) }

                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

type ChangeIconDProps = {
    btn_title: string,
    icons: { title: string, path: string, }[]
    selectIcon: (id: number) => void
}

ChangeIconDialog.displayName = "____IconsDialog"