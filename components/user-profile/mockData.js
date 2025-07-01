export const userData = {
  name: 'Roshan Kumar',
  email: 'roshan.kumar@gmail.com',
  phone: '+91 98765-43210',
  address: '123 Geeta Colony, Delhi, New Delhi 10001',
  gender: 'Male',
  dob: '1980-01-15',
  occupation: 'Software Engineer',
  income: '8,00,000',
  creditScore: 750,
  documents: [
    { id: 1, name: 'Income Proof.pdf', type: 'Income Proof', uploadDate: '2024-03-15' },
    { id: 2, name: 'Bank Statement.pdf', type: 'Bank Statements', uploadDate: '2024-03-15' },
    { id: 3, name: 'ID Proof.pdf', type: 'Identity Proof', uploadDate: '2024-03-15' },
  ],
};

export const currentApplication = {
  applicationId: 'LA2024001',
  type: 'Personal Loan',
  amount: '50,000',
  status: 'Approved',
  submittedDate: '15-03-2024',
  lastUpdated: '18-03-2024',
  applicantName: 'Roshan Kumar',
  email: 'roshan.kumar@example.com',
  phone: '+91 98765-43210',
  residenceType: 'Apartment',
  bankAllocated: 'ABC Bank',
};

export const pastLoans = [
  { id: 'L2023001', type: 'Car Loan', amount: '1,00,000', status: 'Closed', startDate: '15-12-2023', endDate: '25-03-2023' },
  { id: 'L2022001', type: 'Personal Loan', amount: '1,50,000', status: 'Closed', startDate: '10-09-2022', endDate: '10-11-2022' },
];