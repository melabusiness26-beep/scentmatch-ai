// Ratgeber-Artikel (SEO-Content). Bewusst als Daten gepflegt, damit neue
// Artikel ohne Code-Kenntnisse ergänzt werden können. Jeder Abschnitt kann
// Fliesstext, Duft-Paare (teuer -> günstig) oder eine Duftliste enthalten.
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
  // Kürzerer Titel nur für Google (Titel über ~60 Zeichen werden abgeschnitten).
  seoTitle?: string;
  description: string;
  heroImage?: string;
  intro: string[];
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: 'guenstige-alternativen-zu-teuren-dueften',
    title: 'Parfüm-Dupes in der Schweiz: gute Alternativen zu teuren Düften',
    seoTitle: 'Parfüm-Dupes: gute Alternativen in der Schweiz',
    description: 'Ein Dupe riecht ähnlich wie ein teures Original und kostet viel weniger. Bekannte Paare ehrlich eingeordnet, plus Tipps, wie du Dupes richtig testest.',
    heroImage: '/ratgeber/illustrationen/guenstige-alternativen-zu-teuren-dueften.svg',
    intro: [
      'Ein Dupe ist ein Duft, der in eine ähnliche Richtung geht wie ein teures Original, aber nur einen Teil davon kostet. Er ist keine Fälschung: Er hat einen eigenen Namen, eine eigene Flasche und wird nicht als Original verkauft.',
      'Bekannt geworden sind Dupes vor allem durch Marken aus den Arabischen Emiraten wie Lattafa, Armaf und Al Haramain. Sie bringen viele Düfte heraus, die sich an bekannten Bestsellern orientieren, und verlangen dafür oft nur 20 bis 50 Franken.',
      'Ganz gleich riecht ein Dupe nie. Manchmal ist der Anfang fast gleich und der Duft wird später anders. Manchmal hält er kürzer, manchmal sogar länger. Darum findest du hier Paare, die von vielen Leuten als sehr ähnlich beschrieben werden, und ein paar Tipps, wie du selbst vergleichst.'
    ],
    sections: [
      {
        heading: 'Bekannte Paare: Original und günstige Alternative',
        body: [
          'Diese Paare werden in Duft-Datenbanken wie Parfumo und Fragrantica oft miteinander verglichen. Ähnlich heisst aber nicht gleich: Teste den günstigen Duft am besten, bevor du eine grosse Flasche kaufst.'
        ],
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Club de Nuit Intense Man von Armaf ist wohl die bekannteste Alternative zu Creed Aventus. Beide sind fruchtig und rauchig, mit Ananas und Birke. Club de Nuit startet etwas rauer und zitroniger, wird mit der Zeit aber weicher.'
          },
          {
            expensive: 'dior-sauvage',
            cheap: 'lattafa-asad',
            note: 'Lattafa Asad wird vor allem mit Sauvage Elixir verglichen, weniger mit dem normalen Sauvage. Er ist würzig und warm, mit schwarzem Pfeffer und Amber. Wer das frische Sauvage Eau de Toilette sucht, wird bei Asad eher nicht fündig.'
          },
          {
            expensive: 'kilian-angels-share',
            cheap: 'khamrah',
            note: 'Lattafa Khamrah wird oft mit Kilian Angels\' Share verglichen. Beide riechen nach Zimt, Dattel und Vanille und haben etwas Likörartiges. Khamrah ist süsser und hält meist sehr lange.'
          },
          {
            expensive: 'baccarat-rouge-540',
            cheap: 'lattafa-ana-abiyedh',
            note: 'Lattafa Ana Abiyedh Rouge gilt als eine der bekanntesten günstigen Alternativen zu Baccarat Rouge 540. Beide haben diesen luftigen, leicht zuckrigen Duft aus Amber, Holz und Safran. Ana Abiyedh Rouge ist etwas süsser, das Original wirkt feiner.'
          }
        ]
      },
      {
        heading: 'Ist ein Dupe eine Fälschung?',
        body: [
          'Nein. Eine Fälschung tut so, als wäre sie das Original, mit gleichem Namen und gleicher Flasche. Das ist verboten. Ein Dupe hat einen eigenen Namen und wird offen als eigener Duft verkauft.',
          'Warum ein Dupe so viel günstiger ist, hat mehrere Gründe. Grosse Marken bezahlen viel für Werbung, Lizenzen und Läden an den besten Adressen. Teure Nischenmarken nutzen teils seltene Rohstoffe. Dupe-Marken setzen eher auf bewährte Duftrichtungen und verkaufen viel über das Internet.',
          'Wenn dich jemand fragt, was du trägst, sag einfach den echten Namen. Du musst dich für einen Dupe nicht schämen.'
        ]
      },
      {
        heading: 'So testest du einen Dupe richtig',
        body: [
          'Sprüh ihn auf die Haut, nicht nur auf einen Papierstreifen. Auf der Haut entwickelt sich ein Duft anders.',
          'Urteile nicht nach dem ersten Sprühstoss. Viele Dupes riechen am Anfang fast wie das Original, nach ein bis zwei Stunden zeigen sich die Unterschiede. Trag den Duft einen ganzen Tag, bevor du entscheidest.',
          'Wenn du kannst, vergleiche beide gleichzeitig: links das Original, rechts der Dupe. So merkst du am schnellsten, wie nah sie sich wirklich sind.',
          'Achte auch auf Haltbarkeit und Ausstrahlung. Manche Dupes halten kürzer, einige halten sogar länger als das Original.'
        ]
      },
      {
        heading: 'Wo du Dupes in der Schweiz kaufst',
        body: [
          'Lattafa, Armaf und ähnliche Marken findest du in der Schweiz vor allem online, zum Beispiel bei Notino. Vergleiche Preis und Versandkosten, die Unterschiede sind manchmal gross.',
          'Kauf nur bei Shops, die du kennst. Auch günstige Marken werden gefälscht. Ein Preis, der viel tiefer ist als überall sonst, ist ein Warnzeichen.'
        ]
      },
      {
        heading: 'Dupes als günstiger Test',
        body: [
          'Ein Dupe ist auch ein guter Weg, eine Duftrichtung kennenzulernen. Du fragst dich, ob dir Aventus gefällt, willst aber nicht über 300 Franken ausgeben? Dann probier zuerst Club de Nuit Intense. Gefällt dir die Richtung, kannst du später immer noch das Original kaufen.',
          'Wenn du noch nicht weisst, welche Richtung zu dir passt, mach zuerst unser Duft-Quiz. Danach siehst du passende Düfte und, wo es sie gibt, auch günstige Alternativen.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-sommerduefte',
    title: 'Die besten Sommerdüfte: frisch und leicht durch heisse Tage',
    seoTitle: 'Die besten Sommerdüfte: frisch & leicht',
    description: 'Welche Düfte passen in den Sommer? Frische Klassiker, leichte Zitrus- und Meeresdüfte und Tipps, wie viel du bei Hitze sprühen solltest.',
    heroImage: '/ratgeber/sommerduefte-hero.jpg',
    intro: [
      'Bei 30 Grad wirkt ein schwerer Duft mit Oud oder viel Vanille schnell zu viel. Wärme verstärkt Düfte, und was im Winter schön ist, kann im Juli richtig aufdringlich werden.',
      'Ein guter Sommerduft ist deshalb leicht und frisch. Er sollte aber nicht nach einer Stunde weg sein. Die besten Sommerdüfte beginnen mit Zitrus, Bergamotte oder Meeresnoten und haben darunter etwas Holz oder Moschus, das den Duft länger hält.',
      'Hier findest du bekannte Klassiker, ein paar weniger bekannte Düfte und Tipps, wie du im Sommer richtig dosierst.'
    ],
    sections: [
      {
        heading: 'Sommerdüfte, die bei Hitze funktionieren',
        body: [
          'Viele Sommerklassiker wurden für Männer verkauft, werden aber auch von Frauen gern getragen. Frische ist nicht an ein Geschlecht gebunden. Alle diese Düfte bleiben auch an heissen Tagen angenehm.'
        ],
        perfumes: [
          'cool-water',
          'armani-acqua-di-gio-homme',
          'light-blue',
          'light-blue-pour-homme',
          'jo-malone-wood-sage-sea-salt',
          'orto-megamare',
          'versace-dylan-blue',
          'allure-homme-sport'
        ]
      },
      {
        heading: 'Welche Art Sommerduft passt zu dir?',
        body: [
          'Meeresdüfte wie Acqua di Giò oder Cool Water erinnern an Wasser, Salz und frische Luft. Sie sind leicht zu tragen und gefallen vielen. Dafür halten manche nicht sehr lange.',
          'Zitrusdüfte mit Bergamotte, Zitrone oder Grapefruit riechen sofort frisch. Reine Zitrusdüfte verfliegen aber schnell, oft nach ein bis zwei Stunden. Besser halten Zitrusdüfte mit einer holzigen oder grünen Basis.',
          'Grüne und frisch-holzige Düfte mit Tee, Zeder, Vetiver oder Kräutern sind etwas ruhiger. Sie wirken weniger hell als Meeresdüfte, haben aber mehr Charakter und halten oft länger.',
          'Wer es lieber weich mag, kann auch im Sommer einen leichten Moschusduft tragen. Er riecht sauber und hautnah und wird bei Hitze nicht schwer.'
        ]
      },
      {
        heading: 'Wie viel sprühen bei Hitze?',
        body: [
          'Bei Wärme verdunstet ein Duft schneller und riecht intensiver. Starte deshalb mit einem Sprühstoss, zum Beispiel am Hals oder an der Innenseite des Unterarms. Meistens reichen im Sommer ein bis zwei Sprühstösse.',
          'Dass Sommerdüfte kürzer halten als Winterdüfte, ist normal. Vier bis fünf Stunden sind für einen frischen Duft ein gutes Ergebnis. Ein Eau de Toilette ist im Sommer oft angenehmer als ein schweres Eau de Parfum.',
          'Praktisch ist ein kleiner Zerstäuber in der Tasche. Nach dem Mittag oder nach dem Baden sprühst du einfach noch einmal nach.'
        ]
      },
      {
        heading: 'Der passende Sommerduft für jede Situation',
        body: [
          'Im Alltag und beim Sport sind frische Meeres- und Zitrusdüfte am sichersten. Schwere, süsse Düfte vertragen sich schlecht mit Schweiss.',
          'Am Strand mischt sich dein Duft mit Sonnencreme und Salzwasser. Nimm etwas sehr Leichtes, oder lass den Duft ganz weg und sprüh ihn am Abend auf.',
          'Für ein Date am Abend darf es etwas wärmer sein: ein frischer Duft mit etwas Moschus, Blüten oder einem Hauch Vanille. Er sollte bleiben, aber nicht erdrücken.',
          'An einer Sommerhochzeit passt ein eleganter, frischer Duft mit Blüten oder grünen Noten. Lass schweres Amber und Oud für den Winter.'
        ]
      },
      {
        heading: 'Wann ist der Sommer vorbei?',
        body: [
          'Dafür gibt es kein festes Datum. Ist es im September noch warm, kannst du deinen Sommerduft weiter tragen. Werden die Abende kühler, wechselst du am Abend auf etwas Wärmeres und bleibst tagsüber beim frischen Duft. So machst du den Übergang ganz natürlich.'
        ]
      }
    ]
  },
  {
    slug: 'welcher-duft-zu-welchem-anlass',
    title: 'Welcher Duft passt wann? Büro, Date und Abend richtig wählen',
    seoTitle: 'Der richtige Duft für Büro, Date & Abend',
    description: 'Im Büro dezent, beim Date etwas wärmer, am Abend darf es mehr sein. So wählst du den passenden Duft für jeden Anlass und weisst, wie viele Sprühstösse genügen.',
    heroImage: '/ratgeber/welcher-duft-zu-welchem-anlass-hero.jpg',
    intro: [
      'Derselbe Duft wirkt nicht überall gleich. Im kleinen Sitzungszimmer fällt er viel stärker auf als draussen auf der Terrasse. Ein warmer, süsser Duft, der beim Abendessen schön ist, kann am Schreibtisch nebenan zu viel sein.',
      'Feste Regeln gibt es nicht. Es hilft aber, auf zwei Dinge zu achten: wie nah dir andere Leute kommen und wie warm der Raum ist. Danach richtest du Duftrichtung und Menge aus.',
      'Hier findest du für Büro, Date und Abend passende Duftrichtungen, Beispiele und eine einfache Faustregel fürs Dosieren.'
    ],
    sections: [
      {
        heading: 'Im Büro und im Alltag',
        body: [
          'Im Büro sitzen Leute nah beieinander, oft stundenlang. Dein Duft sollte da sein, aber niemanden stören. Gut passen frische, saubere und leicht holzige Düfte: Zitrus, Meeresnoten, grüne Noten, Zeder oder Sandelholz.',
          'Weniger geeignet sind schweres Amber, Oud und sehr süsse Düfte mit viel Vanille oder Karamell. Sie brauchen mehr Raum.',
          'Ein Sprühstoss am Hals oder am Unterarm reicht meistens. Am Nachmittag kannst du einmal nachsprühen. Im Grossraumbüro ist ein Eau de Toilette oft angenehmer als ein starkes Eau de Parfum.'
        ],
        perfumes: [
          'chanel-bleu-de-chanel',
          'terre-d-hermes',
          'boss-bottled',
          'ysl-y-edp',
          'le-labo-santal-33'
        ]
      },
      {
        heading: 'Beim Date',
        body: [
          'Beim Date kommt dir eine Person nah. Der Duft muss also nicht den ganzen Raum füllen. Er soll riechen, wenn man sich zur Begrüssung umarmt.',
          'Beliebt sind wärmere Düfte mit etwas Süsse, Blüten oder Gewürzen: Vanille, Tonka, Rose, Jasmin, Amber. Im Sommer reicht ein frischer Duft mit warmem Unterton.',
          'Zwei Sprühstösse genügen, einer am Hals und einer am Unterarm. Mehr ist beim Date selten besser. Und trag lieber etwas, worin du dich wohlfühlst, als einen Duft, der nicht zu dir passt.'
        ],
        perfumes: [
          'ysl-black-opium',
          'coco-mademoiselle',
          'lancome-la-vie-est-belle',
          'versace-eros',
          'mugler-angel'
        ]
      },
      {
        heading: 'Für besondere Abende',
        body: [
          'Am Abend darf ein Duft kräftiger, dunkler und süsser sein. Jetzt passen die Düfte, die tagsüber zu viel wären: Amber, Oud, Tabak, Vanille und warme Gewürze.',
          'Zwei bis drei Sprühstösse sind in Ordnung. In einem kleinen, vollen Restaurant reichen auch zwei.',
          'Gehst du direkt vom Büro weg, kannst du deinen Tagesduft einfach behalten. Willst du wechseln, sprüh den Abendduft auf andere Stellen als am Morgen, damit sich die beiden nicht zu stark mischen.'
        ],
        perfumes: [
          'club-de-nuit-intense',
          'khamrah',
          'mugler-angel',
          'tobacco-vanille',
          'lattafa-ana-abiyedh'
        ]
      },
      {
        heading: 'Faustregel fürs Dosieren',
        body: [
          'Büro: ein Sprühstoss, am Nachmittag eventuell einer mehr.',
          'Date: zwei Sprühstösse, Hals und Unterarm.',
          'Abend: zwei bis drei Sprühstösse, je nach Raum.',
          'Bei Hitze eher einen weniger, bei Kälte darf es einer mehr sein.',
          'Nach etwa einer Viertelstunde riechst du deinen eigenen Duft kaum noch. Die Leute um dich herum riechen ihn trotzdem. Sprüh deshalb nicht nach, nur weil du ihn selbst nicht mehr wahrnimmst.'
        ]
      }
    ]
  },
  {
    slug: 'suesse-duefte-vanille-schokolade-karamell',
    title: 'Süsse Düfte mit Vanille, Schokolade und Karamell',
    seoTitle: 'Süsse Düfte: Vanille, Schokolade & Karamell',
    description: 'Du magst Düfte, die nach Vanille, Karamell, Kaffee oder Schokolade riechen? Hier findest du beliebte süsse Düfte und Tipps, wie du sie auch im Alltag trägst.',
    heroImage: '/ratgeber/suesse-duefte-hero.jpg',
    intro: [
      'Süsse Düfte nennt man auch Gourmand-Düfte, vom französischen Wort für Feinschmecker. Sie riechen nach Dingen, die man essen könnte: Vanille, Karamell, Schokolade, Kaffee, Praliné oder Dattel.',
      'Bekannt geworden ist die Richtung 1992 mit Angel von Thierry Mugler. Heute gehören süsse Düfte zu den beliebtesten überhaupt.',
      'Ein guter süsser Duft ist nicht einfach nur Zucker. Oft macht ihn etwas Kontrastreiches spannend: Pfeffer zur Vanille, Tabak zur Schokolade, eine Prise Salz zum Karamell. Hier findest du beliebte Beispiele und Tipps, wann sie am besten passen.'
    ],
    sections: [
      {
        heading: 'Beliebte süsse Düfte',
        body: [
          'Diese Düfte zeigen, wie verschieden süss sein kann: cremig und weich, mit Kaffee, mit Gewürzen oder mit Lavendel.'
        ],
        perfumes: [
          'khamrah',
          'lattafa-yara',
          'montale-intense-cafe',
          'mugler-angel',
          'burberry-goddess',
          'ysl-black-opium',
          'kayali-vanilla-28',
          'tobacco-vanille'
        ]
      },
      {
        heading: 'Welche Süsse passt zu dir?',
        body: [
          'Vanille-Düfte sind der Klassiker. Sie riechen weich, warm und gemütlich. Ein gutes Beispiel ist Kayali Vanilla 28, süss, aber nicht nur Zucker.',
          'Kaffee und Schokolade bringen eine leicht bittere, dunkle Seite mit. Black Opium von YSL verbindet Kaffee mit Vanille und weissen Blüten, Montale Intense Café Kaffee mit Rose und Vanille.',
          'Süss und würzig wird es mit Zimt, Nelke oder Kardamom. Lattafa Khamrah riecht nach Dattel, Zimt und Vanille und wird oft mit Kilian Angels\' Share verglichen.',
          'Weich und cremig sind Düfte wie Lattafa Yara mit Vanille und Moschus. Burberry Goddess kombiniert Vanille mit Lavendel und wirkt dadurch frischer als viele andere süsse Düfte.'
        ]
      },
      {
        heading: 'Süsse Düfte im Sommer und im Winter',
        body: [
          'Im Herbst und Winter passen süsse Düfte am besten. In der Kälte wirken sie gemütlich und nicht zu schwer.',
          'Im Sommer kannst du sie auch tragen, aber sparsamer. Nimm einen Sprühstoss statt zwei, oder wähle eine leichtere, frischere Variante.',
          'Auf trockener Haut verfliegen Düfte schneller. Eine unparfümierte Bodylotion vor dem Sprühen hilft, dass der Duft länger hält.'
        ]
      },
      {
        heading: 'Süsse Düfte im Alltag und im Büro',
        body: [
          'Süsse Düfte haben meist viel Ausstrahlung und halten lange. Fang mit einem Sprühstoss an und schau nach einer Viertelstunde, wie stark er wirkt.',
          'Fürs Büro eignen sich süsse Düfte mit etwas Holz, Moschus oder Frische. Ein sehr schwerer Karamell- oder Schokoladenduft kann im geschlossenen Raum zu viel sein.',
          'Für den Abend oder ein Date darfst du zu deinem süssesten und wärmsten Duft greifen. Tobacco Vanille von Tom Ford oder Kilian Angels\' Share mit Cognac-Note passen gut zu einem festlichen Abend.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-winterduefte',
    title: 'Die besten Winterdüfte: warm, würzig und tief',
    seoTitle: 'Die besten Winterdüfte: warm & tief',
    description: 'Im Winter dürfen Düfte wärmer und kräftiger sein. Hier findest du Winterdüfte mit Amber, Vanille, Oud und Gewürzen und Tipps, wie sie in der Kälte gut wirken.',
    heroImage: '/ratgeber/winterduefte-hero.jpg',
    intro: [
      'Im Winter kannst du Düfte tragen, die im Sommer viel zu schwer wären. Amber, Vanille, Oud, Tabak und warme Gewürze wirken in der Kälte gemütlich und nicht erdrückend.',
      'Das hat einen einfachen Grund: Bei Kälte verdunstet ein Duft langsamer. Er wirkt draussen leiser, deshalb vertragen Winterdüfte etwas mehr Kraft. In geheizten Räumen riecht derselbe Duft dafür wieder stärker.',
      'Hier findest du beliebte Winterdüfte, von süss bis rauchig, und Tipps fürs Auftragen.'
    ],
    sections: [
      {
        heading: 'Beliebte Winterdüfte',
        body: [
          'Diese Düfte sind warm und halten bei vielen lange. Manche sind eher süss, andere rauchig und holzig.'
        ],
        perfumes: [
          'khamrah',
          'lattafa-oud-for-glory',
          'lattafa-ana-abiyedh',
          'mugler-angel',
          'tobacco-vanille',
          'kilian-angels-share',
          'lattafa-asad',
          'terre-d-hermes-parfum'
        ]
      },
      {
        heading: 'Welche Winterdüfte gibt es?',
        body: [
          'Düfte mit Weihrauch und Harzen riechen warm, leicht rauchig und ein bisschen nach Kirche oder Kaminfeuer. Sie passen gut zu ruhigen Abenden.',
          'Oud und dunkle Hölzer sind kräftig und oft rauchig oder ledrig. Sie fallen auf und halten lange. Fürs Büro sind sie meist zu stark.',
          'Würzige Düfte und Tabakdüfte mit Zimt, Nelke, Pfeffer oder Tabakblatt wirken warm und erwachsen.',
          'Süsse Winterdüfte mit Vanille, Karamell oder Tonkabohne sind am einfachsten zu tragen. In der Kälte wirken sie gemütlich.'
        ]
      },
      {
        heading: 'So trägst du Winterdüfte',
        body: [
          'Du brauchst im Winter nicht viel mehr Sprühstösse. Ein bis zwei Sprühstösse eines Eau de Parfum reichen meistens. Bei einem Parfum oder Extrait genügt oft schon einer.',
          'Sprüh auf warme Stellen wie den Hals oder die Innenseite der Unterarme. Ein Duft auf dem Schal hält ebenfalls lange. Teste aber vorher, ob er keine Flecken macht, gerade bei heller Wolle oder Seide.',
          'Heizungsluft trocknet die Haut aus, und auf trockener Haut verfliegt ein Duft schneller. Eine unparfümierte Creme vor dem Sprühen hilft.',
          'Denk daran: Draussen riechst du den Duft kaum, im warmen Restaurant ist er plötzlich deutlich da. Darum lieber nicht nachsprühen, bevor du hineingehst.'
        ]
      },
      {
        heading: 'Winterduft für Alltag, Abend und Fest',
        body: [
          'Im Büro passt ein warmer, aber ruhiger Duft, zum Beispiel etwas Holziges mit leichter Vanille oder Gewürzen. Oud und sehr süsse Düfte lieber für die Freizeit aufheben.',
          'Am Abend und beim Date darfst du zu deinem wärmsten Duft greifen. Amber, Vanille und Tabak passen gut zu einem Essen in der warmen Stube.',
          'An Weihnachten und an festlichen Anlässen sind opulente Düfte mit Weihrauch, Amber oder Oud passend. Zwei Sprühstösse reichen auch hier.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-unisex-duefte',
    title: 'Die besten Unisex-Düfte für alle',
    seoTitle: 'Die besten Unisex-Düfte für alle',
    description: 'Unisex-Düfte sind für alle gemacht. Bekannte Unisex-Düfte von Santal 33 bis Baccarat Rouge 540 und Tipps zum Testen und Teilen.',
    heroImage: '/ratgeber/unisex-duefte-hero.jpg',
    intro: [
      'Ob ein Duft für Damen oder Herren gedacht ist, entscheidet meist das Marketing. Am Ende zählt nur, ob er dir auf deiner Haut gefällt.',
      'Unisex-Düfte werden von Anfang an für alle gemacht. Viele Nischenmarken wie Le Labo, Byredo oder Maison Francis Kurkdjian verzichten fast ganz auf die Einteilung in Damen und Herren.',
      'Hier findest du bekannte Unisex-Düfte, frische und warme, und ein paar Tipps, worauf du achten kannst.'
    ],
    sections: [
      {
        heading: 'Bekannte Unisex-Düfte',
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
      },
      {
        heading: 'Was macht einen Unisex-Duft aus?',
        body: [
          'Unisex-Düfte halten sich meist nicht an die alten Muster. Früher galt: süss und blumig für Frauen, holzig und würzig für Männer. Unisex-Düfte liegen oft dazwischen, sind holzig, frisch, würzig oder leicht ambriert.',
          'Neutral heisst nicht langweilig. Baccarat Rouge 540 oder Santal 33 sind sehr eigenständig und leicht wiederzuerkennen.',
          'Ein praktischer Vorteil: Eine Flasche kann im Haushalt von mehreren Leuten benutzt werden.'
        ]
      },
      {
        heading: 'Tipps zum Testen',
        body: [
          'Lass dich nicht von der Abteilung im Laden leiten. Viele Herrendüfte riechen auch an Frauen schön und umgekehrt.',
          'Teste auf der eigenen Haut. Derselbe Duft kann bei dir holziger und bei jemand anderem blumiger riechen.',
          'Viele Nischendüfte sind kräftig. Starte mit einem Sprühstoss und schau, wie stark er wirkt.',
          'Unisex-Düfte lassen sich gut mit anderen Düften kombinieren, zum Beispiel ein holziger Unisex-Duft mit einem blumigen Duft darüber.'
        ]
      },
      {
        heading: 'Unisex-Düfte für jede Gelegenheit',
        body: [
          'Fürs Büro passen ruhige, holzige oder frische Unisex-Düfte. Für den Abend eignen sich kräftigere wie Baccarat Rouge 540 oder Tobacco Vanille.',
          'Im Sommer sind frische Düfte wie Gypsy Water oder Megamare angenehm, im Winter warme wie Tobacco Vanille oder Angels\' Share. Santal 33 kann man das ganze Jahr tragen.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-inhaltsstoffe-allergene',
    title: 'Parfum-Inhaltsstoffe und Allergene einfach erklärt',
    description: 'Was steckt in einem Parfum? Alkohol, Duftöl und Allergene wie Limonene und Linalool, einfach erklärt, mit Tipps für empfindliche Haut.',
    heroImage: '/ratgeber/illustrationen/parfum-inhaltsstoffe-allergene.svg',
    intro: [
      'Auf jeder Parfumpackung steht eine Liste mit Inhaltsstoffen, oft mit komplizierten Namen. Dahinter steckt aber nichts Geheimnisvolles. Hier erklären wir, was drin ist und worauf du bei empfindlicher Haut achten kannst.',
      'Die genaue Zusammensetzung ist bei jedem Duft anders und kann sich auch ändern. Was in deinem Duft steckt, steht immer auf der Packung.'
    ],
    sections: [
      {
        heading: 'Woraus besteht ein Parfum?',
        body: [
          'Ein Parfum besteht im Kern aus drei Teilen:',
          'Alkohol, auf der Liste meist „Alcohol Denat.“ oder „Alcohol“. Er verteilt den Duft und verdunstet schnell. Meistens ist er der grösste Bestandteil.',
          'Wasser, auf der Liste „Aqua“.',
          'Duftöl, auf der Liste „Parfum“ oder „Fragrance“. Das ist die eigentliche Duftmischung aus vielen einzelnen Riechstoffen.'
        ]
      },
      {
        heading: 'Warum steht nur „Parfum“ auf der Liste?',
        body: [
          'Die genaue Formel ist ein Betriebsgeheimnis. Deshalb dürfen die vielen Riechstoffe zusammen als „Parfum“ angegeben werden.',
          'Auf Auressa beschreiben wir Düfte deshalb mit Duftnoten wie Bergamotte, Vanille oder Sandelholz. Sie sagen dir mehr darüber, wie ein Duft riecht, als eine Liste mit chemischen Namen.'
        ]
      },
      {
        heading: 'Allergene wie Limonene und Linalool',
        body: [
          'Manche Duftstoffe können bei empfindlichen Menschen Hautreaktionen auslösen. Darum müssen sie ab einer bestimmten Menge einzeln auf der Packung stehen. In der Schweiz gelten dafür weitgehend dieselben Regeln wie in der EU.',
          'Lange waren es 26 solche Stoffe. Mit der EU-Verordnung 2023/1545 wurde die Liste auf über 80 Stoffe erweitert. Es gibt Übergangsfristen, deshalb siehst du in den nächsten Jahren alte und neue Packungen nebeneinander.',
          'Häufig sind zum Beispiel Limonene (in Zitrusschalen), Linalool (unter anderem in Lavendel), Citronellol und Geraniol (rosig), Eugenol (in Nelken), Coumarin (in Tonkabohnen, riecht nach Heu) und Citral (zitronig).',
          'Diese Stoffe sind nicht schlecht. Sie kommen in vielen Pflanzen und ätherischen Ölen vor. Sie stehen nur auf der Liste, damit Allergikerinnen und Allergiker sie erkennen.'
        ]
      },
      {
        heading: 'Tipps bei empfindlicher Haut',
        body: [
          'Sprüh den Duft auf die Kleidung statt auf gereizte Haut. Bei heller Kleidung und Seide vorher an einer versteckten Stelle testen.',
          'Teste einen neuen Duft zuerst an einer kleinen Stelle, zum Beispiel in der Armbeuge, und warte einen Tag.',
          'Weisst du, worauf du allergisch bist, such diesen Stoff gezielt in der Liste auf der Packung.',
          'Bei starken oder anhaltenden Reaktionen lass dich von einer Hautärztin oder einem Hautarzt beraten.'
        ]
      },
      {
        heading: 'EdT, EdP oder Parfum?',
        body: [
          'Der Unterschied liegt darin, wie viel Duftöl drin ist.',
          'Eau de Toilette (EdT) ist leichter und hält meist kürzer. Gut für den Sommer und tagsüber.',
          'Eau de Parfum (EdP) hat mehr Duftöl, wirkt intensiver und hält meist länger. Das ist heute die häufigste Variante.',
          'Parfum oder Extrait ist am stärksten konzentriert. Davon brauchst du nur wenig.',
          'Wenn du wissen willst, welche Duftrichtung zu dir passt, mach unser Duft-Quiz.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-duefte-unter-50-franken',
    title: 'Die besten Düfte unter 50 Franken',
    description: 'Gute Düfte für wenig Geld: unsere Favoriten unter 50 Franken, frisch bis süss, für Damen, Herren und Unisex. Plus Tipps, damit du keinen Fehlkauf machst.',
    heroImage: '/ratgeber/illustrationen/die-besten-duefte-unter-50-franken.svg',
    intro: [
      'Ein guter Duft muss keine 150 Franken kosten. Marken wie Lattafa, Armaf oder Davidoff haben Parfüms, die für ihren Preis erstaunlich gut sind. Manche halten länger als so mancher Designerduft.',
      'In der Schweiz findest du viele davon online, zum Beispiel bei Notino.ch. Die Preise schwanken je nach Shop und Aktion, ein Vergleich lohnt sich also fast immer.',
      'Das hier sind unsere Favoriten, die meist unter 50 Franken zu haben sind.'
    ],
    sections: [
      {
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
        heading: 'Darauf solltest du bei günstigen Düften achten',
        body: [
          'Günstig heisst nicht automatisch schlecht. Gerade Lattafa und Armaf sind oft kräftig und halten lange. Bei sehr billigen Düften kann es aber auch anders sein, darum lohnt sich ein Blick in die Bewertungen auf Parfumo oder Fragrantica.',
          'Sparsam sprühen. Viele dieser Düfte sind stark. Ein bis zwei Sprühstösse reichen meistens.',
          'Wenn es geht, zuerst eine Probe oder eine kleine Abfüllung testen. So merkst du, wie der Duft auf deiner Haut riecht, bevor du die grosse Flasche kaufst.'
        ]
      },
      {
        body: [
          'Viele dieser Düfte gehen in die Richtung bekannter teurer Parfüms. Welche das sind, liest du im Ratgeber „Günstige Alternativen zu teuren Parfüms".'
        ]
      }
    ]
  },
  {
    slug: 'wie-lange-haelt-parfum-haltbarkeit',
    title: 'Wie lange hält ein Parfum? Haltbarkeit und richtig auftragen',
    seoTitle: 'Wie lange hält ein Parfum? Tipps zur Haltbarkeit',
    description: 'So trägst du Parfum richtig auf, damit es länger hält. Warum Düfte verfliegen, welche lange halten und wie lange eine Flasche nach dem Öffnen gut bleibt.',
    heroImage: '/ratgeber/illustrationen/wie-lange-haelt-parfum-haltbarkeit.svg',
    intro: [
      'Wie lange ein Duft hält, hängt von zwei Dingen ab: wie du ihn aufträgst und welcher Duft es ist. Beides erklären wir hier ganz einfach.',
      'Zuerst geht es ums Auftragen, danach darum, warum Düfte verfliegen und wie lange eine Flasche überhaupt gut bleibt.'
    ],
    sections: [
      {
        heading: 'Wohin sprühen?',
        body: [
          'Am besten auf die warmen Stellen: Handgelenke, Hals, hinter die Ohren, Ellenbeugen. Die Haut ist dort wärmer, und Wärme hilft dem Duft, sich zu entfalten.',
          'Ein Sprühstoss auf Brust oder Dekolleté ist auch eine gute Idee. Der Duft steigt von dort nach oben und du riechst ihn länger.',
          'Auf Kleidung oder einem Schal hält ein Duft oft länger als auf der Haut. Aber Vorsicht bei Seide und hellen Stoffen, manche Düfte hinterlassen Flecken.'
        ]
      },
      {
        heading: 'Wie viele Sprühstösse?',
        body: [
          'Meistens reichen zwei bis vier. Leichte Düfte wie ein Eau de Toilette darfst du etwas grosszügiger sprühen, starke Eau de Parfums brauchen weniger.',
          'Nach kurzer Zeit riechst du deinen eigenen Duft kaum noch. Die Nase gewöhnt sich daran, andere riechen ihn aber noch. Wer dann nachsprüht, nimmt schnell zu viel.',
          'Bei Hitze wirkt ein Duft stärker. Im Sommer also lieber etwas weniger.'
        ]
      },
      {
        heading: 'Nicht die Handgelenke aneinander reiben',
        body: [
          'Das machen fast alle. Durch das Reiben wird die Haut warm, und die leichten Kopfnoten am Anfang verfliegen schneller. Der Duft riecht dann anders als gedacht.',
          'Besser: aufsprühen und einfach trocknen lassen.'
        ]
      },
      {
        heading: 'So hält dein Duft länger',
        body: [
          'Sprüh den Duft auf frisch eingecremte Haut. Auf trockener Haut verfliegt er schneller. Eine Bodylotion ohne eigenen Duft oder etwas Vaseline an den Sprühstellen hilft.',
          'Halte die Flasche etwa 15 bis 20 cm von der Haut weg, dann verteilt sich der Duft besser.',
          'Für unterwegs ist ein kleiner Reisezerstäuber praktisch. So kannst du am Nachmittag nachsprühen, ohne die grosse Flasche mitzunehmen.'
        ]
      },
      {
        heading: 'Warum verfliegt mein Parfum so schnell?',
        body: [
          'Meistens liegt es an trockener Haut, an einer leichten Konzentration wie Eau de Toilette oder schlicht daran, dass zu wenig aufgetragen wurde.',
          'Auch die Duftrichtung zählt. Frische Zitrusdüfte verfliegen von Natur aus schneller als warme, süsse oder holzige Düfte.',
          'Und manchmal riechst nur du ihn nicht mehr, weil sich deine Nase daran gewöhnt hat. Frag ruhig jemanden, ob man ihn noch riecht.'
        ]
      },
      {
        heading: 'Welche Düfte halten am längsten?',
        body: [
          'Als Faustregel halten warme, schwere Düfte länger als leichte, frische.',
          'Süsse Düfte mit Vanille, Karamell oder Tonkabohne und warme orientalische Düfte halten meistens lange.',
          'Holzige Düfte mit Sandelholz, Oud oder Patchouli auch.',
          'Blumige Düfte liegen meist in der Mitte.',
          'Frische Zitrusdüfte sind am schnellsten weg. Dafür sind sie im Sommer angenehm leicht. Ein zweiter Sprühstoss am Mittag hilft.'
        ]
      },
      {
        heading: 'Parfum richtig aufbewahren',
        body: [
          'Hitze, Licht und Luft schaden einem Duft am meisten.',
          'Bewahre ihn kühl und dunkel auf, zum Beispiel in einem Schrank. Das Fensterbrett ist der schlechteste Ort.',
          'Das Badezimmer ist auch nicht ideal, weil es dort ständig warm und feucht wird.',
          'Der Originalkarton schützt vor Licht. Und die Flasche immer gut verschliessen.'
        ]
      },
      {
        heading: 'Wie lange ist ein Parfum haltbar?',
        body: [
          'Ungeöffnet und kühl gelagert hält ein Parfum oft viele Jahre. Nach dem Öffnen riecht es meist ein paar Jahre lang gut, je nach Duft und Lagerung.',
          'Auf vielen Verpackungen siehst du ein kleines Symbol mit offenem Döschen und einer Zahl wie „12M" oder „36M". Das bedeutet: so viele Monate nach dem Öffnen gilt das Produkt als gut.',
          'So merkst du, dass ein Duft gekippt ist: Die Farbe ist viel dunkler geworden, er riecht am Anfang säuerlich oder nach Metall, oder er riecht nur noch flach nach Alkohol.'
        ]
      },
      {
        heading: 'Düfte, die bei vielen lange halten',
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
          'Fehlt dir noch der passende Duft? Im Duft-Quiz findest du in wenigen Minuten heraus, welche Richtung zu dir passt.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-geschenk-die-besten-duefte-zum-verschenken',
    title: 'Parfum als Geschenk: so findest du den richtigen Duft',
    seoTitle: 'Parfum als Geschenk: so findest du den Duft',
    description: 'Parfum verschenken ohne Fehlkauf: welche Klassiker fast immer gefallen, welche Fragen du dir vorher stellst und was tun, wenn du den Geschmack nicht kennst.',
    heroImage: '/ratgeber/parfum-geschenk-hero.jpg',
    intro: [
      'Ein Duft ist ein sehr persönliches Geschenk. Passt er, wird er oft getragen. Passt er nicht, steht er im Schrank.',
      'Wenn du unsicher bist, nimm einen bekannten Klassiker. Düfte von Chanel, Dior oder Lancôme gefallen vielen Menschen, weil sie nicht zu speziell sind. Ein Nischenduft ist eher etwas für jemanden, dessen Geschmack du gut kennst.',
      'Hier findest du Ideen und ein paar Fragen, die dir die Wahl leichter machen.'
    ],
    sections: [
      {
        heading: 'Für Frauen: Klassiker, die vielen gefallen',
        body: [
          'Diese Düfte sind beliebt, ohne zu speziell zu sein. Sie sind eine gute Wahl, wenn du den Geschmack nur ungefähr kennst.'
        ],
        perfumes: [
          'coco-mademoiselle',
          'lancome-la-vie-est-belle',
          'ysl-black-opium',
          'ch-good-girl'
        ]
      },
      {
        heading: 'Für Männer: Klassiker, die vielen gefallen',
        body: [
          'Diese Düfte passen ins Büro genauso wie zu einem Abendessen. Sie sind bekannt, angenehm und nicht zu laut.'
        ],
        perfumes: [
          'chanel-bleu-de-chanel',
          'le-male',
          'ea-stronger-with-you',
          'boss-bottled'
        ]
      },
      {
        heading: 'Drei Fragen vor dem Kauf',
        body: [
          'Was trägt die Person schon? Das ist der beste Hinweis. Schau, was im Bad steht, oder frag ganz nebenbei. Hat sie einen Lieblingsduft, kannst du genau den verschenken oder einen, der in dieselbe Richtung geht.',
          'Welche Jahreszeit kommt? Im Sommer passen frische, leichte Düfte besser, im Winter wärmere. So kann die Person das Geschenk gleich tragen.',
          'Wie viel willst du ausgeben? Bekannte Designerdüfte gibt es in allen Preisklassen, oft auch als kleinere Flasche. Teure Nischendüfte lohnen sich vor allem, wenn du den Geschmack wirklich kennst.'
        ]
      },
      {
        heading: 'Kleine Tipps, die viel ausmachen',
        body: [
          'Eau de Parfum hält meist länger als Eau de Toilette und wirkt als Geschenk etwas edler.',
          'Leg eine kurze Karte dazu und schreib, warum du an diesen Duft gedacht hast. Das macht das Geschenk persönlich.',
          'Wenn du gar keine Ahnung hast, ist ein Gutschein einer Parfümerie die sichere Wahl. Oder ein Discovery-Set mit mehreren kleinen Proben, das bieten viele Marken an.'
        ]
      },
      {
        heading: 'Für besondere Anlässe',
        body: [
          'Zum Jahrestag darfst du mutiger sein. Ein Duft aus ihrer Lieblingsrichtung, den sie noch nicht hat, ist ein schönes Geschenk.',
          'Wenn ihr euch noch nicht lange kennt, bleib bei einem bekannten Klassiker. Er sollte nicht zu intim wirken.',
          'Für jemanden, der gerade erst mit Düften anfängt, sind Sets mit kleinen Flakons ideal. So kann die Person in Ruhe ausprobieren.'
        ]
      }
    ]
  },
  {
    slug: 'maennerduefte-die-frauen-moegen',
    title: 'Männerdüfte, die Frauen mögen: Klassiker, die oft Komplimente bekommen',
    seoTitle: 'Männerdüfte, die Frauen mögen',
    description: 'Welche Herrendüfte kommen gut an? Bekannte Klassiker, die oft Komplimente bekommen, warum sie funktionieren und warum weniger Duft meistens mehr ist.',
    heroImage: '/ratgeber/illustrationen/maennerduefte-die-frauen-moegen.svg',
    intro: [
      'Manche Herrendüfte bekommen auffällig oft Komplimente. Meistens sind das nicht die lautesten, sondern die, die man in der Nähe angenehm riecht.',
      'Viele dieser Düfte verbinden etwas Frisches mit etwas Warmem. Frisch am Anfang, zum Beispiel Zitrus oder Pfeffer, und danach warm mit Vanille, Amber oder Tonkabohne. So wirken sie gepflegt, aber nicht aufdringlich.',
      'Eine Garantie gibt es nicht, Geschmack ist verschieden. Am wichtigsten ist, dass du dich mit dem Duft wohlfühlst.'
    ],
    sections: [
      {
        heading: 'Beliebte Klassiker',
        body: [
          'Diese Düfte gibt es schon länger und sie sind immer noch beliebt. Viele Menschen mögen sie, darum sind sie eine sichere Wahl.'
        ],
        perfumes: [
          'dior-sauvage',
          'le-male',
          'ea-stronger-with-you',
          'versace-eros',
          'ch-bad-boy',
          '1-million',
          'boss-the-scent',
          'dior-fahrenheit'
        ]
      },
      {
        heading: 'Warum diese Düfte gut ankommen',
        body: [
          'Sie fangen frisch an und werden dann wärmer. Dior Sauvage startet zum Beispiel mit Bergamotte und Pfeffer und wird danach weicher. Diese Mischung macht viele Düfte angenehm.',
          'Süsse kommt oft gut an, wenn sie nicht alleine steht. Versace Eros verbindet Minze und Vanille mit Tonkabohne, 1 Million kombiniert Zimt mit Leder und Amber. Dadurch wirken sie nicht wie ein Dessert.',
          'Und: Gut ist, wenn man den Duft in der Nähe riecht, nicht schon von Weitem.'
        ]
      },
      {
        heading: 'Weniger ist mehr',
        body: [
          'Viele Männer sprühen zu viel. In einem Raum oder im Auto wird das schnell zu stark.',
          'Ein bis zwei Sprühstösse reichen, zum Beispiel an den Hals oder auf die Brust. Wenn dich jemand riecht, der nahe bei dir steht, ist es genau richtig.'
        ]
      },
      {
        heading: 'Welcher passt zu dir?',
        body: [
          'Du magst es klassisch und unkompliziert: Dior Sauvage oder Boss Bottled. Beide passen ins Büro und zum Ausgang.',
          'Du magst es etwas eigener: Fahrenheit oder Le Male. Beide haben einen klaren Charakter, den man wiedererkennt.',
          'Du magst es warm und süsslich: Versace Eros oder 1 Million. Eher für den Abend.',
          'Du magst es modern und weich: Stronger With You von Armani, mit Kastanie und Vanille.'
        ]
      },
      {
        body: [
          'Der beste Duft ist der, in dem du dich gut fühlst. Im Duft-Quiz findest du heraus, welche Richtung zu dir passt.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-vanille-duefte',
    title: 'Die besten Vanille-Düfte: von cremig bis würzig',
    seoTitle: 'Die besten Vanille-Düfte',
    description: 'Vanille-Düfte von cremig und süss bis würzig mit Tabak oder Gewürzen. Welche Variante zu dir passt, wann du sie trägst und wie viel du sprühen solltest.',
    heroImage: '/ratgeber/vanille-duefte-hero.jpg',
    intro: [
      'Vanille riecht warm, weich und gemütlich. Darum ist sie eine der beliebtesten Duftnoten überhaupt.',
      'In den meisten Parfüms steckt nicht nur echte Vanille, sondern oft auch Vanillin, der Hauptaromastoff der Vanille, der künstlich hergestellt wird. Das ist ganz normal und riecht schön.',
      'Spannend wird Vanille durch das, was dazukommt. Mit Holz wird sie trockener, mit Gewürzen wärmer, mit Kaffee süsser und mit Blüten weicher. Hier findest du unsere Lieblinge.'
    ],
    sections: [
      {
        heading: 'Unsere liebsten Vanille-Düfte',
        body: [
          'Diese Auswahl zeigt die ganze Bandbreite: von sehr süss und cremig bis würzig und rauchig.'
        ],
        perfumes: [
          'tobacco-vanille',
          'kayali-vanilla-28',
          'khamrah',
          'mon-guerlain',
          'ariana-cloud',
          'burberry-goddess',
          'lattafa-yara',
          'jpg-la-belle'
        ]
      },
      {
        heading: 'Welche Vanille passt zu dir?',
        body: [
          'Cremige Vanille: riecht süss, weich und ein bisschen nach Dessert. Gut für alle, die es einfach und gemütlich mögen.',
          'Würzige Vanille: mit Tabak, Zimt oder Dattel. Wärmer und erwachsener. Tom Ford Tobacco Vanille und Lattafa Khamrah gehen in diese Richtung.',
          'Vanille mit Lavendel oder Blüten: weniger süss, eleganter. Mon Guerlain und Burberry Goddess verbinden Vanille mit Lavendel.',
          'Vanille mit Kaffee oder Schokolade: sehr süss, fast zum Essen. Eher für den Abend.'
        ]
      },
      {
        heading: 'Vanille im Sommer und im Winter',
        body: [
          'Am schönsten ist Vanille im Herbst und Winter. Dann darf sie auch süss und schwer sein.',
          'Im Sommer lieber eine leichtere Vanille wählen, zum Beispiel mit Zitrus oder Kokos. Und weniger sprühen, denn Hitze macht Düfte stärker.'
        ]
      },
      {
        heading: 'Richtig dosieren',
        body: [
          'Vanille ist meist kräftig und hält lange, weil sie zur Basis eines Dufts gehört. Ein bis zwei Sprühstösse reichen.',
          'Auf eingecremter Haut hält sie noch länger. Gerade im Winter, wenn die Heizungsluft die Haut austrocknet, hilft das.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-oud-duefte',
    title: 'Die besten Oud-Düfte: von leicht bis intensiv',
    seoTitle: 'Oud-Düfte: von Einsteiger bis Luxus',
    description: 'Was ist Oud, wie riecht es und welche Oud-Düfte eignen sich für den Einstieg? Unsere Auswahl von günstig bis teuer, mit Tipps zum Dosieren und Tragen.',
    heroImage: '/ratgeber/oud-duefte-hero.jpg',
    intro: [
      'Oud, auch Adlerholz oder Agarholz genannt, stammt von Aquilaria-Bäumen aus Süd- und Südostasien. Wird ein Baum von einem Pilz befallen, bildet er ein dunkles, duftendes Harz im Holz. Echtes Oud ist sehr selten und gehört zu den teuersten Rohstoffen der Parfümerie.',
      'Darum steckt in den meisten Parfüms kein echtes Oud, sondern ein nachgebauter Oud-Akkord aus anderen Duftstoffen. Das ist üblich und kann sehr gut riechen.',
      'Oud riecht holzig, warm, oft leicht rauchig und manchmal ein bisschen nach Leder. Hier findest du Düfte für den Einstieg und für Fortgeschrittene.'
    ],
    sections: [
      {
        heading: 'Unsere Auswahl',
        body: [
          'Von weich und süss bis kräftig und rauchig.'
        ],
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
        heading: 'Oud für den Einstieg',
        body: [
          'Reines Oud kann am Anfang streng wirken, manchmal fast medizinisch. Nach einer Weile wird es auf der Haut meist weicher. Gib dem Duft also etwas Zeit, bevor du entscheidest.',
          'Für den Anfang eignen sich Düfte, in denen Oud mit Rose, Safran, Vanille oder Amber kombiniert ist. Die machen ihn runder. Lattafa Badee Al Oud Amethyst ist so ein Beispiel. Tom Ford Oud Wood ist weich und holzig und wird oft als guter Einstieg empfohlen.',
          'Günstige Oud-Düfte, etwa von Lattafa, sind gut zum Ausprobieren. So merkst du, ob dir die Richtung überhaupt gefällt.'
        ]
      },
      {
        heading: 'Welcher Oud-Typ bist du?',
        body: [
          'Süss und warm, mit Vanille oder Tonka: der zugänglichste Oud. Montale Arabians Tonka geht in diese Richtung.',
          'Würzig, mit Tabak oder Zimt: kräftiger und dunkler. Zum Beispiel Mancera Red Tobacco.',
          'Mit Rose und Safran: der klassische orientalische Stil. Swiss Arabian Shaghaf Oud verbindet Oud mit Rose, Safran und Praliné.',
          'Kräftig und rauchig: für alle, die Oud schon kennen. Zum Beispiel Initio Oud for Greatness.'
        ]
      },
      {
        heading: 'Richtig dosieren und tragen',
        body: [
          'Oud ist stark. Ein Sprühstoss reicht oft, zwei sind schon viel. Im Büro oder in kleinen Räumen lieber nur einen.',
          'Am besten passt Oud in die kühle Jahreszeit und an den Abend. Im Sommer wirkt er schnell zu schwer.',
          'Lagere die Flasche kühl und dunkel, nicht im Badezimmer.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-zitrus-duefte',
    title: 'Die besten Zitrus-Düfte: frisch und spritzig',
    seoTitle: 'Die besten Zitrus-Düfte: frisch und spritzig',
    description: 'Zitrus-Düfte mit Bergamotte, Zitrone, Grapefruit und Orange: frisch, leicht und gute Laune. Ideal für Sommer und Büro, plus Tipps, damit sie länger halten.',
    heroImage: '/ratgeber/zitrus-duefte-hero.jpg',
    intro: [
      'Zitrusdüfte riechen sauber, leicht und fröhlich. Zitrone, Bergamotte, Grapefruit und Orange wirken sofort frisch, gerade an heissen Tagen.',
      'Zitrus hat eine lange Geschichte. Das berühmte Eau de Cologne, das Johann Maria Farina 1709 in Köln kreierte, war ein frischer Zitrusduft. Bis heute gehört Bergamotte zu den wichtigsten Noten in der Parfümerie.',
      'Der Nachteil: Zitrus verfliegt schnell. Gute Zitrusdüfte haben darum eine Basis aus Holz, Moschus oder Gewürzen, damit die Frische länger bleibt.'
    ],
    sections: [
      {
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
        heading: 'Zitrus für jede Gelegenheit',
        body: [
          'Fürs Büro: klare Düfte mit Bergamotte oder Zitrone. Sie wirken gepflegt und stören niemanden.',
          'Für heisse Tage: Grapefruit, Zitrone und Orange. Sie riechen leicht und erfrischend.',
          'Für den Abend: Zitrus mit Holz oder Gewürzen, zum Beispiel Vetiver, Zedernholz oder schwarzer Pfeffer. So wird der Duft tiefer.'
        ]
      },
      {
        heading: 'Darauf solltest du achten',
        body: [
          'Zitrusnoten verfliegen schneller als andere. Viele Zitrusdüfte halten darum kürzer. Ein zweiter Sprühstoss am Mittag hilft.',
          'Eine Basis aus Zedernholz, Vetiver oder Moschus macht den Duft langlebiger.',
          'Zitrusdüfte sind empfindlich gegen Licht und Wärme. Bewahre sie kühl und dunkel auf.'
        ]
      },
      {
        heading: 'Warum Zitrus fast immer passt',
        body: [
          'Zitrus gefällt sehr vielen Menschen und ist selten zu viel. Darum ist es eine gute Wahl für den ersten eigenen Duft oder als Geschenk, wenn du den Geschmack nicht genau kennst.'
        ]
      }
    ]
  },
  {
    slug: 'damenduefte-die-maenner-lieben',
    title: 'Damendüfte, die Männer mögen: die Kompliment-Klassiker',
    seoTitle: 'Damendüfte, die Männer mögen',
    description: 'Welche Damendüfte bekommen oft Komplimente von Männern? Die bekannten Klassiker mit Vanille, Blüten und Moschus, und was sie gemeinsam haben.',
    heroImage: '/ratgeber/illustrationen/damenduefte-die-maenner-lieben.svg',
    intro: [
      'Es gibt Damendüfte, die in Foren und Bewertungen immer wieder genannt werden, wenn es um Komplimente geht. Garantie ist das keine. Geschmack ist verschieden, und auf jeder Haut riecht ein Duft etwas anders. Aber ein paar Muster fallen auf.',
      'Viele dieser Düfte beginnen frisch oder fruchtig, werden dann blumig und enden warm mit Vanille, Moschus oder Amber. Sie sind gut wahrnehmbar, ohne den ganzen Raum zu füllen. Genau diese Mischung aus Nähe und Präsenz kommt bei vielen gut an.',
      'Hier sind die Düfte, die dabei am häufigsten fallen. Nimm sie als Orientierung, nicht als Rezept.'
    ],
    sections: [
      {
        heading: 'Die bekannten Kompliment-Düfte',
        body: [
          'Diese Düfte sind keine Neuheiten. Sie sind seit Jahren beliebt und werden oft genannt, wenn Frauen erzählen, auf welchen Duft sie angesprochen werden.'
        ],
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
        heading: 'Welche Noten oft gut ankommen',
        body: [
          'Vanille, Tonka und Karamell riechen warm und weich. Viele Menschen verbinden das mit etwas Vertrautem, darum sind süsse Düfte so beliebt.',
          'Rose und Jasmin wirken elegant, vor allem zusammen mit etwas Vanille oder Patchouli. Coco Mademoiselle ist ein gutes Beispiel dafür.',
          'Moschus und Amber riechen nach warmer, sauberer Haut. Solche Düfte wirken nah und unaufdringlich.',
          'Wichtiger als jede Note ist die Menge. Ein Duft, den man erst bei einer Umarmung richtig riecht, wirkt meist besser als einer, der dir zwei Meter vorausgeht.'
        ]
      },
      {
        heading: 'Das Wichtigste zum Schluss',
        body: [
          'Trag einen Duft, der dir selbst gefällt. Wenn du dich darin wohlfühlst, merkt man das. Ein Duft, den du nur für andere trägst, fühlt sich schnell fremd an.',
          'Bei kräftigen Düften wie Black Opium oder Good Girl reichen ein bis zwei Sprühstösse. Im Büro eher einer, am Abend darf es etwas mehr sein.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-nach-sternzeichen',
    title: 'Parfum nach Sternzeichen: welcher Duft passt zu dir?',
    seoTitle: 'Parfum nach Sternzeichen: welcher Duft passt?',
    description: 'Welcher Duft passt zu deinem Sternzeichen? Vom Widder bis zu den Fischen: pro Zeichen eine Duftrichtung und Beispiele, mit einem Augenzwinkern.',
    heroImage: '/ratgeber/illustrationen/parfum-nach-sternzeichen.svg',
    intro: [
      'Astrologie ist keine Wissenschaft. Aber sie kann ein lustiger Startpunkt sein, wenn du nicht weisst, wo du bei der Duftsuche anfangen sollst.',
      'Pro Sternzeichen findest du hier eine Duftrichtung und ein oder zwei Beispiele. Wo wir eine günstige Alternative nennen, wird sie auf Parfumo und anderen Seiten mit dem Original verglichen. Sonst sind es einfach zwei Düfte, die in eine ähnliche Stimmung passen.',
      'Wenn du es genauer willst: Unser Duft-Quiz findest du ganz unten.'
    ],
    sections: [
      {
        heading: 'Widder (21. März bis 20. April)',
        body: [
          'Widder gelten als mutig und voller Energie. Dazu passt ein würziger, warmer Duft mit Biss.',
          'Zwei Beispiele: Viktor&Rolf Spicebomb mit rosa Pfeffer, Zimt, Safran und Tabak, und Lattafa Asad mit schwarzem Pfeffer, Tabak und Vanille. Beide sind würzig, riechen aber nicht gleich.'
        ],
        perfumes: [
          'viktor-rolf-spicebomb',
          'lattafa-asad'
        ]
      },
      {
        heading: 'Stier (21. April bis 20. Mai)',
        body: [
          'Stiere geniessen gern und mögen es gemütlich. Ein warmer, süsser Duft passt gut.',
          'Zwei Beispiele: Tom Ford Tobacco Vanille mit Tabak, Vanille und Kakao, und Lattafa Khamrah mit Zimt, Datteln, Praliné und Vanille. Beide sind warm und süss, Khamrah ist fruchtiger.'
        ],
        perfumes: [
          'tobacco-vanille',
          'khamrah'
        ]
      },
      {
        heading: 'Zwillinge (21. Mai bis 21. Juni)',
        body: [
          'Zwillinge sind neugierig und mögen Abwechslung. Ein leichter, gut gelaunter Duft passt dazu.',
          'Wer es frisch mag, nimmt Dolce & Gabbana Light Blue mit Zitrone und Apfel. Wer es süsser mag, Lattafa Yara mit Orchidee, tropischen Früchten und Vanille. Das sind zwei ganz verschiedene Düfte.'
        ],
        perfumes: [
          'light-blue',
          'lattafa-yara'
        ]
      },
      {
        heading: 'Krebs (22. Juni bis 22. Juli)',
        body: [
          'Krebse gelten als gefühlvoll und mögen Geborgenheit. Weicher Moschus passt gut zu ihnen.',
          'Narciso Rodriguez For Her Eau de Parfum ist ein Moschus-Klassiker mit Rose und Pfirsich. Eine günstige Alternative, die oft mit ihm verglichen wird, ist La Rive Look of Woman. Sie ist leiser und hält etwas kürzer.'
        ],
        perfumes: [
          'narciso-rodriguez-for-her-eau-de-parfum',
          'la-rive-look-of-woman'
        ]
      },
      {
        heading: 'Löwe (23. Juli bis 23. August)',
        body: [
          'Löwen wollen gesehen werden. Ein Duft mit viel Ausstrahlung passt dazu.',
          'Maison Francis Kurkdjian Baccarat Rouge 540 riecht nach Safran, Jasmin und warmem Amberholz. Lattafa Ana Abiyedh Rouge wird auf Parfumo als ähnlich geführt und kostet nur einen kleinen Teil davon. Gleich riechen die beiden aber nicht.'
        ],
        perfumes: [
          'baccarat-rouge-540',
          'lattafa-ana-abiyedh'
        ]
      },
      {
        heading: 'Jungfrau (24. August bis 23. September)',
        body: [
          'Jungfrauen mögen es klar und natürlich. Ein sauberer, leichter Duft wirkt an ihnen gepflegt.',
          'Jo Malone Wood Sage & Sea Salt riecht nach Salbei, Meersalz und Ambrette, also nach einem Spaziergang am Meer. Er ist eher leise und eignet sich gut für jeden Tag.'
        ],
        perfumes: [
          'jo-malone-wood-sage-sea-salt'
        ]
      },
      {
        heading: 'Waage (24. September bis 23. Oktober)',
        body: [
          'Waagen mögen Harmonie und schöne Dinge. Ein ausgewogener Blumenduft passt gut.',
          'Chloé Eau de Parfum ist ein bekannter Rosenduft mit Pfingstrose und Litschi, frisch und hell. Er wirkt elegant, ohne schwer zu sein.'
        ],
        perfumes: [
          'chloe-edp'
        ]
      },
      {
        heading: 'Skorpion (24. Oktober bis 22. November)',
        body: [
          'Skorpione gelten als intensiv und geheimnisvoll. Dunkle, holzige Düfte mit Oud passen dazu.',
          'Zwei Beispiele: Tom Ford Oud Wood mit Oud, Rosenholz und Kardamom, eher weich und rund. Lattafa Oud for Glory mit Safran, Lavendel und Oud ist kräftiger. Beide gehen in die Oud-Richtung, riechen aber unterschiedlich.'
        ],
        perfumes: [
          'tom-ford-oud-wood',
          'lattafa-oud-for-glory'
        ]
      },
      {
        heading: 'Schütze (23. November bis 21. Dezember)',
        body: [
          'Schützen sind abenteuerlustig und warmherzig. Ein warmer, gemütlicher Duft passt in die kalte Jahreszeit.',
          'Maison Margiela Replica By the Fireplace riecht nach Kaminfeuer, Maronen und Vanille. Lattafa Badee al Oud Amethyst ist ebenfalls warm, aber mit Rose und Oud. Zwei verschiedene Düfte für kalte Abende.'
        ],
        perfumes: [
          'replica-fireplace',
          'lattafa-badee-amethyst'
        ]
      },
      {
        heading: 'Steinbock (22. Dezember bis 20. Januar)',
        body: [
          'Steinböcke gelten als ehrgeizig und klassisch. Ein edler, holziger Duft passt zu ihnen.',
          'Creed Aventus mit Ananas, Birke und Moschus ist ein bekannter Klassiker. Armaf Club de Nuit Intense Man wird seit Jahren als günstige Alternative genannt, auch auf Parfumo. Er beginnt zitroniger und rauchiger als das Original.'
        ],
        perfumes: [
          'creed-aventus',
          'club-de-nuit-intense'
        ]
      },
      {
        heading: 'Wassermann (21. Januar bis 19. Februar)',
        body: [
          'Wassermänner sind eigenständig und mögen das Unkonventionelle. Ein moderner, holziger Duft passt dazu.',
          'Le Labo Santal 33 riecht nach Sandelholz, Leder und Gewürzen und ist sofort wiedererkennbar. Mancera Cedrat Boisé ist ebenfalls holzig, aber mit viel frischer Zitrusnote am Anfang. Zwei Holzdüfte mit ganz eigenem Charakter.'
        ],
        perfumes: [
          'le-labo-santal-33',
          'mancera-cedrat-boise'
        ]
      },
      {
        heading: 'Fische (20. Februar bis 20. März)',
        body: [
          'Fische gelten als verträumt und sensibel. Ein frischer, weicher Duft passt gut.',
          'Giorgio Armani Acqua di Gioia riecht nach Minze, Zitrone und Wasser, mit etwas Jasmin. Leicht und klar, gut für warme Tage.'
        ],
        perfumes: [
          'armani-acqua-di-gioia'
        ]
      },
      {
        body: [
          'Sternzeichen sind eine nette Spielerei, mehr nicht. Welcher Duft dir gefällt, hängt von deinem Geschmack ab, nicht vom Geburtsdatum. Wenn du es genauer wissen willst, mach unser Duft-Quiz. Es fragt nach Duftrichtung, Anlass, Jahreszeit und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-fuer-einsteiger-erster-signature-duft',
    title: 'Parfum für Einsteiger: so findest du deinen ersten Signature-Duft',
    seoTitle: 'Parfum für Einsteiger: dein erster Signature-Duft',
    description: 'Neu bei Düften? So findest du Schritt für Schritt deinen ersten Lieblingsduft, ohne teure Fehlkäufe. Mit einfachen Tipps und sicheren Empfehlungen.',
    heroImage: '/ratgeber/illustrationen/parfum-fuer-einsteiger-erster-signature-duft.svg',
    intro: [
      'Vor dem Parfumregal kann man sich schnell verloren fühlen. Hunderte Flakons, fremde Begriffe, hohe Preise. Mit ein paar einfachen Schritten wird es viel leichter.',
      'Hier erklären wir dir, wie du deinen ersten Duft findest. Ohne Fachchinesisch.'
    ],
    sections: [
      {
        heading: 'Schritt 1: Finde deine Duftrichtung',
        body: [
          'Grob gibt es vier Richtungen: frisch (Zitrus, Meer, sauberer Moschus), süss (Vanille, Karamell, Amber), holzig (Sandelholz, Zeder, Leder, Oud) und blumig (Rose, Jasmin, Pfingstrose).',
          'Überleg dir, was dich spontan anspricht. Das ist dein Startpunkt. Unser Duft-Quiz hilft dir dabei.'
        ]
      },
      {
        heading: 'Schritt 2: Verstehe die Duftpyramide',
        body: [
          'Ein Parfum verändert sich auf der Haut. Darum spricht man von Kopf-, Herz- und Basisnoten.',
          'Die Kopfnoten riechst du direkt nach dem Aufsprühen. Sie verfliegen oft schon nach wenigen Minuten.',
          'Die Herznoten kommen danach und bilden den eigentlichen Charakter.',
          'Die Basisnoten bleiben am längsten, oft viele Stunden.',
          'Darum: Urteile nie nach der ersten Minute. Gib einem Duft mindestens eine halbe Stunde.'
        ]
      },
      {
        heading: 'Schritt 3: Richtig testen',
        body: [
          'Teste höchstens zwei bis drei Düfte auf einmal. Danach riecht die Nase nicht mehr viel.',
          'Sprüh den Duft auf die Haut, nicht nur auf einen Papierstreifen. Auf der Haut riecht er anders.',
          'Trag ihn einen halben Tag. Magst du ihn am Nachmittag noch? Dann ist er ein guter Kandidat.',
          'Kauf zuerst eine Probe oder kleine Abfüllung, bevor du einen grossen Flakon nimmst.'
        ]
      },
      {
        heading: 'Gute Düfte für den Anfang',
        body: [
          'Diese Düfte mögen viele Leute und sie passen zu vielen Gelegenheiten. Ein guter Startpunkt.'
        ],
        perfumes: [
          'dior-sauvage',
          'chanel-bleu-de-chanel',
          'light-blue',
          'armani-acqua-di-gioia',
          'jo-malone-wood-sage-sea-salt',
          'lattafa-yara'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-fruehlingsduefte',
    title: 'Die besten Frühlingsdüfte: grün, blumig und leicht',
    seoTitle: 'Die besten Frühlingsdüfte: grün & blumig',
    description: 'Leichte Frühlingsdüfte mit Blüten, grünen Noten und Zitrus. Unsere Lieblinge für Alltag, Büro und Date, plus Tipps zu Konzentration und Dosierung.',
    heroImage: '/ratgeber/die-besten-fruehlingsduefte.jpg',
    intro: [
      'Wenn es draussen wärmer wird, wirken schwere Winterdüfte schnell zu dick. Im Frühling passt etwas Leichteres: Blüten, grüne Noten, ein bisschen Zitrus.',
      'Ein guter Frühlingsduft ist frisch, hat aber trotzdem etwas Halt. Eine weiche Basis mit Moschus oder etwas Holz sorgt dafür, dass er nicht nach einer Stunde weg ist.',
      'Hier sind unsere Lieblinge, von zart bis fruchtig.'
    ],
    sections: [
      {
        heading: 'Unsere liebsten Frühlingsdüfte',
        body: [
          'Die meisten davon sind blumig oder fruchtig-blumig. Alle sind leicht genug für milde Tage.'
        ],
        perfumes: [
          'marc-jacobs-daisy',
          'chloe-edp',
          'gucci-bloom',
          'dior-miss-dior',
          'dkny-be-delicious',
          'armani-acqua-di-gioia',
          'lancome-idole'
        ]
      },
      {
        heading: 'Welche Richtung passt zu dir?',
        body: [
          'Zart-blumige Düfte riechen nach Pfingstrose, Magnolie oder Maiglöckchen. Sie wirken weich und romantisch.',
          'Grüne Düfte riechen nach frischen Blättern, Gras oder grünem Tee. Sie sind weniger süss und wirken klar.',
          'Zitrus mit Blüten ist die klassische Frühlingsmischung: oben frisch, darunter ein leichtes Blütenherz.',
          'Fruchtig-blumige Düfte bringen Apfel, Birne oder Pfirsich dazu. Sie wirken jung und fröhlich.'
        ]
      },
      {
        heading: 'Welcher Duft für welchen Moment?',
        body: [
          'Für Alltag und Büro passt ein zarter oder grüner Duft. Ein bis zwei Sprühstösse reichen.',
          'Für ein Date draussen darf es etwas fruchtiger sein. Sehr schwere, warme Düfte wirken an einem sonnigen Tag schnell zu viel.',
          'Für kühle Abende hilft ein Duft mit etwas Moschus oder Holz in der Basis. So trägst du ihn vom Tag in den Abend.'
        ]
      },
      {
        heading: 'Haltbarkeit und Kauf',
        body: [
          'Leichte Düfte halten meist weniger lang als schwere. Das ist normal. Ein kleiner Zerstäuber in der Tasche hilft beim Nachsprühen.',
          'Eau de Toilette ist im Frühling oft die angenehmste Wahl. Ein Eau de Parfum geht auch, vor allem wenn es noch kühl ist.',
          'Achte auf Noten wie Bergamotte, Zitrone, grüner Tee, Maiglöckchen, Pfingstrose oder Iris. Oud, Tabak und viel Vanille passen eher in Herbst und Winter.',
          'Teste immer zuerst auf der Haut, bevor du einen ganzen Flakon kaufst.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-bueroduefte',
    title: 'Die besten Bürodüfte: dezent und gepflegt',
    seoTitle: 'Die besten Bürodüfte: dezent & gepflegt',
    description: 'Welcher Duft passt ins Büro? Dezente, gepflegte Düfte, die man aus der Nähe riecht, ohne das ganze Team zu stören. Mit Tipps zur Dosierung.',
    heroImage: '/images/guides/bueroduefte-hero.jpg',
    intro: [
      'Im Büro teilst du die Luft mit vielen Leuten. Ein sehr süsser oder schwerer Duft kann da schnell stören, und manche Kolleginnen und Kollegen reagieren empfindlich auf starke Gerüche.',
      'Einen guten Büroduft riecht man erst, wenn jemand näher kommt. Zwei Meter weiter sollte er kaum noch auffallen. Das heisst nicht, dass er langweilig sein muss.',
      'Hier sind Düfte, die sich im Arbeitsalltag gut machen.'
    ],
    sections: [
      {
        heading: 'Unsere liebsten Bürodüfte',
        body: [
          'Frisch, holzig oder leicht blumig. Wichtig ist bei allen die Dosierung: Einige davon können mit zu vielen Sprühstössen auch laut werden.'
        ],
        perfumes: [
          'chanel-bleu-de-chanel',
          'ysl-y-edp',
          'boss-bottled',
          'le-labo-santal-33',
          'jo-malone-wood-sage-sea-salt',
          'coco-mademoiselle',
          'narciso-rodriguez-for-her',
          'dior-homme'
        ]
      },
      {
        heading: 'Welche Duftrichtungen gut funktionieren',
        body: [
          'Frische Düfte mit Zitrus oder Meeresnoten wirken sauber und stören selten.',
          'Holzige Düfte mit Zeder, Vetiver oder Sandelholz wirken ruhig und erwachsen.',
          'Leichte Blumendüfte, etwa mit Iris oder einer frischen Rose, wirken elegant, solange sie nicht zu süss sind.',
          'Saubere Moschus-Düfte riechen fast wie frisch gewaschene Haut. Für das Büro sind sie ideal.'
        ]
      },
      {
        heading: 'Was eher nicht ins Büro gehört',
        body: [
          'Sehr süsse Düfte mit viel Vanille, Karamell oder Schokolade. Zuhause im Winter schön, im Grossraumbüro oft zu viel.',
          'Schwere Oud- und Amberdüfte. Die passen besser zum Abend.',
          'Alles, was sehr stark ist. Du musst nicht nach Parfum riechen, um gepflegt zu wirken.'
        ]
      },
      {
        heading: 'So dosierst du richtig',
        body: [
          'Ein Sprühstoss reicht im Büro meist. Bei kräftigen Düften lieber nur einer.',
          'Auf der Kleidung wirkt ein Duft oft dezenter als direkt auf der Haut. Vorsicht bei heller Seide, manche Düfte hinterlassen Flecken.',
          'Wenn der Duft am Nachmittag nachlässt, reicht ein kleiner Sprühstoss. Nicht neu einnebeln.',
          'Im Sommer und im Grossraumbüro noch sparsamer sein. In einem eigenen Büro darfst du etwas mehr wagen.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-das-lange-haelt-beast-mode',
    title: 'Parfum, das lange hält: die stärksten Düfte („Beast Mode“)',
    seoTitle: 'Parfum, das lange hält: Beast-Mode-Düfte',
    description: 'Düfte, die bei vielen sehr lange halten und weit strahlen. Von süss bis holzig, plus Tipps, wie du so starke Düfte richtig dosierst.',
    heroImage: '/ratgeber/illustrationen/parfum-das-lange-haelt-beast-mode.svg',
    intro: [
      'In der Duft-Community heissen sehr starke Düfte „Beast Mode“. Gemeint sind Parfums, die auch nach vielen Stunden noch gut zu riechen sind, für dich und für andere.',
      'Wie lange ein Duft hält, hängt von der Konzentration ab, aber auch von den Inhaltsstoffen. Schwere Basisnoten wie Amber, Ambroxan, Moschus, Vanille oder Hölzer bleiben lange auf Haut und Kleidung. Und auch deine Haut spielt mit: Auf trockener Haut verfliegt ein Duft oft schneller.',
      'Die Düfte hier gelten in vielen Bewertungen als besonders ausdauernd. Bei ihnen gilt: lieber einen Sprühstoss zu wenig als zu viel.'
    ],
    sections: [
      {
        heading: 'Düfte mit viel Ausdauer',
        perfumes: [
          'lattafa-ana-abiyedh',
          'khamrah',
          'mugler-angel',
          'ysl-black-opium',
          'club-de-nuit-intense',
          'jpg-ultra-male',
          'lattafa-asad'
        ]
      },
      {
        heading: 'So dosierst du starke Düfte',
        body: [
          'Ein bis zwei Sprühstösse reichen meist, etwa auf die Brust und in den Nacken.',
          'In Innenräumen und im Sommer noch sparsamer sein. Diese Düfte füllen einen Raum schnell.',
          'Am schönsten sind sie an kühlen Tagen und am Abend.',
          'Wenn du es sanfter magst: einmal in die Luft sprühen und durch die Wolke gehen.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-hochzeitsduefte-braut',
    title: 'Hochzeitsdüfte: die schönsten Parfums für die Braut',
    description: 'Der Duft für deinen Hochzeitstag: elegante, romantische Parfums für die Braut, und wann und wie du deinen Duft am besten aussuchst.',
    heroImage: '/images/hochzeitsduefte-hero.jpg',
    intro: [
      'Gerüche bleiben stark in Erinnerung. Wenn du deinen Hochzeitsduft Jahre später wieder riechst, kommt der Tag oft sofort zurück. Darum lohnt es sich, ihn in Ruhe auszusuchen.',
      'Viele Bräute wählen etwas Zeitloses: einen eleganten Blumenduft, etwas Weiches, Pudriges oder Cremiges. Etwas, das du auch in zehn Jahren noch gern trägst.',
      'Hier sind unsere Lieblinge und ein paar Tipps für die Wahl.'
    ],
    sections: [
      {
        heading: 'Unsere liebsten Hochzeitsdüfte',
        perfumes: [
          'coco-mademoiselle',
          'chanel-no-5',
          'chloe-edp',
          'ysl-libre',
          'viktor-rolf-flowerbomb',
          'dior-miss-dior',
          'jo-malone-pear-freesia'
        ]
      },
      {
        heading: 'Tipps für die Wahl',
        body: [
          'Plane ein paar Wochen ein. Dann kannst du in Ruhe testen und dich entscheiden.',
          'Trag deine Favoriten an verschiedenen Tagen. So merkst du, ob du einen Duft wirklich den ganzen Tag magst.',
          'Denk an die Jahreszeit. Für eine Sommerhochzeit passt etwas Leichtes und Blumiges, für den Winter darf es wärmer sein.',
          'Lieber zeitlos als trendig. Ein Duft, der gerade überall ist, kann in ein paar Jahren alt wirken.',
          'Und nicht übertreiben. An deinem Hochzeitstag wirst du oft umarmt. Ein dezenter Duft ist da angenehmer als ein sehr starker.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-holzigen-duefte',
    title: 'Die besten holzigen Düfte: warm, edel und vielseitig',
    seoTitle: 'Die besten holzigen Düfte: edel & warm',
    description: 'Holzige Düfte mit Sandelholz, Zeder, Vetiver und Oud: warm, edel und langlebig. Von frisch bis dunkel, für Damen, Herren und Unisex.',
    heroImage: '/ratgeber/holzige-duefte-hero.jpg',
    intro: [
      'Holz ist in sehr vielen Parfums drin, oft in der Basis. Es gibt einem Duft Halt und Wärme. Ein holziger Duft wirkt meist ruhig und erwachsen.',
      'Holz ist aber nicht gleich Holz. Sandelholz riecht cremig und weich, Zeder trocken und klar, Vetiver erdig und leicht rauchig, Oud dunkel und kräftig. Je nachdem, was dazukommt, wirkt ein Holzduft frisch, würzig oder süss.',
      'Hier sind unsere Lieblinge, von leicht bis intensiv.'
    ],
    sections: [
      {
        heading: 'Unsere liebsten holzigen Düfte',
        perfumes: [
          'le-labo-santal-33',
          'viktor-rolf-spicebomb',
          'chanel-bleu-de-chanel',
          'lattafa-oud-for-glory',
          'byredo-gypsy-water',
          'club-de-nuit-intense',
          'dior-homme',
          'terre-d-hermes'
        ]
      },
      {
        heading: 'Die verschiedenen Hölzer',
        body: [
          'Sandelholz ist cremig, weich und leicht süsslich. Viele mögen es sofort, darum ist es ein guter Einstieg.',
          'Zedernholz ist trocken und klar. Es kommt oft in frischen Herrendüften vor und passt gut ins Büro.',
          'Vetiver ist erdig, grün und etwas rauchig. Ein Beispiel ist Terre d\'Hermès, das Vetiver mit Orange und Feuerstein-Noten verbindet.',
          'Oud ist dunkel und intensiv. Solche Düfte passen am besten zum Abend und in die kalte Jahreszeit.'
        ]
      },
      {
        heading: 'Gut zu wissen',
        body: [
          'Holznoten sitzen meist in der Basis. Darum halten holzige Düfte oft lange.',
          'Frische Holzdüfte mit Zitrus oder Vetiver passen gut in den Alltag. Dunkle, cremige Hölzer kommen am Abend und bei Kälte besser zur Geltung.',
          'Holz verträgt sich mit vielem. Gewürze machen es wärmer, Leder rauer, Vanille weicher.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-blumigen-duefte',
    title: 'Die besten blumigen Düfte: von zart bis opulent',
    seoTitle: 'Die besten blumigen Düfte: elegant & zeitlos',
    description: 'Blumige Düfte mit Rose, Jasmin, Pfingstrose und Orangenblüte. Von zart und frisch bis voll und sinnlich, mit Tipps, welche Blüte zu dir passt.',
    heroImage: '/ratgeber/blumige-duefte-hero-neu.jpg',
    intro: [
      'Blumendüfte sind die grösste Duftfamilie überhaupt. Rose, Jasmin, Pfingstrose, Orangenblüte: Diese Blüten stecken in unzähligen Parfums.',
      'Moderne Blumendüfte riechen selten nur nach einer Blume. Meist kommen Früchte, Moschus, Holz oder Vanille dazu. Dadurch wirken sie heute frisch und gar nicht altmodisch.',
      'Hier sind unsere Lieblinge, von zart bis klassisch.'
    ],
    sections: [
      {
        heading: 'Unsere liebsten blumigen Düfte',
        perfumes: [
          'coco-mademoiselle',
          'chloe-edp',
          'gucci-bloom',
          'ysl-libre',
          'dior-miss-dior',
          'chanel-no-5',
          'lancome-idole'
        ]
      },
      {
        heading: 'Welche Blüte passt zu dir?',
        body: [
          'Rose ist die vielseitigste Blüte. Sie kann klassisch wirken oder frisch und modern, je nachdem, womit sie kombiniert wird.',
          'Jasmin, Tuberose und Orangenblüte sind voll und sinnlich. Sie passen gut zum Abend und zur kühleren Jahreszeit.',
          'Pfingstrose und Maiglöckchen sind zart und frisch. Ideal für den Frühling und den Alltag.',
          'Iris und Veilchen sind pudrig und fein. Sie riechen weniger nach Blumenstrauss und eher elegant.'
        ]
      },
      {
        heading: 'Gut zu wissen',
        body: [
          'Ein leichter, grüner Blumenduft passt tagsüber. Ein voller, süsser Blumenduft wirkt am Abend schöner.',
          'Holz in der Basis macht einen Blumenduft erwachsener, Moschus macht ihn weicher.',
          'Echtes Rosen- und Jasminöl gehört zu den teuersten Rohstoffen in der Parfümerie. Darum werden sie in den meisten Parfums mit anderen Duftstoffen kombiniert.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-frischen-aquatischen-duefte',
    title: 'Die besten aquatischen Düfte: frisch wie Meeresluft',
    seoTitle: 'Die besten aquatischen Düfte: frisch und klar',
    description: 'Aquatische Düfte riechen nach Meer, Salz und frischer Luft. Was sie ausmacht, wann sie passen und welche wir mögen, für Damen, Herren und Unisex.',
    heroImage: '/ratgeber/aquatische-duefte-hero.jpg',
    intro: [
      'Aquatische Düfte riechen nach Wasser, Meeresluft und sauberer Haut. Bekannt wurden sie Ende der 1980er und in den 1990ern, etwa mit Davidoff Cool Water (1988) und L’Eau d’Issey von Issey Miyake (1992). Seither sind sie nie ganz verschwunden.',
      'Das „Meer“ in der Flasche ist natürlich ein Trick. Für die typische Wassernote sorgen synthetische Stoffe, der bekannteste heisst Calone. Er riecht leicht salzig und ein bisschen nach Melone. Mit Zitrus, Kräutern und etwas Holz entsteht daraus dieser klare, kühle Eindruck.',
      'Solche Düfte drängen sich nicht auf. Sie riechen gepflegt und frisch, und genau deshalb tragen so viele Leute sie im Sommer und im Büro.'
    ],
    sections: [
      {
        perfumes: [
          'cool-water',
          'cool-water-intense',
          'light-blue-pour-homme',
          'light-blue',
          'dior-sauvage',
          'davidoff-cool-water',
          'jo-malone-wood-sage-sea-salt',
          'prada-luna-rossa-ocean',
          'light-blue-homme',
          'armani-acqua-di-gioia',
          'creed-silver-mountain-water',
          'adp-colonia'
        ]
      },
      {
        heading: 'Welche Art Frische passt zu dir?',
        body: [
          'Aquatisch: riecht nach Wasser, Salz und Meeresluft. Klar und kühl, oft mit etwas Holz oder Moschus darunter.',
          'Zitrisch: Zitrone, Bergamotte, Grapefruit, Orange. Spritzig und hell, verfliegt aber am schnellsten. Gut am Morgen und an heissen Tagen.',
          'Grün und kräuterig: riecht nach Blättern, Gras und Kräutern. Natürlicher, fast ein bisschen nach Garten. Jo Malone Wood Sage & Sea Salt verbindet Salbei mit einer salzigen Note.',
          'Sauberer Moschus: die sogenannten Wäsche-Düfte. Sie riechen nach frisch gewaschener Haut und bleiben eher leise.'
        ]
      },
      {
        heading: 'Worauf du achten solltest',
        body: [
          'Frische Noten verfliegen schneller als schwere. Das ist normal. Wer den ganzen Tag etwas riechen will, sprüht am Mittag einmal nach.',
          'Schau dir die Basisnoten an. Steht dort Moschus, Zedernholz, Vetiver oder Ambroxan, hält der Duft meist länger.',
          'Ein bis zwei Sprühstösse auf Hals und Handgelenk reichen.'
        ]
      },
      {
        heading: 'Wann passen aquatische Düfte?',
        body: [
          'Im Sommer und bei Hitze. Schwere Düfte werden dann schnell zu viel, ein frischer Duft fühlt sich leichter an.',
          'Nach dem Sport und im Alltag. Sie riechen sauber und wach.',
          'Im Büro, wenn du sparsam sprühst. Kaum jemand fühlt sich von ihnen gestört.',
          'Im Winter wirken rein wässrige Düfte manchmal dünn. Dann lieber eine Version mit mehr Holz oder Moschus in der Basis nehmen, oft heisst sie „Intense“ oder „Eau de Parfum“.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-moschus-pudrigen-duefte',
    title: 'Die besten pudrigen Düfte und Moschus-Düfte',
    seoTitle: 'Die besten pudrigen Düfte und Moschus-Düfte',
    description: 'Pudrige Düfte und Moschus riechen weich, sauber und nah an der Haut. Was hinter Iris, Veilchen und Moschus steckt und welche Düfte wir mögen.',
    heroImage: '/ratgeber/pudrige-moschus-duefte-hero.jpg',
    intro: [
      'Pudrige Düfte und Moschus-Düfte sind leise. Sie riechen nach frisch geduschter Haut, nach Iris, Veilchen oder einem weichen Pullover. Man merkt sie vor allem aus der Nähe, zum Beispiel bei einer Umarmung.',
      'Pudrig wirken Noten wie Iris, Veilchen und Heliotrop. Moschus ist die weiche, saubere Basis, die in sehr vielen Parfums steckt. Zusammen ergibt das einen Duft, der gepflegt riecht und kaum jemanden stört.',
      'Altmodisch ist das nicht. Narciso Rodriguez zum Beispiel baut fast seine ganze Duftlinie um Moschus herum.'
    ],
    sections: [
      {
        perfumes: [
          'narciso-rodriguez-for-her',
          'narciso-rodriguez-for-her-eau-de-parfum',
          'narciso-for-her',
          'coco-mademoiselle',
          'chanel-no-5',
          'lancome-idole',
          'lattafa-mayar',
          'malle-musc-ravageur'
        ]
      },
      {
        heading: 'Pudrig oder Moschus, was ist der Unterschied?',
        body: [
          'Pudrig: weiche, leicht kosmetische Noten wie Iris, Veilchen, Heliotrop oder Tonka. Sie erinnern an Make-up oder Lippenstift. Echte Iris (Orris) gehört zu den teuersten Rohstoffen der Parfümerie.',
          'Moschus: riecht nach sauberer, warmer Haut. Heute ist er fast immer synthetisch. Er passt in Damen-, Herren- und Unisex-Düfte und macht einen Duft runder und weicher.',
          'Viele Düfte verbinden beides. Dann riecht es pudrig-weich und gleichzeitig frisch gewaschen.'
        ]
      },
      {
        heading: 'Worauf du achten solltest',
        body: [
          'Diese Düfte bleiben nah an der Haut. Das ist so gewollt und kein Zeichen von schlechter Qualität.',
          'Du riechst Moschus nach einer Weile vielleicht selbst kaum noch. Die Nase gewöhnt sich schnell an ihn, andere nehmen ihn aber oft noch wahr. Darum nicht gleich nachsprühen.',
          'Manche Menschen riechen bestimmte Moschus-Stoffe schlecht oder gar nicht. Wenn ein Duft bei dir „verschwindet“, kann das der Grund sein. Teste ihn an einer Freundin.',
          'Gib dem Duft Zeit. Nach einer Stunde riecht er oft anders als in den ersten Minuten.'
        ]
      },
      {
        heading: 'Wann passen sie?',
        body: [
          'Im Büro und im Alltag. Sie sind selten zu viel.',
          'Beim Date oder abends, wenn du jemandem nahe kommst.',
          'Das ganze Jahr. Im Sommer wirken sie leicht, im Winter warm.',
          'Zum Kombinieren. Ein Moschus-Duft unter einem anderen Parfum macht das Ganze weicher.'
        ]
      }
    ]
  },
  {
    slug: 'parfum-layering-duefte-kombinieren',
    title: 'Parfum-Layering: zwei Düfte richtig kombinieren',
    description: 'Beim Layering trägst du zwei Düfte übereinander. So klappt das Kombinieren, welche Noten gut zusammenpassen und was du besser lässt.',
    heroImage: '/ratgeber/illustrationen/parfum-layering-duefte-kombinieren.svg',
    intro: [
      'Layering heisst: Du trägst zwei Düfte übereinander. Daraus entsteht ein Duft, den so niemand sonst hat. Das klingt kompliziert, ist es aber nicht.',
      'Jo Malone London baut sogar ein ganzes Konzept darauf auf und nennt es „Fragrance Combining“. Du brauchst aber keine teure Sammlung. Oft reicht ein einfacher Body Mist oder ein Vanille-Duft als Grundlage.'
    ],
    sections: [
      {
        heading: 'Die Grundregeln',
        body: [
          'Kombiniere einen schlichten Duft mit einem, der mehr Charakter hat. Zum Beispiel Vanille oder Moschus mit etwas Holzigem oder Würzigem.',
          'Den schwereren Duft zuerst auftragen, den leichteren darüber.',
          'Zum Ausprobieren reicht ein Sprühstoss pro Duft. Lieber auf zwei Stellen verteilen als alles an denselben Punkt.',
          'Teste neue Kombinationen zuerst an einem freien Tag, nicht vor einem wichtigen Termin.'
        ]
      },
      {
        heading: 'Was gut zusammenpasst',
        body: [
          'Vanille und Holz: warm und gemütlich.',
          'Rose und Oud: dunkel und edel.',
          'Zitrus und Vanille: startet frisch, wird später weich.',
          'Moschus passt fast immer und macht andere Düfte runder.',
          'Was oft schiefgeht: zwei sehr laute Düfte übereinander. Dann kämpfen sie gegeneinander.'
        ]
      },
      {
        heading: 'Gut als Grundlage',
        body: [
          'Diese Düfte eignen sich gut als Basis zum Kombinieren:'
        ],
        perfumes: [
          'le-labo-santal-33',
          'khamrah',
          'lattafa-yara',
          'lattafa-ana-abiyedh'
        ]
      }
    ]
  },
  {
    slug: 'edt-edp-parfum-unterschied',
    title: 'EdT, EdP oder Parfum? Die Unterschiede einfach erklärt',
    seoTitle: 'EdT, EdP oder Parfum? Der Unterschied',
    description: 'Eau de Toilette, Eau de Parfum oder Extrait: Was die Kürzel bedeuten, was sie über Haltbarkeit sagen und welche Variante zu dir passt.',
    heroImage: '/ratgeber/illustrationen/edt-edp-parfum-unterschied.svg',
    intro: [
      'Auf jedem Flakon steht „EdT“, „EdP“ oder „Parfum“. Die Kürzel sagen, wie viel Duftöl im Alkohol gelöst ist. Davon hängt ab, wie stark ein Duft ist, wie lange er meist hält und wie viel er kostet.',
      'Mehr Duftöl heisst aber nicht automatisch besser. Ein leichtes Eau de Toilette ist im Sommer oft angenehmer als ein schweres Parfum.',
      'Wichtig zu wissen: Es gibt keine gesetzlich festgelegten Prozentwerte. Die Zahlen unten sind übliche Richtwerte, jede Marke handhabt das etwas anders.'
    ],
    sections: [
      {
        heading: 'Die Konzentrationen im Überblick',
        body: [
          'Eau de Cologne (EdC): sehr leicht und frisch, etwa 2 bis 5 Prozent Duftöl. Hält am kürzesten.',
          'Eau de Toilette (EdT): leicht, gut für Sommer und Tag, etwa 5 bis 15 Prozent.',
          'Eau de Parfum (EdP): kräftiger und meist langlebiger, etwa 15 bis 20 Prozent.',
          'Parfum oder Extrait: am stärksten konzentriert, etwa 20 bis 30 Prozent. Hier reicht oft schon wenig.'
        ]
      },
      {
        heading: 'Welche Variante passt zu dir?',
        body: [
          'Für Sommer, Büro und tagsüber: eher ein EdT.',
          'Für Herbst, Winter, Abende oder wenn du mehr Haltbarkeit willst: EdP oder Parfum.',
          'Achtung bei gleichen Namen: Das EdT und das EdP eines Dufts sind oft nicht einfach stärker oder schwächer, sondern riechen anders. Das EdT ist meist frischer, das EdP wärmer oder süsser. Deshalb lohnt es sich, beide zu testen.'
        ]
      }
    ]
  },
  {
    slug: 'haeufige-parfum-fehler',
    title: '5 häufige Parfum-Fehler und wie du sie vermeidest',
    seoTitle: '5 häufige Parfum-Fehler und wie du sie vermeidest',
    description: 'Verreiben, im Bad lagern, zu viel sprühen: Diese fünf Fehler machen fast alle. So vermeidest du sie und hast länger Freude an deinem Duft.',
    heroImage: '/ratgeber/illustrationen/haeufige-parfum-fehler.svg',
    intro: [
      'Beim Parfum machen fast alle ein paar kleine Fehler, einfach weil es einem nie jemand erklärt hat. Die gute Nachricht: Sie lassen sich leicht vermeiden.'
    ],
    sections: [
      {
        heading: '1. Die Handgelenke aneinander reiben',
        body: [
          'Durch das Reiben wird die Haut warm, und die ersten Noten verfliegen schneller. Einfach aufsprühen und trocknen lassen.'
        ]
      },
      {
        heading: '2. Parfum im Badezimmer lagern',
        body: [
          'Wärme, Licht und Feuchtigkeit tun einem Duft nicht gut. Er kann mit der Zeit kippen und anders riechen. Besser kühl und dunkel lagern, zum Beispiel im Schrank oder in der Originalschachtel.'
        ]
      },
      {
        heading: '3. Zu viel sprühen',
        body: [
          'Mehr ist nicht besser. Ein bis zwei Sprühstösse reichen meistens. Dass du deinen Duft nach einer Weile kaum noch riechst, liegt daran, dass sich deine Nase daran gewöhnt. Andere riechen ihn trotzdem.'
        ]
      },
      {
        heading: '4. Auf trockene Haut sprühen',
        body: [
          'Auf leicht eingecremter Haut hält ein Duft meist länger. Am besten eine Lotion ohne eigenen Duft nehmen.'
        ]
      },
      {
        heading: '5. Einen Duft nach einer Minute beurteilen',
        body: [
          'Die ersten Noten sind schnell weg. Lass den Duft 15 bis 30 Minuten auf der Haut, bevor du entscheidest. Am besten trägst du ihn einen halben Tag, bevor du ihn kaufst.'
        ]
      }
    ]
  },
  {
    slug: 'parfums-mit-schweizer-bezug',
    title: 'Düfte mit Schweizer Bezug',
    description: 'Chopard, Davidoff, Gisada: Diese Duftmarken haben Schweizer Wurzeln. Dazu, warum Genf in der Parfumwelt eine grosse Rolle spielt.',
    heroImage: '/ratgeber/illustrationen/parfums-mit-schweizer-bezug.svg',
    intro: [
      'Auressa kommt aus der Schweiz, und wir finden es schön, wenn ein Duft auch einen Bezug zu hier hat. Ein paar bekannte Marken haben Schweizer Wurzeln, vom Genfer Uhren- und Schmuckhaus bis zur jungen Zürcher Duftmarke.',
      'Und es gibt noch einen Bezug, den kaum jemand kennt: Zwei der grössten Duftfirmen der Welt, Givaudan und Firmenich (heute dsm-firmenich), kommen aus der Region Genf. Sie entwickeln Düfte für viele bekannte Parfumhäuser.'
    ],
    sections: [
      {
        perfumes: [
          'cool-water',
          'cool-water-intense',
          'gisada-ambassador',
          'gisada-ambassadora',
          'chopard-happy',
          'davidoff-cool-water',
          'davidoff-cool-water-woman'
        ]
      },
      {
        heading: 'Marken mit Schweizer Wurzeln',
        body: [
          'Chopard: 1860 im Berner Jura gegründet, heute mit Sitz in Genf. Bekannt für Uhren und Schmuck, aber auch für Düfte wie die Happy-Chopard-Linie.',
          'Davidoff: geht auf Zino Davidoff zurück, der in Genf ein Tabakgeschäft führte. Cool Water von 1988 ist einer der bekanntesten frischen Herrendüfte überhaupt.',
          'Gisada: eine junge Duftmarke, 2013 in Zürich gegründet. Bekannt sind vor allem Ambassador und Ambassadora.'
        ]
      },
      {
        heading: 'Gut zu wissen',
        body: [
          'Wir zeigen Preise in Schweizer Franken, damit du gleich weisst, woran du bist.',
          'Ein Duft mit Schweizer Bezug ist auch ein schönes Geschenk oder Mitbringsel.',
          'Dir ist die Marke eigentlich egal und du suchst einfach deinen Duft? Dann probier unser Quiz.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-lattafa-duefte',
    title: 'Die besten Lattafa-Düfte',
    description: 'Lattafa aus den Emiraten macht warme, kräftige Düfte zu kleinen Preisen. Welche Lattafa-Düfte sich lohnen und für wen sie passen.',
    heroImage: '/ratgeber/illustrationen/die-besten-lattafa-duefte.svg',
    intro: [
      'Lattafa kommt aus den Vereinigten Arabischen Emiraten und ist in den letzten Jahren vor allem über TikTok und Duft-Foren bekannt geworden. Die Düfte sind meist warm und kräftig und kosten deutlich weniger als Designer-Parfums.',
      'Viele Lattafa-Düfte werden mit teuren Originalen verglichen. Einige haben aber längst eigene Fans, die sie nicht als Ersatz tragen, sondern weil sie ihnen einfach gefallen.'
    ],
    sections: [
      {
        perfumes: [
          'khamrah',
          'lattafa-asad',
          'lattafa-yara',
          'lattafa-fakhar-men',
          'lattafa-oud-for-glory',
          'lattafa-ana-abiyedh',
          'lattafa-yara-tous',
          'lattafa-mayar'
        ]
      },
      {
        heading: 'Welcher Lattafa-Duft passt zu dir?',
        body: [
          'Süss und würzig: Khamrah mit Dattel, Zimt und Vanille. Gemütlich und eher für die kalte Jahreszeit.',
          'Würzig und warm: Asad. Er wird oft mit Dior Sauvage Elixir verglichen.',
          'Süss und cremig: Yara und Yara Tous, zwei sehr beliebte Damendüfte.',
          'Leichter und fruchtig-blumig: Mayar, wenn du es dezenter magst.'
        ]
      },
      {
        heading: 'Gut zu wissen',
        body: [
          'Viele Lattafa-Düfte sind kräftig. Fang mit einem oder zwei Sprühstössen an.',
          'Ähnlich heisst nicht gleich. Ein Vergleich mit einem Original beschreibt die Richtung, nicht einen identischen Duft.',
          'Mehr Spartipps findest du im Ratgeber zu günstigen Alternativen.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-armaf-duefte',
    title: 'Die besten Armaf-Düfte',
    description: 'Armaf aus Dubai ist vor allem für die Club-de-Nuit-Reihe bekannt. Welche Armaf-Düfte wir mögen und wie sie sich unterscheiden.',
    heroImage: '/ratgeber/illustrationen/die-besten-armaf-duefte.svg',
    intro: [
      'Armaf ist eine Duftmarke aus Dubai. Bekannt geworden ist sie mit der Club-de-Nuit-Reihe, allen voran Club de Nuit Intense Man. Der ist in Duft-Foren seit Jahren ein Begriff.',
      'Armaf orientiert sich bei vielen Düften hörbar an bekannten Originalen. Für den Preis bekommst du aber oft erstaunlich viel, und manche Düfte der Reihe gehen inzwischen eigene Wege.'
    ],
    sections: [
      {
        perfumes: [
          'club-de-nuit-intense',
          'armaf-cdn-sillage',
          'armaf-cdn-milestone',
          'armaf-cdn-untold',
          'armaf-club-de-nuit-woman',
          'armaf-vanity-femme'
        ]
      },
      {
        heading: 'Die Club-de-Nuit-Reihe',
        body: [
          'Intense Man: fruchtig mit Ananas, dazu rauchige Birke. Die bekannteste günstige Alternative zu Creed Aventus.',
          'Sillage: frischer, mit Zitrus und schwarzer Johannisbeere. Gut für wärmere Tage.',
          'Milestone: fruchtig und frisch mit einer meerigen Note.',
          'Untold: süss und warm, mit Safran und Amber.',
          'Club de Nuit Woman: die Damenversion der Reihe, blumig-fruchtig.'
        ]
      },
      {
        heading: 'Gut zu wissen',
        body: [
          'Viele Armaf-Düfte sind kräftig. Lieber mit wenig anfangen.',
          'Bei Intense Man gibt es verschiedene Chargen, und Fans streiten gerne darüber, welche besser riecht. Kleine Unterschiede sind normal.',
          'Du suchst gezielt günstige Alternativen? Dann schau in unseren Dupe-Ratgeber.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-herbstduefte',
    title: 'Die besten Herbstdüfte: warm, würzig und gemütlich',
    description: 'Wenn es kühler wird, passen würzige, holzige und leicht süsse Düfte. Welche Noten typisch für den Herbst sind und unsere Favoriten.',
    heroImage: '/ratgeber/herbstduefte-hero.jpg',
    intro: [
      'Wenn die Tage kürzer werden und morgens Nebel liegt, darf ein Duft wärmer werden. Würzige, holzige und leicht süsse Noten wirken jetzt gemütlich, sind aber noch nicht so schwer wie ein tiefer Winterduft.'
    ],
    sections: [
      {
        perfumes: [
          'boss-bottled-elixir',
          'khamrah',
          'montale-arabians-tonka',
          'ysl-la-nuit-de-lhomme',
          'lattafa-asad',
          'club-de-nuit-intense',
          'mancera-red-tobacco',
          'boss-bottled-night',
          'lattafa-yara'
        ]
      },
      {
        heading: 'Worauf du achten solltest',
        body: [
          'Typische Herbstnoten sind Zimt, Kardamom, Tabak, Tonkabohne, Leder und warmes Holz. In kühler Luft wirken sie runder als im Sommer.',
          'Jetzt lohnt sich ein Eau de Parfum wieder mehr. Es hält meist länger und hat mehr Tiefe. Ein bis zwei Sprühstösse reichen.',
          'Viele Herbstdüfte gehen auch im Winter. Wer nur einen Duft für die kalte Jahreszeit will, nimmt etwas Würzig-Holziges.'
        ]
      },
      {
        body: [
          'Du weisst nicht, welche Richtung dir steht? Mach unser Duft-Quiz. Es fragt nach Duftrichtung, Anlass, Jahreszeit und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-nischenduefte',
    title: 'Die besten Nischendüfte: besonders und eigenständig',
    description: 'Nischendüfte gehen eigene Wege abseits des Mainstreams. Was sie ausmacht, ob sich der Preis lohnt und welche Nischendüfte wir mögen.',
    heroImage: '/ratgeber/illustrationen/die-besten-nischenduefte.svg',
    intro: [
      'Nischendüfte kommen meist von kleineren Häusern, die nicht für den Massengeschmack arbeiten. Sie trauen sich mehr, riechen oft ungewöhnlicher und sind seltener auf der Strasse zu riechen.',
      'Nische sagt nichts über den Preis, sondern über den Ansatz. Bekannte Nischenmarken sind zum Beispiel Le Labo aus New York, Byredo aus Stockholm, Xerjoff aus Italien oder Nishane aus Istanbul. Teuer sind die meisten trotzdem.'
    ],
    sections: [
      {
        perfumes: [
          'le-labo-santal-33',
          'nishane-hacivat',
          'orto-megamare',
          'byredo-gypsy-water'
        ]
      },
      {
        heading: 'Was macht einen Nischenduft aus?',
        body: [
          'Hinter Nischendüften stehen meist kleinere, spezialisierte Häuser, die nur oder vor allem Parfum machen.',
          'Sie sind oft mutiger als Designer-Düfte und darum auch mal polarisierend. Manche liebst du sofort, andere gar nicht.',
          'Wie lange ein Nischenduft hält, ist sehr unterschiedlich. Ein hoher Preis ist keine Garantie.'
        ]
      },
      {
        heading: 'Lohnt sich der höhere Preis?',
        body: [
          'Nicht jeder Nischenduft ist besser als ein guter Designer-Duft. Am Ende zählt, ob er dir gefällt.',
          'Teste immer zuerst eine Probe oder kleine Abfüllung, bevor du einen grossen Flakon kaufst.',
          'Für manche Nischendüfte gibt es günstigere Düfte in ähnlicher Richtung. Mehr dazu im Ratgeber zu günstigen Alternativen.'
        ]
      }
    ]
  },
  {
    slug: 'die-besten-sommerduefte-frauen',
    title: 'Die besten Sommerdüfte für Frauen 2026',
    description: 'Leichte Damendüfte für heisse Tage: frisch, fruchtig oder blumig. Unsere Sommer-Favoriten für Frauen und Tipps, damit der Duft länger hält.',
    heroImage: '/ratgeber/sommerduefte-frauen-hero.jpg',
    intro: [
      'Im Sommer passen leichte Düfte am besten: Zitrus, frische Früchte oder helle Blüten. Schwere Vanille oder Oud wird bei 30 Grad schnell zu viel, vor allem im Tram oder im Büro.',
      'Ein guter Sommerduft startet frisch und hat darunter trotzdem etwas Halt, zum Beispiel Moschus oder helles Holz. Bei Hitze riecht jeder Duft stärker, darum hier lieber etwas weniger sprühen.'
    ],
    sections: [
      {
        perfumes: [
          'light-blue',
          'light-blue-eau-de-parfum',
          'dolce-gabbana-light-blue',
          'armani-acqua-di-gioia',
          'chloe-edp',
          'gucci-bloom',
          'marc-jacobs-daisy',
          'lancome-idole',
          'dkny-be-delicious',
          'dior-miss-dior'
        ]
      },
      {
        heading: 'Welche Richtung passt zu dir?',
        body: [
          'Frisch und spritzig: zitrische oder wässrige Düfte wie Light Blue oder Acqua di Gioia. Sie riechen sauber und passen gut ins Büro.',
          'Blumig: leichte Blütendüfte wie Chloé, Gucci Bloom, Lancôme Idole oder Miss Dior. Romantisch, aber nicht schwer.',
          'Fruchtig: fröhliche Düfte wie DKNY Be Delicious mit grünem Apfel oder Marc Jacobs Daisy.'
        ]
      },
      {
        heading: 'So hält dein Sommerduft länger',
        body: [
          'Frische Noten verfliegen schneller. Sprüh auf eingecremte Haut und nimm einen kleinen Zerstäuber für den Mittag mit.',
          'Auf Kleidung oder im Haar hält ein Duft oft länger als auf warmer Haut. Bei hellen Stoffen vorsichtig sein.',
          'Ein bis zwei Sprühstösse reichen. Bei Hitze wirkt jeder Duft kräftiger.'
        ]
      },
      {
        body: [
          'Du weisst nicht, was dir steht? Unser Duft-Quiz findet deinen Sommerduft, passend zu Duftrichtung, Anlass und Budget.'
        ]
      }
    ]
  },
  {
    slug: 'creed-aventus-guenstige-alternativen',
    title: 'Creed Aventus: günstige Alternativen, die in dieselbe Richtung gehen',
    seoTitle: 'Creed Aventus: günstige Alternativen',
    description: 'Aventus ist toll, aber teuer. Diese günstigeren Düfte gehen in dieselbe fruchtig-rauchige Richtung. Was sie können und wo die Unterschiede liegen.',
    intro: [
      'Creed Aventus kam 2010 auf den Markt und ist seither einer der bekanntesten Herrendüfte überhaupt. Ananas, rauchige Birke, dazu Moschus und Holz. Das Problem ist der Preis.',
      'Es gibt Düfte, die sehr ähnlich in diese Richtung gehen und nur einen Bruchteil kosten. Gleich riechen sie nicht. Aventus hat seinen eigenen Charakter, und das merkt man im direkten Vergleich. Im Alltag fällt der Unterschied aber vielen kaum auf.'
    ],
    sections: [
      {
        heading: 'Die bekannteste Alternative',
        pairings: [
          {
            expensive: 'creed-aventus',
            cheap: 'club-de-nuit-intense',
            note: 'Armaf Club de Nuit Intense Man ist die Alternative, die am häufigsten genannt wird, auch auf Parfumo und Fragrantica. Ananas, Birke, Moschus. Am Anfang ist er rauchiger und etwas schärfer als Aventus, nach einer Weile kommen sich die beiden ziemlich nahe. Er ist kräftig, also lieber sparsam sprühen.'
          }
        ]
      },
      {
        heading: 'Darauf solltest du achten',
        body: [
          'Die Gewichtung ist nicht immer gleich. Bei manchen Alternativen steht die Ananas vorne, bei anderen das Rauchige. Darum am besten auf der Haut testen und nicht nur am Papierstreifen.',
          'Günstige Alternativen sind oft lauter als das Original. Ein bis zwei Sprühstösse reichen.',
          'Diese Duftrichtung kannst du das ganze Jahr tragen. Am schönsten ist sie im Frühling und Herbst.'
        ]
      },
      {
        body: [
          'Alternativen zu anderen teuren Düften findest du im Ratgeber „Günstige Alternativen zu teuren Parfüms“.'
        ]
      }
    ],
    heroImage: '/ratgeber/illustrationen/creed-aventus-guenstige-alternativen.svg'
  },
  {
    slug: 'lattafa-dupes-welches-original',
    title: 'Lattafa-Dupes: welches Original steckt dahinter?',
    seoTitle: 'Lattafa-Dupes: welches Original dahintersteckt',
    description: 'Viele Lattafa-Düfte erinnern an teure Originale. Hier siehst du, mit welchen Luxusdüften die bekanntesten Lattafa-Parfüms verglichen werden.',
    intro: [
      'Lattafa kommt aus den Vereinigten Arabischen Emiraten und ist mit warmen, kräftigen Düften zu kleinen Preisen bekannt geworden. Einige davon erinnern stark an teure Originale.',
      'Lattafa selbst nennt seine Düfte nicht Dupes. Es sind eigene Düfte, die in eine ähnliche Richtung gehen. Den Vergleich ziehen die Leute in den Duft-Communities.',
      'Hier zeigen wir dir, welche Vergleiche gut belegt sind. Gleich riechen sie nie, aber manche kommen dem Original erstaunlich nahe.'
    ],
    sections: [
      {
        heading: 'Lattafa und das Original',
        pairings: [
          {
            expensive: 'kilian-angels-share',
            cheap: 'khamrah',
            note: 'Khamrah wird am häufigsten mit Kilian Angels’ Share verglichen. Dattel, Zimt und Vanille, warm und süss. Angels’ Share riecht deutlicher nach Cognac und ist feiner gemacht, Khamrah ist süsser und würziger.'
          },
          {
            expensive: 'initio-oud-greatness',
            cheap: 'lattafa-oud-for-glory',
            note: 'Oud for Glory (aus der Reihe Bade’e Al Oud) gilt als bekannte Alternative zu Initio Oud for Greatness. Safran, Muskatnuss und Oud. Laut Parfumo-Rezensionen hat das Original etwas mehr Safran, der Lattafa mehr Patchouli.'
          }
        ]
      },
      {
        heading: 'Weitere beliebte Lattafa-Düfte',
        perfumes: [
          'lattafa-yara',
          'lattafa-yara-tous',
          'lattafa-mayar',
          'lattafa-fakhar-men',
          'lattafa-ana-abiyedh'
        ]
      },
      {
        heading: 'Lohnt sich ein Lattafa-Duft?',
        body: [
          'Für den Preis bekommst du viel Duft. Viele Lattafa-Düfte sind kräftig und halten gut.',
          'Sie eignen sich auch, um eine Duftrichtung auszuprobieren, bevor du viel Geld für ein Original ausgibst.',
          'Sparsam sprühen. Ein bis zwei Sprühstösse reichen meistens.'
        ]
      },
      {
        body: [
          'Du suchst eine Alternative zu einem bestimmten Duft? Schau in den Ratgeber „Günstige Alternativen zu teuren Parfüms“.'
        ]
      }
    ],
    heroImage: '/ratgeber/illustrationen/lattafa-dupes-welches-original.svg'
  },
  {
    slug: 'parfum-fuer-junge-leute-unter-60-franken',
    title: 'Parfum für junge Leute und Einsteiger unter CHF 60',
    description: 'Gut riechen muss nicht teuer sein. Beliebte Düfte für junge Leute und Einsteiger, meist unter 60 Franken: frisch, süss und einfach zu tragen.',
    intro: [
      'Der erste eigene Duft soll gut riechen, zu vielem passen und nicht das ganze Sackgeld kosten. Das geht. Gerade Marken wie Lattafa oder Armaf haben gute Düfte zu kleinen Preisen.',
      'Für den Anfang ist etwas Einfaches oft die bessere Wahl als ein spezieller Nischenduft. Ein Duft, den du in der Schule, an der Uni und am Wochenende tragen kannst, bringt dir mehr als einer, der nur zu einem bestimmten Abend passt.',
      'Hier unsere Favoriten, die meist unter 60 Franken zu haben sind. Die Preise schwanken je nach Shop und Grösse.'
    ],
    sections: [
      {
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
        heading: 'Darauf solltest du beim ersten Duft achten',
        body: [
          'Nimm etwas, das zu vielen Situationen passt. Frisch oder leicht süss kommt fast immer gut an.',
          'Weniger ist mehr. Ein bis zwei Sprühstösse reichen. Im Schulzimmer oder im Bus wird es sonst schnell zu viel.',
          'Vor dem grossen Flakon lohnt sich eine Probe oder eine kleine Abfüllung. So merkst du, ob du den Duft auch nach ein paar Stunden noch magst.'
        ]
      },
      {
        heading: 'Frisch oder süss?',
        body: [
          'Frisch und sauber: Davidoff Cool Water ist ein Klassiker, der fast allen gefällt. Club de Nuit Intense Man ist fruchtig, rauchig und deutlich kräftiger.',
          'Süss und gemütlich: Lattafa Yara, Khamrah und Ariana Grande Cloud sind warm und weich.',
          'Sonnig und verspielt: Sol de Janeiro Cheirosa 62 ist ein Duftspray mit Pistazie, Karamell und Vanille. Er riecht nach Sommerferien.'
        ]
      },
      {
        body: [
          'Du weisst noch nicht, was zu dir passt? Mach unser Duft-Quiz. Es zeigt dir in ein paar Minuten, welche Richtung dir gefällt.'
        ]
      }
    ],
    heroImage: '/ratgeber/illustrationen/parfum-fuer-junge-leute-unter-60-franken.svg'
  },
  {
    slug: 'date-duefte-sommer',
    title: 'Date-Düfte im Sommer: frisch, aber mit Charakter',
    description: 'Die besten Düfte fürs Sommer-Date: leicht genug für warme Abende, aber nicht langweilig. Unsere Favoriten für Frauen und Männer, plus Tipps zur Menge.',
    intro: [
      'Beim Sommer-Date soll der Duft leicht genug für die Wärme sein, aber trotzdem etwas Eigenes haben. Ein reiner Frischeduft ist schnell vergessen, ein schwerer Abendduft wird bei 30 Grad zu viel.',
      'Am besten funktionieren Düfte, die frisch anfangen und mit der Zeit weicher und wärmer werden. Coco Mademoiselle bei den Damen und Versace Eros bei den Herren sind gute Beispiele dafür.',
      'Hier unsere Favoriten für Frauen und Männer und ein paar Tipps, damit es nicht zu viel wird.'
    ],
    sections: [
      {
        heading: 'Für Frauen',
        perfumes: [
          'coco-mademoiselle',
          'sdj-cheirosa-62',
          'lancome-la-vie-est-belle',
          'ch-good-girl',
          'dior-j-adore'
        ]
      },
      {
        heading: 'Für Männer',
        perfumes: [
          'versace-eros',
          'dior-sauvage',
          'versace-dylan-blue',
          'allure-homme-sport',
          'prada-luna-rossa-ocean'
        ]
      },
      {
        heading: 'So klappt es mit dem Date-Duft',
        body: [
          'Frisch mit warmem Kern ist im Sommer die beste Wahl. So riechst du sauber, aber nicht steril.',
          'Nicht zu viel sprühen. Das ist der häufigste Fehler. Der Duft soll auffallen, wenn man dir nahe kommt, nicht schon an der Tür. Ein bis zwei Sprühstösse auf Hals oder Brust reichen.',
          'Sprüh den Duft etwa eine Viertelstunde vor dem Treffen auf. Dann ist der erste Alkoholgeruch weg und der Duft riecht so, wie er soll.',
          'Sehr süsse, schwere Düfte sparst du dir besser für den Winter auf. Bei Hitze wirken sie schnell klebrig.'
        ]
      },
      {
        body: [
          'Du willst wissen, welcher Typ du bist? Mach unser Duft-Quiz. Es dauert nur ein paar Minuten.'
        ]
      }
    ],
    heroImage: '/images/date-duefte-hero.jpg'
  },
  {
    slug: 'zara-parfum-dupes-welches-original',
    title: 'Zara Parfum Dupes: welches Original steckt dahinter?',
    description: 'Viele Zara-Düfte erinnern an teure Designer-Parfums. Hier die bekanntesten Zara-Dupes und welches Original laut Parfumo jeweils dahintersteckt.',
    intro: [
      'Zara hat überraschend gute Düfte zu kleinen Preisen. Einige erinnern stark an bekannte Designer-Parfums. 2019 hat Zara sogar eine Kollektion zusammen mit Jo Malone herausgebracht, der Gründerin der gleichnamigen Marke.',
      'Gleich wie das Original riecht kein Zara-Duft, und oft hält er etwas weniger lang. Zum Ausprobieren einer Duftrichtung sind sie aber ideal.',
      'Wir haben die Vergleiche auf Parfumo („Duftet ähnlich“) und bei einer zweiten Quelle geprüft. Was sich nicht bestätigen liess, steht hier nicht. Das Sortiment bei Zara wechselt oft, nicht jeder Duft ist immer erhältlich.'
    ],
    sections: [
      {
        heading: 'Die bekanntesten Zara-Dupes und ihr Original',
        body: [
          'Zara Red Temptation wird mit Maison Francis Kurkdjian Baccarat Rouge 540 verglichen.',
          'Zara Red Vanilla wird mit Lancôme La Vie est Belle verglichen. Süss, mit Praliné und Vanille.',
          'Zara Gardenia wird mit YSL Black Opium verglichen.',
          'Zara Golden Decade wird mit YSL Libre verglichen.',
          'Zara Cherry Smoothie wird mit Tom Ford Lost Cherry verglichen.',
          'Zara Hypnotic Vanilla und Zara Femme werden mit Dior Hypnotic Poison verglichen.',
          'Zara Vibrant Leather wird mit Creed Aventus verglichen, fruchtig und rauchig.',
          'Zara Energetically New York wird mit Le Labo Santal 33 verglichen.'
        ]
      },
      {
        heading: 'Lohnen sich Zara-Düfte?',
        body: [
          'Für den Preis ja. Du kannst eine Duftrichtung ausprobieren, ohne gleich über 100 Franken auszugeben.',
          'Der Unterschied liegt meist bei der Haltbarkeit. Zara-Düfte halten oft etwas weniger lang als das Original. Auf eingecremter Haut und mit einem Sprühstoss auf die Kleidung hält der Duft länger.',
          'Viele Zara-Düfte gibt es auch in kleinen Flakons oder im Doppelpack. So kannst du testen, bevor du dich entscheidest.'
        ]
      },
      {
        body: [
          'Du willst wissen, welche Richtung zu dir passt? Mach unser Duft-Quiz. Weitere Alternativen findest du im Ratgeber „Günstige Alternativen zu teuren Parfüms“.'
        ]
      }
    ],
    heroImage: '/ratgeber/illustrationen/zara-parfum-dupes-welches-original.svg'
  },
  {
    slug: 'die-besten-sommerduefte-maenner',
    title: 'Die besten Sommerdüfte für Männer 2026',
    description: 'Frische Herrendüfte für den Sommer: aquatisch, zitrisch und alltagstauglich. Unsere Favoriten für heisse Tage und laue Abende, von günstig bis edel.',
    intro: [
      'Im Sommer soll ein Herrenduft vor allem frisch sein. Schwere, süsse Düfte werden bei Hitze schnell aufdringlich. Zitrus, Meeresnoten und ein bisschen Würze funktionieren besser.',
      'Wärme verstärkt Düfte. Was im Winter dezent wirkt, kann im Sommer den ganzen Raum füllen. Also lieber einmal weniger sprühen.',
      'Tagsüber darf es leicht und sauber sein, am Abend etwas wärmer. Hier unsere Favoriten.'
    ],
    sections: [
      {
        heading: 'Frisch und aquatisch',
        perfumes: [
          'davidoff-cool-water',
          'armani-acqua-di-gio-homme',
          'versace-dylan-blue',
          'allure-homme-sport',
          'prada-luna-rossa-ocean'
        ]
      },
      {
        heading: 'Etwas mehr Charakter für den Abend',
        perfumes: [
          'versace-eros',
          'ea-stronger-with-you',
          'invictus'
        ]
      },
      {
        heading: 'Darauf solltest du achten',
        body: [
          'Eau de Toilette ist im Sommer oft angenehmer als ein schweres Eau de Parfum. Gut passen zitrische, aquatische und grüne Düfte.',
          'Zwei Sprühstösse reichen bei Wärme meistens.',
          'Frische Düfte verfliegen schneller. Mit einem kleinen Reisezerstäuber kannst du am Nachmittag nachsprühen.',
          'Fürs Büro lieber etwas Zurückhaltendes. Die kräftigeren Düfte passen besser zum Abend.'
        ]
      },
      {
        body: [
          'Du weisst nicht, welche Richtung zu dir passt? Mach unser Duft-Quiz.'
        ]
      }
    ],
    heroImage: '/ratgeber/sommerduefte-maenner-hero.jpg'
  },
  {
    slug: 'parfum-trends-2026',
    title: 'Parfum-Trends 2026: was gerade angesagt ist',
    description: 'Welche Düfte sind 2026 gefragt? Dessert-Düfte mit Pistazie, hautnahe Moschusdüfte, günstige Alternativen und Unisex. Die wichtigsten Trends einfach erklärt.',
    intro: [
      'Auch Düfte haben Trends. Viele davon entstehen heute auf TikTok und Instagram. Hier die Richtungen, die 2026 besonders oft gesucht und besprochen werden.',
      'Ein Trend ist kein Muss. Der beste Duft ist der, den du gerne trägst. Trends können aber helfen, etwas Neues auszuprobieren.'
    ],
    sections: [
      {
        heading: '1. Dessert-Düfte bleiben beliebt',
        body: [
          'Süsse Noten wie Vanille, Karamell und Praliné sind weiter sehr gefragt. Dazu kommen immer öfter Pistazie und Schokolade, nicht zuletzt wegen des Hypes um die „Dubai-Schokolade“.',
          'Wem das zu süss ist, sucht sich einen Duft mit einer salzigen oder holzigen Note dazu.'
        ]
      },
      {
        heading: '2. Hautnahe Düfte',
        body: [
          'Viele mögen Düfte, die nach frisch geduschter, warmer Haut riechen. Moschus, Ambroxan und ein Hauch Salz sind typisch dafür.',
          'Solche Düfte bleiben nah am Körper. Gut, wenn du nicht den ganzen Raum beduften willst.'
        ]
      },
      {
        heading: '3. Günstige Alternativen',
        body: [
          'Marken wie Lattafa, Armaf oder auch Zara sind sehr beliebt geworden. Viele kaufen bewusst eine günstige Alternative statt des teuren Originals.',
          'Über Dupes wird heute ganz offen gesprochen. Das ist längst nichts mehr, wofür man sich schämt.'
        ]
      },
      {
        heading: '4. Weniger Schubladen',
        body: [
          'Die Trennung in Damen- und Herrendüfte wird unwichtiger. Viele gefragte Düfte sind unisex.',
          'Trag einfach, was dir gefällt.'
        ]
      },
      {
        body: [
          'Neugierig, welcher Trend zu dir passt? Mach unser Duft-Quiz.'
        ]
      }
    ],
    heroImage: '/ratgeber/illustrationen/parfum-trends-2026.svg'
  },
  {
    slug: 'parfum-im-handgepaeck-reise-tipps',
    title: 'Parfüm im Handgepäck: Was ist erlaubt?',
    description: 'Darf Parfüm ins Handgepäck? Die 100-ml-Regel einfach erklärt, was seit Juni 2026 in Zürich gilt, und Tipps, wie du deinen Duft sicher mitnimmst.',
    intro: [
      'Du willst deinen Lieblingsduft in die Ferien mitnehmen? Dann musst du wissen, was im Handgepäck erlaubt ist. An den meisten Flughäfen gilt weiterhin die 100-ml-Regel. Einige Flughäfen mit neuen Scannern haben sie aber gelockert, darunter Zürich.',
      'Die Regeln ändern sich immer wieder und sind nicht überall gleich. Schau vor jeder Reise auf der Website deines Abflug- und Rückflughafens nach.'
    ],
    sections: [
      {
        heading: 'Die 100-ml-Regel',
        body: [
          'An vielen Flughäfen darfst du Flüssigkeiten, also auch Parfüm, nur in Behältern bis 100 ml ins Handgepäck nehmen. Alle Behälter müssen zusammen in einen durchsichtigen, wiederverschliessbaren Beutel mit einem Liter Inhalt passen. Ein Beutel pro Person.',
          'Massgebend ist die Grösse des Flakons, nicht wie viel noch drin ist. Ein halbvoller 200-ml-Flakon ist also nicht erlaubt.',
          'Ausnahme Zürich: Seit dem 26. Juni 2026 dürfen Reisende, die in Zürich abfliegen und durch das Sicherheitskontrollgebäude gehen, Behälter bis 2 Liter im Handgepäck mitnehmen. Der Beutel ist dort nicht mehr nötig. Für Umsteigepassagiere gilt die alte Regel weiterhin.',
          'Wichtig für den Rückflug: Hat der Flughafen am Ferienort keine neuen Scanner, gilt dort die 100-ml-Regel. Grosse Flakons gehören dann in den Koffer.'
        ]
      },
      {
        heading: 'Im aufgegebenen Gepäck',
        body: [
          'Im Koffer darf auch der grosse Flakon mit. Für Toilettenartikel wie Parfüm gilt nach den Regeln der IATA: höchstens 0,5 Liter pro Behälter und insgesamt 2 Liter pro Person.',
          'Pack den Flakon gut ein, am besten aufrecht und in einem Plastikbeutel, falls er ausläuft.'
        ]
      },
      {
        heading: 'Düfte, die sich gut zum Reisen eignen',
        perfumes: [
          'davidoff-cool-water',
          'prada-luna-rossa-ocean',
          'lattafa-mayar',
          'ariana-cloud',
          'allure-homme-sport'
        ]
      },
      {
        heading: 'Tipps für unterwegs',
        body: [
          'Reisezerstäuber kannst du mit deinem Lieblingsduft befüllen. Es gibt sie in Drogerien und online, zum Beispiel von Travalo.',
          'Viele Marken haben kleine Flakons mit 10 bis 30 ml. Die passen in jede Tasche.',
          'Duty-Free: Was du nach der Sicherheitskontrolle kaufst, bekommst du in einem versiegelten Beutel. Beim Umsteigen können andere Regeln gelten, also den Beutel nicht öffnen.',
          'Lass den Flakon nicht in der Sonne oder im heissen Auto liegen. Hitze und Licht können den Duft mit der Zeit verändern.'
        ]
      }
    ],
    heroImage: '/ratgeber/illustrationen/parfum-im-handgepaeck-reise-tipps.svg'
  },
  {
    slug: 'parfum-und-hauttyp-was-passt-zu-meiner-haut',
    title: 'Parfüm und Hauttyp: warum ein Duft bei dir anders riecht',
    seoTitle: 'Parfüm und Hauttyp: was passt zu deiner Haut?',
    description: 'Warum riecht dasselbe Parfüm bei dir anders als bei deiner Freundin? Wie trockene oder fettige Haut und Wärme einen Duft verändern, und was du tun kannst.',
    intro: [
      'Ein und dasselbe Parfüm kann auf zwei Menschen ganz verschieden riechen. Dafür gibt es ein paar Gründe. Nicht alle sind gleich gut erforscht.',
      'Hier die wichtigsten und was du daraus für die Wahl deines Dufts mitnehmen kannst.'
    ],
    sections: [
      {
        heading: 'Warum riecht Parfüm bei jedem anders?',
        body: [
          'Feuchtigkeit: Auf trockener Haut verfliegt ein Duft schneller. Auf gut eingecremter Haut hält er besser.',
          'Wärme: An warmen Stellen wie Hals und Handgelenk riecht man einen Duft stärker. Die Körpertemperatur beeinflusst auch, welche Noten zuerst auffallen.',
          'pH-Wert, Ernährung und Hormone werden oft genannt. Ihr Einfluss ist aber wissenschaftlich kaum belegt und von Mensch zu Mensch verschieden.'
        ]
      },
      {
        heading: 'Tipps je nach Hauttyp',
        body: [
          'Trockene Haut: Vorher eine Lotion ohne Duft auftragen. Warme Düfte mit Vanille, Holz oder Moschus halten auf trockener Haut meist besser als sehr frische.',
          'Fettige Haut: Hier halten Düfte oft länger und wirken stärker. Lieber etwas weniger sprühen.',
          'Empfindliche Haut: Sie kann auf Alkohol oder einzelne Duftstoffe reagieren, zum Beispiel auf Linalool oder Citral, die auf der Packung stehen müssen. Natürliche Stoffe sind nicht automatisch verträglicher. Teste zuerst an einer kleinen Stelle oder sprüh auf die Kleidung.'
        ]
      },
      {
        heading: 'Darum: immer auf der eigenen Haut testen',
        body: [
          'Eine Beschreibung oder ein Papierstreifen zeigt dir nur, wie ein Duft grundsätzlich riecht. Wie er sich auf deiner Haut entwickelt, merkst du erst nach einer halben Stunde oder später.',
          'Darum lohnen sich Proben. Viele Händler geben welche mit, und kleine Abfüllungen gibt es online. So sparst du dir teure Fehlkäufe.'
        ]
      }
    ],
    heroImage: '/ratgeber/illustrationen/parfum-und-hauttyp-was-passt-zu-meiner-haut.svg'
  },
  {
    slug: 'vegane-tierversuchsfreie-parfums',
    title: 'Vegane und tierversuchsfreie Parfüms',
    description: 'Welche Parfüms sind vegan und tierversuchsfrei? Was „cruelty free“ bedeutet, welche Duftstoffe tierisch sein können und wie du es selbst prüfst.',
    intro: [
      'Stecken in Parfüms tierische Stoffe? Und werden sie an Tieren getestet? Die Antwort ist komplizierter, als man denkt, und oft schwer nachzuprüfen.',
      'Hier ein ehrlicher Überblick, was die Begriffe bedeuten und worauf du achten kannst.'
    ],
    sections: [
      {
        heading: 'Tierische Stoffe in Parfüms',
        body: [
          'Früher nutzte man in der Parfümerie Moschus vom Moschushirsch, Ambra vom Pottwal, Zibet von der Zibetkatze und Castoreum vom Biber. Heute werden sie kaum noch verwendet und meist durch synthetische Stoffe ersetzt.',
          'Echter Moschus ist durch den Artenschutz (CITES) streng eingeschränkt. Was heute als „Moschus“ auf der Packung steht, ist fast immer synthetisch.',
          'Echte Ambra ist sehr selten und teuer. In günstigen Parfüms ist sie praktisch nie drin. Üblich sind synthetische Stoffe wie Ambroxan.',
          'Bienenwachs, Honig oder Lanolin kommen eher in Pflegeprodukten vor, zum Beispiel in Body Lotions oder Duftkerzen.'
        ]
      },
      {
        heading: 'Tierversuche',
        body: [
          'In der EU sind Tierversuche für Kosmetik und ihre Inhaltsstoffe seit 2013 vollständig verboten. Das heisst aber nicht, dass eine Marke weltweit auf Tierversuche verzichtet.',
          'China verlangte für importierte Kosmetik lange Tierversuche. Seit Mai 2021 gibt es für normale Kosmetik Ausnahmen, wenn bestimmte Nachweise vorliegen.',
          'Siegel wie PETA „Beauty Without Bunnies“ oder „Leaping Bunny“ helfen bei der Orientierung. Sie sind freiwillig. Ohne Siegel heisst nicht automatisch, dass an Tieren getestet wird.'
        ]
      },
      {
        heading: 'So findest du vegane Düfte',
        body: [
          'Einige Marken schreiben klar, dass ihre Parfüms vegan und tierversuchsfrei sind. Ellis Brooklyn zum Beispiel ist von PETA als tierversuchsfrei gelistet und bezeichnet seine Eaux de Parfum als vegan.',
          'Zuverlässig prüfen kannst du einzelne Marken in den Datenbanken von PETA (Beauty Without Bunnies) und Leaping Bunny.',
          'Wenn dir das Thema wichtig ist, frag direkt bei der Marke nach. Die meisten haben einen Kundendienst, der Auskunft gibt.'
        ]
      }
    ],
    heroImage: '/ratgeber/illustrationen/vegane-tierversuchsfreie-parfums.svg'
  },
  {
    slug: 'parfum-proben-abfuellungen-schweiz',
    title: 'Parfüm-Proben und Abfüllungen in der Schweiz',
    seoTitle: 'Parfüm-Proben & Abfüllungen in der Schweiz',
    description: 'Bevor du über 100 Franken für einen Flakon ausgibst: So kommst du in der Schweiz an Proben und Abfüllungen, im Laden, online und mit Discovery Sets.',
    intro: [
      'Ein Parfüm riecht auf dem Papierstreifen anders als auf deiner Haut, und nach zwei Stunden wieder anders. Bevor du viel Geld für einen Flakon ausgibst, lohnt sich deshalb eine Probe.',
      'Hier die besten Wege, wie du in der Schweiz und online an Proben kommst.'
    ],
    sections: [
      {
        heading: 'In der Parfümerie',
        body: [
          'Bei Manor, Marionnaud, Müller und vielen anderen kannst du Düfte an Testern ausprobieren. Manchmal gibt es kleine Proben dazu. Frag einfach nach.',
          'In Fachparfümerien wie Osswald in Zürich kannst du dir Zeit lassen und Düfte auf der Haut testen.',
          'Teste nicht mehr als zwei, drei Düfte auf einmal. Sonst ist die Nase schnell überfordert.'
        ]
      },
      {
        heading: 'Online Abfüllungen kaufen',
        body: [
          'In Communities wie Parfumo und auf Plattformen wie ricardo.ch werden kleine Abfüllungen angeboten, oft 2 bis 10 ml. Kauf nur bei Verkäufern mit guten Bewertungen.',
          'Viele Shops führen Reisegrössen mit 10 bis 30 ml. Die sind ein guter Einstieg, wenn du dir schon ziemlich sicher bist.'
        ]
      },
      {
        heading: 'Discovery Sets',
        body: [
          'Viele Nischenmarken haben Discovery Sets mit mehreren kleinen Proben. Bei manchen wird der Preis beim nächsten Kauf angerechnet.',
          'Beispiele sind Le Labo, Byredo und Maison Margiela Replica. Die Sets gibt es auf den Websites der Marken oder in Fachparfümerien.',
          'Für günstige Marken wie Lattafa oder Armaf gibt es selten offizielle Sets. Hier helfen Abfüllungen.'
        ]
      },
      {
        body: [
          'Du weisst noch nicht, welche Richtung zu dir passt? Mach zuerst unser Duft-Quiz. Dann weisst du, welche Düfte du testen solltest.'
        ]
      }
    ],
    heroImage: '/ratgeber/illustrationen/parfum-proben-abfuellungen-schweiz.svg'
  },
  {
    slug: 'die-besten-erdbeer-duefte',
    title: 'Die besten Erdbeer-Düfte: süss und fruchtig',
    description: 'Parfüms, die nach Erdbeeren duften: süss, fruchtig und gut gelaunt. Unsere Favoriten mit Erdbeere, und worauf du bei solchen Düften achten solltest.',
    intro: [
      'Erdbeer-Düfte machen gute Laune. Sie wirken jung und verspielt, mal frisch, mal mit Sahne, Vanille oder Blüten kombiniert.',
      'Echte Erdbeere lässt sich kaum zu einem Parfüm verarbeiten. Die Erdbeernote im Flakon wird deshalb aus mehreren Duftstoffen zusammengesetzt. Sie riecht trotzdem erstaunlich echt.',
      'Hier unsere Favoriten, von leicht und frisch bis süss und cremig.'
    ],
    sections: [
      {
        perfumes: [
          'burberry-her',
          'ysl-mon-paris',
          'vs-bombshell'
        ]
      },
      {
        heading: 'Darauf solltest du achten',
        body: [
          'Erdbeere wirkt fröhlich und unkompliziert. Sie passt gut zum Alltag, zu warmen Tagen und zum Date.',
          'Schau auf die Basis. Mit Vanille, Karamell oder Moschus wird der Duft wärmer und hält länger. Mit Blüten wie bei YSL Mon Paris bleibt er eleganter.',
          'Erdbeernoten sind oft kräftig. Ein bis zwei Sprühstösse reichen.'
        ]
      },
      {
        body: [
          'Du bist nicht sicher, ob fruchtig-süss dein Typ ist? Mach unser Duft-Quiz.'
        ]
      }
    ],
    heroImage: '/ratgeber/erdbeer-duefte-hero.jpg'
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
