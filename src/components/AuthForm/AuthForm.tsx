// components/AuthForm.tsx
'use client';
import React from "react";
import { FormEvent } from "react";

export default function AuthForm(props: { code: string }) {

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // ao clicar em autenticar, redirecionar para a página de consentimento
    window.location.href = `/confirm-share/${props.code}`;
    
    // Apenas com obejtivo da demo, farei um localStorage com o code. 
    // Então não tem validação e daria pra fazer ataque de brute force.
    // localStorage.setItem("code", props.code);
  }

  return (
    <form className="flex flex-col justify-center items-center w-full text-xl" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-bold text-center">Autenticação</h1>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Agencia:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="agencia"
          type="text"
          name="agencia"
          placeholder="Agencia"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="conta">
          Cuenta:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="conta"
          name="conta"
          type="text"
          placeholder="Cuenta"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Contraseña:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          name="password"
          placeholder="Escribe tu contraseña"
        />
        <p className="text-gray-600 text-sm py-2">
          <a href="#">Olvide mi contraseña</a>
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Autenticar
        </button>
      </div>
    </form>
  );
};