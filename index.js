const api = require("./api")
const express = require("express")
const server = express();
global.atob = require("atob");
const fs = require("fs");
var Base64 = require("js-base64").Base64;


server.use(express.json())


server.listen(8000)


server.get('/:invoicekey', async (req, res )=> {
    
    const invoicekey = req.params.invoicekey

    try {
        const {data} = await api.get(`/MILLENIUM_LOG.DOCUMENTOS.NOTA_FISCAL?base64=T&idnfe=${invoicekey}`)
        data?.value?.map(({conteudo}) =>{

        res.send({conteudo})
        

let stringToDecode = conteudo



var bin = Base64.atob(stringToDecode);

fs.writeFile('result_binary.pdf', bin, 'binary', error => {
    if (error) {
        throw error;
    } else {
        console.log('binary saved!');
    }
});
var buf = Buffer.from(stringToDecode, 'base64');
// Your code to handle buffer
fs.writeFile('result_buffer.pdf', buf, error => {
    if (error) {
        throw error;
    } else {
        console.log('buffer saved!');
    }
});

        })  
    } catch (error) {
        res.send({error: error.message})
    }
})
