import React from 'react';
import PropTypes from 'prop-types';
import { numbers, numbersAmount } from '../lib/numbers';

export default class Numbers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentNumber: 1
        };
    }

    prevNumber = () => {
        const { currentNumber } = this.state;
        this.setState({
            currentNumber: currentNumber <= 1 ? numbersAmount : currentNumber - 1
        });
    }

    nextNumber = () => {
        const { currentNumber } = this.state;
        this.setState({
            currentNumber: currentNumber >= numbersAmount ? 1 : currentNumber + 1
        });
    }

    render() {
        const { currentNumber } = this.state;
        const { currentLanguage, changeLanguage } = this.props;
        return (
            <>
                <div>{currentNumber}</div>
                <div>{numbers[currentLanguage][currentNumber]}</div>
                <button type="button" onClick={this.prevNumber}>Previous</button>
                <button type="button" onClick={this.nextNumber}>Next</button>
                <button type="button" onClick={() => changeLanguage()}>Change Language</button>
            </>
        );
    }
}

Numbers.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired
};