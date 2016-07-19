# Microservices for Image Processing
An *experimental* nodejs microservices for image processing

Support for **Docker** through **Wercker**

## Prerequisites
- virtualbox 5.0.20
- boot2docker-vagrant
- wercker cli
- nodejs (optional)


### Start development with local nodejs
1. first install the dependencies using `npm install`  
2. execute `npm run bdd`   and keep it running in terminal

### Alternatives
For some reason you might don't want to use nodejs in your local machine. Then you can do this  
1. first install the dependencies using `wercker build`  
2. execute `wercker dev`   and keep it running in terminal

# Folder structures
1. Implement all services in *src*  
2. Implement all routing in *src/SERVICE_NAME/routes*  
3. Implement all test cases in *test*  


## Credits
Inspired by [MEANJS](https://github.com/meanjs/mean/)

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
