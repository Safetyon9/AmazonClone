import { getOrder, getOrderFake } from "../data/order.js";
import { getProduct, loadProducts } from "../data/products.js";
import { compareDate } from "./utils/compareDate.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export async function loadPage() {
  try{

    await loadProducts();

  } catch(error){

    console.log('errore nel caricamento della pagina.', error);

  }
  renderTracking();
}

export function renderTracking() {
  let trackingHTML = '';

  const params = new URLSearchParams(window.location.search);
  const orderTracking = getOrder(params.get('orderId')) || getOrderFake(params.get('orderId'));
  const productInfo = getProduct(params.get('productId'));
  let deliveryDate;
  let productTracking;
  
  if(orderTracking){
    orderTracking.products.forEach(product => {
        if(product.productId === productInfo.id){
            deliveryDate = dayjs(product.estimatedDeliveryTime).startOf('day');
            productTracking = product;
        }
    });

    trackingHTML += `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date js-delivery-date">
          ${compareDate(deliveryDate)} ${deliveryDate.format("dddd, MMMM DD")}
        </div>

        <div class="product-info js-product-info-name">
          ${productInfo.name}
        </div>

        <div class="product-info js-product-info-quantity">
          quantity: ${productTracking.quantity}
        </div>

        <img class="product-image" src="${productInfo.image}">

        <div class="progress-labels-container">
          <div class="progress-label js-preparing-status">
            Preparing
          </div>
          <div class="progress-label js-shipped-status">
            Shipped
          </div>
          <div class="progress-label js-delivered-status">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

    const today = dayjs().startOf('day');
    const orderDate = dayjs(orderTracking.orderTime).startOf('day');
    const preparing = document.querySelector('.js-preparing-status');
    const shipped = document.querySelector('.js-shipped-status');
    const delivered = document.querySelector('.js-delivered-status');
    const progressBar = document.querySelector('.js-progress-bar');

    if (today.isSame(orderDate) || (today.add(1,'day')).isSame(orderDate)){
      console.log('prova')
      progressBar.style.width = '5%'
      preparing.style.color ='rgb(6, 125, 98)';
    }else if(today.isBefore(deliveryDate)) {
      console.log('prova1')
      progressBar.style.width = '52%'
      shipped.style.color ='rgb(6, 125, 98)';
    }else{
      console.log('prova2')
      progressBar.style.width = '100%'
      delivered.style.color ='rgb(6, 125, 98)';
    }
  }
}
