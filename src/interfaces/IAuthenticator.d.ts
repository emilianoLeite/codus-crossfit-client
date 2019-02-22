export interface IAuthenticator {
  isAuthenticated: boolean;
  authenticate: (callback: Function) => void;
}
