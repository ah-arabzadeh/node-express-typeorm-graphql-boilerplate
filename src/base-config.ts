import * as path from "path";
import appRoot from "app-root-path";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

export class BASE_CONFIG {
    //========== server port & environment
    public static readonly serverPort: number = (process.env.SERVER_PORT !== undefined) ? <number><unknown>process.env.SERVER_PORT : 3000;

    public static readonly serverEnvironment = process.env.SERVER_ENV || "development"; // development  ||  production


    public static readonly isDevelopmentMode: boolean = this.serverEnvironment === "development" ? true : false;
    public static readonly isProductionMode: boolean = this.serverEnvironment === "production" ? true : false;

    public static readonly appRootPath = appRoot.path;

    //========== logger
    public static readonly showLogsInConsole: boolean = this.isDevelopmentMode;
    public static readonly logDirPath = path.join(appRoot.path, "logs");

    //========== jwt
    public static readonly jwtSecretKey: string = this.isDevelopmentMode ? "My3cretKey*^!" : crypto.randomBytes(32).toString("hex");
    public static readonly jwtAlgorithm: jwt.Algorithm = "HS256";
    public static readonly jwtEndOfLife: number = 12 * (60000 * 60); // 12 means "hours", resault is in millisecond 
    public static readonly jwtRefreshPeriod: number = 30 * 60000; // 15 means "minute", resault is in millisecond 

    //========== entities
    public static readonly entitiesPath = path.join(
        appRoot.path,
        this.isDevelopmentMode ? "src/**/*.entity.ts" : "build/**/*.entity.js"
    );

    //========== database
    public static readonly dbDefaultConnectionName = "conName";
    public static readonly dbType = process.env.DB_TYPE || "sqlite";
    //sqlite
    public static readonly dbSqliteFilePath = process.env.DB_SQLITE_FILE_PATH || "db.sqlite";
    //mysql
    public static readonly dbMySqlHost = process.env.DB_MYSQL_HOST || "localhost";
    public static readonly dbMySqlPort = Number(process.env.DB_MYSQL_PORT) || 3306;
    public static readonly dbMySqlUsername = process.env.DB_MYSQL_USERNAME;
    public static readonly dbMySqlPassword = process.env.DB_MYSQL_PASSWORD;
    public static readonly dbMySqlDatabase = process.env.DB_MYSQL_DATABASE;
    public static readonly dbMySqlCharset = process.env.DB_MYSQL_CHARSET;
    //mssql
    public static readonly dbMSSqlHost = process.env.DB_MSSQL_HOST || "localhost";

    //========== GraphQL
    public static readonly gqlPath: string = "/gql";
    public static readonly gqlResolversPath = path.join(
        appRoot.path,
        this.isDevelopmentMode ? "/src/**/*.resolver.ts" : "/build/**/*.resolver.js"
    );

}