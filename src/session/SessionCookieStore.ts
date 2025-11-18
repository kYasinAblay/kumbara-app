export default class SessionCookieStore {
  private static cookie: string | null = null;

  static set(cookie: string | null) {
    this.cookie = cookie;
  }

  static get() {
    return this.cookie;
  }

  static clear() {
    this.cookie = null;
  }
}
