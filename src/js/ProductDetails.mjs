import {
  getLocalStorage,
  getParam,
  setLocalStorage,
  loadHeaderFooter,
  itemsCart,
  performAnimation,
} from "./utils.mjs";
import dataSource from "./ExternalServices.mjs";

loadHeaderFooter();

function productDetailsTemplate(product) {
console.log(product);
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__suggested-price">Suggested Retail Price: $${product.SuggestedRetailPrice.toFixed(2)}</p>
    <p class="product-card__price">Our Price: $${product.FinalPrice}</p>
    <p class="product-card__savings">You save $${(product.SuggestedRetailPrice-product.FinalPrice).toFixed(2)}!</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor() {
    this.product = {};
  }
  async init() {
    this.product = await new dataSource().findProductById(
      getParam("product"),
      getParam("category")
    );
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    const cart = getLocalStorage("cart-select") || {};
    cart[this.product.Id] = cart[this.product.Id]
      ? {
          ...cart[this.product.Id],
          quantity: cart[this.product.Id].quantity + 1,
        }
      : { ...this.product, quantity: 1 };
    setLocalStorage("cart-select", cart);
    itemsCart();
    performAnimation();
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}

new ProductDetails().init();
