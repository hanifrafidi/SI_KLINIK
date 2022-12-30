import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function SimpleBackdrop({isOpen, setIsOpen}) {
  const [open, setOpen] = React.useState(isOpen);
  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpen}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}