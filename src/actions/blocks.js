import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const getBlocksStart = () => {
  return {
    type: types.GET_BLOCKS_START,
  };
};

const getBlocksSuccess = (res) => {
  return {
    type: types.GET_BLOCKS_SUCCESS,
    res,
  };
};

const getBlocksFailure = () => {
  return {
    type: types.GET_BLOCKS_FAILURE,
  };
};

export function getBlocks(url) {
  return async (dispatch) => {
    try {
      dispatch(getBlocksStart());

      const res = await fetch(`${url}/api/v1/${types.ENDPOINT_BLOCKS}`);

      if (res.status >= 400) {
        dispatch(getBlocksFailure());
        return;
      }

      const json = await res.json();

      dispatch(getBlocksSuccess(json.data));
    } catch (err) {
      dispatch(getBlocksFailure());
    }
  };
}
