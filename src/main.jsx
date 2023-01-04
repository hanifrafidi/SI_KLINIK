import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import {HashRouter} from 'react-router-dom'

import { QueryClient, QueryClientProvider } from "react-query";
 
const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </HashRouter>
    </QueryClientProvider>    
  </React.StrictMode>,
);
