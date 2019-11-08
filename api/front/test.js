const myBox = document.querySelector('table tbody');
let flagEdit = true;

    let minhaPromise = function(){
        return new Promise(function(resolve, reject){
            let xhr = new  XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/todo');
            xhr.send(null);

            xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText));
                }else {
                    reject('Erro na requisição');
                }
            }
        }
    });
}

 function listarAll(){
     myBox.innerHTML = '';
   
    minhaPromise()
        .then(function(response){
            for (ea in response){
                
                const {id} = response[ea];
                let novaColuna = document.createElement('tr');
                let novoDescricao = document.createElement('td');
                let novoTempo = document.createElement('td');
                let novaAcao = document.createElement('td');
                novoDescricao.innerHTML = response[ea].text;
                novoTempo.innerHTML = response[ea].due;

                let buttonDelete = document.createElement('input');
                buttonDelete.setAttribute("type","submit");
                buttonDelete.setAttribute("value", "Excluir");
                buttonDelete.setAttribute("id", "btnDelete");
                buttonDelete.onclick=() =>deletar(id);

                let buttonEdit = document.createElement('input');
                buttonEdit.setAttribute("type","submit");
                buttonEdit.setAttribute("value", "Editar");
                buttonEdit.setAttribute("id", "btnEdit");
                buttonEdit.onclick=() => showMeTheMagic(id);

                novaColuna.appendChild(novoDescricao);
                novaColuna.appendChild(novoTempo);
                novaAcao.appendChild(buttonDelete);
                novaAcao.appendChild(buttonEdit);
                novaColuna.appendChild(novaAcao)
                myBox.appendChild(novaColuna);                
            }
        })
    .catch(function(error){
    console.warn(error);
    });
    
}

async function deletar(id){ 

    myBox.innerHTML = '';
     await fetch('http:localhost:3000/todo/'+ id, {
        method: 'delete',
        headers: {
            'Content-Type' : 'application/json'
        }        
      });
    return listarAll();
}

function showMeTheMagic(id){  
    
    if (flagEdit == true){

        flagEdit = false;
        let novaColuna = document.createElement('tr');

        let novoDescricao = document.createElement('td');
        novoDescricao.setAttribute("class", "novoDescricao"); 

        let novoTempo = document.createElement('td');
        novoTempo.setAttribute("class", "novoTempo");

        let novoAcao = document.createElement('td')
        let inputNovoDescricao = document.createElement('input');
        inputNovoDescricao.setAttribute("type", "text");
        inputNovoDescricao.setAttribute("class", "newTaskTodo");

        let inputNovoTempo = document.createElement('input');
        inputNovoTempo.setAttribute("type", "text");
        inputNovoTempo.setAttribute("class", "newTimeTodo");


        let btnSave = document.createElement('input');
        btnSave.setAttribute("type","submit");
        btnSave.setAttribute("value","Salvar");
        btnSave.setAttribute("id","btnSave");
        btnSave.onclick=() =>edit(id);

        let btnCancel = document.createElement('input');
        btnCancel.setAttribute("type","submit");
        btnCancel.setAttribute("value", "Cancelar");
        btnCancel.setAttribute("id", "btnCancelar");
        btnCancel.addEventListener('click', listarAll);

        novoAcao.appendChild(btnSave);
        novoAcao.appendChild(btnCancel);
        novoDescricao.appendChild(inputNovoDescricao);
        novoTempo.appendChild(inputNovoTempo);
        novaColuna.appendChild(novoDescricao);
        novaColuna.appendChild(novoTempo);
        novaColuna.appendChild(novoAcao);
        myBox.appendChild(novaColuna);    
    }
    else {
        flagEdit = true;
        listarAll();
    }
}

 async function edit(id){
    let array = {
        text: document.querySelector('.newTaskTodo').value,
        due: document.querySelector('.newTimeTodo').value,
    };
        await fetch('http://localhost:3000/todo/'+ id, {
            method: 'PUT',
            body: JSON.stringify(array),
            headers: {
                'Content-Type' : 'application/json'
            }
        })  
        flagEdit = true;   
    return listarAll();  
 }


listarAll();

let addNewTodoToList = document.querySelector('.btn').addEventListener('click',addTodo)

 async function addTodo(){

    let array = {
        text: document.querySelector('.task').value,
        due: document.querySelector('.taskum').value,
    };
        await fetch('http://localhost:3000/todo', {
            method: 'POST',
            body: JSON.stringify(array),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    
    /*let array = [
        document.querySelector('#joia .task').value,
        document.querySelector('#joia .taskum').value,
    ];
    let xhr = new  XMLHttpRequest();
    
    xhr.onload = function(){
        if(this.status === 200){             
            console.log('Rolou');
        }
        else 
            console.log('NAO ROULOU');
    };   

    console.log(array);   
    xhr.open('POST', 'http://localhost:3000/todo');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(array));*/
};
