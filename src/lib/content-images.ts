import blogHeader from "@/assets/blog-header.jpg";
import bannerPainting from "@/assets/banner-painting.jpg";
import bannerSmarthome from "@/assets/banner-smarthome.jpg";
import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerAppliance from "@/assets/banner-appliance.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";
import bannerFabrication from "@/assets/banner-fabrication.jpg";
import bannerPest from "@/assets/banner-pest.jpg";
import { API_BASE_URL } from "@/lib/api";

const contentImageMap: Record<string, string> = {
  "blog-header": blogHeader,
  "banner-painting": bannerPainting,
  "banner-smarthome": bannerSmarthome,
  "banner-electrical": bannerElectrical,
  "banner-appliance": bannerAppliance,
  "banner-cleaning": bannerCleaning,
  "banner-carpentry": bannerCarpentry,
  "banner-fabrication": bannerFabrication,
  "banner-pest": bannerPest,
  "blog-tax": bannerElectrical,
  "blog-business": bannerCleaning,
  "blog-vat": bannerCarpentry,
  "services-accounting": bannerElectrical,
  "services-consulting": bannerCleaning,
  "services-vat": bannerPainting,
};

export function resolveContentImage(key?: string | null) {
  if (!key) {
    return blogHeader;
  }

  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }

  if (key.startsWith("/") || key.startsWith("media/")) {
    try {
      const backendOrigin = new URL(API_BASE_URL, typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:8000").origin;
      return key.startsWith("/") ? `${backendOrigin}${key}` : `${backendOrigin}/${key}`;
    } catch {
      return key;
    }
  }

  return contentImageMap[key] || blogHeader;
}
