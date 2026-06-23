import { buyUrl, type Perfume } from '@/lib/perfumes';

/**
 * Reusable affiliate / shop link button.
 *
 * Honest by design:
 * - When a real partner link (`affiliate_url`) exists, the button points to the
 *   partner shop, is labelled "Bei Notino ansehen" and carries
 *   rel="sponsored nofollow" plus a short commission disclosure.
 * - Without a real link the button falls back to a neutral product search and is
 *   labelled "Produkt suchen" – it must never claim to be a Notino/partner link
 *   or that we earn a commission.
 *
 * Uses the existing `affiliate_url` field – no `notino_url` or schema changes.
 */
export function AffiliateButton({
  perfume,
  label,
  showNote = true
}: {
  perfume: Perfume;
  label?: string;
  showNote?: boolean;
}) {
  const isPartnerLink = Boolean(perfume.affiliate_url);
  const text = label ?? (isPartnerLink ? 'Bei Notino ansehen →' : 'Produkt suchen →');
  // "sponsored" only applies to genuine affiliate links; the search fallback
  // is just a neutral outbound link.
  const rel = isPartnerLink
    ? 'sponsored nofollow noopener noreferrer'
    : 'nofollow noopener noreferrer';

  return (
    <>
      <a className="button buy-button" href={buyUrl(perfume)} target="_blank" rel={rel}>
        {text}
      </a>
      {showNote && isPartnerLink && (
        <p className="small buy-note affiliate-note">
          <span className="affiliate-note-icon" aria-hidden="true">ⓘ</span>
          Partner-Link – für dich ohne Mehrkosten.
        </p>
      )}
    </>
  );
}
