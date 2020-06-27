const baseUrl = "http://localhost:5000";

class Api {
    signUp = async (model: any) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = {
            method: "POST",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(`${baseUrl}/api/users/signup`, options);
        const response = await fetch(request);
        return response;
    }

    login = async (model: any) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = {
            method: "POST",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(`${baseUrl}/api/users/login`, options);
        const response = await fetch(request);
        const responseData = await response.json()
        return responseData;
    }
    addCart = async (model: any) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options = {
            method: "POST",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(`${baseUrl}/api/users/add-cart`, options);
        const response = await fetch(request);
        const responseData = await response.json();
        return responseData;
    }

    removeItemFromCart = async (productId: any, userId: any) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers,
            body: JSON.stringify({productId, userId})
        }
        const request = new Request(`${baseUrl}/api/users/remove`, options);
        const response = await fetch(request);
        const responseData = await response.json();
        return responseData;
    }

    decreaseItemInCart = async (productId: any, userId: any) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers,
            body: JSON.stringify({productId, userId})
        }
        const request = new Request(`${baseUrl}/api/users/decreaseItem`, options);
        const response = await fetch(request);
        const responseData = await response.json();
        return responseData;
    }
    }

    export default Api;