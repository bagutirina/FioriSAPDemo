export const uiCorrectionMockData = {
  general: {
    Belegart: 'Entlastungsbetrag',
  },
  pages: [
    {
      image: 'page1.png',
      'IK-Nr.': { value: '500818075', highlight: false },
      Datum: { value: '17.07.2025', highlight: false },
      Rechnungsnr: { value: '2519175', highlight: false },
      tables: [
        {
          rows: [
            ['Position', 'Start', 'Ende', 'Anzahl', 'Preis'],
            ['Besorgung VO', '13.06.2025', '13.06.2025', '2', '60,00€'],
          ],
          highlights: [[true, false, false, false, true]],
        },
      ],
    },
    {
      image: 'page2.png',
      'IK-Nr.': { value: '700123456', highlight: false },
      Datum: { value: '23.09.2025', highlight: false },
      Rechnungsnr: { value: '25/913', highlight: true },
      Bearbeiter: { value: 'Müller', highlight: false },
      tables: [
        {
          rows: [
            ['Position', 'Start', 'Ende', 'Anzahl', 'Preis'],
            ['Pflege Betreuung', '01.09.2025', '30.09.2025', '3', '84,00€'],
            ['MvSt 19%', '', '', '', '15,96€'],
            ['Servicepauschale', '01.09.2025', '01.09.2025', '1', '5,00€'],
          ],
          highlights: [
            [false, true, true, false, false],
            [true, false, false, false, false],
            [false, false, false, false, false],
          ],
        },
      ],
    },
  ],
};
