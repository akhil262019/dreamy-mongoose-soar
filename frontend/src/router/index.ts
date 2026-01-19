import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue'; // Assuming a register page
import { useAuthStore } from '@/stores/auth'; // Import your auth store

// Dynamically import views for better performance (code splitting)
const DashboardView = () => import('@/views/DashboardView.vue');
const AdminDashboard = () => import('@/views/AdminDashboard.vue');
const DoctorDashboard = () => import('@/views/DoctorDashboard.vue');
const PatientDashboard = () => import('@/views/PatientDashboard.vue');

// Define route meta types for better type checking
interface RouteMeta {
  requiresAuth?: boolean;
  roles?: string[]; // e.g., ['admin'], ['doctor', 'admin']
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false }, // Home page is public
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }, // Login page is public
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresAuth: false }, // Registration page is public
  },
  // General Dashboard -Can be accessed by any logged-in user, content might adapt
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  // Role-specific dashboards
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['admin'] },
  },
  {
    path: '/doctor-dashboard',
    name: 'doctor-dashboard',
    component: DoctorDashboard,
    meta: { requiresAuth: true, roles: ['doctor', 'admin'] }, // Admin can also view doctor dashboard
  },
  {
    path: '/patient-dashboard',
    name: 'patient-dashboard',
    component: PatientDashboard,
    meta: { requiresAuth: true, roles: ['patient', 'admin'] }, // Admin can also view patient dashboard
  },
  // Add other protected routes here, e.g., patient/doctor management pages for admin
  // {
  //   path: '/admin/doctors',
  //   name: 'admin-doctors',
  //   component: () => import('@/views/admin/DoctorsManagement.vue'),
  //   meta: { requiresAuth: true, roles: ['admin'] },
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard for route protection
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  // Check authentication status on initial load or when navigating
  // This check ensures the store is populated if the user is already logged in (e.g., session cookies)
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth(); // Attempt to re-authenticate using session
  }

  // Redirect to login if route requires authentication and user is not logged in
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }, // Pass original route to redirect back after login
    };
  }

  // If user is already authenticated and trying to access login/register pages
  if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    // Redirect to dashboard or home page
    return { name: 'home' }; // Or a more appropriate default dashboard
  }

  // Role-based access control
  if (to.meta.roles && authStore.user) {
    if (!to.meta.roles.includes(authStore.user.role)) {
      // User does not have the required role for this route
      console.warn(`Access denied: User role '${authStore.user.role}' is not allowed for route '${to.path}'. Redirecting to home.`);
      return { name: 'home' }; // Redirect to a safe page
    }
  }

  // If all checks pass, allow navigation
  return true;
});

export default router;