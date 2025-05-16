export const cart = [];

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
      quantity: quantitySelector
      });
    }
}