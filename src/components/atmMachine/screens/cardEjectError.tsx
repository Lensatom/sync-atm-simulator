import Image from 'next/image'
import ErrorImage from "@/assets/images/error.svg";
import { OnScreenSelectionBox } from '@/components/atmSelectionLabel';
import { useEffect } from 'react';
import { POST } from '@/config/axios';

function CardEjectError({
  id,
  showButtonClick,
  setCurrScreen
}: {
  id: string,
  showButtonClick: (name: string) => void,
  setCurrScreen: (screen: string) => void
}) {

  const onClickButton = (name: string) => {
    showButtonClick(name);
    setCurrScreen("welcome");
  }

  const handleError = async () => {
    await POST({
      route: "/sdk/transaction/end",
      data: {
        atm: id,
        simulateCardEjectFailure: true
      }
    })
  }

  useEffect(() => {
    handleError()
  }, [])

  return (
    <div className="relative h-full flex flex-col items-center">
      <Image src={ErrorImage} alt="Error" className="mt-8 w-16" />
      <h3 className="text-xl font-bold text-error text-center">Card Eject Error</h3>
      <p className="text-xs">We could not eject your card. Please contact support.</p>
      <OnScreenSelectionBox ghost onClickButton={onClickButton} />
    </div>
  )
}

export default CardEjectError