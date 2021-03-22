import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersDetailComponent } from './users-detail.component';

describe('UsersDetailComponent', () => {
  let component: UsersDetailComponent;
  let fixture: ComponentFixture<UsersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ UsersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
