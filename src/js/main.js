import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

function itemsCart() {
  const cart = getLocalStorage("cart-select") || [];
  const cartItems = document.getElementById("cartNumber");
  cartItems.innerHTML = cart.length;
}

itemsCart();

//listing.init();
