import e from 'express'
import supabase from '../db'
import crypto from 'crypto'

// Chave de criptografia (deve ter 32 bytes para AES-256)
const ENCRYPTION_KEY = crypto.randomBytes(32)
const IV_LENGTH = 16 // Tamanho do IV (16 bytes para AES)

// Função para criptografar
function encryptData(cardData: string): {
  iv: string
  encryptedData: string
} {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv)
  let encrypted = cipher.update(cardData, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
  }
}

// Função para descriptografar
function decryptCardData(encryptedData: string, iv: string): string {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    ENCRYPTION_KEY,
    Buffer.from(iv, 'hex')
  )
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

interface NewCardInput {
  nickname: string
  name: string
  code: string
  expiration: string
  cardType: string
}

export default async function newCard({
  nickname,
  name,
  code,
  expiration,
  cardType,
}: NewCardInput) {
  // Uso
  const encryptedNumber = encryptData(code)
  const encryptedExpiration = encryptData(expiration)

  const response = await supabase.from('cards').insert({
    nickname: nickname,
    name: name,
    expiration: encryptedExpiration.encryptedData,
    code: encryptedNumber.encryptedData,
    card_type: cardType,
    code_last4: code.substring(code.length - 4),
    code_iv: encryptedNumber.iv,
    expiration_iv: encryptedExpiration.iv,
  })

  console.log(response)

  return response
}
