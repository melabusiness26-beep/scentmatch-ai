-- 66_menschlichere_texte.sql
-- Neue, natürlichere Duftbeschreibungen (gleiche geprüfte Fakten, weniger schablonenhaft).
-- Einfach komplett im Supabase SQL Editor ausführen. Ändert nur Texte, sonst nichts.

UPDATE public.perfumes SET description = $t$Absolu ist die Version von Boss Bottled für den Abend. Er kam 2024 als Parfum Intense heraus, gemacht von Annick Ménardo, die schon das Original entworfen hat, zusammen mit Suzy Le Helley.

Gleich am Anfang riecht man Leder und Weihrauch. Danach kommen Patchouli und Myrrhe, und am Ende bleiben Davana und Zedernholz auf der Haut.

Auf Parfumo wird er als würzig und süss beschrieben, mit viel Holz, Leder und Harz. Er hält lange und ist gut zu riechen. Die meisten tragen ihn abends oder zum Ausgehen, am liebsten, wenn es draussen kühler wird.$t$ WHERE slug = 'boss-bottled-absolu';
UPDATE public.perfumes SET description = $t$Der Eau de Parfum von Boss Bottled kam 2020 heraus und ist nicht einfach eine stärkere Version des Klassikers. Honorine Blanc hat ihn neu gedacht, würziger als das Original.

Am Anfang stehen Apfel, Bergamotte, Pfeffer und Muskatellersalbei. In der Mitte Kardamom, Kastanie, Muskat, Salbei und Zimt. Darunter liegen Zedernholz, Sandelholz, Vetiver, Leder und Moschus.

Auf Parfumo gilt er als würzig und holzig, mit etwas Süsse, Frische und Frucht. Ein Duft für jeden Tag, ob bei der Arbeit oder in der Freizeit, und das zu jeder Jahreszeit.$t$ WHERE slug = 'boss-bottled-eau-de-parfum';
UPDATE public.perfumes SET description = $t$25 Jahre nach dem Original kam 2023 Boss Bottled Elixir heraus, ein Parfum Intense von Annick Ménardo und Suzy Le Helley.

Er startet mit Weihrauch und Kardamom, wird dann mit Patchouli und Vetiver erdiger und endet mit Labdanum und Zedernholz.

Auf Parfumo beschreiben ihn viele als würzig, holzig und rauchig, mit harzigen und orientalischen Zügen. Er hält lange. Am besten passt er laut den Stimmen zum Abend und zum Ausgehen, im Herbst und im Winter.$t$ WHERE slug = 'boss-bottled-elixir';
UPDATE public.perfumes SET description = $t$Boss Bottled Parfum erschien 2022, wieder von Annick Ménardo, diesmal zusammen mit Suzy Le Helley.

Mandarine und Weihrauch machen den Anfang. Danach kommen Feigenbaumwurzel und Iris, und zum Schluss Zedernholz und Ledernoten.

Auf Parfumo gilt er als holzig und würzig, mit etwas Süsse, Frische und Leder. Er ist ein richtiger Allrounder: fürs Büro, für die Freizeit und auch mal für den Abend, vor allem im Herbst und Winter, aber auch im Frühling.$t$ WHERE slug = 'boss-bottled-parfum';
UPDATE public.perfumes SET description = $t$Boss Bottled ist der Klassiker von Hugo Boss. Annick Ménardo hat ihn 1998 entworfen, und bis heute ist er so etwas wie das Aushängeschild der Marke. Inzwischen gibt es ihn in vielen Varianten.

Er beginnt fruchtig mit Apfel, Pflaume, Bergamotte und Zitrone. Dann wird es warm: Zimt, Gewürznelke, Rosengeranie und Mahagoni. Ganz unten liegen Vanille, Zedernholz, Sandelholz, Olivenbaum und Vetiver.

Auf Parfumo beschreiben ihn die meisten als frisch und fruchtig, mit einer süssen, holzigen und würzigen Seite. Haltbarkeit und Ausstrahlung sind solide. Die ursprüngliche Flasche hat der Designer Peter Schmidt gestaltet.$t$ WHERE slug = 'boss-bottled';
UPDATE public.perfumes SET description = $t$Cool Water Intense von 2019 stammt von Annick Ménardo. Trotz des Namens ist er keine stärkere Version des Originals, sondern ein eigener Duft: frisch und süss zugleich, mit einem Hauch Wasser.

Grüne Mandarine am Anfang, Kokoswasser in der Mitte, warmes Amber am Schluss. Vor allem das Kokoswasser macht ihn weicher und süsser als das klassische Cool Water.

Auf Parfumo ist er ein Duft für Frühling und Sommer, für jeden Tag und die Freizeit. Er hält gut, und beim Preis-Leistungs-Verhältnis schneidet er besonders gut ab.$t$ WHERE slug = 'cool-water-intense';
UPDATE public.perfumes SET description = $t$Cool Water von Davidoff kam 1988 heraus und stammt von Pierre Bourdon. Er hat die frischen, wässrigen Herrendüfte mitgeprägt und wird bis heute gern mit Green Irish Tweed von Creed verglichen.

Lavendel, Minze, Rosmarin, Koriander und grüne Noten sind das Erste, was man riecht. Danach folgen Jasmin, Neroli, Geranie und Sandelholz, und ganz unten Eichenmoos, Moschus, Amber, Tabak und Zedernholz.

Auf Parfumo gilt er als frisch und aquatisch, mit grünen Akzenten. Haltbarkeit und Ausstrahlung sind solide. Die blaue Flasche hat Peter Schmidt entworfen.$t$ WHERE slug = 'cool-water';
UPDATE public.perfumes SET description = $t$Donna kommt von La Rive, einer Marke für günstige Düfte, und wird oft als Alternative zu Light Blue von Dolce & Gabbana genannt.

Er riecht nach Zitrone und Apfel, dazu kommen Jasmin und Hyazinthe, darunter etwas Zedernholz.

Auf Parfumo gilt er als frisch und zitronig, mit wässrigen, fruchtigen und blumigen Noten. Am besten passt er in den Sommer und den Frühling, für jeden Tag. Ehrlich gesagt hält er nicht lange: Wer ihn den ganzen Tag riechen möchte, sprüht besser nach.$t$ WHERE slug = 'la-rive-donna';
UPDATE public.perfumes SET description = $t$Look of Woman von La Rive kam 2023 heraus und wird oft als günstige Alternative zu For Her Eau de Parfum von Narciso Rodriguez genannt. Auch der rosa Flakon erinnert daran.

Pfirsich und Rose am Anfang, dann Amber und Moschus, und zum Schluss Patchouli und Sandelholz.

Auf Parfumo wird er als blumig, pudrig und cremig beschrieben, und für das Preis-Leistungs-Verhältnis gibt es sehr gute Noten. Er hält etwas weniger lang und ist leiser als das Original. Ein Duft für jeden Tag, das ganze Jahr über.$t$, alternative_to = $j$[{"name": "For Her Eau de Parfum", "brand": "Narciso Rodriguez", "note": "In der Duft-Community oft als günstige Alternative zu For Her Eau de Parfum genannt. Auch der rosa Flakon erinnert daran. Er hält etwas kürzer und ist leiser als das Original."}]$j$::jsonb WHERE slug = 'la-rive-look-of-woman';
UPDATE public.perfumes SET description = $t$Zum 25. Geburtstag von Light Blue gab es 2026 diesen Eau de Parfum. Gemacht hat ihn wieder Olivier Cresp, der schon das Original von 2001 entworfen hat.

Er beginnt mit sizilianischer Zitrone, kalabrischer Bergamotte und rosa Pfeffer. Danach kommen Frangipani, Zimtrinde und Ringelblume, und am Ende Amberholz und Benzoe. Dadurch ist er blumiger und wärmer als das klassische Eau de Toilette.

Auf Parfumo gilt er als zitrisch und frisch, mit etwas Blumen, Holz und Süsse. Er hält gut.$t$ WHERE slug = 'light-blue-eau-de-parfum';
UPDATE public.perfumes SET description = $t$Light Blue Eau Intense kam 2017 heraus und stammt wie das Original von Olivier Cresp. In der Werbung waren Bianca Balti und David Gandy zu sehen, fotografiert von Mario Testino.

Sizilianische Zitrone und grüner Apfel am Anfang, dann Ringelblume und Jasmin, und zum Schluss Moschus und Amberholz.

Auf Parfumo gilt er als frisch und zitronig, fruchtig und ein wenig wässrig. Er hält gut und ist etwas kräftiger als das klassische Light Blue.$t$ WHERE slug = 'light-blue-eau-intense';
UPDATE public.perfumes SET description = $t$Light Blue Pour Homme Eau Intense kam 2017 heraus und stammt wie das Original von Alberto Morillas. In der Werbung waren David Gandy und Bianca Balti zu sehen, fotografiert von Mario Testino.

Mandarine und Grapefruit am Anfang, Wacholder und Meersalz in der Mitte, Amberholz und Moschus am Schluss.

Auf Parfumo gilt er als frisch und aquatisch, mit etwas Zitrus. Er hält gut, deutlich länger als das klassische Light Blue Pour Homme.$t$ WHERE slug = 'light-blue-pour-homme-eau-intense';
UPDATE public.perfumes SET description = $t$Light Blue Pour Homme kam 2007 heraus und stammt von Alberto Morillas. 2008 gewann er einen FiFi Award. Bekannt ist vor allem die Werbung mit David Gandy vor Capri, fotografiert von Mario Testino.

Am Anfang stehen sizilianische Mandarine, Wacholder, Grapefruit und Bergamotte. Dann folgen Pfeffer, Rosmarin und Rosenholz, und darunter Moschus, Weihrauch, Eichenmoos und Patchouli.

Auf Parfumo gilt er als frisch und zitronig, mit einer wässrigen und holzigen Seite. Er hält mittel lang. Ein leichter Duft für jeden Tag.$t$ WHERE slug = 'light-blue-pour-homme';
UPDATE public.perfumes SET description = $t$Light Blue von Dolce & Gabbana kam 2001 heraus und stammt von Olivier Cresp. Er soll nach Sommer am Mittelmeer riechen und gehört zu den bekanntesten frischen Damendüften überhaupt. 2016 kam er in die „Hall of Fame“ der Fragrance Foundation.

Am Anfang stehen sizilianische Zitrone, Apfel und Glockenblume. Dann folgen Bambus, Jasmin und weisse Rose, und darunter Zedernholz, Moschus und Amber.

Auf Parfumo gilt er als frisch und zitronig, mit einer wässrigen und fruchtigen Seite. Er hält mittel lang. Ein leichter, unkomplizierter Duft für warme Tage.$t$ WHERE slug = 'light-blue';
UPDATE public.perfumes SET description = $t$Das ist die rosa Schwester des For Her Eau de Toilette, ebenfalls von Christine Nagel und Francis Kurkdjian. Sie ist keine stärkere Version, sondern ein eigener, weicherer Duft.

Rose und Pfirsich am Anfang, Moschus und Amber in der Mitte, Patchouli und Hölzer am Schluss.

Auf Parfumo gilt er als blumig und pudrig, sanfter und rosiger als das Eau de Toilette. Man trägt ihn das ganze Jahr, und laut den Stimmen passt er besonders gut in den Alltag und ins Büro.$t$ WHERE slug = 'narciso-rodriguez-for-her-eau-de-parfum';
UPDATE public.perfumes SET description = $t$For Her Eau de Parfum Intense kam 2025 heraus und stammt von Sonia Constant. Der Name täuscht ein wenig: Er ist keine stärkere Version des rosa Eau de Parfum, sondern süss und fruchtig.

Pfirsich und Bergamotte am Anfang, Moschus und weisse Blüten in der Mitte, Vanille und Vetiver am Schluss.

Auf Parfumo scheiden sich an ihm die Geister. Viele mögen den warmen Pfirsich, andere vermissen den typischen Narciso-Moschus. Man trägt ihn das ganze Jahr, vor allem in der Freizeit und im Alltag.$t$ WHERE slug = 'narciso-rodriguez-for-her-intense';
UPDATE public.perfumes SET description = $t$For Her kam 2003 heraus und war der erste Duft des Modedesigners Narciso Rodriguez. Gemacht haben ihn Christine Nagel und Francis Kurkdjian.

Orangenblüte und Osmanthus stehen im Vordergrund, darunter liegt Moschus. Genau diesen Moschus erkennt man in der ganzen For-Her-Reihe wieder.

Auf Parfumo gilt er als blumig und pudrig, mit etwas Süsse, Holz und Frische, und er gehört dort zu den beliebtesten Damendüften. Er hält gut und passt eigentlich immer, ob im Alltag oder am Abend, zu jeder Jahreszeit.$t$, flacon_description = $t$Ein schwerer, rechteckiger Flakon aus klarem Glas mit schwarzem Innenkern. Verschluss und Sprühkopf sind ebenfalls schwarz. Schlicht, kantig und ohne Verzierungen.$t$ WHERE slug = 'narciso-rodriguez-for-her';
UPDATE public.perfumes SET description = $t$Terre d'Hermès Parfum kam 2009 heraus und stammt wie das Original von Jean-Claude Ellena. Hermès nennt ihn eine dichtere Fassung des Eau de Toilette.

Grapefruit macht den Anfang frisch und klar, Shiso bringt etwas Grünes und leicht Würziges, und Zedernholz und Benzoe geben Tiefe.

Auf Parfumo gilt er als holzig und erdig, mit frischen Zitrusnoten. Er hält lange und ist gut zu riechen, ohne aufdringlich zu sein. Viele finden ihn seriös und elegant, gut fürs Büro und für das ganze Jahr.$t$ WHERE slug = 'terre-d-hermes-parfum';
UPDATE public.perfumes SET description = $t$Terre d'Hermès kam 2006 heraus und stammt von Jean-Claude Ellena. Inspiriert haben ihn die Romane von Jean Giono, einem französischen Schriftsteller, der die Natur liebte. 2009 folgte eine Parfum-Version.

Orange und Grapefruit am Anfang. Dann kommen Feuerstein, Pfeffer, rosa Pfeffer, Geranienblatt und Patchouli, und darunter Zedernholz, Vetiver und Benzoe.

Auf Parfumo gilt er als holzig und erdig, mit frischen Zitrusnoten und etwas Würze. Er hält gut. Den Flakon hat Philippe Mouquet entworfen.$t$ WHERE slug = 'terre-d-hermes';

-- Kontrolle: sollte 19 zeigen.
SELECT count(*) AS neue_texte FROM public.perfumes WHERE description NOT LIKE '%Den Auftakt machen%' AND description NOT LIKE '%Facetten%';
