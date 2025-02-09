import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import newCard from "../../controllers/card/utils/new-card";

function validacaoTipoCartao(numero: string): string {
  const tamanho = numero.length;

  const verificador = Number(numero[tamanho - 1]);
  const resto = numero.substring(0, tamanho - 1);

  let soma = 0;
  for (let i = tamanho - 2; i >= 0; i -= 1) {
    let num = Number(resto[i]);
    if (i % 2 === 0) num *= 2;
    if (num > 9) num -= 9;
    soma += num;
  }

  if (soma % 10 !== Number(verificador)) return "invalid";

  switch (tamanho) {
    case 13:
      if (numero[0] === "4") return "VISA";
      return "invalid";
    case 16:
      if (
        numero.substring(0, 2) in ["51", "52", "53", "54", "55"] ||
        (Number(numero.substring(0, 4)) >= 2221 &&
          Number(numero.substring(0, 4)) <= 2720)
      )
        return "MasterCard";
      if (numero[0] === "4") return "VISA";
      return "invalid";
    case 19:
      if (numero[0] === "4") return "VISA";
      return "invalid";
    default:
      return "invalid";
  }
}

function validacaoDataCartao(data: string): string {
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth() + 1;

  const ano = Number(data.substring(0, 4));
  const mes = Number(data.substring(5, 7));

  if (ano < anoAtual) return "invalid";
  if (ano === anoAtual && mes < mesAtual) return "invalid";

  return "valid";
}

export const createCardRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/new_card",
    {
      schema: {
        body: z.object({
          nickname: z.string(),
          name: z.string().nonempty(),
          code: z.string().min(13).max(16),
          expiration: z.string().min(7).max(7),
          cvc: z.string().min(3).max(3),
        }),
      },
    },
    async (request, response) => {
      const card = request.body;

      // validate card
      let validation = validacaoTipoCartao(card.code);
      if (validation === "invalid") {
        response.status(400).send("Invalid card number");
        return;
      }
      const cardType = validation;

      validation = validacaoDataCartao(card.expiration);
      if (validation === "invalid") {
        response.status(400).send("Invalid expiration date");
        return;
      }

      // Create card
      response.send(newCard({ ...card, cardType: cardType }));
    }
  );
};
