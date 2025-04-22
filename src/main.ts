import { createApp, ref, watch } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { createRouter, createWebHistory } from 'vue-router';

// Import PrimeIcons CSS
// import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

// Export isDarkMode and toggleDarkMode to make them accessible in App.vue
export const isDarkMode = ref(false);

export function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('my-app-dark', isDarkMode.value);
}

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{emerald.50}',
            100: '{emerald.100}',
            200: '{emerald.200}',
            300: '{emerald.300}',
            400: '{emerald.400}',
            500: '{emerald.500}',
            600: '{emerald.600}',
            700: '{emerald.700}',
            800: '{emerald.800}',
            900: '{emerald.900}',
            950: '{emerald.950}'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{Zinc.50}',
                    100: '{Zinc.100}',
                    200: '{Zinc.200}',
                    300: '{Zinc.300}',
                    400: '{Zinc.400}',
                    500: '{Zinc.500}',
                    600: '{Zinc.600}',
                    700: '{Zinc.700}',
                    800: '{Zinc.800}',
                    900: '{Zinc.900}',
                    950: '{Zinc.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                }
            }
        }
    },
    mode: isDarkMode.value ? 'dark' : 'light',
});

watch(isDarkMode, (newValue) => {
    MyPreset.mode = newValue ? 'dark' : 'light';
});

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('./components/Dashboard.vue'),
  },
  {
    path: '/timesheet',
    name: 'Timesheet',
    component: () => import('./components/Timesheet.vue'),
  },
  {
    path: '/manual-request',
    name: 'ManualRequest',
    component: () => import('./components/ManualRequest.vue'),
  },
  {
    path: '/request-approval',
    name: 'RequestApproval',
    component: () => import('./components/RequestApproval.vue'),
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('./components/FAQ.vue'),
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.my-app-dark',
        },
    },
});

app.use(router);

app.mount('#app');
