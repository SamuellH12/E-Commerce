import Image from "next/image"
import visa from "C:/Users/lucas/OneDrive/Área de Trabalho/E-CommerceESS/client/public/visa.png"

export default function MasterCard() {
    return <Image src={visa} alt="Picture of VISA" className="inline-block"/>
}