import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { Circle, Square } from "../mockup-shape";


export const UserActiveCardMockup = (props: BoxProps) => {
  return (
    <Box
      { ...props }
      sx={ {
        borderRadius: 1,
        border: "1px solid",
        borderColor: 'lightgrey',
        bgcolor: "background.paper",
        p: 1.5,
        boxShadow: "0 2px 6px 0 rgba(0,0,0,0.08)",
        ...props.sx,
      } }
    >
      <Box sx={ { display: "flex", alignItems: "center", width: "100%" } }>
        <Circle sx={ { fontSize: 20, ml: "auto" } } />
      </Box>
      <br />
      <Box sx={ { display: "flex", justifyContent: "space-around" } }>
        <Box>
          <Box sx={ { display: "flex", alignItems: "center" } }>
            <Square sx={ { fontSize: 16, bgcolor: "primary.main", mr: 1 } } />
            <Typography variant="h4">
              <b>92%</b>
            </Typography>
          </Box>

        </Box>
        <Box>
          <Box sx={ { display: "flex", alignItems: "center" } }>
            <Square sx={ { fontSize: 16, bgcolor: "error.main", mr: 1 } } />
            <Typography variant="h4">
              <b>8%</b>
            </Typography>
          </Box>

        </Box>
      </Box>
      <br />
      <LinearProgress
        variant="determinate"
        value={ 92 }
        sx={ {
          height: 10,
          borderRadius: 3,
          bgcolor: 'lightgrey',
          "& > .MuiLinearProgress-bar": {
            borderRadius: 3,
          },
        } }
      />
      <Box height={ 16 } />
      <LinearProgress
        variant="determinate"
        value={ 8 }
        sx={ {
          height: 10,
          borderRadius: 3,
          bgcolor: 'lightgrey',
          "& > .MuiLinearProgress-bar": {
            borderRadius: 3,
            bgcolor: "error.main",
          },
        } }
      />
      <br />
    </Box>
  );
};
