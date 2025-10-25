export const success = {
    ok: { code: 200, message: 'http.success.ok' },
    created: { code: 201, message: 'http.success.created' }
}

export const errors = {
    // Código 400
    data_exist: { code: 400, message: 'http.error.data_exist' },

    // Código 401
    auth: { code: 401, message: 'http.error.auth' },

    // Código 404
    not_found: { code: 404, message: 'http.error.not_found' },

    // Código 500
    server: { code: 500, message: 'http.error.server' },
}