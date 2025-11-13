import Image from "next/image";
import { useEffect } from "react"
import Loader from "@/assets/images/loader.svg"; 

export function ProcessingCardScreen({
  setCurrScreen
}: {
  setCurrScreen: React.Dispatch<React.SetStateAction<string>>
}) {
  
  useEffect(() => {
    setTimeout(() => {
      setCurrScreen("enterPin");
    }, 1500)
  }, [])

  return (
    <div className="flex flex-col mt-16 justify-center items-center">
      <h3 className="text-xl font-bold text-primary">Welcome to Zenith Bank</h3>
      <p className="text-xs">Please insert your card to begin.</p>
      <Image src={Loader} alt="Loading" className="mt-8 w-6 animate-spin motion-reduce:animate-none" />
    </div>
  )
}