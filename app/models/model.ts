import {PrismaClient} from "@prisma/client";

class Model {
    public init (){
        return (new PrismaClient);
    }
}

export default (new Model()).init();