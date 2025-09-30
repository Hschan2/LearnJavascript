import { create } from "zustand";
import { NotificationType } from "../types/notifications";

interface NotificationState {
  notifications: NotificationType[];
  latestNotification: NotificationType | null;
  setNotifications: (notifications: NotificationType[]) => void;
  addNotifications: (newNotifications: NotificationType[]) => void;
  setLatestNotification: (notification: NotificationType | null) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  latestNotification: null,
  setNotifications: (notifications) => set({ notifications }),
  addNotifications: (newNotifications) => set(state => ({ notifications: [...newNotifications, ...state.notifications] })),
  setLatestNotification: (notification) => set({ latestNotification: notification }),
}));
