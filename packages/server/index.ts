import bodyParser from 'body-parser';
import dotenvByenv from 'dotenv-byenv';
import express from 'express';
import delay from 'promise-delay-ts';
import {
    Runtype,
    Static,
} from 'runtypes';
import {
    IAppleRuntype,
} from '../types/IApple';
import {
    IEmptyRuntype,
} from '../types/IEmpty';
import {
    createConnectionAsync,
    createGetRepositoryAsync,
} from './src/db';
import {User} from './src/entity/User';

// Import process crash on rejection from the future.
process.on('unhandledRejection', (reason, promise) => {
    // tslint:disable-next-line: no-console
    console.error(`Unhandled rejection:`, promise, `reason:`, reason);
    process.exit(1);
});

// Load .env stuff into process.env.
dotenvByenv.config();

// Trigger connection errors early.
const connectionPromise = createConnectionAsync();
const getRepositoryAsync = createGetRepositoryAsync(connectionPromise);

const asyncHandler = (handlerAsync: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let endCalled = false;
    const end: (...args: any[]) => void = res.end;
    res.end = function (...args: any[]) {
        endCalled = true;
        end.apply(this, args);
    };

    let nextCalled = false;
    const interceptingNext: express.NextFunction = ex => {
        nextCalled = true;
        next(ex);
    };
    try {
        await handlerAsync(req, res, interceptingNext);
    } catch (ex) {
        nextCalled = true;
        next(ex);
    } finally {
        if (!nextCalled && !endCalled) {
            next(new Error(`Handler for ${req.url} returned prior to ending the request or calling next()!`));
        }
    }
};

const typedAsyncHandler = <TRequestRuntype extends Runtype, TResponseRuntype extends Runtype>(requestRuntype: TRequestRuntype, responseRuntype: TResponseRuntype, handlerAsync: (body: Static<typeof requestRuntype>) => Promise<Static<typeof responseRuntype>>) => {
    return asyncHandler(async (req, res) => {
        const body: {} = req.body;
        if (!requestRuntype.guard(req.body)) {
            res.status(400).json("malformed POST data");
            return;
        }
        const result = await handlerAsync(body);
        res.json(result);
    });
};

const api = express();
api.use(bodyParser.json());

api.post('/apple', typedAsyncHandler(IEmptyRuntype, IEmptyRuntype, async () => {
    return {};
}));

api.post('/orange', typedAsyncHandler(IAppleRuntype, IAppleRuntype, async apple => {
    const users = await getRepositoryAsync(User);
    while (true) {
        const user = await users.findOne(2);
        // tslint:disable-next-line: no-console
        console.log(user);
        if (user !== undefined) {
             break;
        }
        // User missing. Create!
        await users.insert({
            age: 28,
            firstName: 'Nathan Phillip',
            id: 2,
            lastName: 'Brink',
        });
    }
    await delay(4000);
    if (apple.isGreen) {
        return {
            isGreen: true,
            isYummy: true,
        };
    }
    return {
        isGreen: false,
        isYummy: false,
    };
}));

{
    const app = express();
    app.use('/api', api);
    const port = 3001;
    app.listen(port, ex => {
        if (ex) { throw ex; }
        // tslint:disable-next-line: no-console
        console.log(`Listening on ${port}`);
    });
}
