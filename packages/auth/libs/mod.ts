import type { Application } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import { AuthRoute } from './router.ts';

function AuthModule(app: Application): Promise<void> {
	app.use(AuthRoute.routes(), AuthRoute.allowedMethods() /* TODO:  , AuthLoginImpl */);
	return Promise.resolve();
}

export * as router from './router.ts';
export { AuthModule };
export default AuthModule;
