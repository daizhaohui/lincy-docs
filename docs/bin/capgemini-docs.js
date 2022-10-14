#! /usr/bin/env node

const static = require('node-static');
const path = require('path');
const root = __dirname.slice(0,-4);
const fileServer = new static.Server(root);
const net=require('net');

const portIsOccupied=(port)=>{
    const server=net.createServer().listen(port)
    return new Promise((resolve,reject)=>{
        server.on('listening',()=>{
            server.close()
            resolve(port)
        })
        server.on('error',(err)=>{
            if(err.code==='EADDRINUSE'){
                resolve(portIsOccupied(port+1))//注意这句，如占用端口号+1
            }else{
                reject(err)
            }
        })
    })
};

const startServer=(port)=>{
    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            fileServer.serve(request, response, function (e, res) {
              if (e && (e.status === 404)) {
                  fileServer.serveFile(path.join(root,'404.html'), 404, {}, request, response);
              }
          });
        }).resume();
    }).listen(port);
};

const openBrowser = (port)=>{
    const child_process = require('child_process'),
    url = `http://localhost:${port}/`;

    if (process.platform == 'wind32') {
        cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
    } else if (process.platform == 'linux') {
        cmd = 'xdg-open';
    } else if (process.platform == 'darwin') {
        cmd = 'open';
    }
    child_process.exec(`${cmd} "${url}"`);
};

portIsOccupied(9000).then(port=>{
    startServer(port);
    console.log(`http://localhost:${port}/`);
    setTimeout(()=>{
        openBrowser(port);
    },1000);
});
 

