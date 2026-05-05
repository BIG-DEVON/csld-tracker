export type KPIStatus = "Pending" | "In Progress" | "Completed";
export type KPIDifficulty = "Low" | "Medium" | "High";

export interface KPIItem {
  id: string;
  category: string;
  kpi: string;
  diff: KPIDifficulty;
  synergy: string;
  limitations: string;
  status: KPIStatus;
  suggestedAction: string;
  reminderDate?: string; 
  notes?: string;
}

export const initialKpiData: KPIItem[] = [
  // 1. Strategic Communication
  { 
    id: "SC-1", 
    category: "Strategic Communication", 
    kpi: "2026 Departmental Communication Strategy developed and submitted for approval by Q2 2026.", 
    diff: "Medium", 
    synergy: "OES", 
    limitations: "Delayed approvals, inadequate data, limited manpower, and changing organisational priorities.", 
    status: "In Progress",
    suggestedAction: "Draft initial framework and circulate to OES for preliminary review to avoid late-stage bottlenecks."
  },
  { 
    id: "SC-2", 
    category: "Strategic Communication", 
    kpi: "Annual integrated content plan for media, website, and stakeholder engagement developed and approved by Q2.", 
    diff: "Medium", 
    synergy: "OES", 
    limitations: "Delayed inputs from stakeholders and departments, limited content resources, and inadequate manpower.", 
    status: "Pending",
    suggestedAction: "Set strict internal deadlines for departments to submit content requirements."
  },
  { 
    id: "SC-3", 
    category: "Strategic Communication", 
    kpi: "100% communication coverage of all relevant global observance days identified in the annual communication calendar.", 
    diff: "High", 
    synergy: "PSS", 
    limitations: "Limited budget, delayed approvals, and limited staff capacity.", 
    status: "Pending",
    suggestedAction: "Prioritize top 5 global days and pre-design templates to save time."
  },
  { 
    id: "SC-4", 
    category: "Strategic Communication", 
    kpi: "Minimum of five functional communication outlets established and actively managed for internal and external stakeholder engagement annually.", 
    diff: "High", 
    synergy: "OES", 
    limitations: "Limited budget, inadequate technology/ tools, outdated stakeholder data, low stakeholder responsiveness, and limited manpower.", 
    status: "Completed",
    suggestedAction: "Conduct quarterly audits on engagement metrics to ensure outlets remain active."
  },
  
  // 2. Stakeholder Database
  { 
    id: "SD-1", 
    category: "Stakeholder Database", 
    kpi: "Comprehensive internal stakeholder database developed, populated, and updated quarterly with 100% priority contacts captured.", 
    diff: "Medium", 
    synergy: "OES", 
    limitations: "Incomplete or outdated information, delayed data submission, frequent changes in members, limited technical resources, and inadequate manpower.", 
    status: "In Progress",
    suggestedAction: "Implement a standardized digital form for member updates."
  },
  { 
    id: "SD-2", 
    category: "Stakeholder Database", 
    kpi: "Comprehensive external stakeholder database developed, populated, and updated quarterly with 100% priority stakeholder categories captured.", 
    diff: "Medium", 
    synergy: "OES", 
    limitations: "Incomplete or outdated contact details, delayed responses, data privacy concerns and limited manpower/ resources.", 
    status: "Pending",
    suggestedAction: "Consult legal on data privacy compliance before mass data collection."
  },
  
  // 3. Corporate Publications
  { 
    id: "CP-1", 
    category: "Corporate Publications", 
    kpi: "10 editions of Inside JRB produced and circulated to staff on or before the 5th day of each publication month.", 
    diff: "Low", 
    synergy: "ALL DEPTS.", 
    limitations: "Late content submissions, limited design/ resources, delayed approvals, and low staff engagement/ feedback.", 
    status: "In Progress",
    suggestedAction: "Create a recurring automated email reminder for department heads regarding content submission."
  },
  { 
    id: "CP-2", 
    category: "Corporate Publications", 
    kpi: "One edition of JRB Annual Report produced, published, and circulated to stakeholders in Q1 and Q4 2026.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Late content submissions, budget constraints, delayed approvals, and limited production/ design capacity.", 
    status: "Pending",
    suggestedAction: "Begin data collation for the Annual Report one full quarter in advance."
  },
  { 
    id: "CP-3", 
    category: "Corporate Publications", 
    kpi: "JRB Revenue Digest produced, published, and circulated to stakeholders in Q4 2026.", 
    diff: "Medium", 
    synergy: "RPC", 
    limitations: "Delayed data/content submissions, inaccurate or incomplete information, budget constraints, delayed approvals, and limited production capacity.", 
    status: "Pending",
    suggestedAction: "Schedule early alignment meeting with RPC to secure data delivery dates."
  },
  { 
    id: "CP-4", 
    category: "Corporate Publications", 
    kpi: "The JRB History Book produced, published, and circulated to stakeholders by Q4 2026.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Incomplete historical records, delayed content submissions, budget constraints, delayed approvals, and limited research/production capacity.", 
    status: "Pending",
    suggestedAction: "Assign a dedicated archivist role or intern to begin locating historical records immediately."
  },
  { 
    id: "CP-5", 
    category: "Corporate Publications", 
    kpi: "One commemorative Journal for the first Executive Secretary of JRB produced, published, and circulated by Q4 2026.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Delayed submissions from contributors, incomplete records/materials, budget constraints and delayed approvals.", 
    status: "Pending",
    suggestedAction: "Identify key contributors early and secure commitments for articles."
  },
  { 
    id: "CP-6", 
    category: "Corporate Publications", 
    kpi: "The JRB Members’ Handbook produced, published, and circulated to members by Q3 2026.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Incomplete or outdated information, delayed submissions, budget constraints, delayed approvals, and limited production capacity.", 
    status: "Completed",
    suggestedAction: "Set a calendar reminder for an annual review of handbook relevance."
  },
  { 
    id: "CP-7", 
    category: "Corporate Publications", 
    kpi: "Phase I implementation of the JRB electronic and physical library completed, including framework development, resource acquisition, and initial repository setup by Q4 2026.", 
    diff: "High", 
    synergy: "ALL DEPTS.", 
    limitations: "Limited budget, inadequate space, insufficient ICT infrastructure, delayed procurement processes, limited staffing, and difficulty sourcing materials.", 
    status: "Pending",
    suggestedAction: "Draft a phased procurement plan focusing on critical ICT infrastructure first."
  },
  { 
    id: "CP-8", 
    category: "Corporate Publications", 
    kpi: "100% of approved JRB tax publications produced, published and circulated electronically and in print throughout the year.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Late content submissions, budget constraints, delayed approvals, limited production capacity, competing priorities, and distribution/logistics challenges.", 
    status: "In Progress",
    suggestedAction: "Shift heavy focus to electronic circulation to mitigate print budget constraints."
  },

  // 4. Digital Communications and Stakeholder Engagement
  { 
    id: "DC-1", 
    category: "Digital Communications", 
    kpi: "JRB website updated regularly with 100% of approved content published throughout the year.", 
    diff: "High", 
    synergy: "ALL DEPTS.", 
    limitations: "Delayed content submissions, technical issues/downtime, limited website management capacity, inadequate funding for upgrades, cybersecurity risks, and slow approval processes.", 
    status: "In Progress",
    suggestedAction: "Schedule a comprehensive security audit of the current web infrastructure."
  },
  { 
    id: "DC-2", 
    category: "Digital Communications", 
    kpi: "Consistent strategic communication maintained across all JRB digital platforms throughout the year, resulting in sustained visibility, accessibility, and positive online presence in 2026.", 
    diff: "High", 
    synergy: "RPC/SMD", 
    limitations: "Limited budget, inadequate manpower, negative public perception and inconsistent content flow.", 
    status: "In Progress",
    suggestedAction: "Develop a crisis communication protocol for rapid response to negative sentiment."
  },
  { 
    id: "DC-3", 
    category: "Digital Communications", 
    kpi: "100% of approved JRB programmes and strategic initiatives promoted and disseminated through digital channels throughout the year.", 
    diff: "High", 
    synergy: "ALL DEPTS.", 
    limitations: "Delayed information flow, inconsistent content submissions, limited manpower, technical/platform issues.", 
    status: "Pending",
    suggestedAction: "Integrate a content request portal for departments to streamline information flow."
  },
  { 
    id: "DC-4", 
    category: "Digital Communications", 
    kpi: "Centralized digital repository established and updated regularly with 100% of approved JRB publications, reports, and institutional resources uploaded throughout the year.", 
    diff: "Medium", 
    synergy: "SMD", 
    limitations: "Incomplete records, limited storage/technology resources, delayed document submissions, data security concerns, limited manpower, and poor document organisation.", 
    status: "Pending",
    suggestedAction: "Define clear taxonomy and folder structures before migrating any documents."
  },
  { 
    id: "DC-5", 
    category: "Digital Communications", 
    kpi: "100% monitoring of relevant media mentions and stakeholder enquiries, with timely responses provided across digital platforms throughout the year.", 
    diff: "High", 
    synergy: "ALL DEPTS.", 
    limitations: "Limited monitoring tools/resources, delayed internal feedback, high volume of enquiries, limited manpower, misinformation online, and slow approval processes for responses.", 
    status: "In Progress",
    suggestedAction: "Implement social listening tools (e.g., Hootsuite/Brandwatch) to automate monitoring."
  },
  { 
    id: "DC-6", 
    category: "Digital Communications", 
    kpi: "Stakeholder mailing lists and digital contact databases developed, maintained, and updated regularly to support 100% dissemination of approved electronic JRB publications and updates throughout the year.", 
    diff: "Medium", 
    synergy: "SMD", 
    limitations: "Incomplete or outdated contact information, delayed submissions, data privacy concerns, frequent stakeholder changes, limited manpower, and technical/database issues.", 
    status: "Completed",
    suggestedAction: "Regularly scrub the lists to remove hard bounces and inactive contacts."
  },
  { 
    id: "DC-7", 
    category: "Digital Communications", 
    kpi: "Approved webinars, virtual stakeholder forums, and learning sessions coordinated successfully through digital platforms and the JRB Training Portal throughout the year.", 
    diff: "High", 
    synergy: "ALL DEPTS.", 
    limitations: "Technical disruptions, poor internet connectivity, low participant turnout, limited budget, scheduling conflicts, and limited manpower/support capacity.", 
    status: "Pending",
    suggestedAction: "Mandate pre-event technical rehearsals for all virtual speakers."
  },
  { 
    id: "DC-8", 
    category: "Digital Communications", 
    kpi: "100% digital participation support provided for all approved hybrid meetings, conferences, and events throughout the year.", 
    diff: "Medium", 
    synergy: "SMD", 
    limitations: "Technical failures, poor internet connectivity, inadequate equipment, limited manpower, short notice arrangements, and power disruptions.", 
    status: "Pending",
    suggestedAction: "Secure backup internet solutions (e.g., Starlink or dedicated 5G routers) for hybrid events."
  },

  // 5. Public Relations and Stakeholder Feedback Management
  { 
    id: "PR-1", 
    category: "Public Relations & Feedback", 
    kpi: "Minimum of three Board meetings and all approved Committee meetings successfully coordinated annually.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Delayed approvals, budget constraints, travel/logistics challenges, and short notice changes.", 
    status: "Pending",
    suggestedAction: "Lock in dates for all three board meetings at the start of the year."
  },
  { 
    id: "PR-2", 
    category: "Public Relations & Feedback", 
    kpi: "Minimum of two strategic stakeholder engagements successfully coordinated annually to strengthen collaboration and institutional relationships.", 
    diff: "High", 
    synergy: "ALL DEPTS.", 
    limitations: "Delayed approvals, limited budget, low stakeholder responsiveness, competing priorities, and logistical challenges.", 
    status: "Pending",
    suggestedAction: "Identify target stakeholders immediately and begin soft outreach."
  },
  { 
    id: "PR-3", 
    category: "Public Relations & Feedback", 
    kpi: "Minimum of one annual media consultation/forum conducted, with additional sessions held as required.", 
    diff: "High", 
    synergy: "ALL DEPTS.", 
    limitations: "Delayed approvals, limited budget, low stakeholder turnout, competing priorities.", 
    status: "Completed",
    suggestedAction: "Review post-forum feedback to improve the structure for next year."
  },
  { 
    id: "PR-4", 
    category: "Public Relations & Feedback", 
    kpi: "Outreach visits and courtesy engagements conducted in at least one State per region, with Ex-Officio member engagements completed during Q3 and Q4 2026.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Budget constraints, travel/logistical challenges, delayed approvals, security concerns, and competing official priorities.", 
    status: "Pending",
    suggestedAction: "Conduct a rapid security assessment of target regions before finalizing travel plans."
  },
  { 
    id: "PR-5", 
    category: "Public Relations & Feedback", 
    kpi: "Institutional visibility maintained through participation in approved external functions and implementation of strategic public relations initiatives throughout the year.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Limited budget, delayed information, competing priorities, and limited invitations/access to key events.", 
    status: "In Progress",
    suggestedAction: "Actively pitch JRB executives as speakers for industry conferences."
  },
  { 
    id: "PR-6", 
    category: "Public Relations & Feedback", 
    kpi: "100% coordination of approved media relations activities, press briefings, interviews, and public communication engagements as required throughout the year.", 
    diff: "Medium", 
    synergy: "OES", 
    limitations: "Delayed approvals, limited media interest, short notice requests, inaccurate or late information, limited manpower, and technical/platform challenges.", 
    status: "Pending",
    suggestedAction: "Develop a 'media kit' containing pre-approved fast facts and executive bios."
  },
  { 
    id: "PR-7", 
    category: "Public Relations & Feedback", 
    kpi: "Stakeholder feedback for 100% of JRB meetings, engagements, and forums collected, analyzed, and reported within two weeks of each event throughout the year.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Low response rates, incomplete feedback data, delayed stakeholder responses, limited manpower, inadequate feedback tools, and poor follow-up.", 
    status: "Pending",
    suggestedAction: "Keep feedback surveys under 5 questions to increase response rates."
  },
  { 
    id: "PR-8", 
    category: "Public Relations & Feedback", 
    kpi: "100% coordination of approved annual stakeholder and members’ appreciation, recognition, ceremonial, and networking engagements within Q4 2026.", 
    diff: "High", 
    synergy: "ALL DEPTS.", 
    limitations: "Budget constraints, delayed approvals, limitations to information, logistical challenges, and limited manpower.", 
    status: "Pending",
    suggestedAction: "Explore digital/virtual appreciation models to save on physical event costs."
  },
  { 
    id: "PR-9", 
    category: "Public Relations & Feedback", 
    kpi: "100% implementation of approved physical sensitization and capacity-building programmes for members, including the IBFD training on HNWIs, within the 2026 training calendar.", 
    diff: "Medium", 
    synergy: "ALL DEPTS.", 
    limitations: "Budget constraints, late nominations, logistical challenges, delayed approvals, limited participant availability, and short notice changes.", 
    status: "Pending",
    suggestedAction: "Finalize training calendar and issue call for nominations immediately."
  },

  // 6. Protocol Services
  { 
    id: "PS-1", 
    category: "Protocol Services", 
    kpi: "100% protocol and logistics support provided for all JRB stakeholder engagements and high-level visits throughout the year.", 
    diff: "High", 
    synergy: "ALL DEPTS.", 
    limitations: "Short notice arrangements, budget constraints, logistical challenges, delayed information, and limited manpower.", 
    status: "In Progress",
    suggestedAction: "Maintain a standby 'rapid response' protocol plan for short-notice VIP visits."
  },

  // 7. Reporting & Documentation
  { 
    id: "RD-1", 
    category: "Reporting & Documentation", 
    kpi: "100% submission of monthly, biannual, and annual departmental performance reports within approved timelines.", 
    diff: "Medium", 
    synergy: "OES", 
    limitations: "Time constraints, limited manpower, and late access to information.", 
    status: "In Progress",
    suggestedAction: "Implement a shared dashboard where departments update their metrics in real-time."
  },
  { 
    id: "RD-2", 
    category: "Reporting & Documentation", 
    kpi: "100% of reports on meetings, official events and protocol activities prepared and submitted within two weeks of each activity throughout the year.", 
    diff: "Medium", 
    synergy: "OES", 
    limitations: "Incomplete event details, limited manpower, competing priorities, and delayed inputs from officers.", 
    status: "Pending",
    suggestedAction: "Mandate the use of a standardized event reporting template to speed up drafting."
  },
  { 
    id: "RD-3", 
    category: "Reporting & Documentation", 
    kpi: "100% of reports on sensitisation, webinars and VLS prepared and submitted within two weeks of each activity throughout the year.", 
    diff: "Low", 
    synergy: "OES", 
    limitations: "Tight reporting timelines, limited manpower, and competing priorities.", 
    status: "Completed",
    suggestedAction: "Use AI transcription tools to rapidly draft summaries of virtual learning sessions."
  }
];