import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProcessComponent } from './page-process.component';

describe('PageProcessComponent', () => {
  let component: PageProcessComponent;
  let fixture: ComponentFixture<PageProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
