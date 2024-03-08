import { NextRequest } from 'next/server';

// Passamos no parametro do GET o code do usuário
// Essa API deixaria de existir se o usuário fosse autenticado, pois o code seria definido no processo de autorização
// Seria feito um componente para passar os dados diretamente no SharedDataList.
export async function GET(req: NextRequest) {

    const code = req.nextUrl.searchParams.get('code');

    if (!code) { // Isso deverá ser removido. O code será definido para o usuário autenticado através do processo de autorização
        return new Response("Código não encontrado", { status: 400 });
    }

    const dataUrl = process.env.DATA_URL;
    if (!dataUrl) {
        return new Response("URL dos dados não encontrada", { status: 400 });
    }

    // realizamos um GET em DATA_URL + /data.IdProcesso
    const responseProcessData = await fetch(dataUrl + "/" + code);
    const processData = await responseProcessData.json();



    const selectedGroups = processData.selectedGroups;
    const apiUrl = process.env.PERMISSIONS_OPTIONS_API_URL
    if(!apiUrl) {
        return new Response("API URL não encontrada", { status: 400 });
    }

    const response = await fetch(apiUrl);
    const dataApi = await response.json();


    let id = 0;
    let permissionId = 0;
    let optionsList: object[] = [];
    


    // Faremos uma optionsList apenas com os dados selecionados em SelectedGroups
    for (const group of dataApi) {
        id++;
        // Se tiver o displayName e permissions E se o grupo estiver selecionado
        if (group.displayName && group.dataPermissions && selectedGroups.find((selectedGroup: any) => selectedGroup.groupId == id)) {
            let displayName: string = '';
            let permissions: object[] = [];
            
            displayName = group.displayName;
            permissionId = 0;
            // Se o dataPermissions for iterável, então vamos iterar sobre ele
            if (Symbol.iterator in Object(group.dataPermissions)) {
                for (const permission of group.dataPermissions) {
                    let permissionName: string = permission.displayName;
                    let permissionDetail: string = permission.detail;
                    permissionId++;

                    // Se a permissão estiver selecionada
                    if (selectedGroups.find((selectedGroup: any) => selectedGroup.groupId == id).permissions.includes(permissionId.toString())) {
                        permissions.push({ id: permissionId, name: permissionName, detail: permissionDetail });
                    }
                }
            }
            
            optionsList.push({ id: id, displayName: displayName, permissions: permissions });

        }
    }

    const redirectUrl = process.env.RECEPTORA_URL + '/application/';

    const respData = { 
        options: optionsList,  // Data to be shared
        consumidor: processData.consumidor, 
        identificacaoCliente: processData.identificacaoCliente,
        codigoSolitacao: processData.idProcesso,
        receptor: 'Receptor X',
        dataConsent: new Date().toISOString(),
        prazo: processData.prazo,
        redirectUrl: redirectUrl,
    };

    const responseJson = JSON.stringify(respData);

    return new Response(responseJson, {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-cache, no-store, must-revalidate" },
    });
}
