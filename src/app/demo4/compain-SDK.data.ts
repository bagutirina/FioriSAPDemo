export const compainSDKData: any[] = [
  {
    job: 'Software Engineer',
    gender: 'Male',
    birthday: '1988-06-15',
    contract: 'Full-Time',
    icd10Codes: ['E11.9', 'I10'],
    date: '2025-06-10',
    score: 85,
    status: 'Completed',
  },
  {
    job: 'Nurse',
    gender: 'Female',
    birthday: '1992-03-20',
    contract: 'Part-Time',
    icd10Codes: ['F41.1'],
    date: '2025-05-28',
    score: 72,
    status: 'In progress',
  },
  {
    job: 'Accountant',
    gender: 'Female',
    birthday: '1985-12-05',
    contract: 'Contractor',
    icd10Codes: ['E66.9', 'Z71.3'],
    date: '2025-06-01',
    score: 90,
    status: 'Rejected',
  },
  {
    job: 'Driver',
    gender: 'Male',
    birthday: '1978-09-30',
    contract: 'Full-Time',
    icd10Codes: ['S72.0', 'F32.0'],
    date: '2025-06-14',
    score: 64,
    status: 'Completed',
  },
  {
    job: 'Teacher',
    gender: 'Non-Binary',
    birthday: '1990-01-12',
    contract: 'Intern',
    icd10Codes: ['Z00.0'],
    date: '2025-06-12',
    score: 77,
    status: 'In progress',
  },
];

// score range
export const codes = [
  {
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus without complications',
  },
  { code: 'I10', description: 'Essential (primary) hypertension' },
  { code: 'F32.0', description: 'Mild depressive episode' },
  { code: 'J45.909', description: 'Unspecified asthma, uncomplicated' },
  { code: 'M54.5', description: 'Low back pain' },
  {
    code: 'Z00.00',
    description: 'General adult medical exam without abnormal findings',
  },
  { code: 'E66.9', description: 'Obesity, unspecified' },
  { code: 'F41.1', description: 'Generalized anxiety disorder' },
  { code: 'Z71.3', description: 'Dietary counseling and surveillance' },
  { code: 'S72.0', description: 'Fracture of neck of femur' },
  {
    code: 'K21.9',
    description: 'Gastro-esophageal reflux disease without esophagitis',
  },
  { code: 'N39.0', description: 'Urinary tract infection, site not specified' },
  {
    code: 'G43.909',
    description:
      'Migraine, unspecified, not intractable, without status migrainosus',
  },
  { code: 'R51', description: 'Headache' },
  { code: 'L60.0', description: 'Ingrowing nail' },
  { code: 'B34.9', description: 'Viral infection, unspecified' },
  { code: 'Z23', description: 'Encounter for immunization' },
  { code: 'H52.4', description: 'Presbyopia' },
  {
    code: 'J06.9',
    description: 'Acute upper respiratory infection, unspecified',
  },
  {
    code: 'A09',
    description: 'Infectious gastroenteritis and colitis, unspecified',
  },
];

// score range
export const scores = [
  'Unter 20',
  '20 - 40',
  '40 - 60',
  '60 - 80',
  '80 - 90',
  'Über 90',
];
