

import Layout from './components/Layout';
import { useAuth } from './context/AuthContext.jsx';
import AuthCard from './components/AuthCard.jsx';

import './styles/index.css' 
import './styles/liquid-glass.css';

const App = () => {
  const { user, loginWithGoogle, logout, loading } = useAuth();

  return (
    <>
    {user ? <Layout /> : <AuthCard />}
    
    </>
  );
}

export default App;
