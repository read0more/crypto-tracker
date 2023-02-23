import { rest } from 'msw';
import fakeList from '@/testDoubles/fakes/fakeList.json';

export default [
  rest.get('https://api.coinpaprika.com/v1/coins', (_, res, ctx) =>
    res(ctx.json(fakeList))
  ),
];
