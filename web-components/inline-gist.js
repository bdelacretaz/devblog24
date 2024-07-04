import { loadCSS } from '../scripts/lib-franklin.js';

// This is from the embed block in the helix-website code
const jsonpGist = (url, callback) => {
  // Setup a unique name that can be called & destroyed
  const callbackName = `inline_gist_jsonp_${Math.round(100000 * Math.random())}`;

  // Create the script tag
  const script = document.createElement('script');
  script.src = `${url}${(url.indexOf('?') >= 0 ? '&' : '?')}callback=${callbackName}`;

  // Define the function that the script will call
  window[callbackName] = (data) => {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data);
  };

  // Append to the document
  document.body.appendChild(script);
};

class InlineGist extends HTMLElement {
  connectedCallback() {
    // hrefs have a trailing # anchor, remove it
    const href = this.getAttribute('href').replace(/#.*/, '');
    const url = href.slice(-2) === 'js' ? `${href}on` : `${href}.json`;
    const element = this;

    jsonpGist(url, (data) => {
      loadCSS(data.stylesheet);
      element.insertAdjacentHTML('afterend', data.div);
      element.remove();
    });
  }
}

customElements.define('inline-gist', InlineGist);