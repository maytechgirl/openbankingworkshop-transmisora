// components/AuthForm.tsx
import React, { useEffect, useState } from "react";
import ReadOnlyInput from "../ReadOnlyInput/ReadOnlyInput";
import DataSharingOptions from "../DataSharingOptions/DataSharingOptions";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import './SharedDataList.css';

type Content = {
    options: string[];
    consumidor: string;
    identificacaoCliente: string;
    codigoSolitacao: string;
    receptor: string;
    dataConsent: string;
    prazo: string;
    idProcesso: string;
};

type OptionsList = {
    id: number;
    displayName: string;
    permissions: {
        id: number;
        name: string;
    }[];
};

// export default function SharedDataList(props: Content) {
export default function SharedDataList(props: { code: string }) {
    const [responseJson, setResponseJson] = useState<Content>();
    const [optionsList, setOptionsList] = useState<OptionsList[]>([]);
    const [redirectUrl, setRedirectUrl] = useState<string>();

    useEffect(() => {
        const code = props.code;
        fetch(`/api/permissions-options?code=${code}`, { // Isso seria feito sem uma API
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            // Se mês for igual  1, concatenamos " mês" se for maior, concatenamos " meses", só por estética
            if (data.prazo == 1) {
                data.prazo = "1 mês";
            } else {
                data.prazo = `${data.prazo} meses`;
            }
            
            setResponseJson(data);
            setOptionsList(data.options);
            setRedirectUrl(data.redirectUrl);
        })
        .catch(error => {
            console.error('Error getting permissions:', error);
        });
    }, []);

    /*
     * O processo desejado seria criar uma API que recebe o idProcesso + consentimento (true/false) e então salvariamos no banco.
     * Na outra aplicação, bastaria fazer um select no banco para verificar o status do consentimento.
    */

    const handleConsent = (consent: boolean) => {
        const idProcesso = responseJson?.codigoSolitacao || '';

        if (responseJson && responseJson.idProcesso != '' && consent != undefined) {
            fetch(`/api/accept-terms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idProcesso: idProcesso,
                    consent: consent,
                }),
            }).then(response => response.json())
            .then(data => {
                if(redirectUrl) {
                    window.location.href = redirectUrl;
                }
            }).catch(error => {
                console.error('Error saving consent :', error);
            });

        }        
    }

    return (
        // Se responseJson E handleConsent estiverem setados, então renderiza o componente
        responseJson? (
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <div className="flex flex-col justify-center items-center w-full text-xl text-black" >
                <h1 className="text-3xl font-bold text-center mb-5">Compartir confirmación</h1>


                <div className="mb-4">
                    <p className="text-center">Antes de compartir sus datos con la otra institución, nos gustaría confirmar algunos datos.</p>
                </div> 
                <div className="mb-4 bg-gray-100 w-auto p-4 rounded-xl text-1xl">

                    <ReadOnlyInput classNameLabel="font-bold pr-2" label="Código de solicitud" id="codigoSolitacao" value={responseJson?.codigoSolitacao} readOnly />
                    <ReadOnlyInput classNameLabel="font-bold pr-2" label="Consumidor" id="consumidor" value={responseJson?.consumidor} readOnly />
                    <ReadOnlyInput classNameLabel="font-bold pr-2" label="Identificación del cliente" id="cnpj" value={responseJson?.identificacaoCliente} readOnly />
                    <ReadOnlyInput classNameLabel="font-bold pr-2" label="Receptor" id="receptor" value={responseJson?.receptor} readOnly />
                    <ReadOnlyInput divClass="flex flex-col pb-5" classNameLabel="font-bold" className="text-sm" label="Fecha de consentimiento" id="dataConsent" value={responseJson?.dataConsent} readOnly />
                    <DataSharingOptions optionsList={optionsList} />
                    <ReadOnlyInput classNameLabel="font-bold pr-2" label="Plazo" id="prazo" value={`${responseJson?.prazo}`} readOnly />
                </div>

                <TermsAndConditions
                    titleClassName="font-bold text-green-600"
                    contentClassName="pl-8"
                    chevronClassName="custom-chevron-class"
                />
                <div className="flex justify-between mb-4">
                    <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded mr-8" onClick={() => handleConsent(false)}>
                        Cancelar
                    </button>
                    <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded" onClick={() => handleConsent(true)}>
                        Confirmar
                    </button>
                </div>


                
        </div>
        </main>

    ) : <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">        
        <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    </main>
    );
};