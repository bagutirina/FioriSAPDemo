import * as moment from 'moment';

export const compainSDKData: any[] = [
  {
    timestamp: '19.06.2025',
    data: {
      metadata: {
        patient_name: 'Max Mustermann',
        gender: 'Männlich',
        date_of_birth: '12.12.1997',
        document_date: '19.06.2025',
        job: 'Student',
        contract_types: ['RZ A', 'Tarif SG/10'],
      },
      icds: [
        {
          icd_code: 'E66',
          highlighted: true,
          icd_name: 'Adipositas durch übermäßige Kalorienzufuhr',
          evidence: [
            '* Der Patient weist eine deutliche positive Energiebilanz bei gleichzeitigem Bewegungsmangel auf.',
            '* Kein Hinweis auf endokrine oder genetische Ursachen – primär kalorienbedingte Gewichtszunahme.',
            '* BMI von 34,2 kg/m², entsprechende Befunde sprechen für eine alimentäre Adipositas.',
          ],
          priority: 'Primary',
          justification:
            'Die Berichte deuten darauf hin, dass die Gewichtszunahme des Patienten vor allem durch eine chronisch positive Energiebilanz – also eine übermäßige Kalorienzufuhr bei gleichzeitig geringem Energieverbrauch – verursacht wird. Da keine Hinweise auf endokrine oder genetische Ursachen vorliegen, spricht dies für eine alimentäre Adipositas, bei der Überernährung der Hauptfaktor ist. Der BMI von 34,2 kg/m² bestätigt das Vorliegen von Adipositas gemäß der Klassifikation E66.',
          score: 97,
        },
        {
          icd_code: 'J45',
          icd_name: 'Asthma bronchiale',
          evidence: [
            '* In der Auskultation beidseits exspiratorisches Giemen, vereinbar mit einer obstruktiven Ventilationsstörung.',
            '* Es besteht eine bekannte Asthma bronchiale-Diagnose seit dem Kindesalter mit regelmäßiger inhalativer Therapie.',
            '* Im Rahmen einer allergischen Exposition kam es zu einem akuten Asthmaanfall mit Dyspnoe und Hustenreiz.',
          ],
          priority: 'Secondary',
          justification:
            'Die Befunde wie exspiratorisches Giemen und obstruktive Ventilationsstörung in der Auskultation sind typische Zeichen einer Atemwegsobstruktion bei Asthma bronchiale. Die bestehende Diagnose seit dem Kindesalter sowie das Auftreten eines akuten Asthmaanfalls nach allergischer Exposition bestätigen den chronisch-entzündlichen Charakter der Erkrankung. Zusammen mit den Symptomen Dyspnoe und Hustenreiz sprechen diese Befunde klar für die Diagnose J45 – Asthma bronchiale.',
          score: 88,
        },
        {
          icd_code: 'S62.50',
          icd_name: 'Fraktur des Daumens, Teil nicht näher bezeichnet',
          evidence: [
            '* Klinisch bestehen Druckschmerz und Krepitation im Daumengrundglied, der genaue Frakturverlauf ist noch abzuklären.',
            '* Im Röntgenbild zeigte sich eine Fraktur im Bereich des Daumenskeletts',
          ],
          priority: 'Secondary',
          justification:
            'Die klinischen Symptome wie Druckschmerz und Krepitation im Daumengrundglied deuten auf eine knöcherne Verletzung hin, die durch das Röntgenbild bestätigt wird. Die Fraktur im Bereich des Daumenskeletts ohne genauere Lokalisation spricht für eine Daumenfraktur, deren genaue Ausdehnung noch abgeklärt werden muss. Diese Befunde sind typisch für die Diagnose S62.50 – Fraktur des Daumens, Teil nicht näher bezeichnet.',
          score: 93,
        },
      ],
      rejections: [],
      score: '47%',
      evaluation: 'Mit Aufschlag anbieten',
      status: 'Abgeschlossen',
      medication: [
        'Naltrexon/Bupropion 2x2 Tabletten/Tag',
        'Budesonid/Formoterol 1-2 Inhalationen 2x täglich',
      ],
      medical_procedures: [
        'Spirometrie',
        'Peak-Flow-Messung',
        'Inhalative Medikation',
        'Röntgenaufnahme',
      ],
      medically_relevant_information: [
        'Der Patient ist beruflich viel unterwegs und hat dadurch unregelmäßige Ess- und Schlafgewohnheiten.',
        'Ist kürzlich aus Nigeria hergezogen.',
        'Der Antragsteller berichtet von häufigen spontanen Veränderungen in seinem Lebensstil.',
      ],
    },
  },
  {
    timestamp: '12.06.2025',
    data: {
      metadata: {
        patient_name: 'Martina Expemplario',
        gender: 'Weiblich',
        date_of_birth: '21.08.1988',
        document_date: '12.06.2025',
        job: 'Software Developer',
        contract_types: ['RZ A', 'Tarif WG', 'KVS3/EKV2'],
      },
      icds: [
        {
          icd_code: 'S93',
          icd_name: 'Verstauchung und Zerrung einer oder mehrerer Zehen',
          evidence: [
            '* Klinisch zeigt sich eine deutliche Druckempfindlichkeit über dem Grundgelenk der zweiten Zehe, kein Hinweis auf Fraktur im Röntgenbild.',
            '* Die Untersuchung ergab eine Zerrung der Kapselbandstrukturen an der Zehengrundgelenksregion mit eingeschränkter Beweglichkeit.',
          ],
          priority: 'Primary',
          justification:
            'Die beschriebenen Befunde – insbesondere die Druckempfindlichkeit über dem Grundgelenk der zweiten Zehe und die Zerrung der Kapselbandstrukturen bei fehlendem Frakturnachweis im Röntgen – sprechen für eine Verstauchung oder Zerrung der Zehe. Die eingeschränkte Beweglichkeit bestätigt zudem die funktionelle Beeinträchtigung typischerweise bei einer solchen Weichteilverletzung. Somit passen die klinischen und bildgebenden Befunde gut zur Diagnose S93.',
          score: 96,
        },
        {
          icd_code: 'L84',
          icd_name: 'Hühneraugen und Horn- (Haut-) Schwielen',
          evidence: [
            '* Der Patient klagt über lokale Druckschmerzen beim Gehen, verursacht durch eine ausgeprägte Schwielenbildung an der lateralen Fußkante.',
            '* Typische Hyperkeratosen mit zentralem Hornkegel im Bereich der plantaren Vorfußregion sprechen für ein Hühnerauge.',
          ],
          priority: 'Secondary',
          justification:
            'Die beschriebenen lokalen Druckschmerzen und die ausgeprägte Schwielenbildung an der Fußkante deuten auf eine chronische mechanische Reizung hin, die typisch für Hornhautverdickungen ist. Die charakteristischen Hyperkeratosen mit zentralem Hornkegel im Bereich des Vorfußes sind ein typisches Merkmal von Hühneraugen (Clavi). Diese klinischen Zeichen sprechen somit eindeutig für die Diagnose L84 – Hühneraugen und Hornschwielen.',
          score: 99,
        },
      ],
      rejections: [],
      score: '97%',
      evaluation: 'Unkritisch',
      status: 'Abgeschlossen',
      medication: ['Salicylsäure 20% Pflaster'],
      medical_procedures: ['Physiotherapie'],
      medically_relevant_information: [
        'Die Patientin hat in den letzten Jahren keinen Alkohol konsumiert.',
        'Es besteht eine aktive Freizeitgestaltung mit Wandern und Radfahren an den Wochenenden.',
      ],
    },
  },
  {
    timestamp: '12.06.2025',
    data: {
      metadata: {
        patient_name: 'Martha Beih-Spiel',
        gender: 'Weiblich',
        date_of_birth: '03.06.1950',
        document_date: '12.06.2025',
        job: 'Rentner',
        contract_types: ['RZ A', 'RZ TA', 'KVS3/EKV2'],
      },
      icds: [
        {
          icd_code: 'S70.0',
          icd_name: 'Prellung der Hüfte',
          evidence: [
            '* Der Patient berichtet über einen Sturz auf die linke Körperseite mit anschließenden Schmerzen im Bereich der Hüfte.',
            '* Es zeigt sich ein ausgedehntes Hämatom über dem Trochanter major bei intaktem Knochenstatus.',
            '* Sonografisch keine Gelenkbeteiligung, jedoch deutliche Weichteilschwellung im Bereich der lateralen Hüfte.',
          ],
          priority: 'Secondary',
          justification:
            'Die berichteten Schmerzen nach einem Sturz auf die Hüfte sowie das ausgedehnte Hämatom über dem Trochanter major sprechen für eine Weichteilverletzung ohne Knochenbeteiligung. Der intakte Knochenstatus im Röntgenbild und die sonografisch nachgewiesene Weichteilschwellung ohne Gelenkbeteiligung bestätigen das Bild einer Prellung der Hüfte. Diese Befunde sind typisch für die Diagnose S70.0 – Prellung der Hüfte.',
          score: 83,
        },
        {
          icd_code: 'L40',
          icd_name: 'Psoriasis',
          evidence: [
            '* Dermatohistologisch zeigt sich eine Akanthose mit Parakeratose, vereinbar mit einer Psoriasis vulgaris.',
            '* Die Familienanamnese ist positiv für Psoriasis, erste Symptome traten im dritten Lebensjahrzehnt auf.',
          ],
          priority: 'Secondary',
          justification:
            'Die dermatohistologischen Befunde mit Akanthose und Parakeratose sind charakteristisch für die Psoriasis vulgaris und bestätigen die klinische Diagnose. Zudem spricht die positive Familienanamnese zusammen mit dem typischen Erkrankungsbeginn im dritten Lebensjahrzehnt für eine genetisch und immunologisch bedingte Psoriasis. Diese Merkmale unterstützen somit eindeutig die Diagnose L40 – Psoriasis.',
          score: 44,
        },
      ],
      rejections: [
        {
          icd_code: 'I74',
          icd_name: 'Arterielle Embolie und Thrombose',
          evidence: [
            '* Die Duplexsonographie zeigte eine frische Thrombose der A. femoralis superficialis mit fehlender Flusskontinuität.',
          ],
          priority: 'Primary',
          justification:
            'Die Duplexsonographie weist auf eine frische Thrombose der A. femoralis superficialis hin, was eine akute Verschlusserscheinung der Arterie durch ein Blutgerinnsel darstellt. Die fehlende Flusskontinuität bestätigt den Verschluss der Gefäßlumen, was typisch für eine arterielle Thrombose oder Embolie ist. Diese Befunde sprechen somit klar für die Diagnose I74 – arterielle Embolie und Thrombose.',
          score: 82,
        },
        {
          icd_code: 'G30',
          icd_name: 'Alzheimer-Krankheit',
          evidence: [
            '* Die Patientin zeigt eine progrediente Gedächtnisstörung mit Orientierungsproblemen im Alltag, typisch für eine demenzielle Entwicklung.',
            '* In der neuropsychologischen Testung zeigten sich deutliche Defizite im Kurzzeitgedächtnis, in der Wortflüssigkeit und im logischen Denken.',
          ],
          priority: 'Secondary',
          justification:
            'Die progrediente Gedächtnisstörung und die Orientierungsprobleme im Alltag sind charakteristische Symptome einer demenziellen Erkrankung wie der Alzheimer-Krankheit. Die neuropsychologischen Testungen, die Defizite im Kurzzeitgedächtnis, der Wortflüssigkeit und im logischen Denken zeigen, unterstützen diese Diagnose zusätzlich. Diese Befunde passen somit gut zum klinischen Bild der Alzheimer-Krankheit (G30).',
          score: 79,
        },
      ],
      score: '0%',
      evaluation: 'Abzulehnen',
      status: 'Abgelehnt',
      medication: [
        'Enoxaparin 1 mg/kg',
        'ASS 100 mg/d 1x täglich',
        'Donepezil 5 mg 1x täglich abends',
        'Rivastigmin 1,5 mg 2x täglich',
        'Ciclosporin A 2',
        '5-5 mg/kg/Tag',
      ],
      medical_procedures: [
        'Duplexsonographie',
        'EKG',
        'Thrombolyse',
        'MRT',
        'Sonographie',
        'Physiotherapie',
        'Dermatoskopie',
        'Hautbiopsie',
      ],
      medically_relevant_information: [
        'Der medizinische Bericht beschreibt eine ausgeprägte Risikobereitschaft bei persönlichen Entscheidungen.',
        'Die Patientin hat in der Vergangenheit regelmäßig an Fitnesskursen',
        'Die Patientin lebt allein und führt einen eher bewegungsarmen Alltag.',
      ],
    },
  },
];

export function PDFTemplate(rows: any[]) {
  const content: any[] = [
    {
      text: `Datum: ${moment().format('DD.MM.YYYY')}`,
      alignment: 'right',
      margin: [0, 0, 0, 30],
    },
    {
      text: 'PDF-Bericht',
      style: 'header',
      alignment: 'center',
      margin: [0, 0, 0, 5],
    },
    {
      text: 'Ausgewählte Fälle aus der KI-Anwendung',
      alignment: 'center',
      margin: [0, 0, 0, 50],
    },
  ];

  rows.forEach((row, index) => {
    const meta = row.metadata || {};
    const icds = row.icds || [];
    const rejections = row.rejections || [];

    content.push(
      {
        text: `Fall ${index + 1} von ${rows.length}`,
        style: 'subheader',
        margin: [0, index === 0 ? 10 : 50, 0, 2],
      },

      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 0.5,
            lineColor: 'lightgray',
          },
        ],
        margin: [0, 0, 0, 5],
      },

      {
        table: {
          widths: ['*', 110],

          body: [
            [
              // Coloana 1: Antragsteller
              {
                stack: [
                  {
                    margin: [10, 10, 10, 10],
                    table: {
                      widths: [120, '*'],
                      body: [
                        [
                          { text: 'Patienten:', bold: true },
                          { text: meta.patient_name ?? '-' },
                        ],
                        [
                          { text: 'Beruf:', bold: true },
                          {
                            text: meta.job || 'N/A',
                            style: meta.job ? '' : 'na',
                          },
                        ],
                        [
                          {
                            text: 'Geschlecht:',
                            bold: true,
                          },
                          { text: meta.gender ?? '-' },
                        ],
                        [
                          { text: 'Geburtstag:', bold: true },
                          { text: meta.date_of_birth ?? '-' },
                        ],
                        [
                          { text: 'Wunschtarife:', bold: true },
                          {
                            text: (meta.contract_types ?? []).join(', ') || '-',
                          },
                        ],

                        [
                          {
                            text: 'Medikamente:',
                            bold: true,
                            margin: [0, 10, 0, 0],
                          },
                          {
                            text: (row.medication ?? []).join(', ') || '-',
                            margin: [0, 10, 0, 0],
                          },
                        ],
                        [
                          {
                            text: 'Medizinische Maßnahmen:',
                            bold: true,
                            margin: [0, 10, 0, 0],
                          },
                          {
                            text:
                              (row.medical_procedures ?? []).join(', ') || '-',
                            margin: [0, 10, 0, 0],
                          },
                        ],
                      ],
                    },
                    layout: 'noBorders',
                  },
                ],
              },

              // Coloana 2: status & score
              {
                stack: [
                  {
                    table: {
                      widths: [100],
                      body: [
                        [
                          {
                            text: '  ' + (row.status ?? 'Offen') + '  ',
                            style:
                              row.status === 'Offen'
                                ? 'statusOpen'
                                : row.status === 'In Bearbeitung'
                                ? 'statusInProgress'
                                : row.status === 'Abgeschlossen'
                                ? 'statusCompleted'
                                : row.status === 'Abgelehnt'
                                ? 'statusRejected'
                                : 'statusOpen',
                            fontSize: 11,
                            bold: true,
                            margin: [6, 1, 6, 1],
                            alignment: 'center',
                          },
                        ],
                      ],
                    },
                    layout: 'noBorders',
                    alignment: 'right',
                    margin: [0, 10, 0, 0],
                  },
                  {
                    text: 'Beurteilung: ',
                    style: 'evaluationTitle',
                    margin: [10, 10, 10, 0],
                    alignment: 'center',
                  },
                  {
                    text: row.evaluation || 'Offen',
                    style: 'evaluation',
                    margin: [10, 0, 10, 0],
                    alignment: 'center',
                  },
                  // {
                  //   text: row.score,
                  //   style: 'score',
                  //   margin: [0, 10, 0, 0],
                  //   alignment: 'center',
                  // },
                ],
              },
            ],
          ],
        },

        layout: {
          defaultBorder: false,
          fillColor: function () {
            return '#f5f5f5';
          },
        },
      }
    );

    if (icds.length > 0) {
      icds.forEach((icd: any, idx: number) => {
        content.push(
          {
            margin: [15, 5, 0, 2],
            columns: [
              {
                width: 60,
                table: {
                  widths: [60],
                  body: [
                    [
                      {
                        text:
                          icd.icd_code +
                          (icd.score < reasonableThreshold ? '   ?' : ''),
                        fillColor: icd.highlighted ? 'yellow' : 'white',
                        color: '#057395',
                        fontSize: 10,
                        bold: true,
                        margin: [6, 1, 6, 1],
                        alignment: 'center',
                      },
                    ],
                  ],
                },
                layout: {
                  hLineColor: function () {
                    return '#057395';
                  },
                  vLineColor: function () {
                    return '#057395';
                  },
                  hLineWidth: function () {
                    return 1;
                  },
                  vLineWidth: function () {
                    return 1;
                  },
                },
                alignment: 'center',
                margin: [0, 10, 20, 0],
              },

              {
                width: '*',
                text: `${icd.icd_name}`,
                bold: true,
                alignment: 'left',
                margin: [28, 12, 0, 0],
              },
            ],
          },

          {
            text: 'Relevante Textstellen:',
            italics: true,
            margin: [105, 5, 0, 5],
          },
          {
            ul: (icd.evidence ?? []).map((e: string) => e.replace(/^\* /, '')),
            margin: [105, 0, 0, 10],
          },
          {
            text: 'Begründung' + (icd.score ? ' (' + icd.score + '%):' : ':'),
            italics: true,
            margin: [105, 5, 0, 5],
          },
          {
            text: icd.justification,
            margin: [105, 0, 0, 5],
          }
        );
      });
    }

    if (rejections.length > 0) {
      rejections.forEach((icd: any, idx: number) => {
        content.push(
          {
            margin: [15, 5, 0, 2],
            columns: [
              {
                width: 60,
                table: {
                  widths: [60],
                  body: [
                    [
                      {
                        text:
                          icd.icd_code +
                          (icd.score < reasonableThreshold ? '   ?' : ''),
                        color: 'red',
                        fontSize: 10,
                        bold: true,
                        margin: [6, 1, 6, 1],
                        alignment: 'center',
                      },
                    ],
                  ],
                },
                layout: {
                  hLineColor: function () {
                    return 'red';
                  },
                  vLineColor: function () {
                    return 'red';
                  },
                  hLineWidth: function () {
                    return 1;
                  },
                  vLineWidth: function () {
                    return 1;
                  },
                },
                alignment: 'center',
                margin: [0, 10, 20, 0],
              },

              {
                width: '*',
                text: `${icd.icd_name}`,
                bold: true,
                alignment: 'left',
                margin: [25, 12, 0, 0],
              },
            ],
          },
          {
            text: 'Relevante Textstellen:',
            italics: true,
            margin: [100, 5, 0, 5],
          },
          {
            ul: (icd.evidence ?? []).map((e: string) => e.replace(/^\* /, '')),
            margin: [100, 0, 0, 10],
          },
          {
            text: 'Begründung' + (icd.score ? ' (' + icd.score + '%):' : ':'),
            italics: true,
            margin: [100, 5, 0, 5],
          },
          {
            text: icd.justification,
            margin: [100, 0, 0, 5],
          }
        );
      });
    }

    content.push({
      text: 'Weitere medizinisch relevante Informationen:',
      bold: true,
      margin: [100, 10, 0, 10],
    });

    if (row.medically_relevant_information?.length) {
      content.push({
        ul: (row.medically_relevant_information ?? []).map((e: string) =>
          e.replace(/^\* /, '')
        ),
        margin: [100, 0, 0, 10],
      });
    } else {
      content.push({
        text: '- ',
        margin: [100, 3, 0, 0],
      });
    }
  });

  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    content,
    fontSize: 14,
    defaultStyle: {
      font: 'Roboto',
      bold: false,
    },
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 10, color: 'gray', bold: true },
      subheader2: { fontSize: 14, bold: true },
      statusOpen: {
        fontSize: 10,
        bold: true,
        fillColor: '#d2eaf1',
        color: 'black',
      },
      statusInProgress: {
        fontSize: 10,
        bold: true,
        fillColor: '#f9fadf',
        color: 'black',
      },
      statusCompleted: {
        fontSize: 10,
        bold: true,
        fillColor: '#d5e6d8',
        color: 'black',
      },
      statusRejected: {
        fontSize: 10,
        bold: true,
        fillColor: '#efd1d4',
        color: 'black',
      },
      score: {
        fontSize: 14,
        bold: true,
      },
      evaluation: {
        fontSize: 10,
        color: 'black',
      },
      evaluationTitle: {
        fontSize: 10,
        color: 'black',
        bold: true,
      },

      na: {
        fontSize: 10,
        color: 'gray',
        italics: true,
      },
    },
  };
}

// score range
export const scores = [
  'Unter 20',
  '20 - 40',
  '40 - 60',
  '60 - 80',
  '80 - 90',
  'Über 90',
];

export const statuses = [
  'Offen',
  'In Bearbeitung',
  'Abgeschlossen',
  'Abgelehnt',
];
export const evaluations = [
  'Offen',
  'Unkritisch',
  'Mit Aufschlag anbieten',
  'Abzulehnen',
];

export const reasonableThreshold = 50;
