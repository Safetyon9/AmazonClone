import { cart, removeFromCart, cartItemsQuantity, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';
const orderSummary = document.querySelector('.js-order-summary');
const checkoutQuantity = document.querySelector('.js-checkout-elements');

cart.forEach( (cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) matchingProduct = product;
    });

    cartSummaryHTML += `
        <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
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
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                        <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${productId}">
                        <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
});


orderSummary.innerHTML = cartSummaryHTML;
checkoutQuantity.innerHTML = `${cartItemsQuantity()} items`;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            checkoutQuantity.innerHTML = `${cartItemsQuantity()} items`;

            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.remove();
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
                        addToCart(link.dataset.productId,updateInputValue);
                        const labelQuantity = document.querySelector(`.js-quantity-label-${link.dataset.productId}`);
                        labelQuantity.innerHTML = `${Number(labelQuantity.innerText)+updateInputValue}`;
                        checkoutQuantity.innerHTML = `${cartItemsQuantity()} items`;
                    }

                    link.style.display = 'inline';
                    saveLink.style.display = 'none';
                    updateInput.style.display = 'none';
                }, {once: true});

        });
    });