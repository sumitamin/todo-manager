import { SIGN_UP, LOGIN, ADD_TASK, FETCH_TASK, EDIT_TASK, DELETE_TASK, AUTH_RESULT, TASK_ACTION, CLEAR_ACTION, ARCHIVE_TASK } from "../constant";
    
  const initialState = {
    isError: false,
    isLoading: false,
    status:true,
    message: '',
    task:[]
  };
  
  const authReducer = (state = initialState, action) => {
      switch (action.type) {
        
        case AUTH_RESULT:
        return {
          ...state,
          isError: !action.payload.status,
          isLoading: false,
          status:action.payload.status,
          message:action.payload.message
        }

        case SIGN_UP:
        return {
          ...state,
          isError: false,
          isLoading: true,
          status:true,
          message:''
        }

        case LOGIN:
        return {
          ...state,
          isError: false,
          isLoading: true,
          status:true,
          message:''
        }

        case CLEAR_ACTION:
        return {
          ...state,
          isError: false,
          isLoading: true,
          status:true,
          message:''
        }

        case TASK_ACTION:

        let tasks = state.task

        if (action.payload.type === 'fetch'){
          tasks = []
        }
        
        return {
          ...state,
          isError: false,
          isLoading: true,
          status:true,
          message:'',
          task:[...tasks]
        }

        case ADD_TASK:
        return {
          ...state,
          task:[...state.task, action.payload.task],
          isError: !action.payload.status,
          isLoading: false,
          status: action.payload.status,
          message: action.payload.message
        }

        case ARCHIVE_TASK:
        const taskArchive = [...state.task]
        const {task, status} = action.payload
        let filterTasks = taskArchive
        if (status){
          filterTasks = taskArchive.filter(v => v._id && task && v._id.toString() !== task.toString())
        }

        return {
          ...state,
            task:[...filterTasks],
            isError: !action.payload.status,
            isLoading: false,
            status: action.payload.status,
            message: action.payload.message
          }

        case FETCH_TASK:
        const {message} = action.payload
        let taskFetched = []
        if (action.payload.status){
          taskFetched = [...action.payload.task]
        }

        return {
          ...state,
          task:[...taskFetched],
          isError: !action.payload.status,
          isLoading: false,
          status: action.payload.status,
          message: message
        }

        case DELETE_TASK:
        
        const allTask = [...state.task]
        const delTask = action.payload.task
        let filterTask = allTask
        if (action.payload.status){
          filterTask = allTask.filter(v => v._id && delTask && v._id.toString() !== delTask.toString())
        }
        return {
          ...state,
          task:[...filterTask],
          isError: !action.payload.status,
          isLoading: false,
          status: action.payload.status,
          message: action.payload.message
        }

        case EDIT_TASK:
        
        const taskToEdit = [...state.task]
        const {oldTask, newTask} = action.payload

        let taskIndex = taskToEdit

        if (action.payload.status){
          taskIndex = taskToEdit.map(v => {
            const updateTask = v
            if (v._id.toString() === oldTask.toString()){
              updateTask.task = newTask
            }
            return updateTask;
          })
        }

        return {
          ...state,
          task:[...taskIndex],
          isError: !action.payload.status,
          isLoading: false,
          status: action.payload.status,
          message: action.payload.message
        }

        default:
          return state;
      }
    };
    
    export default authReducer;
    