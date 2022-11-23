import {app} from "./app"
import { userRouter } from "./routes/UserRoutes"
import { showRouter } from "./routes/ShowRoutes"

app.use('/user', userRouter)

app.use('/show', showRouter)