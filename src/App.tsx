import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/Home/NewRoom';
import { Room } from './pages/Room';
import { NotFound } from "./pages/NotFound";
// import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            {/* <Route path="/admin/rooms/:id" component={AdminRoom} /> */}
            <Route path="*" component={NotFound} />
          </Switch>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
