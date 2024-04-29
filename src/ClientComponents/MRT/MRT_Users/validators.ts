import { User } from "@prisma/client";

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );

export function validateUser(user: User) {
    return {
        nickname: !validateRequired(user.nickname)
            ? 'First Name is Required'
            : '',
        passowrd: !validateRequired(user.password)
            ? 'password required!'
            : ''

    };
}