import Image from 'next/image'
import ErrorImage from "@/assets/images/error.svg";

function NoLifeScreen() {
  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <Image src={ErrorImage} alt="Error" className="mt-4 w-16 opacity-50" />
      <h3 className="text-xl font-bold text-gray-500 mt-2">ATM Machine Downtime</h3>
      <p className='text-[9px] text-gray-500 mt-2 text-center'>We are working tirelessly to restore service.<br /> Please try again later.</p>
    </div>
  )
}

export default NoLifeScreen