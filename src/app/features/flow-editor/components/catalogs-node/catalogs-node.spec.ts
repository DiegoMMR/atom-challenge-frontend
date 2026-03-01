import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsNode } from './catalogs-node';

describe('CatalogsNode', () => {
  let component: CatalogsNode;
  let fixture: ComponentFixture<CatalogsNode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogsNode],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogsNode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
