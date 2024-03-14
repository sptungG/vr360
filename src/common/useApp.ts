import { App } from "antd";

/**
 * Antd App để đồng bộ theme vào các Portal notification, message, modal
 */
export default function useApp() {
  const { notification, message, modal } = App.useApp();
  return { notification, message, modal };
}
