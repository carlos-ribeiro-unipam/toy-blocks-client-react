import * as ActionTypes from '../constants/actionTypes';
import reducer from './blocks';
import initialState from './initialState';


describe('Reducers::Blocks', () => {
  const getInitialState = () => {
    return initialState().blocks;
  };

  const blocks = {
    loading: true,
    data: []
  };

  const res = [
    {
      id: "1",
      attributes: {
        data: "Text for blocks actions test",
      },
    },
    {
      id: "2",
      attributes: {
        data: "Text for blocks actions test. Alt",
      },
    },
  ];

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_START', () => {
    const action = {
      type: ActionTypes.GET_BLOCKS_START
    };

    const expected = {
      loading: true,
      data: [],
    }

    expect(reducer(blocks, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_SUCCESS', () => {
    const action = {
      type: ActionTypes.GET_BLOCKS_SUCCESS,
      res
    };

    const expected = {
      loading: false,
      data: [
        {
          id: "1",
          description: "Text for blocks actions test",
        },
        {
          id: "2",
          description: "Text for blocks actions test. Alt",
        },
      ],
    };

    expect(reducer(blocks, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_FAILURE', () => {
    const action = {
      type: ActionTypes.GET_BLOCKS_FAILURE
    };

    const expected = {
      loading: false,
      data: null,
    };

    expect(reducer(blocks, action)).toEqual(expected);
  });
});
