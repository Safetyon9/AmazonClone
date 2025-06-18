import { renderTracking } from "../scripts/pre-tracking.js";
import * as ProductModule from "../data/products.js";
import * as OrderModule from '../data/order.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

describe('test suite: tracking', () => {
    const productdId1 = 'dd82ca78-a18b-4e2a-9250-31e67412f98d';
    const orderId1 = {
                id: "mock123",
                orderTime: '2025-06-19T16:37:43.330Z',
                totalCostCents: 1000,
                products: [{
                    productId: productdId1,
                    quantity: 1,
                    estimatedDeliveryTime: '2025-06-25T16:37:43.330Z',
                    variation: null
                }]
        };

    beforeAll((done) => {

        ProductModule.loadProducts().then(() => {
            done();
        });

        history.replaceState({}, '', `${location.pathname}?orderId=${orderId1.id}&productId=${productdId1}`);
    })

    beforeEach(() => {
        
        OrderModule.addOrderFake(orderId1);

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-tracking"></div>
        `;

        renderTracking();
    })


    it('display the product', () =>{
        expect(
            (document.querySelector('.js-product-info-name')).innerText
        ).toContain((ProductModule.getProduct(productdId1)).name);
        expect(
            (document.querySelector('.js-product-info-quantity')).innerText
        ).toEqual(`quantity: ${orderId1.products[0].quantity}`);
    });

    it('correct dates', () => {
        expect(
            (document.querySelector('.js-delivery-date')).innerText
        ).toContain(dayjs(orderId1.products[0].estimatedDeliveryTime).
        format("dddd, MMMM DD"));
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
        OrderModule.removeOrderFake(orderId1);
    });
    
});