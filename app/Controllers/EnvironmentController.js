import fs from 'node:fs/promises';
import path from 'node:path';
import CONSTANTS from '../../bootstrap/config.js';

export default async function EnvironmentController(request, response) {
    
    /** TF 10 - Lógica de Identificação de Ambiente */
    
    // 1. Identifica se está no Docker ou Local
    // Se a variável NODE_ENV não existir, assume 'local'
    const ambiente = process.env.NODE_ENV || 'Desenvolvimento Local (sem Docker)';

    // 2. Coleta as portas e hosts
    // No Docker, as variáveis vêm do seu docker-compose.yml
    const detalhes = {
        node: {
            host: request.hostname, // 'localhost' ou o nome do container
            porta_interna: process.env.APP_PORT || 3000,
            acesso: request.headers['x-forwarded-for'] ? 'Via Nginx (Proxy)' : 'Direto'
        },
        database: {
            host: process.env.POSTGRES_HOST || 'localhost',
            porta: process.env.POSTGRES_PORT || 5432,
            banco: process.env.POSTGRES_DB || 'database_name'
        }
    };

    // 3. Retorna o JSON conforme solicitado na atividade
    return response.json({
        status: "sucesso",
        ambiente: ambiente,
        configuracoes: detalhes
    });
}