import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import supabase from "../../../supabase/supabase";
import { cardSchema, CardType } from "../schema/card-schemas";

// Chave de criptografia (deve ter 32 bytes para AES-256)
const ENCRYPTION_KEY = crypto.randomBytes(32);
const IV_LENGTH = 16; // Tamanho do IV (16 bytes para AES)

// Função para criptografar
export function encryptData(cardData: string): {
  iv: string;
  encryptedData: string;
} {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(cardData, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
}

export function cardTypeValidation(numero: string): string {
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

export function cardDateValidation(data: string): string {
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth() + 1;

  const ano = Number(data.substring(0, 4));
  const mes = Number(data.substring(5, 7));

  if (ano < anoAtual) return "invalid";
  if (ano === anoAtual && mes < mesAtual) return "invalid";

  return "valid";
}

// Função para descriptografar
export function decryptCardData(encryptedData: string, iv: string): string {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    ENCRYPTION_KEY,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

interface NewCardInput {
  nickname: string;
  name: string;
  code: string;
  expiration: string;
  cardType: string;
}

export default async function newCard({
  nickname,
  name,
  code,
  expiration,
  cardType,
}: NewCardInput) {
  // Uso
  const encryptedNumber = encryptData(code);
  const encryptedExpiration = encryptData(expiration);

  const response = await supabase.from("cards").insert({
    nickname: nickname,
    name: name,
    expiration: encryptedExpiration.encryptedData,
    code: encryptedNumber.encryptedData,
    card_type: cardType,
    code_last4: code.substring(code.length - 4),
    code_iv: encryptedNumber.iv,
    expiration_iv: encryptedExpiration.iv,
  });

  console.log(response);

  return response;
}

export function validateCard(req: Request, res: Response, next: NextFunction) {
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

  next();
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
