<div align="center">

# HTTP Status Code Database

[![NPM](https://nodei.co/npm/http-status-code-db.png?compact=true)](https://nodei.co/npm/http-status-code-db/)
<br />
[![](https://img.shields.io/npm/dt/http-status-code-db.svg?style=flat-square)](https://www.npmjs.com/package/http-status-code-db)

</div>

[![NPM Version](https://badgen.net/npm/v/http-status-code-db)](https://npmjs.org/package/http-status-code-db)
[![license](https://img.shields.io/github/license/pichillilorenzo/http-status-code-db)](/LICENSE)
[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/LorenzoPichilli)

This is a large database of known HTTP Status Codes and information about them. It consists of a single, public JSON file and does not include any logic, allowing it to remain as un-opinionated as possible with an API. It aggregates data from the following sources:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml

## Installation

```bash
npm i --save http-status-code-db
```

### Database Download

If you want download the database and use it directly in the browser, you can just grab the
JSON file using [jsDelivr](https://www.jsdelivr.com/). It is recommended to
replace `main` with [a release tag](https://github.com/pichillilorenzo/http-status-code-db/tags)
as the JSON format may change in the future.

```
https://cdn.jsdelivr.net/gh/pichillilorenzo/http-status-code-db@main/dist/db.json
```

## Usage

```js
import db from 'http-status-code-db';
// .. or
const db = require('http-status-code-db').default;

const statusCodeInfo = db['200']; // An instance of HTTPStatusCode
console.log(statusCodeInfo.syntax); // 200 OK
```

Access HTTP Status Code info using the status code number as a key.

## Contributing

The primary way to contribute to this database is by updating the data in one of the upstream sources.
Check the `scripts/src/mdn-scraper.ts` to check the MDN scraper implementation.

### Direct Inclusion

If that is not possible / feasible, they can be added directly here as a "custom" status code.

To edit the database, only make PRs against `scripts/src/custom-status-codes.json`.

The `scripts/src/custom-status-codes.json` file is a JSON object of type [HTTPStatusCodeDb](https://pichillilorenzo.github.io/http-status-code-db/interfaces/HTTPStatusCodeDb.html), where each `key` is the status code number as a string and the `value`
is an Object of type [HTTPStatusCode](https://pichillilorenzo.github.io/http-status-code-db/interfaces/HTTPStatusCode.html).

To update the build, run `npm run build:all`.

## HTTPStatusCodeDb Data Structure Example

```json
{
  "100": {...},
  "200": {
    "code": 200,
    "reasonPhrase": "OK",
    "description": "The HTTP 200 OK success status response code indicates that the request has succeeded. A 200 response is cacheable by default. The meaning of a success depends on the HTTP request method: The successful result of a PUT or a DELETE is often not a 200 OK but a 204 No Content (or a 201 Created when the resource is uploaded for the first time).",
    "syntax": "200 OK",
    "link": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200",
    "examples": [],
    "specifications": [
      {
        "name": "HTTP Semantics # status.200",
        "link": "https://httpwg.org/specs/rfc9110.html#status.200"
      }
    ],
    "browserCompatibility": [
      {
        "name": "Chrome",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Edge",
        "supported": true,
        "version": "12"
      },
      {
        "name": "Firefox",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Opera",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Safari",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Chrome Android",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Firefox for Android",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Opera Android",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Safari on iOS",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Samsung Internet",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "WebView Android",
        "supported": true,
        "version": "Yes"
      }
    ]
  },
  "404": {...},
  ...
}
```

Check [HTTPStatusCodeDb](https://pichillilorenzo.github.io/http-status-code-db/interfaces/HTTPStatusCodeDb.html) for more details.

## License

Released under the [ISC](/LICENSE) license.

This project is strongly inspired by the [mime-db](https://github.com/jshttp/mime-db).
