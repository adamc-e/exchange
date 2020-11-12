class Marquee {  
    constructor (divElementID) {
    this.sortedData = [];
    const urlList = `https://financialmodelingprep.com/api/v3/stock/list?apikey=1f5809045c39cf691a50c9feff3b3a74`;
    fetch(urlList)
    .then(response => response.json())
    .then(data => { 
        this.tickerDiv = document.getElementById(`${divElementID}`);


        for (let i = 0; i < 100; i++) {
      
        this.sortedData.push(`${data[i].symbol}->`);
        this.sortedData.push(`${data[i].price.toFixed(2)}`);
        this.sortedData.push(`,  `);
          }
        this.tickerList = this.sortedData.join("");
        this.getTickerArray = document.createTextNode(`${this.tickerList}`);
        this.tickerDiv.appendChild(this.getTickerArray);
        this.tickerDiv.classList.add("ticker-animation");
        }
        )
    }
}


// function () {  
//     let sortedData = [];
//     const urlList = `https://financialmodelingprep.com/api/v3/stock/list?apikey=1f5809045c39cf691a50c9feff3b3a74`;
//     fetch(urlList)
//     .then(response => response.json())
//     .then(data => { 
//         const tickerDiv = document.getElementById("ticker-spot");


//         for (let i = 0; i < 100; i++) {
      
//         sortedData.push(`${data[i].symbol}->`);
//         sortedData.push(`${data[i].price.toFixed(2)}`);
//         sortedData.push(`,  `);
//           }
//           const tickerList = sortedData.join("");
//         console.log(tickerList);

//         const getTickerArray = document.createTextNode(`${tickerList}`);
//         tickerDiv.appendChild(getTickerArray);
//         tickerDiv.classList.add("ticker-animation");
//         }
//         )
//     }


