// import jwt, {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
// import { Request , Response } from 'express';
//
// import {User, roleUser} from '../models/user';
// import {MY_Controller} from '../../../src/core/generic/MY_Controller';
// import config from "../../../config/config";
// import {FooError} from "../../../src/core/generic/index";
// const Ctrl = new MY_Controller;
//
// declare var global: any;
//
//
// /**
//  * @params params Type description
//  */
//
// export const expressAuthentication = async (req: Request, securityName: string, scopes?: string[]) : Promise<any> => {
//
//     try {
//         if (securityName === "Bearer"){
//             const token : any = req.body.token || req.query.token || req.headers["token"];
//             if (!token)
//                 throw new FooError("Token not found");
//
//             const decoded = jwt.decode(token, config.JWT_SECRET);
//
//             if (decoded instanceof (JsonWebTokenError || TokenExpiredError)){
//                 throw new FooError("Incorrect token");
//             }
//
//             if (!decoded){
//                 return Promise.reject({});
//             } else{
//                 const params = scopes ? scopes : [];
//                 const user : any = await User.findById(decoded.userId);
//
//                 if (!user)
//                     throw new FooError("Unknown User");
//
//                 if (typeRole(user, params[0]))
//                     return Promise.resolve(user);
//                 throw new FooError("You don't have a persmission");
//             }
//         }
//     }catch (e) {
//         return Promise.reject(new FooError(e.m))
//     }
//
// }
//
// const typeRole = (user: any, role : string) => {
//     const roleValue = normalizeRole(role);
//     if (roleValue == roleUser.User && user.role == roleValue)
//         return true;
//     if (roleValue == roleUser.Admin && user.role >= roleValue)
//         return true;
//     if (roleValue == roleUser.Root && user.role == roleValue)
//         return true;
//     return false;
// }
//
// const normalizeRole = (name : string) => {
//     switch (name) {
//         case "root":
//             return roleUser.Root
//             break;
//         case "admin":
//             return roleUser.Admin
//             break;
//         case "user":
//             return roleUser.User
//             break;
//         default:
//             throw new Error("Unknown role : " + name)
//             break;
//     }
// }