abstract class AbstractCookieAdapter {
  public abstract get(key: string): string | null;

  public abstract set(key: string, value: string): void;

  public abstract remove(key: string): void;
}

export default AbstractCookieAdapter;
