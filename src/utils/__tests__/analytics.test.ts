import { reportWebVitals, trackError, trackEvent } from '../analytics';

describe('Analytics Utils', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('reports web vitals correctly', () => {
    const metric = {
      id: 'test-id',
      name: 'FCP',
      label: 'web-vital',
      value: 1000,
    };

    reportWebVitals(metric);
    expect(console.log).toHaveBeenCalledWith(
      'Web Vitals FCP:',
      expect.objectContaining(metric)
    );
  });

  it('tracks errors correctly', () => {
    const error = new Error('Test error');
    const errorInfo = { componentStack: 'Test stack' };

    trackError(error, errorInfo);
    expect(console.error).toHaveBeenCalledWith(
      'Error tracked:',
      expect.objectContaining({
        error,
        errorInfo,
      })
    );
  });

  it('tracks events correctly', () => {
    const eventName = 'test_event';
    const eventData = { test: 'data' };

    trackEvent(eventName, eventData);
    expect(console.log).toHaveBeenCalledWith(
      'Event tracked:',
      expect.objectContaining({
        event: eventName,
        data: eventData,
      })
    );
  });
}); 