import "./Menu.css";

interface Props {
    setStart: (boolean: boolean) => void;
}

function Menu({ setStart }: Props) {
    return (
        <div className="menu">
            <div className="logo">
                <div className="logo-symbol-one">2</div>
                <div className="logo-symbol-two">0</div>
                <div className="logo-symbol-three">4</div>
                <div className="logo-symbol-four">8</div>
            </div>
            <div className="game-play" onClick={() => setStart(true)}>
                <p className="game-play-text">Играть</p>
            </div>
        </div>
    );
}

export default Menu;
