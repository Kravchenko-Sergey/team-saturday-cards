import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { useMeQuery } from '@/services/auth/auth.api.ts'
import { Layout } from 'components/ui/layout'
import { Cards } from 'pages/cards'
import { Decks } from 'pages/decks'
import { ErrorPage } from 'pages/error-page'
import { Learn } from 'pages/learn/learn.tsx'
import { Profile } from 'pages/profile/profile.tsx'
import { SignInPage } from 'pages/sign-in-page/sign-in-page.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <div>register</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/cards/:id',
    element: <Cards />,
  },
  {
    path: '/learn/:id',
    element: <Learn />,
  },
  {
    path: '/profile',
    element: <Profile />,
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
  const { data, isLoading } = useMeQuery()

  if (isLoading) return <div>Loading...</div>

  const isAuthenticated = !!data

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />
}
