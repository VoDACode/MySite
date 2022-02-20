import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemInListComponent } from './project-item-in-list.component';

describe('ProjectItemInListComponent', () => {
  let component: ProjectItemInListComponent;
  let fixture: ComponentFixture<ProjectItemInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemInListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
