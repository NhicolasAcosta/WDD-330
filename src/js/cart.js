import { loadHeaderFooter  } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage } from "./utils.mjs";


loadHeaderFooter();


function itemsCart() {
  const carts = getLocalStorage("cart-select") || [];
  const cartItems = document.getElementById("cartNumber");
  cartItems.innerHTML = carts.length;
}

itemsCart();

const cart = new ShoppingCart("cart-select", ".product-list");
cart.renderCartContents();
