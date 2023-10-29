import { Routes, Route } from 'react-router-dom';
import * as React from 'react';

const Admin = React.lazy(() => import('../pages/admin/Admin'));
const Components = React.lazy(() => import('../pages/components/Components'));
const Home = React.lazy(() => import('../pages/home/Home'));

const Router: React.FC = () => (
  <Routes>
    <Route element={<Home />} path="/" />
    <Route element={<Admin />} path="/admin" />
    <Route element={<Components />} path="/components" />
  </Routes>
);

export default Router;
