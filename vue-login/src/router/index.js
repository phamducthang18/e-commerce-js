import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import DashdoardPage from '../views/DashboardPage.vue';
import UserLogin from '../components/UserLogin.vue';
import UserSignup from '../components/UserSignup.vue';
import ProfilePage from '../components/ProfilePage.vue';
import NewsFeed from '../components/NewsFeed.vue';
import MessagesPage from '../components/MessagesPage.vue';
import FriendSearch from '../components/FriendSearch.vue';
import FriendRequest from '../components/FriendRequests.vue';

import api from '@/services/api';

const routes = [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/dashboard', name: 'DashboardPage', component: DashdoardPage, meta: { requiresAuth: true } },
    { path: '/login', name: 'UserLogin', component: UserLogin },
    { path: '/signup', name: 'UserSignup', component: UserSignup },
    { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
    { path: '/news-feed', component: NewsFeed, meta: { requiresAuth: true } },
    { path: '/messages', component: MessagesPage, meta: { requiresAuth: true } }, 
    { path: '/friend-search', component: FriendSearch, meta: { requiresAuth: true } },
    { path: '/friend-requests', component: FriendRequest, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (!requiresAuth) return next();
    
    try {
        const res = await api.get('/api/session/check');
        if (res.data.isLoggedIn) {
            const { useAuthStore } = await import('@/stores/authStore');
            const authStore = useAuthStore();
            authStore.setUser(res.data.user);
            next();
        } else {
            next('/login');
        }
    } catch (error) {
        console.error('Session check failed:', error);
        next('/login');
    }
});

export default router;
