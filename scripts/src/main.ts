import * as fs from "fs";
import * as path from "path";
import * as MdnScraper from "./mdn-scraper";
import {HTTPStatusCodeDb} from "http-status-code-db";

(async () => {
  let httpStatusCodeDb = await MdnScraper.run();

  // load custom status codes
  const customStatusCodes = require('./custom-status-codes.json') as HTTPStatusCodeDb;

  httpStatusCodeDb = {
    ...httpStatusCodeDb,
    ...customStatusCodes
  };

  const dbJsonPath = path.join(__dirname, '..', '..', 'src', 'db.json');
  console.log(`Save db.json to ${dbJsonPath}`);
  fs.writeFileSync(dbJsonPath, JSON.stringify(httpStatusCodeDb, null, '\t'));
})();
