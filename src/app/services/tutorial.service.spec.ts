import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TutorialService } from './tutorial.service';

describe('TutorialService', () => {
  let service: TutorialService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TutorialService]
    });
    service = TestBed.inject(TutorialService);
  });

  it('should be created', () => {
    const service: TutorialService = TestBed.get(TutorialService);
    expect(service).toBeTruthy();
  });
});
