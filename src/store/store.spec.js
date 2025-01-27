import * as ActionTypes from '../constants/actionTypes';

import configureStore from './configureStore';

describe('Store', () => {
  const nodes = {
    list: [
      { url: 'a.com', online: false, name: null, loading: false },
      { url: 'b.com', online: false, name: null, loading: false },
      { url: 'c.com', online: false, name: null, loading: false },
      { url: 'd.com', online: false, name: null, loading: false }
    ]
  };
  const blocks = {
    loading: true,
    data: [],
  };

  beforeAll(() => {});
  afterAll(() => {});

  it('should display results when necessary data is provided', () => {
    const store = configureStore({nodes, blocks});

    const nodeActions = [
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'alpha'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: {node_name: 'beta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'gamma'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[2], res: {node_name: 'delta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: {node_name: 'epsilon'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'zeta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'eta'} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'theta'} },
    ];
    const blocksAction = [
      {
        type: ActionTypes.GET_BLOCKS_SUCCESS,
        res: [
          {
            id: "1",
            attributes: { data: "Text for blocks actions test" },
          },
          {
            id: "2",
            attributes: { data: "Text for blocks actions test. Alt"} ,
          },
        ],
      },
      {
        type: ActionTypes.GET_BLOCKS_SUCCESS,
        res: [
          {
            id: "3",
            attributes: { data: "Text for blocks actions test. Shift" },
          },
          {
            id: "4",
            attributes: { data: "Text for blocks actions test. Upper" },
          },
        ],
      },
      {
        type: ActionTypes.GET_BLOCKS_SUCCESS,
        res: [
          {
            id: "5",
            attributes: { data: "Text for blocks actions test. Final" },
          },
        ],
      },
    ];

    [...nodeActions, ...blocksAction].forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expectedNodes = {
      list: [
        { url: 'a.com', online: true, name: 'theta', loading: false },
        { url: 'b.com', online: true, name: 'epsilon', loading: false },
        { url: 'c.com', online: true, name: 'delta', loading: false },
        { url: 'd.com', online: false, name: null, loading: false }
      ]
    };
    const expectedBlocks = {
      loading: false,
      data: [
        { id: '5', description: "Text for blocks actions test. Final" },
      ]
    };

    expect(actual.nodes).toEqual(expectedNodes);
    expect(actual.blocks).toEqual(expectedBlocks);
  });
});
