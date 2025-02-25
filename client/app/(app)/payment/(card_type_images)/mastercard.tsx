import Image from "next/image"
import mastercard from "../../../../public/mastercard.png"

export default function MasterCard() {
    return <Image src={mastercard} alt="Picture of MasterCard" className="inline-block"/>
}