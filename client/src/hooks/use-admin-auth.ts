import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface SessionData {
  isAuthenticated: boolean;
  role?: "seo" | "content";
}

export function useAdminAuth() {
  const { data, isLoading } = useQuery<SessionData>({
    queryKey: ["/api/admin/session"],
    refetchOnWindowFocus: true,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ role, password }: { role: "seo" | "content"; password: string }) => {
      const res = await apiRequest("POST", "/api/admin/login", { role, password });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/session"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/logout");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/session"] });
    },
  });

  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    role: data?.role,
    isLoading,
    login: loginMutation.mutateAsync,
    loginError: loginMutation.error,
    loginPending: loginMutation.isPending,
    logout: logoutMutation.mutateAsync,
    logoutPending: logoutMutation.isPending,
  };
}
