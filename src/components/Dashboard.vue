<template>
    <div role="region" aria-labelledby="dashboard-title">
        <h1 id="dashboard-title" class="page-title">Dashboard</h1>

        <div class="dashboard-container">
            <!-- Time Tracking Trends Chart -->
            <div class="chart-card">
                <h2>Time Tracking Trends</h2>
                <Chart type="line" :data="timeTrackingData" :options="chartOptions" />
            </div>

            <!-- Project Hours Chart -->
            <div class="chart-card">
                <h2>Project Hours</h2>
                <Chart type="bar" :data="projectHoursData" :options="chartOptions" />
            </div>

            <!-- Task Distribution Chart -->
            <div class="chart-card">
                <h2>Task Distribution</h2>
                <Chart type="pie" :data="taskDistributionData" :options="pieChartOptions" />
            </div>

            <!-- Summary Stats -->
            <div class="chart-card stats-card">
                <h2>Summary</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">{{ totalHours }}</span>
                        <span class="stat-label">Total Hours</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ pendingApprovals }}</span>
                        <span class="stat-label">Pending Approvals</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ projectsWorked }}</span>
                        <span class="stat-label">Projects</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ averageHoursPerDay }}</span>
                        <span class="stat-label">Avg Hours/Day</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Chart from 'primevue/chart';

// Summary statistics
const totalHours = ref('168.5');
const pendingApprovals = ref('3');
const projectsWorked = ref('5');
const averageHoursPerDay = ref('8.4');

// Common chart options
const chartOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

// Pie chart options
const pieChartOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    }
};

// Line chart - Time Tracking Trends
const timeTrackingData = {
    labels: ['15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr', '21 Apr', '22 Apr'],
    datasets: [
        {
            label: 'Worked Hours',
            data: [9, 9, 8.5, 8.5, 9, 9, 8.5, 8.5],
            fill: false,
            borderColor: '#10b981',
            tension: 0.4
        },
        {
            label: 'Expected Hours',
            data: [8, 8, 8, 8, 8, 8, 8, 8],
            fill: false,
            borderColor: '#64748b',
            tension: 0.4,
            borderDash: [5, 5]
        }
    ]
};

// Bar chart - Project Hours
const projectHoursData = {
    labels: ['Vue Dashboard', 'React Native App', 'Vue 3 Migration', 'React Component Library', 'Vue State Management'],
    datasets: [
        {
            label: 'Hours Spent',
            backgroundColor: '#10b981',
            data: [42, 36.5, 25.5, 34, 30.5]
        }
    ]
};

// Pie chart - Task Distribution
const taskDistributionData = {
    labels: ['Development', 'Code Review', 'Meetings', 'Planning', 'Learning'],
    datasets: [
        {
            data: [45, 15, 20, 10, 10],
            backgroundColor: ['#10b981', '#60a5fa', '#f59e0b', '#8b5cf6', '#ec4899'],
            hoverBackgroundColor: ['#059669', '#3b82f6', '#d97706', '#7c3aed', '#db2777']
        }
    ]
};
</script>

<style scoped>
.page-title {
    text-align: center;
    margin-bottom: 8px;
}

.dashboard-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
}

.chart-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
}

.chart-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.chart-card h2 {
    font-size: 1.2rem;
    color: var(--emerald-700, #047857);
    margin-top: 0;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.stats-card {
    grid-column: span 2;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: rgba(16, 185, 129, 0.1);
    border-radius: 8px;
}

.stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--emerald-600, #059669);
}

.stat-label {
    margin-top: 8px;
    color: var(--emerald-800, #065f46);
    font-size: 0.9rem;
}

/* Dark mode styles */
.my-app-dark .chart-card {
    background-color: #1e293b;
}

.my-app-dark .chart-card h2 {
    color: var(--emerald-400, #34d399);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.my-app-dark .stat-item {
    background-color: rgba(52, 211, 153, 0.1);
}

.my-app-dark .stat-value {
    color: var(--emerald-400, #34d399);
}

.my-app-dark .stat-label {
    color: var(--emerald-300, #6ee7b7);
}

/* Responsive design */
@media (max-width: 768px) {
    .dashboard-container {
        grid-template-columns: 1fr;
    }

    .stats-card {
        grid-column: 1;
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>