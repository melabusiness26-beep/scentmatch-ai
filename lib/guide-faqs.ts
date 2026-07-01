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
      a: 'Ja. Eine Duftrichtung lässt sich nicht schützen – nur Name, Flakon und Marke dürfen nicht kopiert werden. Seriöse Dupes sind eigenständige Düfte in ähnlicher Richtung.'
    },
    {
      q: 'Halten Dupes genauso lange wie das Original?',
      a: 'Oft fast so lange, manche sogar länger. Bei sehr günstigen Dupes kann die Haltbarkeit etwas kürzer ausfallen – für den Alltag sind viele aber top.'
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
    }
  ],
  'welcher-duft-zu-welchem-anlass': [
    {
      q: 'Welcher Duft passt ins Büro?',
      a: 'Dezent, sauber und frisch – nichts Schweres oder sehr Süsses. Im geschlossenen Raum wirkt ein Duft stärker, daher lieber sparsam.'
    },
    {
      q: 'Welcher Duft passt zum Date?',
      a: 'Etwas wärmer, süsser oder sinnlicher – Düfte, die angenehm in Erinnerung bleiben.'
    },
    {
      q: 'Kann ich einen Duft für alle Anlässe tragen?',
      a: 'Ja, vielseitige frisch-holzige Düfte funktionieren fast überall. Für besondere Abende darf es ruhig intensiver sein.'
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
      a: 'Natürliche Duftbestandteile wie Limonene oder Linalool, die ab einer gewissen Menge einzeln genannt werden müssen – damit Allergikerinnen und Allergiker sie erkennen. Lange waren es 26 solcher Stoffe; die EU hat die Liste inzwischen auf über 80 erweitert.'
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
      a: 'Ungeöffnet und kühl gelagert oft viele Jahre. Nach dem Öffnen entfaltet es sich am schönsten innerhalb der ersten ein bis drei Jahre.'
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
    }
  ],
  'die-besten-oud-duefte': [
    {
      q: 'Was ist Oud?',
      a: 'Oud (Agarholz) ist eine edle, intensive und warm-holzige Note – das „flüssige Gold" der orientalischen Parfümerie.'
    },
    {
      q: 'Ist in günstigen Düften echtes Oud?',
      a: 'Meist kommen hochwertige Oud-Akkorde zum Einsatz – das ist völlig normal und riecht trotzdem edel.'
    },
    {
      q: 'Wann trägt man Oud am besten?',
      a: 'In der kühlen Jahreszeit und am Abend. Oud ist intensiv und langlebig – ein Sprühstoss genügt meist.'
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
    }
  ],
  'die-besten-fruehlingsduefte': [
    {
      q: 'Welche Düfte passen in den Frühling?',
      a: 'Leichte, blumig-frische und grüne Noten mit einem Hauch Zitrus – frisch, fröhlich und nicht zu schwer.'
    },
    {
      q: 'Sind Winterdüfte im Frühling okay?',
      a: 'Schwere, süsse Winterdüfte wirken jetzt schnell zu wuchtig. Luftigere Kompositionen passen besser.'
    },
    {
      q: 'EdT oder EdP im Frühling?',
      a: 'Leichtes Eau de Parfum oder Eau de Toilette ist ideal – präsent, aber luftig.'
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
    }
  ],
  'haeufige-parfum-fehler': [
    {
      q: 'Soll ich die Handgelenke nach dem Sprühen aneinander reiben?',
      a: 'Nein. Das „bricht" die Duftmoleküle und lässt den Duft schneller verfliegen. Einfach auftragen und trocknen lassen.'
    },
    {
      q: 'Wo lagere ich Parfum am besten?',
      a: 'Kühl, dunkel und in der Originalverpackung – nicht im Badezimmer, wo Hitze und Feuchtigkeit den Duft kippen lassen.'
    },
    {
      q: 'Wann darf ich einen Duft beurteilen?',
      a: 'Erst nach 15 bis 30 Minuten auf der Haut, nicht in der ersten Minute – die Kopfnoten verfliegen schnell.'
    }
  ],
  'parfums-mit-schweizer-bezug': [
    {
      q: 'Welche Duftmarken haben Schweizer Wurzeln?',
      a: 'Zum Beispiel Chopard (Genf) und Gisada – beide mit Bezug zur Schweiz.'
    },
    {
      q: 'Warum achtet Auressa auf Schweizer Bezug?',
      a: 'Wir kuratieren in der Schweiz und achten bewusst auf CHF-Preise und Verfügbarkeit – damit du weisst, was wirklich relevant ist.'
    },
    {
      q: 'Wie finde ich meinen Duft, nicht nur eine Marke?',
      a: 'Mit unserem Duft-Quiz – es findet deine Richtung in unter einer Minute.'
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
    }
  ],
  'die-besten-sommerduefte-frauen': [
    {
      q: 'Welcher Sommerduft für Frauen hält am längsten?',
      a: 'Cremige, leicht süsse Düfte mit Vanille, Kokos oder Moschus (z. B. Lattafa Yara, Sol de Janeiro Cheirosa 62) halten länger als rein frische Zitrus- oder Wasserdüfte.'
    },
    {
      q: 'Welcher Sommerduft passt ins Büro?',
      a: 'Frisch-saubere, aquatische Düfte wie Dolce & Gabbana Light Blue oder Acqua di Gioia – dezent und nie aufdringlich.'
    },
    {
      q: 'Welches Parfum riecht nach Sommer und Sonne?',
      a: 'Sonnig-cremige Düfte mit Kokos, Pistazie oder Orangenblüte, etwa Sol de Janeiro Cheirosa 62 oder Lattafa Mayar.'
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
      a: 'Ja, oft sogar sehr lange. Club de Nuit Intense Man und Lattafa Asad sind für ihre starke Projektion und Haltbarkeit bekannt.'
    }
  ],
  'lattafa-dupes-welches-original': [
    {
      q: 'Sind Lattafa-Düfte echte Dupes?',
      a: 'Es sind eigenständige Düfte in ähnlicher Richtung wie bekannte Originale – keine exakten Kopien, aber oft verblüffend nah dran.'
    },
    {
      q: 'Welcher Lattafa-Duft ist am beliebtesten?',
      a: 'Khamrah (süss-würzig), Asad (fruchtig-rauchig) und Yara (cremig-süss) gehören zu den meistgekauften Lattafa-Düften.'
    },
    {
      q: 'Warum sind Lattafa-Düfte so günstig?',
      a: 'Die Marke produziert in grossen Mengen und setzt auf bewährte Duftrichtungen statt teurer Marketingkampagnen – daher der kleine Preis bei guter Haltbarkeit.'
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
    }
  ],
  'date-duefte-sommer': [
    {
      q: 'Welcher Duft kommt beim Date gut an?',
      a: 'Frische Düfte mit warmem Kern – sauber und nahbar, aber anziehend. Für Frauen z. B. Lattafa Yara, für Männer Versace Eros oder Stronger With You.'
    },
    {
      q: 'Wie viel Parfum trage ich beim Date auf?',
      a: 'Ein bis zwei Sprühstösse genügen. Komplimente erntet, wer aus der Nähe gut riecht – nicht, wer den ganzen Raum überduftet.'
    },
    {
      q: 'Süss oder frisch fürs Sommer-Date?',
      a: 'Im Sommer ist frisch mit einem warmen Unterton ideal. Schwere, süsse Abenddüfte können bei Hitze schnell aufdringlich wirken.'
    }
  ]
};

export function getGuideFaqs(slug: string): GuideFaq[] {
  return guideFaqs[slug] ?? [];
}
