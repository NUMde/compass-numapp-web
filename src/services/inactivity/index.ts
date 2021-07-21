import { InactivityTimer } from './types';

export default class InactivityService {
  #inactivityTimers: InactivityTimer[] = [];

  getTimerByHandler(handler: TimerHandler): InactivityTimer {
    return this.#inactivityTimers.find((timer) => timer.handler === handler);
  }

  startInactivityTimer(delay: number, handler: TimerHandler) {
    this.stopInactivityTimer(handler);
    this.#inactivityTimers.push({ timeout: window.setTimeout(handler, delay), delay, handler });
  }

  stopInactivityTimer(handler: TimerHandler) {
    window.clearTimeout(this.getTimerByHandler(handler)?.timeout);
    this.#inactivityTimers = this.#inactivityTimers.filter((timer) => timer.handler !== handler);
  }

  resetInactivityTimer(handler: TimerHandler) {
    const timer = this.getTimerByHandler(handler);
    if (!timer) {
      return;
    }

    window.clearTimeout(timer.timeout);
    timer.timeout = window.setTimeout(handler, timer.delay);
  }

  resetAllInactivityTimers() {
    this.#inactivityTimers.forEach(({ handler }) => this.resetInactivityTimer(handler));
  }
}

export * from './types';
