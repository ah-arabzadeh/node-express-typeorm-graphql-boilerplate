import { Router } from "express";
import { loginRoute } from "./login-route";
import { timeRoute } from "./time-route";

const v1Routes = Router();

v1Routes.use("/login", loginRoute);
v1Routes.use("/time", timeRoute);

export { v1Routes };