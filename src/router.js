import { createWebHistory, createRouter } from "vue-router";
import Home from './pages/Home';
import DCHeroes from './pages/DCHeroes';
import Calendar from './pages/Calendar';
import Markdown from './pages/Markdown';
import ObjectDetection from './pages/ObjectDetection'

const routes = [
  { path: '/', component: Home },
  { path: '/dc-heroes', component: DCHeroes },
  { path: '/calendar', component: Calendar },
  { path: '/markdown', component: Markdown },
  { path: '/object-detection', component: ObjectDetection },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;