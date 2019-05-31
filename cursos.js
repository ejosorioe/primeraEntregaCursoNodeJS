const fs = require('fs');
const express = require('express')
const app = express()

const cursos = [{
                    id: 1,
                    nombre:'Estructura de datos',
                    duracion:'20 horas',
                    valor: '200000',
                    demand: true,
                },
                {
                    id: 2,
                    nombre:'Programacion orientada a objetos',
                    duracion:'30 horas',
                    valor: '250000',
                    demand: true,
                },
                {
                    id: 3,
                    nombre:'Bases de datos',
                    duracion:'40 horas',
                    valor: '350000',
                    demand: true,
                }]
/*
setTimeout(function(){
console.log('el curso con id ' +cursos[0].id+' llamado '+cursos[0].nombre+' tiene una duracion de '+
cursos[0].duracion+' y cuesta '+cursos[0].valor+' pesos');
},2000);

setTimeout(function(){
    console.log('el curso con id ' +cursos[1].id+' llamado '+cursos[1].nombre+' tiene una duracion de '+
    cursos[1].duracion+' y cuesta '+cursos[1].valor+' pesos');
    },4000);

setTimeout(function(){
    console.log('el curso con id ' +cursos[2].id+' llamado '+cursos[2].nombre+' tiene una duracion de '+
    cursos[2].duracion+' y cuesta '+cursos[2].valor+' pesos');
    },6000);    
*/

function doSetTimeout(i) 
{
    setTimeout(function(){
        console.log('el curso con id ' +cursos[i]['id']+' llamado '+cursos[i]['nombre']+' tiene una duracion de '+
        cursos[i]['duracion']+' y cuesta '+cursos[i]['valor']+' pesos');
    },2000*(i+1));
}

for(var i = 0; i < cursos.length;i++)
    doSetTimeout(i)

let matricularAlumno = (id_busqueda,nombreEstudiante,cedula) => {
    if (id_busqueda != undefined){
        let curso = cursos.find( cursos => cursos.id == id_busqueda);

        if (curso){
            let descripcionCurso = 'el curso con id ' +curso.id+' llamado '+curso.nombre+' tiene una duracion de '+
            curso.duracion+' y cuesta '+curso.valor+' pesos'
            console.log(descripcionCurso);
            let texto = '<div style="border-style: solid;padding:10px;"> El estudiante '+nombreEstudiante+
            ' con cedula '+ cedula + '<br>'+
            'Se ha matriculado en ' + descripcionCurso+'</div>';

            app.get('/', function (req, res) {
                res.send(texto)
            })

            console.log('se ha desplegado el mensaje');

           // fs.writeFile('matricula.txt',texto,(err) => {
           // if (err) throw (err);
           //     console.log('se ha creado el archivo');
           //     process.exit();
           // });
        }
        else{
            console.log('Ha ingresado un ID que no corresponde a ningun curso');
        }
        
    }
}

const opciones = {
    id:{
        demand: true,
        alias: 'i'
    },
    nombreEstudiante:{
        demand: true,
        alias: 'n'
    },
    cedula:{
        demand: true,
        alias: 'x'
    }
}

const argv = require('yargs')
            .command('inscribir','inscribir estudiante', opciones)
            .argv

matricularAlumno(argv.i,argv.n,argv.x);
 
app.listen(3000)
