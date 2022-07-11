import { DataSource, DataSourceOptions } from "typeorm";
import { BASE_CONFIG } from "../base-config";
import { CoreLogger } from "./core.logger";

export class CoreDatabase {

    /**
     * A singleton datasource (connection to database)
     */
    public static dataSource: DataSource;

    /**
     * Connect to database
     */
    public static async connect(): Promise<void> {
        const scope = "CoreDatabase/connect";
        
        this.dataSource = new DataSource(this.makeDataSourceOptions());

        await this.dataSource.initialize()
            .then(() => {
                const msg = `Successfully connected to '${BASE_CONFIG.dbType}' :)`;
                CoreLogger.info(msg);
                if (!BASE_CONFIG.showLogsInConsole) {
                    console.info(msg);
                }
            })
            .catch((err) => {
                const msg = "Can not connect to database :(";
                CoreLogger.error(msg, err, scope);
                if (!BASE_CONFIG.showLogsInConsole) {
                    console.error(msg);
                }
                process.exit(21);
            });
    }

    //--------------------------------
    private static makeDataSourceOptions(): DataSourceOptions {
        // sqlite is default db
        let dsOpt: DataSourceOptions = {
            name: BASE_CONFIG.dbDefaultConnectionName,
            type: "sqlite",
            database: BASE_CONFIG.dbSqliteFilePath,
            synchronize: true,
            entities: [BASE_CONFIG.entitiesPath],
        };
        switch (BASE_CONFIG.dbType) {
            case "mysql": {
                dsOpt = {
                    name: BASE_CONFIG.dbDefaultConnectionName,
                    type: "mysql",
                    host: BASE_CONFIG.dbMySqlHost,
                    port: BASE_CONFIG.dbMySqlPort,
                    username: BASE_CONFIG.dbMySqlUsername,
                    password: BASE_CONFIG.dbMySqlPassword,
                    database: BASE_CONFIG.dbMySqlDatabase,
                    charset: BASE_CONFIG.dbMySqlCharset,
                    synchronize: true,
                    entities: [BASE_CONFIG.entitiesPath],
                };
                break;
            }
            case "mssql": {
                //dbCon = {};
                break;
            }
            default: {
                break;
            }
        }

        return dsOpt;
    }
}

