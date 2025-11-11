import Image from "next/image";
import AtmBase from "@/assets/images/atm-base.svg"
import AtmButton from "@/assets/images/atm-button.svg"
import ZenithLogo from "@/assets/images/zenith-logo.svg"
import FloatingCards from "@/assets/images/floating-cards.svg";

type AtmMachineProps = {
  full?: boolean;
}

export function AtmMachine({
  full = false,
}: AtmMachineProps) {
  const style = {
    width: full ? '1199px' : '550px',
  }

  const leftButtons = [1, 2, 3, 4]
  const rightButtons = [5, 6, 7, 8]

  return (
    <div className={`
      ${
        full ? "absolute top-0 left-0 w-full h-screen flex justify-center items-center" :
        "relative"
      }
      rounded-xl overflow-hidden`
    }>
      <div className="relative overflow-hidden bg-white" style={style}>
        <Image src={AtmBase} alt="ATM Machine" className="w-full h-full" />
        <div className="absolute flex gap-4 top-0 left-0 w-full h-full p-3">
          <div className="bg-gray-900 w-16 h-full p-2 flex flex-col justify-end gap-4">
            {leftButtons.map((button) => (
              <div key={button}>
                <Image src={AtmButton} alt="ATM Button" />
              </div>
            ))}
          </div>
          <ATMScreen />
          <div className="bg-gray-900 w-16 h-full p-2 flex flex-col justify-end gap-4">
            {rightButtons.map((button) => (
              <div key={button}>
                <Image src={AtmButton} alt="ATM Button" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const ATMScreen = () => {
  return (
    <div className="w-full h-full bg-white">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="w-[65%] text-[7px] flex justify-between">
          <p className="font-medium">
            <span className="font-normal text-gray-600">ID: </span>
            ATM #ZB-024
          </p>
          <p>AC Power</p>
          <p>10:23 AM</p>
          <p>AI Monitoring Active</p>
        </div>
        <Image src={ZenithLogo} alt="Zenith Logo" />
      </div>
      <div className="flex flex-col mt-4 justify-center items-center">
        <h3 className="text-xl font-bold text-primary">Welcome to Zenith Bank</h3>
        <p className="text-xs">Please insert your card to begin.</p>
        <Image src={FloatingCards} alt="Floating Cards" className="mt-8 w-32" />
      </div>
    </div>
  )
}