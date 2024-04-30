import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; // import FormsModule here
import { AddTutorialComponent } from './add-tutorial.component';
import { TutorialService } from '../../services/tutorial.service'; // import TutorialService here

describe('AddTutorialComponent', () => {
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTutorialComponent ],
      imports: [ HttpClientTestingModule, FormsModule ], // add FormsModule to imports
      providers: [ TutorialService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});