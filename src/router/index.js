import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PlayerView from '@/views/Players/View.vue'
import PlayerCreate from '@/views/Players/Create.vue'
import PlayerEdit from '@/views/Players/Edit.vue'
import PlayerArchive from '@/views/Players/Archive.vue'
import TeamView from '@/views/Teams/View.vue'
import TeamCreate from '@/views/Teams/Create.vue'
import TeamEdit from '@/views/Teams/Edit.vue'
import TeamArchive from '@/views/Teams/Archive.vue'
import TeamInfo from '@/views/Teams/Info.vue'
import Scoreboard from '@/views/Scoreboard/View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/players',
      name: 'players',
      component: PlayerView
    },
    {
      path: '/players/create',
      name: 'playerCreate',
      component: PlayerCreate
    },
    {
      path: '/players/:id/edit',
      name: 'playerEdit',
      component: PlayerEdit
    },
    {
      path: '/players/archive',
      name: 'playerArchive',
      component: PlayerArchive
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamView
    },
    {
      path: '/teams/create',
      name: 'teamCreate',
      component: TeamCreate
    },
    {
      path: '/teams/:id/edit',
      name: 'teamEdit',
      component: TeamEdit
    },
    {
      path: '/teams/archive',
      name: 'teamArchive',
      component: TeamArchive
    },
    {
      path: '/teams/:teamId/info',
      name: 'teamInfo',
      component: TeamInfo,
      props: true,
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: Scoreboard,
    },
  ]
})

export default router
