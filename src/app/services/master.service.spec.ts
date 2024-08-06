import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';
import { MasterService } from './master.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy}
      ]
    })
    masterService = TestBed.inject(MasterService)
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>
  })

  it('Service should created', () => {
    expect(masterService).toBeTruthy()
  })

  describe('Function getValue', () => {
    // it('Should be value of real service value', () => {
    //   valueService = new ValueService()
    //   masterService = new MasterService(valueService)
    //   expect(masterService.getValue()).toBe('myValue');
    // });

    // it('Should be value of fake service value', () => {
    //   const fake = { getValue: () => 'myValue Fake'}
    //   masterService = new MasterService(fake as ValueService)
    //   expect(masterService.getValue()).toBe('myValue Fake');
    // });

    it('Should be call getValue from ValueService', () => {
      valueServiceSpy.getValue.and.returnValue('myValue Fake');
      expect(masterService.getValue()).toBe('myValue Fake');
      expect(valueServiceSpy.getValue).toHaveBeenCalled();
      expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
    });
  });
});
