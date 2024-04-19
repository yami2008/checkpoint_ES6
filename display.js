import { categories } from "./data.js";

let selectCategorie = document.getElementById('search-categorie');

// Cette méthode displays le tableau d'object data dans le HTML.
export const displayData = (data) => {
    for (const item of data) {
        articles.innerHTML = articles.innerHTML + `
        <div class="col-4" style="height: 100%">
            <div class="card">
                <img src="${item.thumbnail}" class="card-img-top" alt="${item.description}" style="object-fit: fill; width: 100%; height: 200px; border-bottom: 1px solid rgba(128, 128, 128, .5)">
                <div class="card-body">
                    <h5 class="card-title">${item.title.toUpperCase()}</h5>
                    <p class="card-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.description}</p>
                    <h4><span class="badge text-bg-danger">${item.price} DA</span></h4>
                    <p class="card-text">${item.category.toUpperCase()}</p>
                </div>
            </div>
        </div>
    ` ;
    }
}


// Cette méthode display toutes les cases à cocher pour filtrer les articles selon la catégories
export const displayCategoriesCheckbox = () => {
    selectCategorie.innerHTML = selectCategorie.innerHTML +
        `<div class="form-check col-4">
        <input class="form-check-input categories" type="checkbox" value="all" id="all-categories" checked>
        <label class="form-check-label" for="all-categories">
            TOUS
        </label>
    </div>`;
    for (const categorie of categories) {
        selectCategorie.innerHTML = selectCategorie.innerHTML +
            `<div class="form-check col-4">
                <input class="form-check-input categories" type="checkbox" value="${categorie}" id="${categorie}">
                <label class="form-check-label" for="${categorie}">
                    ${categorie.toUpperCase()}
                </label>
            </div>`;
    }
}