import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import type { FromLanguage, Language } from '../types'
import { SectionStype as SectionTypeValue } from '../enums'
import type { SectionStype } from '../enums'

type Props = {
  type: SectionStype.From
  value: FromLanguage
  onChange: (lang: FromLanguage) => void
} | {
  type: SectionStype.To
  value: Language
  onChange: (lang: Language) => void
}

/* eslint-disable react/prop-types */
export const LanguageSelector: React.FC<Props> = ({ onChange, type, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select aria-label='Seleccionar idioma' onChange={handleChange} value={value}>
      { type === SectionTypeValue.From ? (<option value={AUTO_LANGUAGE} >Detectar idioma</option>) : null }
      {
        Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
          <option key={key} value={key}>
            {literal}
          </option>
        ))
      }
    </Form.Select>
  )
}
