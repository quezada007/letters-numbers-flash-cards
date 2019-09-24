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

    prevLetter = () => {
        const { currentLetter } = this.state;
        const { currentLanguage } = this.props;
        const maxLetters = letters[currentLanguage].length - 1;
        this.setState({
            currentLetter: currentLetter <= 0 ? maxLetters : currentLetter - 1
        });
    }

    nextLetter = () => {
        const { currentLetter } = this.state;
        const { currentLanguage } = this.props;
        const maxLetters = letters[currentLanguage].length - 1;
        this.setState({
            currentLetter: currentLetter >= maxLetters ? 0 : currentLetter + 1
        });
    }

    render() {
        const { currentLetter } = this.state;
        const { currentLanguage } = this.props;
        return (
            <>
                <div>{letters[currentLanguage][currentLetter].upperCase}</div>
                <div>{letters[currentLanguage][currentLetter].lowerCase}</div>
                <button type="button" onClick={this.prevLetter}>Previous</button>
                <button type="button" onClick={this.nextLetter}>Next</button>
            </>
        );
    }
}

Letters.propTypes = {
    currentLanguage: PropTypes.string.isRequired
};