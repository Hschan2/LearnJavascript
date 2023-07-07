import React, { useEffect, useState } from 'react'
import Route from './Route';
import { RouteProps, RoutesProps } from '../interface/RouteInterface';

const Routes = ({children}: RoutesProps) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      {children?.map((router: React.ReactElement<RouteProps>) => {
        if (router.props.path === currentPath) {
          return router;
        }
      })}
    </>
  )
}

export default Routes