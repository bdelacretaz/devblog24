export default function decorateAuthor(blockEl) {
  const title = blockEl.querySelector('div:nth-child(1)');
  if (title) { 
    const a = document.createElement('a');
    a.classList.add('author-header-title');
    a.href = '/';
    title.replaceWith(a);
  }
  const img = blockEl.querySelector('div:nth-child(2)');
  if (img) { img.classList.add('author-header-img'); }
  const bio = blockEl.querySelector('div:nth-child(3)');
  if (bio) { bio.classList.add('author-header-bio'); }
}
