import { orders } from "../data/order.js";
import { cart } from "../data/cart-oop.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct, loadProducts } from "../data/products.js";
import { compareDate } from "./utils/compareDate.js";

async function loadPage() {
  try{

    await loadProducts();

  } catch(error){

    console.log('errore nel caricamento della pagina.', error);

  }
  renderOrder();
}

loadPage();

function renderOrder() {
  let ordersHTML = '';

  orders.forEach(order => {
    ordersHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dayjs(order.orderTime).format('MMMM DD')}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
    `;
    
    order.products.forEach(boughtItem => {
      const product = getProduct(boughtItem.productId);
      const deliveryDate = dayjs(boughtItem.estimatedDeliveryTime);
      ordersHTML += `
      <div class="order-details-grid">
            <div class="product-image-container">
              <img src=${product.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                ${compareDate(deliveryDate)} ${deliveryDate.format("MMMM DD")}
              </div>
              <div class="product-quantity">
                Quantity: ${boughtItem.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-id="${boughtItem.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${boughtItem.productId}">
                <button class="track-package-button button-secondary js-track-button">
                  Track package
                </button>
              </a>
            </div>
      </div>
      `;
    });

    ordersHTML += `
    </div>
    `
  });
  
  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
  
  const cartQuantity = document.querySelector('.js-cart-quantity');
  const buyAgainButtons = document.querySelectorAll('.js-buy-again-button');

  cart.cartItems = [];
  cart.saveToStorage();

  buyAgainButtons.forEach(buyAgainButton => {
    buyAgainButton.addEventListener('click',() => {
    cart.addToCart(buyAgainButton.dataset.id,1);

    cartQuantity.textContent = cart.cartItemsQuantity();
  });
  });

  document.querySelector('.js-track-button').addEventListener('click',() => {

  });
}