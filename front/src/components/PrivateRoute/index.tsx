// components/ProtectRoute.js
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/constants/appRoutes';
import { checkUserAuthenticated } from '@/functions/checkUserAuthenticated';
import { useEffect } from 'react';

export interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter()

  const isAuthenticated = checkUserAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      push(appRoutes.public.login);
    }
  }, [isAuthenticated, push]);

  if (!isAuthenticated) return (<div>...</div>);

  return (
    <>
      {children}
    </>
  )

}

export default PrivateRoute;
