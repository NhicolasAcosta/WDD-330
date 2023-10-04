import { loadHeaderFooter, itemsCart } from  "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs"

loadHeaderFooter();


itemsCart()
const myCheckout = new CheckoutProcess("cart-select", ".checkout-summary");
myCheckout.init();


document.querySelector("#zip").addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  myCheckout.checkout();
});
