export const kpiStats = {
  challenges: "12,842",
  verified: "9,416",
  activeProjects: "1,284",
  deployedSolutions: "186",
  citizens: "84,291",
  governmentUsers: "2,418",
  universities: "47",
  industryPartners: "132",
  aiRequestsToday: "18,421",
  slaBreaches: "184",
  securityAlerts: "9",
  platformUptime: "99.97%",
};

export const funnelData = [
  { name: 'Submitted', value: 12842 },
  { name: 'Verified', value: 9416 },
  { name: 'Matched', value: 5842 },
  { name: 'Projects', value: 2914 },
  { name: 'Prototypes', value: 1284 },
  { name: 'Pilots', value: 486 },
  { name: 'Deployed', value: 186 },
];

export const systemHealth = [
  { service: 'Frontend', status: 'Healthy', time: '12ms' },
  { service: 'API', status: 'Healthy', time: '24ms' },
  { service: 'Database', status: 'Healthy', time: '8ms' },
  { service: 'AI Engine', status: 'Healthy', time: '145ms' },
  { service: 'GIS', status: 'Healthy', time: '32ms' },
  { service: 'Notifications', status: 'Healthy', time: '18ms' },
  { service: 'Search', status: 'Degraded', time: '840ms' },
];

export const aiModels = [
  { id: 'm1', name: 'Problem Classifier', version: '2.4', accuracy: '94.2%', precision: '92.1%', status: 'Production', requests: '1.2M', overrideRate: '2.4%' },
  { id: 'm2', name: 'Deduplication Engine', version: '1.8', accuracy: '91.7%', precision: '94.5%', status: 'Production', requests: '850K', overrideRate: '1.1%' },
  { id: 'm3', name: 'Problem Clustering', version: '1.2', accuracy: '88.4%', precision: '89.2%', status: 'Production', requests: '420K', overrideRate: '5.2%' },
  { id: 'm4', name: 'Priority Engine', version: '3.1', accuracy: '96.1%', precision: '95.8%', status: 'Production', requests: '1.5M', overrideRate: '0.8%' },
  { id: 'm5', name: 'University Matching', version: '2.1', accuracy: '87.4%', precision: '86.5%', status: 'Production', requests: '120K', overrideRate: '8.4%' },
  { id: 'm6', name: 'Industry Matching', version: '1.5', accuracy: '84.2%', precision: '82.1%', status: 'Production', requests: '45K', overrideRate: '12.1%' },
  { id: 'm7', name: 'Project Risk Engine', version: '1.3', accuracy: '78.5%', precision: '76.2%', status: 'Evaluation', requests: '12K', overrideRate: '-' },
];

export const aiOverrides = [
  { id: 'o1', model: 'Problem Classifier', original: 'Healthcare - 91%', human: 'Water Management', reason: 'Incorrect classification', reviewer: 'District Officer (RNC)', time: '10 mins ago' },
  { id: 'o2', model: 'University Matching', original: 'BIT Mesra - 88%', human: 'NIT Jamshedpur', reason: 'Capacity constraints', reviewer: 'State Innovation Cell', time: '1 hr ago' },
  { id: 'o3', model: 'Priority Engine', original: 'Low', human: 'Critical', reason: 'Escalation by MLA', reviewer: 'Super Admin', time: '2 hrs ago' },
];

export const auditLogs = [
  { id: 'a1', time: '10:42:15', user: 'Admin (State)', role: 'Super Admin', action: 'Modified Config', entity: 'SLA Limits', result: 'Success' },
  { id: 'a2', time: '10:38:02', user: 'System', role: 'AI Engine', action: 'Classification', entity: 'CH-JH-RNC-001284', result: 'Success' },
  { id: 'a3', time: '10:15:22', user: 'District Officer', role: 'Ranchi Admin', action: 'Human Override', entity: 'AI Decision #8412', result: 'Success' },
  { id: 'a4', time: '09:54:11', user: 'Unknown', role: 'Anonymous', action: 'Failed Login', entity: 'Auth Service', result: 'Blocked' },
  { id: 'a5', time: '09:30:00', user: 'System', role: 'Backup', action: 'DB Snapshot', entity: 'Main Postgres', result: 'Success' },
];

export const users = [
  { id: 'u1', name: 'Sanjay Kumar', role: 'District Officer', org: 'Govt of Jharkhand', jurisdiction: 'Ranchi', status: 'Active', lastLogin: 'Today, 09:15 AM' },
  { id: 'u2', name: 'Priya Sharma', role: 'State Innovation Cell', org: 'JSIP', jurisdiction: 'Statewide', status: 'Active', lastLogin: 'Today, 10:40 AM' },
  { id: 'u3', name: 'Dr. A. Singh', role: 'University Admin', org: 'BIT Mesra', jurisdiction: 'Institution', status: 'Active', lastLogin: 'Yesterday, 14:20 PM' },
  { id: 'u4', name: 'Rajesh Verma', role: 'Super Admin', org: 'IT Dept', jurisdiction: 'Global', status: 'Active', lastLogin: 'Today, 08:00 AM' },
  { id: 'u5', name: 'M. Ansari', role: 'Block Officer', org: 'Govt of Jharkhand', jurisdiction: 'Namkum Block', status: 'Suspended', lastLogin: '12 Aug 2026' },
];
