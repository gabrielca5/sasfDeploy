import { useMemo, useRef, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined'
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { Box, Chip, Stack, TextField, Typography } from '@mui/material'
import {
  ActionButton,
  ButtonLoading,
  EmptyState,
  ErrorState,
  LoadingState,
  PageCard,
  PageList,
  PageListItem,
  PageSection,
  PageStack,
  PageToolbar,
  PageWrapper,
  SectionBlock,
  StatusChip,
} from './ui'
import useFamilias from '../hooks/useFamilias'
import { processarEntrevista } from '../services/whisper.service'
import { salvarTranscricao } from '../services/transcricao.service'

const URGENCIA_COLOR = { alta: 'error', media: 'warning', baixa: 'success' }

function BuscaFamilia({ familiaSelected, onSelect }) {
  const [query, setQuery] = useState('')
  const { data: familiasData = [], isLoading, isError, refetch } = useFamilias()

  const familias = Array.isArray(familiasData) ? familiasData : []

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return familias
    return familias.filter((f) =>
      [f.nome_representante, f.cpf, f.endereco, f.bairro]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    )
  }, [familias, query])

  return (
    <SectionBlock title="Família" variant="plain">
      {familiaSelected ? (
        <PageCard surface="block">
          <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1.25} alignItems="center">
              <CheckCircleOutlineRoundedIcon sx={{ color: 'success.main', fontSize: 20 }} />
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>
                  {familiaSelected.nome_representante}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {familiaSelected.cpf ?? '—'}
                </Typography>
              </Box>
            </Stack>
            <ActionButton size="small" onClick={() => onSelect(null)}>
              Trocar
            </ActionButton>
          </Stack>
        </PageCard>
      ) : (
        <PageStack spacing={1.25}>
          <TextField
            label="Buscar família"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome do representante ou CPF"
            size="small"
          />
          <PageList variant="embedded" sx={{ maxHeight: 280, overflowY: 'auto' }}>
            {isError ? (
              <ErrorState title="Erro ao carregar famílias" onRetry={refetch} compact />
            ) : isLoading ? (
              <LoadingState message="Carregando famílias..." compact surface={false} />
            ) : filtered.length === 0 ? (
              <EmptyState message="Nenhuma família encontrada." />
            ) : (
              filtered.map((f) => (
                <PageListItem
                  key={f.id}
                  title={f.nome_representante}
                  subtitle={f.cpf ?? null}
                  onClick={() => onSelect(f)}
                  variant="compact"
                />
              ))
            )}
          </PageList>
        </PageStack>
      )}
    </SectionBlock>
  )
}

function ResultadoTranscricao({ resultado }) {
  const { transcricao_bruta, analise_estruturada } = resultado
  const { resumo_situacao, demandas_identificadas = [], encaminhamentos_sugeridos = [] } = analise_estruturada ?? {}

  return (
    <PageStack spacing={2}>
      {resumo_situacao && (
        <SectionBlock title="Resumo da situação" variant="plain">
          <Typography variant="body2" color="text.secondary" lineHeight={1.75}>
            {resumo_situacao}
          </Typography>
        </SectionBlock>
      )}

      {demandas_identificadas.length > 0 && (
        <SectionBlock title="Demandas identificadas" variant="plain">
          <PageStack spacing={1}>
            {demandas_identificadas.map((d, i) => (
              <PageCard key={i} surface="block">
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <WarningAmberOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled', mt: 0.25, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2">{d.demanda}</Typography>
                    <Stack direction="row" spacing={0.75} mt={0.75} flexWrap="wrap">
                      {d.area && <StatusChip label={d.area} />}
                      {d.urgencia && (
                        <Chip
                          label={`Urgência ${d.urgencia}`}
                          size="small"
                          color={URGENCIA_COLOR[d.urgencia?.toLowerCase()] ?? 'default'}
                          variant="outlined"
                        />
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </PageCard>
            ))}
          </PageStack>
        </SectionBlock>
      )}

      {encaminhamentos_sugeridos.length > 0 && (
        <SectionBlock title="Encaminhamentos sugeridos" variant="plain">
          <PageStack spacing={1}>
            {encaminhamentos_sugeridos.map((e, i) => (
              <PageCard key={i} surface="block">
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <AssignmentOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled', mt: 0.25, flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2">{e.acao}</Typography>
                    {e.responsavel && <Box mt={0.75}><StatusChip label={e.responsavel} /></Box>}
                  </Box>
                </Stack>
              </PageCard>
            ))}
          </PageStack>
        </SectionBlock>
      )}

      {transcricao_bruta && (
        <SectionBlock title="Transcrição bruta" variant="plain">
          <Box
            component="pre"
            sx={{
              fontFamily: 'inherit',
              fontSize: '0.8125rem',
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              m: 0, p: 2,
              borderRadius: 2,
              backgroundColor: 'grey.50',
              border: '1px solid',
              borderColor: 'divider',
              maxHeight: 300,
              overflowY: 'auto',
              color: 'text.secondary',
            }}
          >
            {transcricao_bruta}
          </Box>
        </SectionBlock>
      )}
    </PageStack>
  )
}

function TranscricaoAudioPage({ onBack }) {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [familiaSelected, setFamiliaSelected] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const [saveError, setSaveError] = useState(null)

  const applyFile = (selected) => {
    if (!selected) return
    setFile(selected)
    setResultado(null)
    setSaved(false)
    setError(null)
  }

  const handleFileChange = (e) => applyFile(e.target.files?.[0])

  const handleDragOver = (e) => { e.preventDefault(); if (!loading) setDragging(true) }
  const handleDragLeave = () => setDragging(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (!loading) applyFile(e.dataTransfer.files?.[0])
  }

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResultado(null)
    setSaved(false)
    try {
      const res = await processarEntrevista(file)
      setResultado(res)
    } catch (err) {
      if (err.type === 'quota') {
        setError('Limite de tokens do serviço de IA atingido. Entre em contato com o desenvolvedor para verificar a cota.')
      } else if (err.message?.includes('fala')) {
        setError('Não foi possível identificar fala no áudio. Verifique se o arquivo contém gravação de voz e tente novamente.')
      } else {
        setError('Não foi possível processar o áudio. Verifique o arquivo e tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSalvar = async () => {
    if (!resultado || !familiaSelected) return
    setSaving(true)
    setSaveError(null)
    try {
      const { analise_estruturada, arquivo, transcricao_bruta } = resultado
      await salvarTranscricao(familiaSelected.id, {
        arquivo,
        transcricao_bruta,
        resumo_situacao: analise_estruturada?.resumo_situacao ?? '',
        demandas_identificadas: analise_estruturada?.demandas_identificadas ?? [],
        encaminhamentos_sugeridos: analise_estruturada?.encaminhamentos_sugeridos ?? [],
      })
      setSaved(true)
    } catch {
      setSaveError('Não foi possível salvar a transcrição. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setResultado(null)
    setSaved(false)
    setError(null)
    setSaveError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const canSave = Boolean(resultado && familiaSelected && !saved)

  return (
    <PageWrapper maxWidth={1440} spacing={3}>
      <PageSection
        eyebrow="Áudio"
        title="Transcrição de Entrevista"
        description="Envie uma gravação em MP3 ou OGG para gerar a transcrição e análise automaticamente."
      />

      <PageToolbar justifyContent="flex-start">
        <ActionButton startIcon={<ArrowBackRoundedIcon />} onClick={onBack}>
          Voltar para visão geral
        </ActionButton>
      </PageToolbar>

      <PageStack spacing={2.5}>
        <BuscaFamilia familiaSelected={familiaSelected} onSelect={setFamiliaSelected} />

        <SectionBlock title="Arquivo de áudio" variant="plain">
          <input
            ref={inputRef}
            type="file"
            accept="audio/mpeg,audio/mp3,.mp3,audio/ogg,.ogg"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <PageCard
            surface="block"
            sx={{
              cursor: loading ? 'default' : 'pointer',
              borderStyle: dragging ? 'dashed' : 'solid',
              borderColor: dragging ? 'primary.main' : undefined,
              backgroundColor: dragging ? 'primary.50' : undefined,
              transition: 'border-color 0.15s, background-color 0.15s',
            }}
            onClick={() => !loading && inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 3 }}>
              {file ? (
                <GraphicEqOutlinedIcon sx={{ fontSize: 36, color: 'primary.main' }} />
              ) : (
                <UploadFileOutlinedIcon sx={{ fontSize: 36, color: 'text.disabled' }} />
              )}
              <Box textAlign="center">
                {file ? (
                  <>
                    <Typography variant="subtitle2" fontWeight={700}>{file.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(file.size / 1024 / 1024).toFixed(2)} MB — clique ou arraste para trocar
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">
                      Clique ou arraste um arquivo de áudio aqui
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      Arquivos .mp3 ou .ogg
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </PageCard>
        </SectionBlock>

        <PageToolbar justifyContent="flex-start">
          <ButtonLoading
            variant="contained"
            disabled={!file}
            loading={loading}
            loadingLabel="Processando áudio..."
            onClick={handleSubmit}
          >
            Processar entrevista
          </ButtonLoading>

          {(file || resultado) && !loading && (
            <ActionButton variant="outlined" onClick={handleReset}>
              Limpar
            </ActionButton>
          )}
        </PageToolbar>

        {error && (
          <ErrorState title="Erro ao processar" message={error} onRetry={handleSubmit} compact />
        )}

        {resultado && (
          <>
            <ResultadoTranscricao resultado={resultado} />

            {!familiaSelected && (
              <PageCard surface="block">
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <FamilyRestroomOutlinedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    Selecione uma família acima para salvar esta transcrição.
                  </Typography>
                </Stack>
              </PageCard>
            )}

            {saveError && (
              <ErrorState title="Erro ao salvar" message={saveError} onRetry={handleSalvar} compact />
            )}

            {saved ? (
              <PageCard surface="block">
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleOutlineRoundedIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  <Typography variant="body2" color="success.main" fontWeight={600}>
                    Transcrição salva com sucesso em {familiaSelected?.nome_representante}.
                  </Typography>
                </Stack>
              </PageCard>
            ) : (
              <PageToolbar justifyContent="flex-start">
                <ButtonLoading
                  variant="contained"
                  disabled={!canSave}
                  loading={saving}
                  loadingLabel="Salvando..."
                  onClick={handleSalvar}
                >
                  Salvar na família
                </ButtonLoading>
              </PageToolbar>
            )}
          </>
        )}
      </PageStack>
    </PageWrapper>
  )
}

export default TranscricaoAudioPage
