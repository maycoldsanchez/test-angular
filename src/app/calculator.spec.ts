import { Calculator } from './calculator';

describe('Calculator Test', () => {

  describe('Test For Multiply', () => {
    it('Multiply', () => {
      const calculator = new Calculator()
      expect(calculator.multuply(3, 3)).toEqual(9)
    });
  })

  describe('Test For Divide', () => {
    it('Divide', () => {
      const calculator = new Calculator()
      expect(calculator.divide(3, 2)).toEqual(1.5)
    })

    it('Divide by 0', () => {
      const calculator = new Calculator()
      expect(calculator.divide(3, 0)).toBeNull()
    })
  })
});
