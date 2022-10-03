import { Client, Functions } from 'appwrite';

interface Sdk {
  functions: Functions
}

interface ApiConfig {
  endpoint: string,
  projectId: string,
}

interface Api {
  sdk: Sdk | null,
  config: ApiConfig
  provider: () => Sdk,
}

const api:Api = {
  config: {
    endpoint: process.env.VUE_APP_APPWRITE_ENDPOINT,
    projectId: process.env.VUE_APP_APPWRITE_PROJECT,
  },
  sdk: null,
  provider: (): Sdk => {
    if (api.sdk) {
      return api.sdk;
    }
    const client: Client = new Client();
    console.log(process.env);
    if (process.env.VUE_APP_APPWRITE_ENDPOINT && process.env.VUE_APP_APPWRITE_PROJECT) {
      client.setEndpoint(process.env.VUE_APP_APPWRITE_ENDPOINT)
        .setProject(process.env.VUE_APP_APPWRITE_PROJECT);
    } else {
      throw new Error('Missing "VUE_APP_APPWRITE_ENDPOINT" and "VUE_APP_APPWRITE_PROJECT"');
    }

    const functions = new Functions(client);
    api.sdk = { functions };
    return api.sdk;
  },
};

export default api;
