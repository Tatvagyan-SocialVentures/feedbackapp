import React, { useState } from "react";
import { IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function MuiDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {/* Content for the drawer can be added here later */}
      </Drawer>
    </>
  );
}

export default MuiDrawer;
