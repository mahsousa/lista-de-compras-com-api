import axios from 'axios';

const API_URL = 'https://localhost:44312/api/item';

class ItemService {

    constructor (){

    }

    async getTransactions() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }

    async createTransaction(transaction) {
        console.log(transaction)
        try {
            var tipo;
            if(transaction.saida == true){
                tipo = 1;
            }else{
                tipo = 0;
            }
            var body = {
                Descricao: transaction.descricao,
                Valor: transaction.quantia,
                Tipo: tipo,
            }
            const response = await axios.post(API_URL, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating transaction:', error.response ? error.response.data : error);
            throw error;
        }
    }

    async deleteTransaction(id) {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error('Error deleting transaction:', error);
            throw error;
        }
    }
}

export default ItemService;
