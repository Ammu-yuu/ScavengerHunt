import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TouristSpotMainPage } from './tourist-spot-main.page';

describe('TouristSpotMainPage', () => {
  let component: TouristSpotMainPage;
  let fixture: ComponentFixture<TouristSpotMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristSpotMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TouristSpotMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
