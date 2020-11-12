const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Task = require("../models/task");
const Users = require("../models/users");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const globalConfig = require("../config/config");

module.exports = {
  async signUp(req, res) {
    try {
        const {email, password} = req.body
        const checkIfHasUser = await Users.findOne({email:email}).lean()

        if (checkIfHasUser){
            return res.json({
                message: 'User already registered',
                status: false
            })
        }

        const rounds = 10;
        const hash = await bcrypt.hash(password, rounds);

        const create = new Users({
            email: email,
            password: hash
          });
        let userRegistered = await create.save()

        let returnData;

        const token = jwt.sign({
              id: userRegistered._id,
              email: email},
              globalConfig.jwtSecretKey,
            { expiresIn: globalConfig.jwtExpireToken }
        );

        const getUser = await Users.findOne({email: email})
        getUser.token = token
        getUser.save()

        if (getUser){
            returnData = {
                message: 'success',
                status: true,
                token:getUser.token
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }

        return res.json(returnData)
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
  },
  async logIn(req, res) {
    try {
        const {email, password} = req.body
        const checkIfHasUser = await Users.findOne({email:email})

        if (!checkIfHasUser){
            return res.json(returnData = {
                message: 'User Not Found',
                status: false
            })
        }

        let token;
        if (bcrypt.compareSync(password, checkIfHasUser.password)) {
        
            token = jwt.sign(
                {
                  id: checkIfHasUser._id,
                  email: checkIfHasUser.email,
                },
                globalConfig.jwtSecretKey,
                { expiresIn: globalConfig.jwtExpireToken }
              );
              checkIfHasUser.token = token;
              await checkIfHasUser.save();

        }

        if (token){
            returnData = {
                message: 'success',
                status: true,
                token
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }

        return res.json(returnData)
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async addTask(req, res) {
    try {
        const {task} = req.body
        const {id} = req.user

        const priority = await Task.countDocuments({userId:ObjectId(id), isDeleted:false, isArchive:false})
        const addNewTask = new Task({
            task: task,
            userId:ObjectId(id),
            priority:priority+1
        })

        const result = await addNewTask.save()
        if (result){
            returnData = {
                message: 'success',
                status: true,
                task:result
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }


        return res.json(returnData)
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async deleteTask(req, res) {
    try {
        const {task} = req.body
        const {id} = req.user;

        const findTask = await Task.findOne({userId:ObjectId(id), _id: ObjectId(task), isDeleted:false, isArchive:false})

        if (!findTask){
            return res.json({
                message: 'Could not find task',
                status: false
            })
        }

        findTask.isDeleted = true

        let priorityNumber = findTask.priority
        const allTask = await Task.find({userId:ObjectId(id), priority: {$gt:priorityNumber} ,isDeleted:false, isArchive:false})
        allTask.forEach((val,ind) => {
            val.priority -= 1
            val.save()
        })
        findTask.priority = 0

        await findTask.save()
        
        if (findTask){
            returnData = {
                message: 'success',
                status: true,
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }
        return res.json(returnData)
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async archiveTask(req, res) {
    try {
        const {task, isArchive} = req.body
        const {id} = req.user;
        const findTask = await Task.findOne({userId:ObjectId(id), _id: ObjectId(task), isDeleted:false, isArchive:!isArchive})

        if (!findTask){
            return res.json({
                message: 'Could not find task',
                status: false
            })
        }

        findTask.isArchive = isArchive

        if (isArchive){

            let priorityNumber = findTask.priority
            const allTask = await Task.find({userId:ObjectId(id), priority: {$gt:priorityNumber} ,isDeleted:false, isArchive:false})
            allTask.forEach((val,ind) => {
                val.priority -= 1
                val.save()
            })
            findTask.priority = 0

        }else{
            const priority = await Task.countDocuments({userId:ObjectId(id), isDeleted:false, isArchive:false})
            findTask.priority = priority+1
        }

        await findTask.save()
        
        if (findTask){
            returnData = {
                message: 'success',
                status: true,
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }
        return res.json(returnData)
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async fetchTask(req, res) {
    try {
        const {id} = req.user
        const {isArchive} = req.body
        const findTask = await Task.find({userId: ObjectId(id), isDeleted:false, isArchive}).sort({priority:1}).lean()
        if (findTask){
            returnData = {
                message: 'success',
                status: true,
                task: findTask
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }
        return res.json(returnData)
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async fetchArchiveTask(req, res) {
    try {
        const {id} = req.user
        const findTask = await Task.find({userId: ObjectId(id), isDeleted:false, isArchive:true}).lean()
        if (findTask){
            returnData = {
                message: 'success',
                status: true,
                task: findTask
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }
        return res.json(returnData)
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async updateTask(req, res) {
    try {
        const {newTask, oldTask} = req.body
        const {id} = req.user

        const findTask = await Task.findOne({userId: ObjectId(id), _id: ObjectId(oldTask), isDeleted:false, isArchive:false})
        if (!findTask){
            return res.json({
                message: 'Could not find task to update',
                status: false
            })
        }

        findTask.task = newTask
        await findTask.save()
        if (findTask){
            returnData = {
                message: 'success',
                status: true,
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }
        return res.json(returnData)
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  },
  async priorityTask(req, res) {
    try {
        const {newPriority, oldPriority} = req.body
        const {id} = req.user;

        const findTask = await Task.findOne({userId:ObjectId(id), priority: oldPriority, isDeleted:false, isArchive:false})

        if (!findTask){
            return res.json({
                message: 'Could not find task',
                status: false
            })
        }

        if (newPriority > oldPriority){

            const allTask = await Task.find({userId:ObjectId(id), priority: {$gt:oldPriority, $lte:newPriority} ,isDeleted:false, isArchive:false}).sort({priority:1})
            allTask.forEach(async (val,ind) => {
                val.priority -= 1

                await val.save()
            })
        }else if (newPriority < oldPriority){

            const allTask = await Task.find({userId:ObjectId(id), priority: {$gte:newPriority, $lt:oldPriority} ,isDeleted:false, isArchive:false}).sort({priority:1})
            
            allTask.forEach(async(val,ind) => {
                val.priority += 1

                await val.save()
            })
        }

        findTask.priority = newPriority
        await findTask.save();

        if (findTask){
            returnData = {
                message: 'success',
                status: true,
            }
        }else{
            returnData = {
                message: 'failed',
                status: false
            }
        }
        return res.json(returnData)
    } catch (error) {
        return res.json({
            message: 'failed',
            status: false
        })
    }
  }
}
