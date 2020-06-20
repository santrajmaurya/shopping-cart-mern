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


    addProduct = async (model: any) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = {
            method: "POST",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(`${baseUrl}/add-product`, options);
        const response = await fetch(request);
        return response;
    }
   
    editProduct = async (model: any, productId: any) => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        var options = {
            method: "PATCH",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(baseUrl + "/edit-product/" + productId, options);
        const response = await fetch(request);
        return response;
    }

    deleteProduct = async (id: any) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers
        }
        const request = new Request(baseUrl + "/" + id, options);
        // const request = new Request(`${baseUrl}/:id`, options);
        const response = await fetch(request);
        return response;
    }
    }

    export default Api;