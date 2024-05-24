'use client'

import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "./getAllUsers";

//READ hook (get users from api)
export function useGetUsers() {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
        refetchOnWindowFocus: false,
    });
}


