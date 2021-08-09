
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            ROUTE_PREFIX: string | RegExp | Array<string | RegExp>;
            API_BASE_PATH: string;
            REVERSE_PROXY: boolean;
            APP_PORT:string;
            APP_DOMAIN:string;
            DB_MONGO_URL:string;
        }
    }
}

declare module "mongoose-intl" {
    export = mongoose-intl;
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}