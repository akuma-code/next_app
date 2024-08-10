"use client";

import { mdiContentSave } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useTransition } from "react";

export const DescriptionButton = (props: {
    title?: string;
    description?: string;
    action: (...args: any) => Promise<any>;
}) => {
    const { title, description, action } = props;
    const [isPending, start] = useTransition();
    const handleAction = async () => {
        start(async () => action());
    };
    return (
        <Card
            sx={{
                border: "1px solid black",
                borderRadius: "1rem",
                width: "fit-content",
                maxWidth: 320,
                height: "fit-content",
            }}
        >
            <CardContent>
                <Button
                    disabled={isPending}
                    color="warning"
                    onClick={handleAction}
                    variant="contained"
                    size="small"
                    startIcon={<Icon path={mdiContentSave} size={2} />}
                >
                    {title}
                </Button>
                <Typography
                    variant="body1"
                    textAlign={"start"}
                    marginInlineStart={1}
                    component={"div"}
                    p={1}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};
