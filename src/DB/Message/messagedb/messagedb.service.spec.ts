import { Test, TestingModule } from '@nestjs/testing';
import { MessagedbService } from './messagedb.service';

describe('MessagedbService', () => {
  let service: MessagedbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagedbService],
    }).compile();

    service = module.get<MessagedbService>(MessagedbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
