export const schadenfallData: any[] = [
  {
    fall: '334 ZZB: Hagelschaden Auto Feb 2025',
    antragsteller: 'Francesco Di Mascerazzi',
    policennummer: 'TNB - 3035 - 110B',
    schadenfallnummer: '334 ZZB',
    ort: 'Lingen',
    typ: 'Wetterschaden',
    summe: 800,
    datum: '2025-02-28',
    score: 0.72,
    status: 'In Review',
    beurteilung: 'Offen',
    logischeInkonsistenzen: 0.72,
    zeitlicheInkonsistenzen: 0.21,
    ungewöhnlicheAngaben: 0.0,
    korrelationMitBetrugsfällen: 0.0,
    schadenshergang:
      'Ich hatte mein Auto draußen geparkt als es über Nacht gehagelt hatte. Die Nagelkörner haben die Windschutzscheibe und die Motorhaube stark beschädigt.',
    einschätzung:
      'Es wurden mehrere schwerwiegende Unstimmigkeiten zwischen der Benutzerbeschreibung und dem erkannten Schadensbild festgestellt. Die Art des Schadens, die Tageszeit des Vorfalls und der Umfang der Schäden stimmen nicht überein. Diese Diskrepanzen deuten auf eine mögliche betrügerische Aktivität hin und erfordern eine gründlichere Untersuchung.',
  },
  {
    fall: '791 KLM: Einbruch Keller März 2025',
    antragsteller: 'Rainer Vogel',
    policennummer: 'TNB - 4509 - 776F',
    schadenfallnummer: '791 KLM',
    ort: 'Hamburg',
    typ: 'Einbruch',
    summe: 980,
    datum: '2025-03-12',
    score: 0.51,
    status: 'Discarded',
    beurteilung: 'Offen',
    logischeInkonsistenzen: 0.18,
    zeitlicheInkonsistenzen: 0.12,
    ungewöhnlicheAngaben: 0.07,
    korrelationMitBetrugsfällen: 0.05,
    schadenshergang:
      'Der Keller wurde aufgebrochen, als ich nicht zu Hause war. Gestohlen wurden ein E-Bike und Werkzeuge.',
    einschätzung:
      'Beschädigung am Schloss vorhanden, aber Zeitpunkt unklar. Kameraaufzeichnung unvollständig.',
    auffälligkeiten:
      '* Fehlende Meldung an Polizei.\n* Kein Kaufnachweis für das E-Bike beigelegt.',
  },
  {
    fall: '118 BVR: Brandschaden Küche Jan 2025',
    antragsteller: 'Julia Meinhardt',
    policennummer: 'TNB - 9012 - 887D',
    schadenfallnummer: '118 BVR',
    ort: 'München',
    typ: 'Brandschaden',
    summe: 1450,
    datum: '2025-01-10',
    score: 0.84,
    status: 'Completed',
    beurteilung: 'Geschlossen',
    logischeInkonsistenzen: 0.05,
    zeitlicheInkonsistenzen: 0.02,
    ungewöhnlicheAngaben: 0.01,
    korrelationMitBetrugsfällen: 0.0,
    schadenshergang:
      'Beim Kochen hat sich ein Tuch entzündet und das Feuer hat sich auf die Küchenzeile ausgebreitet.',
    einschätzung:
      'Die Beschreibung stimmt mit den festgestellten Brandspuren überein. Die Temperaturverläufe und der Brandschwerpunkt passen zum Bericht.',
  },
];

// summe range
export const betragsspanne = [
  'Unter 50 EUR',
  '50 - 100 EUR',
  '100 - 500 EUR',
  '500 - 750 EUR',
  '750 - 1000 EUR',
  'Über 1000 EUR',
];

// score range
export const scoringbereich = [
  'Unter 20',
  '20 - 40',
  '40 - 60',
  '60 - 80',
  '80 - 90',
  'Über 90',
];
