import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Action from '../../actions'
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const EditTask = (props) => {
    const {open, setOpen} = props
    const [edit, setEdit] = useState(props.task)
    const classes = useStyles();

    const formSubmit = (e) => {
        e.preventDefault()
        props.taskAction({oldTask:props.taskId, newTask:edit, type:'update'})
        setEdit('')
        setOpen(false)
    }

    const handleClose = () => {
        setEdit('')
        setOpen(false)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
            <Fade in={open}>
            <div className={classes.paper} >
                <h2 id="transition-modal-title">Edit Task</h2>
                <form onSubmit={formSubmit} autoComplete="off">
                    <TextField id="edit-task" value={edit} label="Edit Task" paceholder="" name="task" type="text" onChange={(e) => setEdit(e.target.value)}/>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </form>
            </div>
            </Fade>
        </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    ...Action
}

export default connect(null, mapDispatchToProps)(EditTask);