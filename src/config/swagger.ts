//Swagger Documentation
// @ts-ignore
import swaggerSchema from '../../routes/swagger.json';
import express, {Router} from 'express';
const router:Router = express.Router();

const swaggerDoc = (req:any, res:any, next: () => any) => {
    if (swaggerSchema.servers.length === 1) {
        swaggerSchema.servers = [
            { url: `${process.env.APP_DOMAIN}:${process.env.APP_PORT}` },
            { url: `${process.env.APP_DOMAIN}:${process.env.APP_PORT}` },
        ];

        if (process.env.REVERSE_PROXY) {
            // Avoid issues like failed to fetch errors when using http, due to Content-Security headers
            swaggerSchema.servers = swaggerSchema.servers.reverse();
        }
    }

    req.swaggerDoc = swaggerSchema;
    next();
}

router.get('/docs', swaggerDoc);

export default router;