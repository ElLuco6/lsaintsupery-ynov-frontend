

/* describe('AddTutorialComponent', () => {
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTutorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); */


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTutorialComponent } from './add-tutorial.component';
import { TutorialService } from '../../services/tutorial.service'; // Importer le service de tutoriel

describe('AddTutorialComponent', () => {
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;
  let tutorialServiceSpy: jasmine.SpyObj<TutorialService>; // Créer un espion pour le service de tutoriel

  beforeEach(async () => {
    // Créer un espion pour le service de tutoriel
    const spy = jasmine.createSpyObj('TutorialService', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ AddTutorialComponent ],
      providers: [
        { provide: TutorialService, useValue: spy } // Utiliser l'espion comme fournisseur du service
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    tutorialServiceSpy = TestBed.inject(TutorialService) as jasmine.SpyObj<TutorialService>; // Injecter l'espion du service de tutoriel
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call tutorialService.create when saveTutorial is called', () => {
    const dummyTutorial = { title: 'Test', description: 'Test description' };
    component.tutorial = dummyTutorial;
    
    component.saveTutorial();
    
    expect(tutorialServiceSpy.create).toHaveBeenCalledWith(dummyTutorial); // Vérifier si la méthode create du service de tutoriel a été appelée avec les bons arguments
  });

  it('should set submitted to true after saveTutorial is called', () => {
    component.saveTutorial();
    expect(component.submitted).toBeTrue(); // Vérifier si submitted est défini à true après l'appel de saveTutorial
  });

  it('should set submitted to false after newTutorial is called', () => {
    component.newTutorial();
    expect(component.submitted).toBeFalse(); // Vérifier si submitted est défini à false après l'appel de newTutorial
  });
});
