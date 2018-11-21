import { Server } from '@overnightjs/core';
import { config } from 'dotenv';
import path from 'path';
import glob from 'glob';
import errorHandler from 'errorhandler';


config();


export class API extends Server {

    constructor() {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();

        const controllers = await this.setupControllers();

        console.dir(controllers);

        super.addControllers_(controllers);
    }

    private setupExpress(): void {
        this.app_.use(errorHandler());
    }

    private async setupControllers(): Promise<Array<API>> {
        const modules = glob.sync('*/controllers/*.controller.ts');
        const controllers = await Promise.all(modules.map(async (controller: any) => {
            const p: string = path.resolve('.', controller);
            const module = await import(p);
            const Controller = module.default;
            return new Controller();
        }));

        return controllers;

        // return await Promise.all(modules.map((controller: any) => controller));
    }

    public start(): void {
        const port: number = Number(process.env.EXPRESS_PORT) || 3000;
        this.app_.listen(
            port,
            undefined,
            undefined,
            async () => {
                console.info(`Express listening on port ${port}`);
            }
        );
    }
}


const server = new API();

server.init()
    .then(() => server.start());
