const apis = [
    {
        id: 1,
        nome: "JSONPlaceholder",
        url_base: "https://jsonplaceholder.typicode.com",
        desc: "API fake para testes",
        temp_esp_cont_dias: 365, // Em dias
        dt_cad: "2024-11-26",
        freq_at_min: 60, // Frequência de monitoramento em minutos
        ativo: true, // Indica se a API está sendo monitorada
    },
    {
        id: 2,
        nome: "ReqRes",
        url_base: "https://reqres.in",
        desc: "Simula requisições de API para testes",
        temp_esp_cont_dias: 180,
        dt_cad: "2024-11-20",
        freq_at_min: 30,
        ativo: true,
    },
];

export default apis;