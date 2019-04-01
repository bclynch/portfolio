import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogueComponent } from './project-dialogue.component';

describe('ProjectDialogueComponent', () => {
  let component: ProjectDialogueComponent;
  let fixture: ComponentFixture<ProjectDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
