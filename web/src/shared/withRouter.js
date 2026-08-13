import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Minimal v5-compatible shim: react-router v7 dropped `withRouter` and no
// longer injects history/match/location props. This re-creates just the
// pieces the class components in this app rely on (history.push and
// match.params) using the v7 hooks, so those components don't need a
// hooks-based rewrite.
export default function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return (
      <Component
        {...props}
        history={{
          push: (path) => navigate(path),
          replace: (path) => navigate(path, { replace: true })
        }}
        location={location}
        match={{ params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
