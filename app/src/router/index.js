import { createRouter, createWebHistory } from 'vue-router';
import ObjectsList from '@/modules/WorkList/components/ObjectsList.vue';

const routes = [
  { name: 'objectsList', component: ObjectsList, path: '/home/objects_list/' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
