export const saveAtmStateLocal = (atmId: string, state: any) => {
  localStorage.setItem(`atmState_${atmId}`, state);
}

export const getAtmStateLocal = (atmId: string) => {
  const state = localStorage.getItem(`atmState_${atmId}`);
  return state ? state : null;
}