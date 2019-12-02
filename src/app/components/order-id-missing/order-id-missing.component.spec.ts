import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderIdMissingComponent } from './order-id-missing.component';

describe('OrderIdMissingComponent', () => {
  let component: OrderIdMissingComponent;
  let fixture: ComponentFixture<OrderIdMissingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderIdMissingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderIdMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
