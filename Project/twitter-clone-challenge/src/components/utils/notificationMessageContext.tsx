import { createContext, useContext, useEffect, useState } from "react";

interface NotificationMessageContextType {
  message: string | null;
  setMessage: (msg: string | null) => void;
}

const NotificationMessageContext = createContext<
  NotificationMessageContextType | undefined
>(undefined);

export const NotificationMessageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <NotificationMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </NotificationMessageContext.Provider>
  );
};

export const useNotificationMessage = () => {
  const context = useContext(NotificationMessageContext);
  if (!context) {
    throw new Error(
      "useNotificationMessage는 NotificationMessageProvider에 있어야 합니다."
    );
  }
  return context;
};
