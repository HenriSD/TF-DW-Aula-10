import postgres from '../../../database/connections/postgres.js';

export default async function CreateAddressController(request, response) {
    try {

        const { name, district, city } = request.body;

        const errors = [];

        if (!name) errors.push('name obrigatório!');
        if (!district) errors.push('district obrigatório!');
        if (!city) errors.push('city obrigatório!');

        if (errors.length > 0) {
            return response.status(400).json({
                error: errors
            });
        }

        const result = await postgres.query(
            `INSERT INTO addresses 
            (name, district, city) 
            VALUES ($1, $2, $3)
            RETURNING *`,
            [name, district, city]
        );

        return response.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: 'Internal server error'
        });
    }
}