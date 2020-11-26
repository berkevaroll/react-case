import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Login from './Login';


function App() {
  return (
    <Login/>
  );
}

export default App;
