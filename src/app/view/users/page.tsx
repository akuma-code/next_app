import React from 'react';
import prisma from '../../../../prisma/client/client';
import { Box, Paper } from '@mui/material';

interface UsersProps {
}

const Users: React.FC<UsersProps> = async (props) => {

  const userlist = await getAllUsers()

  return (
    <Box>

    </Box>
  )
};


async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}
export default Users
