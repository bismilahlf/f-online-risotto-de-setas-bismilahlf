'use strict';

var ingredientList = '';

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    json.recipe.ingredients.map(function(ingredient) {
      ingredientList += `<li class="list-group-item list-group-item-action p-0">
      <div class="row no-gutters">
        <div class="col d-flex align-items-center">
          <input type="checkbox" class="m-1">
          <input type="number" value="0" min="0" class="form-control m-1 text-primary ingredient-quantity">
          <div class="d-flex flex-column m-1">
            <span class="item-name text-dark">${ingredient.product}</span>
            <small class="text-secondary">${ingredient.brand || ''}</small>
            <small class="">${ingredient.quantity}</small>
          </div>
        </div>
        <div class="col-2 mr-4 d-flex align-items-center justify-content-end">
          <span class="text-success">${ingredient.price}${json.recipe.currency}</span>
        </div>
      </div>
    </li>`;
    });
    var listElem = document.querySelector('.list-group');
    listElem.innerHTML = ingredientList;
  });