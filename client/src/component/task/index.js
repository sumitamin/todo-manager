import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Action from '../../actions'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EditTask from './editTask';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import ReactDragList from 'react-drag-list'
import { TaskPdf } from './taskPdf';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginTop:50,
      padding:20,
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    loginHeader:{
        textAlign:'center'
    },
    signUp:{
      cursor: 'pointer',
      textAlign:'center'
    },
    fieldWrapper:{
      margin:"10px 0"
    },
    buttonWrapper:{display:'flex', justifyContent:'flex-end', margin:"10px 0"}
  });

const Task = (props) => {
    const {task, status, message} = props.task
    const classes = useStyles();

    const [newTask, setNewTask] = useState('')
    const [taskToEdit, setTaskToEdit] = useState('')
    const [taskIdToEdit, setTaskIdToEdit] = useState('')
    
    const [open, setOpen] = useState(false)

    useEffect(() => {
        props.taskAction({type:'fetch', isArchive:false})
    }, [])

    const formSubmit = (e) => {
        e.preventDefault()
        props.taskAction({task: newTask, type:'add'})
        setNewTask('')
    }

    const listUpdated = (data) => {
        const {newDraggableIndex, oldDraggableIndex} = data
        props.taskAction({newPriority: newDraggableIndex+1, oldPriority: oldDraggableIndex+1, type:'priority'})
    }

    return (
        <Container maxWidth="sm">
            <Grid container spacing={3} >
                <Grid item xs={12} style={{marginTop:20, marginBottom:20}}>
                    <form onSubmit={formSubmit} autoComplete="off">
                        <TextField style={{width:'80%'}} id="standard-basic" value={newTask} label="Add Task" paceholder="" name="task" type="text" onChange={(e) => setNewTask(e.target.value)}/>
                        <Button type="submit" variant="contained" color="primary">
                            ADD
                        </Button>
                    </form>
                </Grid>

                { !status &&
                <div className={classes.signUp}>
                    <Alert severity="error">{message}</Alert>
                </div>
                }
                <div style={{marginLeft:20}}>
                    <h5>Set Priority by dragging list to the desired position.</h5>
                </div>

                { task && task.length > 0 ?
                <div style={{width:'100%', marginLeft:20}}>
                    <TaskPdf task={task} />
                </div>
                :
                <div style={{width:'100%', marginLeft:20}}> Add task to download pdf </div>
                }

                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Task List</TableCell>
                                    {/* <TableCell align="right">Action</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <ReactDragList
                                    onUpdate={listUpdated}
                                    dataSource={task}
                                    row={(val, i) => 
                                        <TableRow key={i} style={{'display':'flex'}}>
        
                                        <TableCell component="th" scope="row">{val.task}</TableCell>
                                        <TableCell component="th" scope="row" align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={()=>{setTaskToEdit(val.task);setTaskIdToEdit(val._id);setOpen(true)}}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                style={{marginLeft:20}}
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => props.taskAction({task: val._id, type:'delete'})}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                style={{marginLeft:20}}
                                                variant="contained"
                                                color="primary"
                                                onClick={()=>props.taskAction({task: val._id, isArchive:true, type:'archive'})}
                                            >
                                                Archive
                                            </Button>
                                        </TableCell>
                                    </TableRow>}
                                />

                            {/* {task.map((val,i) => 
                            <TableRow key={i}>
                                {console.log(val[0], val[1])}

                                <TableCell component="th" scope="row">{task[i].task}</TableCell>
                                <TableCell component="th" scope="row" align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={()=>{setTaskToEdit(val.task);setTaskIdToEdit(val._id);setOpen(true)}}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                    style={{marginLeft:20}}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => props.taskAction({task: val._id, type:'delete'})}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                            )} */}
                        
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            {open && <EditTask open={open} setOpen={setOpen} task={taskToEdit} taskId={taskIdToEdit}/> }
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        task: state.task
    }
}

const mapDispatchToProps = {
    ...Action
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);