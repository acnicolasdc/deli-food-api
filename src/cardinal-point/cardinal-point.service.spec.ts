import { Test, TestingModule } from '@nestjs/testing';
import { CardinalPointService } from './cardinal-point.service';

describe('CardinalPointService', () => {
  let service: CardinalPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardinalPointService],
    }).compile();

    service = module.get<CardinalPointService>(CardinalPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
