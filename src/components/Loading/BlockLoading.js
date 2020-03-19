import React, { Component } from 'react';

import '../../assets/css/typing.css';
class BlockLoading extends Component {
    render() {
        return (
            <div id="wave">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        );
    }
}

export default BlockLoading;
