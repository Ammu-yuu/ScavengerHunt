import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TouristspotPage } from './touristspot.page';

describe('TouristspotPage', () => {
  let component: TouristspotPage;
  let fixture: ComponentFixture<TouristspotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristspotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TouristspotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
