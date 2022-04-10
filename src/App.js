import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Mainrouter from "./components/Main/MainRoute";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <Mainrouter />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
