import pino from "pino";
import pretty from "pino-pretty";
import * as fs from "fs";

import { BASE_CONFIG } from "../base-config";

export class CoreLogger {

    private static logger: pino.Logger;

    /**
     * Make logger of project
     * @returns A singleton instance of `pino.Logger`
     */
    public static async init(): Promise<pino.Logger> {
        try {

            this.makeLogDir();

            // pretty style for console
            const prett = {
                colorize: true,
                ignore: "time,hostname,pid"
            };

            const stream = [];

            //set info level (default)
            stream.push({ stream: fs.createWriteStream(`${BASE_CONFIG.logDirPath}/info.log`, { flags: "a" }) });
            if (BASE_CONFIG.showLogsInConsole) {
                stream.push({ stream: pretty(prett) });
            }

            //set other level
            ["fatal", "error", "warn"].forEach(element => {
                stream.push({ level: element, stream: fs.createWriteStream(`${BASE_CONFIG.logDirPath}/${element}.log`, { flags: "a" }) });
                if (BASE_CONFIG.showLogsInConsole) {
                    stream.push({ level: element, stream: pretty(prett) });
                }
            });

            this.logger = pino(
                {
                    level: "trace",
                    timestamp: () => `,"time":"${new Date(Date.now()).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "long" })}"`,
                    messageKey: "msg",
                    serializers: { devMsg: pino.stdSerializers.err }
                },
                pino.multistream(stream, { dedupe: true })
            );
            this.info("Logger was runnig successfully :)");
            return this.logger;
        } catch (err) {
            console.error("Can not init `pino logger` :(", err);
            process.exit(12);
        }
    }

    /**
    * Send a `normal` message to logger
    * @param msg As `string` type
    */
    public static info(msg: string): void {
        this.logger.info(msg);
    }

    /**
    * Send a `warn` message to logger
    * @param normalMsg As `string` type
    * @param devMsg As `string` | `unknown` type (optional)
    * @param scope As `string` type (optional)
    */
    public static warn(normalMsg: string, devMsg?: unknown | string, scope?: string): void {
        this.logger.warn({ msg: normalMsg, scope: scope, devMsg: devMsg });
    }

    /**
     * Send a `error` message to logger
     * @param normalMsg As `string` | {txt:string, code:number} type
     * @param devMsg As `string` | `unknown` type (optional)
     * @param scope As `string` type (optional)
     */
    public static error(normalMsg: string | unknown, devMsg?: object | unknown, scope?: string): void {
        this.logger.error({ msg: normalMsg, scope: scope, devMsg: devMsg });
    }

    /**
     * Send a `fatal` message to logger
     * @param normalMsg As `string` type
     * @param devMsg As `string` | `unknown` type (optional)
     * @param scope As `string` type (optional)
     */
    public static fatal(normalMsg: string, devMsg?: unknown | string, scope?: string): void {
        this.logger.fatal({ msg: normalMsg, scope: scope, devMsg: devMsg });
    }

    //---------------------------------------------------
    private static makeLogDir(): void {
        try {
            if (!fs.existsSync(BASE_CONFIG.logDirPath)) {
                fs.mkdirSync(BASE_CONFIG.logDirPath);
            }
        } catch (err) {
            console.error("Can not create `LogDir` :(", err);
            process.exit(11);
        }
    }
}