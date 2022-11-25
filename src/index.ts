import {app} from "./app"
import { bandRouter } from "./routes/BandRoutes"
import { userRouter } from "./routes/UserRoutes"
import { showRouter } from "./routes/ShowRoutes"

app.use('/user', userRouter)

app.use("/band", bandRouter)

app.use("/show", showRouter)