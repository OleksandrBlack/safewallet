import React from 'react';
import PairDetails from '../pairDetails/pairDetails';

const SafeTradeRender = function() {
    return (
        
                <div>
                    <div className="page-header page-header-bordered header-fairexchange margin-bottom-0"
                    id="fairexchange-header-div" style={{ marginBottom: '30px' }}>
                        <div className="text-center"><img src={`assets/images/safe-trade.png`} /></div>
                        { this.props.activePair && 
                            <div>
                                <h3><p className="text-center text-uppercase safe-title">{ this.props.activePair.name }</p></h3>
                            </div>
                        }
                    </div>
                    <PairDetails />
                </div>           
    );
}

export default SafeTradeRender;