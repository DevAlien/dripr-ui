import App from './components/pages/App'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import List from './components/pages/List'
import File from './components/pages/File'
import NotFound from './components/pages/NotFound'
import Downloads from './components/pages/Downloads'
export default function getRoutes(store) {
  return {
    component: App,
    childRoutes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/logout',
        component: Home,
        onEnter: Home.onEnterLogout(store)
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/downloads',
        component: Downloads
      },
      {
        path: '/list',
        component: List,
        onEnter: List.onEnter(store)
      },
      {
        path: '/file/:id',
        name: 'dhd',
        component: File,
        onEnter: File.onEnter(store)
      },
      {
        path: '*',
        component: NotFound
      }
    ],
    onEnter: App.onEnter(store)
  }
}
