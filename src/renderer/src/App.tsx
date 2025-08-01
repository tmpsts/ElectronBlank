import { HashRouter as Router, Routes, Route } from 'react-router'

import TopBar from './components/TopBar'
import HomePage from './pages/HomePage'
import SomeOtherPage from './pages/SomeOtherPage'

export default function App() {
  return (
    <Router>
      <div className="font-display no-scrollbar bg-background flex h-screen max-h-screen flex-col overflow-auto text-white select-none">
        <div className="fixed top-0 right-0 left-0 z-10 h-12">
          <TopBar />
        </div>
        <div className="flex flex-grow pt-12">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/some-other-path" element={<SomeOtherPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
