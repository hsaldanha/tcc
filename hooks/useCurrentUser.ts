import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface DietConfig {
  restrictions: Array<number>;
}

interface CurrentUserState {
  profile: DietConfig | null;
  initConfig: () => void;
  toggleRestriction: (restrictionId: number) => void;
}

export const useCurrentUser = create<CurrentUserState>()(
  immer((set) => ({
    profile: null,
    initConfig: () =>
      set((currentState) => ({
        profile:
          currentState.profile !== null
            ? currentState.profile
            : {
                restrictions: [],
              },
      })),
    toggleRestriction: (restrictionId) =>
      set(({ profile }: CurrentUserState) => {
        if (profile?.restrictions) {
          let patternIndex = profile?.restrictions.findIndex(
            (p) => p === restrictionId
          );

          if (patternIndex !== -1) {
            profile.restrictions = profile?.restrictions?.filter(
              (p) => p !== restrictionId
            );
          } else {
            profile?.restrictions?.push(restrictionId);
          }
        }
      }),
  }))
);
