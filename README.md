# 📏 API de Medições

Uma API robusta para gerenciar medições de clientes, incluindo upload de medições, confirmação de valores e listagem de medições. Construída com NestJS e Prisma ORM, a API segue as melhores práticas de desenvolvimento e oferece uma documentação completa com Swagger e integração com Google Gemini.

## 🚀 Funcionalidades Principais

- **Upload de Medições**: Permite o upload de medições associadas a imagens, tendo o valor da imagem extraido com o google Gemini e assim registrando dados de forma segura e precisa.
- **Confirmação de Medições**: Confirmação dos valores de medições para validação de dados.
- **Listagem de Medições**: Filtragem de medições por cliente e tipo, com resposta formatada de forma intuitiva e organizada.

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir aplicações server-side escaláveis e eficientes.
- **Prisma ORM**: Abstração para banco de dados, garantindo operações seguras e otimizadas.
- **Swagger**: Documentação interativa para APIs, facilitando testes e integrações.
- **Docker**: Facilita a configuração e implantação da aplicação.
- **Google Gemini**: Integração com API do Gemini

## 📝 Vantagens do Projeto

- **Escalabilidade**: Estrutura modular que permite fácil expansão e manutenção.
- **Segurança**: Validações rigorosas e uso de DTOs para garantir a integridade dos dados.
- **Facilidade de Integração**: Documentação detalhada com Swagger, permitindo que desenvolvedores compreendam rapidamente o funcionamento da API.
- **Flexibilidade**: Filtragem de dados para atender diferentes necessidades de negócio.

## 📋 Endpoints

1. **POST /upload**  
   Realiza o upload de uma nova medição associada a um cliente.  
   Requisição inclui imagem em base64, tipo de medição, código do cliente e data.

2. **PATCH /confirm**  
   Confirma ou ajusta o valor de uma medição existente.

3. **GET /{customer_code}/list**  
   Lista medições por cliente, com opção de filtrar por tipo.

## 📖 Documentação

- Toda a API é documentada com Swagger, acessível via `/swagger`, proporcionando uma interface interativa para explorar e testar os endpoints.

## 🛡️ Boas Práticas

- **Uso de Middlewares**: Para validações e filtragens automáticas, otimizando o desempenho e garantindo segurança.
- **Validação de Dados**: DTOs completos com exemplos para validações e garantia de formato correto dos dados recebidos.
