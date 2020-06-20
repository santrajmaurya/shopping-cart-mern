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
        return response;
    }
    }

    export default Api;