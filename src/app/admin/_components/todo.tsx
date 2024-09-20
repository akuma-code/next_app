"use client";
import Grid2 from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress } from "@mui/material";
import React, { Suspense, useCallback, useMemo, useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowCollapseRight, mdiArrowCollapseLeft } from "@mdi/js";
import {
    readFileFn,
    writeFileFn,
    writeFilePath,
} from "@/Services/fs/data_service";

export type TODO_ITEM = {
    label: string;
    id: number;
    done?: boolean;
};
const TodoList = ({
    todo_items,
    done,
}: {
    todo_items: TODO_ITEM[];
    done?: TODO_ITEM[];
}) => {
    return (
        <Box p={1}>
            <TransferList undone={todo_items} done={done} />
        </Box>
    );
};

//__========================================================================================
function _mapId(items: { id: number }[]) {
    return items.map((i) => i.id);
}

function not(a: number[], b: TODO_ITEM[]) {
    return b.filter((v) => !a.includes(v.id));
}

function intersection(a: number[], b: TODO_ITEM[]) {
    return b.filter((v) => a.includes(v.id));
}

async function loadTodos(filename: string) {
    const items = (await readFileFn(`public/todos/todos_undone.json`)) as
        | string
        | null;
    if (items) return JSON.parse(items);
    else return [];
}

// function loadUncompleteTodos() {
//     try {
//         let res: any;
//         loadTodos("todos_undone").then((r) => (res = r), console.log);
//         let t = Promise.resolve(loadTodos("todos_undone"));
//         console.log(t);
//         return res;
//     } catch (error) {
//         throw error;
//     }
// }
//!=========================================================================================

function TransferList({
    undone,
    done,
}: {
    undone: TODO_ITEM[];
    done?: TODO_ITEM[];
}) {
    const [checked, setChecked] = useState<number[]>([]);
    const [right, setRight] = useState<TODO_ITEM[]>(done || []);
    const [left, setLeft] = useState(undone || []);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = useCallback(
        (value: number) => () => {
            const current = checked.indexOf(value);
            const newChecked = [...checked];

            if (current === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(current, 1);
            }

            setChecked(newChecked);
        },
        [checked]
    );

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(_mapId(leftChecked), left));
        setChecked(_mapId(not(checked, leftChecked)));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(_mapId(right), rightChecked));
        setChecked(_mapId(not(checked, rightChecked)));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const handleDone = async () => {
        setRight((prev) => prev.map((p) => ({ ...p, done: true })));
        await writeFilePath(
            "public/todos/todos_done.json",
            right.map((r) => r.label)
        );
        await writeFilePath(
            "public/todos/todos_undone.json",
            left.map((r) => r.label)
        );
    };
    const handleUndone = () => {
        setLeft((prev) => prev.map((p) => ({ ...p, done: false })));
    };
    const customList = useMemo(() => {
        const list = (items: TODO_ITEM[]) => (
            <Paper
                sx={{
                    width: 300,
                    height: 230,
                    overflow: "auto",
                    border: "1px dashed",
                }}
            >
                <List dense component="div" role="list">
                    {items.map((i) => {
                        const labelId = `transfer-list-item-${i.id}-label`;

                        return (
                            <ListItemButton
                                key={i.id}
                                role="listitem"
                                onClick={handleToggle(i.id)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        defaultChecked={
                                            checked.includes(i.id) || i.done
                                        }
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            "aria-labelledby": labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={i.label}
                                    primary={i.label}
                                    secondary={i.done ? "Сделано!" : ""}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Paper>
        );
        return list;
    }, [checked, handleToggle]);

    return (
        <Grid2
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Suspense fallback={<CircularProgress />}>
                <Grid2>{customList(left)}</Grid2>
                {/* <Grid2> */}
                <Grid2
                    container
                    direction="column"
                    sx={{ alignItems: "center" }}
                >
                    <Button
                        fullWidth
                        color="warning"
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleDone}
                        disabled={right.length === 0}
                        aria-label="move all left"
                        endIcon={<Icon path={mdiArrowCollapseRight} size={1} />}
                    >
                        Complete
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>

                    <Button
                        fullWidth
                        color="success"
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleUndone}
                        disabled={left.length === 0}
                        aria-label="move all left"
                        startIcon={
                            <Icon path={mdiArrowCollapseLeft} size={1} />
                        }
                    >
                        UnComplete
                    </Button>
                </Grid2>
                {/* </Grid2> */}
                <Grid2>{customList(right)}</Grid2>
            </Suspense>
        </Grid2>
    );
}

export default TodoList;
