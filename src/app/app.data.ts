export const descriptionExample = `Hello dear purchasing department,

We need three new workstations with the following equipment by 01.02.2025:
- Desks, one of which is height-adjustable
- Trendoffice chairs and lockable roller cabinets
- Three laptops, one with GPU, each with a 3-year warranty
- Two monitors (from 17 inches, up to 100 euros) per person
- 2 Visual Studio Pro licenses (item no. 23412-M-2343) starting from 01.02. or 01.03.
- 1 large shelf (3x2 meters), please including assembly service

Many thanks in advance!`;

export const products: any[] = [
  {
    name: 'Desk',
    date: '01.02.2025',
    amount: '2',
    vendor: 'IKEA',
    warranty: '2 years',
    size: '',
    price: '599',
    material: 'OE10_D1',
    properties: '',
    description: descriptionExample,
    checked: false,
    suppliers: [
      {
        name: 'IKEA Deutschland',
        link: 'https://www.ikea.com',
        image: 'assets/images/ikea.jpg',
      },
      {
        name: 'Home24',
        link: 'https://www.home24.de',
        image: 'assets/images/home24.jpg',
      },
      {
        name: 'Höffner',
        link: 'https://www.hoeffner.de/',
        image: 'assets/images/hoff.jpg',
      },
      {
        name: 'Staples',
        link: 'https://www.staples.de/',
        image: 'assets/images/stapples.jpg',
      },
    ],
  },
  {
    name: 'Desk',
    date: '01.02.2025',
    amount: '2',
    vendor: 'IKEA',
    warranty: '2 years',
    size: '',
    price: '799',
    material: 'OE10_D2',
    properties: 'height-adjustable',
    description: descriptionExample,
    checked: false,
    suppliers: [
      {
        name: 'IKEA Deutschland',
        link: 'https://www.ikea.com',
        image: 'assets/images/ikea.jpg',
      },
      {
        name: 'OTTO',
        link: 'https://www.otto.de',
        image: 'assets/images/otto.png',
      },
      {
        name: 'Möbel Martin',
        link: 'https://www.moebel-martin.de',
        image: 'assets/images/mobel.jpg',
      },
      {
        name: 'Habitat',
        link: 'https://www.habitat.de',
        image: 'assets/images/habitat.png',
      },
      {
        name: 'Höffner',
        link: 'https://www.hoeffner.de',
        image: 'assets/images/hoff.jpg',
      },
      {
        name: 'Staples',
        link: 'https://www.staples.de',
        image: 'assets/images/stapples.jpg',
      },
    ],
  },
  {
    name: 'Chair',
    date: '01.02.2025',
    amount: '3',
    vendor: 'Trendoffice',
    warranty: '',
    size: '',
    price: '399',
    material: 'OE10_C3',
    properties: '',
    description: descriptionExample,
    checked: false,
    suppliers: [
      {
        name: 'Staples',
        link: 'https://www.staples.de',
        image: 'assets/images/stapples.jpg',
      },
      {
        name: 'Office Discount',
        link: 'https://www.office-discount.de',
        image: 'assets/images/office.jpg',
      },
    ],
  },
  {
    name: 'Roller Cabinet',
    date: '01.02.2025',
    amount: '3',
    vendor: 'Trendoffice',
    warranty: '',
    size: '',
    price: '899',
    material: 'OE10_CB4',
    properties: 'lockable',
    description: descriptionExample,
    checked: false,
    suppliers: [
      {
        name: 'Staples',
        link: 'https://www.staples.de',
        image: 'assets/images/stapples.jpg',
      },
      {
        name: 'Schäfer Shop',
        link: 'https://www.schaefer-shop.de',
        image: 'assets/images/schafer.png',
      },
    ],
  },
  {
    name: 'Laptop',
    date: '01.02.2025',
    amount: '2',
    vendor: 'Dell',
    warranty: '3 years',
    size: '',
    price: '1450',
    material: 'HW10_L1',
    properties: '',
    description: descriptionExample,
    checked: false,
    suppliers: [
      {
        name: 'Computacenter',
        link: 'https://www.computacenter.com',
        image: 'assets/images/computa.jpg',
      },
      {
        name: 'Bechtle',
        link: 'https://www.bechtle.com',
        image: 'assets/images/bechtle.jpg',
      },
    ],
  },
  {
    name: 'Laptop',
    date: '01.02.2025',
    amount: '1',
    vendor: 'Dell',
    warranty: '3 years',
    size: '',
    price: '1850',
    material: 'HW10_L1',
    properties: 'with GPU',
    description: descriptionExample,
    checked: false,
    suppliers: [
      {
        name: 'Computacenter',
        link: 'https://www.computacenter.com',
        image: 'assets/images/computa.jpg',
      },
      {
        name: 'Bechtle',
        link: 'https://www.bechtle.com',
        image: 'assets/images/bechtle.jpg',
      },
    ],
  },
  {
    name: 'Monitor',
    date: '01.02.2025',
    amount: '6',
    vendor: 'Dell',
    warranty: '4 years',
    size: 'more than 17 inch',
    price: '100',
    material: '',
    properties: '',
    description: descriptionExample,
    checked: false,
    suppliers: [
      {
        name: 'MediaMarkt',
        link: 'https://www.mediamarkt.de',
        image: 'assets/images/mediamarket.jpg',
      },
      {
        name: 'Saturn',
        link: 'https://www.saturn.de',
        image: 'assets/images/saturn.png',
      },
    ],
  },
  {
    name: 'Visual Studio License',
    date: '01.02.2025',
    amount: '1',
    vendor: 'Microsoft',
    warranty: '',
    size: '',
    price: '199',
    material: '23412-M-2343',
    properties: '',
    description: descriptionExample,
    checked: false,
    suppliers: [
      {
        name: 'SoftwareONE',
        link: 'https://www.softwareone.com',
        image: 'assets/images/softerone.png',
      },
      {
        name: 'Compuwave',
        link: 'https://www.compuwave.de',
        image: 'assets/images/compuwave.jpg',
      },
    ],
  },
  {
    name: 'Visual Studio Pro License',
    date: '01.02.2025',
    amount: '1',
    vendor: 'Microsoft',
    warranty: '',
    size: '',
    price: '299',
    material: '23412-M-2343',
    properties: '',
    description: descriptionExample,
    checked: false,
    suppliers: [
      {
        name: 'SoftwareONE',
        link: 'https://www.softwareone.com',
        image: 'assets/images/softerone.png',
      },
      {
        name: 'Compuwave',
        link: 'https://www.compuwave.de',
        image: 'assets/images/compuwave.jpg',
      },
    ],
  },
  {
    name: 'Shelf - large',
    date: '01.02.2025',
    amount: '1',
    vendor: '',
    warranty: '',
    size: '3x2 Meter',
    price: '',
    material: '',
    properties: 'Including assembly service',
    description: descriptionExample,
    checked: false,
    rowSpan: 2,
    suppliers: [
      {
        name: 'Hornbach',
        link: 'https://www.hornbach.de',
        image: 'assets/images/horn.png',
      },
      {
        name: 'OBI',
        link: 'https://www.obi.de',
        image: 'assets/images/obi.png',
      },
    ],
  },
  {
    name: 'Assembly Service',
    date: '01.02.2025',
    amount: '1',
    vendor: '',
    warranty: '',
    size: '',
    price: '',
    material: '',
    properties: '',
    isRowSpanChild: true,
    suppliers: [
      {
        name: 'MyHammer',
        link: 'https://www.my-hammer.de',
        image: 'assets/images/hammer.png',
      },
      {
        name: 'TaskRabbit',
        link: 'https://www.taskrabbit.de',
        image: 'assets/images/task.png',
      },
    ],
  },
];

export const categories: any[] = [
  {
    id: 1,
    name: 'Office Equipment',
  },
  {
    id: 2,
    name: 'Hardware',
  },
  {
    id: 3,
    name: 'Software',
  },
  {
    id: 4,
    name: 'Others',
  },
];

export const chartData: any[] = [
  { name: 'Desk', count: 50, percent: 20 },
  { name: 'Desk', count: 70, percent: 30 },
  { name: 'Chair', count: 120, percent: 30 },
  { name: 'Roller cabinet', count: 150, percent: 30 },
  { name: 'Laptop', count: 200, percent: 40 },
  { name: 'Laptop', count: 250, percent: 50 },
  { name: 'Visual Studio Licence', count: 200, percent: 10 },
  { name: 'Visual Studio Pro Licence', count: 260, percent: 20 },
  { name: 'Networking Equipment', count: 270, percent: 30 },
  { name: 'Assembly Service', count: 100, percent: 20 },
  { name: 'Office Software Subscription', count: 150, percent: 30 },
  { name: 'Keyboard', count: 120, percent: 30 },
  { name: 'Monitor', count: 100, percent: 20 },
];

export const warranties = [
  'Under 1 year',
  '1 year',
  '2 years',
  '3 years',
  '4 years',
  'Over 4 years',
];

export const prices = [
  'Under 50 EUR',
  '50 - 100 EUR',
  '100 - 500 EUR',
  '500 - 750 EUR',
  '750 - 1000 EUR',
  'Over 1000 EUR',
];
