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

    await loadProducts();

    await new Promise((resolve) => {
        cart.loadCart(() => {
            resolve();
        });
    });

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