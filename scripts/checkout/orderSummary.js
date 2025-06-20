import { cart } from '../../data/cart-oop.js';
import { products, getProduct } from '../../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption, deliveryDaysCalculator} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { formatCurrency } from '../utils/money.js';
formatCurrency

export function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId;
        
        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = deliveryDaysCalculator(today,deliveryOption.deliveryDays);
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
            <div class="cart-item-container 
            js-cart-item-container 
            js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ${matchingProduct.getPrice()}
                        </div>
                        <div class="product-quantity 
                            js-product-quantity-${matchingProduct.id}">
                            <span>
                            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary 
                            js-update-link" data-product-id="${matchingProduct.id}">
                            Update
                            </span>
                            <input class="update-quantity-input js-update-quantity-input-${matchingProduct.id}" type="number">
                            <span class="save-quantity-link link-primary 
                            js-save-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                            Save
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link 
                            js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                            Delete
                            </span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct,cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    const orderSummary = document.querySelector('.js-order-summary');
    const checkoutQuantity = document.querySelector('.js-checkout-elements');
    orderSummary.innerHTML = cartSummaryHTML;

    if(checkoutQuantity !== null) checkoutQuantity.innerHTML = `${cart.cartItemsQuantity()} items`;

    function deliveryOptionsHTML(matchingProduct,cartItem) {
        const today = dayjs();
        let html = '';

        deliveryOptions.forEach((deliveryOption) =>{
            const deliveryDate = deliveryDaysCalculator(today,deliveryOption.deliveryDays);
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = deliveryOption.priceCents===0? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id===cartItem.deliveryOptionId;

            html += `
                    <div class="delivery-option js-delivery-option" 
                        data-product-id="${matchingProduct.id}" 
                        data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio"
                        ${isChecked?'checked':''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                ${dateString}
                            </div>
                            <div class="delivery-option-price">
                                ${priceString} Shipping
                            </div>
                        </div>
                    </div>
                    `
        });
        
        return html; 
    }

    document.querySelectorAll('.js-delivery-option')
        .forEach((radio) =>{
            radio.addEventListener('click', () =>{
                const {productId, deliveryOptionId} = radio.dataset;
                cart.updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                cart.removeFromCart(productId);

                renderOrderSummary();
                renderPaymentSummary();
            });
        });

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () =>{
                    const saveLink = document.querySelector(`.js-save-link-${link.dataset.productId}`);
                    const updateInput = document.querySelector(`.js-update-quantity-input-${link.dataset.productId}`);

                    link.style.display = 'none';
                    saveLink.style.display = 'inline';
                    updateInput.style.display = 'inline';

                    saveLink.addEventListener('click', () => {
                        const updateInputValue = Number(updateInput.value);

                        if(updateInputValue>=0 && updateInputValue<100 && updateInputValue!==''){
                            cart.addToCart(link.dataset.productId,updateInputValue);
                            const labelQuantity = document.querySelector(`.js-quantity-label-${link.dataset.productId}`);
                            labelQuantity.innerHTML = `${Number(labelQuantity.innerText)+updateInputValue}`;
                            checkoutQuantity.innerHTML = `${cart.cartItemsQuantity()} items`;
                        }

                        link.style.display = 'inline';
                        saveLink.style.display = 'none';
                        updateInput.style.display = 'none';
                        renderPaymentSummary();
                    }, {once: true});

            });
        });
}
