import React from 'react';
import prisma from '../../../../prisma/client/client';
import { Box, Paper } from '@mui/material';
import { UserList } from './UserList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { User } from '@prisma/client';
interface UsersProps {
}

const Users: React.FC<UsersProps> = async (props) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['userlist'],
    queryFn: getAllUsers
  })

  // const userlist = await getAllUsers()
  const userslist = queryClient.getQueryData<User[]>(['userlist'])

  return (
    <HydrationBoundary state={ dehydrate(queryClient) }>

      <Box>

        <UserList users={ userslist } />
      </Box>
    </HydrationBoundary>
  )
};


async function getAllUsers() {
  const users = await prisma.user.findMany()
  return users
}
export default Users
