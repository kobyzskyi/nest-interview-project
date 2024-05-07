export class TabletDataChecker {
  public isTabletData(data: Record<string, unknown>): boolean {
    return (
      typeof data.brand === 'string' &&
      typeof data.model === 'string' &&
      typeof data.displaySize === 'number'
    );
  }
}
