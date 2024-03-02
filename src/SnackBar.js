import * as React from "react";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
export default function SnackBar({ open, message }) {
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
      >
        <Alert
          icon={<CheckIcon fontSize="inherit" style={{ color: "#BBFFA2" }} />}
          variant="outlined"
          severity="primary"
          style={{ color: "#BBFFA2", backgroundColor: "#666666" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
