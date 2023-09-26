import { getLocalStorage, setLocalStorage} from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <p class="delete">x</p>

  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}




export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    if (!cartItems) { 
      document.querySelector(this.parentSelector).innerHTML = "<p>No hay productos en el carrito</p>";
      return;
    }
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");


    const cartTotal = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
    document.getElementById("total").textContent = `${cartTotal}`;


    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const cart = getLocalStorage("cart-select") || [];
        const index = cart.findIndex((item) => item.Id === parseInt(event.target.dataset.id));
        cart.splice(index, 1);
        setLocalStorage("cart-select", cart);
        this.renderCartContents();
      });
    });

  
}

 
}
