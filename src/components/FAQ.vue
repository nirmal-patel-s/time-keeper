<template>
    <div role="region" aria-labelledby="faq-title">
        <div class="faq-top-section">
            <div class="header-column">
                <h1 id="faq-title" class="page-title">FAQ</h1>
            </div>
            <div class="search-column">
                <div class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <InputText v-model="searchQuery" placeholder="Search FAQs" class="search-input" />
                </div>
            </div>
        </div>

        <Accordion :multiple="true">
            <AccordionTab v-for="(faq, index) in filteredFaqs" :key="index" :header="faq.question">
                <div class="faq-answer" v-html="highlightSearchTerms(faq.answer)"></div>
            </AccordionTab>
        </Accordion>

        <div v-if="filteredFaqs.length === 0" class="no-results">
            <i class="pi pi-info-circle"></i>
            <p>No FAQs match your search. Try using different keywords.</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
/**
 * @component FAQ
 * @description A searchable and expandable list of frequently asked questions
 * 
 * Provides a user-friendly interface for finding answers to common questions
 * about the Time Keeper application with advanced search capabilities and
 * expandable/collapsible sections.
 * 
 * @example
 * <FAQ />
 */
import { ref, computed } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import InputText from 'primevue/inputtext';

/**
 * @type {import('vue').Ref<string>}
 * @description User input for searching FAQs
 */
const searchQuery = ref('');

/**
 * @typedef {Object} FAQItem
 * @property {string} question - The question text
 * @property {string} answer - The answer text in HTML format
 */

/**
 * @type {import('vue').Ref<Array<FAQItem>>}
 * @description Array of FAQ items
 */
const faqs = ref([
    {
        question: "What is Time Keeper?",
        answer: "Time Keeper is a comprehensive time tracking and management application designed for teams working on various projects. It allows employees to log their working hours, submit manual time entry requests, and helps managers approve or reject time entries. The application provides a centralized dashboard for tracking project hours, analyzing time allocation, and ensuring accurate time records for billing and payroll purposes."
    },
    {
        question: "How do I submit a manual time request?",
        answer: "To submit a manual time request, navigate to the 'Manual Request' page from the navigation menu. Click on 'New Request' to open the form. Fill in the required details including Project, Task, Date, In Time, Out Time, and Reason for the request. The Total Time will be calculated automatically. Once you've filled all the required fields, click 'Submit' to submit your request for approval."
    },
    {
        question: "Can I edit a submitted time request?",
        answer: "No, once a time request has been submitted, it cannot be directly edited. However, if you need to make changes to a submitted request, you can delete the existing request and submit a new one with the correct information. If the request has already been approved, you will need to contact your manager or administrator to make the necessary changes."
    },
    {
        question: "How do I approve or reject time requests?",
        answer: "Managers and team leads can approve or reject time requests through the 'Request Approval' page. The page displays all pending requests with details including Project, Task, Date, In/Out Times, Total Time, and Reason. To approve a request, click the green check-circle icon in the Action column. To reject a request, click the red times-circle icon. Once approved or rejected, the request will be removed from the pending requests list."
    },
    {
        question: "Is there a way to filter or search for specific time entries?",
        answer: "Yes, the application provides robust filtering and search capabilities. On the Timesheet page, you can filter entries by User and Department. On the Manual Request page, you can filter by Project, Task Name, Date Range, and search within Reason text. The Request Approval page includes a global search that filters across all fields. These features help you quickly find specific entries in large datasets."
    },
    {
        question: "How is the total time calculated?",
        answer: "Total time is automatically calculated based on the In Time and Out Time you provide. The system subtracts the In Time from the Out Time to determine the total hours worked. For example, if you worked from 9:00 to 17:00, the total time would be 8 hours. The calculation accounts for minutes as well, converting them to decimal format (e.g., 8 hours and 30 minutes would be displayed as 8.5h)."
    },
    {
        question: "What is the difference between the Timesheet and Manual Request features?",
        answer: "The Timesheet feature displays a comprehensive view of time entries across users and departments, allowing for filtering and analysis of recorded time. The Manual Request feature, on the other hand, is used to submit new time entries that require approval, typically for situations where automatic time tracking wasn't possible or needs correction. Manual requests go through an approval workflow before being added to the official timesheet records."
    },
    {
        question: "How does dark mode work?",
        answer: "Time Keeper supports both light and dark modes for improved usability in different lighting conditions and personal preferences. You can toggle between modes using the switch in the top-right corner of the navigation bar. The application remembers your preference and will automatically apply it when you return to the application. Dark mode adjusts the color scheme to reduce eye strain in low-light environments."
    },
    {
        question: "Can I export my timesheet data?",
        answer: "While the current version doesn't have a direct export button visible in the interface, exporting functionality is planned for a future update. When implemented, users will be able to export their timesheet data in various formats including CSV, Excel, and PDF. This will facilitate integration with external payroll systems and reporting tools."
    },
    {
        question: "How are projects and tasks managed in the system?",
        answer: "Projects and tasks are pre-configured in the system by administrators. When submitting time entries, users can select from the available projects and associated tasks in the dropdown menus. If you need a new project or task added to the system, please contact your administrator. This centralized management ensures consistent tracking and reporting across the organization."
    },
    {
        question: "Is there a mobile version of Time Keeper?",
        answer: "The current version of Time Keeper is optimized for desktop and tablet use. However, the interface is responsive and can adapt to mobile devices. A dedicated mobile application with enhanced features for on-the-go time tracking is on our development roadmap and will be released in the near future."
    },
    {
        question: "How secure is my time tracking data?",
        answer: "Time Keeper implements robust security measures to protect your data. All communications between your browser and the server are encrypted using SSL/TLS. User authentication requires strong passwords, and user permissions are carefully controlled to ensure that employees can only access data relevant to their role. Regular security audits and updates are performed to maintain the highest level of data protection."
    }
]);

/**
 * @type {Object<string, Array<string>>}
 * @description Map of terms to their synonyms for improved search
 */
const synonymMap = {
    'submit': ['create', 'add', 'enter', 'log', 'record'],
    'approve': ['accept', 'confirm', 'validate', 'authorize'],
    'reject': ['decline', 'deny', 'refuse', 'disapprove'],
    'edit': ['modify', 'change', 'update', 'alter'],
    'delete': ['remove', 'erase', 'eliminate', 'discard'],
    'filter': ['search', 'find', 'look for', 'query', 'locate'],
    'export': ['download', 'extract', 'save', 'output'],
    'calculate': ['compute', 'determine', 'figure out', 'count'],
    'security': ['privacy', 'protection', 'safety', 'confidentiality'],
    'dark mode': ['night mode', 'dark theme', 'low light'],
    'mobile': ['phone', 'smartphone', 'tablet', 'portable']
};

/**
 * Expands a search query with synonyms for better matching
 * @param {string} query - The original search query
 * @returns {Array<string>} Array of expanded search terms
 */
function expandQueryWithSynonyms(query) {
    const terms = query.toLowerCase().split(' ');
    const expandedTerms = new Set<string>();

    terms.forEach(term => {
        expandedTerms.add(term);

        // Add synonyms for the term if they exist
        Object.entries(synonymMap).forEach(([word, synonyms]) => {
            if (word === term || synonyms.includes(term)) {
                expandedTerms.add(word);
                synonyms.forEach(synonym => expandedTerms.add(synonym));
            }
        });
    });

    return Array.from(expandedTerms);
}

/**
 * @type {import('vue').ComputedRef<Array<FAQItem>>}
 * @description Filtered FAQs based on the search query
 */
const filteredFaqs = computed(() => {
    if (!searchQuery.value.trim()) {
        return faqs.value;
    }

    const expandedTerms = expandQueryWithSynonyms(searchQuery.value.trim());

    return faqs.value.filter(faq => {
        const content = `${faq.question} ${faq.answer}`.toLowerCase();
        return expandedTerms.some(term => content.includes(term));
    });
});

/**
 * Highlights search terms in the answer text
 * @param {string} text - The original text to highlight
 * @returns {string} HTML with highlighted search terms
 */
function highlightSearchTerms(text) {
    if (!searchQuery.value.trim()) {
        return text;
    }

    const expandedTerms = expandQueryWithSynonyms(searchQuery.value.trim());
    let highlightedText = text;

    expandedTerms.forEach(term => {
        if (term.length < 3) return; // Skip very short terms

        const regex = new RegExp(`(${term})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
    });

    return highlightedText;
}
</script>

<style>
.faq-top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;
    /* Remove space between header and accordion */
}

.header-column {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

.search-column {
    width: 30%;
    padding-right: 8px;
}

.search-input {
    width: 100%;
}

.p-input-icon-left {
    position: relative;
    width: 100%;
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
    width: 100%;
}

.highlight {
    background-color: rgba(255, 230, 0, 0.4);
    font-weight: bold;
    padding: 0 2px;
    border-radius: 2px;
}

.faq-answer {
    line-height: 1.6;
}

.no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    text-align: center;
    color: var(--text-color-secondary);
}

.no-results i {
    font-size: 2rem;
    margin-bottom: 1rem;
}
</style>