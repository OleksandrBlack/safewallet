import React from 'react';
import { connect } from 'react-redux';
import PairTileRender from './pairTile.render';


import PairTileItem from './pairTileItem';

class PairTile extends React.Component {
    constructor(){
        super();
        this.state = {
            markets: 'ALL',
        };
        this.renderTiles = this.renderTiles.bind(this);


    }

    renderTiles(){
        let _pairs = this.props.pairs;
        if (_pairs){
            let items = [];
            _pairs
            .filter(pair => {
                if (this.state.markets === 'ALL'){
                    return true;
                } else {
                    let t = pair.name.split('/');
                    if (t[0] === this.state.markets || t[1] === this.state.markets){
                        return true;
                    }
                }
                return false;
            })
            .map(function(pair){
                    const _id = pair.id;
                    const _name = pair.name;
                    items.push({
                        _id,
                        _name
                    });
                }            
            );

            return (
                items.map((item, i) =>
                    <PairTileItem
                    key={ i }
                    i={ i }
                    item={ item } />)
            )
        }    
    }

    renderSelectMarketOptions() {
        let markets = ['ALL', 'BTC', 'SAFE', 'LTC'];
        let _items = [];
    
        for (let i = 0; i < markets.length; i++) {
          _items.push(
            <option
              key={ `market-opt-${i}` }
              value={ markets[i] }>
              { markets[i] + ' Markets' }
            </option>
          );
        }
    
        return _items;
    }

    filterMarkets(event){
        this.setState({
            markets: event.target.value,
        });
    }

    render() {
        return PairTileRender.call(this);
    }
}

const mapStateToProps = (state) => {
    return {
       pairs: state.SafeTrade.pairs,
    };
};
  
export default connect(mapStateToProps)(PairTile);