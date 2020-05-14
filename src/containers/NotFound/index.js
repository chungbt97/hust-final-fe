import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

class NotFound extends Component {
    render() {
        return (
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>Oops!</h1>
                        <h2>Welcome my calendar</h2>
                    </div>
                    <NavLink to="/">Go Homepage</NavLink>
                </div>
            </div>
        );
    }
}

NotFound.propTypes = {};

export default NotFound;
