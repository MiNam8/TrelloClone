import { RouteObject } from 'react-router'
import Boards from '../pages/Boards'
import Layout from '../layout'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Boards />,
            },
        ],
    },
]

export default routes
