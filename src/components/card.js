import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shuffleCard, handleOpened, check, reset } from "../redux/cardSlice";

export function Card() {

    const cards = useSelector(state => state.cards.finalizedFrameworks);
    const opened = useSelector(state => state.cards.openedFrameworks);
    const score = useSelector(state => state.cards.score);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(shuffleCard())
    }, [dispatch]);

    useEffect(() => {

        if (opened.length === 2) {
            setTimeout(() => dispatch(check()), 1000)
        }
    }, [dispatch, opened]);

    const handleClick = () => {
        dispatch(reset());
        dispatch(shuffleCard());
    }

    return (
        <>
            <div className="board">
                <h2>Score: {score}</h2>
                <button onClick={() => handleClick()}>↻</button>
            </div>

            <div className="playground">

                {
                    cards.map((framework, id) => (
                        <div
                            key={id}
                            className={"card" + (!framework.close ? ' opened' : '') + (framework.complete ? ' matched' : '')}
                            onClick={() => dispatch(handleOpened({ "framework": framework }))}
                        >
                            <div className="front">
                                ?
                            </div>
                            <div className="back">
                                <img
                                    src={"https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" + framework.name + ".png"}
                                    alt={framework.name}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}