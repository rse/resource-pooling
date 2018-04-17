
Resource-Pooling
=================

Simple Resource Pooling for Node.js

<p/>
<img src="https://nodei.co/npm/resource-pooling.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/resource-pooling.png" alt=""/>

Installation
------------

```shell
$ npm install resource-pooling
```

About
-----

This is a small Node.js library for simple resource pooling. The
resource can be an arbitrary object and usually is something like a
database connection.

Application Programming Interface
---------------------------------

The API of Resource-Pooling is a superset of the `Set` API:

- `constructor(): ResourcePooling`:<br/>
  Create the [MQTT.js](https://www.npmjs.com/package/mqtt) API wrapper.
  The `mqtt` is the [MQTT.js](https://www.npmjs.com/package/mqtt) instance.
  The optional `encoding` can be either `json` (default), `msgpack` or `cbor`.

- `ResourcePooling#register(method: string, callback: (...args: any[]) => any): void`:<br/>

License
-------

Copyright (c) 2018 Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

