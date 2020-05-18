import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/views/home';
import addCard from '@/views/addCard';
import addGroup from '@/views/addGroup';

Vue.use(VueRouter);

const route = new VueRouter({
	routes: [
		{
			path: '/',
			component: home,
		},
		{
			path: '/addGroup',
			component: addGroup,
			name: 'addGroup',
		},
		{
			path: '/addCard',
			component: addCard,
			name: 'addCard',
		},
	],
	mode: 'history',
});

export default route;
