import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { Square } from "../mockup-shape";


export const StatCardMockup = (props: BoxProps) => {
  return (
    <Box
      { ...props }
      sx={ {
        borderRadius: 1,
        border: "1px solid",
        // borderColor: getLightGrey,
        bgcolor: "background.paper",
        p: 1.5,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
        ...props.sx,
      } }
    >
      <Square />
      <Box sx={ { ml: 1.5, minWidth: "0px" } }>

      </Box>
    </Box>
  );
};
