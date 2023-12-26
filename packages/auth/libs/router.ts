import type { Context, Middleware, Next } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import { Router, Status } from 'https://deno.land/x/oak@v12.6.1/mod.ts';

const AuthRoute = new Router({ sensitive: true });

const forward: Middleware = function forward(_: Context, next: Next) {
	return next();
};

const notImplemented: Middleware = function unimplmented($: Context) {
	$.response.body = { message: 'This Route Not Implemented Yet!' };
	$.response.status = Status.NotImplemented;
	$.response.type = 'application/json';
	$.response.headers.set('Content-Type', 'application/json');
	return $;
};

const AuthLoginRoute = AuthRoute.post('/auth/login', forward);
const AuthRegisterRoute = AuthRoute.post('/auth/register', forward);
const AuthRefreshRoute = AuthRoute.post('/auth/refresh', forward);
const AuthLogoutRoute = AuthRoute.delete('/auth', forward);
const AuthLogoutGetRoute = AuthRoute.get('/auth/logout', forward);
const AuthChangePasswordRoute = AuthRoute.put('/auth/password', forward);
const AuthVerifyEmailRoute = AuthRoute.get('/auth/verify-email', forward);

// OAuth
const OAuthGitHubRoute = AuthRoute.post('auth/oauth/github', notImplemented);
const OAuthGoogleRoute = AuthRoute.post('auth/oauth/google', forward);
const OAuthLinkedInRoute = AuthRoute.post('auth/oauth/linkedin', forward);

// Athorization
const ACLResourcesRoute = AuthRoute.get('/auth/acl/resources', forward);
const ACLResourceExistRoute = AuthRoute.get('/auth/acl/:resource', forward);
const ACLRequestValidationRoute = AuthRoute.get('/auth/acl/:resource/:action', forward);

const AuthRestRoute = AuthRoute.all('/*', notImplemented);

export {
	ACLRequestValidationRoute,
	ACLResourceExistRoute,
	ACLResourcesRoute,
	AuthChangePasswordRoute,
	AuthLoginRoute,
	AuthLogoutGetRoute,
	AuthLogoutRoute,
	AuthRefreshRoute,
	AuthRegisterRoute,
	AuthRestRoute,
	AuthRoute,
	AuthVerifyEmailRoute,
	OAuthGitHubRoute,
	OAuthGoogleRoute,
	OAuthLinkedInRoute,
};
