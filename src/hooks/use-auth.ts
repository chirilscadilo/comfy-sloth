import { useAppSelector } from "./hooks";

export function useAuth() {
  const { email, uid, displayName } = useAppSelector((state) => state.user);

  return {
    //return isAuth as boolean
    isAuth: !!email,
    email,
    uid,
    displayName,
  };
}
