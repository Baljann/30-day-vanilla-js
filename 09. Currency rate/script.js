async function getCurrencies() {
  const url = "https://www.cbr-xml-daily.ru/daily_json.js";
  const response = await fetch(url);
  const data = await response.json();

  const usdRate = data.Valute.USD.Value.toFixed(2);
  const eurRate = data.Valute.EUR.Value.toFixed(2);

  const usdElement = document.querySelector("#usd");
  const eurElement = document.querySelector("#eur");

  usdElement.innerText = usdRate;
  eurElement.innerText = eurRate;
}

getCurrencies();
