import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<Project />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
