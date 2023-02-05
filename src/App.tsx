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
import Header from './components/Header';
import { useState } from 'react';
import { ConfigProvider } from 'antd';


function App() {
  const [search, setSearch] = useState<string>('')

  return (
    <>

      <QueryClientProvider client={new QueryClient()}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#EF5350',
            },
          }}
        >
          <Header />
          {/* routes to main view and detail view for pokemon */}
          <Router>
            <Routes>
              {/* main view  */}
              <Route path="/" element={<MainView />} />
              {/* detailed view */}
              <Route path="pokemon/:pokemonId" element={<DetailView />}
              />
              {/* fallback for 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </ConfigProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
