import { NextFunction, Request, Response } from "express";
import supabase from "../../supabase/supabase";
import { cardSchema, CardType } from "./schema/card-schemas";
import { cardTypeValidation, encryptData } from "./utils/card-utils";

export async function getAllCards(req: Request, res: Response) {
  const { data, error } = await supabase.from("cards").select("*");

  if (error) res.status(500).json(error);

  res.json(data);
}

export async function createCard(req: Request, res: Response) {
  const card: CardType = req.body;

  const cardType = cardTypeValidation(card.code);

  const encryptedNumber = encryptData(card.code);
  const encryptedExpiration = encryptData(card.expiration);

  const { error } = await supabase.from("cards").insert({
    nickname: card.nickname,
    name: card.name,
    expiration: encryptedExpiration.encryptedData,
    code: encryptedNumber.encryptedData,
    card_type: cardType,
    code_last4: card.code.substring(card.code.length - 4),
    code_iv: encryptedNumber.iv,
    expiration_iv: encryptedExpiration.iv,
  });

  if (error) res.status(500).json(error);

  res.send("Card created successfully");
}

export async function parseCardSchema(
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
