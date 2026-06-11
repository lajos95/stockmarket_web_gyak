const api_key = "d8h7pdhr01qhjpmqvhm0d8h7pdhr01qhjpmqvhmg";

let stockDisplay = document.getElementById('stock-display');
let stockName = document.getElementById('stock-name');
let stockPrice = document.getElementById('stock-price');
let stockChange = document.getElementById('stock-change');
let stockChangePercent = document.getElementById('stock-change-percent');
let stockPreviousClose = document.getElementById('stock-previous-close');
let stockSelect = document.getElementById('stock-select');
let companyTrends = document.getElementById('company-trends');

let myChart = null;

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
        document.getElementById('company-history').textContent = company.history;
        document.getElementById('company-founder-img').src = company.founder;
        document.getElementById('company-founder-img-2').src = company[founder-2];
        document.getElementById('company-founder-name').textContent = `Founder: ${company['founder-name-1']}`;
        document.getElementById('company-founder-name-2').textContent = `Founder: ${company['founder-name-2']}`;
        document.getElementById('company-founder-name').href = company['founder-url'];
        document.getElementById('company-founder-name-2').href = company['founder-2-url'];
      }
    })
    .catch(error => {
      console.error('Error fetching company details:', error);
    });
};

function getStockNews(ticker) {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 4);
  const fromDate = oneMonthAgo.toISOString().split('T')[0];
  const toDate = today.toISOString().split('T')[0];

  fetch(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${fromDate}&to=${toDate}&token=${api_key}`)
    .then(response => response.json())
    .then(data => {
      if (!data || data.length === 0) {
        document.querySelectorAll('.company-news').forEach((companycards) => {
          companycards.style.opacity = "0.5";
        });
        return;
      }

      document.querySelectorAll('.company-news').forEach((_, index) => {
        let dateString = new Date(data[index].datetime * 1000).toLocaleString();
        if (index < 4 && data[index]) {
          document.getElementById(`company-${index + 1}-headline`).textContent = data[index].headline;
          document.getElementById(`company-${index + 1}-datetime`).textContent = dateString;
          document.getElementById(`company-${index + 1}-image`).src = data[index].image;
          document.getElementById(`company-${index + 1}-summary`).textContent = data[index].summary;
          document.getElementById(`company-${index + 1}-source`).textContent = "Source: " + data[index].source;
          document.getElementById(`company-${index + 1}-url`).href = data[index].url;
          document.querySelectorAll('.company-news')[index].style.opacity = "1";
        }
      });
    });
}

stockSelect.addEventListener('change', function () {
  const choosenStock = this.value;
  if (choosenStock) {
    getStockPrice(choosenStock);
    getCompanyDetails(choosenStock);
    recommendTrends(choosenStock);
    getStockNews(choosenStock);
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

function recommendTrends(ticker) {
  fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${ticker}&token=${api_key}`)
    .then(response => response.json())
    .then(data => {
      let reversedData = data.slice(0, 4).reverse();
      if (myChart) {
        myChart.destroy();
      }
      myChart = new Chart(document.getElementById('stock-chart'), {
        type: 'bar',
        data: {
          labels: reversedData.map(item => item.period),
          datasets: [
            { backgroundColor: 'rgba(153, 102, 255, 0.5)', label: 'Strong Sell', data: reversedData.map(item => item.strongSell) },
            { backgroundColor: 'rgba(255, 99, 132, 0.5)', label: 'Sell', data: reversedData.map(item => item.sell) },
            { backgroundColor: 'rgba(255, 206, 86, 0.5)', label: 'Hold', data: reversedData.map(item => item.hold) },
            { backgroundColor: 'rgba(54, 162, 235, 0.5)', label: 'Buy', data: reversedData.map(item => item.buy) },
            { backgroundColor: 'rgba(75, 192, 192, 0.5)', label: 'Strong Buy', data: reversedData.map(item => item.strongBuy) },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            }
          }
        }
      });
      document.getElementById('company-trends').textContent = `Analysts Recommendations for ${ticker} stock`;

    });
}

getMarketNews();
getStockPrice(stockSelect.value);
getStockNews(stockSelect.value);
getCompanyDetails(stockSelect.value);
recommendTrends(stockSelect.value);