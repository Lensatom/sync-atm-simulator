"use client"

import { useState } from "react"
import { AtmMachine } from "@/components"

export function AtmStand() {
  const atmMachines = [1, 2, 3, 4]
  const [activeMachine, setActiveMachine] = useState(0)

  return (
    <div className="absolute top-0 left-0 flex min-h-screen w-full justify-center items-center">
      {activeMachine !== 0 && (
        <button
          onClick={() => setActiveMachine(0)}
          className="absolute top-0 left-0"
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