import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import { numbers, numbersAmount } from '../lib/numbers';
import { toggleMute as toggleMuteAction } from '../actions';

class Numbers extends React.Component {
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
        this.addGestures();
    }

    addGestures = () => {
        const mc = new Hammer.Manager(document.getElementById('cards__card--numbers'));
        const swipe = new Hammer.Swipe();
        mc.add(swipe);
        // Show the Next Slide
        mc.on('swipeleft', () => this.nextNumber());
        // Show the Previous Slide
        mc.on('swiperight', () => this.prevNumber());
    }

    speak = (newNumber) => {
        const { msg, isMuted } = this.props;
        msg.text = newNumber;
        if (!isMuted) {
            speechSynthesis.speak(msg);
        }
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
        const { currentLanguage, isMuted, toggleMute } = this.props;
        const heading = currentLanguage === 'english' ? 'Numbers in English' : 'Números en Español';
        const digitsClass = currentNumber > 99 ? 'cards__number cards__number--3-digits' : 'cards__number';
        const cardClass = `cards__card cards__card--${currentNumber % 14}`;
        const volumeIcon = isMuted ? 'icon-volume-mute2' : 'icon-volume-high';
        const ariaVolume = isMuted ? 'Volume Off' : 'Volume On';
        return (
            <div className="cards cards--numbers">
                <h1 className="cards__heading">{heading}</h1>
                <div id="cards__card--numbers" className={cardClass}>
                    <div className={digitsClass}>{currentNumber}</div>
                    <div className="cards__number-word">{numbers[currentLanguage][currentNumber]}</div>
                </div>
                <div className="cards__btn-container">
                    <button type="button" className="cards__btn cards__btn--prev" onClick={this.prevNumber} aria-label="Previous"><i className="icon-long-arrow-left" /></button>
                    <button type="button" className="cards__btn cards__btn--volume" onClick={toggleMute} aria-label={ariaVolume}><i className={volumeIcon} /></button>
                    <button type="button" className="cards__btn cards__btn--next" onClick={this.nextNumber} aria-label="Next"><i className="icon-long-arrow-right" /></button>
                </div>
            </div>
        );
    }
}

Numbers.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    msg: PropTypes.instanceOf(SpeechSynthesisUtterance).isRequired,
    isMuted: PropTypes.bool.isRequired,
    toggleMute: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    currentLanguage: state.controls.currentLanguage,
    isMuted: state.controls.isMuted
});

const mapDispatchToProps = (dispatch) => ({
    toggleMute: () => dispatch(toggleMuteAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Numbers);