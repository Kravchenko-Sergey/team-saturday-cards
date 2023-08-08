import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from 'components/ui/layout'
import { Cards } from 'pages/cards'
import { Decks } from 'pages/decks'
import { ErrorPage } from 'pages/error-page'

const publicRoutes: RouteObject[] = [
  {
    path: '/sign-in',
    element: <div>login</div>,
  },
  {
    path: '/sign-up',
    element: <div>register</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/decks',
    element: <Decks />,
  },
  {
    path: '/:id/cards',
    element: <Cards />,
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
    ],
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
