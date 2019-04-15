export default class Config {
    readonly port: string = process.env.PORT || '3000';
    readonly api_url: string = process.env.API_URL || `/api/v1`;
    readonly username: string = process.env.MONGO_USERNAME || '';
    readonly password: string = process.env.MONGO_PASSWORD || '';
    readonly database: string = process.env.MONGO_DATABASE || '';
    readonly log_dir: string = process.env.LOG_DIR || './logs';
    readonly app_env: string = process.env.NODE_ENV || 'development';
    readonly token: string = process.env.KEY || '';
}