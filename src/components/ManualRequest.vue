<template>
    <div role="region" aria-labelledby="manual-request-title">
        <div class="header-container">
            <h1 id="manual-request-title" class="page-title">Manual Request</h1>
            <Button label="New Request" icon="pi pi-plus" aria-label="Create new manual request" @click="toggleForm" />
        </div>

        <!-- Request Form -->
        <div v-if="showForm" class="request-form" role="form" aria-label="New manual request form">
            <div class="form-grid">
                <div class="form-field">
                    <label for="project" class="field-label">Select Project</label>
                    <AutoComplete id="project" v-model="newRequest.project" :suggestions="filteredProjects"
                        @complete="searchProjects" placeholder="Select Project" class="w-full"
                        :inputStyle="{ width: '100%' }" />
                    <span v-if="validationErrors.project" class="error-message">{{ validationErrors.project }}</span>
                </div>

                <div class="form-field">
                    <label for="task" class="field-label">Select Task</label>
                    <AutoComplete id="task" v-model="newRequest.task" :suggestions="filteredTasks"
                        @complete="searchTasks" placeholder="Select Task" class="w-full"
                        :inputStyle="{ width: '100%' }" />
                    <span v-if="validationErrors.task" class="error-message">{{ validationErrors.task }}</span>
                </div>

                <div class="form-field">
                    <label for="date" class="field-label">Request Date</label>
                    <InputText id="date" v-model="newRequest.date" type="date" class="w-full" :max="getCurrentDate()" />
                    <span v-if="validationErrors.date" class="error-message">{{ validationErrors.date }}</span>
                </div>

                <div class="form-field">
                    <label for="inTime" class="field-label">In Time</label>
                    <InputText id="inTime" v-model="newRequest.inTime" type="time" class="w-full"
                        @change="validateTimes()" />
                    <span v-if="validationErrors.inTime" class="error-message">{{ validationErrors.inTime }}</span>
                </div>

                <div class="form-field">
                    <label for="outTime" class="field-label">Out Time</label>
                    <InputText id="outTime" v-model="newRequest.outTime" type="time" class="w-full"
                        @change="validateTimes()" />
                    <span v-if="validationErrors.outTime" class="error-message">{{ validationErrors.outTime }}</span>
                </div>

                <div class="form-field">
                    <label for="reason" class="field-label">Reason</label>
                    <Textarea id="reason" v-model="newRequest.reason" rows="5" placeholder="Reason for request"
                        class="w-full" />
                    <span v-if="validationErrors.reason" class="error-message">{{ validationErrors.reason }}</span>
                </div>
            </div>

            <div class="form-actions">
                <Button label="Submit" icon="pi pi-check" @click="submitRequest" />
                <Button label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="toggleForm" />
            </div>
        </div>

        <!-- Filter Row -->
        <div class="filter-section" v-if="!showForm">
            <h2 class="filter-title">Filter Requests</h2>
            <div class="filter-row">
                <div class="filter-item">
                    <label for="filter-project">Project</label>
                    <Dropdown id="filter-project" v-model="filters.project" :options="projects"
                        placeholder="Select Project" class="w-full" optionLabel="" />
                </div>

                <div class="filter-item">
                    <label for="filter-task">Task Name</label>
                    <Dropdown id="filter-task" v-model="filters.task" :options="tasks" placeholder="Select Task"
                        class="w-full" />
                </div>

                <div class="filter-item">
                    <label for="filter-date-range">Date Range</label>
                    <div class="date-range-container">
                        <Calendar id="filter-date-range" v-model="filters.dateRange" selectionMode="range"
                            dateFormat="yy-mm-dd" placeholder="Select Date Range" class="w-full" />
                    </div>
                </div>

                <div class="filter-item">
                    <label for="filter-reason">Search Reason</label>
                    <InputText id="filter-reason" v-model="filters.reason" placeholder="Search by reason"
                        class="w-full" />
                </div>
            </div>

            <div class="filter-actions">
                <Button label="Apply Filters" icon="pi pi-filter" @click="applyFilters" />
                <Button label="Clear Filters" icon="pi pi-times" class="p-button-secondary" @click="clearFilters" />
            </div>
        </div>

        <DataTable :value="filteredManualRequests" responsiveLayout="scroll" stripedRows
            aria-label="Manual requests data">
            <Column field="project" header="Project"></Column>
            <Column field="taskName" header="Task Name"></Column>
            <Column field="date" header="Date"></Column>
            <Column field="inTime" header="In Time"></Column>
            <Column field="outTime" header="Out Time"></Column>
            <Column field="totalTime" header="Total Time"></Column>
            <Column field="reason" header="Reason"></Column>
            <Column field="status" header="Status">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" />
                </template>
            </Column>
            <Column header="Action">
                <template #body="slotProps">
                    <div class="action-buttons">
                        <button class="action-btn" aria-label="View request details"
                            @click="viewRequest(slotProps.data)">
                            <i class="pi pi-eye"></i>
                        </button>
                        <button class="action-btn delete-btn" aria-label="Delete request"
                            @click="deleteRequest(slotProps.data)">
                            <i class="pi pi-trash"></i>
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
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const manualRequests = ref([
    {
        id: 1,
        project: 'Vue Dashboard',
        taskName: 'Component Development',
        date: '2025-04-15',
        inTime: '09:00',
        outTime: '17:00',
        totalTime: '8h',
        reason: 'Working on PrimeVue integration',
        status: 'Approved'
    },
    {
        id: 2,
        project: 'React Native App',
        taskName: 'UI Implementation',
        date: '2025-04-16',
        inTime: '10:00',
        outTime: '18:30',
        totalTime: '8.5h',
        reason: 'Client requested urgent changes',
        status: 'Pending'
    },
    {
        id: 3,
        project: 'Vue 3 Migration',
        taskName: 'Code Refactoring',
        date: '2025-04-17',
        inTime: '08:30',
        outTime: '16:45',
        totalTime: '8.25h',
        reason: 'Upgrading legacy components',
        status: 'Rejected'
    },
    {
        id: 4,
        project: 'React Component Library',
        taskName: 'Documentation',
        date: '2025-04-18',
        inTime: '09:15',
        outTime: '17:30',
        totalTime: '8.25h',
        reason: 'Creating component examples',
        status: 'Approved'
    },
    {
        id: 5,
        project: 'Vue State Management',
        taskName: 'Pinia Implementation',
        date: '2025-04-19',
        inTime: '08:00',
        outTime: '16:00',
        totalTime: '8h',
        reason: 'Replacing Vuex with Pinia',
        status: 'Pending'
    }
]);

const showForm = ref(false);
const newRequest = ref({
    project: '',
    task: '',
    date: '',
    inTime: '',
    outTime: '',
    reason: ''
});

// Add validation state and error messages
const validationErrors = ref({
    project: '',
    task: '',
    date: '',
    inTime: '',
    outTime: '',
    reason: ''
});

const projects = ref(['Vue Dashboard', 'React Native App', 'Vue 3 Migration', 'React Component Library', 'Vue State Management']);
const filteredProjects = ref<string[]>([]);

function searchProjects(event: { query: string }) {
    filteredProjects.value = projects.value.filter(project =>
        project.toLowerCase().includes(event.query.toLowerCase())
    );
}

const tasks = ref([
    // Vue Dashboard tasks
    'Dashboard Layout Design',
    'Chart Components Implementation',
    'Data Visualization Widget',
    'User Analytics Panel',
    'Theme Customization',
    'Real-time Data Integration',
    'Admin Panel Setup',

    // React Native App tasks
    'UI Implementation',
    'Navigation Flow',
    'Mobile Authentication',
    'Offline Mode Support',
    'Push Notification Setup',
    'API Integration',
    'Performance Optimization',

    // Vue 3 Migration tasks
    'Code Refactoring',
    'Composition API Conversion',
    'Unit Test Updates',
    'Component Rewrite',
    'Router Configuration',
    'State Management Update',
    'Build Process Optimization',

    // React Component Library tasks
    'Documentation',
    'Component Design',
    'Accessibility Audit',
    'Storybook Integration',
    'Theme Provider Implementation',
    'Testing Framework Setup',
    'NPM Package Configuration',

    // Vue State Management tasks
    'Pinia Implementation',
    'Store Design',
    'Actions and Mutations Setup',
    'Persistence Layer',
    'DevTools Integration',
    'TypeScript Type Definitions',
    'Modular Store Architecture'
]);

const filteredTasks = ref<string[]>([]);

function searchTasks(event: { query: string }) {
    filteredTasks.value = tasks.value.filter(task =>
        task.toLowerCase().includes(event.query.toLowerCase())
    );
}

function toggleForm() {
    showForm.value = !showForm.value;
}

function submitRequest() {
    // Reset validation errors
    resetValidationErrors();

    // Validate all fields
    let isValid = true;

    if (!newRequest.value.project) {
        validationErrors.value.project = 'Project is required';
        isValid = false;
    }

    if (!newRequest.value.task) {
        validationErrors.value.task = 'Task is required';
        isValid = false;
    }

    if (!newRequest.value.date) {
        validationErrors.value.date = 'Date is required';
        isValid = false;
    }

    if (!newRequest.value.inTime) {
        validationErrors.value.inTime = 'In Time is required';
        isValid = false;
    }

    if (!newRequest.value.outTime) {
        validationErrors.value.outTime = 'Out Time is required';
        isValid = false;
    }

    if (!newRequest.value.reason) {
        validationErrors.value.reason = 'Reason is required';
        isValid = false;
    }

    // Check if out time is after in time
    if (newRequest.value.inTime && newRequest.value.outTime) {
        if (newRequest.value.inTime >= newRequest.value.outTime) {
            validationErrors.value.outTime = 'Out Time must be after In Time';
            isValid = false;
        }
    }

    // If validation fails, stop submission
    if (!isValid) {
        return;
    }

    // Continue with submission logic if valid
    manualRequests.value.unshift({
        id: manualRequests.value.length + 1,
        project: newRequest.value.project,
        taskName: newRequest.value.task,
        date: newRequest.value.date,
        inTime: newRequest.value.inTime,
        outTime: newRequest.value.outTime,
        totalTime: calculateTotalTime(newRequest.value.inTime, newRequest.value.outTime),
        reason: newRequest.value.reason,
        status: 'Pending'
    });

    // Reset form
    newRequest.value = {
        project: '',
        task: '',
        date: '',
        inTime: '',
        outTime: '',
        reason: ''
    };

    // Close form
    showForm.value = false;
}

function resetValidationErrors() {
    validationErrors.value = {
        project: '',
        task: '',
        date: '',
        inTime: '',
        outTime: '',
        reason: ''
    };
}

function calculateTotalTime(inTime: string, outTime: string): string {
    // Simple implementation - in a real app, you'd want to use a date library
    if (!inTime || !outTime) return '';

    const [inHour, inMinute] = inTime.split(':').map(Number);
    const [outHour, outMinute] = outTime.split(':').map(Number);

    let hours = outHour - inHour;
    let minutes = outMinute - inMinute;

    if (minutes < 0) {
        hours -= 1;
        minutes += 60;
    }

    if (minutes === 0) {
        return `${hours}h`;
    }

    return `${hours}.${Math.floor((minutes / 60) * 100)}h`;
}

function getStatusSeverity(status: string) {
    switch (status) {
        case 'Approved':
            return 'success';
        case 'Pending':
            return 'warning';
        case 'Rejected':
            return 'danger';
        default:
            return 'info';
    }
}

function viewRequest(request: any) {
    // Implementation for viewing request details
    console.log('View request:', request);
}

function deleteRequest(request: any) {
    // Remove the request from the array
    manualRequests.value = manualRequests.value.filter(item => item.id !== request.id);
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function validateTimes() {
    if (newRequest.value.inTime && newRequest.value.outTime) {
        if (newRequest.value.inTime >= newRequest.value.outTime) {
            validationErrors.value.outTime = 'Out Time must be after In Time';
        } else {
            validationErrors.value.outTime = '';
        }
    }
}

// Filter state
const filters = ref({
    project: null,
    task: null,
    dateRange: null,
    reason: ''
});

// Add filteredManualRequests for storing filtered results
const filteredManualRequests = ref([...manualRequests.value]);

function applyFilters() {
    // Filter the requests based on the selected criteria
    filteredManualRequests.value = manualRequests.value.filter(request => {
        // Project filter
        const projectMatch = !filters.value.project || request.project === filters.value.project;

        // Task filter
        const taskMatch = !filters.value.task || request.taskName === filters.value.task;

        // Date range filter
        let dateMatch = true;
        if (filters.value.dateRange && filters.value.dateRange.length === 2) {
            const requestDate = new Date(request.date);
            const startDate = new Date(filters.value.dateRange[0]);
            const endDate = new Date(filters.value.dateRange[1]);

            // Reset time components for accurate date comparison
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            requestDate.setHours(12, 0, 0, 0);

            dateMatch = requestDate >= startDate && requestDate <= endDate;
        }

        // Reason text search
        const reasonMatch = !filters.value.reason ||
            request.reason.toLowerCase().includes(filters.value.reason.toLowerCase());

        // Return true only if all conditions are met
        return projectMatch && taskMatch && dateMatch && reasonMatch;
    });
}

function clearFilters() {
    filters.value = {
        project: null,
        task: null,
        dateRange: null,
        reason: ''
    };

    // Reset to show all requests
    filteredManualRequests.value = [...manualRequests.value];
}
</script>

<style>
.action-buttons {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
}

.delete-btn {
    color: red;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    padding: 0.25rem 0.5rem;
}

.page-title {
    text-align: center;
    margin-bottom: 0;
    flex-grow: 1;
    color: var(--header-text-color-light);
    font-weight: 600;
}

.my-app-dark .page-title {
    color: var(--header-text-color-dark);
}

.request-form {
    background-color: var(--surface-card, #ffffff);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.form-field {
    display: flex;
    flex-direction: column;
}

.field-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.5rem;
}

.w-full {
    width: 100%;
}

.error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

@media (max-width: 768px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
}

/* Filter Section */
.filter-section {
    background-color: var(--surface-card, #ffffff);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.filter-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.filter-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
}

.filter-item {
    display: flex;
    flex-direction: column;
}

.filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 0.75rem;
}

.date-range-container {
    display: flex;
    flex-direction: column;
}

@media (max-width: 768px) {
    .filter-row {
        grid-template-columns: 1fr;
    }
}
</style>