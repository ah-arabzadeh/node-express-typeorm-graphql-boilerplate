import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import * as path from "path";
import express from "express";
import { ApolloServer, Config, ExpressContext } from "apollo-server-express";
import { BASE_CONFIG } from "../base-config";
import { CoreLogger, CoreAuth } from "./";
import { HelperJWT } from "../_helpers";

export class CoreGQL {

    public static async init(app: express.Application): Promise<void> {
        const sch = await this.makeGQLSchema();

        await this.makeApolloServer(sch, app);
        CoreLogger.info("Gql initialized successfully :)");
    }

    /**
     * Make graphql schema from type-graphql resolvers
     * @returns
     */
    private static async makeGQLSchema(): Promise<GraphQLSchema> {
        const scope = "CoreGql/makeGQLSchema";
        try {
            const schema = await buildSchema({
                resolvers: [BASE_CONFIG.gqlResolversPath],
                // automatically create `schema.gql` file with schema definition in root folder of project
                emitSchemaFile: path.resolve(`${BASE_CONFIG.appRootPath}/schema.gql`),
                //disable automatic validation.
                //https://github.com/MichalLytek/type-graphql/issues/150
                validate: true,
                authChecker: CoreAuth.authChecker, // <= authorize user
                // return null instead of access denied message (quey and mutation must be nullable)
                //authMode: 'null',
            });
            return schema;
        } catch (err) {
            const msg = "Can not build `schema.gql` :(";
            CoreLogger.error(msg, err, scope);
            if (!BASE_CONFIG.showLogsInConsole) {
                console.error(msg);
            }
            process.exit(31);
        }
    }


    /**
     * Make apollo server as express midlleware
     * @param schema 
     * @param app 
     */
    private static async makeApolloServer(schema: GraphQLSchema, app: express.Application): Promise<void> {
        const scope = "CoreGql/makeApolloServer";
        try {
            const apolloServer = new ApolloServer({
                schema,
                //get token from header
                context: async ({ req }) => {
                    const token = req.headers.token || null;
                    let decodedToken = null;
                    if (typeof token === "string" && token !== null) {
                        decodedToken = await HelperJWT.verifyToken(token, BASE_CONFIG.jwtSecretKey)
                            .then(t => {
                                return t;
                            }).catch(err => {
                                return null;
                            });
                    }
                    return { req, token, decodedToken };
                },
                // enable below options on development mode only
                playground: BASE_CONFIG.isDevelopmentMode ? true : false,
                introspection: BASE_CONFIG.isDevelopmentMode ? true : false,
                debug: BASE_CONFIG.isDevelopmentMode ? true : false, //disable stacktraces in error result
            } as Config<ExpressContext>);

            await apolloServer.start(); // <= above v3
            apolloServer.applyMiddleware({ app, path: BASE_CONFIG.gqlPath });
        } catch (error) {
            const msg = "Can not build the `apollo server` :(";
            CoreLogger.error(msg, error, scope);
            if (!BASE_CONFIG.showLogsInConsole) {
                console.log(msg);
            }
            process.exit(32);
        }
    }
}