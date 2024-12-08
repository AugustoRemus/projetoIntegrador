CREATE DATABASE seth;
\c seth;

CREATE TABLE API (
  codigo SERIAL PRIMARY KEY,
  nome VARCHAR(30) NOT NULL,
  descricao TEXT NOT NULL,
  url_base TEXT NOT NULL,
  freq_mon_min INT NOT NULL,
  data_cadastro DATE NOT NULL
);

CREATE TABLE STATUS (
  codigo INT PRIMARY KEY,
  descricao VARCHAR(50) NOT NULL
);

CREATE TABLE REQUISICAO (
  codigo SERIAL PRIMARY KEY,
  datahora TIMESTAMP NOT NULL,
  codigo_api INT NOT NULL REFERENCES API(codigo) ON DELETE CASCADE,
  codigo_status INT NOT NULL REFERENCES STATUS(codigo)
);

CREATE TABLE PERMISSAO (
  sigla VARCHAR(4) PRIMARY KEY,
  descricao VARCHAR(50) NOT NULL
);

CREATE TABLE GRUPO (
  sigla VARCHAR(4) PRIMARY KEY,
  descricao VARCHAR(50) NOT NULL
);

CREATE TABLE GRUPO_PERMISSAO (
  sigla_grupo VARCHAR(4) NOT NULL REFERENCES GRUPO(sigla) ON DELETE CASCADE,
  sigla_permissao VARCHAR(4) NOT NULL REFERENCES PERMISSAO(sigla) ON DELETE CASCADE,
  PRIMARY KEY (sigla_grupo, sigla_permissao)
);

CREATE TABLE USUARIO (
  codigo SERIAL PRIMARY KEY,
  nome VARCHAR(30) NOT NULL,
  email VARCHAR(320) UNIQUE NOT NULL,
  telefone VARCHAR(15) UNIQUE NOT NULL,
  login VARCHAR(20) UNIQUE NOT NULL,
  senha VARCHAR(128) UNIQUE NOT NULL,
  sigla_grupo VARCHAR(4) NOT NULL REFERENCES GRUPO(sigla) ON DELETE CASCADE
);

-- Inserções nas tabelas
INSERT INTO GRUPO (sigla, descricao) VALUES 
('ADM', 'Administrador'), 
('BS', 'Base');

INSERT INTO PERMISSAO (sigla, descricao) VALUES 
('ATS', 'Acesso total ao sistema'),
('UFB', 'Acesso limitado a funções básicas'),
('GPU', 'Gerencia permissões e usuários'),
('LLR', 'Acesso apenas para leitura de logs e relatórios'),
('SP', 'Acesso para solução de problemas'),
('RFF', 'Acesso a relatórios e ferramentas financeiras');

INSERT INTO GRUPO_PERMISSAO (sigla_grupo, sigla_permissao) VALUES 
('ADM', 'RFF'),
('ADM', 'GPU'),
('ADM', 'ATS'),
('BS', 'LLR'),
('BS', 'UFB'),
('BS', 'SP');

INSERT INTO API (nome, descricao, url_base, freq_mon_min, data_cadastro) VALUES 
('Weather API', 'API gratuita para previsão do tempo', 'https://openweathermap.org/api', 5, '2024-12-07'),
('Makeup API','pesquisar produtos de maquiagem e filtrar por características do produto', 'https://makeupapi.com', 2, '2024-12-07'),
('BreweryDB','fonte de dados relacionados a cervejarias, cervejas e eventos de cerveja', 'https://brewerydb.com', 3, '2024-12-07'),
('Deck Of Cards API', 'simula ações com um baralho de cartas', 'https://deckofcardsapi.com', 10, '2024-12-07'),
('Open Trivia DB', 'API gratuita para recuperar perguntas triviais em projetos de programação', 'https://opentdb.com', 4, '2024-12-07'),
('Nasa', 'acessar dados de astronomia e imagens de planetas e galáxias', 'https://api.nasa.gov', 7, '2024-12-07'),
('Marvel', 'informações sobre biblioteca de quadrinhos da Marvel', 'https://developer.marvel.com', 1, '2024-12-07'),
('Football-Data.org', 'dados e estatísticas de futebol de maneira legível por máquina', 'https://football-data.org', 15, '2024-12-07'),
('Adorable Avatars', 'serviço de espaço reservado para avatar para desenvolvedores e designers da web', 'https://adorableavatars.com', 2, '2024-12-07'),
('MovieDB', 'dados de filmes, atores e programas de TV', 'https://www.themoviedb.org', 3, '2024-12-07');

INSERT INTO USUARIO (nome, email, telefone, login, senha, sigla_grupo) VALUES 
('laura mesquita', 'lauramesquitabruel@gmail.com', '54984021710', 'laura.bruel', 'miau', 'BS'),
('augusto remus', 'lauramesquitabruel123@gmail.com', '54984111710', 'augusto.remus', 'mumu', 'ADM');

INSERT INTO STATUS (codigo, descricao) VALUES 
(100, 'Continue'),
(101, 'Switching Protocols'),
(102, 'Processing');

INSERT INTO STATUS (codigo, descricao) VALUES
('200', 'OK'), 
(201, 'Created'),
(202, 'Accepted'),
(203, 'Non-Authoritative Information'),
(204, 'No Content'),
(205, 'Reset Content'),
(206, 'Partial Content'),
(207, 'Multi-Status');

INSERT INTO STATUS (codigo, descricao) VALUES 
(300, 'Multiple Choices'),
(301, 'Moved Permanently'),
(302, 'Found'),
(303, 'See Other'),
(304, 'Not Modified'),
(305, 'Use Proxy'),
(307, 'Temporary Redirect'),
(308, 'Permanent Redirect');

INSERT INTO STATUS (codigo, descricao) VALUES 
('400', 'Bad Request'),
(401, 'Unauthorized'),
(402, 'Payment Required'),
(403, 'Forbidden'),
(404, 'Not Found'),
(405, 'Method Not Allowed'),
(406, 'Not Acceptable'),
(407, 'Proxy Authentication Required'),
(408, 'Request Timeout'),
(409, 'Conflict'),
(410, 'Gone'),
(411, 'Length Required'),
(412, 'Precondition Failed'),
(413, 'Payload Too Large'),
(414, 'URI Too Long'),
(415, 'Unsupported Media Type'),
(416, 'Range Not Satisfiable'),
(417, 'Expectation Failed'),
(418, 'Im a teapot'),
(422, 'Unprocessable Entity'),
(425, 'Too Early'),
(426, 'Upgrade Required'),
(428, 'Precondition Required'),
(429, 'Too Many Requests'),
(431, 'Request Header Fields Too Large'),
(451, 'Unavailable For Legal Reasons');

INSERT INTO STATUS (codigo, descricao) VALUES 
(500, 'Internal Server Error'),
(501, 'Not Implemented'),
(502, 'Bad Gateway'),
(503, 'Service Unavailable'),
(504, 'Gateway Timeout'),
(505, 'HTTP Version Not Supported'),
(506, 'Variant Also Negotiates'),
(507, 'Insufficient Storage'),
(508, 'Loop Detected'),
(510, 'Not Extended'),
(511, 'Network Authentication Required');

