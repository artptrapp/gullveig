import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CharacterCreationPage } from './character-creation.page';

describe('CharacterCreationPage', () => {
  let component: CharacterCreationPage;
  let fixture: ComponentFixture<CharacterCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterCreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
