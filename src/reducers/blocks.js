import {
  GET_BLOCKS_START,
  GET_BLOCKS_SUCCESS,
  GET_BLOCKS_FAILURE
} from '../constants/actionTypes';
import initialState from './initialState';

export default function blocksReducer(
  state = initialState().blocks,
  action)
{
  switch (action.type) {
    case GET_BLOCKS_START:
      return {
        ...state,
        loading: true,
        data: []
      };

    case GET_BLOCKS_SUCCESS:
      const data = action.res.map(block => {
        return {
          id: block.id,
          description: block.attributes.data
        }
      });

      return {
        ...state,
        loading: false,
        data
      };

    case GET_BLOCKS_FAILURE:
      return {
        ...state,
        loading: false,
        data: null
      };

    default:
      return state;
  }
}
