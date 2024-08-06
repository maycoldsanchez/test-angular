import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    })
    service = TestBed.inject(ValueService)
  });

  it('Shoul be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it("Sould return 'myValue'", () => {
      expect(service.getValue()).toBe('myValue');
    })

    it("Sould change 'value'", () => {
      expect(service.getValue()).toBe('myValue');
      service.setValue('newValue');
      expect(service.getValue()).toBe('newValue');
    })
  })

  describe('Test for getPromiseValue', () => {
    it("Sould return 'Promise Value'", (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('Promise Value');
        doneFn();
      })
    })

    it("Sould return 'Promise Value' async-await", async () => {
      const rtaValue = await service.getPromiseValue();
      expect(rtaValue).toBe('Promise Value');
    })
  })

  describe('Test for getObservableValue', () => {
    it("Sould return 'Observable Value'", (doneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('Observable Value');
        doneFn();
      })
    })
  })
});
