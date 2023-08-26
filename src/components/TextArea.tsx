import { Form } from 'react-bootstrap'
import type { SectionStype } from '../enums'
import { SectionStype as SectionTypeValue } from '../enums'

type Props = {
  type: SectionStype.From
  value: string
  onChange: (value: string) => void
} | {
  type: SectionStype.To
  value: string
  loading: boolean
  onChange: (value: string) => void
}

const commonStyles = { border: '1px solid #cccccc', height: '200px' }

export const TextArea: React.FC<Props> = (Props: Props) => {
  const { type, value, onChange } = Props

  const getPlaceHolder = (): string => {
    if (type === SectionTypeValue.From) return 'Introducir Texto'
    if (Props.loading) return 'Cargando'
    return 'Introducir Texto'
  }

  const getValue = (): string => {
    // extra feature not really necesary
    if (type === SectionTypeValue.From) return value
    if (Props.loading && value !== '') return 'loadingg'
    return value
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(event.target.value)
  }

  const autoFocus: boolean = type === SectionTypeValue.From
  const styles = type === SectionTypeValue.From
    ? commonStyles
    : {
        ...commonStyles,
        backgroundColor: '#f5f5f5'
      }

  return (
    <Form.Control
      autoFocus={autoFocus}
      as='textarea'
      placeholder={getPlaceHolder()}
      style={styles}
      value={getValue()}
      onChange={handleChange}
    />
  )
}
