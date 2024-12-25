import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// 自定义渲染函数，包含必要的providers
export function renderWithProviders(ui: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}

// 创建模拟响应
export function createMockResponse(data: any) {
  return {
    ok: true,
    json: async () => data,
  };
}

// 等待元素加载
export async function waitForElement(callback: () => Promise<Element | null>) {
  let element = null;
  const maxAttempts = 50;
  let attempts = 0;

  while (!element && attempts < maxAttempts) {
    element = await callback();
    if (!element) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
  }

  return element;
} 