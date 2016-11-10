//@flow
import React from 'react';
import { connect } from 'react-redux';

import Trends from './Trends';
import { fetchTrends } from '../actions/trendsActions';

class TrendsList extends React.Component {
    componentWillReceiveProps(nextProps) {
        if(nextProps.location.woeid !== 0 && nextProps.location.woeid !== this.props.location.woeid)
            this.props.fetchTrends(nextProps.location.woeid);
    }
    render() {
        return (
            <div>
                {this.props.location.isError ? <div>Too much requests wait for 15min</div> : null}
                <Trends />
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    location: state.location
});

const mapDispatchToProps = (dispatch) => ({
    fetchTrends: (woeid) => {
        dispatch(fetchTrends(woeid));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendsList);
