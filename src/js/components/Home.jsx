import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { changeLanguage as changeLanguageAction } from '../actions';

class Home extends React.Component {
    changeVoice = () => {
        const { currentLanguage, changeLanguage, msg } = this.props;
        const newLanguage = currentLanguage === 'english' ? 'spanish' : 'english';
        const newVoice = currentLanguage === 'english' ? 'es-MX' : 'en-US';
        changeLanguage(newLanguage);
        [msg.voice] = speechSynthesis.getVoices().filter((voice) => voice.lang === newVoice.lang);
        msg.lang = newVoice;
    }

    render = () => {
        const language = {
            english: {
                letters: 'Letters',
                numbers: 'Numbers',
                language: 'Español'
            },
            spanish: {
                letters: 'Letras',
                numbers: 'Números',
                language: 'English'
            }
        };
        const { currentLanguage } = this.props;
        return (
            <div className="home">
                <h1>Flash Cards</h1>
                <div className="home__btns">
                    <Link to="/letters" className="button home__btn">{language[currentLanguage].letters}</Link>
                    <Link to="/numbers" className="button home__btn">{language[currentLanguage].numbers}</Link>
                    <button type="button" className="button home__btn" onClick={this.changeVoice}>{language[currentLanguage].language}</button>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    msg: PropTypes.instanceOf(SpeechSynthesisUtterance).isRequired,
    currentLanguage: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    currentLanguage: state.controls.currentLanguage
});

const mapDispatchToProps = (dispatch) => ({
    changeLanguage: (newLanguage) => dispatch(changeLanguageAction(newLanguage))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);