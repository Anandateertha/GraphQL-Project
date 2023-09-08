import { prismaClient } from "../lib/db"
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'anandateertha'

export interface CreateUserPayload {
    firstName: string,
    lastName?: string
    email: string
    password: string
}

export interface GetUserTokenPayload {
    email: string
    password: string
}

class UserService {

    private static generateHash(salt: string, password: string) {
        var hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword
    }

    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload
        var salt = bcrypt.genSaltSync(10);

        return prismaClient.user.create({
            data:
            {
                firstName,
                lastName,
                email,
                password: UserService.generateHash(salt, password),
                salt
            }
        })
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } })
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload
        const user = await UserService.getUserByEmail(email)

        if (!user) {
            throw new Error('User not found')
        }

        const userSalt = user.salt
        const userpasswordHash = UserService.generateHash(userSalt, password)

        if (userpasswordHash !== user.password) {
            throw new Error('Incorrect Password')
        }

        //Gen Token
        const authtoken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET)
        return authtoken
    }
}


export default UserService;
