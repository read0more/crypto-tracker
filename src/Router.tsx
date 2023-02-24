import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';
import PriceTab from './components/PriceTab';
import ChartTab from './components/ChartTab';

export default createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:id',
        element: <Detail />,
        children: [
          {
            path: 'chart',
            element: <ChartTab />,
          },
          {
            path: 'price',
            element: <PriceTab />,
          },
        ],
      },
    ],
    errorElement: <div>404</div>,
  },
]);
