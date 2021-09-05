

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {decrease, increase} from './counterSlice'



CounterFeature.propTypes = {
    
};

function CounterFeature(props) {

    const dispatch = useDispatch();
    const count = useSelector(state => state.count);

    const handleIncreaseClick = () => {
        const action = increase(123);
        dispatch(action);
    }
    const handleDecreaseClick = () => {
        const action = decrease(123);
        dispatch(action);
    }

    return (
        <div>
            Count: {count}

            <div>
                <button onClick={handleIncreaseClick}>
                    Increase
                </button>
                <button onClick={handleDecreaseClick}>
                    Decrease
                </button>
            </div>

        </div>
    );
}

export default  CounterFeature;