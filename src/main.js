import axios from 'axios';

const list = document.querySelector(".list");
const formSearch = document.querySelector(".form-search");
const error = document.querySelector(".error");
const selected = document.querySelector("#selected")
error.style.display = "none";
let keywords;
let selectedForm;
let keyword;
let key;
let categories;

formSearch.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

   const { search } = event.currentTarget.elements;
   key = {
    keywords: search.value,
   }
   localStorage.setItem("SaveFilters", JSON.stringify(key.keywords) || null);
//    localStorage.setItem("savetext", key.keywords);
//    console.log(searchForm)
   productsRender()
}

// formSearch.elements.search.value = localStorage.getItem("savetext");

productsRender()

selected.addEventListener("change", handleChange);

function handleChange(event) {
   const selecteds = event.target.value;
   selectedForm = selecteds;
    console.log(selected.value)
    categories = {
        selectedForm: selecteds,
    }
   localStorage.setItem("SaveCategpries", JSON.stringify(categories.selectedForm) || null);
//    localStorage.setItem("saveselected", categories.selectedForm);
//    console.log(categories.selectedForm)
    productsRender()
}

// formSearch.elements.selecteds.value = localStorage.getItem("saveselected");

async function productsRender() {
    try {
        const data = await productsApi();
        // const res = await categoriesApi();
        // console.log(data.results)
        if (data.results.length === 0) {
            error.style.display = "block"
        } else {
            error.style.display = "none"
        }
        // console.log(data.results)
        // list.innerHTML = createmarkup(data.results);
        return list.innerHTML = createmarkup(data.results);
    } catch (error) {
        console.log(error);
    }
}

async function productsApi(page = 1, limit = 6) {
    keyword = keywords || null;
    let category = selectedForm || null;
    // const params =new URLSearchParams({
    //     // keyword: searchForm,
    //     keyword,
    //     category,
    //     page: 1,
    // }) 
    const BASE_URL = `https://food-boutique.b.goit.study/api/products`;
    // const SRC = `keyword=`
    try {
    const data = await axios(`${BASE_URL}?`, {
        params: {
            keyword: JSON.parse(localStorage.getItem("SaveFilters")),
            category: JSON.parse(localStorage.getItem("SaveCategpries")),
            page: 1,
            limit: 6,
        }
    });
    // let filterSave = {
    //     keyword, 
    //     category, 
    //     page, 
    //     limit,
    // }
    // console.log(category)
    // console.log(data)
    // console.log(data.data)
    return data.data;
    } catch (error) {
        console.log(error)
    }
};

async function categoriesRender() {
    try {
        const data = await categoriesApi();
        const category = data.map((data) => {
            return `<option value="${data}">${data}</option>`;
        }).join("");
        // console.log(category);
        selected.insertAdjacentHTML("beforeend", category)
        // return list.innerHTML = createmarkup(data.results);
    } catch (error) {
        console.log(error);
    }
}

categoriesRender()


async function categoriesApi(page = 1) {
    const category = null;
    try {
    const data = await axios(`https://food-boutique.b.goit.study/api/products/categories`, {
        params: {
            category: selectedForm,
        }
    });
    // console.log(data.data)
    return data.data;
    } catch (error) {
        console.log(error)
    }
};

categoriesApi()

function createmarkup(arr) {
    return arr.map(({name, img, category, price}) => {
      return  `
        <ul class="list-product">
        <li class="item-product">
        <img class="img-product" src="${img}" width="400" height="200">
        <h2 class="caption-product">${name}</h2>
        <h3>${category}</h3>
        <p class="price-product">Price:${price}</p>
        </li>
        </ul>
        `
    }).join("");
}

// productsApi()