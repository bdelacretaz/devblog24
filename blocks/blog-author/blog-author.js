import { getAuthorId } from '../../scripts/authors.js';
import '../../web-components/posts-list.js';
let idToName;

export async function getAuthorName(id) {
  if(!idToName) {
    const result = {};
    const index = await window.devblog.index.get();
    index?.data?.forEach(entry => {
      if(entry.author) {
        result[getAuthorId(entry.author)] = entry.author;
      }
    })
    idToName = result;
  }
  const name = idToName[id];
  return name ? name : id;
}

export function getAuthorFromUrl() {
  const path = window.location.pathname;
  const result = path.match(/\/en\/authors\/(.*)$/);
  return result?.[1];
}

export default async function decorate($block) {
  const id = getAuthorFromUrl();
  const name = await getAuthorName(id);
  $block.innerHTML = `<div><h1>${name}</h1><img src='/images/authors/${id}.png'><h2>Posts</h2><posts-list></posts-list></div>`;
  const list = $block.querySelector('posts-list');
  list.setAttribute('author',name);
}