import Image from "next/image"
import mastercard from "C:/Users/lucas/OneDrive/Área de Trabalho/E-CommerceESS/client/public/mastercard.png"

export default function MasterCard() {
    return <Image src={mastercard} alt="Picture of MasterCard" className="inline-block"/>
}