import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Home = ({ currentLanguage, changeLanguage }) => {
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
    return (
        <div className="home">
            <h1>Flash Cards</h1>
            <div className="home__btns">
                <Link to="/letters" className="button home__btn">{language[currentLanguage].letters}</Link>
                <Link to="/numbers" className="button home__btn">{language[currentLanguage].numbers}</Link>
                <button type="button" className="button home__btn" onClick={changeLanguage}>{language[currentLanguage].language}</button>
            </div>
        </div>
    );
};

Home.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired
};

export default Home;