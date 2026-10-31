// Häufige Fragen (FAQ) je Ratgeber – bewusst getrennt von guides.ts gepflegt,
// damit neue Fragen ohne Eingriff in die grosse Artikel-Datei ergänzt werden
// können. Die Ratgeber-Seite rendert diese Fragen und erzeugt daraus
// FAQPage-Strukturdaten (JSON-LD) für mögliche Google-Rich-Snippets.
// Schlüssel = guide.slug aus lib/guides.ts.

export type GuideFaq = { q: string; a: string };

export const guideFaqs: Record<string, GuideFaq[]> = {
  'guenstige-alternativen-zu-teuren-dueften': [
    {
      q: 'Was ist ein Dupe?',
      a: 'Ein Dupe ist ein günstiger Duft, der einem teuren Original in der Duftrichtung sehr nahekommt. Er ist nie zu 100 % identisch, aber oft verblüffend ähnlich.'
    },
    {
      q: 'Sind Dupes legal?',
      a: 'Ja, solange es ein eigenständiger Duft ist: Ein Duft selbst ist rechtlich kaum geschützt – Name, Marke und Flakon-Design dagegen schon. Seriöse Dupes werben nicht mit fremden Markennamen.'
    },
    {
      q: 'Halten Dupes genauso lange wie das Original?',
      a: 'Oft fast so lange, manche sogar länger. Bei sehr günstigen Dupes kann die Haltbarkeit etwas kürzer ausfallen – für den Alltag sind viele aber top.'
    },
    {
      q: 'Wo kaufe ich Dupes in der Schweiz?',
      a: 'Lattafa und Armaf findest du in der Schweiz vor allem bei Online-Händlern wie Notino.ch. Preise und Versandkosten lohnt es sich zu vergleichen.'
    },
    {
      q: 'Was ist der beste Dupe für Dior Sauvage?',
      a: 'Lattafa Asad wird oft mit Dior Sauvage Elixir verglichen: würzig-ambriert mit schwarzem Pfeffer. Eine exakte Kopie ist es nicht.'
    }
  ],
  'die-besten-sommerduefte': [
    {
      q: 'Welche Düfte passen am besten in den Sommer?',
      a: 'Leichte, frische Düfte: Zitrus, aquatische Noten und grüner Tee. Schwere, süsse Düfte wirken bei Hitze schnell zu viel.'
    },
    {
      q: 'Warum verfliegt mein Sommerduft so schnell?',
      a: 'Frische Noten sind von Natur aus flüchtiger. Ein zweiter Sprühstoss am Mittag oder eine holzig-moschusartige Basis halten die Frische länger.'
    },
    {
      q: 'EdT oder EdP im Sommer?',
      a: 'Im Sommer ist Eau de Toilette meist angenehmer – leichter und frischer. Schwere Eau de Parfum können bei Hitze rasch aufdringlich wirken.'
    },
    {
      q: 'Wie viel Parfum soll ich im Sommer auftragen?',
      a: 'Weniger als sonst. Bei Hitze entfaltet sich ein Duft intensiver auf der Haut. Ein bis zwei Sprühstösse sind oft genug.'
    },
    {
      q: 'Gibt es gute günstige Sommerdüfte?',
      a: 'Ja. Davidoff Cool Water und Armani Acqua di Giò (Herren), Dolce & Gabbana Light Blue und Lattafa Yara (Damen) sind beliebte Sommer-Klassiker; Cool Water und Yara gehören zu den preiswerteren Optionen.'
    }
  ],
  'welcher-duft-zu-welchem-anlass': [
    {
      q: 'Welcher Duft passt ins Büro?',
      a: 'Dezent, sauber und frisch – nichts Schweres oder sehr Süsses. Im geschlossenen Raum wirkt ein Duft stärker, daher lieber sparsam.'
    },
    {
      q: 'Welcher Duft passt zum Date?',
      a: 'Etwas wärmer, süsser oder sinnlicher – Düfte, die angenehm in Erinnerung bleiben. Im Sommer aber nicht zu schwer: frisch mit warmem Unterton.'
    },
    {
      q: 'Kann ich einen Duft für alle Anlässe tragen?',
      a: 'Ja, vielseitige frisch-holzige Düfte funktionieren fast überall. Für besondere Abende darf es ruhig intensiver sein.'
    },
    {
      q: 'Welchen Duft trägt man zur Hochzeit?',
      a: 'Etwas Zeitloses und Elegantes – weder zu laut noch zu simpel. Klassische Florals, weicher Moschus oder leicht holzige Düfte wirken festlich und bleiben angenehm in Erinnerung.'
    },
    {
      q: 'Wie dosiere ich Parfum je nach Anlass?',
      a: 'Im Büro: 1 Sprühstoss. Zum Date: 1–2 Sprühstösse. Am Abend draussen: 2–3 Sprühstösse. Weniger ist fast immer besser als zu viel.'
    }
  ],
  'suesse-duefte-vanille-schokolade-karamell': [
    {
      q: 'Was sind Gourmand-Düfte?',
      a: 'Süsse Düfte, die nach guten Dingen riechen: Vanille, Schokolade, Karamell, Praline oder Kaffee. Sie wirken warm und einladend.'
    },
    {
      q: 'Sind süsse Düfte alltagstauglich?',
      a: 'Ja, vor allem Varianten mit etwas Holz oder Frische. Sehr süsse, reine Gourmands kommen abends und in der kühlen Jahreszeit am schönsten zur Geltung.'
    },
    {
      q: 'Welche süsse Note hält am längsten?',
      a: 'Vanille, Tonkabohne und Karamell gehören zur Basis und sind sehr langlebig.'
    },
    {
      q: 'Sind süsse Düfte nur für Frauen?',
      a: 'Nein. Viele beliebte warm-süsse Düfte wie Kilian Angels’ Share oder Lattafa Khamrah sind unisex. Gourmand ist keine Frage des Geschlechts.'
    },
    {
      q: 'Welcher süsse Duft passt für den Winter?',
      a: 'Tom Ford Tobacco Vanille, Kilian Angels Share oder Lattafa Khamrah sind ausgezeichnete Winterdüfte – warm, würzig und sehr langlebig.'
    }
  ],
  'die-besten-winterduefte': [
    {
      q: 'Welche Düfte passen in den Winter?',
      a: 'Warme, schwerere Düfte: Oud, Amber, Vanille, Gewürze und Holz. Sie entfalten sich bei Kälte besonders schön und hüllen angenehm ein.'
    },
    {
      q: 'Warum riecht mein Winterduft draussen schwächer?',
      a: 'Kälte bremst die Verdunstung. Auf warme Hautstellen sprühen und dem Duft einen Moment geben, bis er sich entfaltet.'
    },
    {
      q: 'EdP oder Parfum im Winter?',
      a: 'Höhere Konzentrationen lohnen sich jetzt – sie halten länger und haben mehr Tiefe.'
    },
    {
      q: 'Warum halten Winterdüfte innen länger?',
      a: 'In warmen Innenräumen entfalten sie sich stärker. Was draussen dezent wirkt, kann innen sehr präsent sein. Daher lieber sparsam dosieren.'
    },
    {
      q: 'Gibt es günstige Winterdüfte?',
      a: 'Ja. Lattafa Khamrah und Lattafa Asad bieten warme Tiefe zu vergleichsweise kleinen Preisen. Auch Armaf Club de Nuit Intense Man ist günstig und projektionsstark.'
    }
  ],
  'die-besten-unisex-duefte': [
    {
      q: 'Was ist ein Unisex-Duft?',
      a: 'Ein Duft ohne festes „männlich" oder „weiblich" – meist ausgewogen und vielseitig, oft holzig, frisch oder leicht orientalisch.'
    },
    {
      q: 'Riecht ein Unisex-Duft an jedem gleich?',
      a: 'Nein, jeder Duft verändert sich leicht je nach Haut. Deshalb lohnt es sich, ihn selbst zu testen.'
    },
    {
      q: 'Kann man Unisex-Düfte teilen?',
      a: 'Ja, sie eignen sich perfekt zum Teilen im Haushalt und für alle, die sich nicht festlegen wollen.'
    },
    {
      q: 'Sind Unisex-Düfte teurer?',
      a: 'Nicht unbedingt. Es gibt günstige Unisex-Optionen (Lattafa, Armaf) genauso wie teure Nischenklassiker (Le Labo, Byredo). Das Sortiment ist breit.'
    },
    {
      q: 'Welcher Unisex-Duft ist besonders beliebt?',
      a: 'Baccarat Rouge 540, Le Labo Santal 33 und Tom Ford Tobacco Vanille gehören zu den bekanntesten Unisex-Düften.'
    }
  ],
  'parfum-inhaltsstoffe-allergene': [
    {
      q: 'Woraus besteht ein Parfum?',
      a: 'Im Kern aus Alkohol (Trägermittel), etwas Wasser und dem Duftöl – der eigentlichen Duftmischung, die den Charakter ausmacht.'
    },
    {
      q: 'Warum steht nur „Parfum" auf der Inhaltsliste?',
      a: 'Die genaue Formel ist Betriebsgeheimnis. Deshalb dürfen die Riechstoffe gesammelt als „Parfum" oder „Fragrance" angegeben werden.'
    },
    {
      q: 'Was sind deklarationspflichtige Duftallergene?',
      a: 'Duftstoffe wie Limonene oder Linalool (natürlich vorkommend oder synthetisch), die ab einer gewissen Menge einzeln genannt werden müssen – damit Allergikerinnen und Allergiker sie erkennen. Lange waren es 26 solcher Stoffe; mit der EU-Verordnung 2023/1545 wird die Liste auf über 80 erweitert (mit Übergangsfristen).'
    },
    {
      q: 'Kann ich allergisch auf ein Parfum reagieren?',
      a: 'Ja. Empfindliche Haut kann auf bestimmte Duftstoffe reagieren. Teste neue Düfte zuerst an der Armbeuge und warte einen Tag. Hast du bekannte Allergien, lies die Inhaltsliste auf der Verpackung.'
    },
    {
      q: 'Was bedeutet „Alcohol Denat." auf der Parfum-Verpackung?',
      a: 'Es ist vergällter Alkohol – das Hauptträgermittel, das den Duft verteilt und schnell verdunsten lässt. „Denat." bedeutet denaturiert, also untrinkbar gemacht.'
    }
  ],
  'die-besten-duefte-unter-50-franken': [
    {
      q: 'Sind günstige Düfte schlechter?',
      a: 'Nein. Gerade Marken wie Lattafa und Armaf bieten erstaunliche Haltbarkeit und Projektion für wenig Geld.'
    },
    {
      q: 'Welche günstigen Marken lohnen sich?',
      a: 'Vor allem Lattafa, Armaf und Davidoff – sie bieten viel Duft fürs Geld.'
    },
    {
      q: 'Sind günstige Düfte auch Dupes?',
      a: 'Oft ja – viele gehen in die Richtung teurer Originale. Mehr dazu im Ratgeber „Günstige Alternativen zu teuren Parfüms".'
    },
    {
      q: 'Wo kaufe ich günstige Düfte in der Schweiz?',
      a: 'Zum Beispiel online bei Notino.ch oder in Parfümerien und Warenhäusern – ein Preisvergleich lohnt sich.'
    },
    {
      q: 'Lohnt sich eine Probe vor dem Kauf?',
      a: 'Unbedingt. Manche Händler bieten Proben oder kleine Flakons an – bei günstigen Düften ist die kleinste Grösse oft der einfachste Test.'
    }
  ],
  'wie-lange-haelt-parfum-haltbarkeit': [
    {
      q: 'Warum verfliegt mein Parfum so schnell?',
      a: 'Meist wegen trockener Haut, einer leichten Konzentration (EdT) oder weil zu wenig aufgetragen wurde. Auch frische Düfte sind von Natur aus flüchtiger.'
    },
    {
      q: 'Wie hält ein Duft länger?',
      a: 'Auf leicht eingecremte Haut und Pulspunkte sprühen, nicht verreiben und gerne etwas auf die Kleidung geben.'
    },
    {
      q: 'Wie lange ist ein Parfum haltbar?',
      a: 'Ungeöffnet und kühl gelagert oft viele Jahre. Nach dem Öffnen gibt das PAO-Symbol auf der Verpackung (z. B. „36M“) einen Richtwert.'
    },
    {
      q: 'Wie erkenne ich, dass ein Parfum „umgekippt" ist?',
      a: 'Die Farbe wird deutlich dunkler, es riecht oben säuerlich oder metallisch, oder der Duft wirkt flach und nur noch alkoholisch. Dann ist es Zeit, ihn zu ersetzen.'
    },
    {
      q: 'Soll ich Parfum schütteln?',
      a: 'Nicht nötig. Parfum ist eine stabile Lösung und muss nicht gemischt werden. Einfach den Sprüher benutzen und gut verschlossen aufbewahren.'
    }
  ],
  'parfum-geschenk-die-besten-duefte-zum-verschenken': [
    {
      q: 'Welches Parfum ist ein sicheres Geschenk?',
      a: 'Ein vielseitiger, beliebter Klassiker, der zur Person passt – lieber nichts zu Spezielles.'
    },
    {
      q: 'Was, wenn ich den Geschmack nicht kenne?',
      a: 'Verschenk einen Gutschein oder macht gemeinsam das Duft-Quiz – so triffst du den Geschmack sicherer.'
    },
    {
      q: 'EdT oder EdP verschenken?',
      a: 'Eau de Parfum wirkt als Geschenk meist edler und hält länger.'
    },
    {
      q: 'Welche Parfum-Sets eignen sich als Geschenk?',
      a: 'Discovery Sets von Nischenmarken (z. B. Le Labo, Byredo, Maison Margiela Replica) sind tolle Geschenke für Duft-Interessierte: mehrere kleine Proben, schön verpackt, und die beschenkte Person entscheidet selbst, was ihr gefällt.'
    },
    {
      q: 'Was ist eine gute Preisspanne für ein Parfum-Geschenk?',
      a: 'Das hängt vom Budget ab. Bekannte Designer-Klassiker gibt es in vielen Preisklassen; günstige Marken wie Lattafa oder Armaf sind eine originelle Option.'
    }
  ],
  'maennerduefte-die-frauen-moegen': [
    {
      q: 'Welche Männerdüfte kommen bei Frauen gut an?',
      a: 'Meist warme, einladende oder sauber-frische Düfte – mit Vanille, Tonkabohne oder frischem Moschus.'
    },
    {
      q: 'Wie viel Parfum soll ich auftragen?',
      a: 'Ein bis zwei Sprühstösse. Komplimente erntet, wer aus der Nähe gut riecht – nicht, wer eine Duftwolke hinterlässt.'
    },
    {
      q: 'Gibt es eine Garantie, dass ein Duft „ankommt"?',
      a: 'Nein, Geschmack ist individuell. Am wichtigsten ist, dass der Duft zu dir passt und du dich darin wohlfühlst.'
    },
    {
      q: 'Was sind klassische „Kompliment-Düfte" für Männer?',
      a: 'Düfte wie Dior Sauvage, Versace Eros, Jean Paul Gaultier Le Male und Paco Rabanne 1 Million gelten als Klassiker, die besonders oft Komplimente einheimsen.'
    },
    {
      q: 'Wann ist der richtige Zeitpunkt, einen Duft aufzusprühen?',
      a: 'Am besten 20–30 Minuten vor dem Ausgehen. So kann sich die Kopfnote legen und der Charakter des Dufts entfaltet sich richtig – nicht schon beim Reinkommen, sondern ein paar Minuten nach dem Eintreffen.'
    }
  ],
  'die-besten-vanille-duefte': [
    {
      q: 'Wie riecht Vanille im Parfum?',
      a: 'Warm, süss und cremig – mal pudrig-elegant, mal dessertartig-süss, oft kombiniert mit Gewürzen, Tabak oder Karamell.'
    },
    {
      q: 'Sind Vanille-Düfte nur für den Winter?',
      a: 'Im Herbst und Winter sind sie am schönsten, aber Varianten mit Holz oder Frische gehen auch tagsüber und im Frühling.'
    },
    {
      q: 'Halten Vanille-Düfte lange?',
      a: 'Ja, Vanille gehört zur Basis und ist von Natur aus sehr langlebig.'
    },
    {
      q: 'Was sind die bekanntesten Vanille-Düfte?',
      a: 'Tom Ford Tobacco Vanille, Kayali Vanilla 28, Lattafa Khamrah und Burberry Goddess gelten als beliebte Vanille-Klassiker in verschiedenen Preisklassen.'
    },
    {
      q: 'Was ist der Unterschied zwischen Vanille und Tonkabohne im Parfum?',
      a: 'Vanille ist cremig-süss und warm. Tonkabohne ist ähnlich, aber mit einem leicht nussigen, Heunoten-artigen Charakter. Viele Düfte kombinieren beide Noten.'
    }
  ],
  'die-besten-oud-duefte': [
    {
      q: 'Was ist Oud?',
      a: 'Oud (Agarholz) ist eine edle, intensive und warm-holzige Note – das „flüssige Gold" der orientalischen Parfümerie.'
    },
    {
      q: 'Ist in günstigen Düften echtes Oud?',
      a: 'Meist nicht – günstige Düfte verwenden in der Regel synthetische Oud-Akkorde. Das ist üblich und kann trotzdem gut riechen.'
    },
    {
      q: 'Wann trägt man Oud am besten?',
      a: 'In der kühlen Jahreszeit und am Abend. Oud ist intensiv und langlebig – ein Sprühstoss genügt meist.'
    },
    {
      q: 'Wie riecht Oud für Einsteiger am zugänglichsten?',
      a: 'Mit Rose, Safran oder Vanille kombiniert wirkt Oud weicher und zugänglicher. Tom Ford Oud Wood oder Lattafa Badee al Oud Amethyst sind gute Einstiegsoptionen.'
    },
    {
      q: 'Gibt es günstige Oud-Düfte?',
      a: 'Ja. Lattafa bietet mehrere erschwingliche Oud-Düfte wie Badee al Oud Amethyst und Oud for Glory. Sie gehören zu den günstigeren Oud-Optionen.'
    }
  ],
  'die-besten-zitrus-duefte': [
    {
      q: 'Warum halten Zitrus-Düfte oft kürzer?',
      a: 'Zitrus-Noten sind von Natur aus flüchtig und verfliegen schneller als warme oder holzige Noten.'
    },
    {
      q: 'Wie mache ich Zitrus langlebiger?',
      a: 'Eine holzige oder moschusartige Basis verankert die Frische. Ein zweiter Sprühstoss am Mittag hilft zusätzlich.'
    },
    {
      q: 'Wann passen Zitrus-Düfte am besten?',
      a: 'Für Sommer, heisse Tage und das Büro – sie wirken sauber, leicht und nie aufdringlich.'
    },
    {
      q: 'Welche Zitrus-Noten gibt es?',
      a: 'Bergamotte (elegant, leicht blumig), Zitrone (klar, spritzig), Grapefruit (fruchtig-herb) und Orange (warm, sonnig). Bergamotte ist in der Parfümerie die häufigste Zitrus-Note.'
    },
    {
      q: 'Gibt es Zitrus-Düfte für den Abend?',
      a: 'Ja, Zitrus mit Vetiver, Zedernholz oder Amber wird tiefer und abendtauglicher. Acqua di Giò oder Mancera Cedrat Boisé sind Beispiele dafür.'
    }
  ],
  'damenduefte-die-maenner-lieben': [
    {
      q: 'Welche Damendüfte mögen Männer besonders?',
      a: 'Meist warme, süsse oder sinnliche Kompositionen mit Vanille, Amber, Praline oder weissen Blüten.'
    },
    {
      q: 'Sind Gourmand-Düfte attraktiver?',
      a: 'Süsse Gourmand-Noten gelten als besonders einladend – am Ende bleibt es aber Geschmackssache.'
    },
    {
      q: 'Wie dosiere ich richtig?',
      a: 'Ein bis zwei Sprühstösse genügen, damit der Duft anziehend statt aufdringlich wirkt.'
    },
    {
      q: 'Was sind klassische „Kompliment-Düfte" für Frauen?',
      a: 'YSL Black Opium, Lancôme La Vie est Belle, Carolina Herrera Good Girl und Coco Mademoiselle gelten als beliebte Kompliment-Düfte für Damen.'
    },
    {
      q: 'Sollte ich meinen Duft nach dem wählen, was anderen gefällt?',
      a: 'Nicht nur. Trag das, worin du dich wohlfühlst – das ist am attraktivsten. Kompliment-Düfte sind eine nette Inspiration, aber dein Selbstbewusstsein macht den Unterschied.'
    }
  ],
  'parfum-nach-sternzeichen': [
    {
      q: 'Sagt das Sternzeichen wirklich meinen Lieblingsduft voraus?',
      a: 'Nein – das ist eine spielerische Inspiration. Dein persönlicher Geschmack entscheidet, nicht der Kalender.'
    },
    {
      q: 'Sind die Spar-Picks identische Kopien der Luxus-Düfte?',
      a: 'Nein, es sind eigenständige Düfte in ähnlicher Duftrichtung – sie riechen nicht exakt gleich.'
    },
    {
      q: 'Wie finde ich meinen Duft genauer?',
      a: 'Mit unserem Duft-Quiz, abgestimmt auf Duftrichtung, Anlass, Saison und Budget.'
    },
    {
      q: 'Was ist ein guter Duft für Löwen?',
      a: 'Löwen lieben Aufmerksamkeit und strahlende Präsenz. Baccarat Rouge 540 oder Lattafa Yara Tous passen gut: edel, unverwechselbar und mit guter Sillage.'
    },
    {
      q: 'Was ist ein guter Duft für Skorpione?',
      a: 'Skorpione mögen intensive, geheimnisvolle Düfte. Tom Ford Oud Wood oder dunkle Moschus-Akkorde passen zu ihrer magnetischen Ausstrahlung.'
    }
  ],
  'parfum-fuer-einsteiger-erster-signature-duft': [
    {
      q: 'Wie finde ich meinen ersten Duft?',
      a: 'Bestimme zuerst deine Duftrichtung (das Quiz hilft) und teste danach gezielt ein paar dazu passende Düfte.'
    },
    {
      q: 'Wie teste ich einen Duft richtig?',
      a: 'Auf der Haut, höchstens zwei bis drei Düfte gleichzeitig, und trag ihn einen halben Tag, bevor du urteilst.'
    },
    {
      q: 'Wie vermeide ich teure Fehlkäufe?',
      a: 'Bestell zuerst eine kleine Abfüllung oder Probe, bevor du den grossen Flakon kaufst.'
    },
    {
      q: 'Welche Düfte empfehlen sich für Einsteiger?',
      a: 'Vielseitige, leicht zugängliche Klassiker: Dior Sauvage oder Bleu de Chanel für Männer, Armani Acqua di Gioia oder Lancôme La Vie est Belle für Frauen. Sie sind beliebt, weil sie auf breiten Geschmack abgestimmt sind.'
    },
    {
      q: 'Was ist ein „Signature-Duft"?',
      a: 'Ein Signature-Duft ist der eine Duft, den du besonders mit dir verbindest – der zu deiner Persönlichkeit passt und an den andere dich erinnern. Er muss nicht teuer sein, aber er soll sich wirklich wie du anfühlen.'
    }
  ],
  'die-besten-fruehlingsduefte': [
    {
      q: 'Welche Düfte passen am besten in den Frühling?',
      a: 'Leichte, blumig-frische Düfte mit grünen Noten, Zitrus oder Blüten. Klassiker sind florale Damendüfte wie Chloé oder Marc Jacobs Daisy und frisch-aquatische Herrendüfte wie Acqua di Gio oder Cool Water.'
    },
    {
      q: 'Ab wann sollte ich auf Frühlingsdüfte wechseln?',
      a: 'Ab etwa März/April, wenn es spürbar wärmer wird. Schwere Winterdüfte mit Oud, Tabak oder dicker Vanille wirken bei Wärme schnell aufdringlich – der Wechsel lohnt sich früh.'
    },
    {
      q: 'EdT oder EdP im Frühling?',
      a: 'Eau de Toilette ist im Frühling meist die bessere Wahl: leichter, luftiger und hält bei milden Temperaturen gut genug durch. Ein leichtes EdP geht auch – aber schwere EdP-Konzentrate lieber für abends aufheben.'
    },
    {
      q: 'Wie viel Parfum im Frühling auftragen?',
      a: '1–2 Sprühstösse reichen. Mit steigenden Temperaturen entfaltet sich ein Duft intensiver auf der Haut. Weniger ist im Frühling definitiv mehr.'
    },
    {
      q: 'Gibt es gute günstige Frühlingsdüfte?',
      a: 'Ja! Davidoff Cool Water (Herren), DKNY Be Delicious und Lattafa Yara (Damen) sind preiswerte Frühlingsdüfte. Sie riechen frisch, lebendig und sind alltagstauglich.'
    },
    {
      q: 'Was ist der Unterschied zwischen einem Frühlings- und einem Sommerduft?',
      a: 'Frühlingsdüfte sind oft blumiger und grüner, Sommerdüfte eher aquatischer und zitrischer. Im Frühling darf noch etwas mehr Wärme im Basisakkord stecken – der Sommer verlangt maximale Leichtigkeit.'
    }
  ],
  'die-besten-bueroduefte': [
    {
      q: 'Welcher Duft ist bürotauglich?',
      a: 'Dezent, sauber und frisch oder holzig – nichts Schweres, sehr Süsses oder sehr Intensives.'
    },
    {
      q: 'Wie viel Parfum darf ich im Büro tragen?',
      a: 'Ein bis zwei Sprühstösse. In geschlossenen Räumen wirkt ein Duft stärker als im Freien.'
    },
    {
      q: 'Wie bleibt ein Duft dezenter?',
      a: 'Trag ihn eher auf die Kleidung als grossflächig auf die Haut – so wirkt er zurückhaltender.'
    },
    {
      q: 'Welche Düfte sollte ich im Büro vermeiden?',
      a: 'Starke Oud-Düfte, schwere Gourmands, sehr süsse oder würzige Kompositionen und alles mit grosser Projektion. Kolleginnen und Kollegen können empfindlicher reagieren als du denkst.'
    },
    {
      q: 'Gibt es günstige Bürodüfte?',
      a: 'Ja. Davidoff Cool Water und Armani Acqua di Giò sind klassische, unauffällige Bürodüfte; Cool Water ist besonders preiswert. Auch frisch-holzige Varianten von Lattafa und Armaf funktionieren gut.'
    }
  ],
  'parfum-das-lange-haelt-beast-mode': [
    {
      q: 'Was bedeutet „Beast-Mode"?',
      a: 'Düfte mit enormer Haltbarkeit und Projektion, die dich oft den ganzen Tag begleiten und auch für andere deutlich wahrnehmbar sind.'
    },
    {
      q: 'Wie dosiere ich sehr starke Düfte?',
      a: 'Sehr sparsam – ein Sprühstoss reicht meist. Zu viel wirkt schnell erdrückend, gerade in Innenräumen.'
    },
    {
      q: 'Wann trägt man solche Düfte am besten?',
      a: 'In der kühlen Jahreszeit und am Abend kommen sie am schönsten zur Geltung.'
    },
    {
      q: 'Welche Marken sind besonders bekannt für Langlebigkeit?',
      a: 'Arabische Marken wie Lattafa, Armaf und Al Haramain sind bekannt für starke Projektion und Haltbarkeit. Auch Mugler und Kilian haben langlebige Klassiker.'
    },
    {
      q: 'Wie erkenne ich, ob ein Duft „Beast-Mode" hat?',
      a: 'Andere erwähnen es, noch bevor du ins Zimmer trittst – oder der Duft ist noch Stunden nach dem Auftragen deutlich wahrnehmbar. Rezensionen auf Fragrantica oder YouTube können helfen, die Projektion einzuschätzen.'
    }
  ],
  'die-besten-hochzeitsduefte-braut': [
    {
      q: 'Welcher Duft passt zur Hochzeit?',
      a: 'Etwas Zeitloses und Elegantes, das du auch in Jahren noch schön findest – nicht der lauteste Trend.'
    },
    {
      q: 'Sollte der Hochzeitsduft besonders stark sein?',
      a: 'Eher dezent-elegant. Du möchtest umarmt werden, ohne andere zu überduften.'
    },
    {
      q: 'Wann sollte ich den Hochzeitsduft auswählen?',
      a: 'Früh genug, um ihn vorher mehrmals zu tragen – so bist du sicher, dass er sich auf deiner Haut richtig anfühlt.'
    },
    {
      q: 'Kann ich einen Duft speziell für die Hochzeitsnacht wählen?',
      a: 'Ja – für den Abend darf der Duft ruhig intensiver und sinnlicher sein. Wer möchte, wählt für den Abend einen zweiten, wärmeren Duft.'
    },
    {
      q: 'Welche Düfte gelten als klassische Brautdüfte?',
      a: 'Chanel Coco Mademoiselle, Dior Miss Dior Blooming Bouquet, Jo Malone Peony & Blush Suede und Lancôme La Nuit Trésor sind elegante Düfte, die oft für Hochzeiten gewählt werden.'
    }
  ],
  'die-besten-holzigen-duefte': [
    {
      q: 'Wie riechen holzige Düfte?',
      a: 'Edel, warm und erwachsen – mit Sandelholz, Zedernholz, Vetiver oder Oud, die Tiefe und Tragefreundlichkeit geben.'
    },
    {
      q: 'Sind holzige Düfte alltagstauglich?',
      a: 'Ja, vor allem frisch-holzige Varianten. Dunkle, cremige Hölzer wie Sandelholz oder Oud wirken abends am schönsten.'
    },
    {
      q: 'Halten holzige Düfte lange?',
      a: 'Ja, Holznoten gehören zur Basis und sind von Natur aus sehr ausdauernd.'
    },
    {
      q: 'Was ist der Unterschied zwischen Sandelholz, Zedernholz und Vetiver?',
      a: 'Sandelholz ist cremig und warm. Zedernholz ist trockener und etwas herb. Vetiver ist grasig-rauchig und sehr charaktervoll. Viele Düfte kombinieren zwei oder alle drei.'
    },
    {
      q: 'Welche holzigen Düfte eignen sich für Einsteiger?',
      a: 'Chanel Bleu de Chanel, Dior Sauvage und Davidoff Cool Water haben holzige Elemente und sind sehr zugänglich. Als günstige Alternative lohnt sich Lattafa Asad oder Armaf Club de Nuit Intense Man.'
    }
  ],
  'die-besten-blumigen-duefte': [
    {
      q: 'Sind blumige Düfte altmodisch?',
      a: 'Nein – moderne Florals kombinieren Blüten mit Frucht, Moschus oder Holz und wirken sehr aktuell.'
    },
    {
      q: 'Welche Blüten sind am beliebtesten?',
      a: 'Rose, Jasmin, Pfingstrose und Orangenblüte gehören zu den wichtigsten floralen Noten.'
    },
    {
      q: 'Wann passen blumige Düfte am besten?',
      a: 'Zarte Florals im Frühling und Alltag, opulente Blütendüfte abends und in der kühlen Jahreszeit.'
    },
    {
      q: 'Können Männer blumige Düfte tragen?',
      a: 'Ja. Viele beliebte Herrendüfte haben florale Elemente – zum Beispiel Geranium, Iris oder Lavendel. Das wirkt elegant und kultiviert, nicht zwingend feminin.'
    },
    {
      q: 'Was ist der Unterschied zwischen einem Soliflore und einem floralen Duft?',
      a: 'Ein Soliflore stellt eine einzige Blüte in den Mittelpunkt (z. B. nur Rose). Ein floraler Duft kombiniert mehrere Noten zu einem blumigen Akkord – oft komplexer und moderner.'
    }
  ],
  'die-besten-frischen-aquatischen-duefte': [
    {
      q: 'Wie riechen aquatische Düfte?',
      a: 'Sauber und frisch – wie eine Meeresbrise, nach Wasser und frischer Luft.'
    },
    {
      q: 'Warum halten frische Düfte kürzer?',
      a: 'Aquatische und zitrische Noten sind flüchtig. Eine holzige oder moschusartige Basis macht sie langlebiger.'
    },
    {
      q: 'Wann passen aquatische Düfte am besten?',
      a: 'Für heisse Tage, Sport und das Büro – sie wirken nie schwer oder aufdringlich.'
    },
    {
      q: 'Was ist der Unterschied zwischen einem aquatischen und einem Zitrus-Duft?',
      a: 'Aquatische Düfte riechen nach Wasser, Meersalz und Ozon – frisch, aber ohne viel Säure. Zitrus-Düfte sind heller und spritziger, mit klarer Zitronen-, Bergamott- oder Grapefruit-Note.'
    },
    {
      q: 'Gibt es aquatische Düfte für Frauen?',
      a: 'Ja. Issey Miyake L’Eau d’Issey und Davidoff Cool Water Woman sind klassische aquatische Damendüfte; Dolce & Gabbana Light Blue ist eher frisch-zitrisch. Sie wirken frisch, leicht und modern.'
    }
  ],
  'die-besten-moschus-pudrigen-duefte': [
    {
      q: 'Wie riecht Moschus?',
      a: 'Weich, sauber und hautnah – wie ein Duft, der dich sanft umhüllt.'
    },
    {
      q: 'Sind pudrige Düfte aufdringlich?',
      a: 'Nein, sie bleiben oft nah an der Haut. Das wirkt elegant und sinnlich statt laut.'
    },
    {
      q: 'Wann trägt man Moschus-Düfte?',
      a: 'Sie sind sehr vielseitig und passen das ganze Jahr – vom Büro bis zum Date.'
    },
    {
      q: 'Was ist der Unterschied zwischen weissem Moschus und animalischem Moschus?',
      a: 'Weisser Moschus ist synthetisch, sauber und leicht – der häufigste Moschus in heutigen Parfums. Animalisch wirkende Moschusnoten sind wärmer und sinnlicher; sie erinnern an den ursprünglichen Tier-Moschus, werden heute aber ebenfalls synthetisch hergestellt.'
    },
    {
      q: 'Welche pudrigen Düfte sind beliebt?',
      a: 'Chanel Chance Eau Tendre, Guerlain Mon Guerlain, Prada Candy und Narciso Rodriguez For Her sind bekannte pudrig-moschusartige Düfte.'
    }
  ],
  'parfum-layering-duefte-kombinieren': [
    {
      q: 'Was ist Parfum-Layering?',
      a: 'Beim Layering trägst du zwei Düfte übereinander und erschaffst so eine ganz persönliche Note.'
    },
    {
      q: 'Welche Düfte lassen sich gut kombinieren?',
      a: 'Eine glatte Basis wie Vanille oder Moschus mit etwas Würzigem oder Holzigem. Moschus passt fast immer.'
    },
    {
      q: 'Wie trage ich die Düfte auf?',
      a: 'Den schwereren Duft zuerst, dann den leichteren darüber. Ein Sprühstoss pro Duft genügt zum Ausprobieren.'
    },
    {
      q: 'Kann ich beliebige Düfte kombinieren?',
      a: 'Grundsätzlich ja – Experimentieren ist erlaubt. Bewährt haben sich Paarungen mit ähnlichen Basis-Noten, z. B. zwei Düfte mit Holz oder beide mit Vanille. Kontrastierende Paare können aber auch wunderbar funktionieren.'
    },
    {
      q: 'Gibt es Marken, die Layering besonders empfehlen?',
      a: 'Jo Malone London ist für das Konzept „Fragrance Combining“ bekannt. Grundsätzlich kann fast jede Marke fürs Layering genutzt werden.'
    }
  ],
  'edt-edp-parfum-unterschied': [
    {
      q: 'Was bedeuten EdT und EdP?',
      a: 'Sie beschreiben die Konzentration des Duftöls: Eau de Toilette ist leichter, Eau de Parfum intensiver und langlebiger.'
    },
    {
      q: 'Welche Variante hält am längsten?',
      a: 'Parfum/Extrait am längsten, danach EdP, dann EdT und zuletzt das sehr leichte Eau de Cologne.'
    },
    {
      q: 'Welche Variante ist die richtige für mich?',
      a: 'EdT für Sommer und Tag, EdP oder Parfum für Abend, Winter und mehr Haltbarkeit.'
    },
    {
      q: 'Riecht ein EdP immer stärker als ein EdT?',
      a: 'Nicht zwingend – ein EdP enthält mehr Duftöl, kann aber trotzdem zurückhaltend sein. Die Formel und die Duftrichtung spielen eine wichtige Rolle. Manche EdTs projizieren stärker als schwere EdPs.'
    },
    {
      q: 'Lohnt sich ein teures Extrait de Parfum?',
      a: 'Für Liebhaberinnen und Liebhaber eines bestimmten Dufts ja – ein Extrait ist das Konzentrierteste und Reichhaltigste. Du brauchst weniger pro Auftrag, und der Duft entwickelt sich oft komplexer auf der Haut.'
    }
  ],
  'haeufige-parfum-fehler': [
    {
      q: 'Soll ich die Handgelenke nach dem Sprühen aneinander reiben?',
      a: 'Nein. Das Reiben erwärmt die Haut und kann die Kopfnoten schneller verfliegen lassen. Einfach auftragen und trocknen lassen.'
    },
    {
      q: 'Wo lagere ich Parfum am besten?',
      a: 'Kühl, dunkel und in der Originalverpackung – nicht im Badezimmer, wo Hitze und Feuchtigkeit den Duft kippen lassen.'
    },
    {
      q: 'Wann darf ich einen Duft beurteilen?',
      a: 'Erst nach 15 bis 30 Minuten auf der Haut, nicht in der ersten Minute – die Kopfnoten verfliegen schnell.'
    },
    {
      q: 'Ist mehr Parfum automatisch besser?',
      a: 'Nein – zu viel Parfum ist einer der häufigsten Fehler. Der Duft soll einladen, nicht überrollen. Wer seinen eigenen Duft nicht mehr riecht, hat meist gerade genug aufgetragen, nicht zu wenig.'
    },
    {
      q: 'Soll ich Parfum auf die Kleidung sprühen?',
      a: 'Ja, mit Vorsicht. Kleidung hält Düfte oft länger – aber manche Stoffe oder Flecken können entstehen. Zarte Seide oder helle Stücke lieber nicht direkt besprühen.'
    }
  ],
  'parfums-mit-schweizer-bezug': [
    {
      q: 'Welche Duftmarken haben Schweizer Wurzeln?',
      a: 'Zum Beispiel Chopard (Genf) und Gisada – beide mit Bezug zur Schweiz.'
    },
    {
      q: 'Warum achtet Auressa auf Schweizer Bezug?',
      a: 'Auressa wird in der Schweiz betrieben und zeigt Preise in CHF – deshalb stellen wir auch Marken mit Schweizer Bezug vor.'
    },
    {
      q: 'Wie finde ich meinen Duft, nicht nur eine Marke?',
      a: 'Mit unserem Duft-Quiz – es hilft dir in wenigen Minuten, deine Richtung zu finden.'
    },
    {
      q: 'Hat Givaudan etwas mit Parfum zu tun?',
      a: 'Ja! Givaudan ist eines der grössten Duftunternehmen der Welt – mit Sitz in Vernier im Kanton Genf. Das Unternehmen kreiert Düfte für viele bekannte Parfumhäuser, bleibt dabei aber selbst im Hintergrund.'
    },
    {
      q: 'Wo kann ich in der Schweiz Düfte kaufen?',
      a: 'Online zum Beispiel bei Notino.ch oder Manor.ch. In vielen Städten gibt es Filialen von Marionnaud, Import Parfumerie oder Manor. Preise zu vergleichen lohnt sich.'
    }
  ],
  'die-besten-lattafa-duefte': [
    {
      q: 'Warum ist Lattafa so beliebt?',
      a: 'Lattafa bietet tolle Haltbarkeit und warme Kompositionen zu erstaunlich kleinen Preisen.'
    },
    {
      q: 'Sind Lattafa-Düfte Dupes?',
      a: 'Viele gehen in die Richtung teurer Originale – ähnliche Richtung, viel kleinerer Preis.'
    },
    {
      q: 'Wie dosiere ich Lattafa-Düfte?',
      a: 'Sparsam – die Düfte sind oft sehr kräftig und projektionsstark. Ein bis zwei Sprühstösse reichen.'
    },
    {
      q: 'Welcher Lattafa-Duft ist am vielseitigsten?',
      a: 'Yara eignet sich für alle Jahreszeiten und Anlässe. Khamrah ist ideal für Herbst und Winter. Asad ist ein starkes Allround-Statement für Männer. Wer leichter mag, schaut sich Mayar an.'
    },
    {
      q: 'Wo kaufe ich Lattafa in der Schweiz?',
      a: 'Zum Beispiel online bei Notino.ch. Achte bei Bestellungen aus dem Ausland auf Versand- und Zollkosten.'
    }
  ],
  'die-besten-armaf-duefte': [
    {
      q: 'Wofür ist Armaf bekannt?',
      a: 'Vor allem für die Club-de-Nuit-Reihe: charaktervolle Düfte mit toller Haltbarkeit zu kleinen Preisen.'
    },
    {
      q: 'Ist Club de Nuit Intense Man ein Dupe?',
      a: 'Ja, er gilt als eine der bekanntesten günstigen Alternativen zu Creed Aventus.'
    },
    {
      q: 'Wie dosiere ich Armaf-Düfte?',
      a: 'Sparsam – Armaf-Düfte sind oft kräftig und langlebig.'
    },
    {
      q: 'Hat Armaf auch Damendüfte?',
      a: 'Ja. Bekannt ist vor allem Club de Nuit Woman; Club de Nuit Milestone wird oft als Damen- oder Unisex-Duft geführt. Beide sind deutlich günstiger als Designer-Düfte.'
    },
    {
      q: 'Wo kaufe ich Armaf in der Schweiz?',
      a: 'Zum Beispiel online bei Notino.ch. Für günstige Preise in CHF lohnt sich ein Vergleich.'
    }
  ],
  'die-besten-herbstduefte': [
    {
      q: 'Welche Düfte passen in den Herbst?',
      a: 'Würzige, holzige und leicht süsse Düfte – gemütlich und einhüllend, aber noch nicht so schwer wie im tiefen Winter.'
    },
    {
      q: 'Welche Noten sind typisch für den Herbst?',
      a: 'Tabak, Zimt, Kardamom, Tonkabohne, Leder und warmes Holz – sie wirken auf kühler Luft besonders rund.'
    },
    {
      q: 'Funktionieren Herbstdüfte auch im Winter?',
      a: 'Ja, viele würzig-holzige Kompositionen lassen sich über beide Jahreszeiten tragen.'
    },
    {
      q: 'Ab wann wechsle ich auf Herbstdüfte?',
      a: 'Sobald es spürbar kühler wird. Leichte Sommerdüfte wirken dann oft flach, Herbstdüfte kommen erst richtig zur Geltung.'
    },
    {
      q: 'Gibt es günstige Herbstdüfte?',
      a: 'Ja. Lattafa Khamrah, Armaf Club de Nuit Intense Man und Davidoff Zino sind starke, günstige Optionen. Auch die Zara Tobacco Collection ist eine preiswerte Herbst-Option.'
    }
  ],
  'die-besten-nischenduefte': [
    {
      q: 'Was ist ein Nischenduft?',
      a: 'Ein eigenständiger Duft kleinerer, spezialisierter Häuser – oft mit hochwertigeren oder ungewöhnlicheren Rohstoffen und mehr Charakter.'
    },
    {
      q: 'Sind Nischendüfte besser als Designer-Düfte?',
      a: 'Nicht automatisch. Am Ende zählt, ob ein Duft dir gefällt und zu dir passt.'
    },
    {
      q: 'Lohnt sich der höhere Preis?',
      a: 'Wenn dir Charakter, Tiefe und Eigenständigkeit wichtig sind, ja. Am besten zuerst über eine Probe testen.'
    },
    {
      q: 'Welche Nischendüfte gelten als Einsteiger-Empfehlungen?',
      a: 'Maison Margiela Replica (z. B. Jazz Club oder By the Fireplace), Byredo Bal d\'Afrique und Le Labo Santal 33 sind zugänglich und bei vielen beliebt. Sie sind teurer als Designer-Düfte, aber klar eigenständiger.'
    },
    {
      q: 'Wo kaufe ich Nischendüfte in der Schweiz?',
      a: 'Onlineshops wie Notino.ch, Flaconi.ch und direkt bei den Marken. Auch ausgewählte Parfümerien und Warenhäuser führen Nischenmarken. Proben sind hier wichtiger als sonst – bestell lieber erst eine Probe.'
    }
  ],
  'die-besten-sommerduefte-frauen': [
    {
      q: 'Welcher Sommerduft für Frauen hält am längsten?',
      a: 'Cremige, leicht süsse Düfte mit Vanille, Kokos oder Moschus (z. B. Lattafa Yara, Sol de Janeiro Cheirosa 62) halten länger als rein frische Zitrus- oder Wasserdüfte.'
    },
    {
      q: 'Welcher Sommerduft passt ins Büro?',
      a: 'Frisch-saubere Düfte wie Dolce & Gabbana Light Blue oder Acqua di Gioia – dezent und nie aufdringlich.'
    },
    {
      q: 'Welches Parfum riecht nach Sommer und Sonne?',
      a: 'Sonnig-cremige Düfte mit Kokos, Pistazie oder Orangenblüte, etwa Sol de Janeiro Cheirosa 62.'
    },
    {
      q: 'Wie viel Parfum im Sommer auftragen?',
      a: 'Weniger als sonst – bei Hitze entfaltet sich ein Duft auf der Haut intensiver. Ein bis zwei Sprühstösse reichen. Lieber nachsprühen als zu viel auf einmal.'
    },
    {
      q: 'Gibt es günstige Sommerdüfte für Frauen?',
      a: 'Ja. Lattafa Yara, Sol de Janeiro Cheirosa 62 (Body Mist Version) und DKNY Be Delicious sind tolle Sommerdüfte für kleines Geld.'
    }
  ],
  'creed-aventus-guenstige-alternativen': [
    {
      q: 'Was ist die beste günstige Alternative zu Creed Aventus?',
      a: 'Armaf Club de Nuit Intense Man gilt als die bekannteste und ähnlichste Alternative – fruchtige Ananas, rauchige Birke und Moschus zu einem Bruchteil des Preises.'
    },
    {
      q: 'Riecht eine Alternative genau wie Creed Aventus?',
      a: 'Nicht zu 100 %. Die Richtung ist sehr ähnlich, einzelne Noten und ihre Reihenfolge können leicht abweichen. Für den Alltag sind viele Alternativen aber verblüffend nah dran.'
    },
    {
      q: 'Halten die Aventus-Alternativen lange?',
      a: 'Ja, oft sogar sehr lange. Club de Nuit Intense Man ist für seine starke Projektion und Haltbarkeit bekannt.'
    },
    {
      q: 'Ist Creed Aventus sein hoher Preis wert?',
      a: 'Das ist Geschmackssache. Aventus ist ein Kultobjekt mit viel Geschichte, Prestige und echtem Charakter. Für Duft-Enthusiasten ja – für den Alltag reichen viele günstige Alternativen problemlos.'
    },
    {
      q: 'Gibt es auch weibliche Aventus-Alternativen?',
      a: 'Creed Aventus for Her ist das weibliche Pendant des Originals – fruchtig, floral und elegant.'
    }
  ],
  'lattafa-dupes-welches-original': [
    {
      q: 'Sind Lattafa-Düfte echte Dupes?',
      a: 'Es sind eigenständige Düfte in ähnlicher Richtung wie bekannte Originale – keine exakten Kopien, aber oft verblüffend nah dran.'
    },
    {
      q: 'Welcher Lattafa-Duft ist am beliebtesten?',
      a: 'Khamrah (süss-würzig), Asad (würzig-ambriert) und Yara (cremig-süss) gehören zu den bekanntesten Lattafa-Düften.'
    },
    {
      q: 'Warum sind Lattafa-Düfte so günstig?',
      a: 'Die Marke setzt auf bewährte Duftrichtungen und verzichtet auf teure Designer-Lizenzen – das hält den Preis tief.'
    },
    {
      q: 'Wie nah sind Lattafa-Dupes am Original?',
      a: 'Oft sehr nah in der Duftrichtung – manche Noten, die Entfaltung auf der Haut und die Langlebigkeit können leicht abweichen. Für den Alltag reicht das in vielen Fällen völlig.'
    },
    {
      q: 'Welcher Lattafa-Duft passt zu welchem Original?',
      a: 'Asad wird oft mit Dior Sauvage Elixir verglichen, Khamrah mit Kilian Angels’ Share. Yara gilt eher als eigenständiger cremig-süsser Duft.'
    }
  ],
  'parfum-fuer-junge-leute-unter-60-franken': [
    {
      q: 'Welches Parfum ist gut für Teenager?',
      a: 'Vielseitige, unkomplizierte Düfte wie Davidoff Cool Water, Lattafa Yara oder Sol de Janeiro Cheirosa 62 – frisch oder leicht süss und alltagstauglich.'
    },
    {
      q: 'Welcher günstige Duft hält lange?',
      a: 'Arabische Marken wie Lattafa (z. B. Khamrah, Yara) und Armaf Club de Nuit Intense Man bieten für wenig Geld erstaunlich lange Haltbarkeit.'
    },
    {
      q: 'Wie viel sollte ein erster Duft kosten?',
      a: 'Für unter CHF 60 bekommst du schon sehr gute, beliebte Düfte. Teste am besten zuerst eine kleine Abfüllung, bevor du den grossen Flakon kaufst.'
    },
    {
      q: 'Welche Düfte sind unter Gleichaltrigen beliebt?',
      a: 'Versace Eros, Dior Sauvage EdT und Lattafa Yara werden häufig als Einsteiger-Klassiker genannt. Sie sind vielseitig, frisch und kommen gut an.'
    },
    {
      q: 'Lohnt sich ein Parfum-Abo oder ein Discovery Set?',
      a: 'Ja, vor allem am Anfang. Discovery Sets (von Le Labo, Maison Margiela oder auch Notino-Samplings) helfen, viele Düfte kennenzulernen, bevor du einen Lieblingsduftkauf machst.'
    }
  ],
  'date-duefte-sommer': [
    {
      q: 'Welcher Duft kommt beim Date gut an?',
      a: 'Frische Düfte mit warmem Kern – sauber und nahbar, aber anziehend. Für Frauen z. B. Chloé EDP, für Männer Versace Eros oder Dior Sauvage.'
    },
    {
      q: 'Wie viel Parfum trage ich beim Date auf?',
      a: 'Ein bis zwei Sprühstösse genügen. Komplimente erntet, wer aus der Nähe gut riecht – nicht, wer den ganzen Raum überduftet.'
    },
    {
      q: 'Süss oder frisch fürs Sommer-Date?',
      a: 'Im Sommer ist frisch mit einem warmen Unterton ideal. Schwere, süsse Abenddüfte können bei Hitze schnell aufdringlich wirken.'
    },
    {
      q: 'Was ist ein guter günstiger Date-Duft?',
      a: 'DKNY Be Delicious für Frauen und Versace Eros für Männer sind beliebte, vergleichsweise preiswerte Optionen.'
    },
    {
      q: 'Wann soll ich den Duft für ein Date auftragen?',
      a: '20 bis 30 Minuten vor dem Treffen. So legt sich die Kopfnote und der eigentliche Duft entfaltet sich richtig – das macht einen viel besseren Eindruck als frisch aufgesprühter Alkohol.'
    }
  ],
  'die-besten-erdbeer-duefte': [
    {
      q: 'Welche Parfüms riechen nach Erdbeere?',
      a: 'Bekannte Beispiele sind Burberry Her und YSL Mon Paris – beide mit deutlicher Erdbeer- bzw. Rote-Beeren-Note.'
    },
    {
      q: 'Sind Erdbeer-Düfte nur für den Sommer?',
      a: 'Sie passen besonders schön zu warmen Tagen, funktionieren aber auch ganzjährig – vor allem, wenn die Erdbeere mit Vanille oder Karamell kombiniert ist.'
    },
    {
      q: 'Gibt es günstige Erdbeer-Düfte?',
      a: 'Günstige Marken haben oft fruchtig-süsse Düfte mit roten Beeren – am besten die Duftnoten vor dem Kauf prüfen.'
    },
    {
      q: 'Kann ein Erdbeer-Duft auch maskulin sein?',
      a: 'Ja. Wenn die Frucht mit Holz, Leder oder dunklem Moschus kombiniert ist, wirkt sie edel und maskulin. Rein süss-fruchtige Erdbeere ist eher feminin – aber Duft hat kein Geschlecht.'
    },
    {
      q: 'Was ist der Unterschied zwischen einem Erdbeer- und einem roten-Früchte-Duft?',
      a: 'Erdbeer-Düfte heben die spezifische Erdbeere hervor – meist süss und leicht grünlich. Rote-Früchte-Akkorde (z. B. Himbeere, Kirsche, rote Johannisbeere) sind breiter, oft dunkler und intensiver.'
    }
  ],
  'die-besten-sommerduefte-maenner': [
    {
      q: 'Welche Sommerdüfte für Männer sind besonders beliebt?',
      a: 'Acqua di Gio von Giorgio Armani gilt seit Jahren als einer der bekanntesten Sommerdüfte für Männer. Daneben sind Davidoff Cool Water, Versace Pour Homme und Hugo Boss Bottled Infinite sehr beliebt.'
    },
    {
      q: 'Wie lange hält ein frischer Männerduft im Sommer?',
      a: 'Frische Düfte halten meist kürzer als warme. Auf warmer Haut verdunstet der Duft schneller – ein zweiter Sprühstoss am Mittag ist völlig normal.'
    },
    {
      q: 'Gibt es günstige Sommerdüfte für Männer?',
      a: 'Ja. Davidoff Cool Water EdT ist ein preiswerter Klassiker; auch Armaf und Lattafa haben frische, günstige Herrendüfte.'
    },
    {
      q: 'EdT oder EdP für den Herrensommer-Duft?',
      a: 'Eau de Toilette ist im Sommer für Männer fast immer die bessere Wahl – leichter, luftiger und weniger aufdringlich. Schwere EdPs können bei Hitze überwältigend wirken.'
    },
    {
      q: 'Was macht einen Sommerduft für Männer aus?',
      a: 'Frische Eingangsnoten (Zitrus, Bergamotte, Meeresbrise), eine saubere Herznote (oft aquatisch oder leicht grün) und eine dezente, leichte Basis (Moschus, Zedernholz). Der Duft soll erfrischen und nie aufdringlich sein.'
    }
  ],
  'parfum-trends-2026': [
    {
      q: 'Was sind die grössten Parfum-Trends 2026?',
      a: 'Cleane, hautnahe Moschusdüfte (Düfte, die nah an der Haut bleiben und wie eine zweite Haut wirken), grüne Noten (Farn, Tee, Efeu) und gender-neutrale Kompositionen werden oft als Trends genannt.'
    },
    {
      q: 'Sind Old-School-Düfte zurück?',
      a: 'Ja. Orientalische Düfte, Leder und Chypre-Akkorde erleben ein Revival – modern interpretiert, ohne die schwere Opulenz der 80er. Parfums, die an klassische Häuser erinnern, sind gefragt.'
    },
    {
      q: 'Welche Noten sind 2026 besonders angesagt?',
      a: 'Weisser Moschus, Cashmeran (weiches Holz-Kaschmir), Veilchen und Iris, saubere Aquanoten und grüne Accords. Schwere Patchouli-Lastigkeit ist weniger im Trend.'
    },
    {
      q: 'Sind nachhaltige Düfte ein Trend 2026?',
      a: 'Ja. Transparenz bei Rohstoffen, vegane Formeln und nachhaltige Verpackungen werden von immer mehr Häusern kommuniziert. Kund:innen fragen aktiv danach.'
    },
    {
      q: 'Wie entscheide ich, welcher Trend zu mir passt?',
      a: 'Nicht jeder Trend passt zu jeder Persönlichkeit. Lass dich von aktuellen Düften inspirieren, entscheide aber immer nach deinem eigenen Geschmack – ein Duft, der sich gut anfühlt, ist immer zeitgemäss.'
    }
  ],
  'parfum-im-handgepaeck-reise-tipps': [
    {
      q: 'Wie viel Parfum darf ich im Handgepäck mitnehmen?',
      a: 'Die Regel (100 ml pro Behälter, alle Flüssigkeiten in einem 1-Liter-Beutel) gilt grundsätzlich in der EU und der Schweiz; einzelne Flughäfen mit neuen Scannern weichen ab – vorher beim Flughafen prüfen.'
    },
    {
      q: 'Wie reise ich am besten mit einem grossen Parfum-Flakon?',
      a: 'Im aufgegebenen Gepäck, gut gepolstert und aufrecht. Manche Flaschen können bei Druckveränderungen lecken – in einer Plastikbeutel verstauen ist sicherer.'
    },
    {
      q: 'Gibt es Reise-Sets oder Mini-Flakons?',
      a: 'Ja. Viele Marken bieten offizielle Travel-Sets oder 10–30-ml-Flakons an. Es gibt auch leere Sprüh-Nachfüllflakons (z. B. von Travalo), die du mit deinem Lieblingsparfum befüllst.'
    },
    {
      q: 'Verändert sich der Duft durch das Reisen?',
      a: 'Generell nicht, wenn er kühl und dunkel transportiert wird. Hitze (z. B. im Kofferraum oder geparkten Auto) und direktes Licht können einen Duft langfristig verändern.'
    },
    {
      q: 'Muss ich Parfum im Koffer deklarieren?',
      a: 'Alkohol-Parfums gelten als entzündlich und haben entsprechende Transport-Regeln. Im Handgepäck gelten die üblichen Flüssigkeitsbeschränkungen. Nach IATA-Regeln gilt für Toilettenartikel wie Parfum: höchstens 0,5 l pro Behälter und insgesamt 2 l pro Person.'
    }
  ],
  'parfum-und-hauttyp-was-passt-zu-meiner-haut': [
    {
      q: 'Warum riecht Parfum auf meiner Haut anders als im Laden?',
      a: 'Jede Haut ist einzigartig – Hauttemperatur, Fettgehalt und Feuchtigkeit beeinflussen, wie ein Duft riecht und hält. Daher ist testen auf der eigenen Haut unverzichtbar.'
    },
    {
      q: 'Hält Parfum auf trockener Haut kürzer?',
      a: 'Ja. Trockene Haut hat weniger Talg, der den Duft bindet. Eincremen vor dem Auftragen (geruchslose Bodylotion) verlängert die Haltbarkeit merklich.'
    },
    {
      q: 'Auf welche Hautstellen soll ich Parfum auftragen?',
      a: 'Pulspunkte: Handgelenke, Hals, hinter den Ohren, innere Ellbogen. Warme Hautstellen verstärken die Duftentfaltung. Auch Dekolleté und Brust funktionieren gut.'
    },
    {
      q: 'Riecht Parfum auf heller und dunkler Haut unterschiedlich?',
      a: 'Nicht automatisch durch die Hautfarbe, aber durch individuelle Körperchemie und Hautzustand. Die persönliche Chemie (z. B. Ernährung, Hormonstatus) hat einen grösseren Einfluss als der Hautton.'
    },
    {
      q: 'Kann ich bei empfindlicher Haut überhaupt Parfum tragen?',
      a: 'Ja, aber es lohnt sich, hypoallergene oder alkoholfreie Optionen zu wählen und vorher einen Patch-Test an der Armbeuge zu machen. Allergene auf der Verpackung lesen und bekannte Auslöser vermeiden.'
    }
  ],
  'vegane-tierversuchsfreie-parfums': [
    {
      q: 'Was bedeutet „vegan" bei Parfums?',
      a: 'Ein veganes Parfum enthält keine tierischen Inhaltsstoffe – also kein Moschus aus Bisam-Drüsen, kein Ambra aus Walen, keine Zibet oder Bienenwachs. Viele moderne Düfte verwenden synthetische Alternativen.'
    },
    {
      q: 'Sind alle tierversuchsfreien Parfums auch vegan?',
      a: 'Nicht unbedingt. Tierversuchsfrei bedeutet, dass keine Tests an Tieren durchgeführt wurden – aber der Duft kann trotzdem tierische Inhaltsstoffe enthalten. Vegan und tierversuchsfrei sind zwei verschiedene Kriterien.'
    },
    {
      q: 'Wie erkenne ich ein veganes Parfum?',
      a: 'Achte auf Labels wie „Vegan Society", „PETA Cruelty-Free & Vegan" oder entsprechende Angaben auf der Markenwebsite. Viele Nischenmarken kommunizieren dies transparent.'
    },
    {
      q: 'Welche Marken sind bekannt für vegane Parfums?',
      a: 'Marken wie Ellis Brooklyn oder CLEAN Beauty Collective werben mit veganen Formeln. Prüfe die Angaben je Duft auf der Markenwebsite.'
    },
    {
      q: 'Riecht ein veganes Parfum anders als ein klassisches?',
      a: 'Nicht unbedingt – tierische Rohstoffe werden in der modernen Parfümerie ohnehin fast immer durch synthetische ersetzt. Synthetische Moschus- und Ambra-Varianten sind oft stabiler als natürliche Tierderivate.'
    }
  ],
  'parfum-proben-abfuellungen-schweiz': [
    {
      q: 'Wo kann ich Parfum-Proben in der Schweiz kaufen?',
      a: 'Manche Online-Händler und Parfümerien bieten Proben an. Alternativ gibt es Abfüllungen auf Kleinanzeigen-Plattformen wie Ricardo oder in Parfum-Communities.'
    },
    {
      q: 'Was ist der Unterschied zwischen einer Probe und einer Abfüllung?',
      a: 'Eine Probe ist oft ein offizielles Marken-Sample (1–2 ml). Eine Abfüllung ist eine private Teilmenge (5–10 ml) aus einem Flakon, oft von Privatpersonen oder Community-Händlern.'
    },
    {
      q: 'Warum sollte ich zuerst eine Probe kaufen?',
      a: 'Ein Duft riecht auf der Haut anders als auf dem Streifen im Laden – und das Bild des Dufts ändert sich oft über Stunden. Teure Fehlkäufe lassen sich durch eine Probe vorher vermeiden.'
    },
    {
      q: 'Wie lange reicht eine 2-ml-Probe?',
      a: 'Je nach Dosierung etwa 5–10 Anwendungen. Das reicht, um zu merken, ob der Duft zur eigenen Haut passt und wie er sich über einen ganzen Tag entwickelt.'
    },
    {
      q: 'Sind Proben von Privatpersonen sicher?',
      a: 'Meist ja, aber du solltest auf die Seriosität des Verkäufers achten. Auf Ricardo oder Duft-Foren kaufen ist verbreitet – wähle immer Angebote mit positiven Bewertungen und erkennbar originalem Flakon.'
    }
  ],
  'zara-parfum-dupes-welches-original': [
    {
      q: 'Sind Zara-Parfums echte Dupes?',
      a: 'Viele Zara-Düfte werden mit bekannten Originalen verglichen – sie gehen in eine ähnliche Richtung, sind aber eigenständige Düfte und deutlich günstiger.'
    },
    {
      q: 'Welcher Zara-Duft ist der bekannteste Dupe?',
      a: 'Zara Red Temptation wird oft mit MFK Baccarat Rouge 540 verglichen, Zara Gardenia mit YSL Black Opium. Beide kosten einen Bruchteil der Originale.'
    },
    {
      q: 'Halten Zara-Parfums lange?',
      a: 'Weniger als teure Originale, aber für den Preis erstaunlich gut. Für Alltagsdüfte reicht die Haltbarkeit oft aus.'
    },
    {
      q: 'Wo kaufe ich Zara-Parfums in der Schweiz?',
      a: 'In allen Zara-Stores in der Schweiz (Zürich, Bern, Basel u.a.) und online auf Zara.com. Die Preise sind in CHF angegeben und sehr erschwinglich.'
    },
    {
      q: 'Warum sind Zara-Düfte so günstig?',
      a: 'Zara produziert grosse Mengen und nutzt einfachere Verpackungen. Der Fokus liegt auf der Duftrichtung, nicht auf exklusivem Branding. Das Ergebnis: viel Duft für wenig Geld, ideal zum Ausprobieren.'
    }
  ]
};

export function getGuideFaqs(slug: string): GuideFaq[] {
  return guideFaqs[slug] ?? [];
}
