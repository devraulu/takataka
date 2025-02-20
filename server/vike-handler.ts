/// <reference lib="webworker" />
import { createMiddleware } from 'hono/factory';
import { renderPage } from 'vike/server';

const vikeHandler = createMiddleware(async c => {
    const pageContextInit = {
        ...c,
        urlOriginal: c.req.url,
        headersOriginal: c.req.header(),
        user: c.var.user,
        session: c.var.session,
    };
    const pageContext = await renderPage(pageContextInit);
    const response = pageContext.httpResponse;

    const { readable, writable } = new TransformStream();
    response.pipe(writable);

    return c.body(readable, {
        status: response.statusCode,
        headers: response.headers,
    });
});

export default vikeHandler;
