import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchNoteSectionComponent } from './match-note-section.component';

describe('MatchNoteSectionComponent', () => {
  let component: MatchNoteSectionComponent;
  let fixture: ComponentFixture<MatchNoteSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchNoteSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchNoteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
