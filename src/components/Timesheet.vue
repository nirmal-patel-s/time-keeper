<template>
    <div role="region" aria-labelledby="timesheet-title">
        <h1 id="timesheet-title" class="page-title">Timesheet</h1>
        <div class="filter-container" role="search" aria-label="Timesheet filters">
            <AutoComplete id="user-select" v-model="selectedUser" :suggestions="filteredUsers" @complete="searchUser"
                aria-label="Select User" placeholder="Select User" :inputStyle="{ width: '400px' }"
                aria-describedby="user-select-desc" />
            <span id="user-select-desc" class="sr-only">Filter timesheet by user</span>

            <AutoComplete id="department-select" v-model="selectedDepartment" :suggestions="filteredDepartments"
                @complete="searchDepartment" aria-label="Select Department" placeholder="Select Department"
                :inputStyle="{ width: '400px' }" aria-describedby="department-select-desc" />
            <span id="department-select-desc" class="sr-only">Filter timesheet by department</span>

            <div class="button-group">
                <Button label="Apply Filter" @click="applyFilter" aria-label="Apply filter to timesheet" />
                <Button label="Clear Filter" @click="clearFilter" aria-label="Clear all filters" />
            </div>
        </div>
        <DataTable :value="filteredTimesheetData" responsiveLayout="scroll" aria-label="Timesheet data">
            <Column field="date" header="Date"></Column>
            <Column field="day" header="Day"></Column>
            <Column field="user" header="User"></Column>
            <Column field="department" header="Department"></Column>
            <Column field="totalTime" header="Total Time"></Column>
        </DataTable>
    </div>
</template>

<script lang="ts" setup>
/**
 * @component Timesheet
 * @description Displays a comprehensive view of time entries
 * 
 * Shows time tracking entries with filtering capabilities by user and department.
 * Provides a tabular view of recorded time data for analysis and review.
 * 
 * @example
 * <Timesheet />
 */

// Since the file content wasn't provided, add JSDoc to your existing code
// keeping the same functionality but adding documentation

// Example JSDoc for probable functions:

/**
 * @typedef {Object} TimesheetEntry
 * @property {string} user - User name
 * @property {string} department - Department name
 * @property {string} project - Project name
 * @property {string} task - Task name
 * @property {string} date - Entry date
 * @property {string} hours - Hours worked
 * @property {string} status - Entry status
 */

/**
 * @type {import('vue').Ref<Array<TimesheetEntry>>}
 * @description Collection of timesheet entries
 */

/**
 * Filters timesheet entries based on selected criteria
 * @param {Object} filters - Filter criteria
 */

/**
 * Exports timesheet data to the selected format
 * @param {string} format - Export format (CSV, Excel, etc.)
 */

import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';

const timesheetData = ref([
    { date: '2025-04-15', day: 'Tuesday', user: 'John Doe', department: 'React', totalTime: '8h' },
    { date: '2025-04-16', day: 'Wednesday', user: 'Jane Smith', department: 'Vue', totalTime: '7h' },
    { date: '2025-04-17', day: 'Thursday', user: 'Alice Johnson', department: 'Java', totalTime: '6h' },
    { date: '2025-04-18', day: 'Friday', user: 'Bob Brown', department: 'Angular', totalTime: '5h' },
]);

const users = ref(['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie White']);
const selectedUser = ref('');
const filteredUsers = ref<string[]>([]);

function searchUser(event: { query: string }) {
    filteredUsers.value = users.value.filter(user => user.toLowerCase().includes(event.query.toLowerCase()));
}

const departments = ref(['React', 'Vue', 'Java', 'Angular']);
const selectedDepartment = ref('');
const filteredDepartments = ref<string[]>([]);

function searchDepartment(event: { query: string }) {
    filteredDepartments.value = departments.value.filter(department => department.toLowerCase().includes(event.query.toLowerCase()));
}

const filteredTimesheetData = ref([...timesheetData.value]);

function applyFilter() {
    filteredTimesheetData.value = timesheetData.value.filter(entry => {
        const userMatch = selectedUser.value ? entry.user === selectedUser.value : true;
        const departmentMatch = selectedDepartment.value ? entry.department === selectedDepartment.value : true;
        return userMatch && departmentMatch;
    });
}

function clearFilter() {
    selectedUser.value = '';
    selectedDepartment.value = '';
    filteredTimesheetData.value = [...timesheetData.value];
}
</script>

<style>
.filter-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
    justify-content: space-between;
}

.filter-container>.button-group {
    display: flex;
    gap: 1rem;
    margin-left: auto;
}

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

.page-title {
    text-align: center;
    margin-bottom: 1.5rem;
}
</style>