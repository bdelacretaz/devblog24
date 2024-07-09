import '../../web-components/single-post-card.js';

// TODO duplicated in several places
function cleanupImage (data) {
  let result = '';
  try {
    result = JSON.parse(data)[0];
  } catch (ignored) {
  }
  return result;
}

export default async function decorate(block) {
  // Expect a single link to a post
  const href = block.querySelector('a')?.href;
  if (href) {
    const path = new URL(href).pathname;
    const index = await window.devblog.index.get();
    index.data?.filter(p => p.path == path).slice(0, 1).forEach(entry => {
      const spc = document.createElement('single-post-card');
      spc.setAttribute('path', entry.path);
      spc.setAttribute('title', entry.title);
      spc.setAttribute('author', entry.author);
      spc.setAttribute('image', cleanupImage(entry.image));
      block.replaceChildren(spc);
    })
  }
}