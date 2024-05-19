import React from "react";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses, TabsProps } from "@mui/material/Tabs";

export const ChromeTabItem = styled(Tab)(({ theme }) => ({
  opacity: 1,
  overflow: "initial",
  paddingLeft: theme.spacing(0.2),
  paddingRight: theme.spacing(0.2),
  borderTopLeftRadius: theme.spacing(1),
  borderTopRightRadius: theme.spacing(1),
  color: (theme).palette.text.primary,
  backgroundColor: (theme).palette.grey[100],
  transition: "0.2s",
  zIndex: 2,
  marginTop: theme.spacing(0.5),
  textTransform: "initial",
  [theme.breakpoints.up("md")]: {
    minWidth: 100,
  },
  "&:before": {
    transition: "0.2s",
  },
  "&:not(:first-of-type)": {
    "&:before": {
      content: '" "',
      position: "absolute",
      left: 0,
      display: "block",
      height: 20,
      width: "1px",
      zIndex: 1,
      marginTop: theme.spacing(0.5),
      backgroundColor: (theme).palette.grey[500],
    },
  },
  [`& + .${tabClasses.selected}::before`]: {
    opacity: 0,
  },
  "&:hover": {
    [`&:not(.${tabClasses.selected})`]: {
      backgroundColor: "rgba(0 0 0 / 0.2)",
    },
    "&::before": {
      opacity: 0,
    },
    [`& + .${tabClasses.root}::before`]: {
      opacity: 0,
    },
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: (theme).palette.grey[500],//(theme).palette.grey[600]
    color: (theme).palette.common.white,
  },
  [`&.${tabClasses.selected} + .${tabClasses.root}`]: {
    zIndex: 1,
  },
  [`&.${tabClasses.selected} + .${tabClasses.root}::before`]: {
    opacity: 0,
  },
}));

export function TabsChrome({ sx, children, value, onChange }: TabsProps) {

  return (
    <Tabs
      value={ value }
      onChange={ onChange }
      variant="scrollable"
      sx={ {

        [`& .${tabsClasses.indicator}`]: { display: "none", },

      } }
    >
      { children }
    </Tabs>
  );
}
