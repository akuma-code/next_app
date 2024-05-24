import { StpNumProp, User, UserRoles } from "@prisma/client";

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
            : '',
        role: !validateRole(user.role)
            ? 'user role error!'
            : ''
    };
}
function validateRole(role: string) {

    const regex = /(guest)|(admin)|(user)/gi
    return regex.test(role)
    // return role.match(/(guest)|(admin)|(user)/gi)
}
function validateNumProps(item: any): item is StpNumProp {
    const numPropFields = [
        'Ro',
        'Rw',
        'Lt',
        'Lr',
        'Ra',
        'De',
        'Er',
        'Ea',
        'Sf',
        'S',
        'weight',
    ] as const

    return numPropFields.every(f => f in item)
}

