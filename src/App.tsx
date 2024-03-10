import Auth from "./pages/Auth";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import Nav from "./ui/Nav";

import { useAuth } from "./hooks/useAuth";

function App() {
  // check auth
  const { auth } = useAuth();

  //data for list is coming from the local storage

  return (
    <AppLayout>
      {auth ? <Home /> : <Auth />}
      <Nav />
    </AppLayout>
  );
}

export default App;
