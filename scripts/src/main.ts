import * as fs from "fs";
import * as path from "path";
import * as MdnScraper from "./mdn-scraper";
import * as IanaScraper from "./iana-scraper";
import {HTTPStatusCodeDb} from "http-status-code-db";

(async () => {
  const httpStatusCodeDb = mergeDatabases([
    await MdnScraper.run(),
    await IanaScraper.run(),
    // load custom status codes
    require('./custom-status-codes.json') as HTTPStatusCodeDb
  ]);
  const dbJsonPath = path.join(__dirname, '..', '..', 'src', 'db.json');
  console.log(`Save db.json to ${dbJsonPath}`);
  fs.writeFileSync(dbJsonPath, JSON.stringify(httpStatusCodeDb, null, '\t'));
})();

function mergeDatabases(databases: HTTPStatusCodeDb[]): HTTPStatusCodeDb {
  databases = JSON.parse(JSON.stringify(databases));
  const mergedDb: HTTPStatusCodeDb = databases[0];
  for (const target of databases.slice(1)) {
    for (const key of Object.keys(target)) {
      if (mergedDb[key] == null) {
        mergedDb[key] = target[key];
      } else {
        for (const property of Object.keys(target[key])) {
          if (mergedDb[key][property] == null) {
            mergedDb[key][property] = target[key];
          } else {
            switch (property) {
              case 'examples':
                mergedDb[key][property] = [...new Set([...mergedDb[key][property], ...target[key][property]])];
                break;
              case 'specifications':
                for (const targetSpec of target[key][property]) {
                  if (targetSpec.link != null && !mergedDb[key][property].find(spec => spec.link === targetSpec.link)) {
                    mergedDb[key][property].push(targetSpec);
                  }
                }
                break;
              case 'browserCompatibility':
                for (const targetBrowserInfo of target[key][property]) {
                  if (!mergedDb[key][property].find(browserInfo => browserInfo.name === targetBrowserInfo.name)) {
                    mergedDb[key][property].push(targetBrowserInfo);
                  }
                }
                break;
            }
          }
        }
      }
    }
  }
  return mergedDb;
}
