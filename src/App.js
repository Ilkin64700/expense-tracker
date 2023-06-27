import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-toastify/dist/ReactToastify.css';
import "./sass/style.scss"
import './App.scss';
import Navbar from './components/Navbar';
import Balance from "./components/Balance";

function App() {
  // const {theme}=useContext(Context)

  return (
    <div  className="App" >
    <Navbar />
    <Balance />
    </div>
  );
}

export default App;
