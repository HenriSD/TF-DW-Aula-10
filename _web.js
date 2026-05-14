import express from 'express';
import chalk from 'chalk';

import router from './routes/router.js';
import app from "./bootstrap/app.js";

/** Inicializador do Banco/App */
app();

/** Criar instância do Express */
const web = express();

/** Configurar para aceitar JSON (importante para APIs) */
web.use(express.json());

/** Registrar as Rotas */
web.use('/', router);

/** 
 * Configuração de Porta e Host 
 * No Docker, o process.env.NODE_WEB_PORT deve ser 3000.
 * O Host '0.0.0.0' é obrigatório para o Nginx conseguir acessar o container.
 */
const port = process.env.NODE_WEB_PORT || 3000;
const host = '0.0.0.0'; 

web.listen(port, host, () => {
    console.log(chalk.green(`============================================`));
    console.log(chalk.green(`🚀 Servidor node web rodando!`));
    console.log(chalk.green(`📍 Local: http://localhost:${port}`));
    console.log(chalk.green(`🐳 Docker: http://localhost:8080 (via Nginx)`));
    console.log(chalk.green(`============================================`));
});