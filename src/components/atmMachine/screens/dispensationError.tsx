import { OnScreenSelectionBox } from "@/components/atmSelectionLabel";
import Image from "next/image";
import ErrorImage from "@/assets/images/error.svg";
import Wrench from "@/assets/images/wrench.svg";

export function DispensationErrorScreen({
  setCurrScreen,
  showButtonClick
}: { 
  setCurrScreen: React.Dispatch<React.SetStateAction<string>>,
  showButtonClick: (name: string) => void
}) {

  const handleButtonClick = (name: string, value: number) => {
    showButtonClick(name);
    setCurrScreen("selectAmount")
  }

  return (
    <div className="relative h-full flex flex-col items-center">
      <Image src={ErrorImage} alt="Error" className="mt-4 w-16" />
      <h3 className="text-xl font-bold text-error text-center">Temporarily Unable <br /> Dispense Cash</h3>
      <div className="w-full flex items-center px-6 gap-3 mt-3">
        <div className="border-t border-gray-400 w-full" />
        <Image src={Wrench} alt="Wrench" className="w-6" />
        <div className="border-t border-gray-400 w-full" />
      </div>
      <p className="text-[9px] text-atm-light-gray text-center mt-3">
        An Engineer had been assigned to fix the issue.<br />
        Please try another ATM.
      </p>
      <OnScreenSelectionBox
        onClickButton={handleButtonClick}
        ghost
      />
    </div>
  )
}