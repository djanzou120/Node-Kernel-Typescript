// import jwt, {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
// import { Request , Response } from 'express';
// import * as dotenv from 'dotenv';
// import {Prisma} from '@prisma/client';
//
// import {ERole} from "../../models/role";
// import User, {UserRole} from '../../models/user';
// import {MY_Controller} from '../../../src/core/generic/MY_Controller';
// import {Middleware_Error} from "../../../src/core/generic/Middleware_Error";
// const Ctrl = new MY_Controller;
//
// declare var global: any;
//
// dotenv.config();
//
//
// /**
//  * @params params Type description
//  */
//
// export const expressAuthentication = async (req: Request, securityName: string, scopes?: string[]) : Promise<any> => {
//
//     const typeRole = (user: Prisma.UserCreateManyInput, role ?: string) => {
//         if (!role)
//             return true;
//
//         const roleValue = normalizeRole(role);
//
//         if (roleValue == ERole.FORWADING_AGENT && user.roleId <= roleValue)
//             return true;
//         if (roleValue == ERole.CUSTOMER && user.roleId == roleValue)
//             return true;
//         if (roleValue == ERole.ADMIN && user.roleId <= roleValue)
//             return true;
//         if (roleValue == ERole.ROOT && user.roleId == roleValue)
//             return true;
//         return false;
//     }
//
//     const normalizeRole = (name : string) => {
//         switch (name) {
//             case UserRole.ROOT:
//                 return ERole.ROOT
//                 break;
//             case UserRole.ADMIN:
//                 return ERole.ADMIN
//                 break;
//             case UserRole.FORWADING_AGENT:
//                 return ERole.FORWADING_AGENT
//                 break;
//             case UserRole.CUSTOMER:
//                 return ERole.CUSTOMER
//                 break;
//             default:
//                 throw new Error("Unknown role : " + name)
//                 break;
//         }
//     }
//
//     try {
//         if (securityName === "Bearer"){
//             const token : any = req.body.authorization || req.query.authorization || req.headers["authorization"];
//             if (!token)
//                 throw new Middleware_Error("Token not found");
//
//             const decoded : any = jwt.decode(token);
//
//             if (!decoded || decoded instanceof (JsonWebTokenError || TokenExpiredError)){
//                 throw new Middleware_Error("Incorrect token");
//             }
//
//             if (!decoded){
//                 return Promise.reject({});
//             } else{
//                 const params = scopes ? scopes : [];
//                 const user : any = await User.findFirst({where : {id : decoded.userId}});
//
//                 if (!user)
//                     throw new Middleware_Error("Unknown User");
//
//                 if (typeRole(user, params[0]))
//                     return Promise.resolve(user);
//                 throw new Middleware_Error("You don't have a persmission");
//             }
//         }
//     }catch (e) {
//         return Promise.reject(new Middleware_Error(e.m))
//     }
// }
