export const compainSDKData: any[] = [
  {
    timestamp: '123456',
    metadata: {
      patient_name: 'Name Vorname',
      gender: 'female',
      date_of_birth: '18.09.1988',
      document_date: '16.04.2025',
      occupation: 'Ernährungsberaterin (Nutritionist)',
      'self-employed_since': '2014',
    },
    icds: [
      {
        icd_code: 'E03.9',
        evidence: [
          '- 05.2023 -Schilddrüsenunterfunktion seit Kindheit- LThyroxin 1x am Tag 88mcg',
          '- 31.03.2025 Check-Up, Mi. 2.4. Blutabnahme Ergebnisse des Hausarzt-Besuchs: Autoimmunthyreoiditis ist ausgeschlossen, Vit.D Mangel ist behoben',
        ],
        priority: 'Secondary',
        justification:
          'The patient has a documented history of hypothyroidism since childhood and is currently taking levothyroxine 88mcg daily for management. This is a chronic condition requiring ongoing medication but is not the primary reason for the current medical evaluation. The autoimmune thyroiditis was ruled out in the most recent check-up.',
      },
      {
        icd_code: 'D25.9',
        evidence: [
          'Diagnose: Uterusmyome',
          'In der Untersuchung zeigten sich drei asymptomatische Myome a.e. subserös von 2,3x 1,7cm, 2,1x 1,6cm und 1,3x 1cm.',
        ],
        priority: 'Secondary',
        justification:
          "The gynecological report dated 24.03.2025 confirms the presence of three asymptomatic uterine myomas (fibroids). The code D25.9 represents 'Leiomyoma of uterus, unspecified' which is appropriate as the specific type is not definitively classified beyond 'a.e. subserös' (likely subserosal). This is a secondary condition as it's described as asymptomatic.",
      },
      {
        icd_code: 'M21.42',
        evidence: [
          '- Knie/Senk-Spreiz-Fuß mit Einlagen (28.02.2024)',
          'Abgeflachtes Längs- und durchgetretenes Quergewölbe beide Füße',
          'Dekompensierter Knick-Senk-Spreizfuß bds.',
        ],
        priority: 'Secondary',
        justification:
          "The orthopedic documentation clearly indicates bilateral pes planovalgus (flat feet with pronation), specifically described as 'Knick-Senk-Spreizfuß beidseits' (bilateral pes planovalgus with splay foot). M21.42 specifically codes for flat foot deformity affecting both feet, which is more specific than M21.40 (unspecified site). The patient uses orthotic insoles for this condition.",
      },
      {
        icd_code: 'M22.40',
        evidence: [
          'Linkes Knie: 11.2.22 KrankenGymnastik + 11.8.22 KrankenGymnastik, dr. moll // Diagnose: Chondro Patella binnenschaden',
          'zweites MRT 13.7.22 // mit hat gezeigt dass diese leichte Reizung über die Jahre gleich geblieben ist + hyaluronsäure ins linke Knie bekommen (18.02.2019), (28.02.2019), (04.03.2019)',
          'Retropatellare Chondropathie mit diskretem begleitendem Gelenkerguss',
          'Patellofemorales Syndrom bds, V.a. Knorpelschaden retropatellar bds.',
        ],
        priority: 'Primary',
        justification:
          "The patient has a documented chondropathy of the patella (patellofemoral syndrome) with evidence of cartilage damage. This condition required multiple treatments including physical therapy and hyaluronic acid injections. M22.40 codes for 'Chondromalacia patellae, unspecified knee' which accurately represents the condition. This appears to be the primary reason for medical consultation based on the extensive documentation and treatment history.",
      },
      {
        icd_code: 'J30.1',
        evidence: [
          '- Heuschnupfen: kein allergisches Asthma. Keine Des durchgeführt oder angeraten.',
        ],
        priority: 'Secondary',
        justification:
          "The patient reports having hay fever (allergic rhinitis due to pollen) without allergic asthma. J30.1 specifically codes for 'Allergic rhinitis due to pollen' which matches the description of 'Heuschnupfen' (hay fever). This is a secondary condition as it's mentioned as a pre-existing condition without current active treatment.",
      },
      {
        icd_code: 'F45.8',
        evidence: [
          '- Knirscherschiene, kein Zahnabrieb, kein CMD, keine Physio',
        ],
        priority: 'Secondary',
        justification:
          'The patient uses a night guard (Knirscherschiene) for teeth grinding (bruxism). While no temporomandibular joint disorder (CMD) is present, the use of a night guard indicates bruxism. F45.8 (Other somatoform disorders) is the appropriate code for bruxism according to ICD-10 classification when there is no structural damage. This is a secondary condition requiring ongoing management with a night guard.',
      },
    ],
    rejections: [
      {
        icd_code: 'E03.9',
        evidence: [
          '- 05.2023 -Schilddrüsenunterfunktion seit Kindheit- LThyroxin 1x am Tag 88mcg',
          '- 31.03.2025 Check-Up, Mi. 2.4. Blutabnahme Ergebnisse des Hausarzt-Besuchs: Autoimmunthyreoiditis ist ausgeschlossen, Vit.D Mangel ist behoben',
        ],
        priority: 'Secondary',
        justification:
          'The patient has a documented history of hypothyroidism since childhood and is currently taking levothyroxine 88mcg daily for management. This is a chronic condition requiring ongoing medication but is not the primary reason for the current medical evaluation. The autoimmune thyroiditis was ruled out in the most recent check-up.',
      },
    ],
    status: 'Offen',
  },
  {
    timestamp: '123456',
    metadata: {
      patient_name: 'Name Vorname',
      gender: 'female',
      date_of_birth: '18.09.1988',
      document_date: '16.04.2025',
      occupation: 'Ernährungsberaterin (Nutritionist)',
      'self-employed_since': '2014',
    },
    icds: [
      {
        icd_code: 'E03.9',
        evidence: [
          '- 05.2023 -Schilddrüsenunterfunktion seit Kindheit- LThyroxin 1x am Tag 88mcg',
          '- 31.03.2025 Check-Up, Mi. 2.4. Blutabnahme Ergebnisse des Hausarzt-Besuchs: Autoimmunthyreoiditis ist ausgeschlossen, Vit.D Mangel ist behoben',
        ],
        priority: 'Secondary',
        justification:
          'The patient has a documented history of hypothyroidism since childhood and is currently taking levothyroxine 88mcg daily for management. This is a chronic condition requiring ongoing medication but is not the primary reason for the current medical evaluation. The autoimmune thyroiditis was ruled out in the most recent check-up.',
      },
      {
        icd_code: 'F45.8',
        evidence: [
          '- Knirscherschiene, kein Zahnabrieb, kein CMD, keine Physio',
        ],
        priority: 'Secondary',
        justification:
          'The patient uses a night guard (Knirscherschiene) for teeth grinding (bruxism). While no temporomandibular joint disorder (CMD) is present, the use of a night guard indicates bruxism. F45.8 (Other somatoform disorders) is the appropriate code for bruxism according to ICD-10 classification when there is no structural damage. This is a secondary condition requiring ongoing management with a night guard.',
      },
    ],
    rejections: [
      {
        icd_code: 'E03.9',
        evidence: [
          '- 05.2023 -Schilddrüsenunterfunktion seit Kindheit- LThyroxin 1x am Tag 88mcg',
          '- 31.03.2025 Check-Up, Mi. 2.4. Blutabnahme Ergebnisse des Hausarzt-Besuchs: Autoimmunthyreoiditis ist ausgeschlossen, Vit.D Mangel ist behoben',
        ],
        priority: 'Secondary',
        justification:
          'The patient has a documented history of hypothyroidism since childhood and is currently taking levothyroxine 88mcg daily for management. This is a chronic condition requiring ongoing medication but is not the primary reason for the current medical evaluation. The autoimmune thyroiditis was ruled out in the most recent check-up.',
      },
    ],
    status: 'In Bearbeitung',
  },
  {
    timestamp: '123456',
    metadata: {
      patient_name: 'Name Vorname',
      gender: 'female',
      date_of_birth: '18.09.1988',
      document_date: '16.04.2025',
      occupation: 'Ernährungsberaterin (Nutritionist)',
      'self-employed_since': '2014',
    },
    icds: [
      {
        icd_code: 'D25.9',
        evidence: [
          'Diagnose: Uterusmyome',
          'In der Untersuchung zeigten sich drei asymptomatische Myome a.e. subserös von 2,3x 1,7cm, 2,1x 1,6cm und 1,3x 1cm.',
        ],
        priority: 'Secondary',
        justification:
          "The gynecological report dated 24.03.2025 confirms the presence of three asymptomatic uterine myomas (fibroids). The code D25.9 represents 'Leiomyoma of uterus, unspecified' which is appropriate as the specific type is not definitively classified beyond 'a.e. subserös' (likely subserosal). This is a secondary condition as it's described as asymptomatic.",
      },
      {
        icd_code: 'M22.40',
        evidence: [
          'Linkes Knie: 11.2.22 KrankenGymnastik + 11.8.22 KrankenGymnastik, dr. moll // Diagnose: Chondro Patella binnenschaden',
          'zweites MRT 13.7.22 // mit hat gezeigt dass diese leichte Reizung über die Jahre gleich geblieben ist + hyaluronsäure ins linke Knie bekommen (18.02.2019), (28.02.2019), (04.03.2019)',
          'Retropatellare Chondropathie mit diskretem begleitendem Gelenkerguss',
          'Patellofemorales Syndrom bds, V.a. Knorpelschaden retropatellar bds.',
        ],
        priority: 'Primary',
        justification:
          "The patient has a documented chondropathy of the patella (patellofemoral syndrome) with evidence of cartilage damage. This condition required multiple treatments including physical therapy and hyaluronic acid injections. M22.40 codes for 'Chondromalacia patellae, unspecified knee' which accurately represents the condition. This appears to be the primary reason for medical consultation based on the extensive documentation and treatment history.",
      },
      {
        icd_code: 'J30.1',
        evidence: [
          '- Heuschnupfen: kein allergisches Asthma. Keine Des durchgeführt oder angeraten.',
        ],
        priority: 'Secondary',
        justification:
          "The patient reports having hay fever (allergic rhinitis due to pollen) without allergic asthma. J30.1 specifically codes for 'Allergic rhinitis due to pollen' which matches the description of 'Heuschnupfen' (hay fever). This is a secondary condition as it's mentioned as a pre-existing condition without current active treatment.",
      },
      {
        icd_code: 'F45.8',
        evidence: [
          '- Knirscherschiene, kein Zahnabrieb, kein CMD, keine Physio',
        ],
        priority: 'Secondary',
        justification:
          'The patient uses a night guard (Knirscherschiene) for teeth grinding (bruxism). While no temporomandibular joint disorder (CMD) is present, the use of a night guard indicates bruxism. F45.8 (Other somatoform disorders) is the appropriate code for bruxism according to ICD-10 classification when there is no structural damage. This is a secondary condition requiring ongoing management with a night guard.',
      },
    ],
    rejections: [],
    status: 'Abgeschlossen',
  },
  {
    timestamp: '123456',
    metadata: {
      patient_name: 'Name Vorname',
      gender: 'female',
      date_of_birth: '18.09.1988',
      document_date: '16.04.2025',
      occupation: 'Ernährungsberaterin (Nutritionist)',
      'self-employed_since': '2014',
    },
    icds: [
      {
        icd_code: 'J30.1',
        evidence: [
          '- Heuschnupfen: kein allergisches Asthma. Keine Des durchgeführt oder angeraten.',
        ],
        priority: 'Secondary',
        justification:
          "The patient reports having hay fever (allergic rhinitis due to pollen) without allergic asthma. J30.1 specifically codes for 'Allergic rhinitis due to pollen' which matches the description of 'Heuschnupfen' (hay fever). This is a secondary condition as it's mentioned as a pre-existing condition without current active treatment.",
      },
      {
        icd_code: 'F45.8',
        evidence: [
          '- Knirscherschiene, kein Zahnabrieb, kein CMD, keine Physio',
        ],
        priority: 'Secondary',
        justification:
          'The patient uses a night guard (Knirscherschiene) for teeth grinding (bruxism). While no temporomandibular joint disorder (CMD) is present, the use of a night guard indicates bruxism. F45.8 (Other somatoform disorders) is the appropriate code for bruxism according to ICD-10 classification when there is no structural damage. This is a secondary condition requiring ongoing management with a night guard.',
      },
    ],
    rejections: [
      {
        icd_code: 'E03.9',
        evidence: [
          '- 05.2023 -Schilddrüsenunterfunktion seit Kindheit- LThyroxin 1x am Tag 88mcg',
          '- 31.03.2025 Check-Up, Mi. 2.4. Blutabnahme Ergebnisse des Hausarzt-Besuchs: Autoimmunthyreoiditis ist ausgeschlossen, Vit.D Mangel ist behoben',
        ],
        priority: 'Secondary',
        justification:
          'The patient has a documented history of hypothyroidism since childhood and is currently taking levothyroxine 88mcg daily for management. This is a chronic condition requiring ongoing medication but is not the primary reason for the current medical evaluation. The autoimmune thyroiditis was ruled out in the most recent check-up.',
      },
    ],
    status: 'Abgelehnt',
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

export const statuses = [
  'Offen',
  'In Bearbeitung',
  'Abgeschlossen',
  'Abgelehnt',
];
