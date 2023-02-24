import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Detail from '@/pages/Detail';
import Home from '@/pages/Home';

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
            path: 'price',
            element: <div>price</div>,
          },
          {
            path: 'chart',
            element: <div>chart</div>,
          },
        ],
      },
    ],
    // path: '/',
    // element: <Home />,
    // children: [
    //   {
    //     path: '/',
    //     element: <Home />,
    //   },
    //   {
    //     path: 'about',
    //     element: <About />,
    //   },
    //   {
    //     path: 'user/:id',
    //     element: <User />,
    //     children: [
    //       {
    //         path: 'follower',
    //         element: <Follower />,
    //       },
    //       {
    //         path: 'following',
    //         element: <Following />,
    //       },
    //     ],
    //   },
    // ],
    errorElement: <div>404</div>,
  },
]);
