# src/app.ts

Let's go through `app.ts` line by line, word by word, with beginner-friendly explanations and real-world examples.

---

## The full file

```typescript
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Event Management Server is running!');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
```

---

## Line by line

### `import cors from 'cors';`

`import` means "bring this tool into this file so I can use it."
`cors` is the name we're giving it. `from 'cors'` is the npm package it comes from.

**What is CORS?** CORS stands for Cross-Origin Resource Sharing. Imagine your frontend is running at `http://localhost:3000` and your backend is at `http://localhost:5000`. By default, browsers block requests between different origins (different ports count). `cors` adds special HTTP headers that tell the browser "yes, this is allowed."

Real example: your React app at port 3000 wants to fetch data from your Express server at port 5000 — without `cors`, that request gets blocked by the browser.

---

### `import express, { Application, Request, Response } from 'express';`

`express` is the main Express library — the framework that lets you build web servers in Node.js.

The `{ Application, Request, Response }` part inside the curly braces are TypeScript types:

- `Application` — the type for the whole Express app object
- `Request` — the type for an incoming HTTP request (`req`) — it has things like `req.body`, `req.params`
- `Response` — the type for the outgoing HTTP response (`res`) — it has things like `res.send()`, `res.json()`

Think of types as labels that tell TypeScript: "this variable should be shaped like this."

---

### `import router from './routes';`

`./routes` means "go to the `routes` folder in the same directory." The `index.ts` file inside that folder exports a `router` object that has all the route definitions (events, users, AI) combined. We import it here so the app knows about all our routes.

---

### `const app: Application = express();`
- this is the first things to do in app.ts : create a application and define type (:) which comes from @types/express

`const` — creates a constant variable (a value that won't be reassigned).
`app` — the name we're giving our Express application.
`: Application` — TypeScript annotation saying "this variable must be of type Application."
`= express()` — we're calling the `express` function, which creates and returns a new Express app.

Real example: think of `express()` like opening a new restaurant. `app` is that restaurant. Everything you do after this — adding menus (routes), setting rules (middleware) — is configuring that restaurant.

---

### `app.use(express.json());`

`app.use()` registers middleware. Middleware is a function that runs on every request before it reaches your route handler.

`express.json()` is a built-in Express middleware that reads the raw request body and converts it from JSON text into a real JavaScript object, placing it on `req.body`.

Real example: you send a POST request with this body:
```json
{ "title": "Music Festival", "location": "Dhaka" }
```
Without `express.json()`, `req.body` would be `undefined`. With it, `req.body` becomes a real JS object you can use.

---

### `app.use(cors());`

Again `app.use()` to register middleware, this time the `cors` package. Calling `cors()` with no arguments enables it for all origins by default.

This adds an `Access-Control-Allow-Origin: *` header to every response, which tells the browser: "any website is allowed to talk to this server."

---

### `app.use('/api/v1', router);`

`app.use(path, handler)` mounts something at a given URL path.

Here, all routes defined inside `router` are mounted under `/api/v1`. So if `router` has a route for `/events`, it becomes accessible at `/api/v1/events`.

The `/v1` part is API versioning — if you ever need to make breaking changes, you can create `/api/v2` without removing the old version.

Real example: it's like naming a section of a building. All offices related to events are on the `/api/v1` floor.

---

### `app.get('/', (req: Request, res: Response) => { ... })`

`app.get()` defines a route that responds to HTTP `GET` requests.
`'/'` is the URL path — the root of the server.
`(req, res) => { ... }` is an arrow function — the handler that runs when someone visits `/`.

`req` — the incoming request object (what the client sent).
`res` — the response object (what we send back).

`res.send('Event Management Server is running!')` — sends a plain text response back to whoever made the request.

Real example: visiting `http://localhost:5000/` in a browser would display the text "Event Management Server is running!" — a simple health check.

---

### The 404 handler

```typescript
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});
```

`app.use()` with no path matches every request. Because it's placed after all other routes, it only runs when nothing above matched — making it a catch-all.

`res.status(404)` — sets the HTTP status code to 404 (Not Found).
`.json({ ... })` — sends a JSON response body.
`success: false` — a custom field telling the client the request failed.
`message: 'Route not found'` — a human-readable explanation.

Real example: if someone visits `/api/v1/blabla` which doesn't exist, instead of a confusing HTML error page from Express, they get a clean JSON error they can handle in their frontend.

---

### `export default app;`

`export default` makes `app` available to other files that import it.
`server.ts` imports this `app` and calls `app.listen()` on it to actually start the server.

Without this line, `server.ts` wouldn't be able to access the configured app.

---

Now here's how the whole file flows when a request comes in:---

## Summary — what `app.ts` does overall

Think of `app.ts` as the **reception desk of a hotel**. When a guest (HTTP request) arrives:

1. The security guard checks their luggage (`express.json()` — reads and parses the request body)
2. The front desk stamps their visitor pass (`cors()` — allows cross-origin access)
3. The receptionist directs them to the right floor (`app.use('/api/v1', router)` — routes to the correct handler)
4. If nobody is home, they're politely told the room doesn't exist (`404 handler`)
5. If you just want to know if the hotel is open, you check the lobby (`app.get('/')` health check)

Crucially, `app.ts` **never opens the hotel** — it just sets up the rules. `server.ts` is the one that actually opens the doors by calling `app.listen()`.