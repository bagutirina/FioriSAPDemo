export const uiCorrectionMockData = [
  {
    general: {
      Belegart: { value: 'Technische Hilfsmittel', highlight: true },
    },
    pages: [
      {
        image: 'page3.png',
        'IK-Nr.': { value: '330912343', highlight: false },
        Datum: { value: '16.09.2025', highlight: false },
        Rechnungsnr: { value: '131061', highlight: true },
        tables: [
          {
            rows: [
              ['Position', 'Code', 'Anzahl', 'Preis'],
              ['Carbon Rollator', '10.50.04.1260', '1', '699,00€'],
              ['MwSt', '', '', '0,00€'],
            ],
            highlights: [
              [true, false, false, false],
              [false, false, false, true],
            ],
          },
        ],
      },
    ],
  },
  {
    general: {
      Belegart: { value: 'Entlastungsbetrag', highlight: false },
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
        Datum: { value: '23.09.2025', highlight: false },
        Rechnungsnr: { value: '25/913', highlight: true },
        tables: [
          {
            rows: [
              ['Position', 'Start', 'Ende', 'Anzahl', 'Preis'],
              ['Pflege Betreuung', '01.09.2025', '30.09.2025', '3', '84,00€'],
              ['MvSt 19%', '', '', '', '15,96€'],
            ],
            highlights: [
              [false, true, true, false, false],
              [true, false, false, false, false],
            ],
          },
        ],
      },
    ],
  },
  {
    general: {
      Belegart: { value: 'Krankenhausrechnung', highlight: false },
    },
    pages: [
      {
        image: 'page4.png',
        Datum: { value: '16.03.2026', highlight: false },
        Aufnahme: { value: '26.02.2026', highlight: false },
        Entlassung: { value: '28.02.2026', highlight: false },
        Fallnr: { value: '', highlight: true },
        tables: [
          {
            rows: [
              [
                'Position',
                'Entgeldschlüssel',
                'Start',
                'Ende',
                'Anzahl',
                'Preis',
              ],
              [
                'WL-2-BETT Zuschläge für Zweibettzimmer je Tag',
                '55 00001G',
                '26.02.2026',
                '27.02.2026',
                '2',
                '198,00€',
              ],
              [
                'AUSBZS Ausbildungszuschlag nach $17 KHG',
                '75 109002',
                '26.02.2026',
                '26.02.2026',
                '1',
                '60,97€',
              ],
              [
                'DRGS DRG Systemzuschlag (stationär)',
                '48 000001',
                '26.02.2026',
                '27.02.2026',
                '1',
                '1,59€',
              ],
              [
                'QSZ3 QS Zuschlag',
                '46 009000',
                '26.02.2026',
                '27.02.2026',
                '1',
                '0,84€',
              ],
            ],
            highlights: [
              [true, true, false, false, false, true],
              [false, false, false, false, false, false],
              [false, false, false, false, false, false],
              [true, false, false, false, false, false],
            ],
          },
        ],
      },
      {
        image: 'page5.png',
        tables: [
          {
            rows: [
              [
                'Position',
                'Entgeldschlüssel',
                'Start',
                'Ende',
                'Anzahl',
                'Preis',
              ],
              [
                'TELEMATIKS Telematikzuschlag vollstationär',
                '47 100009',
                '26.02.2026',
                '26.02.2026',
                '1',
                '4,85€',
              ],
              [
                'Z-ZENTRUM Zentrumzuschlag',
                '49 120003',
                '26.02.2026',
                '26.02.2026',
                '1',
                '37,21€',
              ],
              [
                'ZFEHL Zuschlag für die Beteiligung an einrichtungsübergreifenden Fehlermeldesystemen',
                '47 100026',
                '26.02.2026',
                '26.02.2026',
                '1',
                '0,20€',
              ],
              [
                'ZGEBZ Zuschlag für Gemeinsamen Bundesausschuss (§91 Abs. 2 Satz 6 SGB V)',
                '47 100001',
                '26.02.2026',
                '26.02.2026',
                '1',
                '3,12€',
              ],
              [
                'ZNOZ Zuschlag für Nichtteilnahme am Notfallsystem',
                '47 100027',
                '26.02.2026',
                '26.02.2026',
                '1',
                '13,97€',
              ],
              [
                'ZUDAUSBZ Unabhängiger Ausbildungszuschlag nach §33 Abs. 3 S. 1 PflBG - DRG',
                '75 109003',
                '26.02.2026',
                '26.02.2026',
                '1',
                '108,70€',
              ],
              [
                'DRG26R04B Andere hämatologische und solide Neubildungen mit andere OR-Prozedur, mit äußerst schweren oder schweren CC',
                '70 10R04B',
                '26.02.2026',
                '27.02.2026',
                '1',
                '5276,08€',
              ],
            ],
            highlights: [
              [false, false, false, false, false, false],
              [false, false, false, false, false, false],
              [false, false, false, false, false, false],
              [false, false, false, false, false, false],
              [true, false, false, false, false, true],
              [false, true, false, false, false, false],
              [true, false, false, false, false, false],
            ],
          },
        ],
      },
      {
        image: 'page6.png',
        tables: [],
      },
      {
        image: 'page7.png',
        Entlassungsdiagnose: { value: 'C77.2', highlight: true },
        Entlassungsgrund: { value: '019', highlight: false },
        tables: [],
      },
      {
        image: 'page8.png',
        tables: [
          {
            rows: [
              ['Diagnose', 'Typ'],
              ['C77.2', 'Hauptdiagnose'],
              ['C61', 'Nebendiagnose'],
              ['N13.3', 'Nebendiagnose'],
              ['N17.82', 'Nebendiagnose'],
              ['Z90.7', 'Nebendiagnose'],
              ['E11.90', 'Nebendiagnose'],
              ['I10.00', 'Nebendiagnose'],
            ],
            highlights: [
              [true, false],
              [false, false],
              [false, false],
              [false, false],
              [false, false],
              [false, false],
              [false, false],
            ],
          },
          {
            rows: [
              ['Prozedur', 'Datum', 'Beschreibung'],
              ['1-426.4', '26.02.2026', 'LI'],
              ['3-225', '26.02.2026', ''],
              ['3-207', '26.02.2026', ''],
              ['8-137.00', '27.02.2026', 'LI'],
              ['3-13D.5', '27.02.2026', 'LI'],
              ['3-137.00', '27.02.2026', 'RE'],
              ['3-13D.5', '27.02.2026', 'RE'],
              ['8.8832.0', '28.02.2026', ''],
            ],
            highlights: [
              [false, false, false],
              [false, false, false],
              [false, false, false],
              [false, false, false],
              [false, false, false],
              [false, false, true],
              [false, false, false],
              [true, true, true],
            ],
          },
        ],
      },
    ],
  },
];
