import { User } from "@prisma/client";
import { UserAuthPayload } from "./auth";

export const validateRequired = (value: string) => !!value.length;
export const validateEmail = (email: string) => {
    const isValid = !!email.length &&
        email.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );

    if (isValid) return email
    else return false
}

export function validateUser(user: User) {
    return {
        email: !validateRequired(user.email)
            ? 'First Name is Required'
            : '',
        passowrd: !validateRequired(user.password)
            ? 'password required!'
            : '',
        // role: !validateRole(user.role)
        //     ? 'user role error!'
        //     : ''
    };
}
export function validateRole(role: string) {

    const regex = /(GUEST)|(ADMIN)|(MEMBER)/gi
    return regex.test(role)
    // return role.match(/(guest)|(admin)|(user)/gi)
}