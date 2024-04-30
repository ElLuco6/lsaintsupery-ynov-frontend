/* import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialsListComponent } from './tutorials-list.component';

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialsListComponent } from './tutorials-list.component';
import { TutorialService } from '../../services/tutorial.service';
import { of } from 'rxjs';

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;
  let tutorialServiceSpy: jasmine.SpyObj<TutorialService>; // Créer un espion pour le service de tutoriel

  beforeEach(async () => {
    // Créer un espion pour le service de tutoriel
    const spy = jasmine.createSpyObj('TutorialService', ['getAll', 'deleteAll', 'findByTitle']);

    await TestBed.configureTestingModule({
      declarations: [ TutorialsListComponent ],
      providers: [
        { provide: TutorialService, useValue: spy } // Utiliser l'espion comme fournisseur du service
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    tutorialServiceSpy = TestBed.inject(TutorialService) as jasmine.SpyObj<TutorialService>; // Injecter l'espion du service de tutoriel
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call tutorialService.getAll and set tutorials when ngOnInit is called', () => {
    const dummyTutorials = [{ id: '1', title: 'Test 1', description: 'Description 1', published: true }];
    tutorialServiceSpy.getAll.and.returnValue(of(dummyTutorials)); // Faire en sorte que la méthode getAll du service de tutoriel renvoie un Observable de tutoriels

    component.ngOnInit();

    expect(tutorialServiceSpy.getAll).toHaveBeenCalled(); // Vérifier si la méthode getAll du service de tutoriel a été appelée
    expect(component.tutorials).toEqual(dummyTutorials); // Vérifier si la liste de tutoriels a été correctement définie avec les données du service
  });

  it('should call tutorialService.deleteAll and refreshList when removeAllTutorials is called', () => {
    component.removeAllTutorials();

    expect(tutorialServiceSpy.deleteAll).toHaveBeenCalled(); // Vérifier si la méthode deleteAll du service de tutoriel a été appelée
    expect(component.tutorials).toEqual([]); // Vérifier si la liste de tutoriels a été vidée après l'appel de removeAllTutorials
  });

  it('should call tutorialService.findByTitle and set tutorials when searchTitle is called', () => {
    const dummyTutorials = [{ id: '1', title: 'Test 1', description: 'Description 1', published: true }];
    tutorialServiceSpy.findByTitle.and.returnValue(of(dummyTutorials)); // Faire en sorte que la méthode findByTitle du service de tutoriel renvoie un Observable de tutoriels

    component.title = 'Test';
    component.searchTitle();

    expect(tutorialServiceSpy.findByTitle).toHaveBeenCalledWith('Test'); // Vérifier si la méthode findByTitle du service de tutoriel a été appelée avec le bon titre
    expect(component.tutorials).toEqual(dummyTutorials); // Vérifier si la liste de tutoriels a été correctement définie avec les données du service
  });
});
