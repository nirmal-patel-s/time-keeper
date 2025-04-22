# FAQ Component

## Overview
The FAQ component provides a searchable and expandable list of frequently asked questions about the Time Keeper application. It allows users to quickly find answers to common questions through a search feature with synonym support.

## Dependencies
- Vue 3 (Composition API)
- PrimeVue components (Accordion, AccordionTab, InputText)

## Features
- Searchable FAQ entries with real-time filtering
- Expandable/collapsible question and answer sections
- Search term highlighting in answers
- Synonym-based search for improved discoverability
- "No results" state when search has no matches

## Search Functionality
The component implements an advanced search with:
- Automatic synonym expansion (e.g., searching for "submit" also finds "create", "add", etc.)
- Term highlighting in search results
- Minimum term length filtering to avoid irrelevant matches

## Data Structure
Each FAQ item contains:
- `question`: The FAQ question text
- `answer`: Detailed answer in HTML format (supports formatting)

## Accessibility
- Proper ARIA attributes for screen readers
- Semantic HTML structure
- Clear visual indication of search results through highlighting
