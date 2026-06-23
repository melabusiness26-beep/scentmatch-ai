import { buyUrl, type Perfume } from '@/lib/perfumes';

/**
 * Reusable affiliate / shop link button.
 *
 * Renders a single, consistent outbound "buy" button with the correct
 * affiliate attributes. The commission disclosure is only shown when a real
 * partner link (`affiliate_url`) is set, because the fallback link points to a
 * neutral product search and earns no commission – showing the note there
 * would be misleading.
 */
export function AffiliateButton({
  perfume,
  label = 'Jetzt ansehen →',
  showNote = true
}: {
  perfume: Perfume;
  label?: string;
  showNote?: boolean;
}) {
  const isPartnerLink = Boolean(perfume.affiliate_url);
  return (
    <>
      <a
        className="button buy-button"
        href={buyUrl(perfume)}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
      >
        {label}
      </a>
      {showNote && isPartnerLink && (
        <p className="small buy-note affiliate-note">
          <span className="affiliate-note-icon" aria-hidden="true">ⓘ</span>
          Partner-Link. Bei einem Kauf erhalten wir eine Provision – für dich ohne Mehrkosten.
        </p>
      )}
    </>
  );
}
