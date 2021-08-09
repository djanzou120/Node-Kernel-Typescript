
class DefResponse {

    data: any;


    /**
     * DefResponse constructor.
     * @param data
     */
    constructor(data:any) {
        this.data = data;
    }

    /**
     * Check if the response is a success
     * @return mixed
     */
    isSuccess() {
        return this.data['status'];
    }

    /**
     * Get Response message
     * @returns {*}
     */
    getMessage() {
        return this.data['message'];
    }

    /**
     * Get data
     * @return mixed
     */
    getData() {
        return this.data['data'];
    }


    getResponse() {
        return  this.data;
    }
}

export default DefResponse;