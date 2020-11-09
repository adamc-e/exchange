const getSearchButtonClick = document.getElementById("search-button");
const getInputField = document.getElementById("search-input");
const getCornerDiv = document.getElementById("corner-div");

let sortedData = [];

const findCompanyData = () => {
  let newArray = [];

  const urlExchangeSearch = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${getInputField.value}&limit=10&exchange=NASDAQ`;
  fetch(urlExchangeSearch)
  .then(response => response.json())
  .then(data => { 
    getCornerDiv.classList.add("spinner-grow","spinner-border-sm");  // convert to 
    for (let i = 0; i < data.length; i++) {
      let tempObj = {};
      tempObj.name = data[i].name;
      tempObj.symbol = data[i].symbol;
      sortedData.push(tempObj);
      addLi(tempObj.name,tempObj.symbol);
    }
    setTimeout(function() {
      getCornerDiv.classList.remove("spinner-grow","spinner-border-sm");
    }, 800); //Time in milliseconds
  }) 
    .catch(err => console.log('Request Failed', err));
}

const addLi = (company,ticker) => { 
  const getSearchUL = document.getElementById("search-list"); //defined here as well to keep my code complete for further use
  getSearchUL.classList.add("list-group"); // adding the bootstrap class to UL
  let newListItem = document.createElement('LI');
  var a = document.createElement('a'); //create new anchor element
  let liTextItem = document.createTextNode(`${company},${ticker}`);
  a.appendChild(liTextItem);
  a.title = "my title text";
  a.href = "/company.html?symbol=${ticker}";
  newListItem.appendChild(a);
  getSearchUL.appendChild(newListItem);
  newListItem.classList.add("list-group-item"); //adding the li bootstrap class style
}





getSearchButtonClick.addEventListener("click", findCompanyData);
console.log(sortedData);