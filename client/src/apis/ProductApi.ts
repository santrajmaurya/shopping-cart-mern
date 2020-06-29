const baseUrl = "http://localhost:5000/api/admin";
class Api {
    
    // getAdminProducts = async (urlParams: any) => {
    //     const options = {
    //         method: "GET",
    //     }
    //  const request = new Request(webApiUrl + "?" + urlParams, options);
    //  const response = await fetch(request);
    //  return response.json();
    // }
    

    getAdminProducts = async () => {
        const options = {
            method: "GET",
        }
     const request = new Request(baseUrl, options);
     const response = await fetch(request);
     return response.json();
    }


    addProduct = async (model: any, token: any) => {
        let options = {
            method: "POST",
            headers: {Authorization: 'Bearer ' + token, "Content-Type": "application/json"},
            body: JSON.stringify(model)
        }
        const request = new Request(`${baseUrl}/add-product`, options);
        const response = await fetch(request);
        return response;
    }
   
    editProduct = async (model: any, productId: any, token: any) => {
        let options = {
            method: "PATCH",
            headers: {Authorization: 'Bearer ' + token, "Content-Type": "application/json"},
            body: JSON.stringify(model)
        }
        const request = new Request(baseUrl + "/edit-product/" + productId, options);
        const response = await fetch(request);
        return response;
    }

    deleteProduct = async (id: any, token: any) => {
        let options = {
            method: "DELETE",
            headers: {Authorization: 'Bearer ' + token, "Content-Type": "application/json"},
        }
        const request = new Request(baseUrl + "/" + id, options);
        const response = await fetch(request);
        return response;
    }
    }

    export default Api;