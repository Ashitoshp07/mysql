class ApiResponse {
    static success(responseCode, message, data) {
        return {
            status: 'success',
            responseCode,
            message,
            data,
        };
    }

    static failure(responseCode, errorMessage) {
        return {
            status: 'failure',
            responseCode,
            errorMessage,
        };
    }

    static noInternet() {
        return {
            status: 'no_internet',
            message: 'No internet connection.',
        };
    }
}

module.exports = ApiResponse;
