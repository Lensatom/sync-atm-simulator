import { OnScreenSelectionBox } from "@/components/atmSelectionLabel";

export function LowCash({
  setCurrScreen,
  showButtonClick
}: { 
  setCurrScreen: React.Dispatch<React.SetStateAction<string>>,
  showButtonClick: (name: string) => void
}) {

  const onClickButton = async (name: string, value: string) => {
    showButtonClick(name);
    setCurrScreen("selectAmount")
  }

  return (
    <div className="flex flex-col mt-4 justify-center items-center">
      <h3 className="text-xl font-bold text-primary mt-16">Not Enough Cash</h3>
      <p className="text-[8px]">We do not have enough cash to dispense your requested amount.</p>
      {/* <Image src={FloatingCards} alt="Floating Cards" className="mt-8 w-32" /> */}
      <OnScreenSelectionBox ghost onClickButton={onClickButton} />
    </div>
  )
}