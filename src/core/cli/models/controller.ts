import {Request, Response} from 'express';
import {Body, Post, Route} from "tsoa";

import Controller, {IResponse} from './controller';

declare var global: any;

@Route('{{prefix}}')
export class {{prefix}}Controller extends Controller{

	@Get("index")
	public async index(): Promise<IResponse> {

	}
}
