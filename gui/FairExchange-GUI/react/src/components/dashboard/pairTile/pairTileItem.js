import React from 'react';
import { connect } from 'react-redux';
import { safeTradeChangeActivePair } from '../../../actions/actionCreators';
import Store from '../../../store';
import PairTileItemRender from './pairTileItem.render';

class PairTileItem extends React.Component {
    constructor(){
        super();

    }   

    render() {
        return PairTileItemRender.call(this);
    }

    _safeTradeChangeActivePair(pairId, pairName){
        Store.dispatch(safeTradeChangeActivePair(pairId, pairName));
    }  
    
    getCryptoLogo(pairName){
        let t = pairName.split("/");
        if (t[0] === 'BTC' || t[1] === 'BTC'){
            return 'btc';
        } else if (t[0] === 'LTC' || t[1] === 'LTC') {
            return 'ltc';
        } else {
            return 'safe';
        }
    }
}


const mapStateToProps = (state) => {
    return { 
        activePair: state.SafeTrade.activePair,
    };
  };
  
export default connect(mapStateToProps)(PairTileItem);