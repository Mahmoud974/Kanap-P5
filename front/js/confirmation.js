"use strict";
let idOrder = new URL(window.location.href).searchParams.get("orderId");
/**
 * Display the orderId in the DOM
 */
const confirmChecked = () => {
  orderId.innerText = localStorage.getItem("orderId");

  localStorage.clear();
};

confirmChecked();
