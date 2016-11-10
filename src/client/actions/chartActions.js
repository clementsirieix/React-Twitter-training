// @flow

export function receiveChart(payload: any) {
    return {
        type: 'RECEIVE_CHART',
        payload
    };
}
