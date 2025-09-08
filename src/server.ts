import express from 'express'
const cors = require('cors');
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import bugestRouter from './routes/budgestRouter'
import authRouter from './routes/AuthRouter'
import clienteRouter from './routes/clienteRouter'

async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.blue.bold('Conexion exitosa a la BD'))
  } catch (error) {
    //console.log(error)
    console.log(colors.red.bold('Falló la conexión a la BD'))
  }
}

connectDB()

const app = express()

// Habilita CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:4200', // o '*' para permitir todos (no recomendado en producción)
  credentials: true, // si estás usando cookies o auth headers
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budgest', bugestRouter)
app.use('/api/auth', authRouter)
app.use('/api/cliente', clienteRouter)

export default app