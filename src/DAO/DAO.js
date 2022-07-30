import Database from "../database/Database.js";

class DAO {

    static async ativaForeignKeys() {

        const query = 'PRAGMA foreign_keys = ON'

        Database.run(query, error => {

            if (error) {
                console.log(error)
            } else {
                console.log("Chaves estrangeiras funcionando")
            }
        })
    }

    static createTable(query) {

        return new Promise((resolve, reject) => {

            Database.run(query, (error) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve("Tabela criada")
                }
            })
        })
    }

    static inserir(entidade, query) {

        const body = Object.values(entidade)

        return new Promise((resolve, reject) => {

            Database.run(query, [...body], (error) => {
                if (error) {
                    // reject(error.message)
                    throw new Error("Cadastro mal sucedido")
                } else {
                    resolve({ error: false, message: "Cadastrou" })
                }
            })
        })
    }


    static listarTodas(query) {

        return new Promise((resolve, reject) => {

            Database.all(query, (error, res) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve(res)
                }
            })
        })
    }

    static listarLimpeza(id, query) {

        return new Promise((resolve, reject) => {

            Database.all(query, id, (error, res) => {
                if (error) {
                    reject(error.message)
                } else {
                    resolve(res)
                }
            })
        })
    }

    static atualizar(entidade, id, query){
        const objeto = Object.values(entidade)
        // const objeto = new LimpezaModel(...Object.values(req.body))

        return new Promise ((resolve, reject) => {

            Database.run(query, [...objeto, id], (error, result) => {
                if(error){
                    reject(error.message)
                }else{
                    // resolve({erro: false, message: `Registro de número ${id} atualizado`})
                    resolve(result)

                }
            })
        })
    }

    static deletar(query, id){

        return new Promise((resolve, reject) => {
            Database.run(query, id, (error) => {
                if(error){
                    reject(error.message)
                }else{
                    resolve({error: false, message: `Registro ${id} deletado!`})
                }
            })
        })        
    }
}

export default DAO