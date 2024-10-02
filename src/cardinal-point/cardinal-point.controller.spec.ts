import { Test, TestingModule } from '@nestjs/testing';
import { CardinalPointController } from './cardinal-point.controller';
import { CardinalPointService } from './cardinal-point.service';

describe('CardinalPointController', () => {
  let controller: CardinalPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardinalPointController],
      providers: [CardinalPointService],
    }).compile();

    controller = module.get<CardinalPointController>(CardinalPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
