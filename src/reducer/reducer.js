import * as T from "./action";

export const initialState = {
  app: {
    welcomePopup: true,
    balance: 10,
    sandbox: true
  },
  scan: {
    id: 0,
    type: "text",
    status: "",
    cost: 10,
    pdf: ""
  },
  scanLog: {
    status: 1,
    list: [],
    order: null,
    orderBy: null,
    filter: ""
  },
  transactionLog: {
    status: 1,
    list: [],
    order: null,
    orderBy: null,
    filter: ""
  },
  textInput: {
    input: ""
  },
  fileInput: {
    input: null,
    status: 0,
    message: "",
    dirty: false
  },
  urlInput: {
    input: "",
    status: 0,
    message: "",
    dirty: false
  }
};

export default function reducer(state, action) {
  console.log("%cBefore: ", "color:#fff;background:darkgreen");
  console.log(action, state);
  const state2 = reducer1(state, action);
  console.log("%cAfter: ", "color:orange;font-size:1.2em;font-weight:bold;");
  console.log(state2);

  return state2;
}
export function reducer1(state, action) {
  switch (action.type) {
    case T.APP:
    case T.SCAN_LOG:
    case T.TRANSACTION_LOG:
    case T.TEXT_INPUT:
    case T.FILE_INPUT:
    case T.URL_INPUT:
    case T.SCAN:
      return {
        ...state,
        [action.type]: {
          ...state[action.type],
          ...action.data
        }
      };
    default:
      throw new Error("Invalid action.type in reducer");
  }
}
