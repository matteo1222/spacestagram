import React from 'react';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages/Home';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home/>
    </QueryClientProvider>
  );
}

export default App;
