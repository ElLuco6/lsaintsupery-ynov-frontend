import { ComponentFixture, TestBed } from '@angular/core/testing';
 
import { TutorialsListComponent } from './tutorials-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TutorialDetailsComponent } from '../tutorial-details/tutorial-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
 
describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialsListComponent, TutorialDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
    }).compileComponents();
 
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 