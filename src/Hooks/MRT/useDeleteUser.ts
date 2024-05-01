'use client'
import { deleteUser } from "@/app/lib/userService";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//DELETE hook (delete user in api)
export function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userName }: { userName: string }) => {
            //send api update request here

            await deleteUser({ nickname: userName })
            console.log(userName, "was deleted")
        },
        //client side optimistic update
        onMutate: ({ userName }: { userName: string }) => {
            queryClient.setQueryData(['users'], (prevUsers: any) => prevUsers?.filter((user: User) => user.nickname !== userName)
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}
