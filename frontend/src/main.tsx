import { createRoot } from 'react-dom/client'
import { RouterProvider} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import './index.css';
import Routes from './routes/routes';
import { NotesProvider } from './contexts/NotesContext';
import { AuthContextProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
   <ErrorBoundary fallback={"Something went Wrong"}>
   <AuthContextProvider>
   <NotesProvider>
    <RouterProvider router={Routes}/>
   </NotesProvider>
   </AuthContextProvider>
      
   </ErrorBoundary>
)
