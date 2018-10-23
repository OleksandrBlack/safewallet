import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import SafeVoteRender from './safeVote.render';
import {
    triggerToaster,
} from '../../../actions/actionCreators';
import Store from '../../../store';
import Countdown from 'react-countdown-now';




class SafeVote extends React.Component {
    renderEndDate(){
        const renderer = ({ total, days, hours, minutes, seconds, milliseconds, completed }) => {
            if (completed){
                return <span>Round has ended!</span>
            } else {
                return <span>Round ends in {days}d {hours}h {minutes}m {seconds}s</span>
            }
        };

        let _endDate = parseInt(this.props.round.endDate) * 1000;
        let d = new Date(_endDate);
        return <Countdown date={d} renderer={renderer} />;
    }

    getColumns(){
        const columns =[{
                Header: '#',
                accessor: 'topNumber',
                maxWidth: 100
            }, {
                Header: 'Name',
                accessor: 'name',
                maxWidth: 200
            }, {
                Header: 'Ticker',
                accessor: 'ticker',
                maxWidth: 150
            }, {
                Header: 'Votes',
                accessor: 'votes'
            }, {
                Header: 'SAFE Address',
                accessor: 'safeAddress',                
            }, {
                accessor: 'safeAddress',
                maxWidth: 100,
                Cell: props => <div>
                                    <CopyToClipboard text={props.value} onCopy={() => Store.dispatch(triggerToaster(
                                                                                    props.value,
                                                                                    'Copy to clipboard',
                                                                                    'success'
                                                                                )) }>
                                        <button type="button" className="btn btn-primary waves-effect waves-light">
                                            <i className="icon fa-copy" />    
                                        </button>
                                    </CopyToClipboard>
                                </div>
            }
        ];

        return columns;
    }

    render() {
        return SafeVoteRender.call(this);
    }    
}

const mapStateToProps = (state) => {
    return {
        hasRound: state.SafeVote.hasRound,
        round: state.SafeVote.round,
        items: state.SafeVote.items,
    };
};

export default connect(mapStateToProps)(SafeVote);
