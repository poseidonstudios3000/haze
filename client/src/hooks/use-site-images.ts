import { useQuery } from "@tanstack/react-query";
import type { SiteImage } from "@shared/schema";

export function useSiteImages() {
  const { data: images, isLoading } = useQuery<SiteImage[]>({
    queryKey: ["/api/site-images"],
  });

  const imageMap = new Map(images?.map((img) => [img.imageKey, img.url]) || []);

  return {
    images: imageMap,
    isLoading,
    getImage: (key: string) => imageMap.get(key),
  };
}
