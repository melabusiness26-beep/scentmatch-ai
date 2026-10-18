'use client';

import Link from 'next/link';
import { noteHref } from '@/lib/notes-glossary';

export function ScenePyramid({
  topNotes,
  heartNotes,
  baseNotes
}: {
  topNotes: string[] | null;
  heartNotes: string[] | null;
  baseNotes: string[] | null;
}) {
  if (!topNotes?.length && !heartNotes?.length && !baseNotes?.length) {
    return null;
  }

  return (
    <div className="scene-pyramid-wrapper">
      <svg
        className="scene-pyramid"
        viewBox="0 0 280 340"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hintergrund-Gradienten */}
        <defs>
          <linearGradient id="topGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#a8d5d9', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#7ec8d0', stopOpacity: 0.08 }} />
          </linearGradient>
          <linearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#d4a574', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#c27d47', stopOpacity: 0.08 }} />
          </linearGradient>
          <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6b5344', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#3a2a1e', stopOpacity: 0.08 }} />
          </linearGradient>
        </defs>

        {/* Basisnoten – unten (breite Pyramide) */}
        {baseNotes && baseNotes.length > 0 && (
          <g className="pyramid-section pyramid-base">
            <polygon
              points="20,280 260,280 280,330 0,330"
              fill="url(#baseGrad)"
              stroke="rgba(107, 83, 68, 0.3)"
              strokeWidth="1.5"
            />
            <text
              x="140"
              y="300"
              textAnchor="middle"
              className="pyramid-label pyramid-label-base"
            >
              Basisnoten
            </text>
          </g>
        )}

        {/* Herznoten – Mitte (mittlere Pyramide) */}
        {heartNotes && heartNotes.length > 0 && (
          <g className="pyramid-section pyramid-heart">
            <polygon
              points="60,180 220,180 260,280 20,280"
              fill="url(#heartGrad)"
              stroke="rgba(212, 165, 74, 0.3)"
              strokeWidth="1.5"
            />
            <text
              x="140"
              y="235"
              textAnchor="middle"
              className="pyramid-label pyramid-label-heart"
            >
              Herznoten
            </text>
          </g>
        )}

        {/* Kopfnoten – oben (Pyramiden-Spitze) */}
        {topNotes && topNotes.length > 0 && (
          <g className="pyramid-section pyramid-top">
            <polygon
              points="140,20 220,180 60,180"
              fill="url(#topGrad)"
              stroke="rgba(168, 213, 217, 0.3)"
              strokeWidth="1.5"
            />
            <text
              x="140"
              y="115"
              textAnchor="middle"
              className="pyramid-label pyramid-label-top"
            >
              Kopfnoten
            </text>
          </g>
        )}
      </svg>

      {/* Notenlisten */}
      <div className="pyramid-notes-grid">
        {topNotes && topNotes.length > 0 && (
          <div className="pyramid-notes-block pyramid-notes-top">
            <div className="pyramid-notes-label">Kopfnoten</div>
            <div className="pyramid-notes-list">
              {topNotes.map((note) => (
                <Link
                  key={note}
                  href={noteHref(note)}
                  className="pyramid-note-tag"
                >
                  {note}
                </Link>
              ))}
            </div>
          </div>
        )}

        {heartNotes && heartNotes.length > 0 && (
          <div className="pyramid-notes-block pyramid-notes-heart">
            <div className="pyramid-notes-label">Herznoten</div>
            <div className="pyramid-notes-list">
              {heartNotes.map((note) => (
                <Link
                  key={note}
                  href={noteHref(note)}
                  className="pyramid-note-tag"
                >
                  {note}
                </Link>
              ))}
            </div>
          </div>
        )}

        {baseNotes && baseNotes.length > 0 && (
          <div className="pyramid-notes-block pyramid-notes-base">
            <div className="pyramid-notes-label">Basisnoten</div>
            <div className="pyramid-notes-list">
              {baseNotes.map((note) => (
                <Link
                  key={note}
                  href={noteHref(note)}
                  className="pyramid-note-tag"
                >
                  {note}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
