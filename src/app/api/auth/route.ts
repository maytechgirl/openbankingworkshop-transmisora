import { NextResponse } from 'next/server';

export async function GET() {
  return  new Response("Método não permitido" );
}


export async function POST(req:any, res:any) {
  try {
    const data = await req.json();

    if (!data.agencia || !data.conta || !data.password) {
      return new Response("Dados incompletos", { status: 400 });
    }

    const solicitacaoAutenticada = {
      id_solicitacao: "123456",
      consumidor: "Empresa média LTDA",
      id_cliente: "01.234.567/0001-89",
      receptor: "Banco Exemplo",
      data_solicitacao: "2024-02-22T00:00:00Z",
      dados_solicitacao: {
        0: "Cadastral básico",
        1: "Conta corrente",
      },
      prazo: "",
    };  
  
    // const usuarioAutenticado = await autenticarUsuario(data.agencia, data.conta, data.password);

    if (!solicitacaoAutenticada) {
      return new Response("Credenciais inválidas", { status: 401 });
    }

    // Aqui você pode retornar mais informações sobre o usuário autenticado
    return new Response(JSON.stringify(solicitacaoAutenticada), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    return new Response("Erro interno do servidor", { status: 500 });
  }
}