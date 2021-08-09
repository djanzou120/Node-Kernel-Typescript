import axios, {Method} from 'axios';
import {Request, Response} from 'express';

import {MY_Controller} from '../core/generic/MY_Controller';
import {IResponse} from '../../app/http/controllers/controller';

declare var global: any;

const sendExt : any = async (
    defaultURL: string, url : string,
    method: Method,
    params: object | null = null,
    headers: any = null
): Promise<IResponse> => {
    const Ctrl = new MY_Controller();

    try{
        const response : any = await axios({
            baseURL: defaultURL,
            method: method,
            url: url,
            data: {...params},
            headers: headers,
            transformResponse: [function (res) {
                if (!res)
                    return Ctrl.liteResponse(global.responseCode.FAILURE, null);
                return Ctrl.liteResponse(global.responseCode.SUCCESS, JSON.parse(res));
            }]
        })
        return response;
    }catch (e) {
        return Ctrl.liteResponse(global.responseCode.EXCEPTION);
    }
}

export default async (req: Request, res: Response, next: () => any) : Promise<any> => {
    global.sendExt = await sendExt();
    next();
}