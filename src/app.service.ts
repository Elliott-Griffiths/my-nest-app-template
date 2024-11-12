import { Injectable, Logger } from '@nestjs/common';
import {
  ApiInfo,
  HealthCheck,
  ApiDocumentation,
} from './interfaces/api.interface';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly apiVersion = '1.0.0';

  /**
   * Returns basic API information
   */
  getApiInfo(): ApiInfo {
    try {
      return {
        name: 'Project Nexus API',
        version: this.apiVersion,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Error in getApiInfo: ${error.message}`);
      throw error;
    }
  }

  /**
   * Performs a health check of the API and its services
   */
  async getHealthCheck(): Promise<HealthCheck> {
    try {
      const startTime = Date.now();

      // Simulate database check - replace with real DB check
      const dbCheck = await this.checkDatabaseConnection();

      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          api: {
            status: 'healthy',
            latency: Date.now() - startTime,
          },
          database: dbCheck,
        },
      };
    } catch (error) {
      this.logger.error(`Error in getHealthCheck: ${error.message}`);
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          api: {
            status: 'unhealthy',
            latency: -1,
          },
        },
      };
    }
  }

  /**
   * Returns API documentation
   */
  getApiDocumentation(): ApiDocumentation {
    try {
      return {
        endpoints: [
          {
            path: '/api/users',
            methods: ['GET', 'POST'],
            description: 'User management endpoints',
          },
          {
            path: '/api/users/:id',
            methods: ['GET', 'PUT', 'DELETE'],
            description: 'Single user operations',
          },
          {
            path: '/health',
            methods: ['GET'],
            description: 'API health check',
          },
        ],
        version: this.apiVersion,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Error in getApiDocumentation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Checks database connection
   * @private
   */
  private async checkDatabaseConnection(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    latency: number;
  }> {
    try {
      const startTime = Date.now();
      // Replace with actual database check
      await new Promise((resolve) => setTimeout(resolve, 100));

      return {
        status: 'healthy',
        latency: Date.now() - startTime,
      };
    } catch (error) {
      this.logger.error(`Database check failed: ${error.message}`);
      return {
        status: 'unhealthy',
        latency: -1,
      };
    }
  }
}
