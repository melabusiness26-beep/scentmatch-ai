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
  icon?: string;       // Emoji-Icon für Hero-Banner
  heroGradient?: string; // CSS-Gradient für Hero
  heroImage?: string;  // Unsplash-Foto-URL für Hero-Banner
  intro: string[];
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: 'guenstige-alternativen-zu-teuren-dueften',
    title: 'Parfüm-Dupes Schweiz: die besten günstigen Alternativen',
    description:
      'Teure Düfte wie Creed Aventus oder Dior Sauvage haben oft günstige Alternativen (Dupes), die erstaunlich ähnlich riechen. Die besten Parfüm-Dupes für die Schweiz, von frisch bis süß, mit ehrlicher Einschätzung.',
    heroImage: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=80&fit=crop',
    intro: [
      'Ein sogenanntes „Dupe" ist ein günstiger Duft, der einem teuren Original in der Richtung sehr nahekommt. Gerade in der Schweiz lohnt sich der Blick auf solche Alternativen: ähnlicher Duft, deutlich kleinerer Preis, und du musst nicht zweimal überlegen, ob du die Flasche wirklich aufsprühst.',
      'Wichtig ehrlich gesagt: Ein Dupe ist nie zu 100 % identisch und hält manchmal etwas kürzer. Aber für den Alltag sind viele Alternativen verblüffend gut. Du sparst oft über 200 Franken und kannst das Geld für weitere Entdeckungen nutzen.',
      'Die bekanntesten Dupe-Marken aus dem arabischen Raum (Lattafa, Armaf, Al Haramain) sind nicht mehr das Geheimtipp. Sie sind etabliert, weit verfügbar und bieten erstaunliche Qualität für kleines Geld. Hier sind unsere ehrlichsten Empfehlungen.'
    ],
    sections: [
      {
        heading: 'Die besten Duft-Paare: teuer und die günstige Alternative',
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Club de Nuit Intense Man von Armaf gilt als die bekannteste günstige Alternative zu Creed Aventus: fruchtig-rauchig mit Ananas und Birke, für einen Bruchteil des Preises.'
          },
          {
            expensive: 'dior-sauvage',
            cheap: 'lattafa-asad',
            note: 'Dior Sauvage ist einer der meistgesuchten Herrendüfte. Lattafa Asad ist die bekannteste günstige Alternative aus der Sauvage-Familie: dieselbe würzig-ambrierte Grundrichtung mit schwarzem Pfeffer und Ambroxan, allerdings wärmer und süßer und damit am nächsten an der intensiven Variante Sauvage Elixir. Für einen Bruchteil des Preises.'
          },
          {
            expensive: 'armani-acqua-di-gio-homme',
            cheap: 'davidoff-cool-water',
            note: 'Du magst die frische, aquatische Richtung von Acqua di Gio, möchtest aber weniger ausgeben? Davidoff Cool Water ist kein exakter Klon (es riecht etwas seifiger und weniger zitrisch), gehört aber zur gleichen frisch-aquatischen Familie und ist ein günstiger Sommer-Klassiker.'
          },
          {
            expensive: 'ysl-black-opium',
            cheap: 'ariana-cloud',
            note: 'YSL Black Opium ist ein süßer Kaffee-Vanille-Gourmand. Ariana Grande Cloud ist kein exakter Klon (die typische Kaffeenote fehlt), geht aber in dieselbe süß-kuschelige Gourmand-Richtung mit Praline und Vanille, zum kleinen Preis.'
          },
          {
            expensive: 'tobacco-vanille',
            cheap: 'khamrah',
            note: 'Tom Ford Tobacco Vanille ist würzig-süß und teuer. Lattafa Khamrah geht in eine ähnlich warme, süß-würzige Richtung mit Dattel und Zimt, zum kleinen Preis.'
          },
          {
            expensive: 'baccarat-rouge-540',
            cheap: 'lattafa-ana-abiyedh',
            note: 'Baccarat Rouge 540 von Maison Francis Kurkdjian ist einer der meistgesuchten Luxusdüfte überhaupt. Lattafa Ana Abiyedh Rouge gilt in der Duft-Community als die bekannteste günstige Alternative: dieselbe warme Amber-Richtung mit Safran und Amberholz. Kein Klon, aber für den kleinen Preis verblüffend edel.'
          }
        ]
      },
      {
        heading: 'Worauf du bei Dupes achten solltest',
        body: [
          'Teste immer auf der Haut: Ein Dupe riecht auf dem Papierstreifen oder im Fläschchen anders als nach 20 Minuten auf deiner Haut. Gib ihm Zeit.',
          'Haltbarkeit: Günstige Dupes sind manchmal etwas kürzer auf der Haut als das teure Original. Dafür kosten sie oft nur einen Bruchteil. Ein zweiter Sprühstoss am Nachmittag hilft.',
          'Projektion: Viele arabische Dupes haben sogar mehr Projektion als das Original. Sparsam dosieren ist oft der bessere Plan. Ein bis zwei Sprühstösse genügen.',
          'Qualität: Seriöse Dupes (Lattafa, Armaf, Al Haramain) sind eigenständige Düfte in ähnlicher Richtung. Keine minderwertigen Kopien. Die Flakons und Verpackungen sind solide.',
          'Verfügbarkeit: Arabische Dupes sind in der Schweiz bei Notino.ch, Parfumino oder Douglas erhältlich. Die Preise in CHF sind oft noch attraktiver als im deutschen Ausland.'
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
      'Frische, leichte Düfte für den Sommer: aquatisch, zitrisch und unbeschwert. Unsere Empfehlungen für warme Tage, für Damen, Herren und Unisex.',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&fit=crop',
    intro: [
      'Im Sommer dürfen Düfte leicht, frisch und nicht zu schwer sein. Zitrus, aquatische Noten und ein Hauch Salz sind bei Hitze am angenehmsten. Schwere Winterdüfte mit viel Oud, Amber oder intensiver Vanille können im Hochsommer schnell erdrückend wirken, besonders in der Nähe anderer Menschen oder in der vollbesetzten Bahn.',
      'Ein guter Sommerduft kombiniert Frische mit einer dezenten Basis: Aquatische Noten oder Zitrus vorne, etwas Moschus oder leichtes Holz im Abgang, damit er nicht sofort verfliegt. Die Dosierung ist im Sommer besonders wichtig. Bei 30 Grad entfaltet sich jeder Duft viel intensiver als im Frühling. Was morgens nach zwei Sprühstössen angenehm frisch wirkt, kann mittags in der Sonne sehr viel präsenter werden als beabsichtigt.',
      'Dazu kommt: Wärme, Sonnencreme und sportliche Aktivitäten verändern, wie ein Duft auf der Haut riecht. Die besten Sommerdüfte halten diese Bedingungen aus und bleiben dabei angenehm. Hier unsere Empfehlungen aus dem Katalog, von günstig bis edel, für Damen, Herren und alle dazwischen.'
    ],
    sections: [
      {
        heading: 'Die besten Sommerdüfte für alle',
        perfumes: [
          'davidoff-cool-water',
          'armani-acqua-di-gio-homme',
          'dolce-gabbana-light-blue',
          'jo-malone-wood-sage-sea-salt',
          'orto-megamare',
          'versace-dylan-blue',
          'allure-homme-sport',
          'invictus'
        ]
      },
      {
        heading: 'Sommer-Düfte für Damen',
        body: [
          'Für Frauen sind im Sommer leichte Blüten, fruchtige Noten und aquatische Frische besonders beliebt. Dolce & Gabbana Light Blue ist seit Jahren ein Sommer-Liebling: zitrusfrisch mit Apfel und weissem Moschus, leicht und unkompliziert. Armani Acqua di Gioia kombiniert Jasmin mit Zitrusnoten und einem sanften Holzabgang, wunderbar für warme Abende.',
          'Wer es etwas erschwinglicher mag, greift zu Lattafa Yara oder Lattafa Mayar: cremig-fruchtig, alltagstauglich und weit unter 50 Franken. Beide halten gut durch den Tag und wirken nie schwer oder erdrückend.'
        ]
      },
      {
        heading: 'Sommer-Düfte für Herren',
        body: [
          'Für Männer sind aquatische und zitrische Klassiker die sichere Wahl. Davidoff Cool Water ist seit Jahrzehnten ein verlässlicher Sommer-Begleiter, günstig und vielseitig. Armani Acqua di Gio Homme hat diesen entspannten, mediterranen Charakter, der zu Strand und Hitze passt wie kaum ein anderer.',
          'Wer etwas mehr Charakter und Tiefe sucht, greift zu Versace Dylan Blue oder Allure Homme Sport: frisch genug für den Tag, aber mit einer holzig-würzigen Basis, die auch am Abend noch anziehend wirkt.'
        ]
      },
      {
        heading: 'Günstige Sommerdüfte unter 50 CHF',
        body: [
          'Davidoff Cool Water ist nach wie vor unter 40 CHF erhältlich und bietet solide Qualität für warme Tage. Lattafa Yara und Mayar kosten oft unter 30 CHF und sind im Sommer echte Geheimtipps. Wer einen leichten, frischen Alltagsduft sucht, ohne viel Geld auszugeben, ist hier bestens bedient.'
        ]
      },
      {
        heading: 'Worauf du bei Sommerdüften achten solltest',
        body: [
          'Bei Hitze wirkt ein Duft viel intensiver als im Winter. Weniger ist also mehr. Ein bis zwei Sprühstösse reichen meist völlig.',
          'Leichte Konzentrationen (Eau de Toilette) und frische Familien (Zitrus, aquatisch, grüner Tee) sind angenehmer als schwere, süsse Düfte.',
          'Frische Düfte verfliegen schneller. Ein kleiner Reisezerstäuber für die Tasche hilft, am Nachmittag kurz nachzulegen.',
          'Tagsüber und im Büro gilt: lieber dezent. Schwere Abenddüfte können bei Hitze schnell aufdringlich wirken.'
        ]
      }
    ]
  },
  {
    slug: 'welcher-duft-zu-welchem-anlass',
    title: 'Welcher Duft passt zu welchem Anlass?',
    description:
      'Büro, Date oder Abend: nicht jeder Duft passt überall. So findest du den richtigen Duft für Alltag, Date und besondere Abende.',
    heroImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&q=80&fit=crop',
    intro: [
      'Der gleiche Duft wirkt im Büro anders als beim Date, und ein schwerer Abendduft im Grossraumbüro kann schnell für Unmut sorgen. Als Faustregel gilt: tagsüber dezent und sauber, abends darf es wärmer und intensiver sein.',
      'Der Anlass beeinflusst nicht nur, welche Duftrichtung passt, sondern auch, wie viel du aufträgst. Im Büro soll dein Duft angenehm auffallen, nicht dominieren. Beim Date darf er mehr Persönlichkeit und Wärme zeigen. An einem besonderen Abend ausser Haus sind opulente Düfte ausdrücklich willkommen.',
      'Wer diese einfachen Regeln kennt, liegt fast immer richtig. Hier findest du passende Empfehlungen für die wichtigsten Anlässe, mit konkreten Düften und Dosierungs-Tipps.'
    ],
    sections: [
      {
        heading: 'Für Alltag & Büro: dezent und gepflegt',
        body: [
          'Frisch, sauber und nicht zu aufdringlich. Damit liegst du im Büro immer richtig. Achte auf leichte Konzentrationen (Eau de Toilette) und frische bis holzige Familien. Schwere Orientalika, Oud oder intensive Gourmands wirken in geschlossenen Räumen schnell erdrückend.',
          'Dosierung: Im Büro reichen ein bis maximal zwei Sprühstösse. Den Duft eher auf die Kleidung als grossflächig auf die Haut tragen, das wirkt dezenter und hält dennoch den ganzen Tag.'
        ],
        perfumes: ['chanel-bleu-de-chanel', 'terre-dhermes', 'boss-bottled', 'ysl-y-edp', 'le-labo-santal-33']
      },
      {
        heading: 'Für Dates: charmant und anziehend',
        body: [
          'Etwas süsser, wärmer oder blumiger: Düfte, die in Erinnerung bleiben. Wichtig ist die Balance, dezent genug für die Nähe, aber präsent genug, um aufzufallen und einen bleibenden Eindruck zu hinterlassen.',
          'Die besten Date-Düfte haben einen warmen Kern unter einer frischen Oberfläche. Vanille, weicher Moschus, Amber oder Praline gelten als besonders anziehend. Für den Sommer lieber frisch bleiben, für Herbst und Winter darf es tiefer und sinnlicher sein.'
        ],
        perfumes: ['ysl-black-opium', 'coco-mademoiselle', 'lancome-la-vie-est-belle', 'versace-eros', 'pdm-delina']
      },
      {
        heading: 'Für besondere Abende: intensiv und edel',
        body: [
          'Hier dürfen die grossen, tiefen Düfte ran, mit Projektion und echtem Charakter. Abends ausser Haus darf ein Duft mutig sein, ohne Rücksicht auf Büro-Etikette.',
          'Oud, Tabak, intensive Amber-Akkorde oder schwere Blüten wie Jasmin und Tuberose kommen am Abend erst richtig zur Geltung. Die kühlere Nachtluft verlangsamt die Entfaltung, was die Duftkurve eleganter macht.'
        ],
        perfumes: ['creed-aventus', 'tobacco-vanille', 'mugler-angel', 'tom-ford-oud-wood', 'baccarat-rouge-540']
      },
      {
        heading: 'Für Sport & Outdoor: frisch und unkompliziert',
        body: [
          'Beim Sport oder draussen braucht es etwas Leichtes, das sich mit Wärme und Bewegung gut verträgt. Aquatische und zitrische Düfte, die sauber und unaufdringlich bleiben, passen hier am besten.',
          'Auf starke Düfte beim Sport verzichten. Oud und Vanille können unangenehm werden, wenn man schwitzt. Ein frischer Eau-de-Toilette-Duft mit Zitrus oder Meeresbrise ist die beste Wahl für aktive Tage.'
        ],
        perfumes: ['davidoff-cool-water', 'allure-homme-sport', 'prada-luna-rossa-ocean']
      }
    ]
  },
  {
    slug: 'suesse-duefte-vanille-schokolade-karamell',
    title: 'Süße Düfte: Vanille, Schokolade & Karamell',
    description:
      'Warme, süße Gourmand-Düfte mit Vanille, Schokolade, Karamell und Tonkabohne, kuschelig, sinnlich und perfekt für kühle Tage.',
    heroImage: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200&q=80&fit=crop',
    intro: [
      'Süsse Düfte, auch Gourmands genannt, riechen nach guten Dingen: Vanille, Schokolade, Karamell, Praline oder Kaffee. Sie wirken warm, einladend und bleiben angenehm in Erinnerung und gehören zu den beliebtesten Duftrichtungen überhaupt, besonders in der kühlen Jahreszeit.',
      'Gourmand-Düfte können sehr unterschiedlich sein: mal leicht und cremig-pudrig, mal tief und würzig mit Tabak oder Gewürzen, mal richtig dessertartig. Wichtig ist, die Dosierung im Griff zu behalten. Süsse Düfte wirken intensiver als frische, und eine Wolke Karamell im vollen Bus ist nicht das Ziel.',
      'Hier unsere süssesten Empfehlungen aus dem Katalog, von günstig bis edel, für Damen, Herren und alle mit einem Faible für verführerische Wärme.'
    ],
    sections: [
      {
        heading: 'Süsse Lieblingsdüfte aus dem Katalog',
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
      },
      {
        heading: 'Welcher süsse Typ bist du?',
        body: [
          'Cremig & dessertartig: Kayali Vanilla 28, Burberry Goddess und Lattafa Yara gehen in die weiche, fast essbare Richtung. Kuschelig, pudrig, ideal für Herbst und Winter.',
          'Kaffee & Praliné: Montale Intense Café und YSL Black Opium kombinieren süsse Noten mit einer dunklen, leicht bitteren Kaffee-Dimension, die erwachsenere Variante.',
          'Würzig & tief: Tobacco Vanille und Khamrah paaren Süsse mit Tabak, Zimt und Dattel. Das wirkt edel und sehr langlebig, aber nichts für zarte Gemüter.',
          'Gourmand Light: Wer es alltagstauglich mag, wählt süsse Düfte mit Holz- oder Moschuskante. Sie wirken weniger schwer und passen besser ins Büro.'
        ]
      },
      {
        heading: 'Worauf du bei süssen Düften achten solltest',
        body: [
          'Süsse Gourmand-Düfte sind oft sehr präsent. Ein bis zwei Sprühstösse reichen, sonst wirken sie schnell zu schwer, besonders in geschlossenen Räumen.',
          'Am schönsten kommen sie in der kühlen Jahreszeit und am Abend zur Geltung. Bei grosser Hitze können süsse Düfte schnell aufdringlich werden; im Sommer lieber dezenter wählen.',
          'Auf trockener Haut hält ein Gourmand-Duft kürzer. Eine geruchsneutrale Bodylotion vorher verlängert die Haltbarkeit deutlich.',
          'Wer es süss, aber alltagstauglich mag, greift zu Varianten mit etwas Frische oder Holz. Das macht sie weniger „dessertartig" und vielseitiger tragbar.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-winterduefte',
    title: 'Die besten Winterdüfte: warm, intensiv & einhüllend',
    description:
      'Wärmende Düfte für Herbst und Winter: Oud, Amber, Vanille und Gewürze, die bei Kälte besonders schön zur Geltung kommen.',
    heroImage: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80&fit=crop',
    intro: [
      'Im Winter darf ein Duft schwerer und wärmer sein. Holz, Amber, Oud, Gewürze und süsse Noten entfalten sich bei Kälte besonders gut und hüllen dich angenehm ein. Im Sommer würden dieselben Düfte schnell erdrückend wirken, sobald aber die Temperaturen sinken, kommen sie erst richtig zur Geltung.',
      'Die kalte Jahreszeit ist die grosse Bühne für warme Duftfamilien: Orientalische Düfte mit Weihrauch und Moschus, dunkle Holzdüfte mit Oud und Sandelholz oder opulente Gourmands mit Vanille und Karamell. Bei fünf Grad draussen entfalten sie sich langsam und harmonisch, statt aufdringlich zu wirken.',
      'Dabei geht es nicht darum, den schwersten Duft im Regal zu greifen. Auch im Winter lohnt es sich, auf die Situation zu achten: Am Abend darf es gerne intensiv sein, im Büro ist etwas Zurückhaltung angebracht. Hier unsere liebsten Winterdüfte aus dem Katalog, warm, einhüllend und mit echter Tiefe.'
    ],
    sections: [
      {
        heading: 'Die besten Winterdüfte für Damen',
        perfumes: [
          'mugler-angel',
          'baccarat-rouge-540',
          'tobacco-vanille',
          'ysl-black-opium',
          'khamrah'
        ]
      },
      {
        heading: 'Die besten Winterdüfte für Herren',
        perfumes: [
          'lattafa-asad',
          'tom-ford-oud-wood',
          'nasomatto-black-afgano',
          'initio-oud-greatness',
          'xerjoff-naxos'
        ]
      },
      {
        heading: 'Günstige Winterdüfte unter 50 CHF',
        body: [
          'Wer seinen Winterduft nicht für 150 Franken kaufen möchte: Lattafa Asad und Khamrah sind beide unter 40 CHF erhältlich und bieten für den Preis ausgezeichnete Haltbarkeit und Projektion. Asad geht in die fruchtig-rauchige Richtung von Creed Aventus, Khamrah ist würzig-süss und kuschelig. Beide halten im Winter problemlos den ganzen Tag, ein bis zwei Sprühstösse reichen völlig.'
        ]
      },
      {
        heading: 'Worauf du bei Winterdüften achten solltest',
        body: [
          'In der Kälte darf ein Duft kräftiger sein. Warme Noten wie Vanille, Amber, Oud und Gewürze entfalten sich bei niedrigen Temperaturen besonders schön und setzen sich harmonisch durch, ohne aufdringlich zu wirken.',
          'Höhere Konzentrationen (Eau de Parfum oder Extrait) lohnen sich im Winter, weil sie länger halten und mehr Tiefe haben. Auf der Haut hält ein Duft im Winter oft länger als im Sommer; an sehr kalter Luft braucht er aber einen kurzen Moment, um sich vollständig zu entfalten.',
          'Eincremen vor dem Sprühen hilft gerade in der Heizungssaison. Trockene Luft entzieht der Haut Feuchtigkeit und lässt Düfte schneller verfliegen. Eine geruchsneutrale Bodylotion gibt dem Duft besseren Halt.',
          'Dosierung: Auch wenn Winterdüfte draussen dezenter wirken, reichen im warmen Restaurant oder Bus meist ein bis zwei Sprühstösse vollkommen. Wer morgens zu grosszügig dosiert, bereut es oft am Abend im Innenraum.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-unisex-duefte',
    title: 'Die besten Unisex-Düfte für Damen und Herren',
    description: 'Unisex-Parfums kennen keine Grenzen. Die schönsten geschlechtsneutralen Düfte für alle, die Parfum jenseits von Damen- und Herrenabteilungen suchen.',
    heroImage: '/images/ratgeber/unisex-duefte.jpg',
    intro: [
      'Die Grenzen zwischen Damen- und Herrendüften verschwimmen seit Jahren. Immer mehr Menschen suchen nach Parfums, die einfach gut riechen, unabhängig davon, ob sie in der Damen- oder Herrenabteilung stehen. Unisex-Parfums haben dieses Bedürfnis längst aufgegriffen und liefern Düfte, die so unterschiedlich sind wie ihre Trägerinnen und Träger.',
      'Was macht einen Duft "unisex"? Nicht eine neutrale Langweiligkeit, sondern vielmehr ein Gleichgewicht zwischen Elementen, die traditionell mit Weiblichkeit oder Männlichkeit assoziiert werden. Ein guter Unisex-Duft enthält oft sowohl frische, klare Akkorde als auch wärmere, erdige Elemente und wirkt auf jeder Haut anders.',
      'Die Nischenperfumerie hat die Unisex-Welt stark geprägt: Maison Margiela Replica-Linie, Byredo, Le Labo, Aesop und viele andere verzichten komplett auf Geschlechtszuschreibungen. Dieser Ratgeber zeigt die schönsten Vertreter des Genres, von zugänglich bis experimentell.',
    ],
    sections: [
      {
        heading: 'Klassische Unisex-Empfehlungen',
        body: [
          'Maison Margiela Replica By the Fireplace ist einer der beliebtesten Unisex-Düfte überhaupt: warm, rauchig, mit Kastanien und Vanille. Er erzählt eine Geschichte und funktioniert auf Männern und Frauen gleichermassen gut.',
          'Le Labo Santal 33 ist ein anderer Kultduft: Sandelholz, Iris und Zeder in einer milchig-cremigen Komposition. Er hat fast schon Kult-Status in bestimmten Kreisen und erkennt man in New Yorker Restaurants oder Zürcher Galerien.',
          'Byredo Gypsy Water verbindet Bergamotte, Wacholderbeere, Sandelholz und Vanille zu einem Duft, der unbeschwert und doch tiefgründig wirkt. Ein Einstieg in die Welt der Nischendüfte ohne zu viel Risiko.',
        ],
      },
      {
        heading: 'Zugängliche Unisex-Optionen im mittleren Preissegment',
        body: [
          'Jo Malone ist eine ganze Welt an Unisex-Düften: die meisten Kompositionen des englischen Hauses sind bewusst geschlechtsneutral und vielseitig. Jo Malone Lime Basil and Mandarin, Wood Sage and Sea Salt oder Peony and Blush Suede sind hervorragende Einstiegspunkte.',
          'Hermès Terre d\'Hermès wird als Herrenduft vermarktet, wird aber von vielen Frauen getragen und gilt in der Parfumwelt als quasi-unisex. Dieselbe Logik gilt für Dior Homme: formal ein Herrenduft, beliebt bei Menschen jeden Geschlechts.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Zara hat mehrere Unisex-Düfte im Sortiment, die unter 15 CHF kosten. Besonders Zara Emotions Collection ist bewusst geschlechtsneutral ausgelegt.',
          'The Body Shop White Musk ist seit Jahrzehnten ein Geheimtipp für alle, die einen weichen, sauberen, unaufdringlichen Duft suchen, der von Männern und Frauen gleichermassen getragen werden kann. Preis: unter 25 CHF.',
        ],
      },
    ],
  },
  {
    slug: 'parfum-inhaltsstoffe-allergene',
    title: 'Parfum-Inhaltsstoffe & Allergene einfach erklärt',
    description:
      'Was steckt eigentlich in einem Parfum? Alkohol, Duftöl und die deklarationspflichtigen Duftallergene wie Limonene und Linalool, einfach und verständlich erklärt.',
    heroImage: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&q=80&fit=crop',
    intro: [
      'Auf jeder Parfumverpackung steht eine Liste mit Inhaltsstoffen, oft mit lateinischen Namen, die etwas einschüchternd wirken. Dabei steckt dahinter kein Hexenwerk. Hier erklären wir dir einfach, was wirklich drin ist und worauf empfindliche Haut achten sollte.',
      'Wichtig vorweg: Die genaue Zusammensetzung ist von Duft zu Duft unterschiedlich und kann sich ändern. Die vollständige, gültige Liste findest du immer auf der Verpackung bzw. beim Hersteller. Dieser Artikel erklärt das Allgemeine.'
    ],
    sections: [
      {
        heading: 'Woraus besteht ein Parfum grundsätzlich?',
        body: [
          'Ein Parfum besteht im Kern aus nur drei Hauptbestandteilen:',
          '1. Alkohol (auf der Liste „Alcohol Denat." oder „Alcohol"): Das Trägermittel, das den Duft verteilt und schnell verdunsten lässt. Er macht meist den grössten Anteil aus.',
          '2. Wasser (Aqua): Sorgt für die richtige Konsistenz.',
          '3. Duftöl (Parfum / Fragrance): Die eigentliche Duftmischung aus vielen einzelnen Riechstoffen. Das Herzstück, das den Charakter ausmacht.'
        ]
      },
      {
        heading: 'Warum steht da nur „Parfum" und keine genaue Mischung?',
        body: [
          'Die genaue Duftformel ist ein gut gehütetes Betriebsgeheimnis der Hersteller. Deshalb darf die Mischung der Riechstoffe gesammelt als „Parfum" oder „Fragrance" angegeben werden. Sonst könnte jeder den Duft einfach nachbauen.',
          'Genau deshalb arbeiten wir auf Auressa mit Duftnoten (z. B. Bergamotte, Vanille, Sandelholz): Sie beschreiben, wie ein Duft riecht und wirkt, was für dich viel hilfreicher ist als eine Chemie-Liste.'
        ]
      },
      {
        heading: 'Deklarationspflichtige Allergene: Limonene, Linalool & Co.',
        body: [
          'Bestimmte natürliche Duftbestandteile können bei empfindlichen Menschen Hautreaktionen auslösen. In der EU (und in der Schweiz angelehnt) müssen solche Stoffe ab einer gewissen Menge einzeln genannt werden, deshalb tauchen sie auf der Liste auf. Lange waren das 26 Stoffe; die EU hat die Liste inzwischen deutlich erweitert (auf über 80).',
          'Die häufigsten sind: Limonene (zitrusartig), Linalool (blumig, in Lavendel), Citronellol und Geraniol (rosig), Eugenol (würzig, Nelke), Coumarin (heuartig, süsslich) und Citral.',
          'Wichtig: Diese Stoffe sind nicht „schlecht". Sie stecken auch in vielen natürlichen Ölen und Blüten. Sie werden nur aufgelistet, damit Allergikerinnen und Allergiker sie erkennen können.'
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
        heading: 'Bonus: EdT, EdP oder Parfum: was ist der Unterschied?',
        body: [
          'Der Unterschied liegt in der Konzentration des Duftöls:',
          'Eau de Toilette (EdT): leichter, frischer, hält kürzer, ideal für den Sommer und tagsüber.',
          'Eau de Parfum (EdP): höhere Konzentration, intensiver und langanhaltender. Der häufigste Typ.',
          'Parfum / Extrait: am intensivsten und teuersten, hält am längsten. Schon wenig genügt.'
        ]
      },
      {
        body: [
          'Mein Tipp: Wenn du wissen willst, welche Duftrichtung zu dir passt, mach unser Duft-Quiz. Danach zeigen wir dir die passenden Düfte samt Noten, Saison und Anlass.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-duefte-unter-50-franken',
    title: 'Die besten Düfte unter 50 Franken',
    description:
      'Gut riechen muss nicht teuer sein: Unsere Lieblingsdüfte für unter CHF 50, von frisch bis süss, für Damen, Herren und Unisex.',
    heroImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80&fit=crop',
    intro: [
      'Ein toller Duft muss nicht 150 Franken kosten. Gerade von Marken wie Lattafa, Armaf oder Davidoff gibt es erstaunlich gute Parfüms für kleines Geld, mit ordentlicher Haltbarkeit, schöner Projektion und einer Zusammensetzung, die sich nicht nach billig anfühlt.',
      'In der Schweiz ist die Auswahl an günstigen Düften grösser als viele denken. Notino.ch, Douglas und Parfümerien haben arabische Marken wie Lattafa inzwischen fest im Sortiment. Wer weiss, wo man schaut, findet echte Geheimtipps für 20 bis 40 CHF, die sich neben 200-Franken-Flakons nicht zu verstecken brauchen.',
      'Hier unsere Favoriten unter CHF 50, perfekt zum Ausprobieren, Verschenken oder für jeden Tag. Aufgeteilt nach Duftrichtung, damit du schnell das Passende findest.'
    ],
    sections: [
      {
        heading: 'Die besten günstigen Düfte unter 50 CHF',
        perfumes: [
          'khamrah',
          'lattafa-asad',
          'club-de-nuit-intense',
          'davidoff-cool-water',
          'lattafa-yara',
          'joop-homme',
          'sdj-cheirosa-62',
          'tabac-original'
        ]
      },
      {
        heading: 'Frisch & aquatisch unter 50 CHF',
        body: [
          'Davidoff Cool Water ist nach wie vor einer der besten frischen Herrendüfte für kleines Geld, aquatisch, sauber und ideal für Sommer und Büro. Joop Homme ist eine weitere günstige Klassiker-Option, würzig-blumig und mit guter Haltbarkeit.',
          'Für Damen ist Lattafa Mayar eine frische, leicht blumige Option weit unter 40 CHF, alltagstauglich und nie aufdringlich.'
        ]
      },
      {
        heading: 'Süss & warm unter 50 CHF',
        body: [
          'Lattafa Khamrah ist einer der beeindruckendsten Günstig-Düfte überhaupt: würzig-süss mit Dattel, Zimt und Vanille. Haltbarkeit und Projektion sind für den Preis aussergewöhnlich gut. Ähnliche Qualität bietet Lattafa Asad in der fruchtig-rauchigen Richtung.',
          'Lattafa Yara ist ein cremig-süsser Damenliebling mit weicher Vanille und Blüten, beliebt und zu Recht für seine Haltbarkeit bekannt. Sol de Janeiro Cheirosa 62 geht in eine ähnlich sonnige, cremige Richtung mit Pistazie und Karamell.'
        ]
      },
      {
        heading: 'Worauf du bei günstigen Düften achten solltest',
        body: [
          'Günstig heisst nicht schlechter: Gerade arabische Marken wie Lattafa und Armaf bieten erstaunliche Haltbarkeit und Projektion für wenig Geld.',
          'Achte auf die Variante: Oft gibt es bei diesen Marken das intensivere Eau de Parfum ohne Aufpreis, für mehr Tiefe und Haltbarkeit.',
          'Sparsam dosieren: Viele günstige Düfte sind kräftig. Ein bis zwei Sprühstösse reichen meist völlig.',
          'Vor dem grossen Flakon lohnt sich eine kleine Abfüllung oder Probe. So vermeidest du Fehlkäufe, auch im kleinen Budget.'
        ]
      },
      {
        body: [
          'Tipp: Viele dieser günstigen Düfte sind auch starke Dupes für teure Originale. Schau dazu in unseren Ratgeber zu günstigen Alternativen für teure Parfüms.'
        ]
      }
    ]
  },
  {
    slug: 'wie-lange-haelt-parfum-haltbarkeit',
    title: 'Wie lange hält ein Parfum? Haltbarkeit & richtig auftragen',
    description:
      'Wie du Parfum richtig aufträgst, damit es länger hält, plus warum Düfte verfliegen, welche am längsten halten und wie lange ein Parfum haltbar ist. Mit den langlebigsten Düften aus unserem Katalog.',
    heroImage: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=80&fit=crop',
    intro: [
      'Wie lange ein Duft hält, hängt von zwei Dingen ab: wie du ihn aufträgst und welcher Duft es ist. Beides erklären wir hier, verständlich und ganz ohne Fachwissen.',
      'Zuerst die besten Tipps zum richtigen Auftragen, danach alles zur Haltbarkeit: warum Düfte verfliegen, welche am längsten halten und wie lange ein Parfum überhaupt haltbar ist.'
    ],
    sections: [
      {
        heading: 'Wohin Parfum auftragen? Die richtigen Stellen',
        body: [
          'Trag Parfum auf die sogenannten Pulspunkte auf: Handgelenke, Halsansatz, hinter den Ohren und in die Ellenbeugen. Dort liegen Blutgefässe nahe an der Haut, die Wärme abgeben. Das hilft, den Duft sanft zu verströmen.',
          'Ein Profi-Trick: Sprüh auch etwas auf den Brustkorb (Dekolleté). Düfte steigen über den Tag nach oben, deshalb hält ein Duft von unten oft länger wahrnehmbar.',
          'Wer mag, sprüht zusätzlich ein bis zwei Stösse auf die Kleidung oder einen Schal. Auf Stoff hält ein Duft oft deutlich länger als auf der Haut. Vorsicht nur bei empfindlichen oder hellen Stoffen, da manche Düfte Flecken hinterlassen können.'
        ]
      },
      {
        heading: 'Wie viele Sprühstösse sind richtig?',
        body: [
          'Als Faustregel: zwei bis vier Sprühstösse reichen für die meisten Düfte völlig. Leichte, frische Düfte (Eau de Toilette) dürfen etwas grosszügiger sein, intensive Düfte (Eau de Parfum, Parfum) brauchen weniger.',
          'Weniger ist fast immer mehr: Du selbst riechst deinen Duft nach kurzer Zeit kaum noch (die Nase gewöhnt sich daran), andere aber sehr wohl. Wer „nachlegt, weil man nichts mehr riecht", überdosiert schnell.',
          'Bei Hitze wirkt ein Duft intensiver als im Winter. Im Sommer also lieber sparsamer dosieren.'
        ]
      },
      {
        heading: 'Der häufigste Fehler: Handgelenke aneinander reiben',
        body: [
          'Fast alle machen es, und es schadet dem Duft: Nach dem Auftragen die Handgelenke aneinanderzureiben. Durch die Reibung entsteht Wärme, die die feinen Kopfnoten „zerbricht" und den Duft schneller verfliegen lässt.',
          'Besser: einfach auftragen und kurz antrocknen lassen. Nicht reiben, nicht föhnen, nicht verwischen.'
        ]
      },
      {
        heading: 'So hält dein Duft den ganzen Tag',
        body: [
          'Trag Parfum auf frisch geduschte, leicht eingecremte Haut auf. Auf trockener Haut verfliegt ein Duft schneller. Eine geruchsneutrale Bodylotion oder Vaseline an den Pulspunkten gibt dem Duft „Halt".',
          'Der beste Zeitpunkt ist direkt nach dem Duschen, wenn die Poren noch leicht geöffnet sind.',
          'Sprüh aus rund 15–20 cm Abstand, damit sich der Duft fein verteilt statt in einem nassen Fleck zu landen.',
          'Für unterwegs lohnt sich ein kleiner Reisezerstäuber: So kannst du am Nachmittag dezent auffrischen, ohne das grosse Fläschchen mitzuschleppen.'
        ]
      },
      {
        heading: 'Warum verfliegt mein Parfum so schnell?',
        body: [
          'Wenn ein Duft kaum hält, liegt es selten am Parfum allein. Häufige Gründe: sehr trockene Haut (der Duft hat nichts, woran er „haften" kann), eine leichte Konzentration wie Eau de Toilette, oder schlicht zu wenig aufgetragen.',
          'Auch die Duftrichtung spielt mit: frische, zitrische Düfte sind von Natur aus flüchtiger als warme, süsse oder holzige Kompositionen.',
          'Und manchmal riechst du deinen eigenen Duft nur selbst nicht mehr, obwohl andere ihn noch deutlich wahrnehmen. Die Nase gewöhnt sich daran (man nennt das Geruchsadaption).'
        ]
      },
      {
        heading: 'Welche Düfte halten von Natur aus am längsten?',
        body: [
          'Als Faustregel halten warme, schwere Duftfamilien länger als leichte, frische:',
          'Gourmand (Vanille, Karamell, Tonkabohne) und orientalische Düfte: sehr langlebig, oft 8–12 Stunden.',
          'Holzige Düfte (Sandelholz, Oud, Patchouli): ebenfalls sehr ausdauernd.',
          'Florale Düfte: mittlere Haltbarkeit, je nach Aufbau.',
          'Frische und zitrische Düfte (Clean): am flüchtigsten, dafür herrlich leicht im Sommer. Hier lohnt sich ein zweiter Sprühstoss am Mittag.'
        ]
      },
      {
        heading: 'Parfum richtig lagern',
        body: [
          'Hitze, Licht und Luft sind die grössten Feinde eines Dufts. So bleibt er länger frisch:',
          'Kühl und dunkel lagern. Ein geschlossener Schrank ist besser als das Fensterbrett.',
          'Nicht im Badezimmer aufbewahren: die ständigen Temperatur- und Feuchtigkeitswechsel lassen den Duft schneller „kippen".',
          'In der Originalverpackung lassen. Der Karton schützt zuverlässig vor Licht.',
          'Den Flakon nicht schütteln und gut verschlossen halten, damit möglichst wenig Luft hineingelangt.'
        ]
      },
      {
        heading: 'Wie lange ist ein Parfum haltbar?',
        body: [
          'Ungeöffnet und kühl gelagert hält ein Parfum oft viele Jahre. Nach dem Öffnen entfaltet es sich am schönsten innerhalb der ersten ein bis drei Jahre.',
          'Woran du erkennst, dass ein Duft „umgekippt" ist: Die Farbe wird deutlich dunkler, er riecht oben säuerlich oder metallisch, oder der Charakter wirkt flach und alkoholisch.',
          'Ein kleiner Hinweis auf der Verpackung: das Tiegel-Symbol mit „12M" oder „24M" gibt an, wie viele Monate der Duft nach dem Öffnen optimal ist.'
        ]
      },
      {
        heading: 'Die langlebigsten Düfte aus unserem Katalog',
        perfumes: [
          'tobacco-vanille',
          'baccarat-rouge-540',
          'khamrah',
          'montale-intense-cafe',
          'mugler-angel',
          'club-de-nuit-intense'
        ]
      },
      {
        body: [
          'Du kennst jetzt die Tricks fürs Auftragen und die Haltbarkeit. Fehlt nur noch der passende Duft? Mach unser Duft-Quiz und finde in unter einer Minute heraus, welche Richtung wirklich zu dir passt.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-geschenk-die-besten-duefte-zum-verschenken',
    title: 'Parfum verschenken: die besten Düfte als Geschenk',
    description:
      'Parfum ist ein wunderschönes Geschenk, wenn es passt. Unsere sicheren Favoriten zum Verschenken für Frauen und Männer, plus Tipps zur Auswahl.',
    heroImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80&fit=crop',
    intro: [
      'Ein Duft ist ein persönliches, edles Geschenk, wenn er passt. Die Kunst ist, etwas zu wählen, das fast jeder mag: nicht zu speziell, aber trotzdem besonders. Ein klassischer, vielseitiger Duft kommt fast immer besser an als ein ausgefallener Nischen-Geheimtipp, den die beschenkte Person möglicherweise nie getragen hätte.',
      'Wenn du den Geschmack der Person nicht gut kennst, bist du mit beliebten, zugänglichen Düften auf der sicheren Seite. Chanel, Dior oder Lancôme sind fast immer eine gute Wahl. Klassisch und hochwertig, das Fläschchen sieht edel aus, der Duft hat einen guten Ruf.',
      'Hier unsere Geschenk-Favoriten für Frauen und Männer, von frisch bis warm-elegant. Dazu die wichtigsten Tipps, damit das Geschenk ankommt.'
    ],
    sections: [
      {
        heading: 'Für Frauen: sichere Geschenk-Klassiker',
        body: [
          'Chanel Coco Mademoiselle ist eines der meistgeschenkten Parfüms der Welt, und das zu Recht. Zeitlos elegant, frisch-blumig mit warmem Patchouli, kaum jemand, dem es nicht gefällt.',
          'Lancôme La Vie Est Belle ist eine etwas wärmere, leicht süsse Option: Iris und Patschuli, edel aber zugänglich. Für alle, die es etwas wärmer mögen als Coco Mademoiselle.',
          'YSL Black Opium ist die mutigere Wahl: süss, kaffeehaltig und selbstbewusst. Sehr gut als Geschenk für Frauen, die stilbewusst sind und moderne Düfte mögen.'
        ],
        perfumes: ['coco-mademoiselle', 'lancome-la-vie-est-belle', 'ysl-black-opium', 'ch-good-girl']
      },
      {
        heading: 'Für Männer: zeitlose Favoriten',
        body: [
          'Chanel Bleu de Chanel ist das männliche Gegenstück zu Coco Mademoiselle: frisch-holzig, elegant und so vielseitig, dass er fast jedem Mann steht.',
          'Jean Paul Gaultier Le Male ist ein süsserer, warmer Klassiker, der seit Jahrzehnten Komplimente einheimst. Boss Bottled ist die dezentere, alltagstauglichere Option.'
        ],
        perfumes: ['chanel-bleu-de-chanel', 'le-male', 'ea-stronger-with-you', 'boss-bottled']
      },
      {
        heading: 'Günstige Geschenk-Optionen unter 50 CHF',
        body: [
          'Wer ein schönes Duftgeschenk unter 50 CHF sucht, greift zu Lattafa Yara für Frauen oder Armaf Club de Nuit Intense Man für Männer.',
          'Beide bieten für den Preis ausgezeichnete Haltbarkeit und einen gefälligen Charakter. Als Geheimtipp-Geschenk für jemanden, der offen für neue Entdeckungen ist, funktionieren sie sehr gut.'
        ]
      },
      {
        heading: 'Tipps für das perfekte Duft-Geschenk',
        body: [
          'Denk an den Stil der Person: Mag sie es eher frisch und dezent oder warm und auffällig? Im Zweifel passt ein vielseitiger Klassiker fast immer.',
          'Eau de Parfum wirkt als Geschenk edler und hält länger als ein leichtes Eau de Toilette. Der Preisunterschied ist oft nicht gross, aber der Eindruck schon.',
          'Ein bekannter, beliebter Duft ist sicherer als ein sehr spezieller. Ausgefallene Nischendüfte sind Geschmackssache. Toll, wenn du den Geschmack der Person gut kennst, riskanter sonst.',
          'Auf Vorrat kaufen: Schau, ob die Person schon einen Duft trägt, den sie liebt. Eine zweite Flasche davon ist fast nie falsch.',
          'Schön verpackt mit einer kleinen Karte macht das Geschenk persönlicher.'
        ]
      },
      {
        body: [
          'Unsicher, was die Person mag? Mach das Duft-Quiz gemeinsam oder nutze es als Orientierung. So triffst du den Geschmack viel sicherer.'
        ]
      }
    ]
  },
  {
    slug: 'maennerduefte-die-frauen-moegen',
    title: 'Männerdüfte, die Frauen wirklich mögen: Was Studien und Erfahrungen zeigen',
    description: 'Welche Herrendüfte kommen bei Frauen wirklich gut an? Von sauber und frisch bis warm und sinnlich: diese Männerparfums machen Eindruck.',
    heroImage: '/images/ratgeber/maennerduefte-frauen-moegen.jpg',
    intro: [
      'Was riecht ein Mann, damit Frauen aufhorchen? Diese Frage beschäftigt die Parfumwerbung seit Jahrzehnten und führt meist zu Klischees: Sportlichkeit, Abenteuer, Stärke. Die Realität ist differenzierter und interessanter. Studien und informelle Befragungen zeigen, dass Frauen bei Männern vor allem auf Sauberkeit, Wärme und Authentizität reagieren, nicht auf aggressive Maskulinität.',
      'Saubere, leicht süssliche und warme Düfte kommen bei Frauen besonders gut an: Noten von Vanille, Sandelholz, Kaschmir und weissem Moschus lösen positive Reaktionen aus. Im Gegensatz dazu können zu starke, schrille oder aufdringlich-sportliche Düfte abstoßend wirken.',
      'Dieser Ratgeber zeigt Herrendüfte, die konsistent positive Reaktionen bei Frauen erzielen, und erklärt, warum bestimmte Duftprofile besonders anziehend wirken. Gleichzeitig: Das Beste Parfum ist das, das authentisch zu einem passt, nicht das, das man sich nach einer Liste kauft.',
    ],
    sections: [
      {
        heading: 'Warm und sinnlich: Düfte, die Nähe erzeugen',
        body: [
          'Parfums mit Sandelholz, Moschus und einem Hauch Vanille wirken anziehend, weil sie mit Hauttemperatur interagieren und etwas erzeugen, das fast körperlich ist. Dior Homme Intense ist ein Paradebeispiel: Iris und Kakao über einem trockenen Holz, fast wie eine zweite Haut.',
          'Tom Ford Tobacco Vanille ist ein weiterer Fan-Liebling: süss, rauchig, tabakig. Bei Frauen ausgesprochen beliebt, weil er komplex, warm und gleichzeitig angenehm-sanft ist.',
          'Yves Saint Laurent La Nuit de l\'Homme ist vielleicht der am häufigsten genannte "Lieblings-Herrenduft von Frauen": Kardamom, Zedernholz, Bergamotte. Er ist elegant und warm ohne zu schwer zu sein.',
        ],
      },
      {
        heading: 'Frisch und sauber: Düfte, die Vertrauen signalisieren',
        body: [
          'Frische, saubere Düfte strahlen Gepflegtheit aus. Bleu de Chanel EDP ist in Befragungen regelmässig unter den Top-Herrenparfums, die Frauen mögen: sauber, holzig, elegant.',
          'Acqua di Giò ist seit 30 Jahren ein Bestseller, und zwar auch deshalb, weil er bei Frauen gut ankommt. Die Kombination aus Meeresbrise und weichem Moschus ist angenehm und signalisiert Sauberkeit.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Lattafa Khamrah kommt bei Frauen oft sehr gut an, weil er warm und süsslich ist ohne zu aufdringlich zu sein, für unter 30 CHF.',
          'Armaf Club de Nuit Intense Man ist ein weiterer Budget-Favorit. Die Ähnlichkeit zu Creed Aventus, der ebenfalls beliebt bei Frauen ist, macht ihn zu einem attraktiven Kauf.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-vanille-duefte',
    title: 'Die besten Vanille-Düfte für Damen und Herren',
    description: 'Vanille ist die begehrteste Basennote der Parfumwelt. Cremig, warm und anziehend: unsere Empfehlungen von der klassischen Puderwolke bis zur modernen Reinterpretation.',
    heroImage: '/images/ratgeber/vanille-duefte.jpg',
    intro: [
      'Vanille ist der Superstar unter den Basisnoten. Kaum eine andere Zutat ist so universell geliebt und gleichzeitig so schwer perfekt umzusetzen. Eine gute Vanille-Komposition riecht nicht nach Vanillezucker oder Kuchenteig, sondern warm, cremig und sinnlich, fast wie eine zweite Haut.',
      'Die Kunst liegt im Zusammenspiel: Vanille allein kann schnell eindimensional und süss wirken. In Kombination mit Holz, Moschus, Amber oder Blumen entfaltet sie ihre volle Pracht. Das bekannteste Beispiel ist Guerlain Shalimar, der seit 1925 Vanille mit Bergamotte, Iris und Zibet verbindet und damit eine Legende schuf.',
      'Heute gibt es Vanilledüfte für jeden Geschmack: von der cremigen Patisserie bis zum minimalistischen Hautduft, von der üppigen orientalischen Opulenz bis zum modernen, fast rauchigen Vanille-Akkord. Dieser Ratgeber führt durch die schönsten Vertreter für Damen und Herren.',
    ],
    sections: [
      {
        heading: 'Vanille-Düfte für Damen',
        body: [
          'Guerlain Shalimar ist das Ur-Vanilleparfum und nach wie vor aussergewöhnlich: bergamottisch-frischer Auftakt, Iris und Jasmin im Herz, Vanille und Zibet in einer Basis, die wie kein anderer Duft riecht. In der EDP-Version ist er intensiver und wärmer, in der EDT-Version zugänglicher.',
          'Thierry Mugler Angel ist ein moderner Klassiker, der Vanille mit Kakao, Patchouli und Zitrus kombiniert zu einem Gourmand-Duft, der so eigenständig ist, dass er eine eigene Kategorie definierte. Nicht für Unentschlossene, aber für Liebhaber unvergesslich.',
          'Viktor and Rolf Flowerbomb hat eine vanillig-süsse Basis unter einem Blumen-Bouquet aus Jasmin, Rose und Freesie. Einer der meistverkauften Parfums der Welt, und das zu Recht: Er ist warm, weiblich und doch nicht banal.',
        ],
      },
      {
        heading: 'Vanille-Düfte für Herren',
        body: [
          'Tom Ford Tobacco Vanille ist das bekannteste Vanilleparfum für Männer: Tabak, Vanille und Kakaopulver in einer dichten, rauchigen Komposition. Ausgesprochen polarisierend und gleichzeitig sehr beliebt. Für Abende, nicht für das Büro.',
          'Lattafa Khamrah ist ein hervorragender, erschwinglicher Vanille-Oriental. Rum, Karamell und Vanille in einem Duft, der Männern nicht zu feminin und Frauen ausgesprochen angenehm ist.',
          'Paco Rabanne 1 Million hat eine Goldorangen-Vanille-Basis, die aufgrund ihrer Süsse eher im Herbst und Winter trägt. Einer der bekanntesten Herrendüfte überhaupt, wenn auch nicht der subtilste.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Lattafa Khamrah für unter 30 CHF ist unbestreitbar der beste Wert in der Vanille-Oriental-Kategorie. Wer Baccarat Rouge 540 oder ähnliche süsslich-vanillige Nischen-Hits mag und nicht den Preis zahlen will, findet hier eine echte Alternative.',
          'Im Drogeriemarkt: Monoprix, H&M und Zara haben gute, günstige Vanille-Düfte im Sortiment. Besonders H&M Rewild Your Skin ist eine angenehme, saubere Vanille-Moschus-Komposition für unter 20 CHF.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-oud-duefte',
    title: 'Die besten Oud-Düfte',
    description:
      'Oud, das flüssige Gold der Parfümerie: orientalisch, edel und intensiv. Unsere besten Oud-Düfte von günstig bis luxuriös.',
    heroImage: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=80&fit=crop',
    intro: [
      'Oud (auch Agarholz) ist eine der edelsten und intensivsten Duftnoten überhaupt: warm, holzig, leicht rauchig und sehr langanhaltend. Es gilt als flüssiges Gold der Parfümwelt, und das aus gutem Grund: Echter Oud stammt aus infiziertem Agarholz und ist extrem selten und entsprechend teuer.',
      'Die meisten Düfte arbeiten mit hochwertigen Oud-Akkorden statt echtem Agarholzöl. Das ist günstiger und für viele sogar angenehmer im Tragekomfort. Echter Oud kann sehr intensiv und gewöhnungsbedürftig sein. Synthetische oder semi-synthetische Varianten sind weicher und zugänglicher.',
      'Oud passt besonders gut in die kühle Jahreszeit und am Abend. Es harmoniert wunderbar mit Rose, Safran, Sandelholz und süssen Noten wie Vanille und Dattel. Hier unsere Empfehlungen, von erschwinglich bis exklusiv.'
    ],
    sections: [
      {
        heading: 'Die besten Oud-Düfte aus dem Katalog',
        perfumes: [
          'tom-ford-oud-wood',
          'initio-oud-greatness',
          'lattafa-badee-amethyst',
          'mancera-red-tobacco',
          'montale-arabians-tonka',
          'sa-shaghaf-oud',
          'penhaligons-halfeti'
        ]
      },
      {
        heading: 'Günstige Oud-Düfte unter 50 CHF',
        body: [
          'Lattafa Badee al Oud Amethyst ist einer der besten günstigen Oud-Düfte überhaupt: warm, orientalisch und sehr langlebig, für weit unter 40 CHF. Auch Lattafa Oud for Glory bietet eine safranig-würzige Oud-Erfahrung zum kleinen Preis.',
          'Diese günstigen Oud-Düfte sind ideal, um die Duftrichtung kennenzulernen, bevor du in ein teures Nischen-Oud investierst.'
        ]
      },
      {
        heading: 'Oud für Einsteiger',
        body: [
          'Wenn du Oud zum ersten Mal trägst, starte mit weicheren, süsslichen Varianten, etwa Oud mit Rose, Safran oder Vanille. Tom Ford Oud Wood ist ein guter Einstieg: edler Oud in einer zugänglichen, holzigen Komposition.',
          'Reines, rauchig-medizinisches Oud kann anfangs ungewohnt wirken. Gib ihm 15 bis 30 Minuten auf der Haut, bevor du urteilst. Die Kopfnoten sind oft schärfer als der endgültige Charakter.'
        ]
      },
      {
        heading: 'Worauf du bei Oud-Düften achten solltest',
        body: [
          'Echtes Oud ist sehr teuer, deshalb arbeiten die meisten Düfte mit hochwertigen Oud-Akkorden. Das ist völlig normal und riecht trotzdem edel.',
          'Oud ist intensiv und langlebig. Hier reicht wirklich ein Sprühstoss. Lieber dezent starten und bei Bedarf nachlegen.',
          'Am schönsten kommt Oud in der kühlen Jahreszeit und am Abend zur Geltung. Es harmoniert wunderbar mit Rose, Safran und süssen Noten wie Vanille und Dattel.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-zitrus-duefte',
    title: 'Die besten Zitrus-Düfte',
    description:
      'Spritzig, frisch und gute Laune pur: Die besten Zitrus-Düfte mit Bergamotte, Zitrone und Grapefruit, ideal für Sommer, Büro und heisse Tage.',
    heroImage: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=1200&q=80&fit=crop',
    intro: [
      'Zitrus-Düfte sind frisch, leicht und heben sofort die Stimmung: Zitrone, Bergamotte, Grapefruit und Orange riechen sauber und unbeschwert. Perfekt für warme Tage, das Büro oder wenn man einfach etwas Leichtes tragen will.',
      'Der Trick bei Zitrus-Düften liegt in der Basis: Pur ist Zitrus herrlich frisch, aber schnell verflogen. Die besten Zitrus-Düfte haben ein holziges, moschusartiges oder leicht würziges Fundament, das die Frische verankert und dem Duft Tiefe und Ausdauer gibt.',
      'Zitrus ist eine der universellsten Duftnoten überhaupt. Er passt zu Damen, Herren und allen dazwischen, er harmoniert mit fast jeder Jahreszeit und funktioniert im Büro genauso gut wie am Strand. Hier unsere spritzigsten Empfehlungen.'
    ],
    sections: [
      {
        heading: 'Die besten Zitrus-Düfte aus dem Katalog',
        perfumes: [
          'armani-acqua-di-gio-homme',
          'davidoff-cool-water',
          'adp-colonia',
          'armani-acqua-di-gioia',
          'hermes-jardin-nil',
          'mancera-cedrat-boise',
          'dolce-gabbana-light-blue',
          'creed-silver-mountain-water'
        ]
      },
      {
        heading: 'Zitrus-Düfte für Damen',
        body: [
          'Armani Acqua di Gioia ist eine frische, zitrisch-blumige Komposition mit Jasmin und Holz, wunderbar für warme Tage. Dolce & Gabbana Light Blue ist leichter und zugänglicher, zitrusfrisch mit Apfel und Zeder.',
          'Für alle, die Zitrus mit etwas mehr Eleganz mögen, bietet Hermès Jardin au bord du Nil eine fast poetische Interpretation: grün-frisch mit Lotus und Zitrusblüte, sehr kultiviert.'
        ]
      },
      {
        heading: 'Zitrus-Düfte für Herren',
        body: [
          'Acqua di Parma Colonia ist ein italienischer Klassiker, der seit Jahrzehnten für sonnige Eleganz steht. Leicht, zitrus-warm und nie aufdringlich.',
          'Mancera Cedrat Boisé kombiniert Zitrus mit warmem Holz, was ihm deutlich mehr Haltbarkeit und Charakter gibt als ein purer Zitruspritsch. Ideal für alle, die es etwas robuster mögen.'
        ]
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Davidoff Cool Water ist ein verlässlicher, günstiger Zitrus-Klassiker für Herren, aquatisch-frisch und weit unter 40 CHF.',
          'Für Damen bietet Lattafa Mayar eine frische, leicht blumige Option unter 30 CHF, nicht rein zitrisch, aber in der sauberen Frische-Familie.'
        ]
      },
      {
        heading: 'Zitrus für jede Gelegenheit',
        body: [
          'Fürs Büro: klare, saubere Zitrusdüfte mit Bergamotte oder Zitrone wirken gepflegt und nie aufdringlich.',
          'Für heisse Tage: spritzige Grapefruit- und Orangennoten sind herrlich erfrischend.',
          'Für den Abend: Zitrus mit holziger oder würziger Basis bekommt mehr Tiefe und hält länger.'
        ]
      },
      {
        heading: 'Worauf du bei Zitrus-Düften achten solltest',
        body: [
          'Zitrus-Noten sind herrlich frisch, aber von Natur aus flüchtig. Viele Zitrus-Düfte halten kürzer. Ein zweiter Sprühstoss am Mittag wirkt Wunder.',
          'Achte auf eine holzige oder moschusartige Basis: Sie verankert die Frische und macht den Duft langlebiger.',
          'Zitrus ist die perfekte Wahl für Sommer, heisse Tage und das Büro, sauber, leicht und nie aufdringlich.'
        ]
      }
    ]
  },
  {
    slug: 'damenduefte-die-maenner-lieben',
    title: 'Damendüfte, die Männer lieben',
    description:
      'Welche Frauendüfte kommen bei Männern besonders gut an? Unsere Liste der beliebtesten Komplimente-Düfte für Frauen, von süss-warm bis verführerisch.',
    heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80&fit=crop',
    intro: [
      'Manche Damendüfte ziehen einfach magisch an und ernten besonders oft Komplimente, gerade von Männern. Meist sind es warme, süsse oder sinnlich-verführerische Kompositionen, die angenehm in Erinnerung bleiben. Düfte, bei denen man unwillkürlich denkt: Was riecht sie gut?',
      'Was diese Düfte verbindet: eine süss-warme Qualität, die einladend und angenehm ist, ohne zu überwältigen. Vanille, Karamell, weicher Moschus und blumige Noten kommen dabei am häufigsten gut an. Sie signalisieren Wärme, Gepflegtheit und eine angenehme Nähe.',
      'Hier die Düfte, die als echte Anziehungs-Klassiker gelten. Mit ehrlichem Hinweis: Manche Frauen lieben sie, andere finden sie zu süss. Was zählt, ist, dass du dich darin wohlfühlst.'
    ],
    sections: [
      {
        heading: 'Die beliebtesten Damendüfte bei Männern',
        perfumes: [
          'ysl-black-opium',
          'lancome-la-vie-est-belle',
          'ch-good-girl',
          'lancome-la-nuit-tresor',
          'coco-mademoiselle',
          'lattafa-yara',
          'ysl-mon-paris',
          'gisada-ambassadora'
        ]
      },
      {
        heading: 'Süss & warm: die grössten Komplimente-Magneten',
        body: [
          'YSL Black Opium ist seit Jahren einer der meistkopierten und meistgeliebten Damendüfte überhaupt. Die Kombination aus Kaffee, Vanille und weissem Moschus wirkt selbstbewusst und sinnlich zugleich.',
          'Lancôme La Vie Est Belle und Carolina Herrera Good Girl gehen in eine ähnlich süss-blumige Richtung, etwas weicher und zugänglicher, aber ebenfalls bekannt dafür, Komplimente einzuheimsen.',
          'Lattafa Yara ist die günstige Option in dieser Kategorie: cremig-süss, blumig und sehr langlebig. Für unter 30 Franken ein erstaunlich beliebter Alltagsduft.'
        ]
      },
      {
        heading: 'Floral & elegant: zeitlos anziehend',
        body: [
          'Coco Mademoiselle von Chanel ist ein Klassiker, der nie aus der Mode kommt: blumig, leicht würzig und mit einem hellen Moschus-Abgang. Selbstbewusst ohne aufdringlich zu wirken.',
          'YSL Mon Paris ist romantischer und fruchtiger, mit einer erdbeerfruchtigen Kopfnote und einem warmen weissen Moschus-Fundament. Ebenfalls sehr geschätzt.'
        ]
      },
      {
        heading: 'Was diese Düfte gemeinsam haben',
        body: [
          'Meist sind es warme, süsse oder sinnliche Kompositionen mit Vanille, Amber, Praline oder weissen Blüten, die einladend und verführerisch wirken.',
          'Gourmand-Noten gelten als besonders anziehend, weil sie an Gemütlichkeit und Genuss erinnern.',
          'Auch sauber-pudrige Moschus-Düfte kommen sehr gut an, weil sie nach gepflegter, weicher Haut riechen.',
          'Wichtig: Diese Düfte sind oft präsent. Ein bis zwei Sprühstösse reichen, damit sie anziehend statt aufdringlich wirken.'
        ]
      },
      {
        body: [
          'Ehrlich gesagt: Was Männer mögen, ist Geschmackssache und sehr individuell. Der schönste Duft ist der, in dem du dich selbstbewusst fühlst. Mach unser Quiz, um deine eigene Lieblingsrichtung zu finden.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-nach-sternzeichen',
    title: 'Parfum nach Sternzeichen: Welcher Duft passt zu deinem Zeichen?',
    description:
      'Welcher Duft passt zu deinem Sternzeichen? Vom Widder bis zu den Fischen, pro Zeichen ein Luxus-Duft und eine günstigere Alternative in ähnlicher Duftrichtung.',
    heroImage: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80&fit=crop',
    intro: [
      'Astrologie ist keine Wissenschaft, aber eine schöne, spielerische Inspiration. Dein Sternzeichen sagt nichts Verbindliches über deinen perfekten Duft, kann aber ein charmanter Startpunkt sein, um deinen Stil zu finden.',
      'Ein Hinweis zur Ehrlichkeit: Die genannten Spar-Picks sind eigenständige Düfte in ähnlicher Duftrichtung, keine identischen Kopien der Luxus-Düfte. Sie gehen in eine verwandte Richtung, riechen aber nicht exakt gleich.',
      'Noch genauer als jedes Sternzeichen ist übrigens unser Duft-Quiz. Ganz unten findest du den Link.'
    ],
    sections: [
      {
        heading: '♈ Widder (21. März – 20. April)',
        body: [
          'Widder sind energiegeladen, mutig und lieben den großen Auftritt. Dazu passt ein Duft mit Feuer: würzig, warm und durchsetzungsstark.',
          'Luxus-Pick: Viktor&Rolf Spicebomb. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Asad. Beide setzen auf würzig-rauchige Wärme, die die Energie des Widders unterstreicht.'
        ],
        perfumes: ['viktor-rolf-spicebomb', 'lattafa-asad']
      },
      {
        heading: '♉ Stier (21. April – 20. Mai)',
        body: [
          'Stiere genießen mit allen Sinnen: Beständigkeit, Wärme und etwas Süße. Ein gourmandiger, behaglicher Duft trifft ihren Geschmack perfekt.',
          'Luxus-Pick: Tom Ford Tobacco Vanille. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Khamrah. Warme Vanille, Tabak und Dattel wirken sinnlich und genussvoll.'
        ],
        perfumes: ['tobacco-vanille', 'khamrah']
      },
      {
        heading: '♊ Zwillinge (21. Mai – 21. Juni)',
        body: [
          'Zwillinge sind neugierig, leicht und kommunikativ. Ein verspielter, frischer Duft mit einem Hauch Süße passt zu ihrer Wandelbarkeit.',
          'Luxus-Pick: Dolce & Gabbana Light Blue. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Yara. Leicht, fröhlich und unkompliziert, ideal für spontane Tage.'
        ],
        perfumes: ['dolce-gabbana-light-blue', 'lattafa-yara']
      },
      {
        heading: '♋ Krebs (22. Juni – 22. Juli)',
        body: [
          'Krebse sind gefühlvoll, sanft und lieben Geborgenheit. Weiche, pudrige Moschus-Noten spiegeln ihre warme, nahbare Art.',
          'Luxus-Pick: Narciso Rodriguez For Her. Günstigere Alternative in ähnlicher Duftrichtung: Armaf Club de Nuit Woman. Weicher Moschus und Amber sorgen für ein Gefühl von Wärme und Nähe.'
        ],
        perfumes: ['narciso-for-her', 'armaf-club-de-nuit-woman']
      },
      {
        heading: '♌ Löwe (23. Juli – 23. August)',
        body: [
          'Löwen strahlen, sind großzügig und wollen gesehen werden. Ein opulenter Signature-Duft mit guter Strahlkraft ist ihre Bühne.',
          'Luxus-Pick: Maison Francis Kurkdjian Baccarat Rouge 540. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Yara Tous. Edel, strahlend und unverwechselbar. Ganz wie der Löwe.'
        ],
        perfumes: ['baccarat-rouge-540', 'lattafa-yara-tous']
      },
      {
        heading: '♍ Jungfrau (24. August – 23. September)',
        body: [
          'Jungfrauen lieben Klarheit, Pflege und Natürlichkeit. Ein cleaner, frisch-mineralischer Duft wirkt an ihnen mühelos elegant.',
          'Luxus-Pick: Jo Malone Wood Sage & Sea Salt. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Mayar. Saubere, unaufdringliche Noten unterstreichen ihre natürliche Eleganz.'
        ],
        perfumes: ['jo-malone-wood-sage-sea-salt', 'lattafa-mayar']
      },
      {
        heading: '♎ Waage (24. September – 23. Oktober)',
        body: [
          'Waagen suchen Harmonie, Charme und Ästhetik. Ein ausgewogener, blumiger Duft passt zu ihrem Sinn für Schönheit.',
          'Luxus-Pick: Chloé Eau de Parfum. Günstigere Alternative in ähnlicher Duftrichtung: Armaf Vanity Femme. Weiche florale Eleganz bringt ihre Balance und ihren Charme zum Ausdruck.'
        ],
        perfumes: ['chloe-edp', 'armaf-vanity-femme']
      },
      {
        heading: '♏ Skorpion (24. Oktober – 22. November)',
        body: [
          'Skorpione sind intensiv, geheimnisvoll und tiefgründig. Ein dunkler, holzig-orientalischer Duft mit Oud verstärkt ihre magnetische Ausstrahlung.',
          'Luxus-Pick: Tom Ford Oud Wood. Günstigere Alternative in ähnlicher Duftrichtung: Lattafa Oud for Glory. Tiefe Oud- und Holznoten wirken geheimnisvoll und anziehend.'
        ],
        perfumes: ['tom-ford-oud-wood', 'lattafa-oud-for-glory']
      },
      {
        heading: '♐ Schütze (23. November – 21. Dezember)',
        body: [
          'Schützen sind abenteuerlustig, warmherzig und freiheitsliebend. Ein gemütlicher, warm-holziger Duft weckt ihr Fernweh.',
          'Luxus-Pick: Maison Margiela Replica By the Fireplace. Günstigere Alternative in ebenfalls warmer, süß-holziger Richtung: Lattafa Badee al Oud Amethyst. Weiche Amber-, Oud- und süße Noten wirken einhüllend und passen zu ihrer optimistischen Wärme.'
        ],
        perfumes: ['replica-fireplace', 'lattafa-badee-amethyst']
      },
      {
        heading: '♑ Steinbock (22. Dezember – 20. Januar)',
        body: [
          'Steinböcke sind ehrgeizig, klassisch und souverän. Ein edler, zeitlos-holziger Duft unterstreicht ihre seriöse Präsenz.',
          'Luxus-Pick: Creed Aventus. Günstigere Alternative in ähnlicher Duftrichtung: Armaf Club de Nuit Intense Man. Fruchtig-rauchiges Holz wirkt souverän und hochwertig.'
        ],
        perfumes: ['creed-aventus', 'club-de-nuit-intense']
      },
      {
        heading: '♒ Wassermann (21. Januar – 19. Februar)',
        body: [
          'Wassermänner sind eigenständig, modern und unkonventionell. Ein minimalistischer, holzig-cleaner Duft passt zu ihrem individuellen Stil.',
          'Luxus-Pick: Le Labo Santal 33. Günstigere Alternative in ähnlich holzig-moderner Richtung: Mancera Cedrat Boisé. Klare Zitrus- und Holznoten wirken modern und eigenständig.'
        ],
        perfumes: ['le-labo-santal-33', 'mancera-cedrat-boise']
      },
      {
        heading: '♓ Fische (20. Februar – 20. März)',
        body: [
          'Fische sind träumerisch, sensibel und romantisch. Ein aquatisch-frischer, weicher Duft spiegelt ihre sanfte, verträumte Art.',
          'Luxus-Pick: Giorgio Armani Acqua di Gioia. Günstigere Alternative in ähnlicher, aquatisch-frischer Richtung: Davidoff Cool Water. Klare Wasser- und Zitrusnoten wirken sanft, frisch und verträumt.'
        ],
        perfumes: ['armani-acqua-di-gioia', 'davidoff-cool-water']
      },
      {
        body: [
          'Sternzeichen sind ein schöner, spielerischer Einstieg, aber dein echter Lieblingsduft hängt von deinem persönlichen Geschmack ab, nicht vom Kalender. Unser Duft-Quiz findet ihn in unter einer Minute, abgestimmt auf Duftrichtung, Anlass, Saison und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-fuer-einsteiger-erster-signature-duft',
    title: 'Parfum für Einsteiger: So findest du deinen ersten Signature-Duft',
    description: 'Noch keine Ahnung von Parfum? Kein Problem. Wir erklären, wie du deinen ersten Duft findest, was du testen solltest und wie du unnötige Fehlkäufe vermeidest.',
    heroImage: '/images/ratgeber/parfum-einsteiger.jpg',
    intro: [
      'Der erste Signature-Duft ist etwas Besonderes. Er wird zu einem Teil der eigenen Identität, zum Duft, den Freunde mit dir verbinden und nach dem sie fragen, wenn du ihn nicht trägst. Doch der Weg dahin kann überwältigend sein: Tausende von Düften, unzählige Fachbegriffe und ein Markt, der von Marketingversprechen dominiert wird.',
      'Die gute Nachricht: Die Suche nach dem ersten Signature-Duft muss nicht teuer oder stressig sein. Mit einem systematischen Ansatz findet man schnell heraus, welche Duftkategorien zur eigenen Persönlichkeit passen, und kann gezielt testen, statt zufällig zu kaufen.',
      'Dieser Ratgeber ist für Menschen geschrieben, die mit Parfum noch wenig Erfahrung haben und pragmatisch an die Sache herangehen möchten: Was soll ich zuerst kaufen? Wie viel soll ich ausgeben? Und wie weiss ich, wann ich den richtigen Duft gefunden habe?',
    ],
    sections: [
      {
        heading: 'Schritt 1: Duftfamilien kennenlernen',
        body: [
          'Bevor man einzelne Parfums testet, lohnt es sich, die grossen Duftfamilien zu verstehen: Frisch/Aquatisch, Blumig, Holzig, Oriental/Warm und Gourmand. Jede Familie hat einen grundlegenden Charakter, und man findet schnell heraus, welche man grundsätzlich angenehm findet.',
          'Einfacher Test: Im nächsten Parfumgeschäft sich durch die Kategorien schnuppern, nicht gezielt nach einem bestimmten Duft. Welche Richtung gefällt grundsätzlich? Das ist der erste Filter.',
        ],
      },
      {
        heading: 'Schritt 2: Proben bestellen, nicht blind kaufen',
        body: [
          'Nie einen Duft kaufen, den man nicht an der eigenen Haut getestet hat. Die Papierstreifen im Laden zeigen nur einen ersten Eindruck, der kaum mit dem übereinstimmt, was der Duft nach einer Stunde auf der Haut tut.',
          'Bestellen Sie Proben oder Abfüllungen von 3 bis 5 Düften, die das Profil haben, das Sie suchen. Tragen Sie jeden mindestens 3 Mal, bevor Sie entscheiden. So investieren Sie 15 bis 30 CHF in Proben statt 150 CHF in einen Duft, der sich als Fehler herausstellt.',
        ],
      },
      {
        heading: 'Schritt 3: Anfänger-freundliche Düfte als Startpunkt',
        body: [
          'Für Einsteiger empfehlen sich Düfte, die zugänglich sind: nicht zu schwer, nicht zu speziell, angenehm für alle Umgebungen. Aqua di Giò für Männer, Lancôme La Vie est Belle für Frauen, oder Maison Margiela Replica-Düfte für beide Geschlechter sind populär und zugänglich, weil sie viele Aspekte des Parfumtragens vereinen.',
          'Günstige Einstiegsmöglichkeit: Zara-Parfums zwischen 10 und 20 CHF eignen sich hervorragend, um verschiedene Duftkategorien auszuprobieren, ohne das Budget zu belasten.',
        ],
      },
      {
        heading: 'Was ist ein gutes Budget für den ersten Duft?',
        body: [
          'Für einen ersten Alltagsduft muss man keine 200 CHF ausgeben. Ein Budget von 40 bis 80 CHF reicht aus, um einen soliden Designer-Duft in einem kleinen Flakon zu kaufen. Marken wie Davidoff, Lacoste, Hugo Boss oder Jil Sander bieten in diesem Preisbereich verlässliche Qualität.',
          'Wer bereit ist, etwas mehr auszugeben und schon genau weiss, was er möchte, kann bis 150 CHF in einen 50ml-Flakon eines Premium-Designers investieren. Nischendüfte über 200 CHF empfehlen sich als erstes Parfum nur für jemanden, der sicher ist, was er will.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-fruehlingsduefte',
    title: 'Die besten Frühlingsdüfte: frisch, blumig & leicht',
    description:
      'Leichte, blumig-frische Düfte für den Frühling: grüne Noten, Blüten und Zitrus. Unsere Frühlings-Favoriten für Damen und Herren, von günstig bis edel.',
    heroImage: '/ratgeber/die-besten-fruehlingsduefte.jpg',
    intro: [
      'Der Frühling ruft nach leichten, lebendigen Düften: zarte Blüten, grüne Noten und ein Hauch Zitrus passen perfekt zu den ersten warmen Tagen. Die schweren Winterdüfte kommen in die Schublade. Jetzt ist Zeit für Frische und Leichtigkeit.',
      'Wir haben die schönsten Frühlingsdüfte aus unserem Katalog zusammengestellt: für Damen, Herren und alle dazwischen, von erschwinglich bis edel.'
    ],
    sections: [
      {
        heading: 'Die besten Frühlingsdüfte für Damen',
        body: [
          'Blüten, zarte Früchte und ein Hauch Grün: Diese Düfte fangen den Frühling in einer Flasche ein.'
        ],
        perfumes: [
          'marc-jacobs-daisy',
          'chloe-edp',
          'gucci-bloom',
          'dior-miss-dior',
          'dkny-be-delicious',
          'armani-acqua-di-gioia',
          'lattafa-yara'
        ]
      },
      {
        heading: 'Die besten Frühlingsdüfte für Herren',
        body: [
          'Frisch, sauber und lebendig: Diese Herrendüfte sind ideal für wärmere Tage und hinterlassen einen positiven ersten Eindruck.'
        ],
        perfumes: [
          'montblanc-legend',
          'creed-git',
          'pdm-greenley',
          'armani-acqua-di-gio-homme',
          'davidoff-cool-water',
          'allure-homme-sport'
        ]
      },
      {
        heading: 'Günstige Frühlingsdüfte unter 50 CHF',
        body: [
          'Frühling muss nicht teuer sein. Diese Düfte liefern echte Frühlingsfrische zum kleinen Preis,ekt für den Alltag.'
        ],
        perfumes: [
          'davidoff-cool-water',
          'lattafa-yara',
          'sdj-cheirosa-62',
          'club-de-nuit-intense'
        ]
      },
      {
        heading: 'Frühlingsduft für jeden Anlass',
        body: [
          'Alltag & Büro: Leichte florale oder grüne Düfte begleiten dich dezent durch den Tag ohne aufzufallen. Weniger ist mehr. Ein bis zwei Sprühstösse reichen.',
          'Date im Freien: Ein fruchtig-blumiger Duft wirkt frisch, einladend und sympathisch. Vermeide schwere orientalische Düfte. Sie wirken im Frühling zu wuchtig.',
          'Abends & Übergang: Wenn es abends noch kühl wird, darf ein Hauch Moschus oder sanftes Holz im Basisakkord für angenehme Wärme sorgen.',
          'Sport & Outdoor: Aquatische und grüne Düfte sind hier ideal, leicht, sauber und trotzdem präsent.'
        ]
      },
      {
        heading: 'Worauf du beim Kauf achten solltest',
        body: [
          'Konzentration: Eau de Toilette (EdT) ist für den Frühling meist die beste Wahl, leichter, luftiger und günstiger als Eau de Parfum. Bei milderen Frühlingstagen kann ein EdP jedoch angenehm sein.',
          'Dosierung: Im Frühling reichen 1–2 Sprühstösse. Mit steigenden Temperaturen wirkt ein Duft intensiver als gewohnt.',
          'Noten im Fokus: Achte auf Kopfnoten wie Bergamotte, Zitrone, grünen Tee, Maiglöckchen oder Iris. Diese Noten wirken im Frühling besonders lebendig.',
          'Was du vermeiden solltest: Sehr schwere Basis-Noten wie Oud, Tabak oder dicke Vanille passen eher in den Herbst und Winter.',
          'Probiere zuerst: Bestelle wenn möglich eine Probe, bevor du einen ganzen Flakon kaufst. Auf der Haut riecht ein Duft immer anders als im Laden.'
        ]
      },
      {
        heading: 'Die typischen Noten eines Frühlingsdufts',
        body: [
          'Kopfnoten (erster Eindruck): Bergamotte, Zitrone, grüner Apfel, Grapefruit, Mandarine. Frisch und lebendig.',
          'Herznoten (der eigentliche Charakter): Rose, Maiglöckchen, Pfingstrose, Jasmin, Iris, Veilchen – blumig und feminin. Oder für Herren: Lavendel, grünes Gras, Kardamom.',
          'Basisnoten (bleibt auf der Haut): Weisser Moschus, sanftes Holz, Zedernholz, leichte Amber. Gibt Wärme ohne Schwere.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-bueroduefte',
    title: 'Die besten Büro-Düfte: dezent & angenehm',
    description:
      'Bürotaugliche Düfte, die angenehm dezent bleiben und niemanden stören, frisch, sauber und gepflegt. Unsere Empfehlungen für Damen und Herren.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&fit=crop',
    intro: [
      'Im Büro gilt: Ein Duft soll dich begleiten, nicht den ganzen Raum füllen. Dezent, sauber und gepflegt ist hier die beste Wahl und gleichzeitig eine Form von Respekt gegenüber Kolleginnen und Kollegen, die vielleicht empfindlich auf intensive Düfte reagieren.',
      'Im Grossraumbüro, im Meeting oder im Aufzug können starke Düfte schnell unangenehm werden. Das heisst nicht, dass du auf Parfüm verzichten musst. Du wählst klug: frisch, holzig oder leicht blumig, mit weniger Projektion und ohne süsse oder sehr intensive Basisnoten.',
      'Diese Düfte gelten als angenehm bürotauglich: präsent genug, um wahrgenommen zu werden, aber nie aufdringlich. Empfehlungen für Damen und Herren, günstig und edel.'
    ],
    sections: [
      {
        heading: 'Büro-Düfte für Herren',
        body: [
          'Für Männer im Büro sind frisch-holzige Kompositionen die sicherste Wahl. Chanel Bleu de Chanel ist einer der bekanntesten Bürodüfte überhaupt: sauber, kultiviert und nie zu präsent. Terre d\'Hermès geht in eine ähnliche Richtung, etwas erdiger und mineralischer, ebenfalls vielseitig und diskret.',
          'Boss Bottled ist ein klassischer, dezenter Herrenduft mit Apfel und warmem Holz, der im Büro zuverlässig gut ankommt. YSL Y EDP bringt etwas mehr Würze, bleibt aber alltagstauglich.'
        ],
        perfumes: ['chanel-bleu-de-chanel', 'ysl-y-edp', 'boss-bottled', 'terre-dhermes', 'dior-homme']
      },
      {
        heading: 'Büro-Düfte für Damen',
        body: [
          'Für Frauen im Büro passen frische Blüten, sauberer Moschus und leicht holzige Noten. Coco Mademoiselle ist eine klassische Wahl, elegant und dezent, ohne je zu auffällig zu wirken. Narciso Rodriguez For Her bleibt ganz nah an der Haut: leichter Moschus, pudrig und sehr diskret.',
          'Le Labo Santal 33 und Jo Malone Wood Sage & Sea Salt sind unisexe Optionen, die im Büro sehr gut funktionieren, weil sie individuell, aber nie erdrückend sind.'
        ],
        perfumes: ['coco-mademoiselle', 'narciso-for-her', 'le-labo-santal-33', 'jo-malone-wood-sage-sea-salt']
      },
      {
        heading: 'Diese Düfte trägst du besser nicht ins Büro',
        body: [
          'Sehr süsse Gourmands mit viel Vanille, Karamell oder Schokolade können im geschlossenen Raum schnell erdrückend wirken.',
          'Schwere Oud- und Amber-Düfte gehören eher in den Abend als an den Schreibtisch.',
          'Sehr intensive Düfte mit grosser Projektion sind im Grossraumbüro oft zu viel des Guten. Die Nase der Kolleginnen und Kollegen dankt es dir, wenn du sparsam bleibst.'
        ]
      },
      {
        heading: 'So liegst du im Büro immer richtig',
        body: [
          'Weniger ist mehr: Ein bis zwei Sprühstösse reichen. Im geschlossenen Raum wirkt ein Duft stärker als draussen.',
          'Frische, holzige und sauber-moschusartige Düfte sind angenehmer als schwere, süsse oder sehr intensive Kompositionen.',
          'Den Duft eher auf die Kleidung als grossflächig auf die Haut tragen. So bleibt er dezenter und stört weniger.',
          'Tipp: Im Sommer noch sparsamer dosieren. Bei Wärme wirkt jeder Duft intensiver als im kühlen Büro.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-das-lange-haelt-beast-mode',
    title: 'Parfum das lange hält: Beast Mode Düfte mit maximaler Haltbarkeit',
    description: 'Manche Parfums halten 12 Stunden oder mehr und hinterlassen eine Duftschneise. Wir zeigen die stärksten langanhaltenden Düfte und was sie so aussergewöhnlich macht.',
    heroImage: '/images/ratgeber/parfum-beast-mode.jpg',
    intro: [
      'In der Parfumwelt gibt es eine kleine, enthusiastische Gemeinschaft, die sogenannte "Beast Mode" Düfte liebt. Das sind Parfums, die nach einem einzigen Sprühstoss noch 12 Stunden oder länger wahrnehmbar sind, die eine Sillage hinterlassen, die man noch spürt, wenn die Person den Raum schon verlassen hat.',
      'Der Begriff "Beast Mode" stammt aus der Parfumrezensionsszene und bezeichnet Düfte mit aussergewöhnlicher Projektion und Haltbarkeit. Diese Eigenschaft kommt nicht immer aus teuren Zutaten, sondern oft aus synthetischen Molekülen wie Ambroxan, Iso E Super oder verschiedenen Moschus-Verbindungen, die eine fast magische Ausdauer haben.',
      'Für Alltagsträger kann "Beast Mode" auch eine Last sein: Im Büro oder in der Öffentlichkeit kann ein zu intensiver Duft störend wirken. Aber für abendliche Anlässe, Partys und Situationen, in denen man als Person wahrgenommen werden möchte, sind diese Düfte beeindruckend.',
    ],
    sections: [
      {
        heading: 'Was macht einen Duft so langanhaltend?',
        body: [
          'Die Haltbarkeit hängt von drei Faktoren ab: der Konzentration des Duftöls, der Auswahl der Duftstoffe und dem Hauttyp des Trägers. Fettere Haut hält Duft länger als trockene Haut, weshalb manche Menschen einen Duft als "schwach" beurteilen, obwohl er auf anderen stundenlang hält.',
          'Basisnoten wie Amber, Moschus, Oud und Vanille sind die Anker von langanhaltenden Düften. Synthetische Moleküle wie Ambroxan (bekannt aus Dior Sauvage), Cetalox und verschiedene Musketone fixieren den Duft an der Haut und tragen ihn über Stunden.',
          'EDPs halten länger als EDTs, aber die Formulierung ist entscheidend. Manche EDTs mit reichhaltiger Basis schlagen EDPs anderer Marken in Sachen Haltbarkeit klar.',
        ],
      },
      {
        heading: 'Die langanhaltendsten Düfte für Herren',
        body: [
          'Dior Sauvage EDP ist das vielleicht meistverkaufte Beast Mode Parfum. Ambroxan und Cedar sorgen für eine Präsenz, die schwer zu übersehen ist. Positiv: Es ist nie aufdringlich süss. Negativ: Fast jeder kennt es inzwischen.',
          'Lattafa Asad und Lattafa Khamrah sind arabische Düfte, die für ihre aussergewöhnliche Haltbarkeit und Projektion bekannt sind. Asad ist holzig-orientalisch, Khamrah opulent-süss. Beide kosten unter 30 CHF und halten problemlos 10 bis 12 Stunden.',
          'Montblanc Explorer Ultra Blue ist erstaunlich langanhaltend für seinen Preis. Aquatisch-holzig, perfekt für den Alltag mit beeindruckender Sillage.',
        ],
      },
      {
        heading: 'Die langanhaltendsten Düfte für Damen',
        body: [
          'Viktor and Rolf Flowerbomb ist eine Legende: süss, blumig, gourmand, und hält scheinbar ewig. Die EDP-Version ist besonders stark. Wenn man morgens aufsprüht, riecht man es abends noch auf der Kleidung.',
          'Yves Saint Laurent Black Opium EDP projiziert stark und hält lange. Kaffee, Vanille und weisse Blumen in einer aussergewöhnlich präsenten Komposition.',
          'Guerlain La Petite Robe Noire ist ein unterschätzter Beast Mode Duft für Damen: kirschig, hölzig, mit erstaunlicher Haltbarkeit und einem Duftbild, das trotz seiner Intensität nie plakativ wirkt.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Arabische Marken sind unbestritten die Könige des erschwinglichen Beast Mode: Lattafa, Ajmal und Al Haramain bieten für 20 bis 40 CHF Düfte, die jeden Luxusparfum in Sachen Haltbarkeit herausfordern können.',
          'Lidl und Aldi verkaufen saisonal Eigenmarken-Parfums, die überraschend gute Haltbarkeit zeigen. Wer das Ergebnis vor dem Kauf riechen möchte, bestellt bei Auressa eine Probe des Originals und entscheidet dann.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-hochzeitsduefte-braut',
    title: 'Die besten Hochzeitsdüfte für die Braut und den Bräutigam',
    description: 'Der Duft am Hochzeitstag bleibt unvergesslich. Wir zeigen die schönsten Parfums für Braut und Bräutigam, von klassisch-romantisch bis modern-charaktervoll.',
    heroImage: '/images/ratgeber/hochzeitsduefte.jpg',
    intro: [
      'Kein Parfum ist so bedeutungsvoll wie der am Hochzeitstag getragene. Anders als Kleider oder Blumen ist ein Duft unsichtbar und doch tief eingraviert in das Gedächtnis aller Anwesenden. Das Brautpaar, die Familie, die Freunde: Sie alle werden diesen Duft mit jenem Moment verbinden, für immer.',
      'Die Wahl des Hochzeitsdufts ist deshalb keine Kleinigkeit. Es lohnt sich, frühzeitig zu suchen, zu testen und schliesslich eine Entscheidung zu treffen, die wirklich zu einem passt, nicht einfach zu dem, was eine Hochzeitszeitung empfiehlt. Der Duft soll authentisch sein, soll die eigene Persönlichkeit widerspiegeln und gleichzeitig zu dem besonderen Anlass passen.',
      'Dieser Ratgeber gibt Orientierung: von klassisch-weissen Düften für die Braut bis zu charaktervollen, eleganten Parfums für den Bräutigam, und alles, was dazwischen liegt.',
    ],
    sections: [
      {
        heading: 'Hochzeitsdüfte für die Braut',
        body: [
          'Weisse Blumen sind die klassische Wahl für Bräute: Jasmin, Maiglöckchen, Rosen und Tuberose in verschiedenen Mischungen ergeben romantische, feminime Düfte, die zu weissen Kleidern und Blumenkränzen passen. Dior Miss Dior Blooming Bouquet ist ein moderner, freundlicher Rosenduft, der fast niemanden polarisiert.',
          'Für ein eleganteres Profil: Chanel No. 5 EDP ist die Hochzeitslegende schlechthin. Aldehyde, Jasmin, Rosen und Sandelholz in einer Komposition, die 100 Jahre alt und noch immer unschlagbar ist. Frisch und trotzdem komplex, strahlend ohne aufdringlich zu wirken.',
          'Wer moderner denken möchte: Maison Margiela Replica Flower Market ist unbeschwert, frühlingshaft und frisch. Versace Bright Crystal ist eine freundliche, preislich zugängliche Option für Bräute, die keinen schweren Blumenduft möchten.',
        ],
      },
      {
        heading: 'Hochzeitsdüfte für den Bräutigam',
        body: [
          'Frisch-holzige Düfte sind die sichere Wahl für den Bräutigam: elegant, nicht überwältigend und passend zu Anzug und festlichem Rahmen. Bleu de Chanel EDP ist hierfür nahezu ideal, sauber, holzig, diskret und doch präsent.',
          'Wer mehr Charakter möchte: Tom Ford Grey Vetiver ist ein ausgezeichneter Hochzeitsduft für Männer mit Gespür für Qualität. Erdig, zitrusig und mit einer diskreten Würze. Oder Creed Royal Water, ein aquatisch-würziges Parfum, das gut zu festlichen Weisshemd-Anlässen passt.',
          'Für ein romantischeres Profil: Giorgio Armani Acqua di Giò Profondo hat eine tiefere, aquatisch-moschusige Basis, die den klassischen Acqua di Giò in eine festlichere Richtung lenkt.',
        ],
      },
      {
        heading: 'Praktische Tipps für die Duftsuche',
        body: [
          'Beginnen Sie die Suche spätestens 3 Monate vor der Hochzeit. Bestellen Sie Proben und tragen Sie die Kandidaten an verschiedenen Tagen, nicht nur im Laden. Der Duft soll zur Haut passen und auch nach 6 Stunden noch angenehm sein.',
          'Planen Sie eine Probe-Runde auf Ihrer Hochzeitskleidung ein: Manchmal riecht ein Duft auf Seide oder Spitze anders als auf der Haut allein.',
          'Bei Auressa gibt es Abfüllungen vieler Hochzeitsdüfte. So können beide Partner verschiedene Optionen testen und gemeinsam eine Entscheidung treffen, die zum Paar passt.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-holzigen-duefte',
    title: 'Die besten holzigen Düfte für Damen und Herren',
    description: 'Holzige Parfums mit Sandelholz, Vetiver, Zeder und Oud sind zeitlos und elegant. Wir empfehlen die besten Vertreter für sie und ihn.',
    heroImage: '/images/ratgeber/holzige-duefte.jpg',
    intro: [
      'Holzige Düfte gehören zu den zeitlosesten Kategorien der Parfumwelt. Während Blumendüfte Jahreszeiten folgen und frische Zitrusnoten im Sommer bevorzugt werden, tragen Menschen holzige Parfums das ganze Jahr. Sie wirken geerdet, charaktervoll und oft ausgesprochen erwachsen.',
      'In der Familie der holzigen Düfte gibt es grosse Unterschiede. Sandelholz aus Mysore ist cremig, milchig und fast schmelzend warm. Vetiver riecht erdig, rauchig und nach feuchtem Waldboden. Zeder ist trocken und leicht scharf, Oud animalisch-komplex. Ein guter holziger Duft kombiniert oft mehrere dieser Elemente zu einem schlüssigen Bild.',
      'Für Schweizer Parfumfans sind holzige Düfte besonders attraktiv: Sie passen zur dezenten, qualitätsbewussten Ästhetik der Schweiz und eignen sich für Büro, Freizeit und festliche Anlässe gleichermassen. Dieser Ratgeber zeigt die besten Vertreter für Damen und Herren.',
    ],
    sections: [
      {
        heading: 'Holzige Düfte für Damen',
        body: [
          'Sandelholz-Düfte sind bei Frauen besonders beliebt: Sie sind warm, sinnlich und umhüllend, ohne schwer zu wirken. Jo Malone Wood Sage and Sea Salt verbindet Holz mit maritimer Frische auf eine Art, die man kaum erwarten würde. Maison Margiela Replica By the Fireplace ist eine holzige, rauchige Komposition, die an Winterabende am Kamin erinnert.',
          'Für Frauen, die Holz mit Blumen kombinieren möchten: Dolce and Gabbana The One ist ein klassischer Floral-Oriental mit sandelholziger Basis. Lancôme La Vie est Belle kombiniert Iris und Praline mit Patchouli und Sandelholz zu einem femininen, aber charaktervollen Ganzen.',
          'Vetiver-Düfte sind weniger verbreitet bei Frauen, aber wer sie entdeckt, bleibt oft dabei. Guerlain Vetiver Pour Homme hat begeisterte Anhängerinnen unter Frauen, die maskuline Düfte schätzen. Carven Dans Ma Bulle bietet Vetiver in einer femininer verpackten Komposition.',
        ],
      },
      {
        heading: 'Holzige Düfte für Herren',
        body: [
          'Für Männer ist die holzige Kategorie oft die erste Heimat jenseits von frischen Sport-Colognes. Tom Ford Oud Wood gilt als Referenz: ein akkordisch perfekt balanciertes Oud, das edel und nie klobig wirkt. Für Budget-Bewusste: Lattafa Asad ist eine bemerkenswert gute Alternative für unter 30 CHF.',
          'Terre d\'Hermès ist vielleicht das bekannteste holzige Parfum der Welt: trocken, mineralisch, mit Zeder und Vetiver. Es polarisiert, aber wer es mag, trägt es oft jahrelang. Die EDP-Version ist intensiver und holziger als die klassische EDT.',
          'Für dunklere, rauchigere Holznoten: Dior Sauvage EDP hat eine kräftige Ambroxan-Holz-Basis. Yves Saint Laurent Y EDP ist ebenfalls holziger als sein Name vermuten lässt. Beide sind sichere Alltagsoptionen für Männer, die erden und gleichzeitig modern wirken wollen.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Lattafa und Armaf bieten ausgezeichnete holzige Kompositionen für unter 30 CHF. Lattafa Asad (Oud/Holz), Armaf Club de Nuit Intense Man (holzige Frucht-Basis) und ähnliche Düfte liefern Projektionskraft und Haltbarkeit, die teure Nischendüfte oft nicht erreichen.',
          'Im Drogeriemarkt: Bruno Banani About You Man bietet eine saubere, holzig-frische Duftstruktur für unter 20 CHF. Für den Einstieg ins holzige Segment absolut geeignet.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-blumigen-duefte',
    title: 'Die besten blumigen Düfte: feminin & elegant',
    description:
      'Blumige Düfte mit Rose, Jasmin, Pfingstrose und Orangenblüte, romantisch, elegant und vielseitig. Unsere floralen Favoriten.',
    heroImage: 'https://images.unsplash.com/photo-1490750967868-88df5691cc08?w=1200&q=80&fit=crop',
    intro: [
      'Blumige Düfte sind der Inbegriff von Eleganz: Rose, Jasmin, Pfingstrose oder Orangenblüte wirken feminin, romantisch und zeitlos. Florale Düfte sind die grösste und älteste Duftkategorie überhaupt. Kein Wunder, denn echte Blütenöle gehören zu den begehrtesten Rohstoffen der Parfümerie.',
      'Moderne Florals haben sich stark entwickelt: Statt der klassischen Blumenvase von früher kombinieren heutige Düfte Blüten mit Frucht, Moschus, Holz oder sogar Gourmand-Noten. Das macht sie vielseitiger und moderner, ohne die romantische Seele zu verlieren.',
      'Hier unsere schönsten floralen Düfte, von zart und frisch bis opulent und sinnlich, hauptsächlich für Damen, aber auch für alle, die Blüten lieben.'
    ],
    sections: [
      {
        heading: 'Die schönsten blumigen Düfte aus dem Katalog',
        perfumes: ['coco-mademoiselle', 'chloe-edp', 'gucci-bloom', 'ysl-libre', 'dior-miss-dior', 'chanel-no-5', 'lancome-idole', 'pdm-delina']
      },
      {
        heading: 'Welche Blüte passt zu dir?',
        body: [
          'Rose: zeitlos und romantisch, mal klassisch, mal modern mit Frucht oder Oud kombiniert. Chanel No. 5, Dior Miss Dior und Parfums de Marly Delina sind schöne Vertreter.',
          'Jasmin & Orangenblüte: warm, sinnlich und leicht betörend. Gucci Bloom setzt stark auf diese Richtung und wirkt dabei üppig und modern.',
          'Pfingstrose & Maiglöckchen: frisch, leicht und zart, ideal für den Frühling und das Büro. Chloé Eau de Parfum und Marc Jacobs Daisy gehen in diese Richtung.',
          'Iris & Veilchen: pudrig-elegant für alle, die es feiner mögen. Lancome Idole und Prada Paradoxe nutzen Iris-Akkorde für moderne Eleganz.'
        ]
      },
      {
        heading: 'Günstige blumige Düfte unter 50 CHF',
        body: [
          'Lattafa Yara ist eine beliebte günstige Option in der blumig-cremigen Richtung, weit unter 30 CHF. Armaf Vanity Femme bietet ebenfalls schöne florale Noten zu kleinem Preis.',
          'Für klassische Florals ohne hohen Preis lohnt sich ein Blick auf Marc Jacobs Daisy (unter 60 CHF je nach Flakon-Grösse) oder Davidoff Cool Water Woman für eine frischere, aquatisch-florale Richtung.'
        ]
      },
      {
        heading: 'Worauf du bei blumigen Düften achten solltest',
        body: [
          'Blumig heisst nicht altmodisch: Moderne Florals kombinieren Blüten mit Frucht, Moschus oder Holz und wirken sehr aktuell.',
          'Zarte, frische Florals passen perfekt in Frühling und Alltag. Opulente, süsse Blütendüfte kommen abends und in der kühlen Jahreszeit schön zur Geltung.',
          'Tipp: Wenn dir reine Blüten zu klassisch sind, achte auf florale Düfte mit einer fruchtigen oder holzigen Note, die den Charakter moderner macht.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-frischen-aquatischen-duefte',
    title: 'Die besten frischen und aquatischen Düfte für Damen und Herren',
    description: 'Ozean, Frische und Meeresbrise im Flakon: Die schönsten aquatischen Düfte für warme Tage und alle, die frische Luft lieben.',
    heroImage: '/images/ratgeber/aquatische-duefte.jpg',
    intro: [
      'Aquatische Düfte transportieren einen gedanklich ans Meer, in den Regen oder an einen Bergsee. Diese Kategorie entstand Ende der 1980er und Anfang der 1990er Jahre mit Parfums wie Davidoff Cool Water, einem Duft, der die olfaktorische Landschaft für Jahrzehnte prägte und bis heute verkauft wird.',
      'Was aquatische Düfte so beliebt macht: Sie sind frisch, leicht und fast immer angenehm für das Umfeld. Niemand fühlt sich durch einen ozeanischen Duft belästigt, was sie zur sicheren Wahl für Büro, Sport und heisse Sommertage macht. Sie sind das olfaktorische Äquivalent eines weissen T-Shirts.',
      'Allerdings gibt es grosse Qualitätsunterschiede: Günstige aquatische Düfte können nach Seifenreiniger oder billiger Lotion riechen. Die besten Vertreter hingegen haben eine echte Tiefe, oft durch subtile holzige oder mineralische Akzente, die dem Meereseindruck Körper und Charakter verleihen.',
    ],
    sections: [
      {
        heading: 'Aquatische Düfte für Damen',
        body: [
          'Davidoff Cool Water Woman ist der weibliche Klassiker: frisch, blumig-aquatisch, mit einem Hauch Jasmin und Sandelholz. Er mag nicht der spannendste Duft sein, aber er funktioniert zuverlässig und ist für wenig Geld zu haben.',
          'Issey Miyake L\'Eau d\'Issey ist technisch gesehen ein Floral-Aquatic und bleibt nach über 30 Jahren eine Ikone. Frische Lilie, Rosen und wässrige Noten über einer Zedernholz-Basis. Elegant, diskret und zeitlos.',
          'Hugo Boss Deep Red Woman überrascht mit einer wärmeren, würzigeren Note als sein Name vermuten lässt, trotzdem bleibt er frisch und aquatisch-angenehm. Jo Malone Lime Basil and Mandarin ist eine weitere Empfehlung für Damen, die ein Unisex-Segment schätzen.',
        ],
      },
      {
        heading: 'Aquatische Düfte für Herren',
        body: [
          'Davidoff Cool Water ist das Urgestein: ein Duft, der die Kategorie definierte. Wer aquatische Düfte verstehen will, muss ihn kennen. Er riecht frisch, clean und hat eine leichte Würze, die ihn von reinen Seifen-Frischlingen unterscheidet.',
          'Montblanc Explorer Ultra Blue ist modern, aquatisch-holzig und für seinen Preis erstaunlich gut. Eine sichere Wahl für den Alltag, die sich in keiner Situation deplatziert anfühlt.',
          'Bleu de Chanel EDT hat eine aquatisch-zitrusfrische Eröffnung, die später in ein trockenes Holz übergeht. Kein typischer "Meer-Duft", aber ein aussergewöhnlich eleganter Frischduft. Für Puristen, die Aquatics nicht zu wörtlich nehmen wollen.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Davidoff Cool Water gibt es für unter 30 CHF und ist damit das Einstiegsparfum schlechthin für die aquatische Kategorie. Auch Jil Sander Sun und Lacoste L\'Eau sind in kleinen Flakons erschwinglich.',
          'Zara hat einige sehr gute frische Düfte im Programm, die aquatische Noten mit modernen holzigen Akkorden verbinden, für unter 15 CHF. Ideal als Layering-Basis oder als erstes Sommerparfum.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-moschus-pudrigen-duefte',
    title: 'Die besten Moschus- und pudrigen Düfte für ein Hautparfum-Gefühl',
    description: 'Moschus und pudrige Noten schaffen ein Parfum, das nach sauberer Haut und zartem Puder riecht. Unsere Empfehlungen für diesen intimen Duftcharakter.',
    heroImage: '/images/ratgeber/moschus-pudrige-duefte.jpg',
    intro: [
      'Pudrige und moschusartige Düfte gehören zu den intimsten der Parfumwelt. Sie riechen nicht nach Blumen, Früchten oder Holz, sondern nach etwas viel Persönlicherem: nach warmer Haut, nach frisch gewaschener Kleidung, nach dem zarten Hauch eines Gesichtspuders. Wer einmal einen wirklich guten Moschus-Duft getragen hat, versteht, warum diese Kategorie so treue Fans hat.',
      'Moschus war ursprünglich ein tierisches Sekret aus der Moschusdrüse bestimmter Hirscharten. Heute verwenden Parfumeure ausschliesslich synthetische Moschus-Verbindungen, die sehr unterschiedliche Profile haben können: weiss und sauber, cremig und warm, leicht süsslich oder fast waschmittelartig.',
      'Pudrige Noten werden oft durch Iris, Veilchenwurzel, Heliotropin oder Vanille erzeugt. Sie geben einem Duft eine retro-elegante Qualität, die an die Schönheitskabinen der 1950er Jahre erinnert, ohne kitschig zu wirken. Gut gemacht, ist ein pudriger Duft unaufdringlich, sinnlich und zutiefst angenehm.',
    ],
    sections: [
      {
        heading: 'Moschus- und Puderdüfte für Damen',
        body: [
          'Guerlain Mon Guerlain ist eine wunderschöne Interpretation von Lavendel und Vanille mit einem cremigen, puderigen Herzen. Er trägt sich leicht und bleibt dabei bemerkenswert präsent. Einer der wenigen modernen Düfte, der das Pudrige nicht übertreibt.',
          'Narciso Rodriguez For Her ist ein ikonischer Moschus-Duft: trocken, blumig, mit einem fast körperlichen Hauch. Er riecht nach warmer Haut und funktioniert fast wie ein Second-Skin-Parfum, das man gar nicht wahrnimmt, bis jemand fragt, was man trägt.',
          'Chanel Chance Eau Tendre ist trotz seines Namen frischer als pudrig, aber die Basis mit weissem Moschus und Iris gibt ihm eine Schimmer-Qualität, die es in diese Kategorie einordnet.',
        ],
      },
      {
        heading: 'Moschus- und Puderdüfte für Herren',
        body: [
          'Moschus-Düfte gelten traditionell als feminin, aber es gibt wunderbare Unisex- und Herren-Interpretationen. Clean Reserve Sueded Oud zum Beispiel: Moschus, Suede und ein Hauch Oud in einem fast minimalistischen Träger.',
          'Dior Homme Parfum hat eine Iris-Basis, die stark ins Pudrige geht: trocken, lavendelig, mit einer fast kosmischer Reinheit. Für Männer, die bereit sind, konventionelle Vorstellungen von Herrenparfum hinter sich zu lassen.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Zara Gardenia ist ein überraschend guter, pudriger Blumenduft für unter 15 CHF. Für Moschus-Einsteiger eine ideale erste Erfahrung.',
          'Nische ohne grossen Preis: The Body Shop White Musk ist seit Jahrzehnten ein Geheimtipp. Schlicht, sauber und moschusig, für wenige Franken erhältlich.',
        ],
      },
    ],
  },
  {
    slug: 'parfum-layering-duefte-kombinieren',
    title: 'Parfum-Layering: Düfte kombinieren und übereinanderschichten',
    description: 'Layering ist die Kunst, zwei oder mehr Düfte zu kombinieren. Wie es funktioniert, welche Kombinationen sich lohnen und welche Fehler man vermeiden sollte.',
    heroImage: '/images/ratgeber/parfum-layering.jpg',
    intro: [
      'Parfum-Layering, das Übereinanderschichten zweier oder mehrerer Düfte, ist keine neue Erfindung. Im Nahen Osten ist die Praxis, mehrere Oud-Extrakte, Musks und Rosen zu kombinieren, seit Jahrhunderten selbstverständlich. Westliche Parfumfans entdecken diese Technik erst seit einigen Jahren für sich.',
      'Der Reiz liegt darin, einen vollkommen persönlichen Duft zu schaffen, den sonst niemand trägt. Wer zwei Parfums auf dem Nachttisch stehen hat und morgens entscheidet, welche Schichten er aufträgt, hat unendlich mehr Möglichkeiten als jemand, der immer beim gleichen Flakon bleibt.',
      'Layering will aber gelernt sein. Nicht jede Kombination funktioniert, und wer zu viel auf einmal schichtet, endet in einer olfaktorischen Kakophonie. Dieser Ratgeber erklärt die Grundregeln und zeigt, wie man systematisch schöne Kombinationen findet.',
    ],
    sections: [
      {
        heading: 'Grundregeln des Layering',
        body: [
          'Die wichtigste Regel: Weniger ist mehr. Zwei Düfte, die sich ergänzen, sind fast immer besser als drei oder vier, die miteinander konkurrieren. Beginnen Sie mit einem Basis-Duft und einem Akzent-Duft. Der Basis-Duft trägt die Hauptcharaktere, der Akzent fügt eine neue Dimension hinzu.',
          'Ähnliche Duftkategorien harmonieren gut miteinander. Zwei holzige Düfte übereinander funktionieren, ein holziger und ein orientalischer auch. Schwieriger wird es, wenn Frischeparfums auf schwere Orientalen treffen: Das kann interessant sein, erfordert aber ein sicheres Händchen.',
          'Die Reihenfolge spielt eine Rolle. Den schwereren, anhaftenderen Duft zuerst auftragen, dann den leichteren darüber. Basisnoten verankern sich in der Haut, während frischere Kopfnoten des zweiten Parfums obenauf schweben.',
        ],
      },
      {
        heading: 'Bewährte Kombinationen',
        body: [
          'Vanille und Oud: Ein warmer, süsslicher Vanille-Duft als Basis, ein kräftiges Oud darüber. Das Ergebnis ist orientalisch-opulent, ohne eindimensional zu wirken. Diese Kombination ist besonders im Winter wirkungsvoll.',
          'Frischer Zitrus und Vetiver: Ein heiteres Zitrusparfum morgens aufgetragen, abends ein erdiger Vetiver darüber. Der Kontrast schafft Tiefe und Komplexität, ohne schwer zu wirken.',
          'Rosen-EDP und Weissem Moschus: Eine klassische, fast universell funktionierende Kombination. Das Rose gibt Charakter, der Moschus verleiht Weichheit und Haftung. Gut geeignet für alle, die in die Welt des Layering einsteigen wollen.',
        ],
      },
      {
        heading: 'Was zu vermeiden ist',
        body: [
          'Zwei starke Charakterparfums aufeinander: Oud und frischer Holzduft, Moschus-Bombe und Fruchtig-Blumig. Das Ergebnis ist meist unlesbar und aufdringlich.',
          'Zu viele Sprühstösse: Layering bedeutet nicht, die doppelte Menge aufzutragen. Testen Sie beide Düfte sparsam und erhöhen Sie nach Bedarf.',
          'Ohne vorheriges Testen kaufen: Layering-Kombinationen müssen an der Haut getestet werden. Was im Kopf oder auf Papier logisch klingt, kann in der Realität nicht zusammenpassen.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Für erste Layering-Experimente empfehlen sich Abfüllungen statt ganzer Flakons. Bei Auressa können Sie viele Düfte als 5ml- oder 10ml-Proben bestellen und damit Kombinationen risikoarm testen.',
          'Günstige Einstiegsdüfte für Layering: Zara-Parfums unter 20 CHF als Basis, dazu ein einzelner Nischenduft als Akzent. Viele Body-Mists und günstige EDTs eignen sich hervorragend als neutrale Träger-Basis.',
        ],
      },
    ],
  },
  {
    slug: 'edt-edp-parfum-unterschied',
    title: 'EDT, EDP oder Parfum? Der grosse Unterschied erklärt',
    description: 'Was bedeuten EDT, EDP, Parfum und Cologne? Wir erklären die Konzentrations-Unterschiede, wie lange sie halten und welche sich für welchen Anlass eignen.',
    heroImage: '/images/ratgeber/edt-edp-unterschied.jpg',
    intro: [
      'Wer ein Parfum kauft, stolpert unweigerlich über Abkürzungen wie EDT, EDP oder schlicht Parfum. Was steckt dahinter? Im Kern geht es um die Konzentration des Duftöls im Alkohol. Je höher der Anteil, desto intensiver und langanhaltender der Duft, und desto teurer in der Regel auch der Flakon.',
      'Für die Schweizer Parfumkultur spielt das eine wichtige Rolle. Wer einen Alltagsduft sucht, der sich auch nach einem Arbeitstag noch frisch anfühlt, greift oft zu einer leichteren Variante. Wer hingegen einen Signature-Duft für besondere Abende möchte, ist mit einem EDP oder echten Parfum besser bedient.',
      'Doch die Konzentrationsangabe ist nicht alles: Die Qualität des Duftöls, die Formulierung und das Trägermaterial spielen eine ebenso grosse Rolle. Manche EDTs halten bemerkenswert lange, während gewisse EDPs trotz hoher Konzentration kaum wahrnehmbar sind. Dieser Ratgeber bringt Licht ins Dunkel.',
    ],
    sections: [
      {
        heading: 'Die vier Hauptkategorien im Überblick',
        body: [
          'Eau de Cologne (EDC) enthält 2 bis 5 Prozent Duftöl und hält typischerweise 2 bis 3 Stunden. Klassische Frischesprays und sportliche Düfte werden oft als EDC formuliert. Ideal für heisse Sommertage, wenn man den Duft sowieso immer wieder auffrischen möchte.',
          'Eau de Toilette (EDT) liegt bei 5 bis 15 Prozent Duftölanteil und bietet eine Haltbarkeit von 3 bis 5 Stunden. Dies ist das Standardformat für viele Alltagsdüfte. Leicht, vielseitig und meist günstiger als das EDP-Pendant desselben Parfums.',
          'Eau de Parfum (EDP) mit 15 bis 20 Prozent Konzentration hält 6 bis 8 Stunden und ist heute das beliebteste Format im Premiumsegment. Viele Designer- und Nischendüfte erscheinen zuerst als EDP, weil die Intensität und Projektion besser zur Markenwahrnehmung passen.',
          'Parfum oder Extrait de Parfum mit 20 bis 40 Prozent Duftölanteil ist die reinste Form. Oft ölig in der Textur, braucht man nur wenige Tropfen. Hält 8 bis 12 Stunden oder länger. Klassiker wie Chanel No. 5 oder Guerlain Shalimar sind in dieser Form eine ganz andere Erfahrung als das bekannte EDP.',
        ],
      },
      {
        heading: 'EDT versus EDP: Wann was wählen?',
        body: [
          'Für das Büro und alltägliche Anlässe ist ein EDT oft angenehmer, weil es die Mitmenschen nicht überwältigt. Im geschlossenen Besprechungsraum kann ein zu starkes EDP unangenehm wirken. Leichte Zitrus-, Ozean- oder florale EDTs sind hier die sichere Wahl.',
          'Für Abendveranstaltungen, Dinners und besondere Anlässe ist ein EDP die bessere Wahl. Die grössere Projektion sorgt dafür, dass man den Duft bewusst wahrnimmt, ohne sich übertreiben zu müssen. Gerade orientalische, holzige und gourmande Noten entfalten sich in EDPs besonders schön.',
          'Im Winter, wenn Kleidung und Kälte die Duftprojektion dämpfen, macht ein EDP oder sogar ein Extrait Sinn. Im Sommer hingegen, wenn Hitze die Intensität verstärkt, ist ein EDT oft die angenehmere Wahl für alle Beteiligten.',
        ],
      },
      {
        heading: 'Achtung: Reformulierungen und Markennamen',
        body: [
          'Viele Marken nutzen EDT und EDP nicht nur zur Beschreibung der Konzentration, sondern auch als eigenständige Produktlinien mit unterschiedlichen Duftprofilen. Das EDP eines Parfums riecht oft nicht einfach stärker, sondern wirklich anders. Mehr Basis-Noten, mehr Wärme, mehr Tiefe.',
          'Auch beim Vergleich älterer und neuerer Flakons lohnt sich Vorsicht: Reformulierungen, die aus Kostengründen oder gesetzlichen Anforderungen (IFRA) vorgenommen wurden, können das Duftbild erheblich verändern. Das EDT von heute muss nicht mehr das EDT von vor zehn Jahren sein.',
          'Wer sichergehen will, kauft Proben. Bei Auressa gibt es viele Düfte als Abfüllungen, sodass man EDT und EDP eines Parfums direkt vergleichen kann, bevor man in den grossen Flakon investiert.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Viele Marken bieten ihre beliebtesten Linien in kleinen Flakons (30 ml) auch unter 50 CHF an. Das lohnt sich besonders beim Einstieg in eine neue Duftkategorie: Man bekommt das echte Produkt, nicht nur eine Probe, und kann es über Wochen tragen, bevor man sich für den grossen Flakon entscheidet.',
          'Drugstore-Brands wie Bruno Banani, Davidoff oder Adidas bieten EDT-Qualitäten für unter 30 CHF an. Sie sind nicht mit Nischenparfums vergleichbar, erfüllen aber die Funktion eines frischen Alltagsdufts durchaus. Für den Einstieg ins Thema absolut legitim.',
        ],
      },
    ],
  },
  {
    slug: 'haeufige-parfum-fehler',
    title: 'Die 7 häufigsten Parfum-Fehler und wie man sie vermeidet',
    description: 'Zu viel auftragen, am Handgelenk reiben, falsch lagern: Diese Fehler machen viele beim Parfum. Wir erklären, was wirklich funktioniert.',
    heroImage: '/images/ratgeber/parfum-fehler.jpg',
    intro: [
      'Parfum ist eine Kunst, und wie bei jeder Kunst gibt es Fehler, die selbst hartgesottene Duftfans immer wieder machen. Manche Gewohnheiten haben sich so tief eingeschlichen, dass man sie kaum noch als Fehler wahrnimmt. Dabei können kleine Änderungen in der Anwendung den Duftgenuss erheblich verbessern.',
      'In der Schweizer Parfumszene, wo Qualitätsbewusstsein und Sorgfalt hochgehalten werden, lohnt es sich besonders, die eigene Parfumroutine zu hinterfragen. Denn ein gutes Parfum verdient eine gute Behandlung, sonst verschwendet man nicht nur Geld, sondern auch die Arbeit der Parfumeure dahinter.',
      'Dieser Ratgeber beleuchtet die sieben verbreitetsten Fehler beim Kauf, der Anwendung und der Aufbewahrung von Parfum, mit praktischen Alternativen, die den Unterschied machen.',
    ],
    sections: [
      {
        heading: 'Fehler 1: Am Handgelenk reiben',
        body: [
          'Der klassische Fehler schlechthin: Parfum auf beide Handgelenke sprühen und diese dann aneinanderreiben. Das sieht elegant aus, zerstört aber die Duftstruktur. Durch Reibung entsteht Wärme, die die empfindlichsten Kopfnoten sofort verdampft und die Herznoten beschädigt.',
          'Besser: Parfum auftragen und trocknen lassen. Entweder beide Handgelenke leicht zusammentupfen, ohne zu reiben, oder einfach stehen lassen. Der Duft entwickelt sich dann so, wie der Parfumeur es vorgesehen hat.',
        ],
      },
      {
        heading: 'Fehler 2: Zu viel auftragen',
        body: [
          'Mehr ist nicht besser. Gerade bei EDPs und Extraits reichen 2 bis 3 Sprühstösse für einen ganzen Tag. Wer sich mit Parfum einsprüht wie mit Deo, belästigt sein Umfeld und nimmt sich selbst die Möglichkeit, den Duft zu geniessen, da die Nase sich schnell an intensive Gerüche gewöhnt.',
          'Tipp: Mit einem Sprühstoss am Hals beginnen. Nach einer Stunde beurteilen, ob man mehr braucht. Oft reicht das vollkommen.',
        ],
      },
      {
        heading: 'Fehler 3: Auf die Kleidung sprühen',
        body: [
          'Viele sprühen Parfum direkt auf den Stoff. Das kann Flecken verursachen, besonders bei hellen Textilien und öligen Extrait-Formulierungen. Ausserdem verändert Stoff das Duftbild: Die körpereigene Wärme fehlt, und der Duft entwickelt sich anders als vom Parfumeur geplant.',
          'Auf Haut aufgetragen interagiert der Duft mit der eigenen Körperwärme und dem Hautchemismus, was einen ganz persönlichen Duftcharakter ergibt. Das ist das Wesen guter Parfumerie.',
        ],
      },
      {
        heading: 'Fehler 4: Falsch lagern',
        body: [
          'Parfum gehört nicht ins Badezimmer. Feuchtigkeit, Temperaturwechsel und Licht zersetzen das Duftöl und verändern die Komposition. Im Badschrank klingt praktisch, ist aber einer der schlechtesten Aufbewahrungsorte.',
          'Ideal ist ein kühler, dunkler Ort ohne direkte Sonneneinstrahlung. Ein Schublade im Schlafzimmer oder ein abgedecktes Regal. Teurer Parfum hält dort jahrelang, ohne sich zu verändern.',
        ],
      },
      {
        heading: 'Fehler 5: Im Kaufhaus ohne Pause testen',
        body: [
          'Im Parfumhaus 10 Düfte nacheinander zu riechen, überfordert die Nase. Nach dem vierten Duft können die meisten Menschen kaum noch unterscheiden. Kaffeebohnen, die angeblich den Geruchssinn "zurücksetzen", helfen übrigens wenig. Das ist ein Mythos.',
          'Besser: Höchstens 2 bis 3 Düfte an der Haut testen, dann eine Pause einlegen. Auf der Haut sieht man nach 30 Minuten, wie sich der Duft wirklich entwickelt. Proben mit nach Hause nehmen und an verschiedenen Tagen testen ist die zuverlässigste Methode.',
        ],
      },
      {
        heading: 'Fehler 6: Den Trockenwert als Urteil nehmen',
        body: [
          'Viele beurteilen einen Duft nach dem ersten Sprühstoss im Laden. Das ist der sogenannte Topnoten-Eindruck, der nach 10 bis 20 Minuten fast vollständig verschwunden ist. Was dann folgt, die Herz- und Basisnoten, macht den eigentlichen Charakter eines Parfums aus.',
          'Wer nur nach dem ersten Eindruck kauft, trifft oft Fehlentscheidungen. Ein Duft, der zunächst scharf oder aufdringlich riecht, kann sich zu einem warmen, eleganten Begleiter entwickeln.',
        ],
      },
      {
        heading: 'Fehler 7: Parfum nach Werbung kaufen',
        body: [
          'Gute Parfumwerbung verkauft Fantasie, nicht Geruch. Die meisten Werbebilder haben mit dem tatsächlichen Duftcharakter nichts zu tun. Wer sich allein von Kampagnen leiten lässt, landet oft bei einem Parfum, das zur eigenen Persönlichkeit gar nicht passt.',
          'Der zuverlässigste Weg: Proben bestellen, Rezensionen von echten Parfumfans lesen, und am Ende nur kaufen, was man an der eigenen Haut wirklich schön findet. Auressa bietet genau das an: Proben vor dem Kauf, damit die Entscheidung informiert und confident ist.',
        ],
      },
    ],
  },
  {
    slug: 'parfums-mit-schweizer-bezug',
    title: 'Parfums mit Schweizer Bezug: Düfte aus und für die Schweiz',
    description: 'Von Zuger Kirschwasser bis Alpenkräuter: Düfte, die Schweizer Heimatgefühl wecken. Und warum Auressa die beste Adresse für Schweizer Parfumfans ist.',
    heroImage: '/images/ratgeber/schweizer-parfum.jpg',
    intro: [
      'Die Schweiz hat eine starke Verbindung zur Parfumwelt, auch wenn kaum jemand daran denkt. Einige der weltgrössten Aromachemiehersteller wie Givaudan und Firmenich, heute fusioniert zu dsm-firmenich, haben ihren Ursprung in Genf und Vernier. Viele der Duftstoffe, die in weltbekannten Parfums stecken, wurden in der Westschweiz entwickelt.',
      'Gleichzeitig gibt es kleine, feine Parfummaisons, die sich von der Schweizer Natur, dem Handwerk und der Präzision der Uhrmacherkunst inspirieren lassen. Alpenkräuter, frische Bergluft, klare Seen und das Bergmassiv des Gotthards finden sich als olfaktorische Referenzen in manchen Kompositionen.',
      'Für Schweizer Parfumfans ist Auressa ein natürlicher Ausgangspunkt: Auf Franken gepriest, mit Abfüllungen statt grosser Flakons, und einem Sortiment, das auf echte Qualität statt auf Massenwerbung setzt. Dieser Ratgeber erkundet den Schweizer Bezug in der Parfumwelt.',
    ],
    sections: [
      {
        heading: 'Die Aromachemie-Wurzeln der Schweiz',
        body: [
          'Givaudan wurde 1895 in Vernier bei Genf gegründet und ist heute der weltgrösste Hersteller von Aromen und Duftstoffen. Firmenich, 1895 ebenfalls in Genf entstanden, fusionierte 2023 mit dem niederländischen DSM zu dsm-firmenich. Zusammen beliefern diese Unternehmen fast alle grossen Parfumhäuser der Welt.',
          'Das bedeutet: Wenn man Chanel, Dior, Gucci oder YSL trägt, steckt oft Schweizer Aromachemie darin. Die Muskon-Moleküle, die modernen Holzakkorde, viele der synthetischen Amber-Verbindungen, sie kommen aus Genfer Labors.',
          'Obwohl diese Firmen keine eigenen Konsumentenparfums verkaufen, ist ihr Einfluss auf die globale Parfumwelt kaum zu überschätzen. Die Schweiz ist also tief in der DNA der modernen Parfumerie verankert, auch wenn das nicht auf den Flacons steht.',
        ],
      },
      {
        heading: 'Schweizer Natur als Duftinspirations-Quelle',
        body: [
          'Einige Parfumhäuser haben sich von Schweizer Landschaften inspirieren lassen. Das Hochgebirge mit seiner klaren, fast sterilen Luft, die Kräuter der Voralpen wie Enzian, Edelweiss und Thymian, und das grüne Mittelland mit seinen Obstgärten finden sich als olfaktorische Referenzen.',
          'Edelweiss als Duftmotiv taucht in verschiedenen Parfums auf, obwohl die echte Pflanze wenig intensiv riecht. Parfumeure interpretieren es als Frische, Kühle und alpine Reinheit, oft kombiniert mit Bergkräutern, mineralischen Noten und weissem Moschus.',
          'Wer Bergluft im Flakon sucht: Kühlende, ozonische Noten wie in Kenzo Air oder verschiedenen Montblanc-Düften erinnern an frische Höhenluft. Kombiniert mit grünen, krautigen Noten entsteht das, was viele als "Schweizer Bergduft" beschreiben würden.',
        ],
      },
      {
        heading: 'Kaufen in der Schweiz: Worauf man achten sollte',
        body: [
          'Parfumpreise in der Schweiz sind dank starkem Franken und einheitlicher Mehrwertsteuer oft kompetitiv. Zollfreimengen beim Import aus der EU liegen bei 300 CHF Warenwert, was grosse Bestellungen komplizieren kann. Wer lokal kauft, hat keine Zollüberraschungen.',
          'Auressa ist auf den Schweizer Markt ausgerichtet: Preise in CHF, Versand innerhalb der Schweiz, und ein Sortiment mit Abfüllungen, das auch Parfumeinsteiger nicht mit grossen Flakon-Investitionen überfordert.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-lattafa-duefte',
    title: 'Die besten Lattafa Düfte: Orientalische Luxusparfums zum kleinen Preis',
    description: 'Lattafa aus Dubai macht Parfums, die teure Nischendüfte herausfordern. Unsere Top-Picks aus dem Lattafa-Sortiment für Einstieg und Kenner.',
    heroImage: '/images/ratgeber/lattafa-duefte.jpg',
    intro: [
      'Lattafa Perfumes ist eine Dubaier Marke, die in der westlichen Parfumszene in den letzten Jahren für viel Aufsehen gesorgt hat. Was die Marke bietet: opulente, orientalische Kompositionen, die oft an bekannte Nischendüfte erinnern und dabei einen Bruchteil des Preises kosten.',
      'Viele Lattafa-Düfte werden explizit als "Dupes" oder Alternativen zu Parfums wie Baccarat Rouge 540, Kilian Straight to Heaven oder Xerjoff-Kreationen vermarktet. Dabei würde man der Marke unrecht tun, sie nur als Kopierer zu betrachten: Viele Lattafa-Kompositionen haben einen eigenständigen Charakter und eine Projektion, die teure Originale in den Schatten stellen kann.',
      'Für Schweizer Parfumfans bietet Lattafa eine interessante Möglichkeit: Man kann den orientalischen Duftstil kennenlernen, ohne gleich 200 oder 300 Franken in ein Nischenparfum zu investieren. Dieser Ratgeber zeigt die wichtigsten Lattafa-Düfte für Einsteiger und Kenner.',
    ],
    sections: [
      {
        heading: 'Lattafa-Klassiker, die man kennen sollte',
        body: [
          'Lattafa Khamrah ist einer der beliebtesten Lattafa-Düfte weltweit. Süss, karamellig, mit Rum-Noten und einer orientalischen Wärme. Ein Gourmand-Duft mit aussergewöhnlicher Haltbarkeit und Projektion. Wer Baccarat Rouge 540 als zu teuer empfindet, findet in Khamrah eine zugängliche Alternative.',
          'Lattafa Asad ist holzig-orientalisch mit Oud, Vetiver und einem Hauch Amber. Er trägt sich erwachsen, geerdet und eignet sich für herbstliche und winterliche Anlässe. Für Männer, die Creed Viking oder Tom Ford Oud Wood kennen und mögen, ist Asad einen Versuch wert.',
          'Lattafa Yara ist der florale, frisch-fruchtige Lattafa für Damen. Himbeere, Jasmin und Amber über Moschus: zugänglich, angenehm und bei weitem nicht so schwergewichtig wie andere Lattafa-Kreationen.',
        ],
      },
      {
        heading: 'Lattafa für Einsteigerinnen und Einsteiger',
        body: [
          'Wer Lattafa noch nicht kennt und nicht sicher ist, ob der orientalische Stil passt: Yara für Damen oder Asad für Herren sind gute Einstiegspunkte. Beide sind komplex genug, um interessant zu sein, aber nicht so überwältigend wie manche anderen Orientalen.',
          'Lattafa Oud Mood ist ein weiterer guter Einstieg. Sanfter als ein klassisches Oud-Parfum, verbindet er die Tiefe von Oud mit floralen und süssen Elementen, die ihn zugänglicher machen.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Nahezu alle Lattafa-Düfte kosten unter 50 CHF, viele sogar unter 30 CHF für 100 ml. Das macht Lattafa zur günstigsten Möglichkeit, opulente orientalische Parfumwelten zu erkunden, ohne das Budget zu strapazieren.',
          'Bei Auressa gibt es Lattafa-Abfüllungen, sodass man verschiedene Düfte der Marke ausprobieren kann, bevor man in den 100ml-Flakon investiert.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-armaf-duefte',
    title: 'Die besten Armaf Düfte: Günstige Alternativen zu Luxusparfums',
    description: 'Armaf ist Indiens bekannteste Parfummarke im westlichen Markt. Club de Nuit Intense ist eine Legende. Welche Armaf-Düfte sich wirklich lohnen.',
    heroImage: '/images/ratgeber/armaf-duefte.jpg',
    intro: [
      'Armaf ist eine indische Parfummarke, die international vor allem durch einen einzigen Duft bekannt wurde: Club de Nuit Intense Man. Dieser Duft hat eine fast kultartige Anhängerschaft, weil er verblüffend stark an Creed Aventus erinnert, dabei aber nur einen Bruchteil kostet.',
      'Was Armaf auszeichnet, ist ein gutes Gespür für westliche Dufttrends, kombiniert mit orientalischen Produktionsstärken: grosse Mengen hochwertigem Duftöl, gute Haltbarkeit und Projektion. Die Marke trifft den Geschmack von Leuten, die Qualität schätzen, aber nicht bereit sind, 200 bis 400 Franken für einen Duft auszugeben.',
      'Armaf hat inzwischen ein breites Sortiment, das weit über Club de Nuit hinausgeht. Von frischen Unisex-Düften bis zu opulenten Orientalen findet man bei Armaf für fast jeden Geschmack etwas. Dieser Ratgeber zeigt die wichtigsten Vertreter.',
    ],
    sections: [
      {
        heading: 'Club de Nuit Intense: Die Legende',
        body: [
          'Club de Nuit Intense Man ist das Aushängeschild der Marke und wird oft als "bester Aventus-Dupe" bezeichnet. Fruchtig, rauchig, holzig mit Birke und Moschus: Das Profil ist dem Creed-Klassiker erstaunlich ähnlich, ohne eine direkte Kopie zu sein.',
          'Die Intensität ist bemerkenswert: Ein Sprühstoss reicht für den ganzen Tag. Die Sillage ist gross, die Haltbarkeit legendär. Wer Aventus kennt und liebt, aber den Preis nicht aufbringen will oder kann, findet in CDNI eine echte Alternative.',
          'Club de Nuit Intense Woman ist das Pendant für Damen: fruchtiger, blumiger, aber ebenfalls mit beeindruckender Langlebigkeit und einem eigenständigen, angenehmen Duftprofil.',
        ],
      },
      {
        heading: 'Andere Armaf-Empfehlungen',
        body: [
          'Armaf Enchanted für Damen ist ein ausgewogener Blumental mit Rosen und Iris, der sich elegant und unkompliziert trägt. Armaf Tres Nuit für Herren ist ein frischer, sauberer Duft, der an D&G Light Blue erinnert und sich ideal für den Alltag eignet.',
          'Armaf Le Parfait ist ein opulenteres Angebot: warm, süss, orientalisch. Für Liebhaber von Viktor and Rolf Spicebomb oder Dior Fahrenheit Extreme.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Fast alle Armaf-Produkte liegen unter 50 CHF, viele der 100ml-Flakons sogar unter 35 CHF. Damit ist Armaf, neben Lattafa, die günstigste Möglichkeit, qualitativ hochwertige Parfums mit echtem Charakter zu kaufen.',
          'Bei Auressa sind Armaf-Abfüllungen erhältlich. So lässt sich CDNI und andere Armaf-Düfte testen, bevor man den Flakon kauft.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-herbstduefte',
    title: 'Die besten Herbstdüfte für Damen und Herren',
    description: 'Amber, Leder, Gewürze und Holz: Herbstdüfte sind warm, tief und opulent. Unsere Empfehlungen für die schönsten Parfums im Herbst.',
    heroImage: '/images/ratgeber/herbstduefte.jpg',
    intro: [
      'Herbst ist die Königsdisziplin der Parfumwelt. Wenn die Temperaturen sinken, die Blätter fallen und die Abende länger werden, darf man in der Parfumerie endlich jene Düfte herausholen, die im Sommer viel zu schwer gewesen wären. Amber, Patchouli, Leder, Tabak, Gewürze und dunkles Holz: Das sind die Zutaten, aus denen grosse Herbstparfums gemacht werden.',
      'Es gibt kaum einen Moment, in dem ein gutes Parfum wirkungsstärker ist als an einem kühlen Herbstabend. Die Kälte verleiht Düften eine besondere Präsenz und lässt Basisnoten langsamer verdunsten, sodass die Tiefe einer Komposition voll zur Geltung kommt. Was im Sommer nach einer Stunde verschwunden wäre, hält im Herbst acht Stunden und länger.',
      'Dieser Ratgeber zeigt die schönsten Herbstdüfte für Damen und Herren, von zugänglichen Klassikern bis zu Nischenperfums, die den Herbst auf eine ganz eigene Weise interpretieren.',
    ],
    sections: [
      {
        heading: 'Herbstdüfte für Damen',
        body: [
          'Yves Saint Laurent Black Opium ist ein moderner Herbst-Klassiker: süss, kaffeeartig, mit weissen Blumen und Patchouli. Er ist das, was man trägt, wenn man sich ein bisschen opulent und selbstbewusst fühlen möchte. Die EDP-Version hält ausdauernd und projiziert kraftvoll.',
          'Guerlain Shalimar Eau de Parfum ist eine Hommage an die klassische Parfumkunst: Bergamotte und Iris im Auftakt, Jasmin und Rose im Herz, Vanille, Tonkabohne und Zibet in der Basis. Für Frauen, die bereit sind, einen Duft mit Geschichte zu tragen.',
          'Tom Ford Black Orchid ist dunkel, üppig und gewagt: schwarze Trüffel, Ylang-Ylang und Patchouli über einem Sandelholz-Amber-Bett. Ein Herbstduft für besondere Abende, nicht für jeden Tag, aber unvergesslich.',
          'Für ein zugänglicheres, blumig-warmes Herbstprofil: Lancôme Trésor Midnight Rose oder Dior Hypnotic Poison, ein Klassiker mit Mandel, Kokos und Sandelholz.',
        ],
      },
      {
        heading: 'Herbstdüfte für Herren',
        body: [
          'Dior Fahrenheit ist ein Herbst-Klassiker der Herrendüfte: Benzin, Leder, Veilchen und Sandelholz. Ein polarisierender, mutiger Duft, der nicht jedem gefällt, aber auf den richtigen Trägern aussergewöhnlich wirkt.',
          'Yves Saint Laurent La Nuit de l\'Homme ist das elegante, dezente Gegenmodell: Kardamom, Vetiver und Zedernholz. Warm genug für kühle Herbstnächte, elegant genug für die Oper.',
          'Spicebomb von Viktor and Rolf lebt seinem Namen: Zimt, Pfeffer, Tabak und Leder. Im Winter zu schwer, im Herbst genau richtig. Extrem projizierend und langanhaltend.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Lattafa Khamrah und Asad sind hervorragende Herbstdüfte für unter 30 CHF. Beide haben die Wärme und Tiefe, die die Jahreszeit verlangt, ohne das Budget zu strapazieren.',
          'Bruno Banani Denim und Diesel Only the Brave sind im unteren Preissegment brauchbare Herbst-Optionen für Männer. Für Frauen: kleine Flakons von Chloe Nomade oder Valentino Donna Born in Roma sind oft unter 50 CHF erhältlich.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-nischenduefte',
    title: 'Die besten Nischendüfte: besonders & aussergewöhnlich',
    description:
      'Nischendüfte heben sich vom Mainstream ab: eigenständig, hochwertig und aussergewöhnlich. Was Nischenparfums ausmacht und unsere Favoriten aus dem Katalog.',
    heroImage: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1200&q=80&fit=crop',
    intro: [
      'Nischendüfte sind die Gegenwelt zu den grossen Mainstream-Parfums: Statt für den Massengeschmack gemacht, setzen sie auf Eigenständigkeit, hochwertige Rohstoffe und einen unverwechselbaren Charakter. Wer etwas Besonderes sucht, das nicht jeder trägt, wird hier fündig.',
      'Der Begriff Nische sagt nichts über den Preis. Er beschreibt den Ansatz. Nischenmarken wie Le Labo, Byredo oder Xerjoff haben sich bewusst aus dem Massenmarkt herausgehalten, arbeiten oft mit selteneren Rohstoffen und bieten mehr Persönlichkeit als ein Mainstream-Bestseller. Das geht oft mit einem höheren Preis einher, aber nicht immer.',
      'Ein guter Nischenduft bleibt auf deiner Haut unverwechselbar und trägt etwas Eigenes in sich. Er polarisiert vielleicht mehr als ein Mainstream-Duft, aber genau das macht seinen Reiz aus. Hier unsere schönsten Nischendüfte aus dem Katalog, von strahlend und modern bis dunkel-holzig und orientalisch.'
    ],
    sections: [
      {
        heading: 'Die besten Nischendüfte aus dem Katalog',
        perfumes: [
          'baccarat-rouge-540',
          'le-labo-santal-33',
          'nishane-hacivat',
          'xerjoff-naxos',
          'initio-oud-greatness',
          'orto-megamare',
          'byredo-gypsy-water',
          'kilian-angels-share'
        ]
      },
      {
        heading: 'Nischendüfte für Einsteiger',
        body: [
          'Le Labo Santal 33 ist einer der zugänglichsten Nischendüfte überhaupt: holzig, leicht rauchig und unisex. Er hat Kultstatus erreicht, den er absolut verdient.',
          'Byredo Gypsy Water ist ein weiterer guter Einstieg: frisch-holzig mit einem Hauch Gewürz und Harz, ungewöhnlich ohne unangenehm zu sein.',
          'Maison Francis Kurkdjian Baccarat Rouge 540 ist heute fast ein Mainstream-Favorit, kommt aber aus der Nische. Safranig-warm und sehr langlebig.'
        ]
      },
      {
        heading: 'Nischendüfte für erfahrene Duft-Fans',
        body: [
          'Xerjoff Naxos ist einer der schönsten orientalischen Nischendüfte: warme Vanille, Tonkabohne und Tabak, opulent und sehr langlebig.',
          'Initio Oud for Greatness ist ein dunkler, safraniger Oud-Duft mit grosser Präsenz und tollem Tiefgang. Nichts für Anfänger, aber ein Erlebnis für alle, die Oud lieben.',
          'Orto Parisi Megamare ist für alle, die es frisch und intensiv mögen: salzig, aquatisch und sehr eigenständig.'
        ]
      },
      {
        heading: 'Was macht einen Nischenduft aus?',
        body: [
          'Nischendüfte stammen meist von kleineren, spezialisierten Häusern, die sich auf Duftkunst statt auf Massenproduktion konzentrieren. Oft stecken hochwertigere oder ungewöhnlichere Rohstoffe drin.',
          'Sie sind in der Regel eigenständiger und mutiger als Designer-Düfte, dafür manchmal polarisierender. Genau das macht ihren Reiz aus.',
          'Nischendüfte sind häufig teurer, halten dafür aber oft sehr lange und überzeugen mit Tiefe und Charakter. Schon ein Sprühstoss genügt meist.'
        ]
      },
      {
        heading: 'Lohnt sich der höhere Preis?',
        body: [
          'Nicht jeder Nischenduft ist automatisch besser als ein guter Designer-Duft. Am Ende zählt, ob er dir gefällt und zu dir passt.',
          'Tipp: Nischendüfte zuerst über eine kleine Abfüllung oder Probe testen, bevor du den grossen Flakon kaufst. So vermeidest du teure Fehlkäufe.',
          'Übrigens: Auch unter günstigen Marken gibt es Düfte, die in eine ähnlich edle Richtung gehen. Schau dazu in unseren Ratgeber zu günstigen Alternativen für teure Parfüms.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-sommerduefte-frauen',
    title: 'Die besten Sommerdüfte für Frauen 2026',
    description:
      'Leichte, frische Damendüfte für heisse Tage: fruchtig, floral und sonnig. Unsere Sommer-Favoriten für Frauen 2026, von günstig bis edel.',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&fit=crop',
    intro: [
      'Im Sommer dürfen Damendüfte leicht, fruchtig und strahlend sein: ein Hauch Zitrus, sonnige Blüten oder cremige Kokos-Vanille wirken bei Wärme am schönsten, ohne zu erschlagen. Die schweren Winterlieblinge kommen in die Schublade.',
      'Was einen guten Sommer-Damenduft ausmacht: Er startet frisch und fruchtig, entwickelt sich auf der Haut zu etwas Wärmerem und bleibt bis zum Abend angenehm. Keine intensive Schwere, die bei 30 Grad erdrückend wirkt, aber auch kein purer Zitrus, der nach einer Stunde verschwunden ist.',
      'Hier unsere liebsten Sommerdüfte für Frauen aus dem Katalog, von günstig bis edel, für jeden Geschmack.'
    ],
    sections: [
      {
        heading: 'Die besten Sommerdüfte für Frauen',
        perfumes: [
          'dolce-gabbana-light-blue',
          'armani-acqua-di-gioia',
          'lattafa-yara',
          'ariana-cloud',
          'marc-jacobs-daisy',
          'sdj-cheirosa-62',
          'dkny-be-delicious',
          'lattafa-mayar'
        ]
      },
      {
        heading: 'Frisch & spritzig: für heisse Tage',
        body: [
          'Dolce & Gabbana Light Blue ist seit Jahren eine der meistgetragenen Sommer-Entscheidungen für Frauen: zitrusfrisch mit Apfel und weissem Moschus, leicht und unkompliziert. Armani Acqua di Gioia kombiniert Jasmin und Zitrusnoten mit einem sanften Holzabgang, angenehm für warme Tage und laue Abende.',
          'Lattafa Mayar ist die günstige Alternative in dieser Kategorie: frisch, dezent blumig und für unter 30 CHF erhältlich. Eine unkomplizierte Wahl für den Alltag.'
        ]
      },
      {
        heading: 'Sonnig & fruchtig: gute Laune pur',
        body: [
          'Marc Jacobs Daisy und DKNY Be Delicious gehen in eine fröhlich-fruchtige Richtung, die sofort Sommer-Feeling auslöst. Leicht, süss und nie erdrückend.',
          'Ariana Grande Cloud ist etwas cremiger und weicher, mit Kokos und Vanille, ideal für Strandtage und laue Sommerabende.'
        ]
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Lattafa Yara kostet oft unter 30 CHF und ist eine cremig-fruchtige Sommer-Empfehlung mit toller Haltbarkeit.',
          'Sol de Janeiro Cheirosa 62 mit Pistazie und Karamell ist unter 50 CHF erhältlich und ein echter Komplimente-Magnet für warme Tage.',
          'Lattafa Mayar ist die preiswerteste Option in diesem Ratgeber, frisch und alltagstauglich.'
        ]
      },
      {
        heading: 'Welche Duftrichtung passt im Sommer zu dir?',
        body: [
          'Frisch & spritzig: aquatische und zitrische Düfte wirken sauber und unbeschwert, ideal fürs Büro und für heisse Tage.',
          'Fruchtig & fröhlich: leichte Frucht- und Blütendüfte bringen sofort gute Laune.',
          'Sonnig & cremig: Kokos, Pistazie oder weiche Vanille sind die kuscheligen Sommerlieblinge für Strand und laue Abende.'
        ]
      },
      {
        heading: 'So hält dein Sommerduft länger',
        body: [
          'Frische Noten verfliegen schneller. Den Duft auf eingecremte Haut tragen und einen kleinen Zerstäuber für mittags mitnehmen.',
          'Vorsichtig auf Haare und Kleidung sprühen: Dort hält ein Duft oft länger als auf erhitzter Haut.',
          'Weniger ist mehr: Bei Hitze wirkt jeder Duft intensiver. Ein bis zwei Sprühstösse reichen meist völlig.'
        ]
      }
    ]
  },
  {
    slug: 'creed-aventus-guenstige-alternativen',
    title: 'Creed Aventus: die besten günstigen Alternativen',
    description:
      'Creed Aventus ist legendär, aber teuer. Diese günstigen Alternativen gehen in die gleiche fruchtig-rauchige Richtung. Unsere Spar-Tipps aus dem Katalog.',
    heroImage: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1200&q=80&fit=crop',
    intro: [
      'Creed Aventus gilt als einer der berühmtesten Herrendüfte überhaupt: fruchtige Ananas, rauchige Birke und edles Moschus-Holz. Er ist seit 2010 ein Klassiker und hat eine fast mythische Stellung in der Duft-Community. Aber der Preis von über 400 CHF für einen Flakon ist happig.',
      'Die gute Nachricht: Es gibt Düfte, die in eine sehr ähnliche fruchtig-rauchige Richtung gehen, zu einem Bruchteil des Preises. Wichtig und ehrlich gesagt: Keiner ist eine exakte Kopie. Aventus hat einen ganz eigenen Charakter, den kein Dupe vollständig reproduziert. Für den Alltag sind die Alternativen verblüffend nah dran.',
      'Hier die besten günstigen Alternativen zu Creed Aventus, mit ehrlichem Vergleich und Hinweis, wo sie sich unterscheiden.'
    ],
    sections: [
      {
        heading: 'Die besten Aventus-Alternativen im Vergleich',
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Armaf Club de Nuit Intense Man ist die bekannteste Aventus-Alternative überhaupt: fruchtige Ananas, rauchige Birke und Moschus, erstaunlich nah am Original und zu einem Bruchteil des Preises.'
          },
          {
            expensive: 'creed-aventus',
            cheap: 'lattafa-asad',
            note: 'Lattafa Asad geht in dieselbe fruchtig-rauchige Richtung, etwas wärmer und süsser abgestimmt, ein langlebiger, projektionsstarker Sparpick für unter 40 CHF.'
          },
          {
            expensive: 'creed-aventus',
            cheap: 'armaf-cdn-milestone',
            note: 'Armaf Club de Nuit Milestone geht in eine ähnliche fruchtige Richtung mit Ananas und warmem Ambroxan, moderner und süsser als Aventus, aber klar verwandt.'
          }
        ]
      },
      {
        heading: 'Was macht Creed Aventus so besonders?',
        body: [
          'Aventus lebt von seinem spezifischen Akkord: fruchtige Ananas (aus Hedione und fruchtig-süssen Molekülen), rauchige Birke und eine klare Ambroxan-Basis. Das Zusammenspiel ist einzigartig und sehr gut ausbalanciert.',
          'Was die Dupes oft nicht ganz treffen: die Qualität der Birken-Note und die spezifische Art, wie Aventus auf der Haut trocknet. Die Alternativen sind lauter, wärmer oder fruchtiger, aber selten exakt das.',
          'Trotzdem lohnt es sich, die Alternativen zu kennen. Für den Alltag ist Club de Nuit Intense Man oder Lattafa Asad eine vollkommen ehrliche Wahl.'
        ]
      },
      {
        heading: 'Worauf du bei Aventus-Alternativen achten solltest',
        body: [
          'Die Reihenfolge der Noten kann leicht abweichen: Mal steht die Ananas im Vordergrund, mal das rauchige Holz. Teste am besten auf der Haut.',
          'Günstige Alternativen sind oft sogar projektionsstärker als das Original. Ein bis zwei Sprühstösse genügen.',
          'Aventus und Alternativen passen ganzjährig, kommen aber im Frühling und Herbst besonders schön zur Geltung.'
        ]
      },
      {
        body: [
          'Mehr Spar-Tipps zu anderen teuren Originalen findest du in unserem Ratgeber zu günstigen Alternativen für teure Parfüms.'
        ]
      }
    ]
  },
  {
    slug: 'lattafa-dupes-welches-original',
    title: 'Lattafa Dupes: Welches Original steckt dahinter?',
    description: 'Lattafa-Düfte werden oft als günstige Alternativen zu teuren Originalen vermarktet. Wir klären, welche Lattafa-Parfums welchem Original ähneln und wo die Unterschiede liegen.',
    heroImage: '/images/ratgeber/lattafa-dupes.jpg',
    intro: [
      'Lattafa Perfumes aus Dubai hat sich in der Parfumwelt einen Namen gemacht, weil viele ihrer Produkte erstaunlich stark an bekannte Nischen- und Luxusparfums erinnern. In der Community werden diese Ähnlichkeiten offen diskutiert, und manche Düfte werden explizit als Alternativen zu Parfums von Baccarat, Kilian oder Xerjoff positioniert.',
      'Doch was bedeutet "Dupe" eigentlich? Ein Dupe ist keine Fälschung: Er verwendet denselben Duftcharakter oder ähnliche Inhaltsstoffe wie ein bekanntes Original, verkauft das Ergebnis aber unter eigenem Namen und zu einem Bruchteil des Preises. Qualitativ gibt es fast immer Unterschiede, aber wer primär das Duftprofil mag und nicht die Markengeschichte bezahlen will, findet hier oft echte Alternativen.',
      'Dieser Ratgeber listet die wichtigsten Lattafa-Düfte und deren Original-Bezüge, erklärt die Unterschiede ehrlich und hilft bei der Entscheidung, ob das Original oder die Alternative die richtige Wahl ist.',
    ],
    sections: [
      {
        heading: 'Lattafa Khamrah vs. Baccarat Rouge 540',
        body: [
          'Baccarat Rouge 540 von Maison Francis Kurkdjian ist eines der begehrtesten Parfums der Welt: jasminig, süss-karamellig mit einem charakteristischen Ambroxan-Holz-Moschus-Akkord. Ein 70ml-Flakon kostet um die 280 Franken.',
          'Lattafa Khamrah wird oft als Dupe für BR540 bezeichnet. Er ist deutlich süsser, mit Rum und Karamell eher in Richtung Gourmand, und hat nicht dieselbe mineralisch-jasminige Qualität. Aber das Grundprofil, warm, süss, orientalisch-westlich, ist ähnlich. Für 25 CHF ein sehr guter Einstieg, um zu sehen, ob man diesen Duftcharakter grundsätzlich mag.',
        ],
      },
      {
        heading: 'Lattafa Asad vs. Creed Viking',
        body: [
          'Creed Viking ist ein frisch-holziges Parfum mit Pfefferöffnung, grünen Noten und einem tiefen Holzfundament. 250ml kosten um die 350 CHF.',
          'Lattafa Asad hat ähnliche holzig-orientalische Noten mit Oud und Vetiver, ist aber weniger frisch und mehr geerdet-orientalisch. Die Ähnlichkeit ist vorhanden, aber Asad ist eigenständiger als es scheint: Er ist mehr Oud-Duft als frisches Holzparfum.',
        ],
      },
      {
        heading: 'Weitere Lattafa-Dupe-Bezüge',
        body: [
          'Lattafa Oud Mood wird oft mit Oud-Parfums von Maison Francis Kurkdjian oder Tom Ford verglichen. Die Ähnlichkeit ist weniger direkt, aber der Duftcharakter liegt nahe.',
          'Lattafa Raghba wird manchmal als Alternative zu Kilian Black Phantom genannt, ebenfalls süss und kaffeeartig, aber mit mehr orientaler Würze.',
        ],
      },
      {
        heading: 'Original oder Dupe: Was wählen?',
        body: [
          'Wenn das Duftprofil zählt und man bereit ist, auf Feinheiten zu verzichten: Ein Lattafa-Dupe macht absolut Sinn. Viele Leute können Lattafa Khamrah und Baccarat Rouge 540 in einem Blindtest nicht sicher unterscheiden.',
          'Wenn Qualität der Rohstoffe, Langlebigkeit und die Geschichte der Marke wichtig sind: Das Original ist eine andere Erfahrung. Auch die Sillage und die Art, wie sich ein Duft auf der Haut entwickelt, kann sich unterscheiden.',
          'Praktischer Tipp: Bestellen Sie beide als Abfüllungen bei Auressa und testen Sie selbst. So können Sie mit Fakten entscheiden, nicht mit Marketingversprechen.',
        ],
      },
    ],
  },
  {
    slug: 'parfum-fuer-junge-leute-unter-60-franken',
    title: 'Parfum für junge Leute & Einsteiger unter CHF 60',
    description:
      'Gut riechen muss nicht teuer sein: alltagstaugliche, beliebte Düfte unter CHF 60 für junge Leute und Einsteiger, frisch, süss und unkompliziert.',
    heroImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80&fit=crop',
    intro: [
      'Der erste eigene Duft soll gut riechen, vielseitig sein und nicht das halbe Taschengeld kosten. Zum Glück gibt es viele beliebte Düfte für kleines Geld. Gerade arabische Marken wie Lattafa oder Armaf bieten erstaunliche Qualität für 20 bis 40 CHF.',
      'Für junge Leute und Einsteiger gilt: lieber zu frisch und unkompliziert greifen als gleich zum teuren Nischenduft. Ein vielseitiger Duft, der in der Schule, an der Uni und im Ausgang passt, ist wertvoller als ein spezieller Duft, den man nur an bestimmten Abenden tragen kann.',
      'Hier unsere Favoriten unter CHF 60, unkompliziert, alltagstauglich und bei jungen Leuten besonders beliebt. Mit einer klaren Aufteilung nach Geschmack.'
    ],
    sections: [
      {
        heading: 'Die besten Einsteiger-Düfte unter 60 CHF',
        perfumes: [
          'lattafa-yara',
          'khamrah',
          'club-de-nuit-intense',
          'davidoff-cool-water',
          'sdj-cheirosa-62',
          'ariana-cloud',
          'joop-homme',
          'lattafa-mayar'
        ]
      },
      {
        heading: 'Für junge Frauen: süss, frisch und anziehend',
        body: [
          'Lattafa Yara ist ein echtes Geheimnis, das schon lange keines mehr ist: cremig-süss, blumig und für unter 30 CHF. Tolle Haltbarkeit und ein Duft, der Komplimente einheimst, ohne teuer zu sein.',
          'Sol de Janeiro Cheirosa 62 mit Pistazie und Karamell ist unter 50 CHF erhältlich und wirkt sonnig-verspielt. Ariana Grande Cloud geht in eine ähnlich cremig-süsse Richtung.',
          'Lattafa Mayar ist die frischere, dezentere Option für alle, die es in der Schule oder bei der Arbeit dezent halten wollen.'
        ]
      },
      {
        heading: 'Für junge Männer: frisch, selbstbewusst und günstig',
        body: [
          'Armaf Club de Nuit Intense Man ist die bekannteste günstige Alternative zu Creed Aventus: fruchtig, rauchig und sehr langlebig, für einen Bruchteil des Preises. Weit unter 40 CHF.',
          'Davidoff Cool Water ist der frische Klassiker, der nie falsch liegt. Aquatisch, sauber und vielseitig. Joop Homme ist ein süsserer, würziger Klassiker, der seit Jahrzehnten beliebt ist.',
          'Khamrah von Lattafa ist für alle, die es wärmer und kuscheliger mögen: würzig-süss mit Dattel und Vanille, sehr langlebig und zu einem kleinen Preis.'
        ]
      },
      {
        heading: 'Worauf du beim ersten Duft achten solltest',
        body: [
          'Wähle etwas Vielseitiges, das zu Schule, Uni und Freizeit passt. Frisch oder leicht süss kommt fast immer gut an.',
          'Achte auf die Haltbarkeit: Gerade arabische Marken wie Lattafa bieten erstaunlich lange Haltbarkeit fürs Geld.',
          'Sparsam dosieren: Ein bis zwei Sprühstösse reichen. Zu viel wirkt schnell aufdringlich, gerade in der Schule oder im Bus.',
          'Vor dem grossen Flakon lohnt sich eine kleine Abfüllung oder Probe, um Fehlkäufe zu vermeiden.'
        ]
      },
      {
        body: [
          'Unsicher, was zu dir passt? Mach unser Duft-Quiz. In unter einer Minute findest du deine Richtung, abgestimmt auf Geschmack und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'date-duefte-sommer',
    title: 'Date-Düfte im Sommer: frisch & anziehend',
    description:
      'Die besten Düfte fürs Sommer-Date: frisch genug für warme Tage, aber anziehend und in Erinnerung bleibend. Unsere Favoriten für Frauen und Männer.',
    heroImage: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80&fit=crop',
    intro: [
      'Beim Sommer-Date ist die Kunst, frisch zu riechen, ohne langweilig zu wirken: leicht genug für warme Abende, aber mit einem anziehenden, warmen Unterton. Ein klassischer Sommer-Duft hilft, aber er reicht oft nicht allein. Wer beim Date in Erinnerung bleiben will, braucht etwas mit Persönlichkeit.',
      'Die besten Date-Düfte für den Sommer kombinieren zwei scheinbar gegensätzliche Qualitäten: Sie sind frisch genug, um bei Hitze angenehm zu sein, aber warm und sinnlich genug, um nicht austauschbar zu wirken. Versace Eros oder Sol de Janeiro Cheirosa 62 sind gute Beispiele dafür.',
      'Beim Sommer-Date spielt auch Timing eine Rolle: Den Duft 20 bis 30 Minuten vor dem Date auftragen, damit die spritzigen Kopfnoten abgeklungen sind und der wärmere Kern hervorkommt. Das ist der Moment, in dem ein Duft am schönsten ist.'
    ],
    sections: [
      {
        heading: 'Für Frauen: frisch-fruchtig & anziehend',
        perfumes: ['lattafa-yara', 'ariana-cloud', 'sdj-cheirosa-62', 'narciso-for-her', 'ysl-mon-paris']
      },
      {
        heading: 'Für Männer: frisch mit Charakter',
        perfumes: ['versace-eros', 'ea-stronger-with-you', 'versace-dylan-blue', 'allure-homme-sport', 'prada-luna-rossa-ocean']
      },
      {
        heading: 'Warum diese Düfte beim Date gut ankommen',
        body: [
          'Warme Vanille-, Moschus- und Amber-Noten unter einer frischen Oberfläche signalisieren Nähe und wirken einladend.',
          'Düfte wie Versace Eros, Stronger with You oder YSL Mon Paris haben diesen süss-warmen Kern, der als anziehend wahrgenommen wird, ohne zu überwältigen.',
          'Narciso Rodriguez For Her bleibt sehr nah an der Haut, ein diskreter Moschus-Duft, der aus kurzer Distanz besonders schön wahrgenommen wird. Genau richtig für ein Date.'
        ]
      },
      {
        heading: 'Günstige Date-Düfte unter 50 CHF',
        body: [
          'Lattafa Yara ist für Frauen eine günstige und beliebte Option, kremig-süss und sehr langlebig.',
          'Für Männer ist Versace Dylan Blue (oft unter 60 CHF für kleine Flakons) oder Davidoff Cool Water eine frische, anziehende Wahl für warme Abende.',
          'Sol de Janeiro Cheirosa 62 ist unter 50 CHF erhältlich und ein echter Komplimente-Magnet.'
        ]
      },
      {
        heading: 'Tipps für den richtigen Date-Duft im Sommer',
        body: [
          'Setz auf frische Düfte mit warmem Kern. Sie wirken sauber und nahbar, bleiben aber anziehend in Erinnerung.',
          'Dezent dosieren: Komplimente erntet, wer aus der Nähe gut riecht, nicht wer den ganzen Raum überduftet. Ein bis zwei Sprühstösse genügen.',
          'Den Duft etwas vorher auftragen, damit sich die spritzige Kopfnote legt und der weichere Kern hervorkommt.',
          'Bei Hitze lieber leichter: Schwere, süsse Abenddüfte können beim Sommer-Date schnell aufdringlich wirken.'
        ]
      }
    ]
  },
  {
    slug: 'zara-parfum-dupes-welches-original',
    title: 'Zara Parfum Dupes: Welches Original steckt hinter den günstigen Düften?',
    description: 'Zara ist für seine günstigen Parfum-Dupes bekannt. Wir erklären, welche Zara-Düfte welchem Designer-Original ähneln und wie gut sie wirklich sind.',
    heroImage: '/images/ratgeber/zara-parfum-dupes.jpg',
    intro: [
      'Zara gehört zu den unerwarteten Stars der Parfumwelt. Der Moderiese aus Spanien verkauft seit Jahren Eigenmarken-Parfums für 10 bis 20 Franken, die bei Parfumfans für ehrliches Staunen sorgen. Einige dieser Düfte sind so nah an teuren Originalen, dass selbst geübte Nasen zweimal hinschnuppern.',
      'Wie ist das möglich? Zara lässt seine Parfums von denselben grossen Aromachemieunternehmen entwickeln, die auch für Chanel, Dior und Guerlain arbeiten. Bei kleinerem Budget und ohne Luxusmarketing kann man trotzdem auf solide Rohstoffe setzen, die dufttechnisch überzeugen.',
      'Natürlich gibt es Unterschiede: Die Haltbarkeit ist oft kürzer, die Komplexität geringer, und die Flakonqualität ist nicht vergleichbar. Aber als Einstieg, als Sommerduft oder als Layering-Basis sind Zara-Düfte unschlagbar im Preis-Leistungs-Verhältnis.',
    ],
    sections: [
      {
        heading: 'Zara Night Pour Femme vs. Chanel Coco Mademoiselle',
        body: [
          'Chanel Coco Mademoiselle ist ein moderner Klassiker: Patschuli, Rosen, Jasmin und Orangen in einem elegant-frischen Komposition. Ein 100ml-EDP kostet um die 150 CHF.',
          'Zara Night Pour Femme wird häufig als günstiger Zwilling genannt. Die Ähnlichkeit ist vorhanden, besonders im floralen Herz und dem puderigen Basischarakter. Für 15 CHF eine wirklich bemerkenswerte Alternative für den Alltag.',
        ],
      },
      {
        heading: 'Zara Gardenia vs. Maison Margiela Flower Market',
        body: [
          'Dieser Vergleich ist in der Community bekannt: Zara Gardenia teilt florale, cremige Noten mit dem Maison Margiela Replica-Duft. Beide sind frühlingshaft, weiss-blumig und unbeschwert.',
          'Der Unterschied liegt im Detail: Flower Market hat mehr Tiefe und einen langfristigeren Entwicklungsbogen. Aber für 15 CHF ist Gardenia kein Ersatz, sondern ein eigenständiger und schöner Duft.',
        ],
      },
      {
        heading: 'Zara Man vs. Dior Sauvage',
        body: [
          'Zara hat mehrere Herrendüfte, die im frischen, aquatisch-holzigen Segment spielen, wo Dior Sauvage dominiert. Die direkte Ähnlichkeit ist weniger treffend als bei den Frauendüften, aber Zara Emotion Seductive Elixir und ähnliche Produkte kommen dem Grundcharakter nahe.',
          'Für Männer, die Sauvage mögen, aber nicht 80 CHF ausgeben wollen, sind Zara-Alternativen einen Versuch wert, auch wenn sie nicht auf demselben Niveau liegen.',
        ],
      },
      {
        heading: 'Qualitätsunterschiede ehrlich bewertet',
        body: [
          'Zara-Parfums halten in der Regel 3 bis 5 Stunden. Originale halten länger. Die Sillage ist kleiner, die Projektion moderater. Das ist kein Fehler, sondern ein Kompromiss für den günstigen Preis.',
          'Als Tagesduft, als Layering-Basis oder als Einstieg in eine Duftkategorie sind Zara-Düfte hervorragend. Als Abendduft für wichtige Anlässe, wo Langlebigkeit und Impression zählen, greifen Sie besser zum Original oder zu einer Abfüllung davon bei Auressa.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-sommerduefte-maenner',
    title: 'Die besten Sommerdüfte für Männer: Frisch, leicht und hitzetauglich',
    description: 'Im Sommer braucht man Düfte, die frisch bleiben, nicht betäuben und gut zur Hitze passen. Die besten Sommerparfums für Männer von günstig bis Premium.',
    heroImage: '/images/ratgeber/sommerduefte-maenner.jpg',
    intro: [
      'Sommer stellt Männerparfums auf die Probe. Was in kühlen Monaten elegant wirkt, kann bei 30 Grad wie Desinfektionsmittel oder überheizte Parfumerie riechen. Gute Sommerdüfte für Männer sind leicht, frisch und trotzdem charaktervoll, sie verdunsten schnell genug, um nicht zu überwältigen, hinterlassen aber eine angenehme, dezente Spur.',
      'Die klassischen Sommerparfums für Männer setzen auf Zitrus, frische Kräuter, aquatische Noten und leichte Hölzer. Das Grundrezept ist seit Jahrzehnten bewährt: Bergamotte und Grapefruit im Auftakt, Lavendel oder Rosmarin im Herz, Zedern- oder Sandelholz in der Basis.',
      'Doch die Sommerdüfte der letzten Jahre sind facettenreicher geworden. Ozeanische Mineralität, mediterrane Kräutergärten und sogar subtile Würze haben Einzug gehalten. Dieser Ratgeber zeigt die schönsten Sommeroptionen für Männer, für jeden Stil und jedes Budget.',
    ],
    sections: [
      {
        heading: 'Klassiker des Sommers',
        body: [
          'Davidoff Cool Water ist und bleibt ein Sommer-Klassiker. Erschienen 1988, riecht er noch heute frisch, aquatisch und zeitlos. Für unter 30 CHF gibt es wenig Besseres in der Kategorie.',
          'Bleu de Chanel EDT startet aquatisch-zitrusbespritzt und trocknet zu einem sauberen, trockenen Holz. Ein universell geschätzter Duft, der zum Sonnenbaden am See ebenso passt wie zum Businesslunch.',
          'Acqua di Giò von Armani ist der meistgekaufte Herrenduft der letzten Jahrzehnte. Die Mischung aus Meeresfrische, Jasmin und Patchouli hat sich seit 1996 nicht wesentlich verändert und ist noch heute ein verlässlicher Sommergefährte.',
        ],
      },
      {
        heading: 'Moderne Sommerempfehlungen',
        body: [
          'Dior Sauvage EDT ist einer der wenigen modernen Blockbuster, der auch im Sommer trägt: frisch, pfeffrig, mit einer trocken-holzigen Basis. Er ist zwar überall, aber mit gutem Grund.',
          'Issey Miyake L\'Eau d\'Issey Pour Homme ist ein unterschätzter Sommerduft: Wassermelone, Yuzu und Bergamotte über einem kühlen Holz. Leicht, angenehm und unaufdringlich.',
          'Montblanc Explorer Ultra Blue ist eine moderne aquatisch-holzige Komposition mit erstaunlich guter Haltbarkeit für ein Sommerparfum. Gut für Männer, die nicht in den Mainstream wollen, aber trotzdem etwas Zugängliches suchen.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Davidoff Cool Water (30 CHF), Zara Applejuice Man (unter 15 CHF), Adidas Ice Dive (unter 20 CHF): allesamt valide Sommeroptionen, die niemanden überfordern und zuverlässig frisch riechen.',
          'Für etwas mehr Anspruch unter 50 CHF: Jil Sander Sun für Männer, Lacoste L\'Homme oder die kleineren Flakons von Azzaro Chrome. Alle funktionieren hervorragend im Sommer und sind vielseitig genug für verschiedene Anlässe.',
        ],
      },
    ],
  },
  {
    slug: 'parfum-trends-2026',
    title: 'Parfum-Trends 2026: diese Düfte sind jetzt angesagt',
    description:
      'Welche Duftrichtungen sind 2026 angesagt? Von gourmandigen Dessert-Düften über salzige Haut-Noten bis zum Aufstieg günstiger Nischen-Marken: die wichtigsten Trends.',
    heroImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&q=80&fit=crop',
    intro: [
      'Düfte folgen Trends wie Mode. Manche kommen über Social Media, vor allem TikTok, andere über neue Lieblingsnoten oder Marken, die plötzlich im Mainstream ankommen. Wer Düfte liebt, findet Trends inspirierend. Wer nicht, ignoriert sie einfach.',
      'Wichtig vorweg: Trend heisst nicht besser. Der schönste Duft ist immer der, der zu dir passt. Aber Trends sind eine gute Möglichkeit, Neues auszuprobieren und zu entdecken, was die Duft-Community gerade feiert.',
      'Hier die vier wichtigsten Parfum-Trends für 2026, mit konkreten Düften und ehrlicher Einschätzung.'
    ],
    sections: [
      {
        heading: '1. Gourmand bleibt König: jetzt als Dessert-Duft',
        body: [
          'Süsse, essbare Noten sind weiter extrem beliebt: Vanille, Karamell, Praline und neu vermehrt Pistazie, Schokolade und Dattel-Akkorde. TikTok hat Düfte wie Lattafa Khamrah, Sol de Janeiro und Ariana Grande Cloud zu echten Viral-Hits gemacht.',
          'Diese Düfte wirken kuschelig und nahbar, perfekt für Herbst und Winter. Wer es nicht zu süss mag, greift zu Varianten mit einer salzigen oder holzigen Kante, die den Gourmand-Charakter moderner macht.'
        ],
        perfumes: ['khamrah', 'sdj-cheirosa-62', 'ariana-cloud', 'kayali-vanilla-28']
      },
      {
        heading: '2. Salzige & Haut-Düfte (Skin Scents)',
        body: [
          'Leichte, salzig-warme Düfte, die riechen wie frisch geduschte Haut in der Sonne, liegen voll im Trend. Noten wie Ambroxan, weisser Moschus und ein Hauch Salz wirken sauber, modern und unaufdringlich.',
          'Ideal für alle, die einen Duft suchen, der nah an der Haut bleibt und nicht den ganzen Raum füllt. Jo Malone Wood Sage & Sea Salt und Narciso Rodriguez For Her sind gute Vertreter dieser Richtung.'
        ],
        perfumes: ['jo-malone-wood-sage-sea-salt', 'narciso-for-her', 'byredo-gypsy-water']
      },
      {
        heading: '3. Günstige Nischen- und Klon-Marken boomen',
        body: [
          'Marken wie Lattafa und Armaf haben gezeigt, dass guter Duft nicht teuer sein muss. 2026 greifen immer mehr Menschen bewusst zu günstigen Alternativen statt zum Designer-Original.',
          'Dupe-Kultur ist längst kein Geheimnis mehr. Ähnlich riechen für einen Bruchteil des Preises ist Mainstream geworden. Arabische Marken sind inzwischen bei Douglas und Notino.ch fest im Regal.'
        ],
        perfumes: ['khamrah', 'lattafa-asad', 'club-de-nuit-intense', 'lattafa-yara']
      },
      {
        heading: '4. Unisex statt strenger Schubladen',
        body: [
          'Die klare Trennung für ihn und für sie verschwimmt weiter. Viele der gefragtesten Düfte 2026 sind unisex, holzig-würzig, frisch oder gourmandig, ganz ohne Geschlechter-Etikett.',
          'Nischenhäuser wie Le Labo, Byredo und Maison Francis Kurkdjian treiben diesen Wandel aktiv voran. Immer mehr Menschen greifen bewusst zu Düften, die nicht für ihr Geschlecht gemacht wurden.'
        ],
        perfumes: ['le-labo-santal-33', 'baccarat-rouge-540', 'byredo-gypsy-water', 'nishane-hacivat']
      },
      {
        body: [
          'Neugierig, welcher Trend zu dir passt? Mach unser Duft-Quiz und entdecke deine Richtung. Wir zeigen dir passende Düfte aus jeder dieser Trend-Welten.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-im-handgepaeck-reise-tipps',
    title: 'Parfüm im Handgepäck: Was ist erlaubt? (Reise-Tipps)',
    description:
      'Flüssigkeiten im Handgepäck: Was gilt für Parfüm? Die 100-ml-Regel einfach erklärt, plus die besten kompakten Reisedüfte für unterwegs.',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80&fit=crop',
    intro: [
      'Du willst deinen Lieblingsduft auf Reisen mitnehmen? Dann gilt die EU-Flüssigkeitsregel auch für Parfüm: Alles über 100 ml muss ins aufgegebene Gepäck. Wer das nicht wusste und seinen 200-ml-Flakon im Handgepäck hatte, hat ihn beim Sicherheitscheck verloren. Das passiert öfter als man denkt.',
      'Die gute Nachricht: Mit etwas Vorbereitung ist das alles kein Problem. Viele Marken bieten 30- und 50-ml-Flakons an, Reisezerstäuber lassen sich befüllen und manche Düfte gibt es als feste Parfüm-Stifte ganz ohne Flüssigkeit. Hier alles, was du wissen musst.',
      'Wichtig: Die Regeln können sich ändern, und es gibt Unterschiede je nach Flughafen und Airline. Prüfe immer vorab die aktuellen Bestimmungen deiner Fluggesellschaft.'
    ],
    sections: [
      {
        heading: 'Die 100-ml-Regel: Was gilt für Parfüm?',
        body: [
          'Im Handgepäck dürfen Flüssigkeiten (auch Parfüm) nur in Behältern bis maximal 100 ml mitgenommen werden. Alle Behälter müssen zusammen in einen transparenten, wiederverschliessbaren Zip-Beutel passen (Fassungsvermögen 1 Liter, ein Beutel pro Person).',
          'Ein 200-ml-Flakon, der nur halbvoll ist, zählt als 200-ml-Behälter und ist nicht erlaubt. Massgeblich ist die Beschriftung des Behälters, nicht der Inhalt.',
          'Im aufgegebenen Gepäck gibt es keine Mengenbeschränkung. Dort darf auch der grosse Lieblingsflakon mit. Tipp: Den Flakon in einer Plastiktüte einpacken, damit bei Druckveränderungen kein Schaden entsteht.'
        ]
      },
      {
        heading: 'So nimmst du deinen Duft mit: die besten Lösungen',
        body: [
          'Reisezerstäuber (Atomizer): Leere Flakon-Füller aus dem Drogeriemarkt oder von Muji lassen sich mit deinem Duft befüllen. Platzsparend, regelkonform und ideal für kurze Reisen. Kosten meist unter 10 CHF.',
          'Kleine Originalflakons: Viele Marken verkaufen 30- und 50-ml-Grössen, die perfekt fürs Handgepäck sind. Notino.ch hat ein gutes Angebot an diesen kleinen Flakons.',
          'Duty-Free nach der Sicherheitskontrolle: Dort kannst du auch grössere Flakons kaufen, die du im Handgepäck mit in den Flieger nehmen darfst. Aber: Beim Umsteigen kann es zu Problemen kommen.'
        ]
      },
      {
        heading: 'Kompakte Reisedüfte aus unserem Katalog',
        perfumes: ['davidoff-cool-water', 'prada-luna-rossa-ocean', 'lattafa-mayar', 'ariana-cloud', 'allure-homme-sport']
      },
      {
        heading: 'Tipps für unterwegs',
        body: [
          'Feste Parfüms (Solid Perfume): Als Stift oder Tiegel gibt es Düfte ohne Flüssigkeit. Von der 100-ml-Regel sind sie nicht betroffen.',
          'Den Duft lieber auf die Haut als auf die Kleidung tragen: Im Flugzeug lüften sich Kleider kaum, auf der Haut ist der Duft zurückhaltender.',
          'Bei längeren Reisen lohnt ein kleiner Zerstäuber im Handgepäck und der grosse Flakon im Koffer.',
          'Reisegrössen kaufen oder umfüllen, bevor du eine Nacht im Hotel buchst. Niemand mag nach einem langen Flug unparfümiert ankommen.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-und-hauttyp-was-passt-zu-meiner-haut',
    title: 'Parfüm und Hauttyp: Wie deine Haut den Duft verändert',
    description:
      'Warum riecht dasselbe Parfüm bei dir anders als bei Freunden? Dein Hauttyp, pH-Wert und Pflegeroutine beeinflussen, wie ein Duft auf dir wirkt. Das steckt dahinter.',
    heroImage: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&q=80&fit=crop',
    intro: [
      'Ein und dasselbe Parfüm kann auf verschiedenen Menschen völlig unterschiedlich riechen. Das liegt nicht an Einbildung, sondern an echten chemischen Prozessen auf der Haut. Der Haut-pH, der Feuchtigkeitsgehalt und sogar die Körperwärme beeinflussen, wie sich Duftstoffe entfalten.',
      'Deshalb ist es wichtig, einen Duft immer auf der eigenen Haut zu testen, nicht nur auf einem Papierstreifen. Was auf dem Streifen wunderbar riecht, kann auf deiner Haut ganz anders wirken und andersherum.',
      'Hier die wichtigsten Faktoren, einfach erklärt, und was du daraus für die Duft-Wahl mitnehmen kannst.'
    ],
    sections: [
      {
        heading: 'Warum riecht Parfüm bei jedem anders?',
        body: [
          'pH-Wert der Haut: Jeder Mensch hat einen leicht unterschiedlichen Haut-pH. Saure Haut kann frische, zitrische Noten schneller verflüchtigen lassen; alkalischere Haut hebt sie hervor.',
          'Hautfeuchtigkeit: Trockene Haut hält Düfte kürzer. Gut eingecremte Haut bietet den Duftstoffen eine bessere Oberfläche. Der Duft hält länger und entfaltet sich voller.',
          'Körperwärme: Wärmere Körperzonen (Handgelenk, Hals) verstärken die Projektion eines Dufts. Die natürliche Körpertemperatur beeinflusst, welche Noten sich in den Vordergrund schieben.',
          'Ernährung & Hormone: In kleinerem Ausmass beeinflusst auch das, was du isst, sowie Hormonschwankungen, wie ein Duft auf deiner Haut riecht. Dieser Effekt ist aber wissenschaftlich schwer messbar und individuell sehr verschieden.'
        ]
      },
      {
        heading: 'Trockene Haut: so hält dein Duft länger',
        body: [
          'Trockene Haut ist der häufigste Grund, warum ein Duft nicht lange hält. Duftstoffe brauchen Feuchtigkeit, um sich zu verankern.',
          'Lösung: Trag vor dem Parfüm eine geruchsneutrale Bodylotion oder Vaseline auf die Pulspunkte auf. Das gibt dem Duft Halt und verlängert die Haltbarkeit oft um mehrere Stunden.',
          'Reichere, wärmere Düfte (Vanille, Holz, Moschus) halten tendenziell besser auf trockener Haut als sehr frische, zitrische Düfte.'
        ]
      },
      {
        heading: 'Fettige Haut: weniger auftragen',
        body: [
          'Fettige Haut hält Düfte in der Regel länger und verstärkt ihre Projektion. Das klingt gut, kann aber bedeuten, dass ein Duft sehr intensiv wirkt.',
          'Tipp: Weniger auftragen und lieber leichtere Konzentrationen (Eau de Toilette) wählen. Auf fettiger Haut wirkt ein Duft oft kräftiger als erwartet.'
        ]
      },
      {
        heading: 'Empfindliche Haut: sanfter testen',
        body: [
          'Auf Alkohol und bestimmte Aldehyde kann empfindliche Haut reagieren: Rötungen, Juckreiz oder ein Brennen sind mögliche Zeichen.',
          'Tipp: Neue Düfte zuerst an einer kleinen Stelle (z. B. Armbeuge) testen und einen Tag warten. Parfüm auf Kleidung statt direkt auf die Haut auftragen, wenn die Haut sehr empfindlich ist.',
          'Achte bei bekannten Allergenen gezielt auf die Inhaltsliste auf der Verpackung. Deklarationspflichtige Stoffe wie Linalool oder Limonene stehen dort aufgeführt.'
        ]
      },
      {
        heading: 'Die wichtigste Konsequenz: immer auf der eigenen Haut testen',
        body: [
          'Eine Duftbeschreibung, eine Rezension oder ein Papierstreifen sagt dir nur, wie ein Parfüm grundsätzlich riecht. Wie es sich auf deiner Haut entwickelt, das weisst du erst nach 20 bis 30 Minuten auf der Haut.',
          'Deshalb lohnen sich Proben: Viele Händler geben Proben mit, oder du kannst kleine Abfüllungen über Parfümerie-Websites kaufen. So vermeidest du teure Fehlkäufe.'
        ]
      }
    ]
  },
  {
    slug: 'vegane-tierversuchsfreie-parfums',
    title: 'Vegane & tierversuchsfreie Parfüms',
    description:
      'Welche Parfüms sind vegan und tierversuchsfrei? Was steckt hinter Begriffen wie „cruelty free" und welche Duftstoffe können tierischen Ursprungs sein. Klar erklärt.',
    heroImage: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&q=80&fit=crop',
    intro: [
      'Viele Parfümkäufer fragen sich: Stecken in Parfüms tierische Inhaltsstoffe? Werden sie an Tieren getestet? Die Antwort ist komplizierter als man denkt, und oft schwerer zu überprüfen als bei Kosmetik.',
      'Hier ein ehrlicher Überblick, was die Begriffe bedeuten und was du beim Kauf beachten kannst.'
    ],
    sections: [
      {
        heading: 'Tierische Inhaltsstoffe in Parfüms',
        body: [
          'Klassische Parfümerie nutzte früher Rohstoffe wie Moschus (aus Moschustieren), Ambra (aus Pottwalen), Zibet (aus der Zibetkatze) und Castoreum (aus Bibern). Heute sind die meisten davon in der EU verboten oder nicht mehr zeitgemäss.',
          'Echter tierischer Moschus ist in Europa verboten. Was wir heute als „Moschus" in Parfüms kennen, sind synthetische Muskusverbindungen, also keine echten Tierstoffe.',
          'Ambra (Ambergris) ist legal, sehr selten und teuer. In günstigen Massenparfüms ist es praktisch nie enthalten. Synthetische Alternativen (z. B. Ambroxan) sind heute der Standard.',
          'Andere mögliche tierische Inhaltsstoffe: Lanolin (Wollfett), Honig oder Bienenwachs. Diese stecken eher in Körperpflegeprodukten als in reinen Parfüms, können aber vorkommen.'
        ]
      },
      {
        heading: 'Tierversuche: „Cruelty Free" im Parfümbereich',
        body: [
          'In der EU sind Tierversuche für Kosmetik und deren Inhaltsstoffe verboten. Das bedeutet aber nicht, dass ein in der EU verkauftes Parfüm automatisch weltweit ohne Tierversuche hergestellt wird.',
          'Für den Verkauf in China waren bis vor kurzem Tierversuche teils Pflicht (für importierte Kosmetik). Das hat sich für einige Produktkategorien geändert, aber die Situation ist im Wandel.',
          'Zertifizierungen wie PETA „Beauty Without Bunnies" oder „Leaping Bunny" geben Orientierung, sind aber freiwillig. Nicht zertifiziert heisst nicht zwingend, dass Tierversuche stattfinden.',
          'Die grossen Luxushäuser (Chanel, Dior, etc.) verkaufen in China und sind daher oft nicht „Leaping Bunny"-zertifiziert, aber das muss nicht bedeuten, dass sie aktiv Tierversuche in Auftrag geben.'
        ]
      },
      {
        heading: 'Düfte mit veganer und cruelty-free Ausrichtung',
        body: [
          'Einige kleinere Nischenmarken setzen bewusst auf vegane Inhaltsstoffe und verzichten auf Tierversuche. Sie kommunizieren das oft explizit.',
          'Unser Tipp: Schreib den Hersteller direkt an, wenn dir das Thema wichtig ist. Die meisten grossen Marken haben einen Kundenservice, der Auskunft geben kann.',
          'Für eine zuverlässige, aktuelle Liste veganer Parfümmarken eignen sich spezialisierte Seiten wie PETA.org (Beauty Without Bunnies-Datenbank) oder Leaping Bunny: dort kannst du konkrete Marken und Produkte prüfen.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-proben-abfuellungen-schweiz',
    title: 'Parfum Proben und Abfüllungen in der Schweiz: So findet man den richtigen Duft',
    description: 'Parfum vor dem Kauf zu testen ist entscheidend. Abfüllungen und Proben ermöglichen es, Düfte wirklich kennenzulernen, bevor man den teuren Flakon kauft.',
    heroImage: '/images/ratgeber/parfum-proben-schweiz.jpg',
    intro: [
      'Parfum kaufen ohne vorheriges Testen ist ein Glücksspiel. Ein Duft im Laden, auf dem Papierstreifen oder beim ersten Sprühstoss auf der Haut zu beurteilen, reicht nicht. Ein Parfum entwickelt sich über Stunden, verändert sich durch die eigene Körperwärme und den Hautchemismus, und zeigt seinen wahren Charakter erst nach 30 Minuten oder mehr.',
      'Genau hier kommen Abfüllungen und Proben ins Spiel. Statt 150 CHF für einen unbekannten Duft auszugeben, kann man für 5 bis 15 CHF eine Abfüllung von 5 oder 10 ml kaufen, den Duft über Tage tragen, und erst dann entscheiden. Wer diesen Weg geht, trifft bessere Entscheidungen und spart langfristig Geld.',
      'In der Schweiz gibt es für diese Art des Parfumkaufens gute Angebote. Auressa wurde genau für diesen Ansatz entwickelt: Hochwertige Parfums in kleinen Abfüllungen, sodass man sich Zeit nehmen kann, den Duft wirklich kennenzulernen.',
    ],
    sections: [
      {
        heading: 'Was ist der Unterschied zwischen Probe und Abfüllung?',
        body: [
          'Eine Probe ist meist ein kleines Fläschchen von 1 bis 2 ml, das man für ein bis drei Trageversionen nutzen kann. Proben kommen oft direkt vom Parfumhaus als Marketing-Material oder werden von Händlern mitgegeben. Gut geeignet für den ersten Eindruck, aber nicht für ein wirkliches Kennenlernen eines Dufts.',
          'Eine Abfüllung ist eine grössere Menge, meist 5 bis 10 ml, die aus einem grossen Original-Flakon umgefüllt wurde. Sie erlaubt es, den Duft über Wochen in verschiedenen Situationen zu tragen: im Büro, am Wochenende, abends. So entsteht ein echtes Bild davon, ob man mit dem Duft über längere Zeit glücklich ist.',
        ],
      },
      {
        heading: 'Worauf man beim Kauf von Abfüllungen achten sollte',
        body: [
          'Qualität der Abfüllung: Das Original-Parfum muss korrekt gelagert worden sein, in einem Zerstäuber ohne Luftkontakt oder in einem abgedichteten Decant-Fläschchen. Abfüllungen, die zu lange in der Wärme oder im Licht standen, können sich verändern.',
          'Seriosität des Anbieters: Bei Auressa werden Abfüllungen aus verifizierten Original-Flakons hergestellt, nicht aus gefälschten oder unbekannten Quellen. Das ist ein wichtiger Qualitätsfaktor, der nicht selbstverständlich ist.',
          'Preis und Verhältnis: Eine 10ml-Abfüllung für 15 CHF eines Parfums, das als 100ml-Flakon 200 CHF kostet, ist fair gerechnet. Manche Anbieter verlangen überhöhte Preise für Abfüllungen, die das Kennenlernen teurer machen als nötig.',
        ],
      },
      {
        heading: 'So nutzt man Abfüllungen optimal',
        body: [
          'Tragen Sie eine Abfüllung mindestens drei bis fünf Mal, bevor Sie ein Urteil fällen. Beim ersten Tragen sind die Eindrücke oft noch beeinflusst von Erwartung und Kontext. Erst beim dritten oder vierten Tragen spürt man, ob man morgens gerne zu diesem Duft greift.',
          'Testen Sie in verschiedenen Situationen: An einem kalten Wintermorgen riecht dasselbe Parfum anders als an einem warmen Sommerabend. Ein Duft, der im Büro zu viel Aufmerksamkeit erregt, kann fürs Wochenende genau richtig sein.',
        ],
      },
    ],
  },
  {
    slug: 'die-besten-erdbeer-duefte',
    title: 'Die besten Erdbeer-Düfte: Fruchtig, süss und lebendig',
    description: 'Erdbeer-Noten in Parfums sind verspielte, frische Akzente oder süsse Herzstücke. Wir zeigen die schönsten Erdbeer-Düfte für alle, die fruchtigen Charme mögen.',
    heroImage: '/images/ratgeber/erdbeer-duefte.jpg',
    intro: [
      'Erdbeer-Düfte sind verspielt, sommerlich und zugänglich. Ob als zarte Kopfnote, die den ersten Eindruck prägt, oder als vollmundiges Herzstück einer fruchtigen Komposition: Erdbeere bringt Frische und Lebendigkeit in die Parfumwelt, ohne die Schwere von Vanille oder Amber.',
      'In der Parfumerie sind Erdbeernoten meist synthetisch: Die echte Frucht riecht in einem Flakon schnell nach Joghurt oder Bonbon, deshalb arbeiten Parfumeure mit Aromamolekülen, die den Eindruck einer frischen, saftig-reifen Erdbeere erzeugen, ohne ins Künstliche abzugleiten.',
      'Erdbeer-Düfte werden oft als jung und feminin vermarktet, aber das tut dieser vielseitigen Note unrecht. Richtig eingesetzt, kann Erdbeere in einem modernen Frucht-Chypre genauso elegant wirken wie in einem klassischen Blumenduft. Dieser Ratgeber zeigt die schönsten Vertreter.',
    ],
    sections: [
      {
        heading: 'Erdbeer-Düfte für Damen',
        body: [
          'Nina Ricci Nina ist ein ikonischer Erdbeer-Duft: apfelartig-fruchtig mit einem Hauch Rose und Moschus. Er riecht jugendlich, frisch und unbeschwert, ohne zu süss zu werden. Ein perfekter Frühlingsduft.',
          'Valentino Donna Born in Roma ist ein moderner, komplexerer Fruchtduft mit Erdbeer-Akzenten über einem warmen Iris-Holz-Fundament. Weniger offensichtlich erdbeerig, aber die fruchtige Frische ist klar spürbar.',
          'Lanvin Jeanne Lanvin ist ein zugänglicher Fruchtduft mit Erdbeer-Rhabarber-Herz, für Trägerinnen, die einen unbeschwerten Alltagsduft suchen ohne grossen Preis.',
        ],
      },
      {
        heading: 'Unisex und überraschende Erdbeer-Kombinationen',
        body: [
          'Manche Nischenhäuser verwenden Erdbeer-Noten auf überraschende Weise. Kombiniert mit Leder oder Pfeffer ergibt Erdbeere einen fruchtigen Chypre-Charakter, der weit entfernt ist vom typischen Jugendduftheft.',
          'Wer Erdbeer und Schokolade liebt: Einige Gourmand-Düfte verbinden beides zu üppigen, fast dessertartigen Kompositionen. Thierry Mugler Angel Muse zum Beispiel hat neben Haselnuss und Patchouli fruchtige Akzente, die in Richtung roter Beeren gehen.',
        ],
      },
      {
        heading: 'Günstige Optionen unter 50 CHF',
        body: [
          'Nina Ricci Nina ist in kleinen Flakons oft unter 40 CHF erhältlich und damit der günstigste Einstieg in einen klassischen, schönen Erdbeer-Duft.',
          'Im Supermarkt- und Drogeriesegment gibt es viele Fruchtdüfte mit Erdbeernoten. Oft als "Body Mist" oder "Splash" erhältlich, sind sie weniger langanhaltend, aber für entspannte Sommertage durchaus charming. H&M Beauty und The Body Shop bieten in diesem Segment gute Optionen unter 20 CHF.',
        ],
      },
    ],
  },

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

// Alle in einem Ratgeber verlinkten Duft-slugs (perfumes + pairings).
function guideDuftSlugs(guide: Guide): Set<string> {
  const set = new Set<string>();
  for (const section of guide.sections) {
    section.perfumes?.forEach((s) => set.add(s));
    section.pairings?.forEach((p) => {
      set.add(p.expensive);
      set.add(p.cheap);
    });
  }
  return set;
}

// Zu häufige Wörter im slug, die nicht für Verwandtschaft zählen sollen.
const RELATED_STOPWORDS = new Set([
  'die', 'der', 'das', 'und', 'zu', 'fuer', 'den', 'dem', 'ein', 'eine',
  'besten', 'parfum', 'parfums', 'duft', 'duefte', 'mit', 'im', 'am', 'auressa'
]);

function guideKeywords(guide: Guide): Set<string> {
  return new Set(
    guide.slug.split('-').filter((w) => w.length > 2 && !RELATED_STOPWORDS.has(w))
  );
}

// Verwandte Ratgeber für interne Verlinkung (gut für SEO und Verweildauer).
// Bewertung: Jaccard-Ähnlichkeit der verlinkten Düfte (so dominieren grosse
// Artikel mit vielen Düften nicht alles), gemeinsame slug-Stichwörter als
// zweites Signal; bei Gleichstand bleibt die Katalog-Reihenfolge erhalten.
export function relatedGuides(slug: string, count = 3): Guide[] {
  const current = getGuide(slug);
  if (!current) return [];
  const currentDuefte = guideDuftSlugs(current);
  const currentKeywords = guideKeywords(current);

  return guides
    .filter((g) => g.slug !== slug)
    .map((g, idx) => {
      const duefte = guideDuftSlugs(g);
      let shared = 0;
      for (const s of duefte) if (currentDuefte.has(s)) shared++;
      const union = currentDuefte.size + duefte.size - shared;
      const jaccard = union > 0 ? shared / union : 0;
      let sharedKeywords = 0;
      for (const w of guideKeywords(g)) if (currentKeywords.has(w)) sharedKeywords++;
      return { guide: g, jaccard, sharedKeywords, idx };
    })
    .sort(
      (a, b) =>
        b.jaccard - a.jaccard || b.sharedKeywords - a.sharedKeywords || a.idx - b.idx
    )
    .slice(0, count)
    .map((x) => x.guide);
}

// Kategorien für die Ratgeber-Übersicht (Gruppierung der Artikel).
// Reihenfolge der Kategorien und der slugs bestimmt die Anzeige.
// Artikel, die in keiner Kategorie stehen, landen automatisch unter „Weitere".
export type GuideCategory = { title: string; slugs: string[] };

export const guideCategories: GuideCategory[] = [
  {
    title: 'Nach Jahreszeit',
    slugs: [
      'die-besten-fruehlingsduefte',
      'die-besten-sommerduefte',
      'die-besten-sommerduefte-frauen',
      'die-besten-sommerduefte-maenner',
      'die-besten-herbstduefte',
      'die-besten-winterduefte'
    ]
  },
  {
    title: 'Nach Duftart',
    slugs: [
      'suesse-duefte-vanille-schokolade-karamell',
      'die-besten-vanille-duefte',
      'die-besten-erdbeer-duefte',
      'die-besten-oud-duefte',
      'die-besten-zitrus-duefte',
      'die-besten-holzigen-duefte',
      'die-besten-blumigen-duefte',
      'die-besten-frischen-aquatischen-duefte',
      'die-besten-moschus-pudrigen-duefte',
      'die-besten-unisex-duefte'
    ]
  },
  {
    title: 'Für Anlass & Typ',
    slugs: [
      'welcher-duft-zu-welchem-anlass',
      'die-besten-bueroduefte',
      'date-duefte-sommer',
      'die-besten-hochzeitsduefte-braut',
      'parfum-geschenk-die-besten-duefte-zum-verschenken',
      'maennerduefte-die-frauen-moegen',
      'damenduefte-die-maenner-lieben',
      'parfum-das-lange-haelt-beast-mode',
      'parfum-nach-sternzeichen'
    ]
  },
  {
    title: 'Günstig & Dupes',
    slugs: [
      'guenstige-alternativen-zu-teuren-dueften',
      'creed-aventus-guenstige-alternativen',
      'lattafa-dupes-welches-original',
      'zara-parfum-dupes-welches-original',
      'die-besten-duefte-unter-50-franken',
      'parfum-fuer-junge-leute-unter-60-franken'
    ]
  },
  {
    title: 'Marken & Besonderes',
    slugs: [
      'die-besten-lattafa-duefte',
      'die-besten-armaf-duefte',
      'die-besten-nischenduefte',
      'parfums-mit-schweizer-bezug'
    ]
  },
  {
    title: 'Wissen & Tipps',
    slugs: [
      'parfum-fuer-einsteiger-erster-signature-duft',
      'wie-lange-haelt-parfum-haltbarkeit',
      'edt-edp-parfum-unterschied',
      'parfum-inhaltsstoffe-allergene',
      'parfum-layering-duefte-kombinieren',
      'haeufige-parfum-fehler',
      'parfum-trends-2026',
      'parfum-und-hauttyp-was-passt-zu-meiner-haut',
      'vegane-tierversuchsfreie-parfums',
      'parfum-proben-abfuellungen-schweiz',
      'parfum-im-handgepaeck-reise-tipps'
    ]
  }
];
