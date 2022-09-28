import * as puppeteer from "puppeteer";
import {HTTPStatusCode, HTTPStatusCodeBrowserInfo, HTTPStatusCodeDb, HTTPStatusCodeSpecification} from "http-status-code-db";

export const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://developer.mozilla.org/en-US/docs/Web/HTTP/Status');

  const statusCodeLinkElements = await page.$$('#sidebar-quicklinks .toggle > details ol > li > a[href^="/en-US/docs/Web/HTTP/Status"]');
  const statusCodeLinks: string[] = [];
  for (const statusCodeLinkElement of statusCodeLinkElements) {
    statusCodeLinks.push(await statusCodeLinkElement.evaluate((link: HTMLLinkElement) => {
      return link.href;
    }, statusCodeLinkElement));
  }
  await statusCodeLinkElements?.forEach(h => h.dispose());

  const httpStatusCodeDb: HTTPStatusCodeDb = {};
  for (const statusCodeLink of statusCodeLinks) {
    await page.goto(statusCodeLink, {
      waitUntil: 'networkidle2',
    });
    console.log(statusCodeLink);

    const httpStatusCode: HTTPStatusCode = await page.evaluate((data) => {
      const removeExtraSpace = (str: string) => {
        return str.replace(/\s+/g, " ");
      }

      const name = document.querySelector('.main-page-content h1')!.textContent!.trim();

      const code = parseInt(name.split(" ")[0].trim());
      const reasonPhrase = name.split(" ").slice(1).join(" ").trim();

      // @ts-ignore
      const description = [...document.querySelector('.main-page-content .section-content').querySelectorAll('p')]
        .map((p: HTMLParagraphElement) => p.textContent?.trim() ?? '').join('\n');
      const note = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.note')?.textContent?.trim();

      const experimental = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.experimental')?.textContent?.trim();
      const warning = document.querySelector('.main-page-content .section-content')?.querySelector('.notecard.warning')?.textContent?.trim();

      const syntax = document.querySelector('section[aria-labelledby="status"] .section-content pre')?.textContent?.trim() ?? name;

      // @ts-ignore
      const examples = [...document.querySelectorAll('section[aria-labelledby="examples"] .section-content .code-example pre.http code')]
        .map((code: HTMLElement) => code.textContent?.trim() ?? '');

      const specifications: HTTPStatusCodeSpecification[] = [];
      const specificationTable = document.querySelector('.main-page-content #specifications + table');
      if (specificationTable) {
        // @ts-ignore
        const rows: HTMLTableRowElement[] = [...specificationTable.querySelectorAll('tbody tr')];
        for (const row of rows) {
          specifications.push({
            name: row.querySelector('td')?.textContent?.trim() ?? '',
            link: row.querySelector('a')?.href
          });
        }
      }

      const browserCompatibility: HTTPStatusCodeBrowserInfo[] = [];
      const browserCompatibilityRow = document.querySelector('.main-page-content .bc-table tbody tr');
      if (browserCompatibilityRow) {
        // @ts-ignore
        const tds = [...browserCompatibilityRow.querySelectorAll('td')] as HTMLTableColElement[];
        for (const td of tds) {
          let supported: boolean | undefined;
          if (td.querySelector('abbr')?.classList.contains('bc-level-yes') ||
            td.querySelector('abbr')?.classList.contains('bc-level-no')) {
            supported = td.querySelector('abbr')?.classList.contains('bc-level-yes');
          }
          browserCompatibility.push({
            name: td.querySelector('.bc-browser-name')?.textContent?.trim() ?? '',
            supported,
            version: td.querySelector('.bc-version-label')?.textContent?.trim() ?? ''
          });
        }
      }

      const httpStatusCodeInfo: HTTPStatusCode = {
        code,
        reasonPhrase,
        description: description ? removeExtraSpace(description) : undefined,
        note: note ? removeExtraSpace(note) : undefined,
        syntax,
        experimental: experimental ? removeExtraSpace(experimental) : undefined,
        warning: warning ? removeExtraSpace(warning) : undefined,
        link: data.statusCodeLink,
        examples,
        specifications,
        browserCompatibility
      };
      return httpStatusCodeInfo;
    }, {
      statusCodeLink
    });

    httpStatusCodeDb[httpStatusCode.code.toString()] = httpStatusCode;
  }

  await browser.close();

  return httpStatusCodeDb;
}
