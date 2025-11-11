"use client"

import { useState } from "react"
import { AtmMachine } from "./components"

export function AtmStand() {
  const atmMachines = [1, 2, 3, 4]
  const [activeMachine, setActiveMachine] = useState(0)

  return (
    <div className="flex min-h-screen w-full justify-center items-center">
      <div className="grid grid-cols-2 gap-x-[50px] gap-y-[25px] justify-center items-center self-center">
        {atmMachines.map((machine, index) => (
          <div onClick={() => setActiveMachine(machine)} key={machine} className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} items-center w-full hover:scale-105 transition-all`}>
            <AtmMachine full={activeMachine === machine} />
          </div>
        ))}
      </div>
    </div>
  )
}