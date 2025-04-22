<script lang="ts" setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import ToggleSwitch from 'primevue/toggleswitch';
import { isDarkMode, toggleDarkMode } from './main';
import { useRouter } from 'vue-router';

const router = useRouter();

const items = ref([
  { label: 'Dashboard', route: '/dashboard' },
  { label: 'Timesheet', route: '/timesheet' },
  { label: 'Manual Request', route: '/manual-request' },
  { label: 'Request Approval', route: '/request-approval' },
  { label: 'FAQ', route: '/faq' },
]);
</script>

<template>
  <div id="app">
    <Menubar :model="items" class="custom-menubar" aria-label="Main Navigation">
      <template #item="{ item, props }">
        <router-link :to="item.route" custom v-slot="{ href, navigate, isActive }">
          <a :href="href" @click="navigate" :class="{ 'menu-link': true, 'active-link': isActive }"
            :aria-current="isActive ? 'page' : undefined">
            {{ item.label }}
          </a>
        </router-link>
      </template>
      <template #end>
        <div class="theme-toggle">
          <label for="dark-mode-toggle" class="sr-only">Toggle Dark Mode</label>
          <ToggleSwitch id="dark-mode-toggle" :model-value="isDarkMode" @update:model-value="toggleDarkMode"
            aria-label="Toggle dark mode" />
        </div>
      </template>
    </Menubar>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.theme-toggle {
  display: flex;
  align-items: center;
}

.custom-menubar .p-menubar-root-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu-link {
  padding: 0.75rem 1rem;
  color: var(--emerald-700, #047857);
  text-decoration: none;
  display: block;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
  font-weight: 500;
}

.my-app-dark .menu-link {
  color: var(--emerald-500, #10b981);
}

.active-link {
  background-color: var(--emerald-100, rgba(16, 185, 129, 0.1));
  color: var(--emerald-800, #065f46);
  font-weight: 600;
}

.my-app-dark .active-link {
  background-color: rgba(52, 211, 153, 0.15);
  color: var(--emerald-300, #6ee7b7);
}

.menu-link:hover {
  background-color: var(--emerald-50, rgba(16, 185, 129, 0.05));
}

.my-app-dark .menu-link:hover {
  background-color: rgba(52, 211, 153, 0.1);
}
</style>
