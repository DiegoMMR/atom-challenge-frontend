import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeConfig } from './node-config';

describe('NodeConfig', () => {
  let component: NodeConfig;
  let fixture: ComponentFixture<NodeConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
