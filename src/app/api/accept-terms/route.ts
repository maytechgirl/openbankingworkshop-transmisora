export async function POST(req:any, res:any) {
    try {
        const data = await req.json();

        if (!data.idProcesso || !data.consent) {
            return new Response("Dados incompletos", { status: 400 });
        }

        const dataUrl = process.env.DATA_URL;
        if (!dataUrl) {
            return new Response("URL dos dados não encontrada", { status: 400 });
        }

        const idProcesso = data.idProcesso;

        let terms_value = "refused";
        if (data.consent) {
            terms_value = "accepted";
        }
            

        // realizamos um PUT em DATA_URL + /data.IdProcesso, atualizando os terms para "refused" ou "accepted"
        const response = await fetch(dataUrl + "/" + idProcesso, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ terms:  terms_value }),
        });

        if (response.status !== 200) {
            return new Response("Erro ao atualizar os termos", { status: 500 });
        }
            
        return new Response(JSON.stringify({ message: "Termos atualizados com sucesso" }), { status: 200 });
    } catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        return new Response("Erro interno do servidor", { status: 500 });
    }
}
