import React from "react";
import Box, { BoxProps } from "@mui/material/Box";


export const Circle = (props: BoxProps) => (
  <Box
    { ...props }
    sx={ {
      width: "1em",
      height: "1em",
      fontSize: "40px",
      backgroundColor: 'grey',
      borderRadius: 10,
      flexShrink: 0,
      ...props.sx,
    } }
  />
);
