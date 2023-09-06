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
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 8000;
        app.use(express_1.default.json());
        const gqlserver = new server_1.ApolloServer({
            typeDefs: `
            type Query{
                hello:String,
                say(name:String):String!
            }
        `,
            resolvers: {
                Query: {
                    hello: () => 'This is Graphql server',
                    say: (_, { name }) => `Hello, ${name} How are you?`
                }
            }
        });
        //Start the server
        yield gqlserver.start();
        app.get('/', (req, res) => {
            res.json({ message: "Server is running successfully" });
        });
        app.use('/graphql', (0, express4_1.expressMiddleware)(gqlserver));
        app.listen(PORT, () => {
            console.log(`Server listening on PORT : ${PORT}`);
        });
    });
}
server();