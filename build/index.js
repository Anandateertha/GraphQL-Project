"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
const user_1 = __importDefault(require("./services/user"));
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 8001;
        app.use(express_1.default.json());
        app.get('/', (req, res) => {
            res.json({ message: "Server is running successfully" });
        });
        app.use('/graphql', (0, express4_1.expressMiddleware)(yield (0, graphql_1.default)(), {
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                const token = req.headers['token'];
                try {
                    const userData = user_1.default.decodeTheToken(token); // Pass the actual token variable
                    return { id: userData.id, email: userData.email };
                }
                catch (error) {
                    console.log(error);
                    return {};
                }
            })
        }));
        app.listen(PORT, () => {
            console.log(`Server listening on PORT : ${PORT}`);
        });
    });
}
server();
