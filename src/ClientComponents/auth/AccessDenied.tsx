"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import LinkMui from "../UI/LinkMui";
import { Alert, Box, Stack, Typography } from "@mui/material";
import Icon from "@mdi/react";
import { mdiAccountAlert } from "@mdi/js";

export default function AccessDenied() {
    return (
        <>
            <Typography
                component={"div"}
                textAlign={"center"}
                variant="h3"
                pt={1}
            >
                В доступе отказано
            </Typography>
            <Box p={5} textAlign={"center"}>
                {/* <Stack>

            </Stack> */}
                <Typography variant="h5" component={"div"}>
                    <Alert
                        variant="filled"
                        color="error"
                        closeText="close"

                        // closeText="df"
                        // icon={<Icon path={mdiAccountAlert} size={2} />}
                        // sx={{ alignText: "center", display: "flex" }}
                    >
                        <LinkMui
                            href="/api/auth/signin"
                            onClick={(e) => {
                                e.preventDefault();
                                signIn();
                            }}
                        >
                            Вы должны быть {` `}авторизованы!
                        </LinkMui>
                        <br />
                        Залогиньтесь, пожалуйста!
                    </Alert>{" "}
                </Typography>{" "}
            </Box>
        </>
    );
}
