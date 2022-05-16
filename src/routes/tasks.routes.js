import { Router } from "express";


import * as TaskCtrl from '../controllers/task.controllers'
import Task from "../models/Task";

const router=Router()

router.get('/', TaskCtrl.findAlltasks);

router.post('/',TaskCtrl.createTasks);

router.get('/done', TaskCtrl.findAllDoneTasks);

router.get('/:id', TaskCtrl.findOneTasks );

router.delete('/:id', TaskCtrl.deleteTasks);

router.put('/:id', TaskCtrl.updateTasks);



export default router;