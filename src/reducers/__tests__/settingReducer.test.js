import types from "../../constants/actionTypes";
import { settingState } from "../initialState";
import settingsReducer from "../settingReducer";

const { describe, it } = global;

let settings = null;

describe("settings reducer unitest", () => {
  beforeEach(() => {
    settings = settingsReducer(settingState, { type: "INITIAL" });
  });

  it("should fetching", () => {
    console.log('settings.toJS()', settings.toJS())
    const startFetchingAction = { type: types.START_FETCHING };
    const stopFetchingAction = { type: types.STOP_FETCHING };
    expect(settings.get("fetchCount")).toBe(0);

    const afterOpenSidebar = settingsReducer(settings, startFetchingAction);
    expect(afterOpenSidebar.get("fetchCount")).toBe(1);

    const afterCloseSidebar = settingsReducer(afterOpenSidebar, stopFetchingAction);

    expect(afterCloseSidebar.get("fetchCount")).toBe(0);
  });
});