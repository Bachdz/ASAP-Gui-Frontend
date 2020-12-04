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
        username: ''
    }

    handleClickOpen = () => {
        this.setState({
            open: !this.state.open
        })
      };

    handleClose = (e) => {
        this.setState({
            open: !this.state.open
        })
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })
    onSubmit = (e) => {
            this.props.addUser(this.state.username);
            this.setState({username : ''});
            this.handleClose;
    } 

    render() {
    const { open } = this.state

    return (
        <div>

            <Button startIcon={<AddIcon id="addIcon" />} id="addButton" onClick={this.handleClickOpen}>Create new peer</Button>

            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogContent id="dialog">
                    <DialogContentText id="dialog-text">
                        Please enter your name
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        type="string"
                        label="Username"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions id="dialog-action">
                    <Button onClick={this.onSubmit} id="button" color="primary">
                        Done
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
}
export default CreateUser ;
