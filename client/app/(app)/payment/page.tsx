"use client";

import Link from 'next/link';
import { useState, useEffect } from "react";
import MasterCard from './(card_type_images)/mastercard';
import Visa from './(card_type_images)/visa';
import Image from 'next/image';
import configuracoes from 'C:/Users/lucas/OneDrive/Área de Trabalho/E-CommerceESS/client/public/configuracoes.png';

interface Card {
    id: number,
    created_at: string,
    nickname: string,
    name: string,
    code_last4: string,
    expiration: string,
    card_type: string,
    code_iv: string,
    expiration_iv: string,
    code: string
}

export default function Payment() {
    const [optionSelected, setOptionSelected] = useState(0);
    const [cardSelected, setCardSelected] = useState(0);
    const [cards, setCards] = useState<Card[]>([]);
    const [menuOpen, setMenuOpen] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('http://localhost:3000/cards/');
          const result = await response.json();
          setCards(result);
        };
    
        fetchData();
    }, []);

    function atualizarMenu(id:number) {
        if (menuOpen === id) {
            setMenuOpen(0);
        } else {
            setMenuOpen(id);
        }
    }

    async function confirmarRemocao(id:number) {
        const answer = window.prompt("TEM CERTEZA QUE DESEJA REMOVER ESSE CARTÃO? (S/N)")?.toUpperCase()

        if (answer === "S") {
            const response = await fetch(`http://localhost:3000/cards/${id}`, {
                method: "DELETE"
            })
            if (response.status === 200) window.alert("Cartão deletado com sucesso!")
            location.reload()
        }
        return
    }

    return (
        <div className="bg-white rounded-lg p-4 shadow-lg mt-10">
            <h1 className="font-extrabold mb-2 text-2xl">PAGAMENTO</h1>
            <p className="text-gray-500 mb-10">Selecione o método de pagamento da compra</p>
            
            <form>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => setOptionSelected(1)}
                        className={`h-20 items-center justify-center border-2 rounded-lg bg-white shadow-md w-1/2 ${optionSelected === 1 ? "border-black" : "border-gray-300"}`}
                    >
                        <h2>Cartão</h2>
                    </button>
                    <button
                        type="button"
                        onClick={() => setOptionSelected(2)}
                        className={`h-20 items-center justify-center border-2 rounded-lg bg-white shadow-md w-1/2 ${optionSelected === 2 ? "border-black" : "border-gray-300"}`}
                    >
                        <h2>Pix</h2>
                    </button>
                </div>

                {optionSelected === 1 && (
                    <div className="mt-10 gap-4">
                        <Link href="/payment/new_card">
                            <button type="button" className="h-20 items-center justify-center border-2 rounded-lg bg-white w-full hover:bg-gray-200 mb-4">
                                <h2>+ Adicionar cartão</h2>
                            </button>
                        </Link>
                        <div className="grid">
                            {cards.map((card:Card) => (
                                <div key={card.id} className="grid">
                                    <button
                                    type="button"
                                    onClick={() => {setCardSelected(card.id)}}
                                    className={`h-32 shadow-md px-4 rounded flex justify-between items-center mx-4 mb-4 ${cardSelected === card.id ? "bg-gray-300" : "bg-white"}`}
                                    >
                                        {card.card_type === "MasterCard" ? (<MasterCard/>) : (<Visa/>)}
                                        <h3>{card.nickname} - {card.code_last4}</h3>
                                        <span onClick={() => atualizarMenu(card.id)} onKeyDown={(e) => { if (e.key === 'Enter') atualizarMenu(card.id); }} className='border-4 rounded-lg p-2'>
                                            <Image src={configuracoes} alt="Configurações e mais" className='w-10'/>
                                        </span>
                                    </button>
                                    {card.id === menuOpen && (
                                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg overflow-hidden">
                                            <button
                                            type='button'
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => confirmarRemocao(card.id)}
                                            >
                                                Remover
                                            </button>
                                            <Link href={`/payment/edit_card/${card.id}`}>
                                                <button
                                                type='button'
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Atualizar
                                                </button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-right align-bottom mt-4">
                    <button type="button" className="rounded-lg p-4 shadow-md bg-red-500 text-white" onClick={() => history.back()}>
                        <h2>Cancelar</h2>
                    </button>
                    <button type="submit" className="rounded-lg p-4 shadow-md bg-blue-950 text-white ml-4 mr-2">
                        <h2>Finalizar Compra</h2>
                    </button>
                </div>
            </form>
        </div>
    )
}