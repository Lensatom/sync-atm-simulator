"use client"

import { useEffect, useState } from "react"
import { AtmMachine } from "@/components"
import { GET } from "@/config/axios"

export function AtmStand() {
  const [atmMachines, setAtmMachines] = useState([])
  const [activeMachine, setActiveMachine] = useState(0)

  const getAtmMachines = async () => {
    try {
      const { data } = await GET({
        route: "/bank/atm",
      })
      setAtmMachines(data)
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAtmMachines();
  }, [])

  if (atmMachines.length === 0) {
    return (
      <div className="absolute top-0 left-0 flex min-h-screen w-full justify-center items-center">
        <p>Loading ATM Machines...</p>
      </div>
    )
  }
  return (
    <div className="absolute top-0 left-0 flex min-h-screen w-full justify-center items-center">
      {activeMachine !== 0 && (
        <button
          onClick={() => setActiveMachine(0)}
          className="absolute top-2 left-2"
        >
          Back to ATM Selection
        </button>
      )}
      <div className="grid grid-cols-2 gap-x-[50px] gap-y-[25px] justify-center items-center self-center">
        {atmMachines.map((machine, index) => {
          const isActive = activeMachine === machine;
          const isAnotherActive = activeMachine !== 0 && !isActive;
          return (
            <div
              onClick={() => setActiveMachine(machine)}
              key={machine}
              className={`
                flex items-center w-full
                ${index % 2 === 0 ? "justify-end" : "justify-start"}
                ${!isActive ? "hover:scale-105 transition-all" : ""}
                ${isAnotherActive ? "hidden" : ""}
              `}
            >
              <AtmMachine full={isActive} />
            </div>
          )
        })}
      </div>
    </div>
  )
}