# RequestApproval Component

## Overview
The RequestApproval component provides an interface for managers to review, approve, or reject time tracking requests submitted by team members. It displays pending requests in a paginated, sortable, and searchable data table.

## Dependencies
- Vue 3 (Composition API)
- PrimeVue components (DataTable, Column, InputText)

## Features
- Paginated data table for pending requests
- Global search functionality across all fields
- Sortable columns for easy organization
- Quick action buttons for approval/rejection
- Truncated reason text with ellipsis for long content

## Data Display
Each request row displays:
- Project name
- Task name
- Date
- In Time
- Out Time
- Total Time
- Reason (truncated with ellipsis if too long)
- Action buttons

## Actions
Managers can:
- Approve requests (green check-circle button)
- Reject requests (red times-circle button)
- Search across all request fields
- Sort requests by project, task, or date

## Pagination
The table includes pagination with:
- Configurable rows per page (5, 10, 20)
- Page navigation controls

## UI/UX Features
- Color-coded action buttons
- Hover effects on buttons
- Truncated text with ellipsis for long content
- Clean and intuitive layout
