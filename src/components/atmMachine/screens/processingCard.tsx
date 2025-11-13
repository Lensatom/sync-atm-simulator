import Image from "next/image";
import { useEffect } from "react"
import Loader from "@/assets/images/loader.svg"; 
import { POST } from "@/config/axios";

export function ProcessingCardScreen({
  setCurrScreen,
  currIssue,
  id
}: {
  setCurrScreen: React.Dispatch<React.SetStateAction<string>>,
  currIssue: string,
  id: string
}) {

  const handleCardJammed = async () => {
    await POST({
      route: "/sdk/withdraw",
      data: {
        atmId: id || "default",
        cardJammed: true
      }
    })
  }

  useEffect(() => {
    console.log('currIssue:', currIssue);
    if (currIssue === "CASH_DISPENSER_JAMMED") {
      handleCardJammed()
    } else {
      setTimeout(() => {
        setCurrScreen("enterPin");
      }, 1500)
    }
  }, [])

  return (
    <div className="flex flex-col mt-16 justify-center items-center">
      <h3 className="text-xl font-bold text-primary">Welcome to Zenith Bank</h3>
      <p className="text-xs">Please insert your card to begin.</p>
      <Image src={Loader} alt="Loading" className="mt-8 w-6 animate-spin motion-reduce:animate-none" />
    </div>
  )
}