import { useReducer } from 'react'
import type { ISTate, IActionReducer, FromLanguage, Language } from '../types'
import { AUTO_LANGUAGE } from '../constants'

const INITIAL_STATE: ISTate = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

const reducer = (state: ISTate, action: IActionReducer): ISTate => {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state
    if (state.fromLanguage === state.toLanguage) return state

    const loading: boolean = state.fromText !== ''

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: state.result,
      result: '',
      loading
    }
  }

  if (type === 'SET_FROM_LAGUAGE') {
    const loading: boolean = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    const loading: boolean = state.fromText !== ''

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading: boolean = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

const useTranslateStore = (): {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
  interchangeLanguages: () => void
  setFromLangague: (lang: FromLanguage) => void
  setToLanguage: (lang: Language) => void
  setResult: (text: string) => void
  setFromText: (text: string) => void
} => {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, INITIAL_STATE)

  const interchangeLanguages = (): void => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLangague = (lang: FromLanguage): void => {
    dispatch({ type: 'SET_FROM_LAGUAGE', payload: lang })
  }

  const setToLanguage = (lang: Language): void => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload: lang })
  }

  const setFromText = (text: string): void => {
    dispatch({ type: 'SET_FROM_TEXT', payload: text })
  }

  const setResult = (text: string): void => {
    dispatch({ type: 'SET_RESULT', payload: text })
  }

  return {
    toLanguage,
    fromText,
    result,
    loading,
    fromLanguage,
    interchangeLanguages,
    setFromLangague,
    setToLanguage,
    setResult,
    setFromText
  }
}

export default useTranslateStore
