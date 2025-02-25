import Image from "next/image"
import visa from "../../../../public/visa.png"

export default function MasterCard() {
    return <Image src={visa} alt="Picture of VISA" className="inline-block"/>
}