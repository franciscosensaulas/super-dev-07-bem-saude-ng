// GET /profissionais
export interface ProfissionalResponseModel {
    id: string;
    nome: string;
    especialidade: string;
    registro: string;
    duracao: string;
    valor: string;
    dias_semana: string;
    status: boolean;
}

// POST /profissionais
export interface ProfissionalCriarRequestModel {
    nome: string;
    especialidade: string;
    registro: string;
    duracao: string;
    valor: string;
    dias_semana: string;
}

// PUT /profissionais/{id}
export interface ProfissionalEditarRequestModel {
    nome: string;
    especialidade: string;
    duracao: string;
    valor: string;
    dias_semana: string;
}

// GET /profissionais/{id}
export interface ProfissionalPesquisaResponseModel {
    id: string;
    nome: string;
    especialidade: string;
    registro: string;
    duracao: string;
    valor: string;
    dias_semana: string;
    status: boolean;
}
