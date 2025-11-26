

export default class DateUtils {
  
  /**
   * Tarih formatlama (ör: "14 Kasım 2025")
   */
  static formatDate(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  /**
   * Saat formatlama (ör: "14:35")
   */
  static formatTime(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /**
   * Hem tarih hem saat (ör: "14 Kasım 2025 • 14:35")
   */
  static formatDateTime(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }) + 
    " • " +
    date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
