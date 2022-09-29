import * as puppeteer from "puppeteer";
import {HTTPStatusCode, HTTPStatusCodeBrowserInfo, HTTPStatusCodeDb, HTTPStatusCodeSpecification} from "http-status-code-db";

export const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', consoleObj => {
    if (consoleObj.type() === 'log') {
      console.log(consoleObj.text());
    }
  });
  const link = 'https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml';
  await page.goto(link);

  const httpStatusCodeDb: HTTPStatusCodeDb = await page.evaluate((data) => {
    const httpStatusCodeDb: HTTPStatusCodeDb = {};

    // @ts-ignore
    const rows = [...document.querySelectorAll('#table-http-status-codes-1 tbody tr')] as HTMLTableRowElement[];
    for (const row of rows) {
      const code = parseInt(row.querySelectorAll('td')[0]!.textContent!.trim());
      const reasonPhrase = row.querySelectorAll('td')[1]!.textContent!.replace(/(\(\w+\)|\(|\))/g, '').trim();

      if (reasonPhrase.toLowerCase() === 'unassigned') {continue;}

      console.log(data.link, `${code} ${reasonPhrase}`);

      const description = `${code} ${reasonPhrase}`;
      const syntax = `${code} ${reasonPhrase}`;
      const examples = [`${code} ${reasonPhrase}`];

      const specifications: HTTPStatusCodeSpecification[] = [];
      // @ts-ignore
      const anchors: HTMLAnchorElement[] = [...row.querySelectorAll('td')[2].querySelectorAll('a')];
      for (const anchor of anchors) {
        specifications.push({
          name: anchor.textContent?.trim() ?? '',
          link: anchor.href
        });
      }

      const httpStatusCodeInfo: HTTPStatusCode = {
        code,
        reasonPhrase,
        description,
        syntax,
        link: data.link,
        examples,
        specifications,
        browserCompatibility: []
      };

      httpStatusCodeDb[httpStatusCodeInfo.code.toString()] = httpStatusCodeInfo;
    }

    return httpStatusCodeDb;
  }, {
    link
  });

  await browser.close();

  return httpStatusCodeDb;
}
