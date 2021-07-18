import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./blocks";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions::Blocks", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const url = "http://localhost:3002";

  const res = {
    data: [
      {
        id: 1,
        attributes: {
          data: "Text for blocks actions test",
        },
      },
      {
        id: 2,
        attributes: {
          data: "Text for blocks actions test",
        },
      },
    ],
  };

  it("should fetch the blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve(res);
        },
      })
    );
    await ActionCreators.getBlocks(url)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_BLOCKS_START,
      },
      {
        type: ActionTypes.GET_BLOCKS_SUCCESS,
        res: res.data,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.getBlocks(url)(dispatch);
    const expected = [
      {
        type: ActionTypes.GET_BLOCKS_START,
      },
      {
        type: ActionTypes.GET_BLOCKS_FAILURE,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
