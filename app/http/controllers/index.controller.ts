import {Request, Response} from 'express';

import Controller, {IResponse} from './controller';

import Index from '../../models';

import {Body, Post, Route} from "tsoa";
declare var global: any;

@Route('index')
export class indexController extends Controller{

    @Post("supercontroller")
   public async sample(
        @Body() body: {name : string, description? : string}
   ): Promise<IResponse> {
        const index = await Index.create({data : body});
        console.log(index);
        return this.liteResponse(global.responseCode.SUCCESS, index);
    }
}
