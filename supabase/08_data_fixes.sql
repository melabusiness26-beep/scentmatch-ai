-- ScentMatch AI: kleine Daten-Korrekturen (Duftfamilie zweier Grenzfaelle).
-- Im Supabase SQL Editor ausfuehren. Wiederholbar.

-- Tom Ford Black Orchid: dunkel, Schokolade/Patchouli/Vanille -> passt besser zu 'gourmand' statt 'floral'.
update public.perfumes set fragrance_family = 'gourmand' where slug = 'black-orchid';

-- Creed Green Irish Tweed: gruen/frisch -> passt besser zu 'clean' statt 'woody'.
update public.perfumes set fragrance_family = 'clean' where slug = 'creed-git';
