import './App.css'
import useTranslateStore from './hooks/useTranslateStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { SectionStype as SectionTypeValue } from './enums'
import { useEffect } from 'react'
import type { Language } from './types'

const getTranslatedText = (lang: Language): string => {
  if (lang === 'es') return '🇪🇸 Traducido al español'
  if (lang === 'en') return '🇬🇧 Translated to English'
  if (lang === 'de') return '🇩🇪 Ins Deutsche übersetzt'
  return ''
}

function App (): JSX.Element {
  const { fromLanguage, toLanguage, fromText, result, setFromText, setResult, interchangeLanguages, setToLanguage, setFromLangague, loading } = useTranslateStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(fromText !== '' ? `${getTranslatedText(toLanguage)}. :)` : '')
    }, 1000)

    return (): void => { clearTimeout(timer) }
  }, [fromText, loading, toLanguage])

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col >
          <Stack gap={2} >
              {<LanguageSelector value={fromLanguage} type={SectionTypeValue.From} onChange={setFromLangague}/>}
              <TextArea type={SectionTypeValue.From} value={fromText} onChange={setFromText}/>
          </Stack>
        </Col>
        <Col xl='auto' >
          <Button variant='link' onClick={interchangeLanguages} style={fromLanguage === AUTO_LANGUAGE || fromLanguage === toLanguage ? { cursor: 'not-allowed', opacity: 0.4, transition: 'all ease 0.8s' } : { transition: 'all ease 0.8s' } } >{<ArrowsIcon />}</Button>
        </Col>
        <Col>
          <Stack gap={2} >
            {<LanguageSelector value={toLanguage} type={SectionTypeValue.To} onChange={setToLanguage}/>}
            <TextArea type={SectionTypeValue.To} value={result} onChange={setResult} loading={loading}/>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
