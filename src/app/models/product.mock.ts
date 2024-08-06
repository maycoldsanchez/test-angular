import { faker } from "@faker-js/faker";
import { Product } from "./product.model";

export const generateOneProduct = (): Product => {
	return {
		id: faker.string.uuid(),
		title: faker.commerce.productName(),
		price: parseInt(faker.commerce.price(), 10),
		description: faker.commerce.productDescription(),
		images: [faker.image.url(), faker.image.url()],
		creationAt: faker.date.anytime().toString(),
		updatedAt: faker.date.anytime().toString(),
		category: {
			id: faker.number.int(100),
			name: faker.commerce.department(),
			image: faker.image.url(),
			creationAt: faker.date.anytime().toString(),
			updatedAt: faker.date.anytime().toString(),
		},
	};
};

export const generateManyProduct = (size: number = 10): Product[] => {
	const products: Product[] = [];
	for (let i = 0; i < size; i++) {
		products.push(generateOneProduct());
	}
	return [...products];
};
