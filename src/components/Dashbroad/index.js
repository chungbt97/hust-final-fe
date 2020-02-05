import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';
import styles from './styles'
import SideBar from './SideBar';
import Topbar from './Topbar';

class Dashbroad extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        const {children, classes} = this.props;
        return (
            <div>
                <Topbar/>
                <SideBar/>
                {children}
            </div>
        )
    }
}

Dashbroad.propTypes = {
    children: PropTypes.object,
    classes: PropTypes.object
}

export default withStyles(styles)(Dashbroad);