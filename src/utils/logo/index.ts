export function resolveLogo({
  urlString,
  size = 320,
  token,
}: {
  urlString?: string;
  size?: number;
  token?: string;
}) {
  try {
    let _urlString = urlString;

    if (!_urlString) return;

    const clearBitDomain = 'logo.clearbit.com';
    const logoDevDomain = 'img.logo.dev';

    const _host = new URL(_urlString).hostname;

    // If the URL doesn't contain Clearbit or Logo.dev domains, return it as-is
    if (_host !== clearBitDomain && _host !== logoDevDomain) {
      return _urlString;
    }

    // Replace Clearbit domain with Logo Dev domain
    if (_host === clearBitDomain) {
      _urlString = _urlString.replace(clearBitDomain, logoDevDomain);
    }

    const url = new URL(_urlString);

    // OLD - https://logo.clearbit.com/https://logo.com?size=320&format=png
    // NEW - https://img.logo.dev/logo.com?size=320&format=png&token=pk_XXXX

    // Extract the domain from the pathname (removing protocol if present)
    let domain = url.pathname.substring(1); // Remove leading slash

    // If the domain includes a protocol (from old Clearbit URLs), extract just the domain
    if (domain.startsWith('http://') || domain.startsWith('https://')) {
      try {
        const domainUrl = new URL(domain);
        domain = domainUrl.hostname;
      } catch {
        // If parsing fails, try to extract domain manually
        domain = domain.replace(/^https?:\/\//, '').split('/')[0];
      }
    }

    // Build the new Logo.dev URL
    const logoDevUrl = new URL(`https://${logoDevDomain}/${domain}`);

    // Copy over query parameters from the original URL
    url.searchParams.forEach((value, key) => {
      logoDevUrl.searchParams.set(key, value);
    });

    // Set the size parameter
    logoDevUrl.searchParams.set('size', size.toString());

    // Add the Logo.dev token if available
    if (token) {
      logoDevUrl.searchParams.set('token', token);
    }

    return logoDevUrl.toString();
  } catch {
    return undefined;
  }
}
