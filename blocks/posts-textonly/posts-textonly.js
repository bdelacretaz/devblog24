export default async function decorate(block) {
  const pl = document.createElement('posts-list');
  pl.setAttribute('text-only','true');
  pl.setAttribute('select-links','true');
  block.querySelectorAll('a').forEach(a => pl.append(a));
  block.replaceChildren(pl);
}