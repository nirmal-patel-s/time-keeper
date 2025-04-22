# ManualRequest Component

## Overview
The ManualRequest component allows users to submit and manage manual time tracking requests. It provides a form for creating new requests and a data table for viewing, filtering, and managing existing requests.

## Dependencies
- Vue 3 (Composition API)
- PrimeVue components (DataTable, Column, Button, Tag, AutoComplete, Calendar, Textarea, InputText, Dropdown)

## Features
- Form for submitting new manual time requests
- Data table to view and manage existing requests
- Comprehensive form validation
- Status indicators using color-coded tags
- Advanced filtering system for requests
- Date range selection
- Automatic total time calculation

## Form Validation
The component implements extensive validation including:
- Required field validation
- Time logic validation (out time must be after in time)
- Date validation (cannot be in the future)
- Clear error messages

## Filtering Capabilities
Users can filter requests by:
- Project
- Task Name
- Date Range
- Reason (text search)

## Data Management
Actions available for request management:
- View request details
- Delete requests
- Submit new requests

## Status Tracking
Requests can have the following statuses:
- Pending
- Approved
- Rejected

Each status has a corresponding visual indicator.

## Responsive Design
The component is fully responsive with different layouts for:
- Desktop view (multi-column form and filters)
- Mobile view (stacked single-column layout)
