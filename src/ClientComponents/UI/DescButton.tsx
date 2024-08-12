"use client";

import { useToggle } from "@/Hooks/useToggle";
import { mdiContentSave, mdiContentSaveOff, mdiEyeOffOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Alert, Button, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState, useTransition } from "react";
type HasReturn<T> = T extends (...args: any) => Promise<infer U>
    ? Promise<U>
    : void;
export const DescriptionButton = (props: {
    title?: string;
    description?: string;
    action: <T>(args?: T) => HasReturn<Promise<T>>;
}) => {
    const { title, description, action } = props;
    const [isPending, start] = useTransition();
    const [error, setError] = useState<null | { message: string }>(null);
    const handleAction = async () => {
        try {
            start(async () => action());
        } catch (error) {
            setError({ message: "Action error: " });
            if (error && typeof error === "object" && "message" in error) {
                const msg = error.message;
                if (typeof msg === "string") setError({ message: msg });
            }
            console.log(error);
        }
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
                {error && <Alert color="error">{error.message}</Alert>}
            </CardContent>
        </Card>
    );
};
export const DescriptionButtonQuery = (props: {
    title?: string;
    description?: string;
    action: <T>(args?: any) => HasReturn<Promise<T>>;
}) => {
    const { title, description, action } = props;
    const [enabled, { toggle }] = useToggle(false);
    const [show, setShow] = useState(true);
    const fn = useCallback(() => {
        return action();
    }, [action]);
    const q = useQuery({
        queryKey: ["server_action", "btn", title?.length],
        queryFn: fn,
        enabled: enabled,
    });
    show && enabled && console.log(q.data);
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
                    fullWidth
                    disabled={q.isLoading}
                    color={"warning"}
                    onClick={toggle}
                    onDoubleClick={() => setShow((prev) => !prev)}
                    variant="contained"
                    size="small"
                    startIcon={
                        <Icon
                            path={enabled ? mdiContentSave : mdiContentSaveOff}
                            size={1.5}
                        />
                    }
                    endIcon={
                        !show && (
                            <Icon
                                path={mdiEyeOffOutline}
                                size={1}
                                color={"lightgrey"}
                            />
                        )
                    }
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
                {q.error && <Alert color="error">{q.error.message}</Alert>}
                {q.isSuccess && show && (
                    <Alert color="success">Тест пройден!</Alert>
                )}
            </CardContent>
        </Card>
    );
};
