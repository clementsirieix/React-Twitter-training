// @flow
import React from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button';
import TrendsList from '../components/TrendsList';
import { fetchLocation } from '../actions/locationActions';

class App extends React.Component {
    state: {
        showResults: boolean
    };
    handleClick: Function;
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            showResults: false
        };
    }
    handleClick(event: Object) {
        event.stopPropagation();
        event.preventDefault();
        navigator.geolocation.getCurrentPosition((position) => {
            this.props.fetchLocation(position.coords);
            this.setState({
                showResults: true
            });
        });
    }
    render() {
        return (
            <div className="container">
                {navigator.geolocation && !this.state.showResults ? <Button handle={this.handleClick}/> : null}
                {!navigator.geolocation ? <span>Sorry your navigator can not use geolocation...</span> : null}
                <TrendsList />
            </div>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocation: (coords) => {
            dispatch(fetchLocation(coords));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
