// Ratgeber-Artikel (SEO-Content). Bewusst als Daten gepflegt, damit neue
// Artikel ohne Code-Kenntnisse ergänzt werden können. Jeder Abschnitt kann
// Fließtext, Duft-Paare (teuer -> günstig) oder eine Duftliste enthalten.
// Duft-Verweise erfolgen über den slug aus der perfumes-Tabelle.

export type GuidePairing = { expensive: string; cheap: string; note: string };

export type GuideSection = {
  heading?: string;
  body?: string[];
  pairings?: GuidePairing[];
  perfumes?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: 'guenstige-alternativen-zu-teuren-dueften',
    title: 'Günstige Alternativen zu teuren Parfüms: die besten Dupes',
    description:
      'Teure Düfte wie Creed Aventus haben oft günstige Alternativen, die erstaunlich ähnlich riechen. Hier die besten Spar-Tipps aus unserem Duftkatalog.',
    intro: [
      'Ein sogenanntes „Dupe" ist ein günstiger Duft, der einem teuren Original in der Richtung sehr nahekommt. Gerade in der Schweiz lohnt sich der Blick auf solche Alternativen: ähnlicher Duft, deutlich kleinerer Preis.',
      'Wichtig ehrlich gesagt: Ein Dupe ist nie zu 100 % identisch und hält manchmal etwas kürzer. Aber für den Alltag sind viele Alternativen verblüffend gut – und du sparst oft über 200 Franken.'
    ],
    sections: [
      {
        heading: 'Die besten Duft-Paare: teuer und die günstige Alternative',
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Club de Nuit Intense Man von Armaf gilt als die bekannteste günstige Alternative zu Creed Aventus – fruchtig-rauchig mit Ananas und Birke, für einen Bruchteil des Preises.'
          },
          {
            expensive: 'acqua-di-gio',
            cheap: 'davidoff-cool-water',
            note: 'Du magst die frische, aquatische Richtung von Acqua di Gio? Davidoff Cool Water bietet eine ähnlich sommertaugliche Frische – ein echter Klassiker zum kleinen Preis.'
          },
          {
            expensive: 'black-opium',
            cheap: 'ariana-cloud',
            note: 'Für die süße, gourmandige Richtung von Black Opium ist Ariana Grande Cloud eine günstige, kuschelige Alternative mit Praline und Vanille.'
          },
          {
            expensive: 'tobacco-vanille',
            cheap: 'khamrah',
            note: 'Tom Ford Tobacco Vanille ist würzig-süß und teuer. Lattafa Khamrah geht in eine ähnlich warme, süß-würzige Richtung mit Dattel und Zimt – zum Sparpreis.'
          }
        ]
      },
      {
        body: [
          'Mein Tipp: Mach zuerst unser Duft-Quiz, um deine Richtung herauszufinden. Danach findest du auf jeder Duftseite unter „Riecht ähnlich wie …" automatisch weitere passende Alternativen.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-sommerduefte',
    title: 'Die besten Sommerdüfte: frisch & leicht für heiße Tage',
    description:
      'Frische, leichte Düfte für den Sommer: aquatisch, zitrisch und unbeschwert. Unsere Empfehlungen für warme Tage – für Damen, Herren und Unisex.',
    intro: [
      'Im Sommer dürfen Düfte leicht, frisch und nicht zu schwer sein. Zitrus, aquatische Noten und ein Hauch Salz wirken bei Hitze am besten und überladen nicht.',
      'Hier unsere Empfehlungen aus dem Katalog – von günstig bis edel.'
    ],
    sections: [
      {
        perfumes: [
          'davidoff-cool-water',
          'acqua-di-gio',
          'light-blue',
          'jo-malone-wood-sage-sea-salt',
          'orto-megamare',
          'versace-dylan-blue',
          'allure-homme-sport',
          'invictus'
        ]
      }
    ]
  },
  {
    slug: 'welcher-duft-zu-welchem-anlass',
    title: 'Welcher Duft passt zu welchem Anlass?',
    description:
      'Büro, Date oder Abend – nicht jeder Duft passt überall. So findest du den richtigen Duft für Alltag, Date und besondere Abende.',
    intro: [
      'Der gleiche Duft wirkt im Büro anders als beim Date. Als Faustregel gilt: tagsüber dezent und sauber, abends darf es wärmer und intensiver sein.',
      'Hier passende Empfehlungen für die drei häufigsten Anlässe.'
    ],
    sections: [
      {
        heading: 'Für Alltag & Büro: dezent und gepflegt',
        body: ['Frisch, sauber und nicht zu aufdringlich – damit liegst du im Büro immer richtig.'],
        perfumes: ['bleu-de-chanel', 'terre-dhermes', 'boss-bottled', 'ysl-y-edp', 'le-labo-santal-33']
      },
      {
        heading: 'Für Dates: charmant und anziehend',
        body: ['Etwas süßer, wärmer oder blumiger – Düfte, die in Erinnerung bleiben.'],
        perfumes: ['black-opium', 'coco-mademoiselle', 'la-vie-est-belle', 'versace-eros', 'pdm-delina']
      },
      {
        heading: 'Für besondere Abende: intensiv und edel',
        body: ['Hier dürfen die großen, tiefen Düfte ran – mit Projektion und Charakter.'],
        perfumes: ['creed-aventus', 'tobacco-vanille', 'mugler-angel', 'oud-wood', 'baccarat-rouge-540']
      }
    ]
  },
  {
    slug: 'suesse-duefte-vanille-schokolade-karamell',
    title: 'Süße Düfte: Vanille, Schokolade & Karamell',
    description:
      'Warme, süße Gourmand-Düfte mit Vanille, Schokolade, Karamell und Tonkabohne – kuschelig, sinnlich und perfekt für kühle Tage.',
    intro: [
      'Süße Düfte – auch Gourmands genannt – riechen nach guten Dingen: Vanille, Schokolade, Karamell, Praline oder Kaffee. Sie wirken warm, einladend und bleiben angenehm in Erinnerung.',
      'Hier unsere süßesten Empfehlungen aus dem Katalog – von günstig bis edel.'
    ],
    sections: [
      {
        perfumes: [
          'tobacco-vanille',
          'kayali-vanilla-28',
          'montale-intense-cafe',
          'khamrah',
          'mugler-angel',
          'burberry-goddess',
          'kilian-angels-share',
          'lattafa-yara'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-winterduefte',
    title: 'Die besten Winterdüfte: warm, intensiv & einhüllend',
    description:
      'Wärmende Düfte für Herbst und Winter: Oud, Amber, Vanille und Gewürze, die bei Kälte besonders schön zur Geltung kommen.',
    intro: [
      'Im Winter darf ein Duft schwerer und wärmer sein. Holz, Amber, Oud, Gewürze und süße Noten entfalten sich bei Kälte besonders gut und hüllen dich angenehm ein.',
      'Diese Düfte sind wie gemacht für die kalte Jahreszeit.'
    ],
    sections: [
      {
        perfumes: [
          'tobacco-vanille',
          'oud-wood',
          'baccarat-rouge-540',
          'mugler-angel',
          'nasomatto-black-afgano',
          'initio-oud-greatness',
          'xerjoff-naxos',
          'lattafa-asad'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-unisex-duefte',
    title: 'Die besten Unisex-Düfte: für alle gemacht',
    description:
      'Düfte ohne Geschlecht: vielseitige Unisex-Parfüms, die an jedem gut riechen – von frisch bis warm-holzig.',
    intro: [
      'Unisex-Düfte sind nicht auf Damen oder Herren festgelegt – sie passen einfach zu dir, egal wer du bist. Oft sind es vielseitige, ausgewogene Kompositionen.',
      'Hier unsere Lieblinge zum Teilen oder einfach für jeden Geschmack.'
    ],
    sections: [
      {
        perfumes: [
          'baccarat-rouge-540',
          'le-labo-santal-33',
          'byredo-gypsy-water',
          'tobacco-vanille',
          'kilian-angels-share',
          'orto-megamare',
          'mancera-cedrat-boise',
          'nishane-ani'
        ]
      }
    ]
  },
  {
    slug: 'parfum-inhaltsstoffe-allergene',
    title: 'Parfum-Inhaltsstoffe & Allergene einfach erklärt',
    description:
      'Was steckt eigentlich in einem Parfum? Alkohol, Duftöl und die 26 EU-Allergene wie Limonene und Linalool – einfach und verständlich erklärt.',
    intro: [
      'Auf jeder Parfumverpackung steht eine Liste mit Inhaltsstoffen – oft mit lateinischen Namen, die etwas einschüchternd wirken. Dabei steckt dahinter kein Hexenwerk. Hier erklären wir dir einfach, was wirklich drin ist und worauf empfindliche Haut achten sollte.',
      'Wichtig vorweg: Die genaue Zusammensetzung ist von Duft zu Duft unterschiedlich und kann sich ändern. Die vollständige, gültige Liste findest du immer auf der Verpackung bzw. beim Hersteller. Dieser Artikel erklärt das Allgemeine.'
    ],
    sections: [
      {
        heading: 'Woraus besteht ein Parfum grundsätzlich?',
        body: [
          'Ein Parfum besteht im Kern aus nur drei Hauptbestandteilen:',
          '1. Alkohol (auf der Liste „Alcohol Denat." oder „Alcohol"): Das Trägermittel, das den Duft verteilt und schnell verdunsten lässt. Er macht meist den grössten Anteil aus.',
          '2. Wasser (Aqua): Sorgt für die richtige Konsistenz.',
          '3. Duftöl (Parfum / Fragrance): Die eigentliche Duftmischung aus vielen einzelnen Riechstoffen – das Herzstück, das den Charakter ausmacht.'
        ]
      },
      {
        heading: 'Warum steht da nur „Parfum" und keine genaue Mischung?',
        body: [
          'Die genaue Duftformel ist ein gut gehütetes Betriebsgeheimnis der Hersteller. Deshalb darf die Mischung der Riechstoffe gesammelt als „Parfum" oder „Fragrance" angegeben werden – sonst könnte jeder den Duft einfach nachbauen.',
          'Genau deshalb arbeiten wir auf ScentMatch mit Duftnoten (z. B. Bergamotte, Vanille, Sandelholz): Sie beschreiben, wie ein Duft riecht und wirkt – das ist für dich viel hilfreicher als eine Chemie-Liste.'
        ]
      },
      {
        heading: 'Die 26 Allergene: Limonene, Linalool & Co.',
        body: [
          'Bestimmte natürliche Duftbestandteile können bei empfindlichen Menschen Hautreaktionen auslösen. In der EU (und in der Schweiz angelehnt) müssen 26 solcher Stoffe ab einer gewissen Menge einzeln genannt werden – deshalb tauchen sie auf der Liste auf.',
          'Die häufigsten sind: Limonene (zitrusartig), Linalool (blumig, in Lavendel), Citronellol und Geraniol (rosig), Eugenol (würzig, Nelke), Coumarin (heuartig, süsslich) und Citral.',
          'Wichtig: Diese Stoffe sind nicht „schlecht" – sie stecken auch in vielen natürlichen Ölen und Blüten. Sie werden nur aufgelistet, damit Allergikerinnen und Allergiker sie erkennen können.'
        ]
      },
      {
        heading: 'Tipps bei empfindlicher Haut',
        body: [
          'Sprüh den Duft auf Kleidung statt direkt auf gereizte Hautstellen.',
          'Teste neue Düfte zuerst an einer kleinen Stelle (z. B. Armbeuge) und warte einen Tag.',
          'Achte bei bekannter Allergie gezielt auf den entsprechenden Stoff in der Inhaltsliste auf der Verpackung.',
          'Weniger ist mehr: 1–2 Sprühstösse reichen meist völlig.'
        ]
      },
      {
        heading: 'Bonus: EdT, EdP oder Parfum – was ist der Unterschied?',
        body: [
          'Der Unterschied liegt in der Konzentration des Duftöls:',
          'Eau de Toilette (EdT): leichter, frischer, hält kürzer – ideal für den Sommer und tagsüber.',
          'Eau de Parfum (EdP): höhere Konzentration, intensiver und langanhaltender – der häufigste Typ.',
          'Parfum / Extrait: am intensivsten und teuersten, hält am längsten – schon wenig genügt.'
        ]
      },
      {
        body: [
          'Mein Tipp: Wenn du wissen willst, welche Duftrichtung zu dir passt, mach unser kostenloses Duft-Quiz – danach zeigen wir dir die passenden Düfte samt Noten, Saison und Anlass.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-duefte-unter-50-franken',
    title: 'Die besten Düfte unter 50 Franken',
    description:
      'Gut riechen muss nicht teuer sein: Unsere Lieblingsdüfte für unter CHF 50 – von frisch bis süss, für Damen, Herren und Unisex.',
    intro: [
      'Ein toller Duft muss nicht 150 Franken kosten. Gerade von Marken wie Lattafa, Armaf oder Davidoff gibt es erstaunlich gute Parfüms für kleines Geld.',
      'Hier unsere Favoriten unter CHF 50 – perfekt zum Ausprobieren, Verschenken oder für jeden Tag.'
    ],
    sections: [
      {
        perfumes: [
          'lattafa-khamrah',
          'lattafa-asad',
          'armaf-cdnim',
          'davidoff-cool-water',
          'lattafa-yara',
          'joop-homme',
          'sdj-cheirosa-62',
          'tabac-original'
        ]
      },
      {
        body: [
          'Tipp: Viele dieser günstigen Düfte sind auch starke „Dupes" für teure Originale – schau dazu in unseren Ratgeber „Günstige Alternativen zu teuren Parfüms".'
        ]
      }
    ]
  },
  {
    slug: 'wie-lange-haelt-parfum-haltbarkeit',
    title: 'Wie lange hält ein Parfum? Haltbarkeit & richtig auftragen',
    description:
      'Warum verfliegt dein Parfum so schnell – und wie hält es länger? Tipps zum richtigen Auftragen plus die langlebigsten Düfte aus unserem Katalog.',
    intro: [
      'Kennst du das? Morgens aufgesprüht, mittags weg. Wie lange ein Duft hält, hängt von der Konzentration, deiner Haut und vom richtigen Auftragen ab.',
      'Hier die wichtigsten Tipps – und am Ende die langlebigsten Düfte aus unserem Katalog.'
    ],
    sections: [
      {
        heading: 'So hält dein Duft länger',
        body: [
          'Auf gepflegte, leicht eingecremte Haut sprühen – auf trockener Haut verfliegt der Duft schneller.',
          'Auf die „Pulspunkte" auftragen: Handgelenke, Hals, hinter den Ohren, Ellenbeugen. Dort ist es warm und der Duft entfaltet sich.',
          'Nicht verreiben! Das Aneinanderreiben der Handgelenke „bricht" die Duftmoleküle und verkürzt die Haltbarkeit.',
          'Auch in Haare und auf Kleidung (vorsichtig) sprühen – dort hält Duft besonders lange.',
          'Eau de Parfum (EdP) hält länger als Eau de Toilette (EdT). Mehr dazu in unserem Ratgeber zu Inhaltsstoffen.'
        ]
      },
      {
        heading: 'Die langlebigsten Düfte aus unserem Katalog',
        perfumes: [
          'tobacco-vanille',
          'baccarat-rouge-540',
          'lattafa-khamrah',
          'montale-intense-cafe',
          'mugler-angel',
          'armaf-cdnim'
        ]
      }
    ]
  },
  {
    slug: 'parfum-geschenk-die-besten-duefte-zum-verschenken',
    title: 'Parfum verschenken: die besten Düfte als Geschenk',
    description:
      'Parfum ist ein wunderschönes Geschenk – wenn es passt. Unsere sicheren Favoriten zum Verschenken für Frauen und Männer, plus Tipps zur Auswahl.',
    intro: [
      'Ein Duft ist ein persönliches, edles Geschenk. Die Kunst ist, etwas zu wählen, das fast jeder mag – nicht zu speziell, aber trotzdem besonders.',
      'Hier unsere „sicheren" Geschenk-Tipps, die erfahrungsgemäss sehr gut ankommen.'
    ],
    sections: [
      {
        heading: 'Für Frauen',
        perfumes: ['coco-mademoiselle', 'la-vie-est-belle', 'black-opium', 'good-girl']
      },
      {
        heading: 'Für Männer',
        perfumes: ['bleu-de-chanel', 'jpg-le-male', 'ea-stronger-with-you', 'boss-bottled']
      },
      {
        body: [
          'Unsicher, was die Person mag? Verschenk einen Gutschein oder mach unser Duft-Quiz gemeinsam – so triffst du den Geschmack viel sicherer.'
        ]
      }
    ]
  },
  {
    slug: 'maennerduefte-die-frauen-moegen',
    title: 'Männerdüfte, die Frauen mögen',
    description:
      'Welche Herrendüfte kommen besonders gut an? Unsere Liste der beliebtesten „Komplimente-Düfte" für Männer – von frisch bis süss-würzig.',
    intro: [
      'Manche Männerdüfte ernten einfach besonders oft Komplimente. Meist sind es warme, einladende oder sauber-frische Düfte, die angenehm in Erinnerung bleiben.',
      'Hier die Klassiker, die erfahrungsgemäss sehr gut ankommen.'
    ],
    sections: [
      {
        perfumes: [
          'sauvage',
          'jpg-le-male',
          'ea-stronger-with-you',
          'versace-eros',
          'ch-bad-boy',
          'pr-1-million',
          'boss-the-scent',
          'dior-fahrenheit'
        ]
      },
      {
        body: [
          'Wichtig: „Kommt gut an" ist kein Garant – am Ende zählt, dass der Duft zu dir passt. Mach das Quiz, um deine eigene Richtung zu finden.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-vanille-duefte',
    title: 'Die besten Vanille-Düfte',
    description:
      'Warme, süsse Vanille-Düfte zum Verlieben: kuschelig, sinnlich und perfekt für kühle Tage. Unsere Vanille-Favoriten für Damen, Herren und Unisex.',
    intro: [
      'Vanille ist die wohl beliebteste süsse Note: warm, cremig und einladend. Mal pur und kuschelig, mal kombiniert mit Gewürzen, Tabak oder Karamell.',
      'Hier unsere schönsten Vanille-Düfte aus dem Katalog.'
    ],
    sections: [
      {
        perfumes: [
          'tobacco-vanille',
          'kayali-vanilla-28',
          'lattafa-khamrah',
          'guerlain-mon',
          'ariana-cloud',
          'burberry-goddess',
          'lattafa-yara',
          'jpg-la-belle'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-oud-duefte',
    title: 'Die besten Oud-Düfte',
    description:
      'Oud – das „flüssige Gold" der Parfümerie: orientalisch, edel und intensiv. Unsere besten Oud-Düfte von günstig bis luxuriös.',
    intro: [
      'Oud (auch Agarholz) ist eine der edelsten und intensivsten Duftnoten überhaupt: warm, holzig, leicht rauchig und sehr langanhaltend. Besonders schön im Herbst und Winter.',
      'Hier unsere Empfehlungen – von erschwinglich bis exklusiv.'
    ],
    sections: [
      {
        perfumes: [
          'oud-wood',
          'initio-oud-greatness',
          'lattafa-badee-amethyst',
          'mancera-red-tobacco',
          'montale-arabians-tonka',
          'sa-shaghaf-oud',
          'penhaligons-halfeti'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-zitrus-duefte',
    title: 'Die besten Zitrus-Düfte',
    description:
      'Spritzig, frisch und gute Laune pur: Die besten Zitrus-Düfte mit Bergamotte, Zitrone und Grapefruit – ideal für Sommer, Büro und heisse Tage.',
    intro: [
      'Zitrus-Düfte sind frisch, leicht und sofort gute Laune: Zitrone, Bergamotte, Grapefruit und Orange wirken sauber und unbeschwert – perfekt für warme Tage und fürs Büro.',
      'Hier unsere spritzigsten Empfehlungen.'
    ],
    sections: [
      {
        perfumes: [
          'acqua-di-gio',
          'davidoff-cool-water',
          'adp-colonia',
          'armani-acqua-di-gioia',
          'hermes-jardin-nil',
          'mancera-cedrat-boise',
          'light-blue',
          'creed-silver-mountain-water'
        ]
      }
    ]
  },
  {
    slug: 'damenduefte-die-maenner-lieben',
    title: 'Damendüfte, die Männer lieben',
    description:
      'Welche Frauendüfte kommen bei Männern besonders gut an? Unsere Liste der beliebtesten „Komplimente-Düfte" für Frauen – von süss-warm bis verführerisch.',
    intro: [
      'Manche Damendüfte ziehen einfach magisch an und ernten besonders oft Komplimente – gerade von Männern. Meist sind es warme, süsse oder sinnlich-verführerische Kompositionen, die angenehm in Erinnerung bleiben.',
      'Hier die Düfte, die als echte „Anziehungs-Klassiker" gelten.'
    ],
    sections: [
      {
        perfumes: [
          'black-opium',
          'la-vie-est-belle',
          'good-girl',
          'lancome-la-nuit-tresor',
          'coco-mademoiselle',
          'lattafa-yara',
          'ysl-mon-paris',
          'gisada-ambassadora'
        ]
      },
      {
        body: [
          'Ehrlich gesagt: „Was Männer mögen" ist Geschmackssache und sehr individuell. Der schönste Duft ist der, in dem du dich selbstbewusst fühlst. Mach unser Quiz, um deine eigene Lieblingsrichtung zu finden.'
        ]
      }
    ]
  }
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

// Alle slugs, die in den Artikeln als Düfte verlinkt werden (für die Datenabfrage).
export function guidePerfumeSlugs(): string[] {
  const set = new Set<string>();
  for (const guide of guides) {
    for (const section of guide.sections) {
      section.perfumes?.forEach((s) => set.add(s));
      section.pairings?.forEach((p) => {
        set.add(p.expensive);
        set.add(p.cheap);
      });
    }
  }
  return [...set];
}
