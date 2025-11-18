import { useAuth } from "@/context/AuthContext"

export function useLoading() {
  const { littleLoad, showLoading, hideLoading } = useAuth();

  return {
    littleLoading: littleLoad,  // kopya yapma!
    Show: showLoading,
    Hide: hideLoading,
  };
}