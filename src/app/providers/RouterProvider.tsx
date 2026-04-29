import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BookListPage, BookDetailPage, BookRegistrationPage } from '../../pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BookListPage />,
  },
  {
    path: '/books/:id',
    element: <BookDetailPage />,
  },
  {
    path: '/books/register',
    element: <BookRegistrationPage />,
  },
])

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />
}
