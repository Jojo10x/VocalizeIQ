import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from './AuthProvider';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;