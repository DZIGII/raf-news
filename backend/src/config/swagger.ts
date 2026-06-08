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
                TagDto: {
                    type: 'object',
                    required: ['keyword'],
                    properties: {
                        keyword: { type: 'string', example: 'sport' },
                    },
                },
                TagResponseDto: {
                    type: 'object',
                    properties: {
                        tagId: { type: 'integer', example: 1 },
                        keyword: { type: 'string', example: 'sport' },
                    },
                },
                CategoryDto: {
                    type: 'object',
                    required: ['categoryId', 'name', 'description'],
                    properties: {
                        categoryId: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Sports' },
                        description: { type: 'string', example: 'Sports news, scores, and analysis' },
                    },
                },
                CategoryResponseDto: {
                    type: 'object',
                    properties: {
                        categoryId: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Sports' },
                        description: { type: 'string', example: 'Sports news, scores, and analysis' },
                    },
                },
                CreateCategoryDto: {
                    type: 'object',
                    required: ['name', 'description'],
                    properties: {
                        name: { type: 'string', example: 'Sports' },
                        description: { type: 'string', example: 'Sports news, scores, and analysis' },
                    },
                },
                ImageDto: {
                    type: 'object',
                    properties: {
                        imageId: { type: 'integer', example: 1 },
                        imageUrl: { type: 'string', example: '/uploads/123.jpg' },
                    },
                },
                CommentResponseDto: {
                    type: 'object',
                    properties: {
                        authorName: { type: 'string', example: 'Marko' },
                        content: { type: 'string', example: 'Great article!' },
                        createdAt: { type: 'string', format: 'date-time' },
                        like: { type: 'integer', example: 12 },
                        dislike: { type: 'integer', example: 1 },
                    },
                },
                CreateCommentDto: {
                    type: 'object',
                    required: ['authorName', 'content', 'newsId'],
                    properties: {
                        authorName: { type: 'string', example: 'Marko' },
                        content: { type: 'string', example: 'Great article!' },
                        newsId: { type: 'integer', example: 1 },
                    },
                },
                NewsResponseDto: {
                    type: 'object',
                    properties: {
                        newsId: { type: 'integer', example: 1 },
                        title: { type: 'string', example: 'Breaking news' },
                        mainImage: { type: 'string', nullable: true, example: '/uploads/123.jpg' },
                        tagIds: { type: 'array', items: { type: 'integer' } },
                    },
                },
                NewsDetailResponseDto: {
                    type: 'object',
                    properties: {
                        newsId: { type: 'integer' },
                        title: { type: 'string' },
                        text: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        like: { type: 'integer' },
                        dislike: { type: 'integer' },
                        createdBy: { $ref: '#/components/schemas/UserResponseDto' },
                        category: { $ref: '#/components/schemas/CategoryDto' },
                        comments: { type: 'array', items: { $ref: '#/components/schemas/CommentResponseDto' } },
                        images: { type: 'array', items: { $ref: '#/components/schemas/ImageDto' } },
                    },
                },
                CreateNewsForm: {
                    type: 'object',
                    required: ['title', 'text'],
                    properties: {
                        title: { type: 'string', example: 'Breaking news' },
                        text: { type: 'string', example: 'Full article text here...' },
                        tags: {
                            type: 'string',
                            description: 'JSON-encoded array of tags, e.g. [{"keyword":"sport"}]',
                            example: '[{"keyword":"sport"}]',
                        },
                        categoryId: { type: 'integer', example: 1 },
                        images: {
                            type: 'array',
                            items: { type: 'string', format: 'binary' },
                            description: 'One or more image files',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)