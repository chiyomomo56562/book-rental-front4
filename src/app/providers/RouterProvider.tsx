import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BookListPage, BookDetailPage } from '../../pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BookListPage />,
  },
  {
    path: '/books/:id',
    element: <BookDetailPage />,
  },
])

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />
}
