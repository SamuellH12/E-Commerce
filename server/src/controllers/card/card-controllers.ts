import { NextFunction, Request, Response } from "express";
import supabase from "../../supabase/supabase";
import { cardSchema, CardType } from "./schema/card-schemas";
import {
  cardDateValidation,
  cardTypeValidation,
  encryptData,
} from "./utils/new-card";

export async function getAllCards(req: Request, res: Response) {
  const { data, error } = await supabase.from("cards").select("*");

  if (error) res.status(500).json(error);

  res.json(data);
}

export async function createCard(req: Request, res: Response) {
  const card: CardType = req.body;

  // validate card
  const typeResult = cardTypeValidation(card.code);
  if (typeResult === "invalid") {
    res.status(400).send("Invalid card number");
    return;
  }

  const dateResult = cardDateValidation(card.expiration);
  if (dateResult === "invalid") {
    res.status(400).send("Invalid expiration date");
    return;
  }

  // Create card

  const encryptedNumber = encryptData(card.code);
  const encryptedExpiration = encryptData(card.expiration);

  const { data, error } = await supabase.from("cards").insert({
    nickname: card.nickname,
    name: card.name,
    expiration: encryptedExpiration.encryptedData,
    code: encryptedNumber.encryptedData,
    card_type: typeResult,
    code_last4: card.code.substring(card.code.length - 4),
    code_iv: encryptedNumber.iv,
    expiration_iv: encryptedExpiration.iv,
  });

  if (error) res.status(500).json(error);

  res.status(200).json(data);
}

export async function parseCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    cardSchema.parse(req.body);

    next();
  } catch (error: any) {
    res.status(400).json({ error: error.errors });
  }
}
// export const createCard: FastifyPluginAsyncZod = async (app) => {
//   app.post(
//     "/new_card",
//     {
//       schema: {
//         body: cardSchema,
//       },
//     },
//     async (request, response) => {
//       const card = request.body;

//       // validate card
//       let validation = validacaoTipoCartao(card.code);
//       if (validation === "invalid") {
//         response.status(400).send("Invalid card number");
//         return;
//       }
//       const cardType = validation;

//       validation = validacaoDataCartao(card.expiration);
//       if (validation === "invalid") {
//         response.status(400).send("Invalid expiration date");
//         return;
//       }

//       // Create card
//       response.send(newCard({ ...card, cardType: cardType }));
//     }
//   );
// };
