import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';
import { HealthCheck } from './interface/api.interface';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(async () => {
    mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
      localInstance: undefined,
      options: {},
    } as unknown as jest.Mocked<Logger>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: Logger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getApiInfo', () => {
    it('should return API information', async () => {
      const mockApiInfo = {
        name: 'My NestJS API',
        version: '1.0.0',
        environment: 'test',
        timestamp: new Date().toISOString(),
      };
      jest.spyOn(service, 'getApiInfo').mockReturnValue(mockApiInfo);

      const result = controller.getApiInfo();
      expect(result).toEqual(mockApiInfo);
    });

    it('should handle errors', async () => {
      jest.spyOn(service, 'getApiInfo').mockImplementation(() => {
        throw new Error('Test error');
      });

      expect(() => controller.getApiInfo()).toThrow();
    });
  });

  describe('getHealthCheck', () => {
    it('should return API documentation', async () => {
      const mockHealth: HealthCheck = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          api: {
            status: 'healthy',
            latency: 100,
          },
          database: {
            status: 'healthy',
            latency: 50,
          },
        },
      };
      jest.spyOn(service, 'getHealthCheck').mockResolvedValue(mockHealth);

      const result = await controller.getHealthCheck();
      expect(result).toEqual(mockHealth);
    });

    it('should handle errors', async () => {
      jest
        .spyOn(service, 'getHealthCheck')
        .mockRejectedValue(new Error('Test error'));

      await expect(controller.getHealthCheck()).rejects.toThrow();
    });
  });

  describe('getApiDocumentation', () => {
    it('should return API documentation', () => {
      const mockDocs = {
        endpoints: [],
        version: '1.0.0',
        description: 'API Documentation',
        basePath: '/api',
        lastUpdated: new Date().toISOString(),
      };
      jest.spyOn(service, 'getApiDocumentation').mockReturnValue(mockDocs);

      const result = controller.getApiDocumentation();
      expect(result).toEqual(mockDocs);
    });

    it('should handle errors', () => {
      jest.spyOn(service, 'getApiDocumentation').mockImplementation(() => {
        throw new Error('Test error');
      });

      expect(() => controller.getApiDocumentation()).toThrow();
    });
  });
});
