{
  const Connection = require("tedious").Connection;
  const Request = require("tedious").Request;

  const config = {
    server: "localhost",
    authentication: {
      type: "default",
      options: {
        userName: "your_username", // update me
        password: "your_password", // update me
      },
    },
  };

  const connection = new Connection(config);

  connection.on("connect", (err: any) => {
    if (err) {
      console.log(err);
    } else {
      executeStatement();
    }
  });

  function executeStatement() {
    let request = new Request(
      "select 123, 'hello world'",
      (err: any, rowCount: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${rowCount} rows`);
        }
        connection.close();
      }
    );

    request.on("row", (columns: any[]) => {
      columns.forEach((column: { value: null }) => {
        if (column.value === null) {
          console.log("NULL");
        } else {
          console.log(column.value);
        }
      });
    });

    connection.execSql(request);
  }
}
