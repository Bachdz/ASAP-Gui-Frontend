import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import '../css/CreateUser.css';
import DialogContentText from '@material-ui/core/DialogContentText';

export class FormDialog extends Component {
    state = {
        name: ''
    }
     [open, setOpen] = React.useState(false);

     handleClickOpen = () => {
        setOpen(true);
    };

     handleClose = (e) => {
        this.setState ({[e.target.name] : e.target.value});
        setOpen(false);
    };

    onChange = (e) => this.setState()

    render() {
    return (
        <div>

            <Button startIcon={<AddIcon id="addIcon" />} id="addButton" onClick={this.handleClickOpen}>Create new peer</Button>

            <Dialog  onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogContent id="dialog">
                    <DialogContentText id="dialog-text">
                        Please enter your name
          </DialogContentText>
                    <TextField
                        value={this.state.name}
                        autoFocus
                        margin="dense"
                        id="name"
                        type="string"
                        fullWidth
                        onChange={this.onChange}
                    />
                </DialogContent>
                <DialogActions id="dialog-action">
                    <Button onClick={this.handleClose} id="button" color="primary">
                        Done
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
}
export default CreateUser ;
