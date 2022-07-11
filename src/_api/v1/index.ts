import { Router } from "express";
import { loginRoute } from "./login.route";
import { timeRoute } from "./time.route";
import { defaultDataRoute } from "./default-data.route";

const v1Routes = Router();

v1Routes.use("/login", loginRoute);
v1Routes.use("/time", timeRoute);
v1Routes.use("/default-data", defaultDataRoute);

export { v1Routes };