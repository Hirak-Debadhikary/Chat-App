import { Route, Routes } from "react-router-dom";
import HomeComponent from "./Components/Pages/HomeComponent";
import ChatComponent from "./Components/Pages/ChatComponent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/chats" element={<ChatComponent />}></Route>
      </Routes>
    </div>
  );
}

export default App;
