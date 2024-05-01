'use client'
import { createUser } from "@/app/lib/userService";
import { User, UserRoles } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";



//CREATE hook (post new user to api)
type CreationPayload = {
    nickname: string
    password: string
    role: UserRoles
}
export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ nickname, password, role = 'guest' }: CreationPayload) => {

            const user = await createUser({ nickname, password, role })
            return user

        },
        //client side optimistic update
        onMutate: (newUserInfo: CreationPayload) => {
            queryClient.setQueryData(
                ['users'],
                (prevUsers: any) =>
                    [
                        ...prevUsers,
                        {
                            ...newUserInfo,

                        },
                    ] as User[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}