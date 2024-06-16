'use client'
import { signIn } from "@/auth/auth";
import { SignInButton } from "@/ClientComponents/auth/SignInButton";
import { Button, ButtonGroup, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "./login";

function SignInForm({ token }: { token?: string }) {
    const [error, dispatch] = useFormState(login, undefined)
    async function signInWithPass(prev: any, formData: FormData) {
        const payload = Object.fromEntries(formData) as { email: string, password: string }
        return await signIn('credentials', payload)
    }
    return (
        <form
            action={ dispatch }
            name='loginform'
            id={ 'loginform' }
            className="p-6 m-4"
        >
            <Paper variant="outlined" sx={ { p: 4 } }>
                <Grid container sx={ { bgcolor: 'background.paper' } } spacing={ 2 }>
                    <Grid item md={ 12 }>
                        <Typography variant="h5" textAlign={ 'center' }>Авторизация</Typography>
                        <input type="hidden" name="CsrfToken" value={ token } />
                    </Grid>
                    <Grid item md={ 6 } flexGrow={ 1 }>
                        <TextField
                            defaultValue={ "" }
                            name='email'
                            color='warning'
                            id='inp-email'
                            size='small'
                            placeholder='введите email'
                            type='email'
                            label="Email"
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid item md={ 6 } flexGrow={ 1 }>
                        <TextField
                            defaultValue={ "" }
                            name='password'
                            fullWidth
                            color='warning'
                            id='passinput'
                            type='password'
                            autoComplete='on'
                            size='small'
                            placeholder='введите пароль'
                            required
                            label="Пароль"
                        />

                    </Grid>
                    <Grid item md={ 12 } flexGrow={ 1 }>
                        <ButtonGroup variant="contained" orientation="horizontal" fullWidth>
                            <RegisterButton />
                            <Button type="reset" variant="contained" color="error">Отмена</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>



            </Paper>

        </form>
    );
}



const RegisterButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={ pending }
            variant='contained'
            color='secondary'

            disabled={ pending }
            type='submit'
        >
            Авторизоваться
        </Button>
    );
}
export default SignInForm;