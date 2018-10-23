import React from 'react';
import ReactTable from 'react-table';

const SafeVoteRender = function() {
    return (      
      <div>
          <div className="page-header page-header-bordered header-fairexchange margin-bottom-0"
            id="fairexchange-header-div">
              <div className="text-center"><img src={`assets/images/safe-trade.png`} /></div>
              <div className="text-center safe-title">Vote for your favorite coin to get listed on Safe.trade!</div>
      </div>
          
          
          { this.props.hasRound && this.props.round && this.props.round.endDate &&
            <div>
              <h4><div className="text-center safe-title">Round #{ this.props.round.number }</div></h4>
              <br />
              <div className="text-center safe-title">{ this.renderEndDate() }</div>
            </div>
          }
          <br/>
          { this.props.hasRound && this.props.hasRound === true && this.props.items &&             
              <ReactTable
                data={ this.props.items }
                columns={ this.getColumns() }
                className="-striped -highlight"
                sortable={ false } 
              />    
          }
       </div> 
    );      
}

export default SafeVoteRender;