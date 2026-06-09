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
        document.getElementById('company-founder-img').src = company.founder;
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
      document.querySelectorAll('.news').forEach((_, index) => {
        let dateString = new Date(data[index].datetime * 1000).toLocaleString();
        if (index < 4) {
          document.getElementById(`news-${index + 1}-headline`).textContent = data[index].headline;
          document.getElementById(`news-${index + 1}-datetime`).textContent = dateString;
          document.getElementById(`news-${index + 1}-image`).src = data[index].image;
          document.getElementById(`news-${index + 1}-summary`).textContent = data[index].summary;
          document.getElementById(`news-${index + 1}-source`).textContent = "Source: " + data[index].source;
          document.getElementById(`news-${index + 1}-url`).href = data[index].url;
        }
      });
    });
}

getMarketNews();