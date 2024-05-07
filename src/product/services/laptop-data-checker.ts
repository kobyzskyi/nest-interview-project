export class LaptopDataChecker {
  public isLaptopData(data: Record<string, unknown>): boolean {
    return (
      typeof data.brand === 'string' &&
      typeof data.model === 'string' &&
      typeof data.cpu === 'string' &&
      typeof data.ram === 'number'
    );
  }
}
