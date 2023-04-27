import { LanguageOptions } from './types'

interface IDeveloperFormState {
  name: string
  languageOptions: LanguageOptions[]
  formIsCompleted: boolean
}

export enum ActionTypes {
  UPDATE_NAME,
  UPDATE_SELECT_LANGUAGE,
  UPDATE_RATE_LANGUAGE,
}

type ActionUpdateName = {
  type: ActionTypes.UPDATE_NAME
  payload: string
}

type ActionUpdateSelectLanguage = {
  type: ActionTypes.UPDATE_SELECT_LANGUAGE
  payload: string
}

type ActionUpdateRateLanguage = {
  type: ActionTypes.UPDATE_RATE_LANGUAGE
  payload: {
    langValue: string
    rating: number | null
  }
}

export function developerFormReducer(
  state: IDeveloperFormState,
  action:
    | ActionUpdateName
    | ActionUpdateSelectLanguage
    | ActionUpdateRateLanguage
): IDeveloperFormState {
  switch (action.type) {
    case ActionTypes.UPDATE_NAME: {
      const newState = {
        ...state,
        name: action.payload,
      }

      return { ...newState, formIsCompleted: formIsCompleted(newState) }
    }

    case ActionTypes.UPDATE_SELECT_LANGUAGE: {
      const newSelectedLanguagues = updateSelectLanguage(
        state.languageOptions,
        action.payload
      )
      const newState = { ...state, languageOptions: newSelectedLanguagues }

      return { ...newState, formIsCompleted: formIsCompleted(newState) }
    }

    case ActionTypes.UPDATE_RATE_LANGUAGE: {
      const newRateLanguagues = updateRatingLanguage(
        state.languageOptions,
        action.payload
      )
      const newState = { ...state, languageOptions: newRateLanguagues }

      return { ...newState, formIsCompleted: formIsCompleted(newState) }
    }

    default: {
      return state
    }
  }
}

function updateSelectLanguage(
  languageOptions: LanguageOptions[],
  langValue: string
) {
  const newSelectedLanguages = languageOptions.map((langOp) => {
    if (langOp.language.value === langValue) {
      return { ...langOp, selected: !langOp.selected, rating: 0 }
    }
    return langOp
  })
  return newSelectedLanguages
}

function updateRatingLanguage(
  languageOptions: LanguageOptions[],
  payload: {
    langValue: string
    rating: number | null
  }
) {
  const newSelectedLanguages = languageOptions.map((langOp) => {
    if (langOp.language.value === payload.langValue) {
      return { ...langOp, rating: payload.rating || 0 }
    }
    return langOp
  })
  return newSelectedLanguages
}

function formIsCompleted(state: IDeveloperFormState): boolean {
  const { languageOptions, name } = state

  const selectedLanguages = languageOptions.filter((lang) => lang.selected)
  const allLanguagesAreRated = selectedLanguages.every(
    (lang) => lang.rating > 0
  )
  const isCompleted =
    name.length > 0 && selectedLanguages.length > 0 && allLanguagesAreRated

  return isCompleted
}
