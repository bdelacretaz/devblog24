class ArticleTags extends HTMLElement {
  static template = document.createElement('template');
  static {
    ArticleTags.template.innerHTML = `<div class='article-tags'></div>`;
  }

  connectedCallback() {
    const tags = this.getAttribute('tags');
    if(tags) {
      const n = ArticleTags.template.content.cloneNode(true);
      const container = n.querySelector('div');
      tags.split(',').forEach(tag => {
        const a = document.createElement('a');
        a.href = `/topics/${tag}`;
        a.textContent = `${tag} `;
        container.append(a);
      })
      this.replaceChildren(n);
    }
  }
}

customElements.define('article-tags', ArticleTags);