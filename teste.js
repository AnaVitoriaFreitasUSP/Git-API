class Dicionario {
    constructor() {
        this.alimento = [];

    }
   
    
    novoItem(chave, valor) {
        this.alimento.push({fruta: chave, descricao: valor});
    }
    
    pesquisar(chave) {
        let frase = "";
        for(let i = 0; i < this.arr.length; i++){
            if(arr[i].fruta == chave){
                frase = arr[i].descricao;
            }
        }

        if(frase == ""){
            return "Não foram encontrados registros para " + chave;
        }else{
            return frase;
        }

    }
}