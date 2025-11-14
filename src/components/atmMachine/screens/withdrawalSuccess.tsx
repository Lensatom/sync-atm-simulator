import { OnScreenSelectionBox } from "@/components/atmSelectionLabel"
import Image from "next/image"
import SuccessImage from "@/assets/images/success.svg";
import { useEffect } from "react";
import { POST } from "@/config/axios";

export const WithdrawalSuccessScreen = ({
  id,
  setCurrScreen,
  showButtonClick,
  currIssue
}: {
  id: string,
  setCurrScreen: React.Dispatch<React.SetStateAction<string>>,
  showButtonClick: (name: string) => void,
  currIssue: string
}) => {

  const handleButtonClick = (name: string, value: number) => {
    if (currIssue === "CARD_EJECT_FAILURE") {
      setCurrScreen("cardEjectError");
      return;
    }
    showButtonClick(name);
    setCurrScreen("welcome")
  }

  const handleCashJammed = async () => {
    await POST({
      route: "/sdk/withdraw",
      data: {
        atmId: id,
        cashJammed: true
      }
    })
  }

  useEffect(() => {
    if (currIssue === "CASH_JAMMED") {
      handleCashJammed()
    }
  }, []);

  return (
    <div className="relative h-full flex flex-col items-center">
      <Image src={SuccessImage} alt="Success" className="mt-16 w-16" />
      <h3 className="text-xl font-bold text-success">Withdrawal Success!</h3>
      <p className="text-[9px] text-atm-light-gray">Press any botton to eject card</p>
      {currIssue === "CASH_JAMMED" && (
        <p className="text-[9px] text-error text-center mt-2">
          Your cash jammed. Unable to dispense cash. Please contact support.
        </p>
      )}
      <OnScreenSelectionBox
        onClickButton={handleButtonClick}
        ghost
      />
    </div>
  )
}