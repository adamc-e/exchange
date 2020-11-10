const getSearchButtonClick = document.getElementById("search-button");
const getInputField = document.getElementById("search-input");
const getCornerDiv = document.getElementById("corner-div");



let sortedData = [];
 

  const urlList = `https://financialmodelingprep.com/api/v3/stock/list?apikey=1f5809045c39cf691a50c9feff3b3a74`;
  fetch(urlList)
  .then(response => response.json())
  .then(data => { 
    const tickerDiv = document.getElementById("ticker-spot");


    for (let i = 0; i < 100; i++) {
      
      sortedData.push(`${data[i].symbol}->`);
      sortedData.push(`${data[i].price.toFixed(2)}`);
      sortedData.push(`,  `);
      
    // Math.random() * 100
      }
      const tickerList = sortedData.join("");
      console.log(tickerList);

      const getTickerArray = document.createTextNode(`${tickerList}`);
      tickerDiv.appendChild(getTickerArray);
      tickerDiv.classList.add("ticker-animation");
    }
      )
    


      // const getSearchUL = document.getElementById(`${targetList}`);
      // let liTextItem = document.createTextNode(`${linkUrl}`);
      // var a = document.createElement('a'); //create new anchor element
      // a.appendChild(liTextItem);
      // a.title = "my title text";
      // a.href = `${linkUrl}`;
      // let newListItem = document.createElement('LI');
      // newListItem.appendChild(a);
      // getSearchUL.appendChild(newListItem);
      // getSearchUL.classList.add(`${putClasses2}`);
      // newListItem.classList.add(`${putClasses1}`);









const findCompanyData = () => {
  let newArray = [];

  const urlExchangeSearch = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${getInputField.value}&limit=10&exchange=NASDAQ`;
  fetch(urlExchangeSearch)
  .then(response => response.json())
  .then(data => { 
      getCornerDiv.classList.add("spinner-grow","spinner-border-sm");  // convert to 
      for (let i = 0; i < data.length; i++) {
        let tempObj = {};
        tempObj.symbol = data[i].symbol;
        sortedData.push(tempObj);
        let symbol = tempObj.symbol;
        const urlProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
        fetch(urlProfile)
        .then(response => response.json())
        .then(data => { 
          
          addLi(data.profile.companyName,symbol,data.profile.image,data.profile.price,data.profile.changesPercentage);
        });







    }
    setTimeout(function() {
      getCornerDiv.classList.remove("spinner-grow","spinner-border-sm");
    }, 800); //Time in milliseconds
  }) 
    .catch(err => console.log('Request Failed', err));
}


// then(data => { 
//   getCornerDiv.classList.add("spinner-grow","spinner-border-sm");  // convert to 
//   for (let i = 0; i < data.length; i++) {
//     let tempObj = {};
//     tempObj.name = data[i].name;
//     tempObj.symbol = data[i].symbol;
//     sortedData.push(tempObj);
//     addLi(tempObj.name,tempObj.symbol);
//     console.log(data);
//   }
//   setTimeout(function() {
//     getCornerDiv.classList.remove("spinner-grow","spinner-border-sm");
//   }, 800); //Time in milliseconds
// }) 
//   .catch(err => console.log('Request Failed', err));
// }
// // 

const addLi = (companyName, symbol, image, price, priceChanges) => { 
  const getSearchUL = document.getElementById("search-list"); //defined here as well to keep my code complete for further use
  getSearchUL.classList.add("list-group"); // adding the bootstrap class to UL
  var img = document.createElement('img');
  img.src = `${image}`;
  let newListItem = document.createElement('LI');
  newListItem.appendChild(img);
  var a = document.createElement('a'); //create new anchor element
  let liTextItem = document.createTextNode(` ${companyName},${symbol}`);
  a.appendChild(liTextItem);
  a.title = "my title text";
  a.href = `./company.html?symbol=${symbol}`;
  newListItem.appendChild(a);
  getSearchUL.appendChild(newListItem);
  let liTextItem2 = document.createTextNode(`     ${price},${priceChanges}`);
  newListItem.appendChild(liTextItem2);
  newListItem.classList.add("list-group-item"); //adding the li bootstrap class style
}
// const addLi = (companyName, symbol, image, website, price, priceChanges) => { 
//   const getSearchUL = document.getElementById("search-list"); //defined here as well to keep my code complete for further use
//   getSearchUL.classList.add("list-group"); // adding the bootstrap class to UL
//   let newListItem = document.createElement('LI');
//   var a = document.createElement('a'); //create new anchor element
//   let liTextItem = document.createTextNode(`${companyName},${symbol}`);
//   a.appendChild(liTextItem);
//   a.title = "my title text";
//   a.href = `./company.html?symbol=${symbol}`;
//   newListItem.appendChild(a);
//   getSearchUL.appendChild(newListItem);
//   newListItem.classList.add("list-group-item"); //adding the li bootstrap class style
// }








getSearchButtonClick.addEventListener("click", findCompanyData);
