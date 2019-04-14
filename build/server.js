"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("./config"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config = new config_1.default();
        this.setup();
    }
    Server.prototype.setup = function () {
        this.app.set('port', this.config.port);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log("This app is running on port " + _this.app.get('port'));
        });
    };
    return Server;
}());
var server = new Server();
server.start();
//# sourceMappingURL=server.js.map