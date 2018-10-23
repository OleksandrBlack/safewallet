import React from 'react';

const PairDetailsRender = function() {
    return (
        <div>
            <div className="col-xs-12 margin-top-20">
            <div className="panel nav-tabs-horizontal">
                <div>
                <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                    <div className="panel">
                        <div className="panel-body">                 
                            <table className="table dataTable table-striped white-font">
                                <tbody>
                                    <tr>
                                        <td><p className="text-success">BUY :</p></td>
                                        <td><p className="text-success">{ this.props.tickers[this.props.activePair.id].ticker.buy + ' ' + this.getCurrency() }</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-danger">SELL :</p></td>
                                        <td><p className="text-danger">{ this.props.tickers[this.props.activePair.id].ticker.sell + ' ' + this.getCurrency() }</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>LAST :</p></td>
                                        <td><p>{ this.props.tickers[this.props.activePair.id].ticker.last + ' ' + this.getCurrency() }</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-success">24HR HIGH :</p></td>
                                        <td><p className="text-success">{ this.props.tickers[this.props.activePair.id].ticker.high + ' ' + this.getCurrency() }</p></td>
                                    </tr>
                                    <tr>
                                        <td><p className="text-danger">24HR LOW :</p></td>
                                        <td><p className="text-danger">{ this.props.tickers[this.props.activePair.id].ticker.low + ' ' + this.getCurrency() }</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>24HR VOLUME :</p></td>
                                        <td><p>{ this.props.tickers[this.props.activePair.id].ticker.vol + ' ' + this.getVolumeCurrency() }</p></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div> 
            </div> 
        </div>         
    );
}

export default PairDetailsRender;