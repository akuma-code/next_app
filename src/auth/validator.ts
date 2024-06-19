import { Prisma, User } from "@prisma/client";
import { UserAuthPayload } from "./auth";

export const validateRequired = (value: string) => !!value?.length;
export const validateEmail = (email: string) => {
    const isValid = !!email.length &&
        email.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );

    if (isValid) return email
    else return false
}

export function validateUserCreate(user: Prisma.UserCreateInput & { name?: string }) {
    return {
        email: !validateRequired(user.email)
            ? 'Заполните поле почты' as const
            : !validateEmail(user.email)
                ? 'Невалидный адрес почты, проверьте написание' as const
                : '',
        passowrd: !validateRequired(user.password)
            ? 'password required!' as const
            : '',
        name: !user.name
            ? "Не забудьте обновить имя в профиле"
            : ""

    };
}
export function validateUserUpdate(user: Prisma.UserCreateInput & { name?: string }) {
    return {
        email: !validateRequired(user.email)
            ? 'Заполните поле почты' as const
            : !validateEmail(user.email)
                ? 'Невалидный адрес почты, проверьте написание' as const
                : '',

        // name: !user.name
        //     ? "Не забудьте обновить имя в профиле"
        //     : ""
    };
}
export function validateRole(role: string) {

    const regex = /(GUEST)|(ADMIN)|(MEMBER)/gi
    return regex.test(role)
    // return role.match(/(guest)|(admin)|(user)/gi)
}