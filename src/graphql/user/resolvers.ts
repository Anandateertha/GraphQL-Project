import UserService, { CreateUserPayload } from "../../services/user"
var jwt = require('jsonwebtoken');
const JWT_SECRET='anandateertha'

const queries = {
  getUserToken: async (_: any, payload: { email: string, password: string }) => {
    const token = await UserService.getUserToken({ email: payload.email, password: payload.password })
    return token
  },

  getCurrentLoggedUser:async(_:any,parameters:any,context:any)=>{

    const id = context.id;
    const userDetails=await UserService.getUserById(id)
    if(!userDetails)
    {
      return userDetails
    }
    throw new Error('I dont know you')
    
  }
}

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload,context:any) => {
    const res = await UserService.createUser(payload);
    const authtoken = jwt.sign({ id: res.id, email: res.email }, JWT_SECRET)
    return authtoken;
  },
};

export const resolvers = { queries, mutations }
