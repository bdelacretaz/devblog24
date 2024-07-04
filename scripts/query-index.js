// Setup for accessing the query-index data
// TODO do we need to cache the index in a different way? Local storage ?
export class QueryIndex {
  static #index;

  static {
    if(!window.devblog) {
      window.devblog = {};
    }
    window.devblog.index = new QueryIndex();
  }

  async get() {
    if(!QueryIndex.#index) {
      // TODO multiple requests with lower limit?
      const resp = await fetch('/query-index.json?limit=9999');
      if(resp.ok) {
        QueryIndex.#index = JSON.parse(await resp.text());
      }
    }
  return QueryIndex.#index;
  }
}