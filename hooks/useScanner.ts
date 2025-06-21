import { create } from "zustand";

interface ScannerState {
  scanned: boolean;
  toggleScanned: () => void;
}

export const useScanner = create<ScannerState>((set) => ({
  scanned: false,
  toggleScanned: () => set(({ scanned }) => ({ scanned: !scanned })),
}));
