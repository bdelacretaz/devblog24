// Scripts specific to the developer blog
import { getAuthorId } from './authors.js';
import {
  buildBlock,
  getMetadata
} from './lib-franklin.js';

function loadWebComponents() {
  // List all components here that are found
  // in our web-components folder. This function
  // loads those which are found in the document.
  [
    //'author-card',
    //'tag-page',
    'posts-list',
    'inline-gist'
  ].forEach(name => {
    if(document.querySelector(name)) {
      const script = document.createElement('script');
      script.setAttribute('src', `/web-components/${name}.js`);
      script.setAttribute('type', 'module');
      document.head.append(script);
    }
  })
}

/*
function buildTagsBlock(main) {
  const tagsArray = [...document.head.querySelectorAll('meta[property="article:tag"]')].map((el) => el.content) || [];
  const tagsBlock = buildBlock('tags', tagsArray.join(', '));
  const title = main.querySelector('h1');
  title?.parentNode.insertBefore(tagsBlock, title.nextSibling);
}

function buildAuthorCardBlock(main) {
  const title = main.querySelector('h1');
  const author = getMetadata('author');
  if(title && author) {
    const c = document.createElement('author-card');
    c.setAttribute('name', author);
    c.setAttribute('id', getAuthorId(author));
    c.setAttribute('date', getMetadata('m_date'));
    title.parentNode.insertBefore(c, title.nextSibling);
  }
}

function getTagFromUrl() {
  const path = window.location.pathname;
  const result = path.match(/\/tagged\/(.*)$/);
  return result?.[1];
}

function buildTagsPage(main) {
  if(main.parentNode?.localName == 'body') {
    const tag = getTagFromUrl();
    const c = document.createElement('posts-list');
    c.setAttribute('tags', tag);
    c.setAttribute('title', `${tag} tag`);
    main.append(c);
  }
}
*/

// Gists are not separated as blocks in the original content, need
// to process them inline
function processGists(main) {
  main.querySelectorAll('a[href^="https://gist.github.com/"]').forEach(a => {
    const ig = document.createElement('inline-gist');
    ig.setAttribute('href', a.href);
    a.replaceWith(ig);
  })
}

export async function buildDevblogBlocks(main) {
  if(window.location.pathname.match(/^\/en\/topics\//)) {
    //buildTagsPage(main);
  } else {
    //buildAuthorCardBlock(main);
    //buildTagsBlock(main);
    processGists(main);
  }
  loadWebComponents();
}

/*
// Extracts data from a block, using the first
// column as names and second column as values
export function getBlockData(block) {
  let result = {};
  block.querySelectorAll('div').forEach(div => {
    const name = div.querySelector('div')?.textContent;
    if(name) {
      const value = div.querySelector('div :nth-child(2)')?.textContent;
      result[name] = value;
    }
  });
  return result;
}*/