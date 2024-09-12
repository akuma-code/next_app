import { AdminCard } from "@/ClientComponents/AdminCardButtons";
import { Container, LinearProgress } from "@mui/material";
import backup from "./../../../public/json/data.json";
import { reseedEventsFromJson } from "./actions";
import TodoList, { TODO_ITEM } from "./_components/todo";
import { Suspense } from "react";
import { readFileFn } from "@/Services/fs/data_service";

const action = reseedEventsFromJson.bind(null, backup);

async function AministratorPage(params: { searchParams: { show: string } }) {
    // const str_items = await loadStrings();
    const todos = await getTodos();

    return (
        <Container maxWidth="md">
            {/* <AdminCard seedAction={action} /> */}
            <Suspense fallback={<LinearProgress />}>
                <TodoList
                    todo_items={todos.undone || []}
                    done={todos.done || []}
                />
            </Suspense>
        </Container>
    );
}

async function load(file_path: string) {
    const items = await readFileFn(file_path);
    if (!items) {
        console.log("NO ITEMS");
        return "";
    }
    if (typeof items === "string") return JSON.parse(items);
    else return items;
}

async function getTodos() {
    const done = (await load(`public/todos/todos_done.json`)) ?? [];
    const undone = (await load(`public/todos/todos_undone.json`)) ?? [];
    console.log("todos:\n", { done, undone });
    return {
        done: done.map((s: string, idx: number) => ({
            id: idx + 1,
            label: s,
            done: true,
        })),
        undone: undone.map((s: string, idx: number) => ({
            id: idx + 1,
            label: s,
            done: false,
        })),
    };
}
export default AministratorPage;
