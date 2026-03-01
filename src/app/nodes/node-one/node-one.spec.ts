import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeOne } from './node-one';

describe('NodeOne', () => {
  let component: NodeOne;
  let fixture: ComponentFixture<NodeOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeOne],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeOne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
