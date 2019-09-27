import React from 'react';
import PropTypes from 'prop-types';
import letters from '../lib/letters';

export default class Letters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLetter: 0
        };
    }

    componentDidMount() {
        const { currentLetter } = this.state;
        const { currentLanguage } = this.props;
        this.speak(letters[currentLanguage][currentLetter].upperCase);
    }

    speak = (newLetter) => {
        const { msg } = this.props;
        msg.text = newLetter;
        speechSynthesis.speak(msg);
    }

    prevLetter = () => {
        const { currentLetter } = this.state;
        const { currentLanguage } = this.props;
        const maxLetters = letters[currentLanguage].length - 1;
        const newLetter = currentLetter <= 0 ? maxLetters : currentLetter - 1;
        this.setState({
            currentLetter: newLetter
        });
        this.speak(letters[currentLanguage][newLetter].upperCase);
    }

    nextLetter = () => {
        const { currentLetter } = this.state;
        const { currentLanguage } = this.props;
        const maxLetters = letters[currentLanguage].length - 1;
        const newLetter = currentLetter >= maxLetters ? 0 : currentLetter + 1;
        this.setState({
            currentLetter: newLetter
        });
        this.speak(letters[currentLanguage][newLetter].upperCase);
    }

    render() {
        const { currentLetter } = this.state;
        const { currentLanguage } = this.props;
        const heading = currentLanguage === 'english' ? 'Letters in English' : 'Letras en Español';
        return (
            <div className="cards cards--letters">
                <h1 className="cards__heading">{heading}</h1>
                <div className="cards__card">
                    <div className="cards__upper-case-letter">{letters[currentLanguage][currentLetter].upperCase}</div>
                    <div className="cards__lower-case-letter">{letters[currentLanguage][currentLetter].lowerCase}</div>
                </div>
                <div className="cards__btn-container">
                    <button type="button" className="cards__btn cards__btn--prev" onClick={this.prevLetter} aria-label="Previous"><i className="icon-long-arrow-left" /></button>
                    <button type="button" className="cards__btn cards__btn--next" onClick={this.nextLetter} aria-label="Next"><i className="icon-long-arrow-right" /></button>
                </div>
            </div>
        );
    }
}

Letters.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    msg: PropTypes.instanceOf(SpeechSynthesisUtterance).isRequired
};