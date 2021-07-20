export interface IInactivityService {
  getTimerByHandler(handler: TimerHandler): InactivityTimer;
  startInactivityTimer(delay: number, handler: TimerHandler): void;
  stopInactivityTimer(handler: TimerHandler): void;
  resetInactivityTimer(handler: TimerHandler): void;
  resetAllInactivityTimers(): void;
}

export interface InactivityTimer {
  timeout: number;
  delay: number;
  handler: TimerHandler;
}
