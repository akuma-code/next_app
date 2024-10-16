"use client";
import UsersMRT from "@/ClientComponents/UserTable/UsersMRT";
import { Box, Paper } from "@mui/material";
import { UserRole } from "@prisma/client";

export type DTO_User = {
    id: number;
    email: string;
    name?: string | null;
    role?: UserRole;
    password?: string | null;
    profile?: {
        id: number;
        userId: number;
        name?: string | null;
    } | null;
};

export const UserList: React.FC<{ users: DTO_User[] }> = ({ users }) => {
    return <Paper elevation={2} sx={{ p: 1 }}></Paper>;
};

export default UserList;
