import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// react query
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider } from 'antd';
// Components
import NotFoundPage from './components/404/404';
import DetailView from './components/Pokemon/Pokemon';
import Header from './components/Shared/Header';
import MainView from './components/Pokemons/Pokemons';
// glabal styls and ant design
import './App.css';

function App() {

  return (
    <>
      {/* react query provider  */}
      <QueryClientProvider client={new QueryClient()}>
        {/* configure ant Design  */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#EF5350',
            },
          }}
        >
          {/* Header ... logo , text , search */}
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
