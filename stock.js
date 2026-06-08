const api_key = "d8h7pdhr01qhjpmqvhm0d8h7pdhr01qhjpmqvhmg";

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
}

stockSelect.addEventListener('change', function () {
  const selectedStockDiv = document.querySelectorAll('.stock-div');

  const choosenStock = this.value;
  if (choosenStock.value === 0) {
    document.getElementById('stock-display').textContent = "Válassz egy részvényt...";
  }
    /*const selectedDiv = document.getElementById(choosenStock);
    if (selectedDiv) {
      selectedDiv.classList.remove('hidden');
      selectedDiv.classList.add('visible');
    }*/
  getStockPrice(choosenStock);
});