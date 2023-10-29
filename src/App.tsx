import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const NavBar = React.lazy(() => import('./components/layout/NavBar'));
const Router = React.lazy(() => import('./components/Router'));

function App() {
  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      <BrowserRouter>
        <NavBar />
        <Router />
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App
