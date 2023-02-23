import { rest } from 'msw';
import fakeList from '@/testDoubles/fakes/fakeList.json';

export default [
  rest.get('https://API주소', (_, res, ctx) => res(ctx.json(fakeList))),
];
