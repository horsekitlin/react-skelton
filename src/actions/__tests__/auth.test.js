import * as authActions from '../authActions';
import types from '~/constants/actionTypes';

const { describe, it, expect } = global;

describe("auth action unitest", () => {
  it("should test login event", () => {
    const payload = {
      account: "tomas",
      password: "a12345678"
    };

    const expectedAction = {
      type: types.LOGIN,
      payload
    };
    expect(authActions.loginAction(payload)).toEqual(expectedAction);
  });
});