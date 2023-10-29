import { checkIsPublicRoute } from "@/functions/checkIsPublicRoute";
import { usePathname } from "next/navigation";
import PrivateRoute from "../PrivateRoute";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  const isPublicPage = checkIsPublicRoute(pathname);

  return (
    <div>
      {isPublicPage && children}
      {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
    </div>
  )
}
