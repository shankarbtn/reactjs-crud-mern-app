import { useState, createContext }  from 'react';
import Axios from "axios";
import EditForm from '../components/EditForm';

const ItemContext = createContext({
    itemsList: [],
    totalItemsList: 0,
    isModelOpen: false,
    getItem: () => {},
    addItem: () => {},
    editItem: (id) => {},
    updateItem: (id) => {},
    deleteItem: (id) => {}
});

export function ItemContextProvider(props) {
    const SERVER_HTTP_URL = "http://localhost:3001/";
    const SERVER_ACTION_INSERT = 'insert';
    const SERVER_ACTION_READ = "read";
    const SERVER_ACTION_UPDATE = "update";
    const SERVER_ACTION_DELETE = "delete";

    const [items, setItem] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);

    async function getItemHandler() {
        try {
            await Axios.get(SERVER_HTTP_URL + SERVER_ACTION_READ)
            .then(function (response) {
                console.log('server response >>> '+ response.data);
                setItem(response.data);
            })
            .catch((err) => { 
                console.error('Read api error:', err);
            });
        }catch(err) {
            console.log(err);
        }
    }

    async function addItemHandler(formData) {
        console.log('server >>> '+ JSON.stringify(formData));

        await Axios.post(SERVER_HTTP_URL + SERVER_ACTION_INSERT, formData)
            .then(function (response) {
                console.log(response);
                document.getElementById('formSuccess').innerHTML = response.data;
                document.getElementById('formSuccess').style.display = 'block';
            })
            .catch(function (error) {
                console.log(error);
                document.getElementById('formError').innerHTML = error;
                document.getElementById('formError').style.display = 'block';
            });
    }

    async function editItemHandler(id) {
        setIsModelOpen(true);
        return <EditForm />
    }

    async function updateItemHandler(id) {
        await Axios.get(SERVER_HTTP_URL + SERVER_ACTION_UPDATE, {id: id})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    async function deleteItemHandler(id) {
        await Axios.delete(SERVER_HTTP_URL + SERVER_ACTION_DELETE+`/${id}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    const context = {
        itemsList: items,
        totalItemsList: items ? items.length : 0,
        isModelOpen: isModelOpen,
        getItem: getItemHandler,
        addItem: addItemHandler,
        editItem: editItemHandler,
        updateItem: updateItemHandler,
        deleteItem: deleteItemHandler
    };

    return (
        <ItemContext.Provider value={context}>
            {props.children}
        </ItemContext.Provider>
    );
}

export default ItemContext;