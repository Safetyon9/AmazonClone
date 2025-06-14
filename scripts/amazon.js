import { products, loadProductsXML } from '../data/products.js';
import { cart } from '../data/cart-oop.js';

/*
const products = [{
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: {
        stars: 4.5,
        count: 87
    },
    priceCents: 1090
}, {
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
        stars: 4.0,
        count: 127
    },
    priceCents: 2095
}, {
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
        stars: 4.5,
        count: 56
    },
    priceCents: 799
}, {
    image: 'images/products/black-2-slot-toaster.jpg',
    name: '2 Slot Toaster - Black',
    rating: {
        stars: 5,
        count: 2197
    },
    priceCents: 1899
}];
*/

loadProductsXML(renderProductsGrid);

function renderProductsGrid() {

  let cartQuantity = 0;
  let timeoutAdded;
  let productHTML = '';

  products.forEach(product => {
      productHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src=${product.getStarsUrl()}>
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart" id="added-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;
  });

  if(cart.cartItemsQuantity()!== 0) updateCartQuantity();

  document.querySelector('.products-grid').innerHTML = productHTML;

  function updateCartQuantity () {
    cartQuantity = cart.cartItemsQuantity();

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  function addedOpacityTransition (addedText) {
    addedText.style.opacity = '1';

    clearTimeout(timeoutAdded);

    timeoutAdded = setTimeout(() => {
      addedText.style.opacity = '0';
    }, 2000);
  }

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      cart.addToCart(productId,quantitySelector);
      updateCartQuantity();
      addedOpacityTransition(document.getElementById(`added-${productId}`));
    });
  });

}