import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupSelectionPage } from './group-selection.page';

describe('GroupSelectionPage', () => {
  let component: GroupSelectionPage;
  let fixture: ComponentFixture<GroupSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
