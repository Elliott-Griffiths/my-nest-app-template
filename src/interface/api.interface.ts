export interface ApiInfo {
  name: string;
  version: string;
  environment: string;
  timestamp: string;
}

export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    api: {
      status: 'healthy' | 'degraded' | 'unhealthy';
      latency: number;
    };
    database?: {
      status: 'healthy' | 'degraded' | 'unhealthy';
      latency: number;
    };
  };
}

export interface ApiEndpoint {
  path: string;
  methods: string[];
  description: string;
}

export interface ApiDocumentation {
  endpoints: ApiEndpoint[];
  version: string;
  lastUpdated: string;
}
