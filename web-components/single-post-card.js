import { getAuthorId } from '../scripts/authors.js';

class SinglePostCard extends HTMLElement {
  static template = document.createElement('template');
  static style = `
  `;
  static {
    SinglePostCard.template.innerHTML = `
      <a class='article-card'>
        <div class='article-card-image'>
          <img>
        </div>
        <div class='article-card-body'>
          <div class='article-card-category'></div>
          <h3></h3>
        </div>
      </a>
    `;
  }
  static {
    if(document.adoptedStyleSheets) {
      const css = new CSSStyleSheet();
      css.replaceSync(SinglePostCard.style);
      document.adoptedStyleSheets.push(css);
    }
  }

  async connectedCallback() {
    const t = SinglePostCard.template.content.cloneNode(true);
    const a = t.querySelector('a');
    a.href = this.getAttribute('path');

    const img = t.querySelector('img');
    // TODO generate optimized image
    const image = this.getAttribute('image');
    if(image) {
      img.setAttribute('src', image);
    } else {
      img.remove();
    }

    t.querySelector('h3').textContent = this.getAttribute('title');

    /*
    const body = t.querySelector('#body');
    const titleA = t.querySelector('h2 > a');
    titleA.textContent = this.getAttribute('title');
    titleA.href = this.getAttribute('path');

    const authorA = t.querySelector('div[class=author] > a')
    const author = this.getAttribute('author')
    authorA.textContent = author;
    authorA.href = `/authors/${getAuthorId(author)}`;
    */


    this.append(t);
  }
}

customElements.define('single-post-card', SinglePostCard);