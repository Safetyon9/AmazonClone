export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export let fakeOrders = [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

export function addOrderFake(order) {
    fakeOrders.unshift(order);
    saveToStorage();
}

export function removeOrderFake(orderRemove) {
    const newOrders = fakeOrders.filter(order => order.id !== orderRemove.id);
    fakeOrders = newOrders;
    saveToStorage();
}

export function getOrder(orderId) {
    let matchingOrder;
    
      orders.forEach((order) => {
          if (order.id === orderId) matchingOrder = order;
      });
      
      return matchingOrder;
}

export function getOrderFake(orderId) {
    let matchingOrder;
    
      fakeOrders.forEach((order) => {
          if (order.id === orderId) matchingOrder = order;
      });
      
      return matchingOrder;
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}
