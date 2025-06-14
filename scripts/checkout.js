import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { cart } from "../data/cart-oop.js";
//import '../../data/cart-oop.js';

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/

async function loadPage() {
    try{

        await loadProducts();

        await new Promise((resolve) => {
            cart.loadCart(() => {
                resolve();
            });
        });

    } catch (error) {
        console.log('Unexpected error. Please try again later.\n',error);
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();


/*
Promise.all([
    loadProducts(),
    new Promise((resolve) => {
        cart.loadCart(() => {
            resolve();
        });
    })

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/