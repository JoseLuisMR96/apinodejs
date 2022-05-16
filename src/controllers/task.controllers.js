import Task from '../models/Task'
import { getPagination } from '../libs/getPaginate'

export const findAlltasks = async (req, res) => {
    try {
        const { size, page, title } = req.query

        const condition = title ? {
            title: { $regex: new RegExp(title), $options: "i" },
        } : {};

        const { limit, offset } = getPagination(page, size)

        const data = await Task.paginate(condition, { offset, limit })

        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error al mostrar los datos en la DB`
        })
    }
}

export const createTasks = async (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({
            message: 'El campo titulo no esta definido'
        })
    }

    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        });
        const taskSaved = await newTask.save()
        console.log(taskSaved)
        res.json(taskSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error al guardar los datos en la DB`
        })
    }
}

export const findAllDoneTasks = async (req, res) => {
    try {
        const DoneTasks = await Task.find({ done: true });
        res.json(DoneTasks)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error al buscar todos los resultados con DONE`
        })
    }
}

export const findOneTasks = async (req, res) => {
    const { id } = req.params;
    try {

        const Taskid = await Task.findById(id)
        // const Taskid = await Task.findById(req.params.id) Esta linea es lo mismo de arriba
        if (!Taskid) return res.status(404).json({ message: `La tarea con id: ${id} no existe` })
        res.json(Taskid)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error una tarea con el id: ${id}`,
        })
    }
}

export const deleteTasks = async (req, res) => {
    const { id } = req.params
    try {
        const DeletetaskMS = await Task.findByIdAndDelete(id)
        res.json({
            message: `${DeletetaskMS} Elimz|inado`
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error al eliminar la tarea con id: ${id}`
        })
    }
}

export const updateTasks = async (req, res) => {

    try {
        const updatedTasks = await Task.findByIdAndUpdate(req.params.id, req.params, {
            useFindAndModify: false,
        })
        res.json({ message: "Tarea actualizada" })
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error al actualizar los datos`
        })
    }
}