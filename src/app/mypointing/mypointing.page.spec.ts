import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MypointingPage } from './mypointing.page';

describe('MypointingPage', () => {
  let component: MypointingPage;
  let fixture: ComponentFixture<MypointingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypointingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MypointingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
