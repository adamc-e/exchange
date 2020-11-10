
// After that, you should fetch the history of stock price of the company, using the following endpoint: https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line

// Use Chart.js | Open source HTML5 Charts for your website to present this data in a chart (read the documentation, understand how to use it, and how to pass the data from the stock price history endpoint)
// Show loading indicator, when loading company data and stock price history.


const symbol = getUrlParameter('symbol'); // "1234"
const getSideDiv = document.getElementById('spinner'); // "1234"
getSideDiv.classList.add("spinner-grow","spinner-border-sm");

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};



async function fetchCompanyData() {
    const urlProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
    const response = await fetch(urlProfile);
    const data = await response.json();
    return data;
  }
  
  fetchCompanyData().then(data => {
    addLiCompany(data.profile.companyName,data.symbol,data.profile.image,data.profile.industry,data.profile.sector,data.profile.website,data.profile.description,data.profile.mktCap,data.profile.price,data.profile.changesPercentage);
  });


  const addLiCompany = (companyName, symbol, image, industry, sector, website, description, mktCap, price,changesPercentage) => { 
    const targetListRight = "company-list-right";
    const targetListLeft = "company-list-left";
    const targetListBottom = "company-list-bottom";
    const targetDiv = "target-div";

    addLiTextItems(companyName,targetListLeft);
    addLiTextItems(`Industry:${industry}`,targetListLeft);
    addLiTextItems(`Sector:${sector})`,targetListLeft);
    addLiLinkItem(`${website}`,targetListLeft);
    addLiTextItems(`${description}`,targetListBottom);

    addLiTextItems(`Ticker(${symbol})`,targetListRight);
    addLiTextItems(`Stock Price(${price})`,targetListRight);
    let changesNumber = Number(changesPercentage.slice(1,6));
  

    if (Number(changesNumber)<0) { addLiTextItems(`changes%(${changesPercentage})`,targetListRight,"text-danger");}
    else {addLiTextItems(`changes%(${changesPercentage})`,targetListRight,"text-success");} 

    addLiTextItems(`mktCap(${changesPercentage})`,targetListRight);
    
 
    addDivLinkImage(`${image}`,targetDiv)
  }
//fix putClass1 to allow application of a class to UL and then a LI item;
  const addLiTextItems = (TextItem,targetList,putClasses1,putClasses2) => { 
    const getSearchUL = document.getElementById(`${targetList}`);
    let liTextItem = document.createTextNode(`${TextItem}`);
    let newListItem = document.createElement('LI');
    newListItem.appendChild(liTextItem);
    getSearchUL.appendChild(newListItem);
    getSearchUL.classList.add(`${putClasses2}`);
    newListItem.classList.add(`${putClasses1}`);
}

const addLiLinkItem = (linkUrl,targetList,putClasses1,putClasses2) => { 
    const getSearchUL = document.getElementById(`${targetList}`);
    let liTextItem = document.createTextNode(`${linkUrl}`);
    var a = document.createElement('a'); //create new anchor element
    a.appendChild(liTextItem);
    a.title = "my title text";
    a.href = `${linkUrl}`;
    let newListItem = document.createElement('LI');
    newListItem.appendChild(a);
    getSearchUL.appendChild(newListItem);
    getSearchUL.classList.add(`${putClasses2}`);
    newListItem.classList.add(`${putClasses1}`);
}

const addDivLinkImage =  (image,targetDiv,putClasses1) => { 
    const getSearchDiv = document.getElementById(`${targetDiv}`);
    var img = document.createElement('img'); //create new anchor element
    img.src = `${image}`;
    getSearchDiv.appendChild(img);
    getSearchDiv.classList.add(`${putClasses1}`);
}


//bar chart

async function fetchChartData() {
  const urlChart = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
  const response = await fetch(urlChart);
  const data = await response.json();
  return data;
}

fetchChartData().then(data => {
  let rangeOfData = 100;
  let getDates = [];
  let getValues = [];
for (let i=0;i<rangeOfData; i++) {

  getDates[i] = data.historical[i].date;
  getValues[i] = data.historical[i].close.toFixed(2);

}


showChart(getDates,getValues);
setTimeout(function() {
  getSideDiv.classList.remove("spinner-grow","spinner-border-sm");
}, 1500);
});

fetchChartData();


function showChart(labelsArray, valuesArray ) {
  let myChart = document.getElementById('myChart').getContext('2d');
console.log(labelsArray);
console.log(valuesArray);
  // Global Options
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = '#777';

  let massPopChart = new Chart(myChart, {
    type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
      labels:labelsArray,
      datasets:[{
        label:'Price',
        data: valuesArray,
       
        backgroundColor:[
          'rgba(255, 99, 132, 0.6)',

        ],
        borderWidth:1,
        borderColor:'#777',
        hoverBorderWidth:3,
        hoverBorderColor:'#000'
      }]
    },
    options:{
      title:{
        display:true,
        text:'Price History',
        fontSize:25
      },
      legend:{
        display:true,
        position:'right',
        labels:{
          fontColor:'#000'
        }
      },
      layout:{
        padding:{
          left:50,
          right:0,
          bottom:0,
          top:0
        }
      },
      tooltips:{
        enabled:true
      }
    }
  });
}
