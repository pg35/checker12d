import { useEffect } from "react";
import Progress from "../ui/Progress";
import { useAjax } from "../../util/hooks";

export default function Request(props) {
  const { state, dispatch, onComplete, messages, repeatCount } = props;
  const [response, ajaxFuncs, counter, sleep, isStopped] = useAjax(
    props.useAjaxArgs
  );

  useEffect(() => {
    console.log("use effect request", response.data, response.fail);
    if (response.data) {
      console.log("response recieved", response.data);
      onComplete(response.data, ajaxFuncs.stop);
      //ajaxFuncs.stop();
    }
  }, [response]);
  console.log(
    "request",
    counter,
    sleep,
    repeatCount,
    response.data,
    response.fail
  );
  let progress = 1;
  let msg = messages[0];
  if (isStopped) {
    progress = 2;
    msg = messages[1];
  } else if (repeatCount) {
    if (counter >= repeatCount) {
      progress = 3;
      msg = messages[2];
    }
  } else if (null !== response.fail) {
    progress = 3;
    msg = (
      <span>
        {props.messages[2]} <br /> <small>{response.fail}</small>
      </span>
    );
  }

  return (
    <div>
      <Progress
        status={progress}
        message={msg}
        classes={["stacked", "center", "large"]}
      />
      {3 === progress && (
        <div className="pxq_pgck_btn_retry">
          <button onClick={() => ajaxFuncs.start()}>Retry</button>
        </div>
      )}
    </div>
  );
}
