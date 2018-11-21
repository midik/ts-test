import { Request, Response } from 'express';
import { Controller, Get, Post } from '@overnightjs/core';
// import { API } from '../app';

console.log('users');


@Controller('users')
export default class UserController /* extends API */ {

    @Get(':id')
    getUser(req: Request, res: Response): void {
        // in call route function you should have access to request.body, //request.query, request.params just by calling this.body, this.query, //this.params
        // for example: this.params.id should give id from route

        console.log('get');
        res.status(200).json({msg: 'get'});
    }

    // post() {
    //     console.log('post');
    // }

}
