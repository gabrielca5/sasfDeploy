import { useMemo, useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import BlockRoundedIcon from '@mui/icons-material/BlockRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { listUsuarios, updateUsuario, updateStatusUsuario, deleteUsuario, listTecnicos } from '../services/usuarios.service'
import { listFamilias, updateFamilia } from '../services/familias.service'
import useFamiliaDetalhe from '../hooks/useFamiliaDetalhe'
import { ORIENTADOR_COLORS, getOrientadorColors } from '../utils/orientadorColors'
import {
  ActionButton,
  ActionCard,
  DetailItem,
  EmptyState,
  ErrorState,
  InfoGrid,
  LoadingState,
  PageCard,
  PageDialog,
  PageGrid,
  PageList,
  PageListItem,
  PageSection,
  PageStack,
  PageText,
  PageToolbar,
  PageWrapper,
  SectionBlock,
  StatusChip,
  ButtonLoading,
  InlineFeedback,
  ConfirmDialog,
} from './ui'

const cargoLabels = {
  ADMIN: 'Administrador',
  GESTOR: 'Gestor',
  TECNICO: 'Técnico',
  ORIENTADOR: 'Orientador',
}

const statusColors = {
  PENDENTE: 'warning',
  ATIVO: 'success',
  INATIVO: 'default',
  DELETADO: 'error',
}

const priorityChipProps = {
  Alta:  { customColor: '#FEE2E2', customTextColor: '#B91C1C' },
  Média: { customColor: '#FEF3C7', customTextColor: '#92400E' },
  Baixa: { customColor: '#D1FAE5', customTextColor: '#065F46' },
}

const PAGE_SIZE = 48

function getOrientadorInfo(u) {
  // O backend agora retorna o enum em 'cor'. Em alguns casos pode vir em 'corCodigo'.
  // Priorizamos o enum pois ele é a única fonte da verdade sincronizada.
  const corEnum = u?.cor || u?.corCodigo || u?.orientador?.cor || u?.orientador?.corCodigo
  const colors = getOrientadorColors(corEnum, u?.userId || u?.id || u?.nome || u?.email || u?.nome_representante)
  
  return { 
    id: u?.nome || u?.name || u?.orientador?.nome || 'Usuário', 
    backgroundColor: colors.backgroundColor, 
    color: colors.color,
    label: colors.label,
    enumKey: colors.enumKey,
    isFallback: colors.isFallback
  }
}

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${value}T00:00:00`))
}

function UserPreviewCard({ user, onClick }) {
  const info = getOrientadorInfo(user)
  const name = user.name || user.nome || user.email

  return (
    <PageCard
      title={name}
      subtitle={user.email}
      onClick={onClick}
      accentColor={info.backgroundColor}
      hover
      footer={
        <PageToolbar justifyContent="flex-start" spacing={1}>
          <StatusChip label={cargoLabels[user.cargo] || user.cargo} />
          <StatusChip label={user.status} tone={statusColors[user.status]} />
          {user.cargo === 'ORIENTADOR' && (
            <StatusChip label={info.label || info.id} customColor={info.backgroundColor} customTextColor={info.color} />
          )}
        </PageToolbar>
      }
    />
  )
}

function FamilyAdminCard({ family, onClick, onAction, isMutating }) {
  const info = getOrientadorInfo(family)
  const prioProps = priorityChipProps[family.prioridade] ?? {}
  
  return (
    <PageCard
      title={family.nome_representante}
      subtitle={family.cpf && family.cpf !== '—' ? `CPF: ${family.cpf}` : null}
      onClick={onClick}
      accentColor={info.backgroundColor}
      hover
      footer={
        <Box sx={{ 
          mx: -2, mb: -2, mt: -1.5,
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}>
          <PageStack spacing={1.5}>
            {/* Responsáveis e Metadados */}
            <PageStack spacing={0.75}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                  <PageText variant="caption" color="text.secondary" fontWeight={600}>Orientador:</PageText>
                  <StatusChip 
                    label={family.orientador?.nome || info.id} 
                    customColor={info.backgroundColor} 
                    customTextColor={info.color} 
                    size="small" 
                  />
                </Box>
                <PageText variant="caption" color="text.secondary">
                  Visita: {formatDate(family.ultima_visita)}
                </PageText>
              </Box>

              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <PageText variant="caption" color="text.secondary" fontWeight={600}>Técnico:</PageText>
                <PageText variant="caption" fontWeight={500}>{family.tecnico?.nome || 'Não atribuído'}</PageText>
              </Box>
            </PageStack>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              {family.ativo ? (
                <ButtonLoading 
                  size="small"
                  color="warning" 
                  variant="contained" 
                  startIcon={<BlockRoundedIcon sx={{ fontSize: '1rem !important' }} />} 
                  loading={isMutating} 
                  onClick={(e) => {
                    e.stopPropagation()
                    onAction('DESATIVAR', family)
                  }}
                  sx={{ borderRadius: 1.5, height: 28, fontSize: '0.75rem', py: 0, minWidth: 'fit-content' }}
                >
                  Desativar família
                </ButtonLoading>
              ) : (
                <ButtonLoading 
                  size="small"
                  color="success" 
                  variant="contained" 
                  startIcon={<CheckCircleRoundedIcon sx={{ fontSize: '1rem !important' }} />} 
                  loading={isMutating} 
                  onClick={(e) => {
                    e.stopPropagation()
                    onAction('ATIVAR', family)
                  }}
                  sx={{ borderRadius: 1.5, height: 28, fontSize: '0.75rem', py: 0, minWidth: 'fit-content' }}
                >
                  Ativar família
                </ButtonLoading>
              )}
            </Box>
          </PageStack>
        </Box>
      }
    >
      <PageToolbar justifyContent="flex-start">
        <StatusChip label={family.ativo ? 'Ativa' : 'Inativa'} tone={family.ativo ? 'success' : 'default'} />
        <StatusChip label={`Prioridade ${family.prioridade}`} {...prioProps} />
        {family.numero_matricula && family.numero_matricula !== '—' && (
          <StatusChip label={`Matrícula: ${family.numero_matricula}`} />
        )}
      </PageToolbar>
      <PageStack spacing={0.5}>
        <PageText variant="body2" color="text.secondary" noWrap>End: {family.endereco}</PageText>
        <PageText variant="body2" fontWeight={500} noWrap>Representante: {family.nome_representante}</PageText>
      </PageStack>
    </PageCard>
  )
}

function UserDetailPanel({ user, tecnicos = [], onAction, onUpdate, isMutating, onClose }) {
  const [formData, setFormData] = useState({
    cargo: user.cargo,
    cor: user.cor || '',
    tecnicoId: user.tecnicoId || (user.tecnico && user.tecnico.id) || (user.orientador && user.orientador.tecnico && user.orientador.tecnico.id) || '',
  })

  const info = getOrientadorInfo(user)
  const status = String(user.status || '').toUpperCase()
  const isPendente = status === 'PENDENTE' || status === 'PENDING'
  const isAtivo = status === 'ATIVO' || status === 'ACTIVE'
  const isDeletado = status === 'DELETADO' || status === 'DELETED'

  const hasChanges =
    formData.cargo !== user.cargo ||
    formData.cor !== (user.cor || '') ||
    formData.tecnicoId !== (user.tecnicoId || (user.tecnico && user.tecnico.id) || (user.orientador && user.orientador.tecnico && user.orientador.tecnico.id) || '')

  const handleSave = () => {
    onUpdate(formData)
  }

  return (
    <PageStack spacing={2.25}>
      <PageCard
        eyebrow="Usuário selecionado"
        title={user.name || user.email}
        subtitle={user.email}
        actions={
          <PageToolbar justifyContent="flex-end">
            <StatusChip label={user.status} tone={statusColors[status] || 'default'} />
            <StatusChip label={cargoLabels[user.cargo] || user.cargo} />
            <StatusChip label={info.label || info.id} customColor={info.backgroundColor} customTextColor={info.color} />
          </PageToolbar>
        }
      />

      <PageGrid variant="detail2">
        <DetailItem label="Data de inclusão" value={user.dataDeInclusao ? formatDate(user.dataDeInclusao) : '—'} variant="soft" icon={<AddRoundedIcon />} />
        <DetailItem label="Último acesso" value={user.ultimaAtualizacao ? formatDate(user.ultimaAtualizacao) : '—'} variant="soft" icon={<HistoryRoundedIcon />} />
      </PageGrid>

      <SectionBlock title="Dados de identificação" variant="plain">
        <InfoGrid detailVariant="plain" items={[
          ['Nome completo', user.name || '—'],
          ['Endereço de email', user.email || '—'],
          ['CPF', user.cpf || '—'],
          ['Telefone', user.telefone || '—'],
          ['Endereço', user.endereco || '—'],
          ['Status atual', user.status || '—'],
        ]} />
      </SectionBlock>

      <SectionBlock title="Configurações de cargo e perfil" variant="plain">
        <PageGrid variant="detail2">
          <FormControl fullWidth>
            <InputLabel>Cargo no sistema</InputLabel>
            <Select
              value={formData.cargo}
              label="Cargo no sistema"
              size="small"
              onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
            >
              {Object.entries(cargoLabels).map(([val, label]) => (
                <MenuItem key={val} value={val}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.cargo === 'ORIENTADOR' && (
            <>
              <FormControl fullWidth>
                <InputLabel>Cor do Orientador</InputLabel>
                <Select
                  value={formData.cor}
                  label="Cor do Orientador"
                  size="small"
                  onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                  renderValue={(selected) => {
                    if (!selected) return <em>Selecione uma cor</em>
                    const p = ORIENTADOR_COLORS[selected]
                    if (!p) return selected
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: p.backgroundColor, border: '1px solid divider' }} />
                        {p.label}
                      </Box>
                    )
                  }}
                >
                  {Object.entries(ORIENTADOR_COLORS).map(([key, p]) => (
                    <MenuItem key={key} value={key}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: p.backgroundColor, border: '1px solid divider' }} />
                        {p.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Técnico Responsável</InputLabel>
                <Select
                  value={formData.tecnicoId}
                  label="Técnico Responsável"
                  size="small"
                  onChange={(e) => setFormData({ ...formData, tecnicoId: e.target.value })}
                >
                  <MenuItem value=""><em>Nenhum</em></MenuItem>
                  {tecnicos.map((t) => (
                    <MenuItem key={t.id || t.userId} value={t.id || t.userId}>
                      {t.name || t.nome || t.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </PageGrid>

        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Lado Esquerdo: Voltar e Salvar */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <ActionButton onClick={onClose} variant="outlined">Voltar</ActionButton>
            <ButtonLoading
              variant="contained"
              color="primary"
              disabled={!hasChanges}
              loading={isMutating}
              onClick={handleSave}
            >
              Salvar Alterações
            </ButtonLoading>
          </Box>

          {/* Lado Direito: Deletar e Desativar/Ativar */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {!isPendente && !isDeletado && (
              <ButtonLoading 
                color="error" 
                variant="outlined"
                startIcon={<DeleteRoundedIcon />} 
                loading={isMutating} 
                onClick={() => onAction('DELETAR')}
              >
                Deletar conta
              </ButtonLoading>
            )}

            {isPendente ? (
              <>
                <ButtonLoading color="error" variant="outlined" startIcon={<CancelRoundedIcon />} loading={isMutating} onClick={() => onAction('REJEITAR')}>
                  Rejeitar
                </ButtonLoading>
                <ButtonLoading color="success" variant="contained" startIcon={<CheckCircleRoundedIcon />} loading={isMutating} onClick={() => onAction('ACEITAR')}>
                  Aceitar
                </ButtonLoading>
              </>
            ) : !isDeletado && (
              isAtivo ? (
                <ButtonLoading color="warning" variant="contained" startIcon={<BlockRoundedIcon />} loading={isMutating} onClick={() => onAction('DESATIVAR')}>
                  Desativar acesso
                </ButtonLoading>
              ) : (
                <ButtonLoading color="success" variant="contained" startIcon={<CheckCircleRoundedIcon />} loading={isMutating} onClick={() => onAction('ATIVAR')}>
                  Ativar acesso
                </ButtonLoading>
              )
            )}
          </Box>
        </Box>
      </SectionBlock>
    </PageStack>
  )
}


function FamilyAdminDetailPanel({ family, onAction, isMutating, onClose }) {
  const { data: detalhe, isLoading: loadingDetalhe } = useFamiliaDetalhe(family?.prontuarioId)
  const rep = detalhe?.representante
  const end = detalhe?.endereco
  const fc = detalhe?.fichaCadastral
  const pdf = detalhe?.planoFamiliar
  const folha = detalhe?.folhaProsseguimento
  const pdu = detalhe?.pdu
  const termos = detalhe?.termos
  const prioProps = priorityChipProps[family.prioridade] ?? {}
  const orientador = getOrientadorInfo(family)

  const moradiaLabel = { PROPRIA: 'Própria', ALUGADA: 'Alugada', CEDIDA: 'Cedida' }
  const sexoLabel = { FEMININO: 'Feminino', MASCULINO: 'Masculino' }
  const programaLabel = {
    NAO_RECEBE: 'Não recebe', RENDA_MINIMA: 'Renda Mínima', BOLSA_FAMILIA: 'Bolsa Família',
    RENDA_CIDADA: 'Renda Cidadã', ACAO_JOVEM: 'Ação Jovem', PETI: 'PETI',
  }
  const bpcLabel = { NAO_RECEBE: 'Não recebe', IDOSO: 'Idoso', PESSOA_COM_DEFICIENCIA: 'Pessoa com deficiência' }
  const label = (map, val) => map[val] ?? val

  return (
    <PageStack spacing={2.25}>
      <PageCard
        eyebrow="Família em modo administrativo"
        title={family.nome_representante}
        subtitle={family.endereco !== '—' ? family.endereco : null}
        actions={
          <PageToolbar justifyContent="flex-end">
            {loadingDetalhe && <LoadingState message="Carregando..." compact surface={false} />}
            <StatusChip label={family.ativo ? 'Cadastro Ativo' : 'Cadastro Inativo'} tone={family.ativo ? 'success' : 'default'} />
            <StatusChip label={`Prioridade ${family.prioridade}`} {...prioProps} />
            <StatusChip label={orientador.label || orientador.id} customColor={orientador.backgroundColor} customTextColor={orientador.color} />
          </PageToolbar>
        }
      />

      <PageGrid variant="detail2">
        <DetailItem label="Última visita" value={formatDate(family.ultima_visita)} variant="soft" />
        <DetailItem label="Próxima visita" value={formatDate(family.proxima_visita)} variant="soft" />
      </PageGrid>

      {rep && (
        <SectionBlock title="Dados do representante" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            rep.nome        && ['Nome', rep.nome],
            rep.cpf         && ['CPF', rep.cpf],
            rep.rg          && ['RG', `${rep.rg}${rep.orgaoEmissorRg ? ` / ${rep.orgaoEmissorRg}` : ''}`],
            rep.dataNascimento && ['Nascimento', rep.dataNascimento],
            rep.sexo        && ['Sexo', sexoLabel[rep.sexo] ?? rep.sexo],
            rep.estadoCivil && ['Estado civil', rep.estadoCivil],
            rep.grauInstrucao && ['Grau de instrução', rep.grauInstrucao],
            rep.profissao   && ['Profissão', rep.profissao],
            rep.ocupacao    && ['Situação', rep.ocupacao],
            rep.renda != null && ['Renda', `R$ ${rep.renda}`],
            rep.nisNitNb    && ['NIS/NIT/NB', rep.nisNitNb],
            rep.nomeMae     && ['Mãe', rep.nomeMae],
            rep.nomePai     && ['Pai', rep.nomePai],
            rep.telefoneCelular && ['Celular', rep.telefoneCelular],
            rep.telefoneResidencial && ['Telefone', rep.telefoneResidencial],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {end && (end.logradouro || end.bairro) && (
        <SectionBlock title="Endereço" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            end.logradouro && ['Logradouro', `${end.logradouro}${end.numero ? `, ${end.numero}` : ''}`],
            end.complemento && ['Complemento', end.complemento],
            end.bairro      && ['Bairro', end.bairro],
            end.distrito    && ['Distrito', end.distrito],
            end.cep         && ['CEP', end.cep],
            end.cidade      && ['Cidade', end.cidade],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {fc && (
        <SectionBlock title="Ficha cadastral" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            fc.dataMatricula     && ['Data de matrícula', fc.dataMatricula],
            fc.numeroMatricula   && ['Nº matrícula', fc.numeroMatricula],
            fc.condicoesMoradia  && ['Moradia', moradiaLabel[fc.condicoesMoradia] ?? fc.condicoesMoradia],
            fc.tipoConstrucao    && ['Construção', fc.tipoConstrucao],
            fc.numeroComodos != null && ['Cômodos', String(fc.numeroComodos)],
            fc.situacaoHabitacional && ['Situação hab.', fc.situacaoHabitacional],
            fc.programasTransferenciaRenda?.length > 0 && ['Transf. renda', fc.programasTransferenciaRenda.map(v => label(programaLabel, v)).join(', ')],
            fc.beneficioPrestacaoContinuada?.length > 0 && ['BPC', fc.beneficioPrestacaoContinuada.map(v => label(bpcLabel, v)).join(', ')],
            fc.demandaApresentadaOrientacoesEncaminhamentos && ['Demanda/encaminhamentos', fc.demandaApresentadaOrientacoesEncaminhamentos],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {pdf && (
        <SectionBlock title="Plano de desenvolvimento familiar" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            pdf.numeroPlano        && ['Nº do plano', pdf.numeroPlano],
            pdf.dataElaboracao     && ['Elaboração', pdf.dataElaboracao],
            pdf.dataValidade       && ['Validade', pdf.dataValidade],
            pdf.dataReavaliacao    && ['Reavaliação', pdf.dataReavaliacao],
            pdf.objetivo           && ['Objetivo', pdf.objetivo],
            pdf.analiseDiagnostica && ['Análise diagnóstica', pdf.analiseDiagnostica],
            pdf.moradia            && ['Moradia', pdf.moradia],
            pdf.saude              && ['Saúde', pdf.saude],
            pdf.educacao           && ['Educação', pdf.educacao],
            pdf.renda              && ['Renda', pdf.renda],
            pdf.observacoes        && ['Observações', pdf.observacoes],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {folha && (
        <SectionBlock title="Folha de prosseguimento" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            folha.numeroFolha  && ['Nº da folha', String(folha.numeroFolha)],
            folha.observacoes  && ['Observações', folha.observacoes],
          ].filter(Boolean)} />
        </SectionBlock>
      )}

      {pdu && (
        <SectionBlock title="Plano de desenvolvimento do usuário (PDU)" variant="plain">
          <InfoGrid detailVariant="plain" items={[
            pdu.numeroPlano               && ['Nº do plano', pdu.numeroPlano],
            pdu.dataElaboracao            && ['Elaboração', pdu.dataElaboracao],
            pdu.dataValidade              && ['Validade', pdu.dataValidade],
            pdu.sinteseSituacaoApresentada && ['Síntese', pdu.sinteseSituacaoApresentada],
            pdu.situacoesAgravoIdentificadas?.length > 0 && ['Situações de agravo', pdu.situacoesAgravoIdentificadas.join(', ')],
            pdu.outrasSituacoesAgravo     && ['Outras situações', pdu.outrasSituacoesAgravo],
          ].filter(Boolean)} />
        </SectionBlock>
      )}


      {family.composicao_familiar?.length > 0 && (
        <SectionBlock title="Composição familiar" variant="plain">
          <PageList variant="embedded">
            {family.composicao_familiar.map((member) => {
              const orientadorMembro = getOrientadorColors(null, `${family.id}-${member.nome}`)
              return (
                <PageListItem
                  key={`${family.id}-${member.nome}`}
                  title={member.nome}
                  subtitle={`${member.parentesco} • ${member.idade !== '—' ? `${member.idade} anos` : 'idade não informada'}`}
                  variant="compact"
                  footer={
                    <PageToolbar justifyContent="flex-start">
                      <StatusChip label={orientadorMembro.label} customColor={orientadorMembro.backgroundColor} customTextColor={orientadorMembro.color} />
                      <StatusChip label={`Renda ${member.renda === '—' ? 'não informada' : `R$ ${member.renda}`}`} />
                      {member.fator && member.fator !== '—' && <StatusChip label={member.fator} />}
                    </PageToolbar>
                  }
                />
              )
            })}
          </PageList>
        </SectionBlock>
      )}

      <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <ActionButton onClick={onClose} variant="outlined">Voltar</ActionButton>
        </Box>
      <PageText variant="caption" color="text.secondary">
        Nota: Alterações nos dados cadastrais devem ser feitas através do fluxo de "Atualização de Ficha" na aba de Famílias.
      </PageText>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {family.ativo ? (
            <ButtonLoading 
              color="warning" 
              variant="contained" 
              startIcon={<BlockRoundedIcon />} 
              loading={isMutating} 
              onClick={() => onAction('DESATIVAR')}
            >
              Desativar família
            </ButtonLoading>
          ) : (
            <ButtonLoading 
              color="success" 
              variant="contained" 
              startIcon={<CheckCircleRoundedIcon />} 
              loading={isMutating} 
              onClick={() => onAction('ATIVAR')}
            >
              Ativar família
            </ButtonLoading>
          )}
        </Box>
      </Box>
      
    </PageStack>
  )
}

function GestorUsuariosPage() {
  const queryClient = useQueryClient()
  const [mainTab, setMainTab] = useState(0) // 0: Usuários, 1: Famílias
  const [userStatusTab, setUserStatusTab] = useState('ATIVO')
  const [familyStatusTab, setFamilyStatusTab] = useState('ATIVA')
  const [userQuery, setUserQuery] = useState('')
  const [familyQuery, setFamilyQuery] = useState('')
  const [userPage, setUserPage] = useState(1)
  const [familyPage, setFamilyPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedFamily, setSelectedFamily] = useState(null)
  const [confirmConfig, setConfirmConfig] = useState({
    open: false,
    title: '',
    message: '',
    confirmLabel: 'Confirmar',
    confirmColor: 'primary',
    onConfirm: null,
  })

  const { data: users = [], isLoading: loadingUsers, isError: errorUsers, refetch: refetchUsers } = useQuery({
    queryKey: ['usuarios'],
    queryFn: listUsuarios,
  })

  const { data: tecnicos = [], isLoading: loadingTecnicos } = useQuery({
    queryKey: ['tecnicos'],
    queryFn: listTecnicos,
  })

  const { data: families = [], isLoading: loadingFamilies, isError: errorFamilies, refetch: refetchFamilies } = useQuery({
    queryKey: ['familias-admin'],
    queryFn: () => listFamilias({ size: 2000 }),
  })

  const mutationUpdateUser = useMutation({
    mutationFn: ({ id, payload, currentUser }) => updateUsuario(id, payload, currentUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      queryClient.invalidateQueries({ queryKey: ['familias-admin'] })
      setSelectedUser(null)
    },
  })

  const mutationUpdateUserStatus = useMutation({
    mutationFn: ({ id, status, user }) => updateStatusUsuario(id, status, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      setSelectedUser(null)
    },
    onError: (err) => {
      window.alert(`Erro ao atualizar status: ${err.message}`)
    }
  })

  const mutationDeleteUser = useMutation({
    mutationFn: ({ id, user }) => deleteUsuario(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      setSelectedUser(null)
    },
    onError: (err) => {
      window.alert(`Erro ao deletar usuário: ${err.message}`)
    }
  })

  const mutationUpdateFamily = useMutation({
    mutationFn: ({ id, payload }) => updateFamilia(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['familias-admin'] })
      setSelectedFamily(null)
    },
    onError: (err) => {
      window.alert(`Erro ao atualizar família: ${err.message}`)
    }
  })

  const isMutatingUser = mutationUpdateUserStatus.isLoading || mutationDeleteUser.isLoading || mutationUpdateUser.isLoading
  const isMutatingFamily = mutationUpdateFamily.isLoading

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const status = String(u.status || '').toUpperCase()
      const target = userStatusTab.toUpperCase()
      
      let matchesTab = false

      if (target === 'ATIVO') {
        matchesTab = status === 'ATIVO' || (status === '' && u.ativo === true)
      } else if (target === 'INATIVO') {
        matchesTab = status === 'INATIVO' || status === 'DELETADO'
      } else if (target === 'PENDENTE') {
        matchesTab = status === 'PENDENTE'
      }

      const name = (u.name || u.nome || '').toLowerCase()
      const email = (u.email || '').toLowerCase()
      const search = userQuery.toLowerCase()
      
      return matchesTab && (name.includes(search) || email.includes(search))
    })
  }, [users, userStatusTab, userQuery])

  const filteredFamilies = useMemo(() => {
    return families.filter((f) => {
      const matchesStatus = familyStatusTab === 'ATIVA' ? f.ativo : !f.ativo
      const matchesQuery = (f.nome_representante || '').toLowerCase().includes(familyQuery.toLowerCase()) ||
                           (f.numero_matricula || '').toLowerCase().includes(familyQuery.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [families, familyStatusTab, familyQuery])

  const totalUserPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const currentUserPage = Math.min(userPage, totalUserPages)
  const paginatedUsers = filteredUsers.slice((currentUserPage - 1) * PAGE_SIZE, currentUserPage * PAGE_SIZE)

  const totalFamilyPages = Math.max(1, Math.ceil(filteredFamilies.length / PAGE_SIZE))
  const currentFamilyPage = Math.min(familyPage, totalFamilyPages)
  const paginatedFamilies = filteredFamilies.slice((currentFamilyPage - 1) * PAGE_SIZE, currentFamilyPage * PAGE_SIZE)

  const handleUserAction = (action) => {
    if (!selectedUser) return
    const id = selectedUser.id || selectedUser.userId
    if (!id) return

    if (action === 'ACEITAR' || action === 'ATIVAR') {
      mutationUpdateUserStatus.mutate({ id, status: 'ATIVO', user: selectedUser })
    } else if (action === 'REJEITAR' || action === 'DESATIVAR') {
      setConfirmConfig({
        open: true,
        title: 'Desativar acesso',
        message: `Deseja realmente desativar o acesso de ${selectedUser.name || selectedUser.nome}? O usuário será movido para a aba de Inativos.`,
        confirmLabel: 'Desativar',
        confirmColor: 'warning',
        onConfirm: () => mutationUpdateUserStatus.mutate({ id, status: 'INATIVO', user: selectedUser })
      })
    } else if (action === 'DELETAR') {
      setConfirmConfig({
        open: true,
        title: 'Deletar conta',
        message: `Esta ação é irreversível. Deseja realmente deletar a conta de ${selectedUser.name || selectedUser.nome}?`,
        confirmLabel: 'Deletar',
        confirmColor: 'error',
        onConfirm: () => mutationDeleteUser.mutate({ id, user: selectedUser })
      })
    }
  }

  const handleFamilyAction = (action, quickFamily) => {
    const family = quickFamily || selectedFamily
    if (!family) return
    const id = family.id
    if (action === 'ATIVAR') {
      mutationUpdateFamily.mutate({ id, payload: { ativo: true } })
    } else if (action === 'DESATIVAR') {
      setConfirmConfig({
        open: true,
        title: 'Desativar família',
        message: `Deseja interromper o acompanhamento da família de ${family.nome_representante}?`,
        confirmLabel: 'Desativar',
        confirmColor: 'warning',
        onConfirm: () => mutationUpdateFamily.mutate({ id, payload: { ativo: false } })
      })
    }
  }

  return (
    <PageWrapper maxWidth={1200} spacing={3}>
      <ConfirmDialog
        open={confirmConfig.open}
        onClose={() => setConfirmConfig({ ...confirmConfig, open: false })}
        onConfirm={() => {
          confirmConfig.onConfirm?.()
          setConfirmConfig({ ...confirmConfig, open: false })
        }}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmLabel={confirmConfig.confirmLabel}
        confirmColor={confirmConfig.confirmColor}
      />
      <PageSection
        eyebrow="Administração"
        title="Gestão de Acesso"
        description="Gerencie usuários do sistema e controle o status das famílias acompanhadas."
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={mainTab} onChange={(_, v) => { setMainTab(v); setUserPage(1); setFamilyPage(1) }}>
          <Tab icon={<PersonRoundedIcon />} label="Usuários" iconPosition="start" />
          <Tab icon={<GroupRoundedIcon />} label="Famílias" iconPosition="start" />
        </Tabs>
      </Box>

      {mainTab === 0 && (
        <PageStack spacing={3}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={userStatusTab} onChange={(_, v) => { setUserStatusTab(v); setUserPage(1) }} textColor="secondary" indicatorColor="secondary">
              <Tab label="Ativos" value="ATIVO" />  
              <Tab label="Pendentes" value="PENDENTE" />
              <Tab label="Inativos" value="INATIVO" />
            </Tabs>
          </Box>
          <TextField
            fullWidth
            placeholder="Buscar usuário por nome ou email..."
            value={userQuery}
            onChange={(e) => { setUserQuery(e.target.value); setUserPage(1) }}
            InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
          />
          {errorUsers ? <ErrorState title="Erro ao carregar usuários" onRetry={refetchUsers} /> :
           loadingUsers ? <LoadingState message="Carregando usuários..." skeleton rows={3} /> :
           <PageList
             actions={
               <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                   <PageText variant="subtitle2" color="primary" fontWeight={800}>
                     Usuários encontrados
                   </PageText>
                   {!loadingUsers && <StatusChip label={`${filteredUsers.length}`} />}
                   {filteredUsers.length > PAGE_SIZE && (
                     <PageText variant="caption">
                       Página {currentUserPage} de {totalUserPages}
                     </PageText>
                   )}
                 </Box>
               </Box>
             }
           >
             {filteredUsers.length === 0 ? <EmptyState message="Nenhum usuário encontrado." /> :
              <PageGrid variant="gallery">
                {paginatedUsers.map((u) => <UserPreviewCard key={u.userId || u.id} user={u} onClick={() => setSelectedUser(u)} />)}
              </PageGrid>}

             {!loadingUsers && !errorUsers && filteredUsers.length > PAGE_SIZE && (
               <Box
                 sx={{
                   display: 'grid',
                   gridTemplateColumns: '1fr auto 1fr',
                   alignItems: 'center',
                   gap: 1,
                   width: '100%',
                   mt: 2,
                 }}
               >
                 <Box sx={{ justifySelf: 'start' }}>
                   <ActionButton
                     startIcon={<ChevronLeftRoundedIcon />}
                     disabled={currentUserPage === 1}
                     onClick={() => setUserPage((value) => Math.max(1, value - 1))}
                   >
                     Anterior
                   </ActionButton>
                 </Box>
                 <PageToolbar direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                   {Array.from({ length: totalUserPages }, (_, index) => {
                     const pageNumber = index + 1
                     return (
                       <ActionButton
                         key={pageNumber}
                         variant={pageNumber === currentUserPage ? 'contained' : 'outlined'}
                         onClick={() => setUserPage(pageNumber)}
                         sx={{ minWidth: 36, px: 1 }}
                       >
                         {pageNumber}
                       </ActionButton>
                     )
                   })}
                 </PageToolbar>
                 <Box sx={{ justifySelf: 'end' }}>
                   <ActionButton
                     endIcon={<ChevronRightRoundedIcon />}
                     disabled={currentUserPage === totalUserPages}
                     onClick={() => setUserPage((value) => Math.min(totalUserPages, value + 1))}
                   >
                     Próxima
                   </ActionButton>
                 </Box>
               </Box>
             )}
           </PageList>}
        </PageStack>
      )}

      {mainTab === 1 && (
        <PageStack spacing={3}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={familyStatusTab} onChange={(_, v) => { setFamilyStatusTab(v); setFamilyPage(1) }} textColor="secondary" indicatorColor="secondary">
              <Tab label="Ativas" value="ATIVA" />
              <Tab label="Inativas" value="INATIVA" />
            </Tabs>
          </Box>
          <TextField
            fullWidth
            placeholder="Buscar família por representante ou matrícula..."
            value={familyQuery}
            onChange={(e) => { setFamilyQuery(e.target.value); setFamilyPage(1) }}
            InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
          />
          {errorFamilies ? <ErrorState title="Erro ao carregar famílias" onRetry={refetchFamilies} /> :
           loadingFamilies ? <LoadingState message="Carregando famílias..." skeleton rows={3} /> :
           <PageList
             actions={
               <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                   <PageText variant="subtitle2" color="primary" fontWeight={800}>
                     Famílias encontradas
                   </PageText>
                   {!loadingFamilies && <StatusChip label={`${filteredFamilies.length}`} />}
                   {filteredFamilies.length > PAGE_SIZE && (
                     <PageText variant="caption">
                       Página {currentFamilyPage} de {totalFamilyPages}
                     </PageText>
                   )}
                 </Box>
               </Box>
             }
           >
             {filteredFamilies.length === 0 ? <EmptyState message="Nenhuma família encontrada." /> :
              <PageGrid variant="gallery">
                {paginatedFamilies.map((f) => (
                  <FamilyAdminCard 
                    key={f.id} 
                    family={f} 
                    onClick={() => setSelectedFamily(f)} 
                    onAction={handleFamilyAction}
                    isMutating={isMutatingFamily}
                  />
                ))}
              </PageGrid>}

             {!loadingFamilies && !errorFamilies && filteredFamilies.length > PAGE_SIZE && (
               <Box
                 sx={{
                   display: 'grid',
                   gridTemplateColumns: '1fr auto 1fr',
                   alignItems: 'center',
                   gap: 1,
                   width: '100%',
                   mt: 2,
                 }}
               >
                 <Box sx={{ justifySelf: 'start' }}>
                   <ActionButton
                     startIcon={<ChevronLeftRoundedIcon />}
                     disabled={currentFamilyPage === 1}
                     onClick={() => setFamilyPage((value) => Math.max(1, value - 1))}
                   >
                     Anterior
                   </ActionButton>
                 </Box>
                 <PageToolbar direction="row" spacing={0.5} justifyContent="center" alignItems="center">
                   {Array.from({ length: totalFamilyPages }, (_, index) => {
                     const pageNumber = index + 1
                     return (
                       <ActionButton
                         key={pageNumber}
                         variant={pageNumber === currentFamilyPage ? 'contained' : 'outlined'}
                         onClick={() => setFamilyPage(pageNumber)}
                         sx={{ minWidth: 36, px: 1 }}
                       >
                         {pageNumber}
                       </ActionButton>
                     )
                   })}
                 </PageToolbar>
                 <Box sx={{ justifySelf: 'end' }}>
                   <ActionButton
                     endIcon={<ChevronRightRoundedIcon />}
                     disabled={currentFamilyPage === totalFamilyPages}
                     onClick={() => setFamilyPage((value) => Math.min(totalFamilyPages, value + 1))}
                   >
                     Próxima
                   </ActionButton>
                 </Box>
               </Box>
             )}
           </PageList>}
        </PageStack>
      )}

      <PageDialog
        open={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        title="Gestão de Usuário"
        maxWidth="md"
        showClose
      >
        {selectedUser && (
          <UserDetailPanel
            user={selectedUser}
            tecnicos={tecnicos}
            onAction={handleUserAction}
            onClose={() => setSelectedUser(null)}
            onUpdate={(payload) => mutationUpdateUser.mutate({ 
              id: selectedUser.id || selectedUser.userId, 
              payload, 
              currentUser: selectedUser 
            })}
            isMutating={isMutatingUser}
          />
        )}
      </PageDialog>

      <PageDialog
        open={Boolean(selectedFamily)}
        onClose={() => setSelectedFamily(null)}
        title="Gestão de Família"
        maxWidth="lg"
        showClose
      >
        {selectedFamily && (
          <FamilyAdminDetailPanel
            family={selectedFamily}
            onAction={handleFamilyAction}
            onClose={() => setSelectedFamily(null)}
            isMutating={isMutatingFamily}
          />
        )}
      </PageDialog>
    </PageWrapper>
  )
}

export default GestorUsuariosPage
