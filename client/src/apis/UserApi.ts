const baseUrl = "http://localhost:5000";

class Api {
    
    // get = async (urlParams: any) => {
    //     const options = {
    //         method: "GET",
    //     }
    //  const request = new Request(webApiUrl + "?" + urlParams, options);
    //  const response = await fetch(request);
    //  return response.json();
    // }
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
        return response;
    }
    // put = async (model: any) => {
    //     const headers = new Headers()
    //     headers.append("Content-Type", "application/json");
    //     var options = {
    //         method: "PUT",
    //         headers,
    //         body: JSON.stringify(model)
    //     }
    //     const request = new Request(webApiUrl, options);
    //     const response = await fetch(request);
    //     return response;
    // }
    // delete = async (id: any) => {
    //     const headers = new Headers();
    //     headers.append("Content-Type", "application/json");
    //     const options = {
    //         method: "DELETE",
    //         headers
    //     }
    //     const request = new Request(webApiUrl + "/" + id, options);
    //     const response = await fetch(request);
    //     return response;
    // }
    }

    export default Api;