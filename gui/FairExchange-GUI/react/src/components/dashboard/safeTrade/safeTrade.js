import React from 'react';
import { connect } from 'react-redux';
import SafeTradeRender from './safeTrade.render';

class SafeTrade extends React.Component {
    render() {
        return SafeTradeRender.call(this);
    }    
}

const mapStateToProps = (state) => {
    return {
        pairs: state.SafeTrade.pairs,
        activePair: state.SafeTrade.activePair,
        tickers: state.SafeTrade.tickers,
    };
};

export default connect(mapStateToProps)(SafeTrade);
