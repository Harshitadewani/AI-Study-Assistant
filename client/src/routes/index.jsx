import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';

import DashboardPage from '../pages/DashboardPage';
import AIDoubtPage from '../pages/AIDoubtPage';
import CodingDoubtPage from '../pages/CodingDoubtPage';
import PlannerPage from '../pages/PlannerPage';
import NotesPage from '../pages/NotesPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'ai-doubt', element: <AIDoubtPage /> },
      { path: 'coding-doubt', element: <CodingDoubtPage /> },
      { path: 'planner', element: <PlannerPage /> },
      { path: 'notes', element: <NotesPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);
