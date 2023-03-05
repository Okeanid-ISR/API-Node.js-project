import ToyItem from "./toyItem.js";
import { API_URL } from "../services/apiService.js";

const init = () => {
    doApi();
}

const doApi = async() => {
    let url = API_URL+"/toys";
    let resp = await axios.get(url);
    console.log(resp.data);
    createTable(resp.data);
}

const createTable = (_ar) => {
    document.querySelector("#id_parent").innerHTML = "";
    _ar.forEach((item,i) => {
        let food = new ToyItem("#id_parent",item,i,deleteFood);
        food.render();
    })
}

const deleteFood = async(_idDel) => {
    try{
        let url = API_URL+"/toys/"+_idDel;
        let resp = await axios({
            url:url,
            method:"DELETE"
        })
        if(resp.data.deletedCount){
            doApi();
        }
    }
    catch(err){
        alert("There problem")
        console.log(err);
    }
}

init();