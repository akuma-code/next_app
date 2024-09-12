import { auth } from "@/auth/auth";
import { readFileFn } from "@/Services/fs/data_service";
import { Container, LinearProgress } from "@mui/material";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import backup from "./../../../public/json/data.json";
import TodoList from "./_components/todo";
import { reseedEventsFromJson } from "./actions";
import { verifySession } from "@/auth/verifySession";
import AccessDenied from "@/ClientComponents/auth/AccessDenied";

const action = reseedEventsFromJson.bind(null, backup);

async function AministratorPage(params: { searchParams: { show: string } }) {
    // const str_items = await loadStrings();
    const todos = await getTodos();
    // const session = await auth();
    const { isAuth } = await verifySession();
    // if (!isAuth) {
    //     console.error("Unauthorized user!");
    //     redirect("/api/auth/error");
    // }

    if (!isAuth) return <AccessDenied />;
    return (
        <Suspense fallback={<LinearProgress />}>
            <Container maxWidth="md">
                {/* <AdminCard seedAction={action} /> */}
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
    } catch (error) {
        throw error;
    }
}
export default AministratorPage;
