import React from "react";
import Box, { BoxProps } from "@mui/material/Box";


export const Pill = (props: BoxProps) => (
  <Box
    { ...props }
    sx={ {
      width: 56,
      height: 24,
      backgroundColor: 'grey',
      borderRadius: 5,
      ...props.sx,
    } }
  />
);
