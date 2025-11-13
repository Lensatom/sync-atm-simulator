import { OnScreenSelectionBox } from "@/components/atmSelectionLabel"
import Image from "next/image"
import SuccessImage from "@/assets/images/success.svg";

export const WithdrawalSuccessScreen = ({
  setCurrScreen,
  showButtonClick
}: { 
  setCurrScreen: React.Dispatch<React.SetStateAction<string>>,
  showButtonClick: (name: string) => void
}) => {

  const handleButtonClick = (name: string, value: number) => {
    showButtonClick(name);
    setCurrScreen("welcome")
  }

  return (
    <div className="relative h-full flex flex-col items-center">
      <Image src={SuccessImage} alt="Success" className="mt-16 w-16" />
      <h3 className="text-xl font-bold text-success">Withdrawal Success!</h3>
      <p className="text-[9px] text-atm-light-gray">Please take your Cash and Card</p>
      <OnScreenSelectionBox
        onClickButton={handleButtonClick}
        ghost
      />
    </div>
  )
}