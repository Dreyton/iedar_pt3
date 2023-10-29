import { appRoutes } from "@/constants/appRoutes";

export const checkIsPublicRoute = (pathname: string): boolean => {
  const appPublicRoutes = Object.values(appRoutes.public);
  return appPublicRoutes.includes(pathname);
}