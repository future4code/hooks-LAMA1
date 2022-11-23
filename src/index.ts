import {app} from "./app"
import { bandRouter } from "./routes/BandRoutes"
import { userRouter } from "./routes/UserRoutes"


app.use('/user', userRouter)

app.use("/band", bandRouter)