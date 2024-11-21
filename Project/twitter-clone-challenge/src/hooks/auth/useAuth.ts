import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect, useCallback } from "react";
import { auth } from "../../firebase";
import { AuthService } from "./authService";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsync = useCallback(
    async (action: () => Promise<boolean>): Promise<boolean> => {
      setError("");
      setLoading(true);
      try {
        return await action();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unknown error occurred."
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signUp = (name: string, email: string, password: string) =>
    handleAsync(() => AuthService.signUp(name, email, password));

  const login = (email: string, password: string) =>
    handleAsync(() => AuthService.login(email, password));

  const clearError = () => setError("");

  return {
    isLoading,
    error,
    signUp,
    login,
    clearError,
  };
};
