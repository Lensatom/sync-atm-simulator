import { OnScreenSelectionBox } from "@/components/atmSelectionLabel"
import Image from "next/image"
import PressButton from "@/assets/images/press-button.svg";

export const SelectAmountScreen = ({
  setCurrScreen,
  showButtonClick
}: any) => {
  const N = "₦";

  const keys = {
    a: {
      label: "Home",
      value: "home"
    },
    b: {
      label: `${N}5,000`,
      value: 5000
    },
    c: {
      label: `${N}10,000`,
      value: 10000
    },
    d: {
      label: `${N}20,000`,
      value: 20000
    },
    e: {
      label: `${N}50,000`,
      value: 50000
    },
    f: {
      label: `${N}100,000`,
      value: 100000
    },
    g: {
      label: `${N}200,000`,
      value: 200000
    },
    h: {
      label: `${N}500,000`,
      value: 500000
    },
  }

  const handleButtonClick = (name: string, value: number) => {
    showButtonClick(name);
    if (name === "a") {
      setCurrScreen("welcome")
    } else {
      setCurrScreen("dispensationError");
    }
  }

  return (
    <div className="relative h-full flex flex-col items-center">
      <h3 className="text-xl font-bold text-primary">Select Withdrawal Amount</h3>
      <p className="text-[9px] text-atm-light-gray">Or Select “Other” to Input Withdrawal Amount.</p>
      <Image src={PressButton} alt="Press Button" className="mt-8 w-24" />
      <p className="text-center text-[8px] text-atm-light-gray mt-2">
        Press a button at the side <br />
        to select the option beside it.
      </p>
      <OnScreenSelectionBox
        keys={keys}
        onClickButton={handleButtonClick}
      />
    </div>
  )
}