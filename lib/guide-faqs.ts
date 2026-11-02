// Häufige Fragen (FAQ) je Ratgeber – bewusst getrennt von guides.ts gepflegt,
// damit neue Fragen ohne Eingriff in die grosse Artikel-Datei ergänzt werden
// können. Die Ratgeber-Seite rendert diese Fragen und erzeugt daraus
// FAQPage-Strukturdaten (JSON-LD) für mögliche Google-Rich-Snippets.
// Schlüssel = guide.slug aus lib/guides.ts.

export type GuideFaq = { q: string; a: string };

export const guideFaqs: Record<string, GuideFaq[]> = {
  'guenstige-alternativen-zu-teuren-dueften': [
    {
      q: 'Was ist ein Parfum-Dupe?',
      a: 'Ein günstiger Duft, der in eine ähnliche Richtung geht wie ein teures Original. Ganz gleich riecht er nie, aber manche kommen dem Original sehr nahe.'
    },
    {
      q: 'Sind Dupes legal?',
      a: 'Ja, wenn sie einen eigenen Namen und eine eigene Flasche haben. Ein Duft selbst lässt sich rechtlich kaum schützen, Name, Marke und Flaschendesign dagegen schon. Verboten sind Fälschungen, die so tun, als wären sie das Original.'
    },
    {
      q: 'Halten Dupes so lange wie das Original?',
      a: 'Das ist verschieden. Manche halten kürzer, einige sogar länger. Am besten testest du den Dupe einen ganzen Tag auf der Haut.'
    },
    {
      q: 'Wo kaufe ich Dupes in der Schweiz?',
      a: 'Marken wie Lattafa und Armaf findest du vor allem online, zum Beispiel bei Notino. Kauf nur bei Shops, die du kennst, denn auch günstige Marken werden gefälscht.'
    },
    {
      q: 'Welcher Dupe passt zu Dior Sauvage?',
      a: 'Lattafa Asad wird oft mit Sauvage Elixir verglichen. Er ist würzig und warm mit schwarzem Pfeffer. Mit dem frischen Sauvage Eau de Toilette hat er weniger gemeinsam.'
    }
  ],
  'die-besten-sommerduefte': [
    {
      q: 'Welche Düfte passen in den Sommer?',
      a: 'Leichte, frische Düfte mit Zitrus, Meeresnoten, grünen Noten oder Tee. Schwere, sehr süsse Düfte wirken bei Hitze schnell zu viel.'
    },
    {
      q: 'Warum verfliegt mein Sommerduft so schnell?',
      a: 'Frische Noten wie Zitrus verdunsten schnell, bei Wärme noch schneller. Ein Duft mit holziger oder moschusartiger Basis hält länger. Sonst hilft ein kleiner Zerstäuber zum Nachsprühen.'
    },
    {
      q: 'EdT oder EdP im Sommer?',
      a: 'Im Sommer ist ein Eau de Toilette oft angenehmer, weil es leichter ist. Ein Eau de Parfum geht auch, dann aber sparsam.'
    },
    {
      q: 'Wie viel Parfum soll ich im Sommer auftragen?',
      a: 'Weniger als im Winter. Ein bis zwei Sprühstösse reichen meistens, denn Wärme verstärkt den Duft.'
    },
    {
      q: 'Welche Sommerdüfte sind Klassiker?',
      a: 'Davidoff Cool Water und Armani Acqua di Giò für Herren, Dolce & Gabbana Light Blue für Damen. Cool Water gehört zu den günstigeren Klassikern.'
    }
  ],
  'welcher-duft-zu-welchem-anlass': [
    {
      q: 'Welcher Duft passt ins Büro?',
      a: 'Ein dezenter, frischer oder leicht holziger Duft. Schwere und sehr süsse Düfte wirken im geschlossenen Raum schnell zu stark.'
    },
    {
      q: 'Welcher Duft passt zum Date?',
      a: 'Etwas Wärmeres mit Vanille, Blüten oder Gewürzen. Im Sommer reicht ein frischer Duft mit warmem Unterton. Wichtig ist, dass du dich darin wohlfühlst.'
    },
    {
      q: 'Kann ich einen Duft für alle Anlässe tragen?',
      a: 'Ja. Frische, leicht holzige Düfte passen fast überall. Für besondere Abende kannst du etwas Kräftigeres dazunehmen.'
    },
    {
      q: 'Welchen Duft trägt man an einer Hochzeit?',
      a: 'Etwas Elegantes, das nicht zu laut ist, zum Beispiel ein blumiger Duft, weicher Moschus oder ein leicht holziger Duft. Du bist den ganzen Tag unter vielen Leuten, also lieber sparsam.'
    },
    {
      q: 'Wie viele Sprühstösse je nach Anlass?',
      a: 'Im Büro einer, beim Date zwei, am Abend zwei bis drei. Lieber zu wenig als zu viel.'
    }
  ],
  'suesse-duefte-vanille-schokolade-karamell': [
    {
      q: 'Was sind Gourmand-Düfte?',
      a: 'Süsse Düfte, die nach Essbarem riechen, etwa nach Vanille, Karamell, Schokolade, Kaffee oder Praliné. Bekannt wurde die Richtung 1992 mit Angel von Thierry Mugler.'
    },
    {
      q: 'Sind süsse Düfte alltagstauglich?',
      a: 'Ja, vor allem solche mit etwas Holz, Moschus oder Frische. Sehr süsse Düfte passen besser zum Abend und zur kühlen Jahreszeit.'
    },
    {
      q: 'Welche süssen Noten halten am längsten?',
      a: 'Vanille, Tonkabohne und Karamell gehören zu den Basisnoten. Sie bleiben am längsten auf der Haut.'
    },
    {
      q: 'Sind süsse Düfte nur für Frauen?',
      a: 'Nein. Kilian Angels\' Share, Tom Ford Tobacco Vanille oder Lattafa Khamrah sind zum Beispiel als Unisex-Düfte verkauft.'
    },
    {
      q: 'Welcher süsse Duft passt in den Winter?',
      a: 'Warme, würzige Düfte wie Tom Ford Tobacco Vanille, Kilian Angels\' Share oder Lattafa Khamrah passen gut in die kalte Jahreszeit.'
    }
  ],
  'die-besten-winterduefte': [
    {
      q: 'Welche Düfte passen in den Winter?',
      a: 'Warme Düfte mit Amber, Vanille, Gewürzen, Holz oder Oud. In der Kälte wirken sie gemütlich und nicht zu schwer.'
    },
    {
      q: 'Warum riecht mein Duft draussen im Winter schwächer?',
      a: 'Bei Kälte verdunstet ein Duft langsamer, deshalb riecht man ihn weniger. Sprüh ihn auf warme Stellen wie Hals und Unterarme.'
    },
    {
      q: 'EdP oder Parfum im Winter?',
      a: 'Im Winter lohnt sich eine höhere Konzentration wie Eau de Parfum oder Parfum. Sie wirkt kräftiger und hält meist länger.'
    },
    {
      q: 'Warum riecht mein Winterduft drinnen so stark?',
      a: 'In warmen Räumen verdunstet der Duft schneller und wird deutlicher. Was draussen dezent wirkt, kann drinnen sehr präsent sein. Darum lieber sparsam sprühen.'
    },
    {
      q: 'Gibt es günstige Winterdüfte?',
      a: 'Ja, zum Beispiel Lattafa Khamrah oder Lattafa Asad. Beide sind warm und würzig und kosten deutlich weniger als die meisten Designerdüfte.'
    }
  ],
  'die-besten-unisex-duefte': [
    {
      q: 'Was ist ein Unisex-Duft?',
      a: 'Ein Duft, der für alle gedacht ist, nicht speziell für Frauen oder Männer. Oft ist er holzig, frisch, würzig oder leicht ambriert.'
    },
    {
      q: 'Riecht ein Unisex-Duft an allen gleich?',
      a: 'Nein. Jeder Duft riecht auf jeder Haut etwas anders. Darum lohnt es sich, ihn selbst zu testen.'
    },
    {
      q: 'Kann man Unisex-Düfte teilen?',
      a: 'Ja, dafür sind sie ideal. Eine Flasche kann im Haushalt von mehreren Leuten benutzt werden.'
    },
    {
      q: 'Sind Unisex-Düfte teurer?',
      a: 'Nicht unbedingt. Es gibt günstige Unisex-Düfte von Marken wie Lattafa und Armaf und teure Nischendüfte wie Le Labo oder Byredo.'
    },
    {
      q: 'Welche Unisex-Düfte sind besonders bekannt?',
      a: 'Zum Beispiel Baccarat Rouge 540 von Maison Francis Kurkdjian, Santal 33 von Le Labo und Tobacco Vanille von Tom Ford.'
    }
  ],
  'parfum-inhaltsstoffe-allergene': [
    {
      q: 'Woraus besteht ein Parfum?',
      a: 'Meistens aus Alkohol, etwas Wasser und dem Duftöl. Das Duftöl ist die eigentliche Duftmischung aus vielen Riechstoffen.'
    },
    {
      q: 'Warum steht nur „Parfum“ auf der Inhaltsliste?',
      a: 'Die genaue Formel ist ein Betriebsgeheimnis. Deshalb dürfen die Riechstoffe zusammen als „Parfum“ oder „Fragrance“ angegeben werden.'
    },
    {
      q: 'Was sind deklarationspflichtige Duftallergene?',
      a: 'Duftstoffe wie Limonene oder Linalool, die ab einer bestimmten Menge einzeln auf der Packung stehen müssen. Lange waren es 26, mit der EU-Verordnung 2023/1545 werden es über 80, mit Übergangsfristen.'
    },
    {
      q: 'Kann ich auf ein Parfum allergisch reagieren?',
      a: 'Ja, empfindliche Haut kann auf bestimmte Duftstoffe reagieren. Teste neue Düfte zuerst in der Armbeuge und warte einen Tag. Bei starken Reaktionen geh zur Hautärztin oder zum Hautarzt.'
    },
    {
      q: 'Was bedeutet „Alcohol Denat.“?',
      a: 'Das ist vergällter Alkohol, also Alkohol, der ungeniessbar gemacht wurde. Er verteilt den Duft und verdunstet schnell.'
    }
  ],
  'die-besten-duefte-unter-50-franken': [
    {
      q: 'Sind günstige Parfüms schlechter?',
      a: 'Nicht unbedingt. Viele günstige Düfte, etwa von Lattafa oder Armaf, halten gut und riechen hochwertig. Teste trotzdem zuerst, denn die Qualität schwankt von Duft zu Duft.'
    },
    {
      q: 'Welche günstigen Marken lohnen sich?',
      a: 'Oft genannt werden Lattafa, Armaf und Davidoff. Sie haben viele beliebte Düfte, die meist unter 50 Franken kosten.'
    },
    {
      q: 'Wo kaufe ich günstige Düfte in der Schweiz?',
      a: 'Zum Beispiel online bei Notino.ch oder in Parfümerien und Warenhäusern. Die Preise ändern sich oft, vergleichen lohnt sich.'
    },
    {
      q: 'Lohnt sich eine Probe vor dem Kauf?',
      a: 'Ja. Ein Duft riecht auf jeder Haut etwas anders. Mit einer Probe oder kleinen Abfüllung vermeidest du Fehlkäufe.'
    }
  ],
  'wie-lange-haelt-parfum-haltbarkeit': [
    {
      q: 'Warum verfliegt mein Parfum so schnell?',
      a: 'Meist wegen trockener Haut, einer leichten Konzentration wie Eau de Toilette oder weil zu wenig aufgetragen wurde. Frische Zitrusdüfte verfliegen auch von Natur aus schneller.'
    },
    {
      q: 'Wie hält ein Parfum länger?',
      a: 'Auf eingecremte Haut sprühen, die Stellen nicht verreiben und etwas auf die Kleidung geben. Bei empfindlichen Stoffen vorher an einer unauffälligen Stelle testen.'
    },
    {
      q: 'Wie lange ist ein Parfum nach dem Öffnen haltbar?',
      a: 'Meist mehrere Jahre, wenn es kühl und dunkel steht. Das Symbol mit dem offenen Döschen und „12M" oder „36M" auf der Verpackung gibt einen Richtwert in Monaten.'
    },
    {
      q: 'Woran erkenne ich, dass ein Parfum gekippt ist?',
      a: 'Die Farbe ist deutlich dunkler, es riecht säuerlich oder nach Metall, oder nur noch flach nach Alkohol.'
    },
    {
      q: 'Muss ich Parfum schütteln?',
      a: 'Nein. Parfum muss nicht gemischt werden. Einfach sprühen und die Flasche gut verschlossen aufbewahren.'
    }
  ],
  'parfum-geschenk-die-besten-duefte-zum-verschenken': [
    {
      q: 'Welches Parfum ist ein sicheres Geschenk?',
      a: 'Ein bekannter, beliebter Klassiker, der zur Person passt. Am sichersten ist ein Duft, den sie schon trägt und mag.'
    },
    {
      q: 'Was schenke ich, wenn ich den Geschmack nicht kenne?',
      a: 'Einen Gutschein einer Parfümerie oder ein Discovery-Set mit kleinen Proben. So kann die Person selbst wählen.'
    },
    {
      q: 'Eau de Toilette oder Eau de Parfum verschenken?',
      a: 'Eau de Parfum hält meist länger und wirkt als Geschenk etwas edler. Für sehr leichte Sommerdüfte ist ein Eau de Toilette aber auch eine gute Wahl.'
    },
    {
      q: 'Was ist ein Discovery-Set?',
      a: 'Ein Set mit mehreren kleinen Proben einer Marke. Viele Marken bieten das an, auch Nischenmarken. Ideal für Leute, die gerne ausprobieren.'
    }
  ],
  'maennerduefte-die-frauen-moegen': [
    {
      q: 'Welche Männerdüfte kommen bei Frauen gut an?',
      a: 'Oft warme, weiche Düfte mit Vanille, Tonkabohne oder Amber, oder saubere, frische Düfte. Eine Garantie gibt es nicht, Geschmack ist verschieden.'
    },
    {
      q: 'Wie viel Parfum soll ich als Mann auftragen?',
      a: 'Ein bis zwei Sprühstösse. Es reicht, wenn man den Duft in der Nähe riecht.'
    },
    {
      q: 'Welche Herrendüfte gelten als Kompliment-Düfte?',
      a: 'Oft genannt werden Dior Sauvage, Versace Eros, Jean Paul Gaultier Le Male und Paco Rabanne 1 Million.'
    },
    {
      q: 'Wann soll ich Parfum vor dem Ausgehen auftragen?',
      a: 'Am besten etwa 20 bis 30 Minuten vorher. Dann ist der erste, stärkere Eindruck schon etwas weicher geworden.'
    }
  ],
  'die-besten-vanille-duefte': [
    {
      q: 'Wie riecht Vanille im Parfum?',
      a: 'Warm, süss und weich. Je nach Duft eher pudrig, cremig oder wie ein Dessert, oft zusammen mit Gewürzen, Tabak oder Karamell.'
    },
    {
      q: 'Sind Vanille-Düfte nur für den Winter?',
      a: 'Im Herbst und Winter sind sie am schönsten. Leichtere Vanille-Düfte, etwa mit Zitrus oder Holz, kannst du aber auch im Frühling und Sommer tragen.'
    },
    {
      q: 'Halten Vanille-Düfte lange?',
      a: 'Meistens ja. Vanille gehört zur Basis eines Dufts und hält auf der Haut länger als frische Noten.'
    },
    {
      q: 'Was ist der Unterschied zwischen Vanille und Tonkabohne?',
      a: 'Beide riechen warm und süss. Tonkabohne erinnert zusätzlich an Mandel und Heu. Viele Düfte kombinieren beide.'
    },
    {
      q: 'Welche Vanille-Düfte sind bekannt?',
      a: 'Zum Beispiel Tom Ford Tobacco Vanille, Kayali Vanilla 28, Lattafa Khamrah und Burberry Goddess, in ganz verschiedenen Preisklassen.'
    }
  ],
  'die-besten-oud-duefte': [
    {
      q: 'Was ist Oud?',
      a: 'Oud, auch Agarholz oder Adlerholz, ist ein duftendes Harz aus dem Holz von Aquilaria-Bäumen. Es riecht holzig, warm und oft leicht rauchig.'
    },
    {
      q: 'Ist in günstigen Düften echtes Oud?',
      a: 'Meistens nicht. Echtes Oud ist sehr teuer, darum verwenden die meisten Parfüms einen nachgebauten Oud-Akkord. Das ist üblich und kann trotzdem gut riechen.'
    },
    {
      q: 'Wann trägt man Oud am besten?',
      a: 'In der kühlen Jahreszeit und am Abend. Oud ist kräftig, ein Sprühstoss reicht meist.'
    },
    {
      q: 'Welcher Oud-Duft eignet sich für Einsteiger?',
      a: 'Düfte, in denen Oud mit Rose, Safran oder Vanille kombiniert ist. Oft empfohlen werden Tom Ford Oud Wood oder Lattafa Badee Al Oud Amethyst.'
    },
    {
      q: 'Gibt es günstige Oud-Düfte?',
      a: 'Ja, zum Beispiel von Lattafa, etwa Badee Al Oud Amethyst oder Oud for Glory.'
    }
  ],
  'die-besten-zitrus-duefte': [
    {
      q: 'Warum halten Zitrus-Düfte oft kürzer?',
      a: 'Zitrusnoten sind sehr leicht und verfliegen schneller als warme oder holzige Noten.'
    },
    {
      q: 'Wie hält ein Zitrus-Duft länger?',
      a: 'Wähl einen Duft mit holziger oder moschusartiger Basis und sprüh ihn auf eingecremte Haut. Ein zweiter Sprühstoss am Mittag hilft zusätzlich.'
    },
    {
      q: 'Wann passen Zitrus-Düfte am besten?',
      a: 'Im Sommer, an heissen Tagen und im Büro. Sie riechen sauber und sind selten zu viel.'
    },
    {
      q: 'Welche Zitrus-Noten gibt es?',
      a: 'Die häufigsten sind Bergamotte, Zitrone, Grapefruit, Orange und Mandarine. Bergamotte riecht etwas blumiger, Grapefruit eher herb.'
    },
    {
      q: 'Gibt es Zitrus-Düfte für den Abend?',
      a: 'Ja. Mit Vetiver, Zedernholz oder Amber wird Zitrus tiefer und passt auch abends, zum Beispiel Mancera Cedrat Boisé.'
    }
  ],
  'damenduefte-die-maenner-lieben': [
    {
      q: 'Welche Damendüfte mögen Männer besonders?',
      a: 'Oft genannt werden warme, süsse Düfte mit Vanille, Praliné oder Amber und blumige Düfte mit Moschus. Am Ende ist es aber Geschmackssache.'
    },
    {
      q: 'Welche Damendüfte bekommen die meisten Komplimente?',
      a: 'In Bewertungen fallen oft YSL Black Opium, Lancôme La Vie est Belle, Carolina Herrera Good Girl und Chanel Coco Mademoiselle.'
    },
    {
      q: 'Sind süsse Düfte attraktiver?',
      a: 'Viele mögen süsse Noten, weil sie warm und weich riechen. Das gilt aber nicht für alle. Manche finden frische oder pudrige Düfte schöner.'
    },
    {
      q: 'Wie viel Parfum sollte ich auftragen?',
      a: 'Ein bis zwei Sprühstösse reichen bei den meisten Düften. So riecht man dich aus der Nähe, ohne dass es aufdringlich wird.'
    },
    {
      q: 'Sollte ich meinen Duft danach wählen, was anderen gefällt?',
      a: 'Nicht nur. Trag, was dir gefällt. Die Liste hier ist eine Anregung, mehr nicht.'
    }
  ],
  'parfum-nach-sternzeichen': [
    {
      q: 'Sagt mein Sternzeichen, welcher Duft zu mir passt?',
      a: 'Nein. Das ist eine Spielerei. Welcher Duft dir gefällt, entscheidet dein Geschmack.'
    },
    {
      q: 'Riechen die günstigen Düfte genau wie die teuren?',
      a: 'Nein. Wo wir eine Alternative nennen, geht sie in eine ähnliche Richtung. Gleich riecht sie nie.'
    },
    {
      q: 'Was ist ein guter Duft für Löwen?',
      a: 'Etwas mit viel Ausstrahlung, zum Beispiel Baccarat Rouge 540. Günstiger und in eine ähnliche Richtung geht Lattafa Ana Abiyedh Rouge.'
    },
    {
      q: 'Was ist ein guter Duft für Skorpione?',
      a: 'Dunkle, holzige Düfte mit Oud, zum Beispiel Tom Ford Oud Wood oder Lattafa Oud for Glory.'
    },
    {
      q: 'Wie finde ich meinen Duft genauer?',
      a: 'Mit unserem Duft-Quiz. Es fragt nach Duftrichtung, Anlass, Jahreszeit und Budget.'
    }
  ],
  'parfum-fuer-einsteiger-erster-signature-duft': [
    {
      q: 'Wie finde ich meinen ersten Duft?',
      a: 'Finde zuerst heraus, welche Duftrichtung dir gefällt. Das Quiz hilft dabei. Dann teste ein paar passende Düfte auf der Haut.'
    },
    {
      q: 'Wie teste ich einen Duft richtig?',
      a: 'Auf der Haut, höchstens zwei bis drei Düfte auf einmal. Trag ihn ein paar Stunden, bevor du entscheidest.'
    },
    {
      q: 'Wie vermeide ich Fehlkäufe?',
      a: 'Kauf zuerst eine Probe oder eine kleine Abfüllung. Erst wenn du den Duft ein paar Tage gern getragen hast, lohnt sich der grosse Flakon.'
    },
    {
      q: 'Welche Düfte eignen sich für Einsteiger?',
      a: 'Beliebte Düfte, die viele mögen. Zum Beispiel Dior Sauvage oder Bleu de Chanel bei den Herrendüften, Dolce & Gabbana Light Blue oder Armani Acqua di Gioia bei den Damendüften.'
    },
    {
      q: 'Was ist ein Signature-Duft?',
      a: 'Ein Duft, den du immer wieder trägst und mit dem andere dich verbinden. Er muss nicht teuer sein. Er soll einfach zu dir passen.'
    }
  ],
  'die-besten-fruehlingsduefte': [
    {
      q: 'Welche Düfte passen in den Frühling?',
      a: 'Leichte Düfte mit Blüten, grünen Noten oder Zitrus. Zum Beispiel Marc Jacobs Daisy, Chloé Eau de Parfum oder Lancôme Idôle.'
    },
    {
      q: 'Wann wechsle ich auf Frühlingsdüfte?',
      a: 'Sobald es spürbar wärmer wird, bei uns meist ab März oder April. Schwere Düfte mit Oud oder viel Vanille wirken bei Wärme schnell zu stark.'
    },
    {
      q: 'Eau de Toilette oder Eau de Parfum im Frühling?',
      a: 'Eau de Toilette ist oft angenehmer, weil es leichter ist. Ein leichtes Eau de Parfum geht aber auch gut.'
    },
    {
      q: 'Wie viel Parfum im Frühling?',
      a: 'Ein bis zwei Sprühstösse. Bei Wärme riecht man einen Duft stärker.'
    },
    {
      q: 'Was ist der Unterschied zu einem Sommerduft?',
      a: 'Frühlingsdüfte sind oft blumiger und grüner. Sommerdüfte sind meist noch leichter, mit viel Zitrus oder Meeresnoten.'
    }
  ],
  'die-besten-bueroduefte': [
    {
      q: 'Welcher Duft ist bürotauglich?',
      a: 'Ein dezenter Duft, frisch, holzig, leicht blumig oder sauber-moschusartig. Nichts sehr Süsses oder Schweres.'
    },
    {
      q: 'Wie viel Parfum darf ich im Büro tragen?',
      a: 'Meist reicht ein Sprühstoss. In geschlossenen Räumen riecht man einen Duft stärker als draussen.'
    },
    {
      q: 'Wie wirkt ein Duft dezenter?',
      a: 'Sprüh weniger und eher auf die Kleidung als auf grosse Hautflächen.'
    },
    {
      q: 'Welche Düfte sollte ich im Büro vermeiden?',
      a: 'Sehr süsse Gourmands, schwere Oud-Düfte und alles, was sehr weit strahlt.'
    }
  ],
  'parfum-das-lange-haelt-beast-mode': [
    {
      q: 'Was bedeutet „Beast Mode“ bei Parfum?',
      a: 'So nennt die Duft-Community Düfte, die sehr lange halten und weit strahlen.'
    },
    {
      q: 'Wie dosiere ich sehr starke Düfte?',
      a: 'Sparsam. Meist reichen ein bis zwei Sprühstösse, in Innenräumen eher einer.'
    },
    {
      q: 'Wann trägt man solche Düfte am besten?',
      a: 'An kühlen Tagen und am Abend. Bei Hitze wirken sie schnell zu viel.'
    },
    {
      q: 'Welche Marken sind für starke Düfte bekannt?',
      a: 'Viele Düfte von Lattafa und Armaf gelten als sehr ausdauernd. Auch Klassiker wie Mugler Angel oder Jean Paul Gaultier Ultra Male sind für ihre Stärke bekannt.'
    },
    {
      q: 'Warum hält derselbe Duft bei mir kürzer?',
      a: 'Das hängt auch von der Haut ab. Auf trockener Haut verfliegt ein Duft oft schneller. Eine unparfümierte Creme vor dem Aufsprühen kann helfen.'
    }
  ],
  'die-besten-hochzeitsduefte-braut': [
    {
      q: 'Welcher Duft passt zur Hochzeit?',
      a: 'Etwas Zeitloses und Elegantes, das du auch in ein paar Jahren noch schön findest.'
    },
    {
      q: 'Sollte der Hochzeitsduft stark sein?',
      a: 'Eher nicht. Du wirst oft umarmt, da ist ein dezenter Duft angenehmer.'
    },
    {
      q: 'Wann sollte ich meinen Hochzeitsduft aussuchen?',
      a: 'Ein paar Wochen vorher. So kannst du ihn mehrmals tragen und sicher sein, dass er dir gefällt.'
    },
    {
      q: 'Welche Düfte passen gut zu einer Braut?',
      a: 'Zum Beispiel Chanel Coco Mademoiselle, Dior Miss Dior, Chloé Eau de Parfum oder Jo Malone English Pear & Freesia.'
    },
    {
      q: 'Kann ich für den Abend einen zweiten Duft nehmen?',
      a: 'Ja. Manche Bräute tragen tagsüber etwas Leichtes und am Abend einen wärmeren Duft.'
    }
  ],
  'die-besten-holzigen-duefte': [
    {
      q: 'Wie riechen holzige Düfte?',
      a: 'Warm und ruhig. Je nach Holz cremig (Sandelholz), trocken (Zeder), erdig (Vetiver) oder dunkel (Oud).'
    },
    {
      q: 'Sind holzige Düfte alltagstauglich?',
      a: 'Ja, vor allem die frischen mit Zitrus oder Vetiver. Dunkle Hölzer wie Oud wirken am Abend schöner.'
    },
    {
      q: 'Halten holzige Düfte lange?',
      a: 'Oft ja, weil Holznoten zur Basis gehören und lange auf der Haut bleiben.'
    },
    {
      q: 'Was ist der Unterschied zwischen Sandelholz, Zeder und Vetiver?',
      a: 'Sandelholz ist cremig und warm, Zeder trocken und klar, Vetiver erdig und leicht rauchig. Viele Düfte mischen mehrere davon.'
    },
    {
      q: 'Welche holzigen Düfte eignen sich für den Anfang?',
      a: 'Zum Beispiel Bleu de Chanel oder Terre d\'Hermès. Beide sind holzig, aber frisch und leicht zu tragen.'
    }
  ],
  'die-besten-blumigen-duefte': [
    {
      q: 'Sind blumige Düfte altmodisch?',
      a: 'Nein. Moderne Blumendüfte mischen Blüten mit Früchten, Moschus oder Holz und wirken sehr aktuell.'
    },
    {
      q: 'Welche Blüten sind in Parfums am häufigsten?',
      a: 'Rose, Jasmin, Pfingstrose, Orangenblüte und Maiglöckchen gehören zu den häufigsten.'
    },
    {
      q: 'Wann passen blumige Düfte am besten?',
      a: 'Zarte Blumendüfte im Frühling und im Alltag, volle Blumendüfte eher am Abend und bei Kälte.'
    },
    {
      q: 'Können Männer blumige Düfte tragen?',
      a: 'Ja. Viele Herrendüfte haben blumige Noten, zum Beispiel Lavendel, Iris oder Geranie.'
    },
    {
      q: 'Was ist ein Soliflore?',
      a: 'Ein Duft, der eine einzige Blüte in den Mittelpunkt stellt, zum Beispiel nur Rose oder nur Tuberose.'
    }
  ],
  'die-besten-frischen-aquatischen-duefte': [
    {
      q: 'Wie riechen aquatische Düfte?',
      a: 'Nach Wasser, Meeresluft und sauberer Haut. Meist kommen Zitrus, Kräuter und etwas Holz dazu.'
    },
    {
      q: 'Warum halten frische Düfte oft kürzer?',
      a: 'Zitrus- und Wassernoten sind sehr flüchtig. Eine Basis mit Holz, Moschus oder Ambroxan hilft, dass der Duft länger bleibt.'
    },
    {
      q: 'Wann trägt man aquatische Düfte am besten?',
      a: 'Im Sommer, nach dem Sport und im Büro. Sie wirken selten schwer oder aufdringlich.'
    },
    {
      q: 'Was ist der Unterschied zwischen aquatisch und zitrisch?',
      a: 'Aquatische Düfte riechen nach Wasser, Salz und Luft. Zitrusdüfte sind spritziger und riechen klar nach Zitrone, Bergamotte oder Grapefruit.'
    },
    {
      q: 'Gibt es aquatische Düfte für Frauen?',
      a: 'Ja. Klassiker sind L’Eau d’Issey von Issey Miyake und Cool Water Woman von Davidoff. Light Blue von Dolce & Gabbana ist eher zitrisch-frisch.'
    }
  ],
  'die-besten-moschus-pudrigen-duefte': [
    {
      q: 'Wie riecht Moschus?',
      a: 'Weich und sauber, ein bisschen wie warme, frisch geduschte Haut.'
    },
    {
      q: 'Sind pudrige Düfte aufdringlich?',
      a: 'Meistens nicht. Sie bleiben eher nah an der Haut und wirken dezent.'
    },
    {
      q: 'Warum rieche ich meinen Moschus-Duft nicht mehr?',
      a: 'Die Nase gewöhnt sich schnell an Moschus. Manche Menschen nehmen bestimmte Moschus-Stoffe auch grundsätzlich schwächer wahr. Andere riechen ihn oft trotzdem.'
    },
    {
      q: 'Ist Moschus in Parfums tierisch?',
      a: 'Fast nie. Der ursprüngliche Moschus kam vom Moschustier, heute wird er praktisch immer synthetisch hergestellt. Weisser Moschus ist eine solche synthetische, saubere Variante.'
    },
    {
      q: 'Welche Düfte sind bekannt für Moschus oder Puder?',
      a: 'Narciso Rodriguez For Her ist ein bekannter Moschus-Duft, Chanel N°5 ein pudriger Klassiker. Musc Ravageur von Frédéric Malle ist eine warme, würzige Moschus-Variante.'
    }
  ],
  'parfum-layering-duefte-kombinieren': [
    {
      q: 'Was ist Parfum-Layering?',
      a: 'Du trägst zwei Düfte übereinander und bekommst so eine eigene Mischung.'
    },
    {
      q: 'Welche Düfte lassen sich gut kombinieren?',
      a: 'Am einfachsten ist eine ruhige Basis wie Vanille oder Moschus, kombiniert mit etwas Holzigem oder Würzigem.'
    },
    {
      q: 'In welcher Reihenfolge trage ich die Düfte auf?',
      a: 'Erst den schwereren, dann den leichteren. Zum Testen reicht ein Sprühstoss pro Duft.'
    },
    {
      q: 'Kann ich jeden Duft mit jedem kombinieren?',
      a: 'Ausprobieren darfst du alles. Einfacher klappt es mit Düften, die ähnliche Basisnoten haben, etwa beide mit Holz oder beide mit Vanille. Zwei sehr kräftige Düfte zusammen werden schnell zu viel.'
    },
    {
      q: 'Welche Marke ist für Layering bekannt?',
      a: 'Jo Malone London. Die Marke empfiehlt ausdrücklich, ihre Düfte zu kombinieren, und nennt das „Fragrance Combining“.'
    }
  ],
  'edt-edp-parfum-unterschied': [
    {
      q: 'Was bedeuten EdT und EdP?',
      a: 'EdT heisst Eau de Toilette, EdP Eau de Parfum. Die Kürzel beschreiben, wie viel Duftöl drin ist. Das EdP enthält mehr und ist meist kräftiger.'
    },
    {
      q: 'Welche Variante hält am längsten?',
      a: 'In der Regel das Parfum (Extrait), dann das EdP, dann das EdT. Das leichte Eau de Cologne hält am kürzesten.'
    },
    {
      q: 'Gibt es feste Prozentwerte?',
      a: 'Nein. Es gibt keine gesetzliche Norm. Die üblichen Richtwerte sind etwa 5 bis 15 Prozent für EdT, 15 bis 20 Prozent für EdP und 20 bis 30 Prozent für Parfum.'
    },
    {
      q: 'Riecht ein EdP immer stärker als ein EdT?',
      a: 'Nicht unbedingt. Ein EdP enthält mehr Duftöl, aber wie stark ein Duft wirkt, hängt auch von den Zutaten ab. Manche frischen EdTs sind lauter als ein ruhiges EdP.'
    },
    {
      q: 'Lohnt sich ein Extrait?',
      a: 'Wenn du einen Duft liebst und er lange halten soll, kann es sich lohnen. Du brauchst weniger davon. Teste aber zuerst, denn ein Extrait riecht manchmal anders als das EdP.'
    }
  ],
  'haeufige-parfum-fehler': [
    {
      q: 'Soll ich die Handgelenke nach dem Sprühen aneinander reiben?',
      a: 'Lieber nicht. Das Reiben macht die Haut warm, und die ersten Noten verfliegen schneller. Einfach trocknen lassen.'
    },
    {
      q: 'Wo lagere ich Parfum am besten?',
      a: 'Kühl und dunkel, zum Beispiel im Schrank oder in der Schachtel. Das Badezimmer ist wegen Wärme und Feuchtigkeit kein guter Ort.'
    },
    {
      q: 'Wann kann ich einen Duft beurteilen?',
      a: 'Frühestens nach 15 bis 30 Minuten auf der Haut. Noch besser ist es, ihn einen halben Tag zu tragen.'
    },
    {
      q: 'Warum rieche ich mein Parfum nicht mehr?',
      a: 'Die Nase gewöhnt sich an Gerüche, die ständig da sind. Andere nehmen deinen Duft meistens trotzdem wahr. Also nicht gleich nachsprühen.'
    },
    {
      q: 'Darf ich Parfum auf die Kleidung sprühen?',
      a: 'Ja, dort hält er oft sogar länger. Bei Seide und hellen Stoffen aber vorsichtig sein, es können Flecken entstehen. Am besten vorher an einer unauffälligen Stelle testen.'
    }
  ],
  'parfums-mit-schweizer-bezug': [
    {
      q: 'Welche Duftmarken haben Schweizer Wurzeln?',
      a: 'Zum Beispiel Chopard aus Genf, Davidoff und Gisada aus Zürich.'
    },
    {
      q: 'Woher kommt Davidoff?',
      a: 'Die Marke geht auf Zino Davidoff zurück, der in Genf ein Tabakgeschäft hatte. Die Düfte wie Cool Water werden heute unter Lizenz hergestellt.'
    },
    {
      q: 'Hat Givaudan etwas mit Parfum zu tun?',
      a: 'Ja. Givaudan ist eine der grössten Duft- und Aromafirmen der Welt und hat ihren Sitz in Vernier bei Genf. Sie entwickelt Düfte für viele bekannte Marken, ihr Name steht aber nicht auf dem Flakon.'
    },
    {
      q: 'Wo kann ich in der Schweiz Parfum kaufen?',
      a: 'Online zum Beispiel bei Notino.ch oder Manor.ch, in vielen Städten auch bei Marionnaud, Import Parfumerie oder Manor. Preise vergleichen lohnt sich.'
    },
    {
      q: 'Wie finde ich meinen Duft, nicht nur eine Marke?',
      a: 'Mit unserem Duft-Quiz. Es fragt nach deinen Vorlieben und schlägt dir passende Düfte vor.'
    }
  ],
  'die-besten-lattafa-duefte': [
    {
      q: 'Woher kommt Lattafa?',
      a: 'Aus den Vereinigten Arabischen Emiraten.'
    },
    {
      q: 'Warum ist Lattafa so beliebt?',
      a: 'Die Düfte sind warm, oft kräftig und kosten wenig. Bekannt wurde die Marke vor allem über Social Media.'
    },
    {
      q: 'Sind Lattafa-Düfte Dupes?',
      a: 'Einige werden mit teuren Originalen verglichen, etwa Asad mit Dior Sauvage Elixir. Sie gehen in eine ähnliche Richtung, riechen aber nicht genau gleich.'
    },
    {
      q: 'Welcher Lattafa-Duft ist am vielseitigsten?',
      a: 'Yara trägt man fast das ganze Jahr. Khamrah passt am besten in Herbst und Winter. Wer es leichter mag, schaut sich Mayar an.'
    },
    {
      q: 'Wo kaufe ich Lattafa in der Schweiz?',
      a: 'Zum Beispiel online bei Notino.ch. Bei Bestellungen aus dem Ausland auf Versand und Zoll achten.'
    }
  ],
  'die-besten-armaf-duefte': [
    {
      q: 'Woher kommt Armaf?',
      a: 'Aus Dubai in den Vereinigten Arabischen Emiraten.'
    },
    {
      q: 'Wofür ist Armaf bekannt?',
      a: 'Vor allem für die Club-de-Nuit-Reihe, die viel Duft für wenig Geld bietet.'
    },
    {
      q: 'Ist Club de Nuit Intense Man ein Dupe von Creed Aventus?',
      a: 'Er gilt als eine der bekanntesten günstigen Alternativen zu Aventus und geht in eine sehr ähnliche Richtung. Genau gleich riecht er aber nicht.'
    },
    {
      q: 'Hat Armaf auch Damendüfte?',
      a: 'Ja, zum Beispiel Club de Nuit Woman und Vanity Femme.'
    },
    {
      q: 'Wo kaufe ich Armaf in der Schweiz?',
      a: 'Zum Beispiel online bei Notino.ch. Preise vergleichen lohnt sich.'
    }
  ],
  'die-besten-herbstduefte': [
    {
      q: 'Welche Düfte passen in den Herbst?',
      a: 'Würzige, holzige und leicht süsse Düfte. Sie wärmen, sind aber noch nicht so schwer wie typische Winterdüfte.'
    },
    {
      q: 'Welche Noten sind typisch für den Herbst?',
      a: 'Zimt, Kardamom, Tabak, Tonkabohne, Leder und warmes Holz.'
    },
    {
      q: 'Kann ich Herbstdüfte auch im Winter tragen?',
      a: 'Ja. Gerade würzig-holzige Düfte passen gut in beide Jahreszeiten.'
    },
    {
      q: 'Wann wechsle ich auf Herbstdüfte?',
      a: 'Sobald es spürbar kühler wird. Leichte Sommerdüfte wirken dann oft dünn.'
    },
    {
      q: 'Gibt es günstige Herbstdüfte?',
      a: 'Ja, zum Beispiel Lattafa Khamrah, Armaf Club de Nuit Intense Man oder Davidoff Zino.'
    }
  ],
  'die-besten-nischenduefte': [
    {
      q: 'Was ist ein Nischenduft?',
      a: 'Ein Duft von einem kleineren, spezialisierten Haus, das nicht für den Massenmarkt arbeitet. Nischendüfte sind oft eigenständiger und ungewöhnlicher.'
    },
    {
      q: 'Sind Nischendüfte besser als Designer-Düfte?',
      a: 'Nicht automatisch. Es kommt darauf an, ob dir der Duft gefällt.'
    },
    {
      q: 'Lohnt sich der höhere Preis?',
      a: 'Wenn dir ein besonderer, eigenständiger Duft wichtig ist, kann er sich lohnen. Teste aber immer zuerst eine Probe.'
    },
    {
      q: 'Welche Nischendüfte eignen sich für den Einstieg?',
      a: 'Le Labo Santal 33 und Byredo Bal d’Afrique werden oft als Einstieg genannt. Die Replica-Linie von Maison Margiela ist keine echte Nische, wird aber gerne als Zwischenschritt empfohlen.'
    },
    {
      q: 'Wo kaufe ich Nischendüfte in der Schweiz?',
      a: 'Online zum Beispiel bei Notino.ch oder Flaconi.ch, direkt bei den Marken oder in ausgewählten Parfümerien. Bestell wenn möglich zuerst eine Probe.'
    }
  ],
  'die-besten-sommerduefte-frauen': [
    {
      q: 'Welcher Sommerduft für Frauen hält am längsten?',
      a: 'Meist die cremigeren Düfte mit Vanille, Kokos oder Moschus. Reine Zitrus- und Wasserdüfte verfliegen schneller.'
    },
    {
      q: 'Welcher Sommerduft passt ins Büro?',
      a: 'Frische, saubere Düfte wie Light Blue von Dolce & Gabbana oder Acqua di Gioia von Armani. Sparsam gesprüht stören sie niemanden.'
    },
    {
      q: 'Welches Parfum riecht nach Sommer und Sonne?',
      a: 'Düfte mit Kokos, Zitrus oder Orangenblüte. Viele denken auch an den Cheirosa-62-Body-Mist von Sol de Janeiro mit Pistazie und Karamell.'
    },
    {
      q: 'Wie viel Parfum trage ich im Sommer auf?',
      a: 'Weniger als im Winter. Ein bis zwei Sprühstösse reichen. Lieber später nachsprühen.'
    },
    {
      q: 'Gibt es günstige Sommerdüfte für Frauen?',
      a: 'Ja, zum Beispiel DKNY Be Delicious oder Lattafa Yara. Auch Body Mists sind eine günstige, leichte Option für heisse Tage.'
    }
  ],
  'creed-aventus-guenstige-alternativen': [
    {
      q: 'Was ist die beste günstige Alternative zu Creed Aventus?',
      a: 'Am häufigsten wird Armaf Club de Nuit Intense Man genannt. Er hat ebenfalls Ananas, Birke und Moschus, ist am Anfang aber rauchiger.'
    },
    {
      q: 'Riecht Club de Nuit Intense genau wie Aventus?',
      a: 'Nein. Er geht sehr ähnlich in dieselbe Richtung, aber im direkten Vergleich merkt man Unterschiede, vor allem in den ersten Minuten.'
    },
    {
      q: 'Hält Club de Nuit Intense lange?',
      a: 'Viele Leute auf Parfumo und Fragrantica beschreiben ihn als langanhaltend und kräftig. Wie lange er bei dir hält, hängt auch von deiner Haut ab.'
    },
    {
      q: 'Ist Creed Aventus seinen Preis wert?',
      a: 'Das musst du selbst entscheiden. Wer Aventus liebt, findet ihn jeden Franken wert. Wer einfach diese Duftrichtung mag, kommt mit einer Alternative gut aus.'
    },
    {
      q: 'Gibt es Aventus auch für Frauen?',
      a: 'Ja, Creed hat 2016 Aventus for Her herausgebracht. Er ist fruchtig und blumig und riecht ganz anders als die Herrenversion.'
    }
  ],
  'lattafa-dupes-welches-original': [
    {
      q: 'Sind Lattafa-Düfte Dupes?',
      a: 'Lattafa nennt sie nicht so. Es sind eigene Düfte, von denen einige sehr ähnlich wie bekannte Originale riechen.'
    },
    {
      q: 'Welche Lattafa-Düfte sind am bekanntesten?',
      a: 'Khamrah (süss und würzig), Asad (würzig mit Pfeffer) und Yara (cremig und süss) gehören zu den bekanntesten.'
    },
    {
      q: 'Mit welchem Original wird Khamrah verglichen?',
      a: 'Mit Kilian Angels’ Share. Khamrah ist süsser und würziger, Angels’ Share riecht stärker nach Cognac.'
    },
    {
      q: 'Mit welchem Original wird Asad verglichen?',
      a: 'Meistens mit Dior Sauvage Elixir. Beide sind würzig und warm, gleich sind sie aber nicht.'
    },
    {
      q: 'Hat Yara ein Original?',
      a: 'Yara wird selten mit einem bestimmten Duft verglichen. Er gilt eher als eigener cremig-süsser Duft.'
    }
  ],
  'parfum-fuer-junge-leute-unter-60-franken': [
    {
      q: 'Welches Parfum ist gut für Teenager?',
      a: 'Etwas Unkompliziertes, das frisch oder leicht süss ist, zum Beispiel Davidoff Cool Water, Lattafa Yara oder Sol de Janeiro Cheirosa 62.'
    },
    {
      q: 'Welcher günstige Duft hält lange?',
      a: 'Lattafa (etwa Khamrah oder Yara) und Armaf Club de Nuit Intense Man werden oft als langanhaltend beschrieben. Wie lange ein Duft hält, hängt aber auch von deiner Haut ab.'
    },
    {
      q: 'Wie viel sollte ein erster Duft kosten?',
      a: 'Unter 60 Franken findest du schon viele beliebte Düfte. Teste zuerst eine Probe, bevor du einen grossen Flakon kaufst.'
    },
    {
      q: 'Lohnt sich ein Discovery Set?',
      a: 'Ja, gerade am Anfang. Mit mehreren kleinen Proben lernst du viele Düfte kennen, bevor du dich für einen entscheidest.'
    }
  ],
  'date-duefte-sommer': [
    {
      q: 'Welcher Duft kommt beim Date gut an?',
      a: 'Frische Düfte mit einem warmen Kern. Bei den Damen zum Beispiel Coco Mademoiselle, bei den Herren Versace Eros oder Dior Sauvage.'
    },
    {
      q: 'Wie viel Parfum trage ich beim Date auf?',
      a: 'Ein bis zwei Sprühstösse. Es reicht, wenn man den Duft aus der Nähe riecht.'
    },
    {
      q: 'Süss oder frisch fürs Sommer-Date?',
      a: 'Eher frisch mit etwas Wärme darunter. Sehr süsse Düfte können bei Hitze aufdringlich wirken.'
    },
    {
      q: 'Wann soll ich den Duft auftragen?',
      a: 'Etwa eine Viertelstunde vorher. Dann ist der Alkohol verflogen und der Duft hat sich gesetzt.'
    }
  ],
  'zara-parfum-dupes-welches-original': [
    {
      q: 'Sind Zara-Parfums echte Dupes?',
      a: 'Zara nennt sie nicht so. Viele werden aber mit bekannten Originalen verglichen und gehen sehr ähnlich in deren Richtung.'
    },
    {
      q: 'Welcher Zara-Duft ist der bekannteste Dupe?',
      a: 'Zara Red Temptation, der mit Baccarat Rouge 540 verglichen wird. Bekannt sind auch Red Vanilla (La Vie est Belle) und Gardenia (Black Opium).'
    },
    {
      q: 'Halten Zara-Parfums lange?',
      a: 'Meist etwas weniger lang als die Originale. Für den Alltag reicht es oft trotzdem.'
    },
    {
      q: 'Wo kaufe ich Zara-Parfums in der Schweiz?',
      a: 'In den Zara-Filialen und online auf zara.com/ch. Nicht jeder Duft ist immer erhältlich, das Sortiment wechselt.'
    }
  ],
  'die-besten-sommerduefte-maenner': [
    {
      q: 'Welche Sommerdüfte für Männer sind besonders beliebt?',
      a: 'Armani Acqua di Giò ist seit Jahren einer der bekanntesten. Ebenfalls sehr beliebt sind Davidoff Cool Water, Versace Dylan Blue und Chanel Allure Homme Sport.'
    },
    {
      q: 'Wie lange hält ein frischer Männerduft im Sommer?',
      a: 'Frische Düfte halten meist weniger lang als warme. Am Mittag nachzusprühen ist völlig normal.'
    },
    {
      q: 'Gibt es günstige Sommerdüfte für Männer?',
      a: 'Ja. Davidoff Cool Water ist ein günstiger Klassiker. Auch Armaf und Lattafa haben frische Herrendüfte.'
    },
    {
      q: 'EdT oder EdP im Sommer?',
      a: 'Im Sommer ist ein Eau de Toilette oft angenehmer, weil es leichter ist. Ein EdP geht auch, dann aber sparsam sprühen.'
    }
  ],
  'parfum-trends-2026': [
    {
      q: 'Was sind die grössten Parfum-Trends 2026?',
      a: 'Süsse Dessert-Düfte mit Pistazie und Schokolade, hautnahe Moschusdüfte, günstige Alternativen zu teuren Originalen und Unisex-Düfte.'
    },
    {
      q: 'Was ist ein hautnaher Duft?',
      a: 'Ein Duft, der nah am Körper bleibt und eher nach warmer, sauberer Haut riecht als nach Parfum. Oft mit Moschus oder Ambroxan.'
    },
    {
      q: 'Sind Unisex-Düfte ein Trend?',
      a: 'Ja. Immer mehr Leute wählen nach dem Duft und nicht nach dem Etikett „für sie“ oder „für ihn“.'
    },
    {
      q: 'Muss ich Trends folgen?',
      a: 'Nein. Trends sind eine Anregung. Am Ende zählt, ob du dich mit dem Duft wohlfühlst.'
    }
  ],
  'parfum-im-handgepaeck-reise-tipps': [
    {
      q: 'Wie viel Parfüm darf ich im Handgepäck mitnehmen?',
      a: 'An den meisten Flughäfen Behälter bis 100 ml, alle zusammen in einem 1-Liter-Beutel. In Zürich gilt seit Juni 2026 für lokal abfliegende Reisende eine Grenze von 2 Litern pro Behälter.'
    },
    {
      q: 'Gilt die Lockerung in Zürich auch für den Rückflug?',
      a: 'Nein, auf dem Rückflug gelten die Regeln des Flughafens am Ferienort. Hat er keine neuen Scanner, gilt dort weiterhin die 100-ml-Regel.'
    },
    {
      q: 'Wie nehme ich einen grossen Flakon mit?',
      a: 'Im aufgegebenen Gepäck, gut gepolstert und aufrecht. Ein Plastikbeutel schützt den Koffer, falls etwas ausläuft.'
    },
    {
      q: 'Wie viel Parfüm darf in den Koffer?',
      a: 'Nach den IATA-Regeln für Toilettenartikel höchstens 0,5 Liter pro Behälter und insgesamt 2 Liter pro Person.'
    },
    {
      q: 'Verändert sich der Duft auf Reisen?',
      a: 'Normalerweise nicht. Hitze und direktes Licht können ihm aber schaden, zum Beispiel im heissen Auto.'
    }
  ],
  'parfum-und-hauttyp-was-passt-zu-meiner-haut': [
    {
      q: 'Warum riecht Parfüm auf meiner Haut anders als im Laden?',
      a: 'Haut, Wärme und Feuchtigkeit beeinflussen, wie ein Duft riecht und wie lange er hält. Darum solltest du immer auf der eigenen Haut testen.'
    },
    {
      q: 'Hält Parfüm auf trockener Haut kürzer?',
      a: 'Ja, meistens. Eine Lotion ohne Duft vor dem Aufsprühen hilft, dass er länger hält.'
    },
    {
      q: 'Wo soll ich Parfüm auftragen?',
      a: 'An warmen Stellen wie Handgelenk, Hals, hinter den Ohren oder in der Armbeuge. Dort entfaltet sich der Duft gut.'
    },
    {
      q: 'Kann ich mit empfindlicher Haut Parfüm tragen?',
      a: 'Meistens ja. Teste zuerst an einer kleinen Stelle, zum Beispiel in der Armbeuge, und sprüh im Zweifel auf die Kleidung statt auf die Haut.'
    }
  ],
  'vegane-tierversuchsfreie-parfums': [
    {
      q: 'Was bedeutet „vegan“ bei Parfüms?',
      a: 'Ein veganes Parfüm enthält keine tierischen Stoffe, also zum Beispiel keinen echten Moschus, keine Ambra und kein Bienenwachs.'
    },
    {
      q: 'Sind tierversuchsfreie Parfüms auch vegan?',
      a: 'Nicht unbedingt. Tierversuchsfrei heisst, dass nicht an Tieren getestet wurde. Tierische Stoffe können trotzdem drin sein.'
    },
    {
      q: 'Wie erkenne ich ein veganes Parfüm?',
      a: 'Achte auf Siegel wie „PETA Cruelty-Free and Vegan“ oder das Siegel der Vegan Society, oder schau auf der Website der Marke nach.'
    },
    {
      q: 'Riecht ein veganes Parfüm anders?',
      a: 'Meistens nicht. Tierische Stoffe werden in der heutigen Parfümerie ohnehin fast immer durch synthetische ersetzt.'
    }
  ],
  'parfum-proben-abfuellungen-schweiz': [
    {
      q: 'Wo bekomme ich Parfüm-Proben in der Schweiz?',
      a: 'In Parfümerien wie Manor oder Marionnaud, manchmal als Beigabe bei einem Kauf. Abfüllungen gibt es auch online, etwa in der Parfumo-Community oder auf Ricardo.'
    },
    {
      q: 'Was ist der Unterschied zwischen einer Probe und einer Abfüllung?',
      a: 'Eine Probe ist meist ein offizielles Fläschchen der Marke mit 1 bis 2 ml. Eine Abfüllung ist eine kleine Menge, die jemand aus einem grossen Flakon abgefüllt hat.'
    },
    {
      q: 'Wie lange reicht eine 2-ml-Probe?',
      a: 'Für mehrere Tage. Das reicht, um zu merken, ob du den Duft auf deiner Haut magst.'
    },
    {
      q: 'Sind Abfüllungen von Privatpersonen sicher?',
      a: 'Meistens ja. Kauf aber nur bei Verkäufern mit guten Bewertungen, damit du sicher sein kannst, dass der Duft echt ist.'
    }
  ],
  'die-besten-erdbeer-duefte': [
    {
      q: 'Welche Parfüms riechen nach Erdbeere?',
      a: 'Bekannte Beispiele sind Burberry Her, YSL Mon Paris und Victoria’s Secret Bombshell. Bei allen dreien steht Erdbeere in den Duftnoten.'
    },
    {
      q: 'Sind Erdbeer-Düfte nur für den Sommer?',
      a: 'Im Sommer passen sie besonders gut. Mit Vanille oder Karamell funktionieren sie aber auch im Winter.'
    },
    {
      q: 'Gibt es günstige Erdbeer-Düfte?',
      a: 'Ja, viele günstige Marken haben fruchtig-süsse Düfte mit roten Beeren. Schau vor dem Kauf in die Duftnoten.'
    },
    {
      q: 'Was ist der Unterschied zwischen Erdbeere und roten Früchten?',
      a: 'Bei einem Erdbeer-Duft steht die Erdbeere im Vordergrund. „Rote Früchte“ ist eine Mischung, oft mit Himbeere, Kirsche oder Johannisbeere.'
    }
  ]
};

export function getGuideFaqs(slug: string): GuideFaq[] {
  return guideFaqs[slug] ?? [];
}
