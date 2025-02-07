/// <reference lib="webworker" />
import { createMiddleware } from "hono/factory";
import { renderPage } from "vike/server";

export const vikeHandler = createMiddleware(async (c) => {
  const pageContextInit = {
    c,
    urlOriginal: c.req.url,
    headersOriginal: c.req.header(),
    // add user info
  };
  const pageContext = await renderPage(pageContextInit);
  const response = pageContext.httpResponse;

  const { readable, writable } = new TransformStream();
  response.pipe(writable);

  return new Response(readable, {
    status: response.statusCode,
    headers: response.headers,
  });
});
