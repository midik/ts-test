import { Server } from '@overnightjs/core';
import { config } from 'dotenv';
import path from 'path';
import glob from 'glob';
import errorHandler from 'errorhandler';
import DbConnection from './db/pg';
import UserController from './controllers/user.controller';

config(); // dotenv


export class API extends Server {

    constructor() {
        super();
    }

    public async init(): Promise<void> {
        this.app_.use(errorHandler());
        // this.dbConnection = new DbConnection();

        const controllers = await this.setupControllers();
        console.dir(controllers);

        super.addControllers_(controllers);
    }

    private async setupControllers(): Promise<Array<API>> {
        const modules = glob.sync('*/controllers/*.controller.ts');

        // TODO
        return await Promise.all(modules.map(async (controller: any) => {
            const p: string = path.resolve('.', controller);
            await import(p);

            // const Controller = module.default;
            // return new UserController.default();

            const controllerInstance = new UserController();
            controllerInstance.setDbConnection(this.dbConnection);
            return controllerInstance;
        }));
    }

    public start(): void {
        const port: number = Number(process.env.EXPRESS_PORT) || 3000;
        this.app_.listen(
            port,
            undefined,
            undefined,
            async () => {
                console.info(`Express is listening on port ${port}`);
            }
        );
    }
}


const server = new API();

server.init()
    .then(() => server.start());
