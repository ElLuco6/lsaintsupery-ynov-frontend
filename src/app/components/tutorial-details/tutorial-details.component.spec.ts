import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TutorialDetailsComponent } from './tutorial-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
 
describe('TutorialDetailsComponent', () => {
  let component: TutorialDetailsComponent;
  let fixture: ComponentFixture<TutorialDetailsComponent>;
 
  beforeEach(async () => {
    TestBed.resetTestingModule(); // reset the test module
    await TestBed.configureTestingModule({
      declarations: [TutorialDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' }),
            snapshot: {
              params: {
                id: 'testId',
              },
            },
          },
        },
      ],
    }).compileComponents();
 
    fixture = TestBed.createComponent(TutorialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 