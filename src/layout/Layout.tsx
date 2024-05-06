import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AddIcon from "@mui/icons-material/Add";

const drawerWidth = 340;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface Apunte {
  id: number;
  author: string; //! PUEDE QUE ESTO SEA UN OBJETO EN EL FUTURO
  title: string;
  text: string;
}

interface MiniDrawerProps {
  apunteList: Apunte[];
  sugeridoList: Apunte[];
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({
  apunteList,
  sugeridoList,
}) => {
  const theme = useTheme();
  const [openBar, setOpenBar] = React.useState(false);
  const [openMisApuntes, setOpenMisApuntes] = React.useState(false);
  const [openSugeridos, setOpenSugeridos] = React.useState(false);

  const handleClick = (option: string) => {
    if (option === "apuntes") {
      setOpenMisApuntes(!openMisApuntes);
      setOpenBar(true);
      return;
    }
    if (option === "sugeridos") {
      setOpenSugeridos(!openSugeridos);
      setOpenBar(true);
      return;
    }
  };

  const handleDrawerOpen = () => {
    setOpenBar(true);
  };

  const handleDrawerClose = () => {
    setOpenBar(false);
    setOpenMisApuntes(false);
    setOpenSugeridos(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={openBar}
        PaperProps={{
          sx: {
            backgroundColor: "#41A9AF",
            color: "white",
          },
        }}
      >
        <DrawerHeader>
          {openBar ? (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              {theme.direction === "ltr" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        {/* //!la lista desde aqui */}
        <List
          // sx={{ backgroundColor: "pink" }}
          sx={{ width: "100%", maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">
          //     Nested List Items
          //   </ListSubheader>
          // }
        >
          <ListItemButton onClick={() => handleClick("apuntes")}>
            <ListItemIcon>
              <TextSnippetIcon />
            </ListItemIcon>
            <ListItemText primary="Mis apuntes" />
            {openMisApuntes ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMisApuntes} timeout="auto" unmountOnExit>
            {apunteList.map((element, index) => (
              <Link
                to={`/misApuntes/${element.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <List key={index} component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4, maxHeight: 50, overflow: "auto" }}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={element.title} />
                  </ListItemButton>
                </List>
              </Link>
            ))}
            <ListItemButton
              sx={{
                pl: 4,
                maxHeight: 50,
                overflow: "auto",
                backgroundColor: "#75BABE",
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Nuevo tema" />
            </ListItemButton>
          </Collapse>

          <ListItemButton onClick={() => handleClick("sugeridos")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Recomendados" />
            {openSugeridos ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSugeridos} timeout="auto" unmountOnExit>
            {sugeridoList.map((element, index) => (
              <Link
                to={`/recomendados/${element.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <List key={index} component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4, maxHeight: 50, overflow: "auto" }}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${element.title}@${element.author}`}
                    />
                  </ListItemButton>
                </List>
              </Link>
            ))}
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MiniDrawer;
