// here you receive the list of all the companies and render the images etc..



class SearchResult {
    constructor (results) {  
        this.results = results;
        this.createInput = document.getElementById('input-tag');
        let newArray = [];
          
            this.listArray = [];

        };
    
    


    // renderFetch() {
    //         const getSearchButtonClick = document.getElementById("search-button");
    //         getSearchButtonClick.addEventListener("click", () => { 
    //             const urlExchangeSearch = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.createInput.value}&limit=10&exchange=NASDAQ&apikey=1f5809045c39cf691a50c9feff3b3a74`;
    //             fetch(urlExchangeSearch)
    //             .then(response => response.json())
    //             .then(data => this.renderResults(data));    
    //         });
    // }

    async renderResults(data) {
        console.log('data', data)
        let sortedData = [];
        for (let i = 0; i < data.length; i++) {
            let tempObj = {};
            tempObj.symbol = data[i].symbol;
            sortedData.push(tempObj);
            let symbol = tempObj.symbol;
            const urlProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
            fetch(urlProfile)
            .then(response => response.json())
            .then(data => { 
            console.log("renderResults is working");
            console.log(data,"workingNow");
            this.fullRender(data.profile.companyName,symbol,data.profile.image,data.profile.price,data.profile.changesPercentage);
            });
        }
    }




        //     getCornerDiv.classList.add("spinner-grow","spinner-border-sm");  // convert to 
        //     for (let i = 0; i < data.length; i++) {
        //         let tempObj = {};
        //         tempObj.symbol = data[i].symbol;
        //         sortedData.push(tempObj);
        //         let symbol = tempObj.symbol;
        //         const urlProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
        //         fetch(urlProfile)
        //         .then(response => response.json())
        //         .then(data => { 
        //         this.renderResults(data.profile.companyName,symbol,data.profile.image,data.profile.price,data.profile.changesPercentage);
        //         });
    
        //     }
        //     setTimeout(function() {
        //     getCornerDiv.classList.remove("spinner-grow","spinner-border-sm");
        //     }, 800); //Time in milliseconds
    //     }

    fullRender (companyName, symbol, image, price, priceChanges) { 
    const getSearchUL = document.getElementById("results-ul"); //defined here as well to keep my code complete for further use
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
}

    // renderResults(companies) { 
        // const urlExchangeSearch = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.form.value}&limit=10&exchange=NASDAQ&apikey=1f5809045c39cf691a50c9feff3b3a74`;
        // fetch(urlExchangeSearch)
        // .then(response => response.json())
        // .then(companies => companies)

    

    //     const getCornerDiv = document.getElementById("corner-div");
    //     console.log(data);
    //    
