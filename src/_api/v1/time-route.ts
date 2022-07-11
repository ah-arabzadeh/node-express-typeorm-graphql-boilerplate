import { Router, Request, Response } from "express";

const timeRoute = Router();

timeRoute.post("/get-server-time", async (req: Request, res: Response) => {
    res.status(200);
    res.json(Date.now());
    res.end();
});

export { timeRoute };