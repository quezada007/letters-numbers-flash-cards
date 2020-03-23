import React from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';
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
        this.speak(letters[currentLanguage][currentLetter].lowerCase);
        this.addGestures();
    }

    addGestures = () => {
        const mc = new Hammer.Manager(document.getElementById('cards__card--letters'));
        const swipe = new Hammer.Swipe();
        mc.add(swipe);
        // Show the Next Slide
        mc.on('swipeleft', () => this.nextLetter());
        // Show the Previous Slide
        mc.on('swiperight', () => this.prevLetter());
    }

    speak = (newLetter) => {
        const { msg, isMuted } = this.props;
        msg.text = newLetter;
        if (!isMuted) {
            speechSynthesis.speak(msg);
        }
    }

    prevLetter = () => {
        const { currentLetter } = this.state;
        const { currentLanguage } = this.props;
        const maxLetters = letters[currentLanguage].length - 1;
        const newLetter = currentLetter <= 0 ? maxLetters : currentLetter - 1;
        this.setState({
            currentLetter: newLetter
        });
        this.speak(letters[currentLanguage][newLetter].lowerCase);
    }

    nextLetter = () => {
        const { currentLetter } = this.state;
        const { currentLanguage } = this.props;
        const maxLetters = letters[currentLanguage].length - 1;
        const newLetter = currentLetter >= maxLetters ? 0 : currentLetter + 1;
        this.setState({
            currentLetter: newLetter
        });
        this.speak(letters[currentLanguage][newLetter].lowerCase);
    }

    render() {
        const { currentLetter } = this.state;
        const { currentLanguage, isMuted, toggleMute } = this.props;
        const heading = currentLanguage === 'english' ? 'Letters in English' : 'Letras en Español';
        const cardClass = `cards__card cards__card--${currentLetter % 14}`;
        const volumeIcon = isMuted ? 'icon-volume-high' : 'icon-volume-mute2';
        const ariaVolume = isMuted ? 'Volume On' : 'Volume Off';
        return (
            <div className="cards cards--letters">
                <h1 className="cards__heading">{heading}</h1>
                <div id="cards__card--letters" className={cardClass}>
                    <div className="cards__upper-case-letter">{letters[currentLanguage][currentLetter].upperCase}</div>
                    <div className="cards__lower-case-letter">{letters[currentLanguage][currentLetter].lowerCase}</div>
                </div>
                <div className="cards__btn-container">
                    <button type="button" className="cards__btn cards__btn--prev" onClick={this.prevLetter} aria-label="Previous"><i className="icon-long-arrow-left" /></button>
                    <button type="button" className="cards__btn cards__btn--volume" onClick={toggleMute} aria-label={ariaVolume}><i className={volumeIcon} /></button>
                    <button type="button" className="cards__btn cards__btn--next" onClick={this.nextLetter} aria-label="Next"><i className="icon-long-arrow-right" /></button>
                </div>
            </div>
        );
    }
}

Letters.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    msg: PropTypes.instanceOf(SpeechSynthesisUtterance).isRequired,
    isMuted: PropTypes.bool.isRequired,
    toggleMute: PropTypes.func.isRequired
};