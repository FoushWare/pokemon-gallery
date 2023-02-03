import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// react query
import { QueryClient, QueryClientProvider } from 'react-query'
// Components
import DetailView from './components/DetailView'
import MainView from './components/MainView'
import NotFoundPage from './components/404';

function App() {

  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        {/* routes to main view and detail view for pokemon */}
        <Router>
          <Routes>
            {/* main view  */}
            <Route path="/pokemon-gallery/" element={<MainView />} />
            {/* detailed view */}
            <Route path="/pokemon-gallery/pokemon/:pokemonId" element={<DetailView />} />
            {/* fallback for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
