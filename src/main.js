// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// Importado o ElementUI que trabalha com o design da página
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/pt-br' // para deixar no padrão pt-br

// import ComponenteBase1 from '../ComponenteBase1.vue'
// import ComponenteA1 from '../ComponenteA1.vue'
// import ComponenteB1 from '../ComponenteB1.vue'

// import ComponenteBase2 from '../ComponenteBase2.vue'
// import ComponenteA2 from '../ComponenteA2.vue'
// import ComponenteB2 from '../ComponenteB2.vue'

import Books from './books.vue'
import BooksList from './list.vue'
import BooksForm from './create.vue'
import BooksDetails from './details.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI, { locale })

const routes = [
  {
    path: '/books',
    name: 'books',
    component: Books,
    children: [
        { path: 'list', name: 'books.list', component: BooksList },
        { path: 'create', name: 'books.create', component: BooksForm },
        { path: 'edit/:id', name: 'books.edit', component: BooksForm },
        { path: 'details/:id', name: 'books.details', component: BooksDetails }
    ]
  }
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#container',
  render: h => h(App)
})
