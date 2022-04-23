import { useState } from "react";
import "./App.css";
import Game from "./components/Game/Game";
import Menu from "./components/Menu/Menu";

function App() {
    const [start, setStart] = useState(false);

    return (
        <div className="application">
            {start ? <Game /> : <Menu setStart={setStart} />}
        </div>
    );
}

export default App;
