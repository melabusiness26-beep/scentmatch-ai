'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Season, SeasonPick } from '@/lib/season-fit';

const ICON: Record<Season, string> = { Frühling: '🌸', Sommer: '☀️', Herbst: '🍂', Winter: '❄️' };
const IM: Record<Season, string> = { Frühling: 'im Frühling', Sommer: 'im Sommer', Herbst: 'im Herbst', Winter: 'im Winter' };

// Jahreszeit in der Schweiz (meteorologisch): März–Mai Frühling usw.
function currentSeason(): Season {
  const month = Number(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zurich', month: 'numeric' }));
  if (month >= 3 && month <= 5) return 'Frühling';
  if (month >= 6 && month <= 8) return 'Sommer';
  if (month >= 9 && month <= 11) return 'Herbst';
  return 'Winter';
}

const SINGLE: Record<Season, string> = { Frühling: 'Frühlingsduft', Sommer: 'Sommerduft', Herbst: 'Herbstduft', Winter: 'Winterduft' };

// „Eher ein Sommerduft" bzw. „Eher ein Duft für Frühling und Sommer".
function seasonPhrase(list: Season[]): string {
  if (list.length === 1) return `ein ${SINGLE[list[0]]}`;
  return `ein Duft für ${list.slice(0, -1).join(', ')} und ${list[list.length - 1]}`;
}

export function SeasonFit({ seasons, picks }: { seasons: Season[]; picks: Record<Season, SeasonPick[]> }) {
  const [now, setNow] = useState<Season | null>(null);
  useEffect(() => setNow(currentSeason()), []);
  if (!now || seasons.length === 0) return null;

  if (seasons.includes(now)) {
    return (
      <div className="season-fit season-fit-yes">
        <span className="season-fit-icon" aria-hidden="true">{ICON[now]}</span>
        <p>
          <strong>Passt jetzt.</strong> {seasons.length === 4 ? 'Ein Duft fürs ganze Jahr, also auch' : 'Eine gute Wahl'} {IM[now]}.
        </p>
      </div>
    );
  }

  const alternatives = picks[now] || [];
  return (
    <div className="season-fit season-fit-no">
      <span className="season-fit-icon" aria-hidden="true">{ICON[seasons[0]]}</span>
      <div>
        <p>
          {alternatives.length > 0 ? (
            <>
              <strong>Eher {seasonPhrase(seasons)}.</strong> Jetzt {IM[now]} passen diese besser:
            </>
          ) : (
            <>
              <strong>Jetzt {IM[now]} eher nicht die erste Wahl.</strong> Am schönsten trägst du ihn{' '}
              {seasons.map((x) => IM[x]).join(' und ')}.
            </>
          )}
        </p>
        {alternatives.length > 0 && (
          <ul className="season-fit-list">
            {alternatives.map((a) => (
              <li key={a.slug}>
                <Link href={`/duft/${a.slug}`}>
                  {a.name}
                  {a.brand ? <span> · {a.brand}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
