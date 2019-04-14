"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this.port = process.env.PORT || '3000';
        this.api_url = process.env.API_URL || "/api/v1";
        this.db_acc = process.env.MONGO_USER || '';
        this.db_pwd = process.env.MONGO_PASS || '';
        this.log_dir = process.env.LOG_DIR || './logs';
        this.app_env = process.env.NODE_ENV || 'development';
        this.token = process.env.KEY || '';
    }
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=config.js.map