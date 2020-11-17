class Marquee {  
    constructor (documentElement) {
      this.sortedData = [];
      this.documentElement = documentElement;
      
    }
    load () { 
      const urlList = `https://financialmodelingprep.com/api/v3/stock/list?apikey=1f5809045c39cf691a50c9feff3b3a74`;
      fetch(urlList)
      .then(response => response.json())
      .then(data => {   
          this.divHolder = document.createElement("div");
          this.divHolder.classList.add("marquee");
          this.documentElement.appendChild(this.divHolder);
          this.documentElement.classList.add("marquee");

          for (let i = 0; i < 1000; i++) {
          this.newSpan = document.createElement("span");
          this.newSpan.classList.add("marquee");
          this.getTickerData = document.createTextNode(`  ${data[i].symbol}: ${data[i].price.toFixed(2)}    `);
          
          
          
          this.newSpan.appendChild(this.getTickerData);
          this.divHolder.appendChild(this.newSpan);
        }
        //     async newHighlighting(search,company,ticker) { 
        //     const myRegEx = new RegExp(search, "ig");
        //     let line = `${company} (${ticker})`;
        //     let newLine = line.replace(myRegEx, (string) => {
        //     let finalProduct = "<mark>" + string + "</mark>";
        //     return finalProduct;
        //   });} WAS NOT ABLE TO GET MT
    
    
    
    
          }
          )
      
    }
  }


