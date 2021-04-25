import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, Headers, Http, RequestMethod, Response, ResponseOptions} from '@angular/http';

/**
 * This class is used instead real Angular Http service from @angular/http package.
 * Main purpose of this class is to act like real backend and return fake http responses.
 * Do NOT use this class in production code, instead use real Angular Http service.
 */
export function mockBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
  backend.connections.subscribe((connection: MockConnection) => {
    if (connection.request.url.endsWith('/login') && connection.request.method === RequestMethod.Post) {
      const body = JSON.parse(connection.request.getBody());
      checkCredentials(body, connection);
    } else if (connection.request.url.endsWith('/todos') && connection.request.method === RequestMethod.Get) {
      if (connection.request.headers.get('Authorization') === 'fakeToken') {
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: generateJsonResponseBody()})));
      } else {
        connection.mockRespond(new Response(new ResponseOptions({status: 401})));
      }
    } else {
      connection.mockRespond(new Response(new ResponseOptions({status: 404})));
    }
  });
  return new Http(backend, options);
}

function checkCredentials(body: any, connection: MockConnection) {
  if (body.email === 'test@test.com' && body.password === 'password') {
    connection.mockRespond(new Response(generateMockResponseOptions()));
  } else {
    connection.mockError(new Error('Wrong credentials'));
  }
}

// generate fake response options
function generateMockResponseOptions(): ResponseOptions {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Set-Authorization', 'fakeToken');

  return new ResponseOptions({
    headers: headers,
    status: 200,
    url: 'your-app.com/login',
    body: `{"firstName": "Name", "lastName": "SecondName"}`
  });
}

function generateJsonResponseBody(): string {
  return `[
    {"title":"Todo 1", "content": "This is test content 1"},
    {"title":"Todo 2", "content": "This is test content 2"},
    {"title":"Todo 3", "content": "This is test content 3"},
    {"title":"Todo 4", "content": "This is test content 4"},
    {"title":"Todo 5", "content": "This is test content 5"},
    {"title":"Todo 6", "content": "This is test content 6"},
    {"title":"Todo 7", "content": "This is test content 7"},
    {"title":"Todo 8", "content": "This is test content 8"},
    {"title":"Todo 9", "content": "This is test content 9"}
  ]`;
}
