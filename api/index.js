// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/adapter/vercel/handler.js
var handle = (app2) => (req) => {
  return app2.fetch(req);
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/utils/body.js
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = ((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  });
  this.match = match2;
  return match2(method, path);
}

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = (children) => {
  for (const _ in children) {
    return true;
  }
  return false;
};
var Node2 = class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/.pnpm/hono@4.12.8/node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// src/shared/constants/api.ts
var CACHE_TTL = 3600;

// src/shared/constants/card.ts
var CARD_WIDTH = 450;
var CARD_HEIGHT = 290;
var CARD_PADDING = 24;
var CARD_BORDER_RADIUS = 16;

// src/shared/constants/github.ts
var GITHUB_API_BASE = "https://api.github.com";
var GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
var MAX_REPOS_PAGES = 10;
var REPOS_PER_PAGE = 100;

// src/shared/constants/themes.ts
var THEMES = {
  dark: {
    bg: "#0D1117",
    border: "#30363D",
    title: "#E6EDF3",
    text: "#E6EDF3",
    subtitle: "#8B949E",
    barBg: "#21262D"
  },
  tokyonight: {
    bg: "#1A1B27",
    border: "#414868",
    title: "#70A5FD",
    text: "#A9B1D6",
    subtitle: "#565F89",
    barBg: "#24283B"
  },
  dracula: {
    bg: "#282A36",
    border: "#6272A4",
    title: "#FF79C6",
    text: "#F8F8F2",
    subtitle: "#6272A4",
    barBg: "#44475A"
  },
  nord: {
    bg: "#2E3440",
    border: "#4C566A",
    title: "#88C0D0",
    text: "#ECEFF4",
    subtitle: "#4C566A",
    barBg: "#3B4252"
  },
  gruvbox: {
    bg: "#282828",
    border: "#504945",
    title: "#FABD2F",
    text: "#EBDBB2",
    subtitle: "#928374",
    barBg: "#3C3836"
  },
  catppuccin: {
    bg: "#1E1E2E",
    border: "#45475A",
    title: "#CBA6F7",
    text: "#CDD6F4",
    subtitle: "#6C7086",
    barBg: "#313244"
  },
  onedark: {
    bg: "#282C34",
    border: "#4B5263",
    title: "#61AFEF",
    text: "#ABB2BF",
    subtitle: "#5C6370",
    barBg: "#2C313C"
  },
  radical: {
    bg: "#141321",
    border: "#FE428E",
    title: "#FE428E",
    text: "#A9FEF7",
    subtitle: "#F8D847",
    barBg: "#1A1831"
  },
  light: {
    bg: "#FFFFFF",
    border: "#D0D7DE",
    title: "#24292F",
    text: "#24292F",
    subtitle: "#57606A",
    barBg: "#EFF1F3"
  }
};
var DEFAULT_THEME = "dark";

// src/shared/constants/tier.ts
var TIER_THRESHOLDS = [
  // Challenger (98~100)
  { name: "Challenger", division: null, minScore: 98, color: "#FF4655", gradient: ["#FF4655", "#FFD700"] },
  // Grandmaster (95~97)
  { name: "Grandmaster", division: null, minScore: 95, color: "#E44D4D", gradient: ["#E44D4D", "#FF6B6B"] },
  // Master (90~94)
  { name: "Master", division: null, minScore: 90, color: "#9B59B6", gradient: ["#9B59B6", "#C39BD3"] },
  // Diamond (80~89)
  { name: "Diamond", division: "I", minScore: 87, color: "#4FC3F7", gradient: ["#4FC3F7", "#81D4FA"] },
  { name: "Diamond", division: "II", minScore: 84, color: "#4FC3F7", gradient: ["#4FC3F7", "#81D4FA"] },
  { name: "Diamond", division: "III", minScore: 82, color: "#4FC3F7", gradient: ["#4FC3F7", "#81D4FA"] },
  { name: "Diamond", division: "IV", minScore: 80, color: "#4FC3F7", gradient: ["#4FC3F7", "#81D4FA"] },
  // Emerald (65~79)
  { name: "Emerald", division: "I", minScore: 76, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  { name: "Emerald", division: "II", minScore: 72, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  { name: "Emerald", division: "III", minScore: 68, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  { name: "Emerald", division: "IV", minScore: 65, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  // Platinum (50~64)
  { name: "Platinum", division: "I", minScore: 61, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  { name: "Platinum", division: "II", minScore: 57, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  { name: "Platinum", division: "III", minScore: 54, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  { name: "Platinum", division: "IV", minScore: 50, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  // Gold (35~49)
  { name: "Gold", division: "I", minScore: 46, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  { name: "Gold", division: "II", minScore: 42, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  { name: "Gold", division: "III", minScore: 39, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  { name: "Gold", division: "IV", minScore: 35, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  // Silver (20~34)
  { name: "Silver", division: "I", minScore: 31, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  { name: "Silver", division: "II", minScore: 27, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  { name: "Silver", division: "III", minScore: 24, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  { name: "Silver", division: "IV", minScore: 20, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  // Bronze (8~19)
  { name: "Bronze", division: "I", minScore: 17, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  { name: "Bronze", division: "II", minScore: 14, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  { name: "Bronze", division: "III", minScore: 11, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  { name: "Bronze", division: "IV", minScore: 8, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  // Iron (0~7)
  { name: "Iron", division: "I", minScore: 6, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
  { name: "Iron", division: "II", minScore: 4, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
  { name: "Iron", division: "III", minScore: 2, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
  { name: "Iron", division: "IV", minScore: 0, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] }
];

// src/shared/lib/github-fetch.ts
var FETCH_TIMEOUT_MS = 8e3;
async function githubFetch(path) {
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "github-tier"
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await fetch(`${GITHUB_API_BASE}${path}`, {
      headers,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// src/shared/lib/fetch-avatar-base64.ts
async function fetchAvatarBase64(url) {
  try {
    const avatarUrl = new URL(url);
    avatarUrl.searchParams.set("s", "96");
    const res = await fetch(avatarUrl.toString(), {
      signal: AbortSignal.timeout(5e3)
    });
    if (!res.ok) return "";
    const buffer = await res.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    const contentType = res.headers.get("content-type") ?? "image/png";
    return `data:${contentType};base64,${base64}`;
  } catch {
    return "";
  }
}

// src/shared/lib/utils/escape-xml.ts
function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// src/shared/lib/utils/truncate.ts
function truncateText(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "\u2026";
}

// src/shared/lib/utils/validate-username.ts
var GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
function isValidGitHubUsername(username) {
  return GITHUB_USERNAME_REGEX.test(username);
}

// src/features/github/api/fetch-github-stats.ts
async function fetchUser(username) {
  return githubFetch(`/users/${username}`);
}
async function fetchContributions(username) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalPullRequestReviewContributions
          restrictedContributionsCount
        }
      }
    }
  `;
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    signal: AbortSignal.timeout(8e3)
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.user?.contributionsCollection ?? null;
}
async function fetchTotalStars(username) {
  const pagePromises = Array.from(
    { length: MAX_REPOS_PAGES },
    (_, i) => githubFetch(
      `/users/${username}/repos?per_page=${REPOS_PER_PAGE}&page=${i + 1}&type=owner`
    )
  );
  const pages = await Promise.all(pagePromises);
  let stars = 0;
  for (const repos of pages) {
    if (!repos || repos.length === 0) break;
    for (const repo of repos) {
      stars += repo.stargazers_count ?? 0;
    }
    if (repos.length < REPOS_PER_PAGE) break;
  }
  return stars;
}
async function fetchGitHubStats(username) {
  try {
    const user = await fetchUser(username);
    if (!user) return null;
    const [contributions, stars] = await Promise.all([
      fetchContributions(username),
      fetchTotalStars(username)
    ]);
    const publicCommits = contributions?.totalCommitContributions ?? 0;
    const privateCommits = contributions?.restrictedContributionsCount ?? 0;
    return {
      username: user.login,
      name: user.name ?? user.login,
      avatarUrl: user.avatar_url,
      commits: publicCommits + privateCommits,
      stars,
      prs: contributions?.totalPullRequestContributions ?? 0,
      issues: contributions?.totalIssueContributions ?? 0,
      followers: user.followers,
      repos: user.public_repos
    };
  } catch {
    return null;
  }
}

// src/features/tier/lib/calculate-percentile.ts
var MEDIANS = {
  commits: 250,
  stars: 3,
  prs: 5,
  followers: 3,
  issues: 2
};
var WEIGHTS = {
  commits: 5,
  stars: 3,
  prs: 1,
  followers: 0.5,
  issues: 0.5
};
var TOTAL_WEIGHT = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
function logNormalCdf(x) {
  return x / (1 + x);
}
function metricCdf(metric, value) {
  return logNormalCdf(value / MEDIANS[metric]);
}
function calculateRank(stats) {
  let weightedSum = 0;
  for (const key of Object.keys(WEIGHTS)) {
    weightedSum += WEIGHTS[key] * metricCdf(key, stats[key]);
  }
  const score = Math.round(weightedSum / TOTAL_WEIGHT * 100);
  return Math.max(0, Math.min(100, score));
}

// src/features/tier/lib/calculate-score.ts
function calculateScore(stats) {
  const commits = Math.round(metricCdf("commits", stats.commits) * 100);
  const stars = Math.round(metricCdf("stars", stats.stars) * 100);
  const prs = Math.round(metricCdf("prs", stats.prs) * 100);
  const followers = Math.round(metricCdf("followers", stats.followers) * 100);
  const issues = Math.round(metricCdf("issues", stats.issues) * 100);
  const total = calculateRank({
    commits: stats.commits,
    stars: stats.stars,
    prs: stats.prs,
    followers: stats.followers,
    issues: stats.issues
  });
  return { commits, stars, prs, followers, issues, total };
}

// src/features/tier/lib/resolve-tier.ts
var PREMIUM_TIER_NAMES = /* @__PURE__ */ new Set(["Diamond", "Master", "Grandmaster", "Challenger"]);
var ELITE_TIER_NAMES = /* @__PURE__ */ new Set(["Master", "Grandmaster", "Challenger"]);
function calculatePercentileRank(score) {
  const mapping = [
    [98, 100, 0.01, 0.05],
    [95, 97, 0.05, 0.3],
    [90, 94, 0.3, 1],
    [87, 89, 1, 1.5],
    [84, 86, 1.5, 2],
    [82, 83, 2, 3],
    [80, 81, 3, 4],
    [76, 79, 4, 6],
    [72, 75, 6, 8],
    [68, 71, 8, 11],
    [65, 67, 11, 14],
    [61, 64, 14, 18],
    [57, 60, 18, 22],
    [54, 56, 22, 27],
    [50, 53, 27, 32],
    [46, 49, 32, 38],
    [42, 45, 38, 44],
    [39, 41, 44, 50],
    [35, 38, 50, 55],
    [31, 34, 55, 62],
    [27, 30, 62, 68],
    [24, 26, 68, 73],
    [20, 23, 73, 78],
    [17, 19, 78, 82],
    [14, 16, 82, 86],
    [11, 13, 86, 89],
    [8, 10, 89, 92],
    [6, 7, 92, 94],
    [4, 5, 94, 96],
    [2, 3, 96, 98],
    [0, 1, 98, 99]
  ];
  for (const [min, max, topStart, topEnd] of mapping) {
    if (score >= min && score <= max) {
      const ratio = max === min ? 0 : (score - min) / (max - min);
      const result = topStart + (topEnd - topStart) * (1 - ratio);
      return Math.round(result * 10) / 10;
    }
  }
  return 99;
}
function buildTierInfo(name, division, score, color, gradient) {
  return {
    name,
    division,
    displayName: division ? `${name} ${division}` : name,
    score,
    percentileRank: calculatePercentileRank(score),
    color,
    gradient,
    isPremium: PREMIUM_TIER_NAMES.has(name),
    isElite: ELITE_TIER_NAMES.has(name)
  };
}
function resolveTier(score) {
  for (const tier of TIER_THRESHOLDS) {
    if (score >= tier.minScore) {
      return buildTierInfo(tier.name, tier.division, score, tier.color, tier.gradient);
    }
  }
  const fallback = TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];
  return buildTierInfo(fallback.name, fallback.division, score, fallback.color, fallback.gradient);
}

// src/features/card/lib/render-tier-emblem.ts
function renderTierEmblem(tier) {
  const tierName = tier.name;
  const division = tier.division ?? "";
  if (tierName === "Challenger") {
    return renderEliteEmblem(tier, "CHALLENGER", 11, 1.5);
  }
  if (tierName === "Grandmaster") {
    return renderEliteEmblem(tier, "GRANDMASTER", 12, 0.5);
  }
  if (tierName === "Master") {
    return renderEliteEmblem(tier, "MASTER", 14, 3);
  }
  return renderHexEmblem(tier, division);
}
function renderEliteEmblem(tier, label, fontSize, letterSpacing) {
  const [, g2] = tier.gradient;
  const isChallenger = tier.name === "Challenger";
  const cx = 55;
  return `
    <defs>
      <linearGradient id="glare_${tier.name}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="40%" stop-color="#fff" stop-opacity="0.4"/>
        <stop offset="60%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        <animate attributeName="x1" values="-1;2" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="0;3" dur="3s" repeatCount="indefinite"/>
      </linearGradient>
      <filter id="eliteGlow_${tier.name}" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="${tier.color}" flood-opacity="0.6"/>
        <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="${tier.color}" flood-opacity="0.2"/>
      </filter>
      <clipPath id="textClip_${tier.name}">
        <rect x="0" y="10" width="110" height="60"/>
      </clipPath>
    </defs>

    <!-- Top decoration: pointed arrows -->
    <path d="M${cx - 30},18 L${cx - 20},18 L${cx},8 L${cx + 20},18 L${cx + 30},18"
      fill="none" stroke="${tier.color}" stroke-width="1" stroke-opacity="0.5"/>
    <path d="M${cx - 5},6 L${cx},2 L${cx + 5},6"
      fill="${tier.color}" fill-opacity="0.4"/>

    ${isChallenger ? `
    <!-- Crown above -->
    <path d="M${cx - 10},2 L${cx - 6},-4 L${cx - 2},1 L${cx},-6 L${cx + 2},1 L${cx + 6},-4 L${cx + 10},2"
      fill="none" stroke="${g2}" stroke-width="1.2" stroke-opacity="0.8"/>
    ` : ""}

    <!-- Tier text with glow -->
    <text x="${cx}" y="38" text-anchor="middle" dominant-baseline="central"
      font-size="${fontSize}" font-weight="900" letter-spacing="${letterSpacing}" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}" filter="url(#eliteGlow_${tier.name})">${label}</text>

    <!-- Glare sweep on text -->
    <g clip-path="url(#textClip_${tier.name})">
      <text x="${cx}" y="38" text-anchor="middle" dominant-baseline="central"
        font-size="${fontSize}" font-weight="900" letter-spacing="${letterSpacing}" font-family="Segoe UI, Ubuntu, sans-serif"
        fill="url(#glare_${tier.name})">${label}</text>
    </g>

    <!-- Bottom decoration: pointed arrows (mirrored) -->
    <path d="M${cx - 30},56 L${cx - 20},56 L${cx},66 L${cx + 20},56 L${cx + 30},56"
      fill="none" stroke="${tier.color}" stroke-width="1" stroke-opacity="0.5"/>
    <path d="M${cx - 5},68 L${cx},72 L${cx + 5},68"
      fill="${tier.color}" fill-opacity="0.4"/>

    <!-- Side accent diamonds -->
    <path d="M4,38 L8,34 L12,38 L8,42 Z" fill="${tier.color}" fill-opacity="0.25"/>
    <path d="M${cx * 2 - 12},38 L${cx * 2 - 8},34 L${cx * 2 - 4},38 L${cx * 2 - 8},42 Z" fill="${tier.color}" fill-opacity="0.25"/>
  `;
}
function renderHexEmblem(tier, division) {
  const isPremium = tier.name === "Diamond";
  const nameFontSize = tier.name.length > 7 ? 9 : 11;
  const nameUpper = tier.name.toUpperCase();
  const fillOpacity = isPremium ? "0.18" : "0.15";
  const innerOpacity = "0.08";
  const glare = isPremium ? `
    <defs>
      <linearGradient id="glare_Diamond" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="40%" stop-color="#fff" stop-opacity="0.2"/>
        <stop offset="60%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        <animate attributeName="x1" values="-1;2" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="0;3" dur="3s" repeatCount="indefinite"/>
      </linearGradient>
    </defs>
    <polygon points="40,0 80,22 80,66 40,88 0,66 0,22"
      fill="none" stroke="${tier.color}" stroke-width="0.6" stroke-opacity="0.12" filter="url(#glow)"/>
    <polygon points="40,0 80,22 80,66 40,88 0,66 0,22"
      fill="url(#glare_Diamond)"/>
  ` : "";
  if (division) {
    return `
    ${glare}
    <polygon points="40,0 80,22 80,66 40,88 0,66 0,22"
      fill="url(#emblemGrad)" fill-opacity="${fillOpacity}"
      stroke="url(#emblemGrad)" stroke-width="2"/>
    <polygon points="40,7 73,25 73,63 40,81 7,63 7,25"
      fill="url(#emblemGrad)" fill-opacity="${innerOpacity}"/>
    <text x="40" y="36" text-anchor="middle" dominant-baseline="central"
      font-size="${nameFontSize}" font-weight="800" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}">${nameUpper}</text>
    <text x="40" y="54" text-anchor="middle" dominant-baseline="central"
      font-size="14" font-weight="800" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}">${division}</text>
    `;
  }
  return `
    <polygon points="40,0 80,22 80,66 40,88 0,66 0,22"
      fill="url(#emblemGrad)" fill-opacity="${fillOpacity}"
      stroke="url(#emblemGrad)" stroke-width="2"/>
    <polygon points="40,7 73,25 73,63 40,81 7,63 7,25"
      fill="url(#emblemGrad)" fill-opacity="${innerOpacity}"/>
    <text x="40" y="46" text-anchor="middle" dominant-baseline="central"
      font-size="${nameFontSize}" font-weight="800" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}">${nameUpper}</text>
  `;
}

// src/features/card/lib/render-stat-bars.ts
var STAT_LABELS = [
  { key: "commits", label: "Commits" },
  { key: "stars", label: "Stars" },
  { key: "prs", label: "PRs" },
  { key: "followers", label: "Followers" },
  { key: "issues", label: "Issues" }
];
var BAR_HEIGHT = 8;
var BAR_GAP = 28;
var LABEL_WIDTH = 70;
var VALUE_WIDTH = 36;
function renderStatBars(breakdown, color, totalWidth, theme) {
  const barWidth = totalWidth - LABEL_WIDTH - VALUE_WIDTH;
  return STAT_LABELS.map(({ key, label }, i) => {
    const value = Math.round(breakdown[key]);
    const filled = Math.round(value / 100 * barWidth);
    const y = i * BAR_GAP;
    return `
      <g transform="translate(0, ${y})">
        <text x="0" y="${BAR_HEIGHT + 4}" font-size="12" fill="${theme.subtitle}">${label}</text>
        <rect x="${LABEL_WIDTH}" y="0" width="${barWidth}" height="${BAR_HEIGHT}" rx="4" fill="${theme.barBg}"/>
        <rect x="${LABEL_WIDTH}" y="0" width="${filled}" height="${BAR_HEIGHT}" rx="4" fill="${color}" opacity="0.8"/>
        <text x="${LABEL_WIDTH + barWidth + 8}" y="${BAR_HEIGHT + 4}" font-size="11" font-weight="600" fill="${theme.text}">${value}</text>
      </g>
    `;
  }).join("");
}

// src/features/card/lib/render-premium-effects.ts
function renderPremiumEffects(w, h, r, tier) {
  const [g1, g2] = tier.gradient;
  const isChallenger = tier.name === "Challenger";
  const isGrandmaster = tier.name === "Grandmaster";
  const isMaster = tier.name === "Master";
  const blurAmount = isChallenger ? "6" : isGrandmaster ? "5" : isMaster ? "4" : "3";
  const strokeWidth = isChallenger ? "2.5" : isGrandmaster ? "2" : isMaster ? "1.8" : "1.5";
  let extra = "";
  if (isChallenger) {
    extra = `
    <defs>
      <linearGradient id="premiumBorder2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${g2}"/>
        <stop offset="50%" stop-color="${g1}" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="${g2}"/>
      </linearGradient>
      <radialGradient id="challengerShine" cx="0.3" cy="0.2" r="0.8">
        <stop offset="0%" stop-color="${g2}" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="${g2}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" rx="${r}" fill="url(#challengerShine)"/>
    <rect width="${w}" height="${h}" rx="${r}" fill="none"
      stroke="url(#premiumBorder2)" stroke-width="1" stroke-opacity="0.4" filter="url(#borderGlow)"/>
    `;
  }
  if (isGrandmaster) {
    extra = `
    <defs>
      <radialGradient id="gmShine" cx="0.7" cy="0.15" r="0.7">
        <stop offset="0%" stop-color="${g1}" stop-opacity="0.06"/>
        <stop offset="100%" stop-color="${g1}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" rx="${r}" fill="url(#gmShine)"/>
    `;
  }
  return `
    <defs>
      <linearGradient id="premiumBorder" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${g1}"/>
        <stop offset="50%" stop-color="${g2}"/>
        <stop offset="100%" stop-color="${g1}"/>
      </linearGradient>
      <filter id="borderGlow">
        <feGaussianBlur stdDeviation="${blurAmount}" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="${w}" height="${h}" rx="${r}" fill="none"
      stroke="url(#premiumBorder)" stroke-width="${strokeWidth}" filter="url(#borderGlow)"/>
    ${extra}
  `;
}

// src/features/card/lib/render-tier-card.ts
var MAX_NAME_LENGTH = 18;
var MAX_NAME_LENGTH_ELITE = 15;
function renderTierCard({ stats, tier, breakdown, theme, avatarBase64 }) {
  const w = CARD_WIDTH;
  const h = CARD_HEIGHT;
  const r = CARD_BORDER_RADIUS;
  const p = CARD_PADDING;
  const [g1, g2] = tier.gradient;
  const avatarHref = escapeXml(avatarBase64 || stats.avatarUrl);
  const emblemSize = tier.isElite ? 110 : 80;
  const emblemX = w - p - emblemSize;
  const emblemY = tier.isElite ? p : p - 4;
  const nameX = p + 48 + 14;
  const maxLen = tier.isElite ? MAX_NAME_LENGTH_ELITE : MAX_NAME_LENGTH;
  const barsY = p + 48 + 56;
  const barsWidth = w - p * 2;
  const safeName = escapeXml(truncateText(stats.name, maxLen));
  const safeUsername = escapeXml(stats.username);
  const glowOpacity1 = tier.isPremium ? "0.25" : "0.1";
  const glowOpacity2 = tier.isPremium ? "0.1" : "0.03";
  return `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  <defs>
    <linearGradient id="tierGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${g1}" stop-opacity="${glowOpacity1}"/>
      <stop offset="100%" stop-color="${g2}" stop-opacity="${glowOpacity2}"/>
    </linearGradient>
    <linearGradient id="emblemGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${g1}"/>
      <stop offset="100%" stop-color="${g2}"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="avatarClip"><circle cx="24" cy="24" r="22"/></clipPath>
  </defs>

  <style>
    * { font-family: 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif; }
  </style>

  <!-- Background -->
  <rect width="${w}" height="${h}" rx="${r}" fill="${theme.bg}"/>
  <rect width="${w}" height="${h}" rx="${r}" fill="url(#tierGlow)"/>
  <rect width="${w}" height="${h}" rx="${r}" fill="none" stroke="${theme.border}" stroke-width="1" stroke-opacity="${tier.isPremium ? "0.2" : "0.5"}"/>

  ${tier.isPremium ? renderPremiumEffects(w, h, r, tier) : ""}

  <!-- Avatar -->
  <g transform="translate(${p}, ${p})">
    <image href="${avatarHref}" x="2" y="2" width="44" height="44" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>
    <circle cx="24" cy="24" r="22" fill="none" stroke="${tier.color}" stroke-width="2" stroke-opacity="0.6"/>
  </g>

  <!-- User Info -->
  <g>
    <text x="${nameX}" y="${p + 18}" font-size="15" font-weight="700" fill="${theme.title}">${safeName}</text>
    <text x="${nameX}" y="${p + 34}" font-size="11" fill="${theme.subtitle}">@${safeUsername}</text>
    <text x="${nameX}" y="${p + 50}" font-size="10" font-weight="600" fill="${tier.color}">Top ${tier.percentileRank}%</text>
  </g>

  <!-- Tier Emblem -->
  <g transform="translate(${emblemX}, ${emblemY})">
    ${renderTierEmblem(tier)}
  </g>

  <!-- Stat Bars -->
  <g transform="translate(${p}, ${barsY})">
    ${renderStatBars(breakdown, tier.color, barsWidth, theme)}
  </g>
</svg>`.trim();
}

// src/routes/tier.ts
async function tierHandler(c) {
  const username = c.req.query("user");
  const themeName = c.req.query("theme") ?? DEFAULT_THEME;
  if (!username) {
    return c.json({ error: "Missing 'user' query parameter" }, 400);
  }
  if (!isValidGitHubUsername(username)) {
    return c.json({ error: "Invalid GitHub username" }, 400);
  }
  try {
    const stats = await fetchGitHubStats(username);
    if (!stats) {
      return c.json({ error: `User '${username}' not found` }, 404);
    }
    const theme = THEMES[themeName] ?? THEMES[DEFAULT_THEME];
    const breakdown = calculateScore(stats);
    const tier = resolveTier(breakdown.total);
    const avatarBase64 = await fetchAvatarBase64(stats.avatarUrl);
    const svg = renderTierCard({ stats, tier, breakdown, theme, avatarBase64 });
    return c.body(svg, 200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}`
    });
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
}

// src/app.ts
var app = new Hono2();
app.get("/api/tier", tierHandler);

// src/entry-edge.ts
var config = {
  runtime: "edge"
};
var entry_edge_default = handle(app);
export {
  config,
  entry_edge_default as default
};
