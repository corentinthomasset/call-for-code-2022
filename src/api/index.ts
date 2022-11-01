interface ApiConfig {
  endpoint: string,
}

interface Payload {
  query: string,
  location: string
}

interface Api {
  config: ApiConfig
  execute: (fn: string, payload: Payload) => Promise<string>,
}

const api:Api = {
  config: {
    endpoint: process.env.VUE_APP_API_ENDPOINT,
  },
  execute: (fn, payload) => fetch(`${api.config.endpoint}/${fn}?payload=${encodeURIComponent(JSON.stringify(payload))}`, {
    method: 'GET',
  }).then((response) => response.text()),
};

export default api;
