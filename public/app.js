// Small enhancement: if user clicks a link that returns JSON, show a preview panel.
document.addEventListener('click', async (e) => {
  const a = e.target.closest && e.target.closest('a.card');
  if (!a) return;
  const href = a.getAttribute('href');
  // let normal navigation occur for non-API links or docs
  if (href === '/api-docs' || href.startsWith('/auth')) return;

  e.preventDefault();
  const out = document.getElementById('output');
  out.textContent = 'Loading ' + href + ' ...';
  try {
    const res = await fetch(href, { credentials: 'include' });
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await res.json();
      out.textContent = JSON.stringify(json, null, 2);
    } else {
      const text = await res.text();
      // show a shortened preview for HTML pages
      out.textContent = text.slice(0, 2000);
    }
  } catch (err) {
    out.textContent = 'Error: ' + (err.message || err);
  }
});
