import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import '../css/CreateUser.css';
import DialogContentText from '@material-ui/core/DialogContentText';

export class CreateUser extends Component {
    state = {
        open: false,
        name: ''
    }

    handleClickOpen = () => {
        this.setState({
            open: !this.state.open
        })
      };

    handleClose = (e) => {
      
    };

    onChange = (e) => this.setState()

    render() {
    const { open } = this.state

    return (
        <div>

            <Button startIcon={<AddIcon id="addIcon" />} id="addButton" onClick={this.handleClickOpen}>Create new peer</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                    <Button onClick={handleClose} id="button" color="primary">
                        Done
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
}
export default CreateUser ;
