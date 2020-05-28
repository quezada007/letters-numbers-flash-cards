import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

const Nav = ({ currentLanguage }) => {
    const match = useRouteMatch({
        path: '/',
        isExact: true
    });
    const language = currentLanguage === 'english' ? 'English' : 'Español';
    return (
        <nav className="nav">
            {match.isExact ? null : (
                <Link to="/" className="nav__back">
                    <i className="icon-chevron-left" aria-hidden="true" />
                    <span className="sr-only">Go Back</span>
                </Link>
            )}
            <div className="nav__language">{language}</div>
        </nav>
    );
};

Nav.propTypes = {
    currentLanguage: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    currentLanguage: state.controls.currentLanguage
});

export default connect(mapStateToProps)(Nav);