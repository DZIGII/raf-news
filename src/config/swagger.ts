import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RAF News API',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                RegisterDto: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email', 'password', 'passwordConfirm'],
                    properties: {
                        firstName: { type: 'string', example: 'Nikola' },
                        lastName: { type: 'string', example: 'Raskovic' },
                        email: { type: 'string', format: 'email', example: 'nikola@example.com' },
                        password: { type: 'string', format: 'password', example: 'secret123' },
                        passwordConfirm: { type: 'string', format: 'password', example: 'secret123' },
                    },
                },
                LoginDto: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'nikola@example.com' },
                        password: { type: 'string', format: 'password', example: 'secret123' },
                    },
                },
                UpdateUserDto: {
                    type: 'object',
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        isActive: { type: 'boolean' },
                    },
                },
                UserResponseDto: {
                    type: 'object',
                    properties: {
                        userId: { type: 'integer', example: 1 },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        role: { type: 'string', enum: ['ADMIN', 'CREATOR'] },
                        isActive: { type: 'boolean' },
                    },
                },
                TokenResponse: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', example: 'Invalid credentials' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)