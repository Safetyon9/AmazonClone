import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-oop.js";
import { loadProducts } from "../../data/products.js";

describe('test suite: renderOrderSumary', () => {
    const productdId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productdId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeAll((done) => {
        loadProducts().then(() => {
            done();
        });
    });
    
    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
            productId: productdId1,
            quantity: 2,
            deliveryOptionId: '2'
            }, {
            productId: productdId2,
            quantity: 1,
            deliveryOptionId: '3'
            }]);
        });
        cart.cartItems = JSON.parse(localStorage.getItem('cart'));

        renderOrderSummary();
    });

    it('displays the cart', () => {

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productdId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productdId2}`).innerText
        ).toContain('Quantity: 1');

    });

    it('removes a product', () => {

        document.querySelector(`.js-delete-link-${productdId1}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        expect(
        document.querySelector(`.js-cart-item-container-${productdId1}`)
        ).toEqual(null);
        expect(
        document.querySelector(`.js-cart-item-container-${productdId2}`)
        ).not.toEqual(null);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productdId2);

    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });
});