export const uiCorrectionMockData = [
  {
    general: {
      Belegart: { value: 'Technische Hilfsmittel', highlight: true },
    },
    pages: [
      {
        image: 'page3.png',
        'IK-Nr.': {
          value: '330912343',
          highlight: false,
          sourceRefs: [
            {
              bbox: { x: 0.195, y: 0.316, width: 0.115, height: 0.02 },
            },
          ],
        },
        Datum: {
          value: '16.09.2025',
          highlight: false,
          sourceRefs: [
            {
              bbox: { x: 0.895, y: 0.415, width: 0.09, height: 0.02 },
            },
          ],
        },
        Rechnungsnr: {
          value: '131061',
          highlight: true,
          sourceRefs: [
            {
              bbox: { x: 0.335, y: 0.355, width: 0.1, height: 0.04 },
            },
          ],
        },
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
            sourceRefs: [
              [
                [
                  {
                    bbox: { x: 0.275, y: 0.475, width: 0.195, height: 0.02 },
                  },
                ],
                [
                  {
                    bbox: { x: 0.15, y: 0.475, width: 0.13, height: 0.023 },
                  },
                ],
                [
                  {
                    bbox: { x: 0.12, y: 0.475, width: 0.02, height: 0.023 },
                  },
                ],
                [
                  {
                    bbox: { x: 0.895, y: 0.47, width: 0.07, height: 0.02 },
                  },
                ],
              ],
              [
                [
                  {
                    bbox: { x: 0.702, y: 0.83, width: 0.08, height: 0.02 },
                  },
                ],
                [],
                [],
                [
                  {
                    bbox: { x: 0.712, y: 0.849, width: 0.08, height: 0.02 },
                  },
                ],
              ],
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

        'IK-Nr.': {
          value: '500818075',
          highlight: false,
          sourceRefs: [
            {
              bbox: { x: 0.858, y: 0.235, width: 0.1, height: 0.018 },
            },
          ],
        },

        Datum: {
          value: '17.07.2025',
          highlight: false,
          sourceRefs: [
            {
              bbox: { x: 0.861, y: 0.327, width: 0.1, height: 0.02 },
            },
          ],
        },

        Rechnungsnr: {
          value: '2519175',
          highlight: false,
          sourceRefs: [
            {
              bbox: { x: 0.8798, y: 0.3805, width: 0.08, height: 0.017 },
            },
          ],
        },

        tables: [
          {
            rows: [
              ['Position', 'Start', 'Ende', 'Anzahl', 'Preis'],
              ['Besorgung VO', '13.06.2025', '13.06.2025', '2', '60,00€'],
            ],

            highlights: [[true, false, false, false, true]],

            sourceRefs: [
              [
                // Position
                [
                  {
                    bbox: { x: 0.0936, y: 0.521, width: 0.16, height: 0.018 },
                  },
                ],

                // Start
                [
                  {
                    bbox: { x: 0.52, y: 0.521, width: 0.085, height: 0.018 },
                  },
                ],

                // Ende
                [
                  {
                    bbox: { x: 0.61, y: 0.521, width: 0.085, height: 0.018 },
                  },
                ],

                // Anzahl
                [
                  {
                    bbox: { x: 0.74, y: 0.521, width: 0.02, height: 0.018 },
                  },
                ],

                // Preis
                [
                  {
                    bbox: { x: 0.9, y: 0.521, width: 0.065, height: 0.018 },
                  },
                ],
              ],
            ],
          },
        ],
      },
      {
        image: 'page2.png',

        Datum: {
          value: '23.09.2025',
          highlight: false,
          sourceRefs: [
            {
              bbox: { x: 0.5898, y: 0.2836, width: 0.15, height: 0.022 },
            },
          ],
        },

        Rechnungsnr: {
          value: '25/913',
          highlight: true,
          sourceRefs: [
            {
              bbox: { x: 0.5762, y: 0.2543, width: 0.095, height: 0.022 },
            },
          ],
        },

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

            sourceRefs: [
              [
                // Position
                [
                  {
                    bbox: { x: 0.0878, y: 0.5318, width: 0.145, height: 0.022 },
                  },
                ],

                // Start
                [
                  {
                    bbox: { x: 0.0, y: 0.0, width: 0.0, height: 0.0 },
                  },
                ],

                // Ende
                [
                  {
                    bbox: { x: 0.0, y: 0.0, width: 0.0, height: 0.0 },
                  },
                ],

                // Anzahl
                [
                  {
                    bbox: { x: 0.3178, y: 0.5291, width: 0.04, height: 0.022 },
                  },
                ],

                // Preis
                [
                  {
                    bbox: { x: 0.6839, y: 0.5309, width: 0.065, height: 0.022 },
                  },
                ],
              ],

              [
                // MvSt 19%
                [
                  {
                    bbox: { x: 0.5762, y: 0.5584, width: 0.095, height: 0.022 },
                  },
                ],

                [],
                [],
                [],

                // 15,96€
                [
                  {
                    bbox: { x: 0.6782, y: 0.5584, width: 0.065, height: 0.022 },
                  },
                ],
              ],
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

        Datum: {
          value: '16.03.2026',
          highlight: false,
          sourceRefs: [
            {
              bbox: { x: 0.834, y: 0.35, width: 0.15, height: 0.022 },
            },
          ],
        },

        Aufnahme: {
          value: '26.02.2026',
          highlight: false,
          sourceRefs: [
            {
              bbox: { x: 0.6, y: 0.38, width: 0.13, height: 0.015 },
            },
          ],
        },

        Entlassung: {
          value: '28.02.2026',
          highlight: false,
          sourceRefs: [
            {
              bbox: { x: 0.6, y: 0.395, width: 0.13, height: 0.015 },
            },
          ],
        },

        Fallnr: {
          value: '',
          highlight: true,
          sourceRefs: [
            {
              bbox: { x: 0.1354, y: 0.3449, width: 0.105, height: 0.02 },
            },
          ],
        },

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

            sourceRefs: [
              // ROW 1
              [
                [
                  {
                    bbox: { x: 0.2011, y: 0.615, width: 0.535, height: 0.025 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.7439, y: 0.6095, width: 0.115, height: 0.022 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.1422, y: 0.6355, width: 0.105, height: 0.02 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.2714, y: 0.6365, width: 0.105, height: 0.02 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.6669, y: 0.6325, width: 0.018, height: 0.02 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.9014, y: 0.6245, width: 0.065, height: 0.022 },
                  },
                ],
              ],

              // ROW 2
              [
                [
                  {
                    bbox: { x: 0.2011, y: 0.6746, width: 0.475, height: 0.025 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.6737, y: 0.6696, width: 0.115, height: 0.022 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.1445, y: 0.6986, width: 0.105, height: 0.02 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.1445, y: 0.6986, width: 0.105, height: 0.02 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.6669, y: 0.6906, width: 0.018, height: 0.02 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.9093, y: 0.6876, width: 0.065, height: 0.022 },
                  },
                ],
              ],

              // ROW 3
              [
                [
                  {
                    bbox: { x: 0.2011, y: 0.7377, width: 0.46, height: 0.025 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.6635, y: 0.7377, width: 0.115, height: 0.022 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.1456, y: 0.7618, width: 0.105, height: 0.02 },
                  },
                ],

                [],

                [
                  {
                    bbox: { x: 0.6669, y: 0.7558, width: 0.018, height: 0.02 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.9195, y: 0.7487, width: 0.065, height: 0.022 },
                  },
                ],
              ],

              // ROW 4
              [
                [
                  {
                    bbox: { x: 0.2091, y: 0.8, width: 0.23, height: 0.025 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.668, y: 0.8018, width: 0.115, height: 0.022 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.1467, y: 0.8239, width: 0.105, height: 0.02 },
                  },
                ],

                [],

                [
                  {
                    bbox: { x: 0.6669, y: 0.8179, width: 0.018, height: 0.02 },
                  },
                ],

                [
                  {
                    bbox: { x: 0.9218, y: 0.8149, width: 0.065, height: 0.022 },
                  },
                ],
              ],
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
            sourceRefs: [
              [
                // TELEMATIKS
                [{ bbox: { x: 0.105, y: 0.377, width: 0.435, height: 0.022 } }],
                [{ bbox: { x: 0.67, y: 0.377, width: 0.105, height: 0.022 } }],
                [{ bbox: { x: 0.035, y: 0.397, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.035, y: 0.397, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.615, y: 0.397, width: 0.02, height: 0.02 } }],
                [{ bbox: { x: 0.9, y: 0.397, width: 0.055, height: 0.02 } }],
              ],
              [
                // Z-ZENTRUM
                [{ bbox: { x: 0.105, y: 0.44, width: 0.305, height: 0.022 } }],
                [{ bbox: { x: 0.615, y: 0.44, width: 0.105, height: 0.022 } }],
                [{ bbox: { x: 0.035, y: 0.46, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.035, y: 0.46, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.615, y: 0.46, width: 0.02, height: 0.02 } }],
                [{ bbox: { x: 0.89, y: 0.46, width: 0.065, height: 0.02 } }],
              ],
              [
                // ZFEHL, wrapped on two lines
                [
                  { bbox: { x: 0.105, y: 0.5, width: 0.785, height: 0.022 } },
                  { bbox: { x: 0.105, y: 0.52, width: 0.195, height: 0.022 } },
                ],
                [{ bbox: { x: 0.39, y: 0.52, width: 0.105, height: 0.022 } }],
                [{ bbox: { x: 0.035, y: 0.54, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.035, y: 0.54, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.615, y: 0.54, width: 0.02, height: 0.02 } }],
                [{ bbox: { x: 0.895, y: 0.54, width: 0.06, height: 0.02 } }],
              ],
              [
                // ZGEBZ, wrapped on two lines
                [
                  { bbox: { x: 0.105, y: 0.58, width: 0.78, height: 0.022 } },
                  { bbox: { x: 0.105, y: 0.6, width: 0.125, height: 0.022 } },
                ],
                [{ bbox: { x: 0.18, y: 0.6, width: 0.105, height: 0.022 } }],
                [{ bbox: { x: 0.035, y: 0.62, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.035, y: 0.62, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.615, y: 0.62, width: 0.02, height: 0.02 } }],
                [{ bbox: { x: 0.895, y: 0.62, width: 0.06, height: 0.02 } }],
              ],
              [
                // ZNOZ
                [{ bbox: { x: 0.105, y: 0.66, width: 0.5, height: 0.022 } }],
                [{ bbox: { x: 0.755, y: 0.66, width: 0.105, height: 0.022 } }],
                [{ bbox: { x: 0.035, y: 0.68, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.035, y: 0.68, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.615, y: 0.68, width: 0.02, height: 0.02 } }],
                [{ bbox: { x: 0.89, y: 0.68, width: 0.065, height: 0.02 } }],
              ],
              [
                // ZUDAUSBZ, wrapped
                [
                  { bbox: { x: 0.105, y: 0.725, width: 0.78, height: 0.022 } },
                  { bbox: { x: 0.105, y: 0.745, width: 0.22, height: 0.022 } },
                ],
                [{ bbox: { x: 0.225, y: 0.745, width: 0.105, height: 0.022 } }],
                [{ bbox: { x: 0.035, y: 0.765, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.035, y: 0.765, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.615, y: 0.765, width: 0.02, height: 0.02 } }],
                [{ bbox: { x: 0.885, y: 0.765, width: 0.075, height: 0.02 } }],
              ],
              [
                // DRG26R04B, wrapped
                [
                  { bbox: { x: 0.105, y: 0.805, width: 0.805, height: 0.022 } },
                  { bbox: { x: 0.105, y: 0.825, width: 0.48, height: 0.022 } },
                ],
                [{ bbox: { x: 0.785, y: 0.805, width: 0.105, height: 0.022 } }],
                [{ bbox: { x: 0.035, y: 0.845, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.14, y: 0.845, width: 0.105, height: 0.02 } }],
                [{ bbox: { x: 0.615, y: 0.845, width: 0.02, height: 0.02 } }],
                [{ bbox: { x: 0.875, y: 0.845, width: 0.085, height: 0.02 } }],
              ],
            ],
          },
        ],
      },

      {
        image: 'page6.png',

        Uebertrag: {
          value: '5.706,33',
          highlight: false,
          sourceRefs: [
            {
              bbox: {
                x: 0.805,
                y: 0.32,
                width: 0.125,
                height: 0.022,
              },
            },
          ],
        },

        Endbetrag: {
          value: '5.706,33',
          highlight: true,
          sourceRefs: [
            {
              bbox: {
                x: 0.83,
                y: 0.868,
                width: 0.11,
                height: 0.022,
              },
            },
          ],
        },

        tables: [],
      },

      {
        image: 'page7.png',

        Entlassungsdiagnose: {
          value: 'C77.2',
          highlight: true,
          sourceRefs: [
            {
              bbox: {
                x: 0.64,
                y: 0.902,
                width: 0.065,
                height: 0.022,
              },
            },
          ],
        },

        Entlassungsgrund: {
          value: '019',
          highlight: false,
          sourceRefs: [
            {
              bbox: {
                x: 0.22,
                y: 0.902,
                width: 0.04,
                height: 0.022,
              },
            },
          ],
        },

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

            sourceRefs: [
              [
                // C77.2
                [
                  {
                    bbox: {
                      x: 0.48,
                      y: 0.35,
                      width: 0.07,
                      height: 0.022,
                    },
                  },
                ],

                // Hauptdiagnose
                [
                  {
                    bbox: {
                      x: 0.245,
                      y: 0.35,
                      width: 0.165,
                      height: 0.022,
                    },
                  },
                ],
              ],

              [
                [{ bbox: { x: 0.48, y: 0.375, width: 0.05, height: 0.022 } }],
                [{ bbox: { x: 0.245, y: 0.375, width: 0.165, height: 0.022 } }],
              ],

              [
                [{ bbox: { x: 0.48, y: 0.4, width: 0.065, height: 0.022 } }],
                [{ bbox: { x: 0.245, y: 0.4, width: 0.165, height: 0.022 } }],
              ],

              [
                [{ bbox: { x: 0.48, y: 0.425, width: 0.075, height: 0.022 } }],
                [{ bbox: { x: 0.245, y: 0.425, width: 0.165, height: 0.022 } }],
              ],

              [
                [{ bbox: { x: 0.48, y: 0.45, width: 0.065, height: 0.022 } }],
                [{ bbox: { x: 0.245, y: 0.45, width: 0.165, height: 0.022 } }],
              ],

              [
                [{ bbox: { x: 0.48, y: 0.475, width: 0.075, height: 0.022 } }],
                [{ bbox: { x: 0.245, y: 0.475, width: 0.165, height: 0.022 } }],
              ],

              [
                [{ bbox: { x: 0.48, y: 0.5, width: 0.085, height: 0.022 } }],
                [{ bbox: { x: 0.245, y: 0.5, width: 0.165, height: 0.022 } }],
              ],
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

            sourceRefs: [
              [[], [], []],
              [[], [], []],
              [[], [], []],
              [[], [], []],
              [[], [], []],

              // 3-137.00 / RE
              [
                [
                  {
                    bbox: {
                      x: 0.49,
                      y: 0.64,
                      width: 0.1,
                      height: 0.022,
                    },
                  },
                ],

                [
                  {
                    bbox: {
                      x: 0.245,
                      y: 0.64,
                      width: 0.12,
                      height: 0.022,
                    },
                  },
                ],

                [
                  {
                    bbox: {
                      x: 0.61,
                      y: 0.64,
                      width: 0.035,
                      height: 0.022,
                    },
                  },
                ],
              ],

              [[], [], []],

              // handwritten row at bottom
              [
                [
                  {
                    bbox: {
                      x: 0.49,
                      y: 0.695,
                      width: 0.15,
                      height: 0.032,
                    },
                  },
                ],

                [
                  {
                    bbox: {
                      x: 0.245,
                      y: 0.695,
                      width: 0.155,
                      height: 0.032,
                    },
                  },
                ],

                [
                  {
                    bbox: {
                      x: 0.105,
                      y: 0.695,
                      width: 0.055,
                      height: 0.032,
                    },
                  },
                ],
              ],
            ],
          },
        ],
      },
    ],
  },
];
