"use strict";
//Init the data and total in the variable
let data = [];
let total = [];
let quantityTotal = [];
let getItemsInStorage;
let getJSON;
totalQuantity.innerHTML = 0;
totalPrice.innerHTML = 0;
//Get the storage of 'Produit'
let productStorage = JSON.parse(localStorage.getItem("produit"));

/**
 * Get an information via API with the param Id
 * @param {String} myId
 */
const getData = async (myId) => {
  await fetch(`http://localhost:3000/api/products/${myId}`)
    .then((res) => res.json())
    .then((res) => (data = res));

  // .then(() => console.log(data));
};

/**
 * Make the products in the basket
 */
const getProducts = async () => {
  //Recover the localStorage his value
  getItemsInStorage = window.localStorage.getItem("produit");
  //Put "Panier vide" if it's empty
  if (getItemsInStorage === null || getItemsInStorage.length == 2) {
    cart__items.innerHTML = "<p>Panier vide</p>";
  } else {
    //Display the product to select
    for (let i = 0; i < JSON.parse(getItemsInStorage).length; i++) {
      getJSON = JSON.parse(getItemsInStorage)[i];
      await getData(getJSON._id);

      cart__items.innerHTML += ` <article class="cart__item" data-id="${
        getJSON._id
      }" data-color=${getJSON.colors}>
                <div class="cart__item__img">
                  <img src=${String(
                    data.imageUrl
                  )} alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${String(data.name)}</h2>
                    <p>${getJSON.colors}</p>
                    <p id='prixXQuantity'>${Number(data.price)} € </p> 
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :  </p>
                      <input index="${[
                        i,
                      ]}" type="number" onchange="modifyQuantity(this)" class="itemQuantity" name="itemQuantity"  min="1" max="100"   value="${
        productStorage[i].quantity
      }">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p index="${[
                        i,
                      ]}" onclick="deleteArticle(this)" class="deleteItem" 
                        >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
    }

    {
      totalprice();

      totalPrice.innerHTML = totalprice();
    }
  }
};

/**
 *
 * @returns Total of price
 */
const totalprice = () => {
  let totalprix = 0;
  for (let i = 0; i < JSON.parse(getItemsInStorage).length; i++) {
    totalprix = Number(totalOfItem()) * parseInt(data.price);
    let resultNumbers = totalprix;
    return resultNumbers;
  }
};
/**
 * Delete an article
 * @param {*} e
 */
const deleteArticle = (e) => {
  //TODO:A REVOIR imperativement

  if (confirm("Voulez-vous supprimer?")) {
    let index = e.getAttribute("index");
    productStorage.splice(index, 1);
    localStorage.setItem("produit", JSON.stringify(productStorage));

    if (productStorage.length == []) {
      cart__items.innerHTML = "<p>Panier vide</p>";
      totalQuantity.innerHTML = totalOfItem();
      totalPrice.innerHTML = totalprice();
    } else {
      let article = document.querySelectorAll("article");
      for (let anArticle of article) {
        anArticle.addEventListener("click", (e) => {
          e.currentTarget.remove();
          totalQuantity.innerHTML = totalOfItem();
          totalPrice.innerHTML = totalprice();
        });
      }
    }
  }
};
getProducts();

/**
 *Modidy the quantities from input
 * @param {*} testNumber
 * @returns
 */
const modifyQuantity = (e) => {
  let index = e.getAttribute("index");
  let newQty = e.value;
  productStorage[index].quantity = newQty;

  if (newQty == 0) {
    productStorage.splice(index, 1);
    localStorage.setItem("produit", JSON.stringify(productStorage));
    location.reload();
  } else {
    // document.querySelector("#totalPrice").innerHTML = totalOfItem();
    localStorage.setItem("produit", JSON.stringify(productStorage));
  }
  totalQuantity.innerHTML = totalOfItem();
  totalPrice.innerHTML = totalprice();
};

const totalOfItem = () => {
  const totalQuantity = productStorage
    .map((total) => Number(total.quantity))
    .reduce((a, b) => a + b, 0);

  return totalQuantity;
};
totalQuantity.innerHTML = totalOfItem();

//Check of forms with regex
const cart__order__form = document.querySelector("form");
const inputs = document.querySelectorAll(
  ' input[type="text"], input[type="email"]'
);
//Init of variables
let firstName, lastname, adress, city, mail;
//Alert of mistakes
const errorDisplay = (tag, message, valid) => {
  const selectId = document.querySelector(`#${tag}`);

  if (!valid) {
    selectId.textContent = message;
  } else {
    selectId.textContent = message;
  }
};
/**
 *Check the correspondance of FirstName
 * @param {String} value
 */
const checkFirstName = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "firstNameErrorMsg",
      "Le prenom doit faire entre 3 et 20 caractères"
    );
    firstName = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "firstNameErrorMsg",
      "Le prenom ne doit pas contenir de caractères spéciaux"
    );
    firstName = null;
  } else {
    errorDisplay("firstNameErrorMsg", "", "");
    firstName = value;
  }
};
/**
 *Check the correspondance of lastName
 * @param {String} value
 */
const checkLastName = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "lastNameErrorMsg",
      "Le nom doit faire entre 3 et 20 caractères"
    );
    lastname = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "lastNameErrorMsg",
      "Le prenom ne doit pas contenir de caractères spéciaux"
    );
    lastname = null;
  } else {
    errorDisplay("lastNameErrorMsg", "", "");
    lastname = value;
  }
};
/**
 *Check the correspondance of adress
 * @param {String} value
 */
const checkAdress = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "addressErrorMsg",
      "L'adresse doit faire entre 3 et 20 caractères"
    );
    adress = null;
  } else if (
    !value.match(/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/)
  ) {
    errorDisplay(
      "addressErrorMsg",
      "L'adresse ne doit pas contenir de caractères spéciaux"
    );
    adress = null;
  } else {
    errorDisplay("addressErrorMsg", "", "");
    adress = value;
  }
};

/**
 *Check the correspondance of the city
 * @param {String} value
 */
const checkCity = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("cityErrorMsg", "Le nom doit faire entre 3 et 20 caractères");
    city = null;
  } else if (!value.match(/^[a-zA-Z0-9|\s]{2,15}$/)) {
    //Alert of mistakes
    errorDisplay(
      "cityErrorMsg",
      "La ville ne doit pas contenir de caractères spéciaux"
    );
    city = null;
  } else {
    errorDisplay("cityErrorMsg", "", "");
    city = value;
  }
};
/**
 *Check the correspondance of mail
 * @param {String} value
 */
const checkMail = (value) => {
  if (
    !value.match(
      /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i
    )
  ) {
    errorDisplay("emailErrorMsg", "Le mail n'est pas valide");
    mail = null;
  } else {
    errorDisplay("emailErrorMsg", "", true);
    mail = value;
  }
};
/**
 * Full the inputs correctly
 */
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        checkFirstName(e.target.value);
        break;
      case "lastName":
        checkLastName(e.target.value);
        break;
      case "address":
        checkAdress(e.target.value);
        break;
      case "city":
        checkCity(e.target.value);
        break;
      case "email":
        checkMail(e.target.value);
        break;

      default:
        null;
    }
  });
});

/**
 * Send the form to confirmation.html
 */

// let inputAll = document.querySelectorAll("input");

order.addEventListener("click", (e) => {
  const thisValue = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  e.preventDefault();
  //Get a condition if they're full
  if (
    getItemsInStorage === null ||
    getItemsInStorage.length == 2 ||
    productStorage.length == "" ||
    thisValue.firstName == "" ||
    thisValue.lastName == "" ||
    thisValue.adress == "" ||
    thisValue.city == "" ||
    thisValue.email == ""
  ) {
    alert("Remplir les inputs ou les paniers corrrectement !");
  } else {
    //Build localStorage of array
    let idProducts = [];
    for (let i = 0; i < productStorage.length; i++) {
      idProducts.push(productStorage[i]._id);
    }
    /**
     * Init on the object
     */
    const checkForm = {
      contact: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      },
      products: idProducts,
    };
    //Post the form
    const options = {
      method: "POST",
      body: JSON.stringify(checkForm),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((res) => res.json())
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);

        document.location.href = "confirmation.html?id=" + data.orderId;
      })

      .catch(function (err) {
        alert("erreur");
      });
  }
});
