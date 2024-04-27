# Monitor de Processos com Angular 17 e .NET 8

## 🌐 Desafio

Desafio para a seleção da MXM. O Objetivo era criar um monitor de processos do Sistema operacional, listando os processos, os recursos consumidos, com opção de ordenação nas colunas e utilizar gráficos para ilustrar o processamento.

<img src="./screenshots/monitor.jpg" alt="Tela Final">



## 🌐 Pré-requisitos para rodar o projeto

  - .NET Core SDK 8
  - Node.js e npm
  - Angular 17 / ```npm install -g @angular/cli@17```



### Clonando o repositorio

```bash
> git clone https://github.com/barbaradamasdev/DesafioMXM.git
```
### Executando o Backend

```bash
# Acesse o diretório do projeto backend:
> cd backend/ProcessosAPI/

# Restaure as dependências:
> dotnet restore

# Inicie o backend com o comando
> dotnet watch run
```

### Executando o Frontend

```bash
# Acesse o diretório do projeto frontend:
> cd frontend/MonitorProcessos

# Instale as dependências do Angular
> npm install

# Inicie o servidor de desenvolvimento do Angular
> ng serve
```


## 👑 Demonstração

![](./screenshots/amostra.gif)

#### ✍🏻️ Features adicionais

| <img src="./screenshots/loading.png"> Loading para sinalizar ao usuário o carregamento | <img src="./screenshots/tabela.png"> Tabela de processos com ordenação e opção de busca |<img src="./screenshots/drive.png"> Armazenamento por drives existentes e detalhamento do gráfico com mouse | <img src="./screenshots/responsivo.png"> Responsividade |
| --- | --- | --- | --- |


#### ✍🏻️ Recursos e Tecnologias Utilizadas

| Tecnologia                                | Uso                                                                               | Site                                      |
|-------------------------------------------|-----------------------------------------------------------------------------------|-------------------------------------------|
| SignalR                                   | Biblioteca que facilita a adição de funcionalidades em tempo real aos aplicativos web. | [SignalR](https://dotnet.microsoft.com/apps/aspnet/real-time)               |
| Swagger                                   | Ferramenta para documentação de APIs RESTful.                                     | [Swagger](https://swagger.io/)                                           |
| Diagnostics                        | Namespace do .NET que fornece classes para interagir com o sistema operacional.   | [System.Diagnostics](https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics)   |
| Management                         | Namespace para acesso e interação com informações de gerenciamento do sistema operacional Windows. | [System.Management](https://docs.microsoft.com/en-us/dotnet/api/system.management)    |
| PerformanceCounter                        | Classe para acessar e monitorar o desempenho do sistema, incluindo o uso da CPU.  | [PerformanceCounter](https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics.performancecounter) |
| Management Object Searcher                 | Classe para executar consultas WMI (Instrumentação de Gerenciamento do Windows) e recuperar informações sobre o sistema operacional. | [ManagementObjectSearcher](https://docs.microsoft.com/en-us/dotnet/api/system.management.managementobjectsearcher) |
| @microsoft/signalr          | Cliente JavaScript para conectar-se a um hub SignalR e receber atualizações em tempo real do servidor.                                                   | [SignalR](https://github.com/aspnet/AspNetCore/tree/main/src/SignalR) |
| Google Charts               | Biblioteca JavaScript para criar gráficos interativos e visualizações de dados na web.                                                                  | [Google Charts](https://developers.google.com/chart) |

## 🛠 Desafios e Soluções Enfrentados

### Utilização do SignalR

- Precisei entender a estrutura e como utilizar o SignalR tanto no backend quanto no frontend. Além disso, dediquei um tempo criando o Swagger para documentação da API antes de compreender completamente a necessidade para o SignalR, desafio que foi rapidamente solucionado e serviu para praticar.

### Gráficos em Tempo Real

- Foi desafiante encontrar uma biblioteca certa que atendesse às necessidades específicas de manter de forma dinâmica o gráfico para refletir as mudanças em tempo real. Procurando por bibliotecas encontrei a do Google que foi a utilizada no projeto. Com essa, tive uma nova dificuldade que foi de ajustar o tamanho e a aparência do gráfico garantindo uma experiência visual agradável e pensando em usabilidade.

## 🐼 Autora
Bárbara Damasceno | barbaradsa@gmail.com | [Linkedin](https://www.linkedin.com/in/barbaradamascenodev) | [Portfolio](https://barbaradamasceno.vercel.app/)
<hr>

[Voltar ao Início](#index) 👆🏻