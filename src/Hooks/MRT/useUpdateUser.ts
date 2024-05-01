'use client'
import { editUser } from "@/app/lib/userService";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//UPDATE hook (put user in api)
export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: User) => {
            const { uuid } = user
            editUser({ uuid }, user)
        },
        //client side optimistic update
        onMutate: (newUserInfo: User) => {
            queryClient.setQueryData(['users'], (prevUsers: any) => prevUsers?.map((prevUser: User) => prevUser.id === newUserInfo.id ? newUserInfo : prevUser
            )
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}
