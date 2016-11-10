import React from 'react';
import { connect } from 'react-redux';

class Chart extends React.Component {
    render() {
        if(this.props.chart.isLoaded)
            return this.props.chart.node.toReact()
        else
            return <div></div>;
    }
}

const mapStateToProps = (state) =>({
    chart: state.chart
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
