export const OnScreenSelectionBox = ({
  keys,
  onClickButton,
  ghost = false
}:any) => {
  return (
    <div className="absolute left-0 bottom-4 px-4 w-full h-full flex items-end justify-between -ml-[70px]" style={{width: `calc(100% + 140px)`}}>
      <div className="flex flex-col gap-4">
        <OnScreenButton value={keys?.a} ghost={ghost ? true : !keys?.a} name="a" onClickButton={onClickButton} />
        <OnScreenButton value={keys?.b} ghost={ghost ? true : !keys?.b} name="b" onClickButton={onClickButton} />
        <OnScreenButton value={keys?.c} ghost={ghost ? true : !keys?.c} name="c" onClickButton={onClickButton} />
        <OnScreenButton value={keys?.d} ghost={ghost ? true : !keys?.d} name="d" onClickButton={onClickButton} />
      </div>
      <div className="flex flex-col items-end gap-4">
        <OnScreenButton right value={keys?.e} ghost={ghost ? true : !keys?.e} name="e" onClickButton={onClickButton} />
        <OnScreenButton right value={keys?.f} ghost={ghost ? true : !keys?.f} name="f" onClickButton={onClickButton} />
        <OnScreenButton right value={keys?.g} ghost={ghost ? true : !keys?.g} name="g" onClickButton={onClickButton} />
        <OnScreenButton right value={keys?.h} ghost={ghost ? true : !keys?.h} name="h" onClickButton={onClickButton} />
      </div>
    </div>
  )
}

type OnScreenButtonProps = {
  name: "a"
  value: string;
  right?: boolean
  onClickButton: any
}
export const OnScreenButton = ({
  name,
  value,
  right = false,
  onClickButton,
  ghost = false
}: any) => {
  return (
    <div className="flex gap-8" style={{opacity: ghost ? 0 : 1}}>
      {!right && <button className="w-8 h-8" onClick={() => onClickButton(name, value?.value)} />}
      <div className={`relative flex ${right ? "flex-row-reverse" : "flex-row"} items-center justify-between min-w-16 h-4 shadow-md shadow-gray-200 rounded-full my-[9px] border-gray-200 border-t border-r`}>
        <div className="w-5 h-5 -mt-0.5 bg-primary rounded-full border-2 border-white shadow-md shadow-gray-400" />
        <p className="text-[8px] font-bold px-2">{value?.label}</p>
      </div>
      {right && <button className="w-8 h-8" onClick={() => onClickButton(name, value?.value)} />}
    </div>
  )
}