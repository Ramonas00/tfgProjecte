import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      alias: "/home",
      name: 'home',
      component: () => import('../views/HomeView.vue')
      
    },
    {
      path: '/crear',
      name: 'crear',
      component: () => import('../views/VistaCrear.vue')
      
    },
    {
      path: '/llista',
      name: 'llista',
      component: () => import('../views/VistaLlista.vue')
      
    },
    {
      path: '/codis/:id',
      name: 'editar-codi',
      component: () => import('../views/editarCodi.vue')
      
    },
    {
      path: '/exercici/:id',
      name: 'resoldre-codi',
      component: () => import('../views/resoldreCodi.vue')
      
    },
    {
      path: '/exerciciResolt/:id',
      name: 'resolt-codi',
      component: () => import('../views/resoldreCodi.vue')
      
    },
    {
      path: '/resolt',
      name: 'resolt',
      component: () => import('../views/VistaResolts.vue')
      
    },
    {
      path: '/quests',
      name: 'quests',
      component: () => import('../views/VistaQuestionaris.vue')
      
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/VistaStats.vue')
    },
    {
      path: '/questionari/:id',
      name: 'resoldre-questionari',
      component: () => import('../views/resoldreQuest.vue')
    }
  ]
});





