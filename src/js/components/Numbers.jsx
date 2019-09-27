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

    componentDidMount() {
        const { currentNumber } = this.state;
        const { currentLanguage } = this.props;
        this.speak(numbers[currentLanguage][currentNumber]);
    }

    speak = (newNumber) => {
        const { msg } = this.props;
        msg.text = newNumber;
        speechSynthesis.speak(msg);
    }

    prevNumber = () => {
        const { currentNumber } = this.state;
        const newNumber = currentNumber <= 1 ? numbersAmount : currentNumber - 1;
        this.setState({
            currentNumber: newNumber
        });
        this.speak(newNumber);
    }

    nextNumber = () => {
        const { currentNumber } = this.state;
        const newNumber = currentNumber >= numbersAmount ? 1 : currentNumber + 1;
        this.setState({
            currentNumber: newNumber
        });
        this.speak(newNumber);
    }

    render() {
        const { currentNumber } = this.state;
        const { currentLanguage } = this.props;
        const heading = currentLanguage === 'english' ? 'Numbers in English' : 'Numeros en Español';
        const digitsClass = currentNumber > 99 ? 'cards__number cards__number--3-digits' : 'cards__number';
        return (
            <div className="cards cards--numbers">
                <h1 className="cards__heading">{heading}</h1>
                <div className="cards__card">
                    <div className={digitsClass}>{currentNumber}</div>
                    <div className="cards__number-word">{numbers[currentLanguage][currentNumber]}</div>
                </div>
                <div className="cards__btn-container">
                    <button type="button" className="cards__btn cards__btn--prev" onClick={this.prevNumber} aria-label="Previous"><i className="icon-long-arrow-left" /></button>
                    <button type="button" className="cards__btn cards__btn--next" onClick={this.nextNumber} aria-label="Next"><i className="icon-long-arrow-right" /></button>
                </div>
            </div>
        );
    }
}

Numbers.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    msg: PropTypes.instanceOf(SpeechSynthesisUtterance).isRequired
};