import jwt from 'jsonwebtoken';
import {PrismaClient} from "@prisma/client";

let blacklist = new PrismaClient();
