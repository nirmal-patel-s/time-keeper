<template>
    <div role="region" aria-labelledby="request-approval-title">
        <h1 id="request-approval-title" class="page-title">Request Approval</h1>

        <DataTable :value="pendingRequests" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 20]"
            responsiveLayout="scroll" stripedRows v-model:filters="filters" filterDisplay="menu"
            :globalFilterFields="['project', 'task', 'date', 'reason']" aria-label="Requests pending approval">

            <template #header>
                <div class="flex justify-content-between align-items-center">
                    <h2 class="m-0 text-lg">Pending Requests</h2>
                    <div class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Search" />
                    </div>
                </div>
            </template>

            <Column field="project" header="Project" sortable></Column>
            <Column field="task" header="Task" sortable></Column>
            <Column field="date" header="Date" sortable></Column>
            <Column field="inTime" header="In Time"></Column>
            <Column field="outTime" header="Out Time"></Column>
            <Column field="totalTime" header="Total Time"></Column>
            <Column field="reason" header="Reason">
                <template #body="slotProps">
                    <div class="reason-cell">{{ slotProps.data.reason }}</div>
                </template>
            </Column>
            <Column header="Action" style="width: 100px">
                <template #body="slotProps">
                    <div class="action-buttons">
                        <button class="action-btn approve-btn" @click="approveRequest(slotProps.data)"
                            aria-label="Approve request">
                            <i class="pi pi-check-circle"></i>
                        </button>
                        <button class="action-btn reject-btn" @click="rejectRequest(slotProps.data)"
                            aria-label="Reject request">
                            <i class="pi pi-times-circle"></i>
                        </button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';

// Global filters for search
const filters = ref({
    'global': { value: null, matchMode: 'contains' }
});

// Sample data for pending requests
const pendingRequests = ref([
    {
        id: 1,
        project: 'Vue Dashboard',
        task: 'Chart Components',
        date: '2025-04-15',
        inTime: '08:30',
        outTime: '17:30',
        totalTime: '9h',
        reason: 'Working on implementing interactive charts with real-time data updates'
    },
    {
        id: 2,
        project: 'React Native App',
        task: 'Navigation Setup',
        date: '2025-04-16',
        inTime: '09:00',
        outTime: '18:00',
        totalTime: '9h',
        reason: 'Setting up navigation structure and routing for the mobile application'
    },
    {
        id: 3,
        project: 'Vue 3 Migration',
        task: 'Composition API Conversion',
        date: '2025-04-17',
        inTime: '09:15',
        outTime: '17:45',
        totalTime: '8.5h',
        reason: 'Converting Options API components to Composition API'
    },
    {
        id: 4,
        project: 'React Component Library',
        task: 'Accessibility Updates',
        date: '2025-04-18',
        inTime: '08:00',
        outTime: '16:30',
        totalTime: '8.5h',
        reason: 'Improving accessibility for all form components to meet WCAG standards'
    },
    {
        id: 5,
        project: 'Vue State Management',
        task: 'Pinia Store Setup',
        date: '2025-04-19',
        inTime: '10:00',
        outTime: '19:00',
        totalTime: '9h',
        reason: 'Implementing and configuring Pinia stores for application state'
    },
    {
        id: 6,
        project: 'React Dashboard',
        task: 'Data Visualization',
        date: '2025-04-20',
        inTime: '09:30',
        outTime: '18:30',
        totalTime: '9h',
        reason: 'Creating data visualization components with d3.js integration'
    },
    {
        id: 7,
        project: 'Vue Dashboard',
        task: 'User Settings Panel',
        date: '2025-04-21',
        inTime: '08:45',
        outTime: '17:15',
        totalTime: '8.5h',
        reason: 'Implementing user preferences and settings management interface'
    },
    {
        id: 8,
        project: 'React Native App',
        task: 'Push Notifications',
        date: '2025-04-21',
        inTime: '09:15',
        outTime: '18:45',
        totalTime: '9.5h',
        reason: 'Setting up push notification service and handling notification events'
    },
    {
        id: 9,
        project: 'Vue 3 Migration',
        task: 'TypeScript Integration',
        date: '2025-04-22',
        inTime: '08:30',
        outTime: '17:00',
        totalTime: '8.5h',
        reason: 'Adding TypeScript support and converting JavaScript files to TypeScript'
    },
    {
        id: 10,
        project: 'React Component Library',
        task: 'Theme System',
        date: '2025-04-22',
        inTime: '10:00',
        outTime: '18:30',
        totalTime: '8.5h',
        reason: 'Implementing a flexible theming system with dark mode support'
    }
]);

function approveRequest(request: any) {
    // In a real app, you would call an API to approve the request
    console.log('Approve request:', request);

    // Remove from the pending requests list
    pendingRequests.value = pendingRequests.value.filter(item => item.id !== request.id);

    // Show success message (in a real app)
    // toast.add({ severity: 'success', summary: 'Approved', detail: 'Request has been approved', life: 3000 });
}

function rejectRequest(request: any) {
    // In a real app, you would call an API to reject the request
    console.log('Reject request:', request);

    // Remove from the pending requests list
    pendingRequests.value = pendingRequests.value.filter(item => item.id !== request.id);

    // Show error message (in a real app)
    // toast.add({ severity: 'error', summary: 'Rejected', detail: 'Request has been rejected', life: 3000 });
}
</script>

<style>
.action-buttons {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
}

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    padding: 0.25rem;
    transition: transform 0.2s, color 0.2s;
}

.action-btn:hover {
    transform: scale(1.2);
}

.approve-btn {
    color: var(--green-600);
}

.approve-btn:hover {
    color: var(--green-400);
}

.reject-btn {
    color: var(--red-600);
}

.reject-btn:hover {
    color: var(--red-400);
}

.reason-cell {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Make sure the flex utilities work */
.flex {
    display: flex;
}

.justify-content-between {
    justify-content: space-between;
}

.align-items-center {
    align-items: center;
}

.m-0 {
    margin: 0;
}

.text-lg {
    font-size: 1.25rem;
}

.page-title {
    text-align: center;
    margin-bottom: 1.5rem;
}

/* Fix search icon positioning */
.p-input-icon-left {
    position: relative;
}

.p-input-icon-left i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.75rem;
    color: var(--text-color-secondary);
}

.p-input-icon-left input {
    padding-left: 2.5rem;
}
</style>