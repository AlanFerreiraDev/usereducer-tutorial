import { useEffect, useReducer, useState } from 'react'
import Button from '@mui/material/Button'
import { LanguageQuestion } from './components/LanguageQuestion'
import { NameQuestion } from './components/NameQuestion'
import { RatingLanguagesQuestion } from './components/RatingLanguagesQuestion'
import { Language, LanguageOptions } from './types'
import { ActionTypes, developerFormReducer } from './reducer'

const languages: Language[] = [
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'Python', value: 'python' },
  { name: 'Java', value: 'java' },
  { name: 'C#', value: 'csharp' },
]

const initialValues: LanguageOptions[] = languages.map((language) => ({
  language,
  selected: false,
  rating: 0,
}))

export function DeveloperForm() {
  const [state, dispatch] = useReducer(developerFormReducer, {
    name: '',
    languageOptions: initialValues,
    formIsCompleted: false,
  })

  function handleSelectedLanguage(langValue: string) {
    dispatch({ type: ActionTypes.UPDATE_SELECT_LANGUAGE, payload: langValue })
  }

  function handleRatingLanguage(langValue: string, rating: number | null) {
    dispatch({
      type: ActionTypes.UPDATE_RATE_LANGUAGE,
      payload: { langValue, rating },
    })
  }

  return (
    <div>
      <NameQuestion
        value={state.name}
        onChangeValue={(value) =>
          dispatch({ type: ActionTypes.UPDATE_NAME, payload: value })
        }
      />
      <LanguageQuestion
        languageOptions={state.languageOptions}
        onSelectedLanguage={handleSelectedLanguage}
      />
      <RatingLanguagesQuestion
        languageOptions={state.languageOptions}
        onRatingLanguage={handleRatingLanguage}
      />
      <Button
        color="success"
        size="large"
        variant="contained"
        disabled={!state.formIsCompleted}
      >
        Enviar
      </Button>
    </div>
  )
}
