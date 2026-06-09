const api_key = "d8h7pdhr01qhjpmqvhm0d8h7pdhr01qhjpmqvhmg";

let stockDisplay = document.getElementById('stock-display');
let stockName = document.getElementById('stock-name');
let stockPrice = document.getElementById('stock-price');
let stockChange = document.getElementById('stock-change');
let stockChangePercent = document.getElementById('stock-change-percent');
let stockPreviousClose = document.getElementById('stock-previous-close');
let stockSelect = document.getElementById('stock-select');

async function getStockPrice(ticker) {
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    stockName.textContent = `Stock: ${ticker}`;
    stockPrice.textContent = `Current Price: $${data.c}`;
    stockChange.textContent = `Price Change: $${data.d}`;
    stockChangePercent.textContent = `Price Change Percentage: ${data.dp}%`;
    stockPreviousClose.textContent = `Previous Close: $${data.pc}`;
  } catch (error) {
    console.error('Error fetching stock price:', error);
  }
};

function getCompanyDetails(ticker) {
  fetch('companies.json')
    .then(response => response.json())
    .then(data => {
      const company = data[ticker];
      if (company) {
        document.getElementById('company-name').textContent = company.name;
        document.getElementById('company-founded').textContent = `Founded: ${company.founded}`;
        document.getElementById('company-desc').textContent = company.description;
      }
    })
    .catch(error => {
      console.error('Error fetching company details:', error);
    });
};

stockSelect.addEventListener('change', function () {
  const choosenStock = this.value;
  if (choosenStock) {
    getStockPrice(choosenStock);
    getCompanyDetails(choosenStock);
    stockDisplay.classList.remove('hidden');
  } else {
    stockName.textContent = "";
    stockPrice.textContent = "";
    stockChange.textContent = "";
    stockChangePercent.textContent = "";
    stockPreviousClose.textContent = "";
    stockDisplay.classList.add('hidden');
  }
});

function getMarketNews() {
  fetch('https://finnhub.io/api/v1/news?category=general&token=' + api_key)
    .then(response => response.json())
    .then(data => {
      document.querySelectorAll('.news').forEach((newsElement, index) => {
        if (index < 4) {
          newsElement.querySelector('h4').textContent = data[index].headline;
          newsElement.querySelector('h6').textContent = data[index].datetime;
          newsElement.querySelector('img').src = data[index].image;
          newsElement.querySelector('p').textContent = data[index].summary;
          newsElement.querySelector('p:nth-of-type(1)').textContent = "Source: " + data[index].source;
          newsElement.querySelector('a').href = data[index].url;
        }
      });
    });
}

getMarketNews();