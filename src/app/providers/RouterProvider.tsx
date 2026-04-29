import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BookListPage } from '../../pages/BookList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BookListPage />,
  },
]);

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};
