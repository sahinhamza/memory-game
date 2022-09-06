import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

export const CardSlice = createSlice({
    name: "cards",
    initialState: {
        frameworks: [
            { "name": 'angular2', "close": true, "complete": false },
            { "name": 'vue', "close": true, "complete": false },
            { "name": 'react', "close": true, "complete": false },
            { "name": 'grunt', "close": true, "complete": false },
            { "name": 'phantomjs', "close": true, "complete": false },
            { "name": 'ember', "close": true, "complete": false },
            { "name": 'babel', "close": true, "complete": false },
            { "name": 'ionic', "close": true, "complete": false },
            { "name": 'gulp', "close": true, "complete": false },
            { "name": 'meteor', "close": true, "complete": false },
            { "name": 'yeoman', "close": true, "complete": false },
            { "name": 'yarn', "close": true, "complete": false },
            { "name": 'nodejs', "close": true, "complete": false },
            { "name": 'bower', "close": true, "complete": false },
            { "name": 'browserify', "close": true, "complete": false }
        ],
        openedFrameworks: [],
        finalizedFrameworks: [],
        score: 150,
    },
    reducers: {
        shuffleCard: (state) => {
            let shuffleCards = [...state.frameworks, ...state.frameworks];

            shuffleCards = shuffleCards.map(item => ({ "id": nanoid(), ...item }))
                .sort(() => Math.random() - .5);

            state.finalizedFrameworks = shuffleCards

        },
        check: (state) => {

            if ((state.openedFrameworks[0].name === state.openedFrameworks[1].name) &&
                (state.openedFrameworks[0].id !== state.openedFrameworks[1].id)) {

                state.finalizedFrameworks = state.finalizedFrameworks.map(item =>
                    item.name === state.openedFrameworks[0].name ?
                        { ...item, "complete": true } :
                        item)
                state.score += 50

            } else {
                state.finalizedFrameworks = state.finalizedFrameworks.map(item =>
                    (item.id === state.openedFrameworks[0].id) ||
                        (item.id === state.openedFrameworks[1].id) ?
                        { ...item, "close": true } :
                        item)
                state.score -= 10

            }
            state.openedFrameworks = [];
        },

        handleOpened: (state, action) => {

            if (state.openedFrameworks.length !== 2) {
                state.openedFrameworks.push(action.payload.framework);

                state.finalizedFrameworks = state.finalizedFrameworks.map(item => (
                    item.id === action.payload.framework.id ?
                        item = { ...item, "close": false } :
                        item
                ))
            }
        },
        reset: (state) => {
            state.score = 150;
            state.openedFrameworks = [];
        }

    }
})

export const { shuffleCard, handleOpened, check, reset } = CardSlice.actions;
export default CardSlice.reducer;