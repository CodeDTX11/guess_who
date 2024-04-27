import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndgamePageComponent } from './endgame-page.component';

describe('EndgamePageComponent', () => {
  let component: EndgamePageComponent;
  let fixture: ComponentFixture<EndgamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndgamePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndgamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
