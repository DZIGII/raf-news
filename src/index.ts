import 'dotenv/config'
import 'reflect-metadata'
import express, {Request, Response} from 'express'
import { sequelize } from './database/database';

const app = express();
const PORT = 3000;

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
    res.json({message: 'test'})
})

sequelize.authenticate()
    .then(() => {
        console.log('Database connected')
        return sequelize.sync({ force: false })
    })
    .then(() => console.log('Tables synced'))
    .catch((err) => console.error('Database error:', err.message))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})