export interface AuthListeners {
  onInternalError: () => void;
  onUnauthorized: () => void;
}