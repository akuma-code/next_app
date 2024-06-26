import React from "react";
import Box, { BoxProps } from "@mui/material/Box";


export const Square = (props: BoxProps) => (
  <Box
    { ...props }
    sx={ {
      width: "1em",
      height: "1em",
      fontSize: "40px",
      backgroundColor: 'grey',
      borderRadius: 1,
      flexShrink: 0,
      ...props.sx,
    } }
  />
);
