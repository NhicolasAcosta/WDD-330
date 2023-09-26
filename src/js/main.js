import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

function itemsCart() {
  const cart = getLocalStorage("cart-select") || [];
  const cartItems = document.getElementById("cartNumber");
  cartItems.innerHTML = cart.length;
}

itemsCart();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const listing = new ProductList("tents", dataSource, element);

listing.init();
