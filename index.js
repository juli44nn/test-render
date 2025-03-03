const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'))

let notes = [
    
        {
            id: 1,
            contenido: "HTML is easy",
            important: true
          },
          {
            id: 2,
            contenido: "Browser can execute only JavaScript",
            important: false
          },
          {
            id: 3,
            contenido: "GET and POST are the most important methods of HTTP protocol",
            important: true
          }
    
]

app.get('/',(request,response)=>{
    response.send("<h1>hellow world</h1>")
})
app.get('/api/notes',(request,response)=>{
    response.json(notes)
})
app.get('/api/notes/:id',(request , response)=>{
    const id = Number(request.params.id);
    console.log(typeof id)
    const note = notes.find(note=>note.id ===id)
    if(note)
        response.json(note)
    else{
        request.statusMessage ="el recurso solicitado no existe";
        response.status(400).end()

    }
})
app.delete('/api/notes/:id',(request,response)=>{
    console.log("entre al delete")
    const id= Number(request.params.id)
    console.log(notes)
     notes = notes.filter(note=> note.id !==id)
    response.status(204).end();
})

app.post('/api/notes',(request,response)=>{
    const note = request.body;
    //console.log(note);
    //response.json(note);
    console.log(note);

    if(!note.contenido){
        return response.status(400).json({error:"contenido vacio"});
    }

    const newNote ={
        "content": note.contenido,
        "important": Boolean(note.important) || false,
        "id": generateId(),
    }

    notes = notes.concat(newNote);
    response.json(newNote);
})

const generateId = ()=>
{
    const max = notes.length >0 ? Math.max(...notes.map(n=>n.id)):0 ; 
    return max+1;
}



/*
const app = http.createServer((request,response)=>{
    response.writeHead(200,{'Content-type':'application/json'})
    response.end(JSON.stringify(notes))
})
    */
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`el servidor esta corriendo en el puerto ${PORT}`)
