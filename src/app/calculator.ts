export class Calculator {

  multuply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number |null {
    if(b===0) return null
    return a / b;
  }
}
