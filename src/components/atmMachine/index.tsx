"use client";
import AtmBase from "@/assets/images/atm-base.svg";
import ActiveAtmButton from "@/assets/images/atm-button-active.svg";
import AtmButton from "@/assets/images/atm-button.svg";
import ZenithLogo from "@/assets/images/zenith-logo.svg";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SelectAmountScreen } from "./screens/selectAmount";
import { WelcomeScreen } from "./screens/welcome";
import { WithdrawalSuccessScreen } from "./screens/withdrawalSuccess";
import { EnterPin } from "./screens/enterPin";
import { ProcessingCardScreen } from "./screens/processingCard";
import { DispensationErrorScreen } from "./screens/dispensationError";
import NoLifeScreen from "./screens/noLife";
import { getAtmStateLocal, saveAtmStateLocal } from "@/helpers";
import { POST, PUT } from "@/config/axios";

type AtmMachineProps = {
  full?: boolean;
  id: string;
}

export function AtmMachine({
  full = false,
  id
}: AtmMachineProps) {
  const [screenWidth, setScreenWidth] = useState(0);
  const percentageEnlargment = 1.7;
  const width = 550

  const leftButtons = ["a", "b", "c", "d"];
  const rightButtons = ["e", "f", "g", "h"];

  const [currScreen, setCurrScreen] = useState("welcome");
  const [buttonClicked, setButtonClicked] = useState<string>("");
  const atmState = getAtmStateLocal(id || "default");
  const [currIssue, setCurrIssue] = useState<string>(atmState as any);

  const isAlive = currIssue !== "NETWORK/POWER_OUTAGE"

  const possibleIssues = [
    "",
    "NETWORK/POWER_OUTAGE",
    "CONFIGURATION_ISSUE",
    "TRANSACTION_FAILURE",
    "SSL_EXPIRED",
    "MEMORY_FULL",
    "CASH_DISPENSER_JAMMED",
    "PRINTER_JAMMED",
    "LOW_CASH",
    "CARD_RETAINED",
    "MALWARE_DETECTED"
  ]

  const showButtonClick = (name: string) => {
    setButtonClicked(name);
    setTimeout(() => {
      setButtonClicked("");
    }, 200);
  }

  const triggerAtmStatus = async (status: "online" | "offline") => {
    try {
      await PUT({
        route: `/bank/health/atm/${id || "default"}`,
        data: {
          activityStatus: status
        }
      })
    } catch (error) {
      
    }
  }

  useEffect(() => {
    saveAtmStateLocal(id || "default", currIssue);
    if (!isAlive) {
      setCurrScreen("noLife");
      triggerAtmStatus("offline")
    } else if (currScreen === "noLife") {
      setCurrScreen("welcome");
      triggerAtmStatus("online")
    }
  }, [currIssue])

  const screenList:any = useMemo(() => ({
    welcome: <WelcomeScreen setCurrScreen={setCurrScreen} showButtonClick={showButtonClick} />,
    processingCard: <ProcessingCardScreen setCurrScreen={setCurrScreen} />,
    enterPin: <EnterPin setCurrScreen={setCurrScreen} showButtonClick={showButtonClick} />,
    selectAmount: <SelectAmountScreen setCurrScreen={setCurrScreen} showButtonClick={showButtonClick} />,
    withdrawalSuccess: <WithdrawalSuccessScreen setCurrScreen={setCurrScreen} showButtonClick={showButtonClick} />,
    dispensationError: <DispensationErrorScreen setCurrScreen={setCurrScreen} showButtonClick={showButtonClick} />,
    noLife: <NoLifeScreen />,
  }), []);

  useEffect(() => {
    const update = () => setScreenWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      {full && (
        <select
          value={currIssue}
          onChange={(e) => setCurrIssue(e.target.value)}
          className="absolute top-2 right-2 z-[60] bg-white text-black p-1 rounded shadow"
        >
          {possibleIssues.map((issue) => (
            <option key={issue} value={issue}>
              {issue}
            </option>
          ))}
        </select>
      )}
      <div
        className={`
          ${full ? "absolute top-[30%] z-50 flex justify-center items-center"
            : "relative"}
        rounded-xl overflow-hidden`
        }
        style={{
          left: full && screenWidth
            ? `${(((width * 1.6) - width) / 2) + ((screenWidth - (width * 1.6)) / 2)}px`
            : "0",
          scale: full ? `${percentageEnlargment}` : "1"
        }}
      >
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: `${width}px`,
          }}
        >
          <Image src={AtmBase} alt="ATM Machine" className="w-full h-full" />
          
          <div className="absolute flex gap-4 top-0 left-0 w-full h-full p-3">
            <div className="bg-[#464853] w-16 h-full p-2 flex flex-col justify-end gap-4">
              {leftButtons.map((button:any) => {
                const isButtonClicked = buttonClicked === button;
                return (
                  <Image
                    key={button}
                    src={isButtonClicked ? ActiveAtmButton : AtmButton}
                    alt="ATM Button"
                  />
                )
              })}
            </div>

            <div className={`relative w-full h-full flex flex-col ${isAlive ? "bg-white" : "bg-black"}`}>
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
              <div className="h-full w-full">
                {screenList[currScreen]}
              </div>
            </div>

            <div className="bg-[#464853] w-16 h-full p-2 flex flex-col justify-end gap-4">
              {rightButtons.map((button:any) => {
                const isButtonClicked = buttonClicked === button;
                return (
                  <Image
                    key={button}
                    src={isButtonClicked ? ActiveAtmButton : AtmButton}
                    alt="ATM Button"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}