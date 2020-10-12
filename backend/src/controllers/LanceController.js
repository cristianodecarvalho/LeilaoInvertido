const Lance = require('../models/Lance')

//Array com os lances
var lances = []

//Verifica se já existe o elemento na lista, ou seja, se é repetido
exists = a => {
    var counter = 0
    lances.map( e => {
        if( e.valor == a){
            counter++
            return
        }
    })

    //caso exista 2 elementos na lista retorna true, informando que é repetido
    return counter >= 2 ? true : false 

}

module.exports = {
   
    //funcao que retorna a lista de lances já devidamente ordenados
    async index(req, res){

        //array que informa as posições repetidas
        const i = []

        //ordena o array em ordem crescente
        lances.sort((a,b) => parseFloat(a.valor) - parseFloat(b.valor) );

        //percorre o vetor de lances
        lances.map( (l, index) => {
            //caso exista um elemento repetido, ele é inserido ao final da lista e é adicionado o indice do elemento corrente no array de posições repetidas
            if(exists(l.valor)){
                i.push(index)
                lances.push(l)
            }
        })

        //aqui eu retiro todos os elementos usando os indices adicionados no vetor de posições repetidas
        for (let index = i.length ; index > 0; index--) {
            lances.splice(i[index-1],1)
        }
        //depois de todos esses passo eu já tenho meu vetor devidamente ordenado, onde a primeira posição eu terei quem está vencendo no leilão
        
        return res.json(lances)
        
    },

    //funcao que adiciona um lance a lista e retorna o elemento adicionado
    async store(req, res) {
        const { nome, valor } = req.body;
        const lance = new Lance(nome, valor)
        lances.push(lance)
        return res.json(lance);
    }
}