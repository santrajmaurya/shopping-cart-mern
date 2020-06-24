const baseUrl = "http://localhost:5000";

class Api {
    
    // getAdminProducts = async () => {
    //     const options = {
    //         method: "GET",
    //     }
    //  const request = new Request(baseUrl, options);
    //  const response = await fetch(request);
    //  return response.json();
    // }


    addCart = async (model: any) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = {
            method: "POST",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(`${baseUrl}/api/cart/add`, options);
        const response = await fetch(request);
        const responseData = await response.json();
        return responseData;
    }
   
    // editProduct = async (model: any, productId: any) => {
    //     const headers = new Headers()
    //     headers.append("Content-Type", "application/json");
    //     var options = {
    //         method: "PATCH",
    //         headers,
    //         body: JSON.stringify(model)
    //     }
    //     const request = new Request(baseUrl + "/edit-product/" + productId, options);
    //     const response = await fetch(request);
    //     return response;
    // }

    // deleteProduct = async (id: any) => {
    //     const headers = new Headers();
    //     headers.append("Content-Type", "application/json");
    //     const options = {
    //         method: "DELETE",
    //         headers
    //     }
    //     const request = new Request(baseUrl + "/" + id, options);
    //     // const request = new Request(`${baseUrl}/:id`, options);
    //     const response = await fetch(request);
    //     return response;
    // }
    }

    export default Api;