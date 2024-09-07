CREATE DATABASE IF NOT EXISTS CLINICA;
USE CLINICA;

CREATE TABLE IF NOT EXISTS Paciente (
    CPF varchar(11) PRIMARY KEY,
    Nome varchar(40) NOT NULL,
    Idade INT(11) NOT NULL,
    DiaMarcado date NOT NULL,
    HoraMarcada time NOT NULL,
);