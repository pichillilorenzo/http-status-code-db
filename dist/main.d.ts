/**
 * HTTP Status Codes Database.
 *
 * @example
 * ```json
 * {
 *   "100": {...},
 *   "200": {
 *     "code": 200,
 *     "reasonPhrase": "OK",
 *     "description": "The HTTP 200 OK success status response code indicates that the request has succeeded. A 200 response is cacheable by default. The meaning of a success depends on the HTTP request method: The successful result of a PUT or a DELETE is often not a 200 OK but a 204 No Content (or a 201 Created when the resource is uploaded for the first time).",
 *     "syntax": "200 OK",
 *     "link": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200",
 *     "examples": [],
 *     "specifications": [
 *       {
 *         "name": "HTTP Semantics # status.200",
 *         "link": "https://httpwg.org/specs/rfc9110.html#status.200"
 *       }
 *     ],
 *     "browserCompatibility": [
 *       {
 *         "name": "Chrome",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Edge",
 *         "supported": true,
 *         "version": "12"
 *       },
 *       {
 *         "name": "Firefox",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Opera",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Safari",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Chrome Android",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Firefox for Android",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Opera Android",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Safari on iOS",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Samsung Internet",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "WebView Android",
 *         "supported": true,
 *         "version": "Yes"
 *       }
 *     ]
 *   },
 *   "404": {...},
 *   ...
 * }
 * ```
 */
export interface HTTPStatusCodeDb {
    [key: string]: HTTPStatusCode;
}
/**
 * HTTP Status Code specification.
 * @example
 * ```json
 * {
 *   "name": "HTTP Semantics # status.200",
 *   "link": "https://httpwg.org/specs/rfc9110.html#status.200"
 * }
 * ```
 */
export interface HTTPStatusCodeSpecification {
    /**
     * HTTP Status Code specification name.
     */
    name: string;
    /**
     * HTTP Status Code specification documentation link.
     */
    link?: string;
}
/**
 * HTTP Status Code browser info.
 *
 * @example
 * ```json
 * {
 *   "name": "Chrome",
 *   "supported": true,
 *   "version": "65"
 * }
 * ```
 */
export interface HTTPStatusCodeBrowserInfo {
    /**
     * HTTP Status Code browser info name.
     */
    name: string;
    /**
     * HTTP Status Code browser info label version.
     */
    version: string;
    /**
     * If the HTTP Status Code is supported by the browser.
     */
    supported?: boolean;
}
/**
 * HTTP Status Code info
 *
 * @example
 * ```json
 * {
 *   "code": 200,
 *   "reasonPhrase": "OK",
 *   "description": "The HTTP 200 OK success status response code indicates that the request has succeeded. A 200 response is cacheable by default. The meaning of a success depends on the HTTP request method: The successful result of a PUT or a DELETE is often not a 200 OK but a 204 No Content (or a 201 Created when the resource is uploaded for the first time).",
 *   "syntax": "200 OK",
 *   "link": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200",
 *   "examples": [],
 *   "specifications": [
 *     {
 *       "name": "HTTP Semantics # status.200",
 *       "link": "https://httpwg.org/specs/rfc9110.html#status.200"
 *     }
 *   ],
 *   "browserCompatibility": [
 *     {
 *       "name": "Chrome",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Edge",
 *       "supported": true,
 *       "version": "12"
 *     },
 *     {
 *       "name": "Firefox",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Opera",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Safari",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Chrome Android",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Firefox for Android",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Opera Android",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Safari on iOS",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Samsung Internet",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "WebView Android",
 *       "supported": true,
 *       "version": "Yes"
 *     }
 *   ]
 * }
 * ```
 */
export interface HTTPStatusCode {
    /**
     * HTTP Status code.
     */
    code: number;
    /**
     * HTTP Status Code Reason Phrase.
     */
    reasonPhrase: string;
    /**
     * HTTP Status Code description.
     */
    description?: string;
    /**
     * HTTP Status Code note.
     */
    note?: string;
    /**
     * HTTP Status Code documentation link.
     */
    link?: string;
    /**
     * HTTP Status Code syntax example.
     */
    syntax?: string;
    /**
     * If set, this HTTP Status Code is experimental. The string represents the documentation description.
     */
    experimental?: string;
    /**
     * If set, it represents a warning message for this HTTP Status Code.
     */
    warning?: string;
    /**
     * HTTP Status Code examples.
     */
    examples: string[];
    /**
     * HTTP Status Code specifications.
     */
    specifications: HTTPStatusCodeSpecification[];
    /**
     * HTTP Status Code features browser compatibility list.
     */
    browserCompatibility: HTTPStatusCodeBrowserInfo[];
}
declare const _default: HTTPStatusCodeDb;
export default _default;
