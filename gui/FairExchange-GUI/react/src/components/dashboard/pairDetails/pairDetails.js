import React from 'react';
import { connect } from 'react-redux';
import PairDetailsRender from './pairDetails.render';

class PairDetails extends React.Component {
    render() {
        if (this.props.activePair && this.props.tickers[this.props.activePair.id]){
            return PairDetailsRender.call(this);
        } else {
            return null;
        }        
    }

    getCurrency(){
        let s = this.props.activePair.name;
        return s.split("/")[1];
    }

    getVolumeCurrency(){
        let s = this.props.activePair.name;
        return s.split("/")[0];
    }
}

const mapStateToProps = (state) => {
    return {
        activePair: state.SafeTrade.activePair,
        tickers: state.SafeTrade.tickers,
    };
};

export default connect(mapStateToProps)(PairDetails);