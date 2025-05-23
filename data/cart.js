
export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId: '2'
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionId: '3'
}];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productId,quantitySelector) {
    let matchinItem;

    cart.forEach((cartItem) => {
      if(productId === cartItem.productId) matchinItem = cartItem;
    });

    if (matchinItem) {
      matchinItem.quantity += quantitySelector;
    } else {
      cart.push({
      productId,
      quantity: quantitySelector,
      deliveryOptionId: '1'
      });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function cartItemsQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchinItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) matchinItem = cartItem;
  });

  matchinItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}