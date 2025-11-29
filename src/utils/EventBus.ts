type Callback = (...args: any[]) => void;

class EventBus {
  private listeners: Record<string, Callback[]> = {};

  on(event: string, cb: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    // Aynı callback’in tekrar eklenmesini engelle
    if (!this.listeners[event].includes(cb)) {
      this.listeners[event].push(cb);
    }
  }

  off(event: string, cb: Callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(fn => fn !== cb);
  }

  emit(event: string, payload: any) {
    this.listeners[event]?.forEach((cb) => cb(payload));
  }
}

export default new EventBus();
