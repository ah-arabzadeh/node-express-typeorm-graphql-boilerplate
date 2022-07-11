import express from "express";
import * as http from "http";

import { BASE_CONFIG } from "../base-config";
import { CoreLogger } from "./core.logger";

export class CoreExpress {

    /**
     * A singleton expressApp
     */
    public static app: express.Application = express();

    /**
     * 
     * Run express server
     * @returns A `http.Server`
     */
    public static run(): http.Server {
        const scope = "CoreExpress/init";
        const port = BASE_CONFIG.serverPort;
        const env = BASE_CONFIG.serverEnvironment;
        const server: http.Server = this.app.listen(port)
            .on("listening", () => {
                const msg = `Server is running on port '${port}'  as '${env}' mode :)`;
                CoreLogger.info(msg);
                if (!BASE_CONFIG.showLogsInConsole) {
                    console.info(msg);
                }
            })
            .on("error", (err: any) => {
                let msg = "Can not run `express server` :(";
                if (err["syscall"] === "listen" && err["code"] === "EADDRINUSE") {
                    msg += ` - The port '${port}' is busy!\n`;
                }
                CoreLogger.error(msg, err, scope);
                if (!BASE_CONFIG.showLogsInConsole) {
                    console.error(msg);
                }
                process.exit(31);
            });

        return server;
    }
}