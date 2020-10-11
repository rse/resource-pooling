/*
**  Resource-Pooling -- Simple Resource Pooling
**  Copyright (c) 2018-2020 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  the API class  */
class API {
    constructor () {
        this.resourcesKnown  = new Set()
        this.resourcesUnused = new Set()
    }
    add (res) {
        if (this.resourcesKnown.has(res))
            throw new Error("resource already in pool")
        this.resourcesKnown.add(res)
        this.resourcesUnused.add(res)
        return this
    }
    remove (res, force = false) {
        if (!this.resourcesKnown.has(res))
            throw new Error("resource not in pool")
        if (!this.resourcesUnused.has(res) && !force)
            throw new Error("resource still in use")
        this.resourcesKnown.delete(res)
        this.resourcesUnused.delete(res)
        return this
    }
    clear () {
        this.resourcesKnown.clear()
        return this
    }
    has (res) {
        return this.resourcesKnown.has(res)
    }
    size () {
        return this.resourcesKnown.size
    }
    values () {
        return this.resourcesKnown.values()
    }
    forEach (cb) {
        this.resourcesKnown.forEach(cb)
        return this
    }
    acquire (retries = 10, delay = 100) {
        if (this.resourcesKnown.size === 0)
            throw new Error("still no resources in pool")
        return new Promise((resolve, reject) => {
            const take = () => {
                if (this.resourcesUnused.size > 0) {
                    const res = this.resourcesUnused.values().next()
                    this.resourcesUnused.delete(res.value)
                    resolve(res.value)
                }
                else {
                    retries--
                    if (retries < 0)
                        reject(new Error("failed to aquire resource from pool"))
                    else
                        setTimeout(() => { take() }, delay)
                }
            }
            take()
        })
    }
    release (res) {
        if (!this.resourcesKnown.has(res))
            throw new Error("resource not known in pool")
        if (this.resourcesUnused.has(res))
            throw new Error("resource still not used")
        this.resourcesUnused.add(res)
        return this
    }
    used (res) {
        return !this.resourcesUnused.has(res)
    }
    use (cb, retries = 10, delay = 100) {
        return this.acquire(retries, delay).then(async (res) => {
            return cb(res).then((result) => {
                this.release(res)
                return result
            }, (err) => {
                this.release(res)
                throw err
            })
        }, (err) => {
            throw err
        })
    }
    async drain (cb, retries = 10, delay = 100) {
        while (this.size() > 0) {
            await this.acquire(retries, delay).then((res) => {
                return cb(res).then((result) => {
                    this.remove(res, true)
                    return result
                }, (err) => {
                    this.release(res)
                    throw err
                })
            }, (err) => {
                throw err
            })
        }
        return this
    }
}

/*  export the standard way  */
module.exports = API

