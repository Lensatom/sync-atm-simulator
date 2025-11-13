import { OnScreenSelectionBox } from "@/components/atmSelectionLabel"
import EnterPinImage from "@/assets/images/enter-pin.svg"
import Image from "next/image"
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { POST } from "@/config/axios";

export function EnterPin({
  id,
  setCurrScreen,
  showButtonClick
}: {
  id: string,
  setCurrScreen: React.Dispatch<React.SetStateAction<string>>,
  showButtonClick: (name: string) => void
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const keys = {
    g: {
      label: "Proceed",
      value: "proceed"
    },
    d: {
      label: "Exit",
      value: "exit"
    },
  }

  useEffect(() => {
    setError(false);
  }, [pin])

  const handleButtonClick = async (name: string, value: number) => {
    showButtonClick(name);
    if (name === "g" && pin.length === 4) {
      if (pin === "1234") {
        setCurrScreen("selectAmount");
        return;
      }
      
      try {
        await POST({
          route: "sdk/withdraw",
          data: {
            atmId: id,
            pin
          }
        })
      } catch (error) {
        setError(true)
      }
    }
    if (name === "d") {
      setCurrScreen("welcome");
    }
  }

  return (
    <div className="relative h-full flex flex-col px-4">
      <div className="flex items-center mt-4">
        <Image src={EnterPinImage} alt="Enter Pin" className="w-16" />
        <div>
          <h3 className="text-xl font-bold text-primary">Enter your PIN</h3>
          <p className="text-[9px] text-atm-light-gray w-44">Please guard your PIN and ensure no one is watching.</p>
        </div>
      </div>
      <OTPInput
        value={pin}
        onChange={setPin}
        numInputs={4}
        renderSeparator={null}
        inputType="tel"
        renderInput={(inputProps) => (
          <input
            {...inputProps}
            className={`${inputProps.className || "w-full h-full"}`}
          />
        )}
        inputStyle={{
          width: "2.5rem",
          height: "2.5rem",
          marginRight: "0.5rem",
          marginTop: "1rem",
          fontSize: "1rem",
          borderRadius: 4,
          border: "1px solid rgba(0,0,0,0.3)"
        }}
        containerStyle={{
          zIndex: 99
        }}
        placeholder="****"
      />
      {error && (
        <p className="text-xs text-error mt-2">Incorrect PIN. Please try again.</p>
      )}
      <OnScreenSelectionBox
        keys={keys}
        onClickButton={handleButtonClick}
      />
    </div>
  )
}