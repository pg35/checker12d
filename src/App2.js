import { useState, useEffect, useReducer } from "react";
import Home from "./components/pages/Home";
import Billing from "./components/pages/Billing";
import Plagiarism from "./components/pages/Plagiarism";
import ScanListTable from "./components/tables/ScanListTable";
import TransactionListTable from "./components/tables/TransactionListTable";
import MenuBar from "./components/ui/MenuBar";
import reducer, { initialState } from "./reducer/reducer";
import * as T from "./reducer/action";
import { useAjax } from "./util/hooks";

import "./styles.css";
import Progress from "./components/ui/Progress";
import Check from "./components/billing/Check";
import Checking from "./components/billing/Checking";
import Checked from "./components/billing/Checked";
import ScanInfo from "./components/util/ScanInfo";
import ExpandableText from "./components/util/ExpandableText";
import Buttons from "./components/plagiarism/Buttons";

const items = [
  {
    key: 0,
    label: (
      <span>
        &larr; <small>Go back</small>
      </span>
    )
  },
  { key: 1, label: "Plagiarism checks" },
  { key: 2, label: "Transactions" }
];
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  /*return (
    <div>
      <Checked state={state} dispatch={dispatch} />
      <ScanInfo state={state} dispatch={dispatch} />
    </div>
  );
  */

  const {
    scan: { status },
    app: { balance }
  } = state;
  const [activeItem, setActiveItem] = useState(0);

  let elem = null;
  switch (status) {
    case "":
      if (1 === activeItem)
        elem = <ScanListTable state={state} dispatch={dispatch} />;
      else if (2 === activeItem)
        elem = <TransactionListTable state={state} dispatch={dispatch} />;
      else
        elem = (
          <Home
            state={state}
            dispatch={dispatch}
            onComplete={() =>
              dispatch(T.createAction(T.SCAN, { status: "check" }))
            }
          />
        );
      break;
    case "check":
    case "check_failed":
    case "checking":
    case "checked":
      elem = <Billing state={state} dispatch={dispatch} />;
      break;
    case "scan":
    case "scanning":
    case "exporting":
    case "exported":
      elem = <Plagiarism state={state} dispatch={dispatch} />;
      break;
    default:
      throw new Error("invalid status");
  }
  /*
  return (
    
      <div id="pxq_pgck">
      <div className="pxq_pgck_page_billing">
        <Checked state={state} dispatch={dispatch} />
        <ScanInfo state={state} dispatch={dispatch} />
      </div>
    </div>
  );
  
 }*/
  return (
    <div id="pxq_pgck">
      <MenuBar
        right={
          <span>
            <strong>Credits: </strong>
            {balance}
          </span>
        }
        items={
          !status
            ? 0 === activeItem
              ? items.filter((x) => x.key > 0)
              : items
            : []
        }
        onItemClick={(obj) => setActiveItem(obj.key)}
        activeItem={activeItem}
      />

      {elem}
    </div>
  );
}
