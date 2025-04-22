# Dashboard Component

## Overview
The Dashboard component provides a visual overview of time tracking data with multiple charts and summary statistics. It serves as the main landing page for users to quickly understand their time allocation and project distribution.

## Dependencies
- Vue 3 (Composition API)
- PrimeVue Chart component

## Features
- Time Tracking Trends (Line Chart)
- Project Hours (Bar Chart)
- Task Distribution (Pie Chart)
- Summary Statistics (Total Hours, Pending Approvals, Projects, Average Hours/Day)

## Charts
1. **Time Tracking Trends Chart**: Shows daily worked hours compared to expected hours over time
2. **Project Hours Chart**: Displays hours spent on different projects as a bar chart
3. **Task Distribution Chart**: Visualizes the distribution of time across different task types

## Accessibility
- Proper ARIA attributes for screen readers
- Semantic HTML structure
- Clear heading hierarchy

## Responsiveness
The dashboard is fully responsive with a grid layout that:
- Displays 2 columns on desktop and tablet
- Collapses to 1 column on mobile devices
- Adjusts the summary statistics grid from 4 to 2 columns on mobile
