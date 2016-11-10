import React from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';

import Chart from './Chart';
import { receiveChart } from '../actions/chartActions';

class Trends extends React.Component {
    constructor(props) {
        super(props);
        this.processResults = this.processResults.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.trends.woeid !== 0 && nextProps.trends.trends.length > 0 && nextProps.trends.trends.length !== this.props.trends.trends.length)
            this.processResults(nextProps);
    }
    processResults(nextProps) {
        // Node to render
        const dataSet = nextProps.trends.trends.slice(0, 10);
        const node = new ReactFauxDOM.Element('div');
        // Processing data from state to d3 friendly json
        const maxVolume = Math.max.apply(Math, dataSet.map((o) => (o.tweet_volume)));
        const processedData = [];
        for(let i in dataSet) {
            if(dataSet[i].tweet_volume)
                processedData.push({
                    name: dataSet[i].name,
                    volume: dataSet[i].tweet_volume,
                    size: 40 * dataSet[i].tweet_volume / maxVolume + 40
                });
            else
                processedData.push({
                    name: dataSet[i].name,
                    volume: 'non specified',
                    size: 40
                });
        }
        const newDataSet = {children: processedData};
        // D3 Bubble Chart
        const customColors = [
            '#2424ff',
            '#4824ff',
            '#6d24ff',
            '#9124ff',
            '#b624ff',
            '#da24ff',
            '#ff24ff',
            '#ff24da',
            '#ff24b6',
            '#ff2491',
            '#ff246d',
            '#ff2448',
            '#ff2424',
            '#ff4824',
            '#ff6d24',
            '#ff6d24',
            '#ff9124',
            '#ffb624',
            '#ffda24',
            '#ffff24'
        ];
        const size = [800, 600],
                chart = d3.pack()
                            .size(size)
                            .padding(4),
                svg = d3.select(node)
                        .append('svg')
                        .attr('viewBox',`0 0 ${size[0]} ${size[1]}`)
                        .attr('width', `${size[0]}`)
                        .attr('height', `${size[1]}`)
                        .attr('class', 'chart-svg'),
                defs = svg.append('defs'),
                root = d3.hierarchy(newDataSet)
                        .sum((d) => (d.size))
                        .sort((a, b) => (b.size - a.size));
        chart(root);
        let i = 0;
        const gradients = defs.selectAll('.gradient')
                                .data(root.children)
                                .enter()
                                .append('linearGradient')
                                .attr('id', (d) => {
                                    i++;
                                    return `gradient-${i}`;
                                })
                                .attr('x1', '0%')
                                .attr('y1', '0%')
                                .attr('x2', '40%')
                                .attr('y2', '100%');
        i = 0;
        gradients.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', (d) => {
                i += 2;
                return customColors[i-2];
            });
        i = 1;
        gradients.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', (d) => {
                i += 2;
                return customColors[i-2];
            });
        const nodes = svg.selectAll('.node')
                            .data(root.children)
                            .enter()
                            .append('g')
                            .attr('className', 'node')
                            .attr('transform', (d) => (
                                `translate(${d.x} ${d.y})`
                            ))
                            .append('g')
                            .attr('className', 'graph');
        i = 0;
        nodes.append('circle')
                .attr('r', (d) => (d.data.size))
                .style('fill', (d) => {
                    i++;
                    return `url(#gradient-${i})`;
                });
        nodes.append('text')
                .attr('dy', '.3em')
                .attr('className', 'graph-title')
                .style('text-anchor', 'middle')
                .text((d) => (d.data.name));
        nodes.append('text')
                .attr('dy', '.3em')
                .attr('className', 'graph-value')
                .style('text-anchor', 'middle')
                .text((d) => (d.data.volume));
        // Adding the node to render into the state
        const obj = {
            node: node
        };
        this.props.receiveChart(node);
    }
    render() {
        return (
            <div>
                {this.props.trends.isError ? <div>Too much requests wait for 15min</div> : null}
                {this.props.trends.trends.length ? <Chart /> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    trends: state.trends
});

const mapDispatchToProps = (dispatch) => ({
    receiveChart: (node) => {
        dispatch(receiveChart(node));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
