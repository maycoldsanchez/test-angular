import { HttpInterceptorFn } from "@angular/common/http";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from "@angular/common/http";
import { TokenService } from "./../services/token.service";
import { inject } from "@angular/core";

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
	// Clone the request and add the authorization header
	const authReq = addToken(req);
	// Pass the cloned request with the updated header to the next handler
	return next(authReq);
};

const addToken = (request: HttpRequest<unknown>) => {
	const authToken = inject(TokenService).getToken();
	if (authToken) {
		const authReq = request.clone({
			headers: request.headers.set("Authorization", `Bearer ${authToken}`),
		});
		return authReq;
	}
	return request;
};
