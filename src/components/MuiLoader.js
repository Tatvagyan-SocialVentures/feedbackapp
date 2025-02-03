import * as React from "react";
import { Dialog, DialogContent } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

function MuiLoader({ open }) {
  return (
    <Dialog
      keepMounted
      open={open}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
    >
      <DialogContent>
        <div>
          <LoadingButton loading></LoadingButton>
          Working on it. Please wait ...
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MuiLoader;
