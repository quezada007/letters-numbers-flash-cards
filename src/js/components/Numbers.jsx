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
        const { currentLanguage } = this.props;
        const heading = currentLanguage === 'english' ? 'Numbers in English' : 'Numeros en Español';
        return (
            <div className="cards cards--numbers">
                <h1 className="cards__heading">{heading}</h1>
                <div className="cards__card">
                    <div className="cards__number">{currentNumber}</div>
                    <div className="cards__number-word">{numbers[currentLanguage][currentNumber]}</div>
                </div>
                <div className="cards__btn__container">
                    <button type="button" className="cards__btn cards__btn--prev" onClick={this.prevNumber} aria-label="Previous"><i className="icon-long-arrow-left" /></button>
                    <button type="button" className="cards__btn cards__btn--next" onClick={this.nextNumber} aria-label="Next"><i className="icon-long-arrow-right" /></button>
                </div>
            </div>
        );
    }
}

Numbers.propTypes = {
    currentLanguage: PropTypes.string.isRequired
};