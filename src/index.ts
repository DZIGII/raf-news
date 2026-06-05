import 'dotenv/config'
import 'reflect-metadata'
import express, {Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import { sequelize } from './database/database';
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import userRoutes from "./routes/user.router";
import newsRoutes from "./routes/news.router";
import categoryRoutes from "./routes/category.router";
import commentRoutes from "./routes/comment.router";
import tagRoutes from "./routes/tag.router";




const app = express();
const PORT = 3000;

app.use(express.json())
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/uploads', express.static('uploads'))
app.use("/users", userRoutes)
app.use("/news", newsRoutes)
app.use("/categories", categoryRoutes)
app.use("/comments", commentRoutes)
app.use("/tags", tagRoutes)



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