const api_key = "d8h7pdhr01qhjpmqvhm0d8h7pdhr01qhjpmqvhmg";
const symbol = "AAPL";
const symbol2 = "MSFT";

const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${api_key}`;
const url2 = `https://finnhub.io/api/v1/quote?symbol=${symbol2}&token=${api_key}`;

let stockChange = document.getElementById('stock-select');

async function getStockPrice() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    let actualPrice = data.c;
    let previousClose = data.pc;
    let priceChange = actualPrice - previousClose;
    let priceChangePercent = (priceChange / previousClose) * 100;
    let highPrice = data.h;
    let lowPrice = data.l;
    console.log(`Current price of ${symbol}: $${data.c}`);
    console.log(`Price change: $${priceChange.toFixed(2)} (${priceChangePercent.toFixed(2)}%)`);
    console.log(`High price of the day: $${highPrice}`);
    console.log(`Low price of the day: $${lowPrice}`);
    const applePriceElement = document.getElementById('apple-price');
    const applePriceChangeElement = document.getElementById('apple-price-change');
    const applePriceChangePercentElement = document.getElementById('apple-price-change-percent');
    const applePreviousCloseElement = document.getElementById('apple-previous-close');

    /*if (applePriceElement) {
      applePriceElement.textContent = actualPrice;
    }
    if (applePriceChangeElement) {
      applePriceChangeElement.textContent = priceChange.toFixed(2);
    }
    if (applePriceChangePercentElement) {
      applePriceChangePercentElement.textContent = priceChangePercent.toFixed(2);
    }
    if (applePreviousCloseElement) {
      applePreviousCloseElement.textContent = previousClose;
    }*/
  } catch (error) {
    console.error('Error fetching stock price:', error);
  }
}

stockChange.addEventListener('change', function() {
  const selectedStock = stockChange.value;
    if (selectedStock === "1") {
      getStockPrice();
    } else {
      // Handle other stock selections if needed
    }
});






  getStockPrice();

/*import { ApiClient, DefaultApi } from 'finnhub';

const api_key = ApiClient.instance.authentications['api_key'];
api_key.apiKey = "d8h7pdhr01qhjpmqvhm0d8h7pdhr01qhjpmqvhmg"
const finnhubClient = new DefaultApi()

finnhubClient.quote("AAPL", (error, data, response) => {
  console.log(data)
});*/