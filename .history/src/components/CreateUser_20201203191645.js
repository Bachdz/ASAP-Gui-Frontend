import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import '../css/CreateUser.css';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function FormDialog() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Button startIcon={<AddIcon id="addIcon" />} id="addButton" onClick={handleClickOpen}>Create new peer</Button>

            <Dialog id="dialog" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent >
                    <DialogContentText id="dialog-text">
                        Please enter your name
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="username"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions id="dialog-action">
                    <Button onClick={handleClose} id="button" color="primary">
                        Done
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
