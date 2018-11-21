import { Server } from '@overnightjs/core';
import dotenv from 'dotenv';
import path from 'path';
import glob from 'glob';
import errorHandler from 'errorhandler';

// import logger from './utils/logger';

dotenv.config();


export class API extends Server {

    constructor() {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();

        const controllers = await this.setupControllers();
        super.addControllers_(controllers);
    }

    private setupExpress(): void {
        this.app_.use(errorHandler());
    }

    private async setupControllers(): Promise<Array<API>> {
        const modules = glob.sync('*/controllers/*.controller.ts');
        console.dir(modules);
        return await Promise.all(modules.map((controller: any) => import(path.resolve('.', controller))));
    }

    public start(port: number) {
        this.app_.listen(
            Number(process.env.EXPRESS_PORT) || 3000,
            undefined,
            undefined,
            async () => {
                console.info(`Express listening on port ${port}`);
            }
        );
    }
}


const server = new API();
server.init();

export default API;
