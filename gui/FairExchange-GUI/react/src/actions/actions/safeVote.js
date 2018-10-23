import { SAFE_VOTE } from '../storeType';
import { triggerToaster } from '../actionCreators';

export function safeVote() {    
    return dispatch => {
      return fetch('https://vote.safe.trade/api/stats', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          triggerToaster(
            'safeVote',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(json => {    
        dispatch(safeVoteState(json));
      });
    }
  }

  function safeVoteState(data) {
    return {
      type: SAFE_VOTE,
      hasRound: data.hasRound,
      round: data.round,
      items: data.items,
    }
  }
