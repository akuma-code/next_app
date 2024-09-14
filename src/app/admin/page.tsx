import { readFileFn } from "@/Services/fs/data_service";
import { Container, LinearProgress } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";
import TodoList from "./_components/todo";

async function AministratorPage(params: { searchParams: { show: string } }) {
    // const str_items = await loadStrings();
    const todos = await getTodos();

    return (
        <Suspense fallback={<LinearProgress />}>
            <Container maxWidth="md">
                {/* <AdminCard seedAction={action} /> */}
                {/* <Link href="/admin/v/view">VIEWLINK</Link> */}
                {todos && (
                    <TodoList
                        todo_items={todos.undone || []}
                        done={todos.done || []}
                    />
                )}
            </Container>
        </Suspense>
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
    try {
        const done = (await load(`public/todos/todos_done.json`)) ?? [];
        const undone = (await load(`public/todos/todos_undone.json`)) ?? [];

        // console.log("todos:\n", { done, undone });
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
    } catch (error) {
        console.log(error);
        return null;
    }
}
export default AministratorPage;
