// here you receive the list of all the companies and render the images etc..
class SearchResult {
    constructor(results) {
        this.results = results;
        this.createInput = document.getElementById("input-tag");
        let newArray = [];
        this.listArray = [];
    }

    async renderResults(data) {
        let sortedData = [];
        for (let i = 0; i < data.length; i++) {
            let tempObj = {};
            tempObj.symbol = data[i].symbol;
            sortedData.push(tempObj);
            let symbol = tempObj.symbol;
            const urlProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
            fetch(urlProfile)
                .then((response) => response.json())
                .then((data) => {
                    this.fullRender(
                        data.profile.companyName,
                        symbol,
                        data.profile.image,
                        data.profile.price,
                        data.profile.changesPercentage
                    );
                });
               
        }
    }

    fullRender(companyName, symbol, image, price, priceChanges) {
        const getSearchUL = document.getElementById("results-ul"); //defined here as well to keep my code complete for further use
        getSearchUL.classList.add("list-group"); // adding the bootstrap class to UL
        var img = document.createElement("img");
        img.src = `${image}`;
        let newListItem = document.createElement("LI");
        newListItem.appendChild(img);
        let a = document.createElement("a"); //create new anchor element
        let inputValue = this.createInput.value;
        let liTextItem = document.createTextNode( `${companyName} (${symbol})`);
        a.appendChild(liTextItem);
        a.title = "my title text";
        a.href = `./company.html?symbol=${symbol}`;
        newListItem.appendChild(a);
        getSearchUL.appendChild(newListItem);
        let liTextItem2 = document.createTextNode(
            `     ${price},${priceChanges}`
        );
        newListItem.appendChild(liTextItem2);
        newListItem.classList.add("list-group-item"); //adding the li bootstrap class style
    }

}      