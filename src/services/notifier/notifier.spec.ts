import NotifierService from './';

const mockNotifier = {
  onNotification: jest.fn(),
};
const notifierService = new NotifierService();
notifierService.observe(mockNotifier);

describe('NotifierService', () => {
  beforeEach(() => {
    mockNotifier.onNotification.mockClear();
  });

  it('does nothing when no notifier is provided', () => {
    new NotifierService().showError('foo');
    expect(mockNotifier.onNotification).not.toHaveBeenCalled();
  });

  it('shows error notifications', () => {
    notifierService.showError(new Error('foo'));
    expect(mockNotifier.onNotification).toHaveBeenCalledWith({
      messageKey: 'foo',
      severity: 'error',
    });

    mockNotifier.onNotification.mockClear();

    notifierService.showError('foo_bar', { foo: 'bar' });
    expect(mockNotifier.onNotification).toHaveBeenCalledWith({
      messageKey: 'foo_bar',
      messageOptions: { foo: 'bar' },
      severity: 'error',
    });
  });

  it('shows warning notifications', () => {
    notifierService.showWarning('bar_baz', { bar: 'baz' });
    expect(mockNotifier.onNotification).toHaveBeenCalledWith({
      messageKey: 'bar_baz',
      messageOptions: { bar: 'baz' },
      severity: 'warning',
    });
  });

  it('shows information notifications', () => {
    notifierService.showInfo('baz_foo', { baz: 'foo' });
    expect(mockNotifier.onNotification).toHaveBeenCalledWith({
      messageKey: 'baz_foo',
      messageOptions: { baz: 'foo' },
      severity: 'notification',
    });
  });

  it('shows success notifications', () => {
    notifierService.showSuccess('bar_foo', { bar: 'foo' });
    expect(mockNotifier.onNotification).toHaveBeenCalledWith({
      messageKey: 'bar_foo',
      messageOptions: { bar: 'foo' },
      severity: 'success',
    });
  });
});
