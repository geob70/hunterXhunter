export class Cell {
  food: boolean;
  hunter: boolean;
  empty: boolean;

  constructor(hasFood: boolean, holdHunter: boolean, isEmpty: boolean) {
    this.food = hasFood;
    this.hunter = holdHunter;
    this.empty = isEmpty;
  }

  // food methods
  setFood(): void {
    this.food = true;
  }

  removeFood(): void {
    this.food = false;
  }

  hasFood(): boolean {
    return this.food;
  }

  // hunter methods
  setHunter(): void {
    this.hunter = true;
  }

  removeHunter(): void {
    this.hunter = false;
  }

  holdHunter(): boolean {
    return this.hunter;
  }

  // empty methods
  setEmpty(value: boolean): void {
    this.empty = value;
  }
}
