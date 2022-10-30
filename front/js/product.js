"use strict";
let data = [];
let canapStorage;
//Select the balises option and item__img
const option = document.querySelector("option"),
  item_img = document.querySelector(".item__img");

//Get an object URL
let str = window.location.href,
  url = new URL(str),
  search_params = new URLSearchParams(url.search),
  productId = search_params.get("id");
/**
 * Get Id of articles with API
 */
const getdata = async () => {
  await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((data) => data.json())
    .then((res) => (data = res));
};
/**
 * Insert the API on the page product
 */
const setData = () => {
  document.title = `${data.name} | ${data.description}`;
  title.textContent = data.name;
  item_img.innerHTML = ` <img src=${data.imageUrl} alt=${data.altTxt}>`;
  price.textContent = data.price.toLocaleString();
  description.textContent = data.description;

  //Get an array of string any colors
  for (let colors of data.colors) {
    let createColors = document.createElement("option");
    document.querySelector("#colors").appendChild(createColors);
    createColors.value = colors;
    createColors.innerHTML = colors;
  }
};
/**
 * Add a promise
 */
const getdatadetails = async () => {
  await getdata();
  setData();
};
getdatadetails();
//Add the products with the button and redirect at the page cart.html
addToCart.addEventListener("click", () => {
  /**
   * Throw an alert if the condition don't full
   */
  if (colors.value == "" || quantity.value == 0) {
    return alert("Veuillez choisir une couleur ou une quantité! ");
  } else if (quantity.value <= 100) {
    /**
     * Choose a quantity in the condition
     */
    let optionsProduit = {
      _id: productId,
      colors: colors.value,
      quantity: Number(quantity.value),
    };

    canapStorage = JSON.parse(localStorage.getItem("produit"));

    if (canapStorage) {
      const findProduct = canapStorage.find(
        (el) => el._id === productId && el.colors === colors.value
      );

      if (findProduct) {
        let newQuantite =
          parseInt(optionsProduit.quantity) + parseInt(findProduct.quantity);
        findProduct.quantity = newQuantite;
        localStorage.setItem("produit", JSON.stringify(canapStorage));
      } else {
        canapStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(canapStorage));
      }
      //Empty the basket
    } else {
      canapStorage = [];
      canapStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(canapStorage));
    }
  }
  alert(`Le produit ${data.name} a été rajouté au panier !`);
});
