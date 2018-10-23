import React from 'react';

const PairTileItemRender = function(){
    const { item } = this.props;

    return (
        <div className="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info pointer">
          <div className={ 'widget widget-shadow' + (this.props.activePair && this.props.activePair.id === item._id ? ' active' : '')}>
            <div
              className="widget-content text-center bg-white padding-20"
              onClick={ () => this._safeTradeChangeActivePair(item._id, item._name) }> 
              <a className="avatar margin-bottom-5">
                <img
                  className="img-responsive"
                  src={ 'assets/images/cryptologo/' + this.getCryptoLogo(item._name) + '.png' }
                  alt={ item._id }/>
              </a>
              <div className="coin-name">
                { item._name }
              </div>
            </div>
          </div>
        </div>
    )
};

export default PairTileItemRender;