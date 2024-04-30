/* import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDetailsComponent } from './tutorial-details.component';

describe('TutorialDetailsComponent', () => {
  let component: TutorialDetailsComponent;
  let fixture: ComponentFixture<TutorialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialDetailsComponent } from './tutorial-details.component';
import { TutorialService } from '../../services/tutorial.service'; // Importer le service de tutoriel
import { of } from 'rxjs';

describe('TutorialDetailsComponent', () => {
  let component: TutorialDetailsComponent;
  let fixture: ComponentFixture<TutorialDetailsComponent>;
  let tutorialServiceSpy: jasmine.SpyObj<TutorialService>; // Créer un espion pour le service de tutoriel
  let mockActivatedRoute: any = { snapshot: { params: { id: '1' } } };
  let mockRouter: any = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    // Créer un espion pour le service de tutoriel
    const spy = jasmine.createSpyObj('TutorialService', ['get', 'update', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [ TutorialDetailsComponent ],
      providers: [
        { provide: TutorialService, useValue: spy }, // Utiliser l'espion comme fournisseur du service
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Fournir un ActivatedRoute mocké
        { provide: Router, useValue: mockRouter } // Fournir un Router mocké
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialDetailsComponent);
    component = fixture.componentInstance;
    tutorialServiceSpy = TestBed.inject(TutorialService) as jasmine.SpyObj<TutorialService>; // Injecter l'espion du service de tutoriel
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call tutorialService.get with correct id on ngOnInit', () => {
    const dummyTutorial = { id: '1', title: 'Test', description: 'Test description', published: false };
    tutorialServiceSpy.get.and.returnValue(of(dummyTutorial)); // Faire en sorte que la méthode get du service de tutoriel renvoie un Observable de tutoriel

    component.ngOnInit();

    expect(tutorialServiceSpy.get).toHaveBeenCalledWith('1'); // Vérifier si la méthode get du service de tutoriel a été appelée avec l'ID correct
    expect(component.currentTutorial).toEqual(dummyTutorial); // Vérifier si le tutoriel courant a été mis à jour avec les données du service
  });

  it('should call tutorialService.update when updateTutorial is called', () => {
    const dummyTutorial = { id: '1', title: 'Test', description: 'Test description', published: false };
    component.currentTutorial = dummyTutorial;

    component.updateTutorial();

    expect(tutorialServiceSpy.update).toHaveBeenCalledWith('1', dummyTutorial); // Vérifier si la méthode update du service de tutoriel a été appelée avec les bons arguments
  });

  it('should call tutorialService.delete and navigate when deleteTutorial is called', () => {
    component.deleteTutorial();

    expect(tutorialServiceSpy.delete).toHaveBeenCalledWith('1'); // Vérifier si la méthode delete du service de tutoriel a été appelée avec l'ID correct
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tutorials']); // Vérifier si la méthode navigate du Router a été appelée avec le bon chemin
  });
});
