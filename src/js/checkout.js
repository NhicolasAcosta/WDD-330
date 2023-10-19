import { loadHeaderFooter, itemsCart } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { deleteLocalStorage } from "./utils.mjs";

loadHeaderFooter();

itemsCart();
const myCheckout = new CheckoutProcess("cart-select", ".checkout-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0]; // Gets the form
  const chk_status = myForm.checkValidity(); // Invoked the form's native validity checks, those that are defined within the tags themselves
  myForm.reportValidity(); // If there is a problem with the form's validity, print the error message
  if (chk_status) { // Only continue with the ckecout if the validity check passes
    deleteLocalStorage(); // clear the cart
    location.href = "success2.html"; // REdirect user to the success page upon successful checkout 
  }
  myCheckout.checkout();
});
