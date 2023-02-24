export const getCoinList = () =>
  fetch('https://api.coinpaprika.com/v1/coins').then((res) => res.json());

export const getCoinDetail = (coinId: string) =>
  fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) =>
    res.json()
  );

export const getCoinPrice = (coinId: string) =>
  fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );
