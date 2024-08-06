import { TestBed } from "@angular/core/testing";
import {
	HttpStatusCode,
	provideHttpClient,
	withInterceptors,
} from "@angular/common/http";
import {
	HttpTestingController,
	provideHttpClientTesting,
} from "@angular/common/http/testing";

import { environment } from "../../environments/environment";
import { TokenInterceptor } from "../interceptors/token.interceptor";
import { TokenService } from "./token.service";
import { AuthService } from "./auth.service";
import { Auth } from "../models/auth.model";

describe("ProductsService", () => {
	let authService: AuthService;
	let httpTesting: HttpTestingController;
	let tokenService: TokenService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AuthService,
				TokenService,
				provideHttpClient(withInterceptors([TokenInterceptor])),
				provideHttpClientTesting(),
			],
		});
		authService = TestBed.inject(AuthService);
		httpTesting = TestBed.inject(HttpTestingController);
		tokenService = TestBed.inject(TokenService);
	});

	// afterEach(() => {
	// 	httpTesting.verify();
	// });

	it("Should be created", () => {
		expect(authService).toBeTruthy();
	});

	describe("Test method login", () => {
		it("Should return access token ", (doneFn) => {
			//Arrange
			const mockData: Auth = {
				access_token: "11316546798798",
			};
			const email = "maycoldsm1234@gmail.com";
			const password = "123456798";
			//Act
			authService.login(email, password).subscribe((login) => {
				//Asert
				expect(login).toEqual(mockData);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(`${urlApi}/api/v1/auth/login`);
			req.flush(mockData);
			expect(req.request.method).toEqual("POST");
		});

		it("Should save token and call saveToken", (doneFn) => {
			//Arrange
			const mockData: Auth = {
				access_token: "11316546798798",
			};
			const email = "maycoldsm1234@gmail.com";
			const password = "123456798";
			spyOn(tokenService, "saveToken").and.callThrough();
			//Act
			authService.login(email, password).subscribe((login) => {
				//Asert
				expect(login).toEqual(mockData);
				expect(tokenService.saveToken).toHaveBeenCalled();
				expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
				expect(tokenService.saveToken).toHaveBeenCalledOnceWith(
					"11316546798798"
				);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(`${urlApi}/api/v1/auth/login`);
			req.flush(mockData);
			expect(req.request.method).toEqual("POST");
		});
	});
});
