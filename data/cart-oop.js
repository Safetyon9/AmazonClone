class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {  
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '2'
        }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '3'
        }];
    }
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addToCart (productId,quantitySelector) {
        let matchinItem;

        this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId) matchinItem = cartItem;
        });

        if (matchinItem) {
        matchinItem.quantity += quantitySelector;
        } else {
        this.cartItems.push({
        productId,
        quantity: quantitySelector,
        deliveryOptionId: '1'
        });
        }

        this.saveToStorage();
    }
    removeFromCart(productId) {
        const newCartItems = [];

        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId !== productId) {
            newCartItems.push(cartItem);
            }
        });

        this.cartItems = newCartItems;

        this.saveToStorage();
    }
    cartItemsQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    }
    updateDeliveryOption(productId, deliveryOptionId) {
    let matchinItem;

    this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId) matchinItem = cartItem;
    });

    matchinItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
    }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);