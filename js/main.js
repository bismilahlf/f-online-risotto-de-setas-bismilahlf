'use strict';

var data;
var listItem = document.querySelector('.list-group');
var ingredientList = '';

var checkboxes = [];
var quantities = [];
var prices = [];

var selectButton = document.querySelector('.select-button');
var unselectButton = document.querySelector('.unselect-button');

var subtotalTag = document.querySelector('.subtotal');
var totalButtonTag = document.querySelector('.total-button');
var shippingCost = parseFloat(document.querySelector('.shipping-costs').innerHTML);
var totalPriceTag = document.querySelector('.total');
var totalItemsTag = document.querySelector('.total-items');

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    data = json;
    createList();
    init();
  });

function createList() {
  data.recipe.ingredients.map( (ingredient) => {
    ingredientList +=
      `<li class="list-group-item list-group-item-action p-0">
        <div class="row no-gutters">
          <div class="col d-flex align-items-center">
            <input type="checkbox" class="m-1 item-selected">
            <input type="number" value="${ingredient.items}" min="0" class="form-control m-1 text-primary item-number">
            <div class="d-flex flex-column m-1">
              <span class="item-name text-dark">${ingredient.product}</span>
              <small class="text-secondary">${ingredient.brand || ''}</small>
              <small class="">${ingredient.quantity}</small>
            </div>
          </div>
          <div class="col-2 mr-4 d-flex align-items-center justify-content-end">
            <span class="text-success"><span class="item-price">${ingredient.price}</span>${data.recipe.currency}</span>
          </div>
        </div>
      </li>`;
  });
  listItem.innerHTML = ingredientList;
}

function init() {
  checkboxes = document.querySelectorAll('.item-selected');
  quantities = document.querySelectorAll('.item-number');
  prices = document.querySelectorAll('.item-price');

  for(var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', updateTotal);
    quantities[i].addEventListener('change', updateTotal);
  }

  selectButton.addEventListener('click', selectAll);
  unselectButton.addEventListener('click', unselectAll);
}

function updateTotal() {
  var totalPrice = 0;
  var totalItems = 0;
  
  for(var i = 0; i < checkboxes.length; i++) {
    if(checkboxes[i].checked === true) {
      totalPrice += quantities[i].value * parseFloat(prices[i].innerHTML);
      totalItems += parseInt(quantities[i].value);
    }
  }

  subtotalTag.innerHTML = totalPrice.toFixed(2);

  if(totalPrice !== 0) {
    totalButtonTag.innerHTML = totalPriceTag.innerHTML = (totalPrice + shippingCost).toFixed(2);
  } else {
    totalButtonTag.innerHTML = totalPriceTag.innerHTML = totalPrice.toFixed(2);
  }
  
  totalItemsTag.innerHTML = totalItems;
}

function selectAll() {
  for(var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = true;
  }
  updateTotal();
}

function unselectAll() {
  for(var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  updateTotal();
}