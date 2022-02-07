import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReflectorComponent } from './list-reflector.component';

describe('ListReflectorComponent', () => {
  let component: ListReflectorComponent;
  let fixture: ComponentFixture<ListReflectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReflectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReflectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
