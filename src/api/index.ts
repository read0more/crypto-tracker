const API_URL = 'https://api.coinpaprika.com/v1';

export const getCoinList = () =>
  fetch(`${API_URL}/coins`).then((res) => res.json());

export const getCoinDetail = (coinId: string) =>
  fetch(`${API_URL}/coins/${coinId}`).then((res) => res.json());

export const getCoinPrice = (coinId: string) =>
  fetch(`${API_URL}/tickers/${coinId}`).then((res) => res.json());

export const getCoinDetailPrice = (coinId: string) =>
  fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then(
    (res) => res.json()
  );
