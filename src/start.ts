import "reflect-metadata";
//-------------------------
import * as dotenv from "dotenv";
dotenv.config();
//-------------------------
import bodyParser from "body-parser";
//-------------------------

import { CoreLogger, CoreDatabase, CoreExpress, CoreGQL, CoreAuth } from "./_core";
import { apiRoutes } from "./_api";
import { BASE_CONFIG } from "./base-config";

async function letsGo(): Promise<void> {
    // initialize Logger
    await CoreLogger.init();

    //connect to DB
    await CoreDatabase.connect();

    // express middlewares
    CoreExpress.app.use(bodyParser.json());
    CoreExpress.app.use(bodyParser.urlencoded({ extended: true }));
    CoreExpress.app.use("/api", apiRoutes);

    //authenticate (verify token)
    CoreExpress.app.use(BASE_CONFIG.gqlPath, CoreAuth.authenticate);

    //gql
    await CoreGQL.init(CoreExpress.app);

    //run express server
    CoreExpress.run();
}

letsGo();