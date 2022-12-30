import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function AlertMassage({ message, status, type }) {
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (    
    <>
    { 
     type === 'create' ? 
        <div>
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}                        
        >
            <Alert severity='success'>{message}</Alert>
        </Snackbar>
        </div>
      : type === 'update' ? 
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}                        
            >
                <Alert severity='success'>{message}</Alert>
            </Snackbar>
        </div>
        : type === 'error' ? 
        <div>
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}                        
        >
            <Alert severity='error'>{message}</Alert>
        </Snackbar>
        </div>
          : ''
        
    }  
    </>
  )
}
