import express from 'express'
import morgan from 'morgan';
import cors from    'cors';
import TasksRoutes from './routes/tasks.routes'


const app = express()

app.set('port', process.env.PORT || 3000);


// middleware
const corsOption = {}
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la aplicacion' })
})

app.use('/api/tasks', TasksRoutes)


export default app;