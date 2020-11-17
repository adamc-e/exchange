// here you build the search form and do the fetch the results for all the companies.

class SearchForm {
constructor () {
this.buildForm()
this.getSearchButton();
this.functionHere;
this.something;
}

buildForm () { 
let getForm = document.getElementById('form');


let createDivButton = document.createElement("div");
createDivButton.classList.add('input-group', 'mb-3');

let createDivButtonSub = document.createElement("div");
createDivButtonSub.classList.add("input-group-prepend");

let createButton = document.createElement("button");
createButton.classList.add("btn","btn-outline-secondary");
createButton.innerHTML = "SEARCH";
createDivButtonSub.appendChild(createButton);
createButton.setAttribute("id", "search-button");


this.createInput = document.createElement("input");
this.createInput.classList.add("form-control");
createDivButtonSub.appendChild(this.createInput);
this.createInput.setAttribute("placeholder", "Search by symbol or company name...");
this.createInput.setAttribute("id", "input-tag");

createDivButton.appendChild(createDivButtonSub);
getForm.appendChild(createDivButtonSub);

let resultsDiv = document.createElement("div");
resultsDiv.setAttribute("id", "results-div");
getForm.appendChild(resultsDiv);

let resultsUL = document.createElement("ul");
resultsUL.setAttribute("id", "results-ul");
resultsUL.innerHTML = ``;
resultsDiv.appendChild(resultsUL);

}

// /

fetchURL() { 
    console.log(2)
    const urlExchangeSearch = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.createInput.value}&limit=10&exchange=NASDAQ&apikey=1f5809045c39cf691a50c9feff3b3a74`;
    fetch(urlExchangeSearch)
    .then(response => response.json())
    .then(data => this.functionHere(data));    
    }

    

getSearchButton () {
    console.log(1)
    const getSearchButtonClick = document.getElementById("search-button");
    getSearchButtonClick.addEventListener("click", () => { 
        console.log(3)
    this.fetchURL(); 
    })
}

onSearch (callback) {
this.functionHere = callback;
console.log('this.functionHere', this.functionHere)
}
}
