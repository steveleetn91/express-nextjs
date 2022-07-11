class Response {
    constructor(status = 200,response = 0) {
        return {
            status : Number(status) > 0 ? status : 400,
            data : response["data"] ? response["data"] : "",
            code : Number(response["code"]) ? Number(response["code"]) : 0,
        }
    }
}

module.exports = Response;