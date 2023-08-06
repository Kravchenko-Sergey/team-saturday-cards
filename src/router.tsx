import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from 'components/ui/layout'
import { Decks } from 'pages/decks'

const publicRoutes: RouteObject[] = [
  {
    path: 'sign-in',
    element: <div>login</div>,
  },
  {
    path: 'sign-up',
    element: <div>register</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/decks',
    element: <Decks />,
  },
  {
    path: '/cards',
    element: <div>cards</div>,
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
