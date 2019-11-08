let xmlhttp;
let dados;

xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET","http://localhost:3000/todo",true);
xmlhttp.onload = function Listar() {
    dados = xmlhttp.response    
    const todo = dados[0];
     obj = JSON.parse(dados);   
     for (int in obj){
        console.log(obj[int].text);
    }
    
    let novoObj = this.obj;
    return novoObj;
};

xmlhttp.send();




