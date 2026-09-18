export interface MailDraft {
  subject?: string
  body?: string
}

// Build a mailto: href and let the browser handle it on a real anchor click.
// Script-initiated navigation (window.location.href) is treated as automatic
// email creation, which Safari blocks behind a permission prompt before it
// hands off to whatever mailto handler the OS has registered.
export function buildMailto(email: string, draft: MailDraft = {}): string {
  const params: string[] = []
  if (draft.subject) params.push(`subject=${encodeURIComponent(draft.subject)}`)
  if (draft.body) params.push(`body=${encodeURIComponent(draft.body)}`)

  return params.length > 0
    ? `mailto:${email}?${params.join('&')}`
    : `mailto:${email}`
}
