/**
 * Navigation Type Definitions
 * Defines types for step navigation
 */

export interface NavigationState {
  canGoNext: boolean;
  canGoPrevious: boolean;
  canSubmit: boolean;
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface NavigationActions {
  goToStep: (stepId: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  submit: () => void;
}

export type StepNavigationCallback = (stepId: number) => boolean | Promise<boolean>;