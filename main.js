import {data} from "./data.js";
import {displayData, displayCategoriesCheckbox} from "./display.js";

const inputSearchElement = document.getElementById('search-nom');
let showTotalNumberOfArticlesElement = document.getElementById('showing-nomber-result');
let filterCategories = ['all'] ;
let filterPriceValue = '' ;
const minPriceElement = document.getElementById('minPrice') ;
const maxPriceElement = document.getElementById('maxPrice');
const sortElement = document.getElementById('sort');
let articles = document.getElementById('articles');

const filterData = ()=> {

    let filtredData = [...data] ;

    if (inputSearchElement.value){
        filtredData = filtredData.filter(function (item){
            return item.title.toLowerCase().includes(inputSearchElement.value.toLowerCase());
        });
    }

    if (filterCategories.length !== 0 && !filterCategories.includes('all')){
        filtredData = filtredData.filter(function (item){
            return filterCategories.includes(item.category.toLowerCase());
        });
    }

    if (filterPriceValue !== "all"){
        if (filterPriceValue === "20"){
            filtredData = filtredData.filter( item => item.price <= 20);
        }
        else if (filterPriceValue === "100"){
            filtredData = filtredData.filter( item => item.price >= 20 && item.price <= 100);
        }
        else if (filterPriceValue === "500"){
            filtredData = filtredData.filter( item => item.price >= 100 && item.price <= 500);
        }
        else if (filterPriceValue === "1000"){
            filtredData = filtredData.filter( item => item.price >= 500 && item.price <= 1000);
        }
        else if (filterPriceValue === "infini"){
            filtredData = filtredData.filter( item => item.price >= 1000);
        }
        else if (filterPriceValue === "costum"){
            let minPrice = minPriceElement.value !== "" ? minPriceElement.value : 0 ;
            let maxPrice = maxPriceElement.value !== "" ? maxPriceElement.value : 50000 ;
            filtredData = filtredData.filter( item => item.price >= minPrice && item.price <= maxPrice);
        }
    }

    if (sortElement.value === "prixA"){
        filtredData = filtredData.sort((a, b) => a.price - b.price);
    }
    else if (sortElement.value === "prixD"){
        filtredData = filtredData.sort((a, b) => b.price - a.price);
    }
    else if (sortElement.value === "nomA"){
        filtredData = filtredData.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
    }
    else if (sortElement.value === "nomD"){
        filtredData = filtredData.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1);
    }

    return filtredData ;
}
const search = () => {
    let result = filterData();
    articles.innerHTML = "" ;
    displayData(result);
    showTotalNumberOfArticlesElement.innerHTML =
        `Showing <span style="font-weight: bold; font-size: 25px;">${result.length}</span> result(s)` ;
}

// Affichage des articles.
displayData(data);

// Affichage des filtres des catégories.
displayCategoriesCheckbox();

let categoriesFilterElements = document.querySelectorAll('.categories:not(#all-categories)');
let categoriesFilterSelectAllCategories = document.getElementById('all-categories');
let priceFiltersElements = document.querySelectorAll('.price');

// Filtres pour les catégories (La cases à cocher est exclu de ce code.
for (let checkbox of categoriesFilterElements) {
    checkbox.onchange = function (){
        if (checkbox.checked){
            filterCategories.push(checkbox.value.toLowerCase());
            filterCategories = filterCategories.filter((item) => item !== categoriesFilterSelectAllCategories.value);
            categoriesFilterSelectAllCategories.checked = false ;
            categoriesFilterSelectAllCategories.disabled = false ;
        }
        else{
            filterCategories = filterCategories.filter((item) => item !== checkbox.value);
            if (filterCategories.length === 0){
                categoriesFilterSelectAllCategories.checked = true ;
                filterCategories.push(categoriesFilterSelectAllCategories.value.toLowerCase());
                categoriesFilterSelectAllCategories.disabled = true ;
            }
        }
        search();
    }
}

// Filtre quand on coche la case à cocher "All catégories".
categoriesFilterSelectAllCategories.disabled = true ;
categoriesFilterSelectAllCategories.onchange = function (){
    if (categoriesFilterSelectAllCategories.checked){
        for (let checkbox of categoriesFilterElements){
            checkbox.checked = false ;
        }
        filterCategories = [] ;
        filterCategories.push(categoriesFilterSelectAllCategories.value.toLowerCase());
        categoriesFilterSelectAllCategories.disabled = true ;
    }
    search();
}

// Filtre pour les radio bouttons
for (const priceRadioButton of priceFiltersElements) {
    priceRadioButton.onchange = function (){
        filterPriceValue = priceRadioButton.value ;
        if (filterPriceValue === "costum"){
            document.getElementById('costumPrice').classList.remove("d-none");
            document.getElementById('costumPrice').classList.add("d-flex");
        }
        else{
            document.getElementById('costumPrice').classList.remove("d-flex");
            document.getElementById('costumPrice').classList.add("d-none");
            minPriceElement.value = "0" ;
            maxPriceElement.value = "50000" ;
        }
        search() ;
    }
}

// Filtre pour la recherche selon le titre (Input).
inputSearchElement.oninput = search ;

// Trie des articles.
sortElement.onchange = search ;

// Filtre pour la recherche selon les prix, quand on clique sur le radio button 'costum'.
minPriceElement.oninput = search ;
maxPriceElement.oninput = search ;