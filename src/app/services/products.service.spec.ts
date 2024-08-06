import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service";
import {
	HttpStatusCode,
	provideHttpClient,
	withInterceptors,
	withInterceptorsFromDi,
} from "@angular/common/http";
import {
	HttpTestingController,
	provideHttpClientTesting,
} from "@angular/common/http/testing";
import {
	CreateProductDTO,
	Product,
	UpdateProductDTO,
} from "../models/product.model";
import {
	generateManyProduct,
	generateOneProduct,
} from "../models/product.mock";
import { environment } from "./../../environments/environment";
import { TokenInterceptor } from "../interceptors/token.interceptor";
import { TokenService } from "./token.service";

describe("ProductsService", () => {
	let productService: ProductsService;
	let httpTesting: HttpTestingController;
	let tokenService: TokenService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ProductsService,
				TokenService,
				provideHttpClient(withInterceptors([TokenInterceptor])),
				provideHttpClientTesting(),
			],
		});
		productService = TestBed.inject(ProductsService);
		httpTesting = TestBed.inject(HttpTestingController);
		tokenService = TestBed.inject(TokenService);
	});

	afterEach(() => {
		httpTesting.verify();
	});

	it("Should be created", () => {
		expect(productService).toBeTruthy();
	});

	describe("Test method getAllSimple", () => {
		it("Should return products list", (doneFn) => {
			//Arrange
			const mockData: Product[] = generateManyProduct();
			//Act
			productService.getAllSimple().subscribe((products) => {
				//Asert
				expect(products.length).toEqual(mockData.length);
				expect(products).toEqual(mockData);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(`${urlApi}/api/v1/products`);
			req.flush(mockData);
		});

		it("Should return products list with token", (doneFn) => {
			//Arrange
			const mockData: Product[] = generateManyProduct();
			spyOn(tokenService, "getToken").and.returnValue("123456");
			//Act
			productService.getAllSimple().subscribe((products) => {
				//Asert
				expect(products).toEqual(mockData);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(`${urlApi}/api/v1/products`);
			expect(req.request.headers.get("Authorization")).toEqual("Bearer 123456");
			req.flush(mockData);
		});
	});

	describe("Test method getAll", () => {
		it("Should return products list with taxes", (doneFn) => {
			//Arrange
			const mockData: Product[] = [
				{
					...generateOneProduct(),
					price: 1000,
				},
				{
					...generateOneProduct(),
					price: 3000,
				},
				{
					...generateOneProduct(),
					price: 0,
				},
				{
					...generateOneProduct(),
					price: -3000,
				},
			];
			//Act
			productService.getAll().subscribe((products) => {
				//Asert
				expect(products.length).toEqual(mockData.length);
				expect(products[0].taxes).toEqual(190);
				expect(products[1].taxes).toEqual(570);
				expect(products[2].taxes).toEqual(0);
				expect(products[3].taxes).toEqual(0);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(`${urlApi}/api/v1/products`);
			req.flush(mockData);
		});

		it("Should return products list whit params", (doneFn) => {
			//Arrange
			const mockData: Product[] = generateManyProduct(3);
			const limit = 10;
			const offset = 0;
			//Act
			productService.getAll(limit, offset).subscribe((products) => {
				//Asert
				expect(products.length).toEqual(mockData.length);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/products?limit=${limit}&offset=${offset}`
			);
			req.flush(mockData);
			const params = req.request.params;
			expect(params.get("limit")).toEqual(`${limit}`);
			expect(params.get("offset")).toEqual(`${offset}`);
		});
	});

	describe("Test method create", () => {
		it("Should return new products ", (doneFn) => {
			//Arrange
			const mockData: Product = generateOneProduct();
			const dto: CreateProductDTO = {
				title: "New product",
				price: 2500,
				images: ["Image1", "image2"],
				description: "Descripcion new product",
				categoryId: 14,
				creationAt: "2024-08-03T17:38:12.000Z",
				updatedAt: "2024-08-03T17:38:12.000Z",
			};
			//Act
			productService.create({ ...dto }).subscribe((product) => {
				//Asert
				expect(product).toEqual(mockData);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(`${urlApi}/api/v1/products`);
			req.flush(mockData);
			expect(req.request.body).toEqual(dto);
			expect(req.request.method).toEqual("POST");
		});
	});

	describe("Test method update", () => {
		it("Should return product edits ", (doneFn) => {
			//Arrange
			const mockData: Product = generateOneProduct();
			const dto: UpdateProductDTO = {
				title: "New product",
				price: 2500,
				images: ["Image1", "image2"],
				description: "Descripcion new product",
				categoryId: 14,
				creationAt: "2024-08-03T17:38:12.000Z",
				updatedAt: "2024-08-03T17:38:12.000Z",
			};
			const productId = "1";
			//Act
			productService.update(productId, dto).subscribe((product) => {
				//Asert
				expect(product).toEqual(mockData);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/products/${productId}`
			);
			req.flush(mockData);
			expect(req.request.body).toEqual(dto);
			expect(req.request.method).toEqual("PUT");
		});
	});

	describe("Test method Delete", () => {
		it("Should return true-false ", (doneFn) => {
			//Arrange
			const mockData: boolean = true;
			const productId = "1";
			//Act
			productService.delete(productId).subscribe((data) => {
				//Asert
				expect(data).toEqual(mockData);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/products/${productId}`
			);
			req.flush(mockData);
			expect(req.request.method).toEqual("DELETE");
		});
	});

	describe("Test method getOne", () => {
		it("Should return one product ", (doneFn) => {
			//Arrange
			const mockData: Product = generateOneProduct();
			const productId = "1";
			//Act
			productService.getOne(productId).subscribe((product) => {
				//Asert
				expect(product).toEqual(mockData);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/products/${productId}`
			);
			req.flush(mockData);
			expect(req.request.method).toEqual("GET");
		});

		it("Should return msg Error 404", (doneFn) => {
			//Arrange
			const msqError = "404 Mensage error";
			const productId = "1";
			const mockError = {
				status: HttpStatusCode.NotFound,
				statusText: msqError,
			};
			//Act
			productService.getOne(productId).subscribe({
				error: (error) => {
					//Asert
					expect(error).toEqual("El producto no existe");
					doneFn();
				},
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/products/${productId}`
			);
			expect(req.request.method).toEqual("GET");
			req.flush(msqError, mockError);
		});

		it("Should return msg Error 409", (doneFn) => {
			//Arrange
			const msqError = "409 Mensage error";
			const productId = "1";
			const mockError = {
				status: HttpStatusCode.Conflict,
				statusText: msqError,
			};
			//Act
			productService.getOne(productId).subscribe({
				error: (error) => {
					//Asert
					expect(error).toEqual("Algo esta fallando en el server");
					doneFn();
				},
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/products/${productId}`
			);
			expect(req.request.method).toEqual("GET");
			req.flush(msqError, mockError);
		});

		it("Should return msg Error 401", (doneFn) => {
			//Arrange
			const msqError = "401 Mensage error";
			const productId = "1";
			const mockError = {
				status: HttpStatusCode.Unauthorized,
				statusText: msqError,
			};
			//Act
			productService.getOne(productId).subscribe({
				error: (error) => {
					//Asert
					expect(error).toEqual("No estas permitido");
					doneFn();
				},
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/products/${productId}`
			);
			expect(req.request.method).toEqual("GET");
			req.flush(msqError, mockError);
		});

		it("Should return msg Error Default", (doneFn) => {
			//Arrange
			const msqError = "Default Mensage error";
			const productId = "1";
			const mockError = {
				status: HttpStatusCode.Forbidden,
				statusText: msqError,
			};
			//Act
			productService.getOne(productId).subscribe({
				error: (error) => {
					//Asert
					expect(error).toEqual("Ups algo salio mal");
					doneFn();
				},
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/products/${productId}`
			);
			expect(req.request.method).toEqual("GET");
			req.flush(msqError, mockError);
		});
	});

	describe("Test method getByCategory", () => {
		it("Should return product by categories", (doneFn) => {
			//Arrange
			const mockData: Product[] = generateManyProduct(3);
			const limit = 10;
			const offset = 0;
			const categoryId = "1";
			//Act
			productService.getByCategory(categoryId).subscribe((product) => {
				//Asert
				expect(product).toEqual(mockData);
				doneFn();
			});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/categories/${categoryId}/products`
			);
			req.flush(mockData);
			expect(req.request.method).toEqual("GET");
		});

		it("Should return product by categories with limit and offset", (doneFn) => {
			//Arrange
			const mockData: Product[] = generateManyProduct(3);
			const limit = 10;
			const offset = 0;
			const categoryId = "1";
			//Act
			productService
				.getByCategory(categoryId, limit, offset)
				.subscribe((product) => {
					//Asert
					expect(product).toEqual(mockData);
					doneFn();
				});

			//http config
			const urlApi = environment.API_URL;
			const req = httpTesting.expectOne(
				`${urlApi}/api/v1/categories/${categoryId}/products?limit=${limit}&offset=${offset}`
			);
			req.flush(mockData);
			expect(req.request.method).toEqual("GET");
		});
	});
});
