# Interceptors
Given that they are rarely used in nodejs, Express JS has a library `express-interceptor` to intercept the response from a route giving the flexibility to allows you to define a previous step before sending a response to the client.

##### Some use cases include:
Store statistics about responses.
Set response headers based on tags in the response body.
Dynamically inject live-reload objects to JSON.

### Example of new route reference
All the new interceptors middlewares lives in `index.interceptor.ts`, so let's open it up and add the following code:
```js

import { injectHeaderToken } from "./header.token.interceptor";
export function setInterceptors(app: any): void {
  injectHeaderToken(app);
}

```
### Example of the route file with reference to a controllers

```js
/**
 * HEADER TOKEN INTERCEPTOR.
 */
// Interceptor (route handlers)
const interceptor = require('express-interceptor');

export function injectHeaderToken(app: any): void {

  const injectToken = interceptor(function(req: any, res: { get: (arg0: string) => string; }){
    return {
      // Only HTML responses will be intercepted
      isInterceptable: function(){
        return /application\/json/.test(res.get('Content-Type'));
      },
      // Appends a paragraph at the end of the response body
      intercept: function(body: any, send: (arg0: any) => void) {
       //LOGIC HERE
      }
    };
  })

  // Add the interceptor middleware
  app.use(injectToken);
  
}
  ```
### Interceptors Middlewares
Having the interceptors separated would give the flexibility to make your code more modular and also use customizable. There would be some cases that you won't need to call the same interceptor middleware for all the responses.
