import Image from "next/image"
import FloatingCards from "@/assets/images/floating-cards.svg";
import { OnScreenSelectionBox } from "@/components/atmSelectionLabel";

export const WelcomeScreen = ({ setCurrScreen, showButtonClick }: { setCurrScreen: React.Dispatch<React.SetStateAction<string>>, showButtonClick: (name: string) => void }) => {
  const onClickButton = (name: string) => {
    showButtonClick(name);
    setCurrScreen("enterPin");
  }
  
  return (
    <div className="flex flex-col mt-4 justify-center items-center">
      <h3 className="text-xl font-bold text-primary">Welcome to Zenith Bank</h3>
      <p className="text-xs">Please insert your card to begin.</p>
      <Image src={FloatingCards} alt="Floating Cards" className="mt-8 w-32" />
      <OnScreenSelectionBox ghost onClickButton={onClickButton} />
    </div>
  )
}