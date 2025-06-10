import { Product, Clothing, getProduct } from "../../data/products.js";

describe('test suite: products', () => {
    const testProduct = new Product({
        id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
        image: "images/products/6-piece-non-stick-baking-set.webp",
        name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
        rating: {
        stars: 4.5,
        count: 175
        },
        priceCents: 3499,
        keywords: [
        "kitchen",
        "cookware"
        ]
    });
    const testClothing = new Clothing({
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
        stars: 4.5,
        count: 56
        },
        priceCents: 799,
        keywords: [
        "tshirts",
        "apparel",
        "mens"
        ],
        type: "clothing",
        sizeChartLink: "images/clothing-size-chart.png"
    });

    it('testing Product class', () => {

        expect(testProduct.id).toEqual("8c9c52b5-5a19-4bcb-a5d1-158a74287c53");
        expect(testProduct.image).toEqual("images/products/6-piece-non-stick-baking-set.webp");
        expect(testProduct.name).toEqual("6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set");
        expect(testProduct.rating.stars).toEqual(4.5);
        expect(testProduct.rating.count).toEqual(175);
        expect(testProduct.priceCents).toEqual(3499);
        expect(testProduct.extraInfoHTML()).toEqual('');
    });

    it('testing Clothing class', () => {

        expect(testClothing.sizeChartLink).toEqual("images/clothing-size-chart.png");
        expect(testClothing.extraInfoHTML()).toContain("images/clothing-size-chart.png");
    });

    it('testing getProducts', () => {
        const testId = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";

        expect(getProduct(testId)).toEqual(testClothing);
    });

});