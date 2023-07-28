import { Test, TestingModule } from '@nestjs/testing';
import { TalentListController } from './talent-list.controller';

describe('TalentListController', () => {
  let controller: TalentListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalentListController],
    }).compile();

    controller = module.get<TalentListController>(TalentListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
