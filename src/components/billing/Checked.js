export default function Checked(props) {
  const { state } = props;
  const { scan, app } = state;
  const classes = ["bold"];
  if (scan.cost > app.balance) classes.push("error");
  else classes.push("success");
  return (
    <table className="pxq_pgck_table pxq_pgck_table_info">
      <tbody>
        <tr>
          <th>Your credits</th>
          <td>{app.balance}</td>
        </tr>
        <tr>
          <th>
            Plagiarism check cost <small>(credits)</small>
          </th>
          <td className={classes.map((x) => `pxq_pgck_${x}`).join(" ")}>
            {scan.cost}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
