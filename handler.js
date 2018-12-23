"use strict";
let mysql = require("mysql");
let aws = require("aws-sdk");
aws.config.update({
  region: "YOUR_REGION"
});

let s3 = new aws.S3({
  apiVersion: "2006-03-01",
  signatureVersion: "v4"
});

module.exports.hello = (event, context) => {
  if (event.Records[0].eventName !== "ObjectCreated:Put") {
    return context.succeed("not target event");
  }

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const params = {
    Bucket: bucket,
    Key: key
  };
  console.log(`S3 Params ${JSON.stringify(params)}`);
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(`Error: failed to invoke getObject ${err}`);
    } else {
      let connection = mysql.createConnection({
        host: "YOUR_RDS_DB_HOST",
        user: "YOUR_RDS_DB_USER",
        password: "YOUR_RDS_DB_PASSWORD",
        port: 3306,
        database: "YOUR_RDS_DB_NAME",
        debug: false
      });

      connection.connect(function(err) {
        if (err) {
          console.log(`Error: failed to connect ${err}`);
          context.fail();
        } else {
          connection.query(
            "select * from YOUR_RDS_DB_NAME.TABLE_NAME limit 1",
            (err, rows, fields) => {
              if (err) {
                console.log(`Error: failed to query ${err}`);
              } else {
                console.log(data);
                console.log(rows);
                context.succeed("Success");
              }
            }
          );
        }
      });
    }
  });
};
