import { useMemo, useState } from 'react'
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import IconButton from '@mui/material/IconButton'

const families = [
  {
    id: 'fam-001',
    nome_servico_sasf: 'SASF Central Heliópolis',
    cas: 'CAS Ipiranga',
    cras: 'CRAS Heliópolis',
    fl: '1/2',
    nome_representante: 'Mariana Souza Pereira',
    sexo: 'F',
    data_matricula: '14/02/2024',
    numero_matricula: '2024.0187',
    data_desligamento: '',
    nis_nit_nb: '123.45678.90-1',
    data_nascimento: '21/09/1987',
    naturalidade: 'São Paulo / SP',
    cor_raca: 'Parda',
    pessoa_deficiencia: 'Não',
    cpf: '123.456.789-00',
    rg: '45.678.901-2',
    orgao_emissor: 'SSP/SP',
    uf: 'SP',
    ctps_numero: '789654',
    ctps_serie: '012',
    ctps_emissao: '18/03/2021',
    mae: 'Lucia Souza',
    pai: 'Carlos Pereira',
    estado_civil: 'Casada',
    grau_instrucao: 'Ensino Médio Completo',
    profissao: 'Auxiliar administrativa',
    ocupacao_descricao: 'Atua em comércio local',
    ocupacao_situacao: 'Empregada',
    renda: '2.380,00',
    endereco: 'Rua das Flores',
    numero: '124',
    complemento: 'Apto 12',
    cep: '04212-300',
    bairro: 'Heliópolis',
    distrito: 'Ipiranga',
    telefone_residencial: '(11) 3333-1122',
    telefone_celular: '(11) 98888-2233',
    telefone_outro: '(11) 97777-4455',
    ponto_referencia: 'Próximo à praça central',
    condicao_moradia: 'Própria',
    numero_comodos: '5',
    valor_aluguel_financiamento: '0,00',
    tipo_construcao: 'Alvenaria',
    situacao_habitacional: ['Loteamento irregular'],
    programa_transferencia_renda: ['Bolsa Família'],
    programa_outro: 'Não informado',
    beneficio_prestacao_continuada: ['Não recebe'],
    composicao_familiar: [
      { nome: 'Mariana Souza Pereira', parentesco: 'Responsável', idade: '37', renda: '2.380,00', fator: '—' },
      { nome: 'Thiago Pereira', parentesco: 'Cônjuge', idade: '39', renda: '1.800,00', fator: '6 - Desemprego' },
      { nome: 'Ana Clara Pereira', parentesco: 'Filha', idade: '11', renda: '—', fator: '11 - Trabalho infantil' },
    ],
    resumo: 'Família acompanhada com renda formalizada e necessidade de reforço em acompanhamento escolar.',
    ultima_atualizacao: '2026-05-12',
    status: 'Acompanhamento',
    prioridade: 'Média',
    tags: ['Bolsa Família', 'Moradia própria', '1 adolescente', 'Renda formal'],
    escola: 'EMEF Raul Pompéia',
    saude: 'Vacinas atualizadas; sem gestantes no momento',
    vulnerabilidade: 'Risco escolar e sobrecarga de cuidado',
  },
  {
    id: 'fam-002',
    nome_servico_sasf: 'SASF Vila Prudente',
    cas: 'CAS Vila Prudente',
    cras: 'CRAS Vila Prudente',
    fl: '1/2',
    nome_representante: 'José Antônio Lima',
    sexo: 'M',
    data_matricula: '06/08/2023',
    numero_matricula: '2023.0094',
    data_desligamento: '',
    nis_nit_nb: '234.56789.01-2',
    data_nascimento: '03/05/1971',
    naturalidade: 'Ceará / CE',
    cor_raca: 'Preta',
    pessoa_deficiencia: 'Não',
    cpf: '234.567.890-11',
    rg: '23.456.789-0',
    orgao_emissor: 'SSP/SP',
    uf: 'SP',
    ctps_numero: '456123',
    ctps_serie: '018',
    ctps_emissao: '01/10/2019',
    mae: 'Maria de Lourdes Lima',
    pai: 'João Batista Lima',
    estado_civil: 'Separado',
    grau_instrucao: 'Ensino Fundamental Incompleto',
    profissao: 'Pedreiro',
    ocupacao_descricao: 'Bicos e serviços avulsos',
    ocupacao_situacao: 'Desempregado',
    renda: '980,00',
    endereco: 'Travessa Beira Rio',
    numero: '15',
    complemento: 'Casa 2',
    cep: '03111-100',
    bairro: 'Vila Prudente',
    distrito: 'Vila Prudente',
    telefone_residencial: '',
    telefone_celular: '(11) 96666-7788',
    telefone_outro: '',
    ponto_referencia: 'Próximo ao campo de futebol',
    condicao_moradia: 'Cedida',
    numero_comodos: '3',
    valor_aluguel_financiamento: '0,00',
    tipo_construcao: 'Mista',
    situacao_habitacional: ['Cortiço', 'Favela'],
    programa_transferencia_renda: ['Renda Cidadã'],
    programa_outro: 'Cesta básica municipal',
    beneficio_prestacao_continuada: ['Não recebe'],
    composicao_familiar: [
      { nome: 'José Antônio Lima', parentesco: 'Responsável', idade: '54', renda: '980,00', fator: '6 - Desemprego' },
      { nome: 'Rita Lima', parentesco: 'Filha', idade: '16', renda: '—', fator: '13 - Medida Socioeducativa' },
      { nome: 'Pedro Lima', parentesco: 'Filho', idade: '9', renda: '—', fator: '11 - Trabalho infantil' },
    ],
    resumo: 'Família em situação de maior vulnerabilidade, com moradia cedida e rede de proteção acionada.',
    ultima_atualizacao: '2026-05-19',
    status: 'Prioritária',
    prioridade: 'Alta',
    tags: ['Moradia cedida', 'Renda baixa', '2 dependentes', 'Acompanhamento intensivo'],
    escola: 'EMEF Vila Prudente',
    saude: 'Vacinação em atualização; gestante em pré-natal',
    vulnerabilidade: 'Insegurança habitacional e renda instável',
  },
  {
    id: 'fam-003',
    nome_servico_sasf: 'SASF Sacomã',
    cas: 'CAS Ipiranga',
    cras: 'CRAS Sacomã',
    fl: '1/2',
    nome_representante: 'Fernanda Oliveira Santos',
    sexo: 'F',
    data_matricula: '27/01/2025',
    numero_matricula: '2025.0041',
    data_desligamento: '',
    nis_nit_nb: '345.67890.12-3',
    data_nascimento: '14/11/1990',
    naturalidade: 'Bahia / BA',
    cor_raca: 'Branca',
    pessoa_deficiencia: 'Sim',
    cpf: '345.678.901-22',
    rg: '56.789.012-3',
    orgao_emissor: 'SSP/SP',
    uf: 'SP',
    ctps_numero: '112233',
    ctps_serie: '008',
    ctps_emissao: '12/07/2022',
    mae: 'Nádia Oliveira',
    pai: 'Paulo Santos',
    estado_civil: 'Casada',
    grau_instrucao: 'Ensino Superior Incompleto',
    profissao: 'Cuidadora',
    ocupacao_descricao: 'Cuidadora informal em domicílio',
    ocupacao_situacao: 'Empregada',
    renda: '1.950,00',
    endereco: 'Rua Santa Cruz',
    numero: '880',
    complemento: 'Bloco B',
    cep: '04113-002',
    bairro: 'Sacomã',
    distrito: 'Sacomã',
    telefone_residencial: '(11) 2222-6655',
    telefone_celular: '(11) 99999-1212',
    telefone_outro: '',
    ponto_referencia: 'Próximo ao terminal',
    condicao_moradia: 'Alugada',
    numero_comodos: '4',
    valor_aluguel_financiamento: '850,00',
    tipo_construcao: 'Alvenaria',
    situacao_habitacional: [],
    programa_transferencia_renda: ['Não recebe'],
    programa_outro: '',
    beneficio_prestacao_continuada: ['Pessoa com deficiência'],
    composicao_familiar: [
      { nome: 'Fernanda Oliveira Santos', parentesco: 'Responsável', idade: '35', renda: '1.950,00', fator: '3 - Deficiência física' },
      { nome: 'Lucas Santos', parentesco: 'Companheiro', idade: '37', renda: '2.100,00', fator: '—' },
      { nome: 'Bia Santos', parentesco: 'Filha', idade: '7', renda: '—', fator: '5 - Deficiência visual' },
    ],
    resumo: 'Família com acompanhamento contínuo e necessidade de articulação com saúde e acessibilidade.',
    ultima_atualizacao: '2026-04-28',
    status: 'Ativa',
    prioridade: 'Média',
    tags: ['Pessoa com deficiência', 'Rede saúde', '1 criança', 'Moradia alugada'],
    escola: 'EMEI Jardim da Saúde',
    saude: 'Pré-natal e acompanhamento multidisciplinar',
    vulnerabilidade: 'Atenção à acessibilidade e apoio no cuidado',
  },
]

const statusOptions = ['Todas', 'Ativa', 'Acompanhamento', 'Prioritária']
const priorityOptions = ['Todas', 'Alta', 'Média', 'Baixa']
const districtOptions = ['Todos', 'Ipiranga', 'Vila Prudente', 'Sacomã']
const benefitOptions = ['Todos', 'Bolsa Família', 'Renda Cidadã', 'BPC', 'Sem benefício']

const orientadorPalette = [
  { id: 'orientador1', backgroundColor: '#FDECEC', color: '#B91C1C' },
  { id: 'orientador2', backgroundColor: '#FEF9C3', color: '#A16207' },
  { id: 'orientador3', backgroundColor: '#DCFCE7', color: '#15803D' },
  { id: 'orientador4', backgroundColor: '#DBEAFE', color: '#1D4ED8' },
  { id: 'orientador5', backgroundColor: '#F3E8FF', color: '#7E22CE' },
  { id: 'orientador6', backgroundColor: '#FFEDD5', color: '#C2410C' },
  { id: 'orientador7', backgroundColor: '#FCE7F3', color: '#BE185D' },
  { id: 'orientador8', backgroundColor: '#EFE2D6', color: '#7C2D12' },
]

function getOrientadorLabel(seed) {
  const value = String(seed || '')
  let hash = 0

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash + value.charCodeAt(i) * (i + 1)) % 2147483647
  }

  return orientadorPalette[hash % orientadorPalette.length]
}

function formatDate(value) {
  if (!value) {
    return '—'
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${value}T00:00:00`))
}

const cardTextSx = {
  minWidth: 0,
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
}

function DetailItem({ label, value, icon }) {
  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#ffffff',
        minWidth: 0,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ minWidth: 0 }}>
        <Box sx={{ flexShrink: 0, pt: 0.2 }}>{icon}</Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={cardTextSx}>
            {label}
          </Typography>
          <Typography variant="body2" fontWeight={700} sx={cardTextSx}>
            {value || '—'}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

function FamilySummaryChip({ label, color = 'default' }) {
  return <Chip label={label} size="small" color={color} variant={color === 'default' ? 'outlined' : 'filled'} sx={{ maxWidth: '100%' }} />
}

function FamilyPreviewCard({ family, selected, onSelect }) {
  const orientador = getOrientadorLabel(family.nome_representante)

  return (
    <Paper
      elevation={0}
      variant="outlined"
      onClick={onSelect}
      sx={{
        p: 1.75,
        borderRadius: 2.5,
        cursor: 'pointer',
        borderColor: selected ? 'primary.main' : 'divider',
        backgroundColor: selected ? '#edf5f0' : '#ffffff',
        transition: 'border-color 160ms ease, transform 160ms ease, background-color 160ms ease',
        '&:hover': { transform: 'translateY(-1px)', borderColor: 'primary.main' },
      }}
    >
      <Stack spacing={1} sx={{ minWidth: 0 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight={800} noWrap sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {family.nome_representante}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {family.endereco}, {family.numero} • {family.bairro}
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ minWidth: 0 }}>
          <Chip label={family.status} size="small" color={family.status === 'Prioritária' ? 'error' : 'primary'} variant={family.status === 'Ativa' ? 'outlined' : 'filled'} />
          <Chip label={`Prioridade ${family.prioridade}`} size="small" variant="outlined" />
          <Chip
            label={orientador.id}
            size="small"
            sx={{
              backgroundColor: orientador.backgroundColor,
              color: orientador.color,
              fontWeight: 700,
            }}
          />
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 0 }}>
          {family.cras} • {family.tags.slice(0, 2).join(' · ')}
        </Typography>
      </Stack>
    </Paper>
  )
}

function FamilyDetailPanel({ family }) {
  if (!family) return null

  const orientadorRepresentante = getOrientadorLabel(family.nome_representante)

  return (
    <Stack spacing={1.5} sx={{ minWidth: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff' }}>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} sx={{ minWidth: 0 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" color="primary" letterSpacing={1.6} sx={cardTextSx}>
              Família selecionada
            </Typography>
            <Typography variant="h5" fontWeight={800} sx={cardTextSx}>
              {family.nome_representante}
            </Typography>
            <Typography color="text.secondary" sx={cardTextSx}>
              {family.endereco}, {family.numero} — {family.bairro} / {family.distrito}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end" sx={{ minWidth: 0 }}>
            <FamilySummaryChip label={family.status} color={family.status === 'Prioritária' ? 'error' : 'primary'} />
            <FamilySummaryChip label={`Prioridade ${family.prioridade}`} />
            <FamilySummaryChip label={family.cras} />
            <Chip
              label={orientadorRepresentante.id}
              size="small"
              sx={{
                backgroundColor: orientadorRepresentante.backgroundColor,
                color: orientadorRepresentante.color,
                fontWeight: 700,
              }}
            />
          </Stack>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
        <DetailItem label="Serviço SASF" value={family.nome_servico_sasf} icon={<FamilyRestroomOutlinedIcon fontSize="small" color="primary" />} />
        <DetailItem label="CAS / CRAS" value={`${family.cas} • ${family.cras}`} icon={<BadgeOutlinedIcon fontSize="small" color="primary" />} />
        <DetailItem label="Matrícula" value={family.numero_matricula} icon={<BadgeOutlinedIcon fontSize="small" color="primary" />} />
        <DetailItem label="NIS / NIT / NB" value={family.nis_nit_nb} icon={<BadgeOutlinedIcon fontSize="small" color="primary" />} />
        <DetailItem label="Última atualização" value={formatDate(family.ultima_atualizacao)} icon={<ReportOutlinedIcon fontSize="small" color="primary" />} />
      </Box>

      <SectionBlock title="Dados do representante" subtitle="Informações principais da ficha cadastral da família.">
        <InfoGrid family={family} />
      </SectionBlock>

      <SectionBlock title="Endereço e contato" subtitle="Localização e meios de contato registrados na ficha.">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
          <DetailItem label="Endereço" value={family.endereco} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Número / complemento" value={`${family.numero} • ${family.complemento || '—'}`} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="CEP" value={family.cep} icon={<LocationOnOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Bairro / distrito" value={`${family.bairro} • ${family.distrito}`} icon={<LocationOnOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Telefone residencial" value={family.telefone_residencial || '—'} icon={<PhoneOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Telefone celular" value={family.telefone_celular || '—'} icon={<PhoneOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Outro telefone" value={family.telefone_outro || '—'} icon={<PhoneOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Ponto de referência" value={family.ponto_referencia} icon={<LocationOnOutlinedIcon fontSize="small" color="primary" />} />
        </Box>
      </SectionBlock>

      <SectionBlock title="Moradia e benefícios" subtitle="Condições habitacionais, programas e proteções acessadas.">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
          <DetailItem label="Condição de moradia" value={family.condicao_moradia} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Nº de cômodos" value={family.numero_comodos} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Aluguel/financiamento" value={`R$ ${family.valor_aluguel_financiamento}`} icon={<AttachMoneyOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Tipo de construção" value={family.tipo_construcao} icon={<HomeOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Situação habitacional" value={family.situacao_habitacional.join(', ') || '—'} icon={<ReportOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Transferência de renda" value={family.programa_transferencia_renda.join(', ')} icon={<AttachMoneyOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Outro programa" value={family.programa_outro || '—'} icon={<AttachMoneyOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="BPC" value={family.beneficio_prestacao_continuada.join(', ')} icon={<LocalHospitalOutlinedIcon fontSize="small" color="primary" />} />
        </Box>
      </SectionBlock>

      <SectionBlock title="Composição familiar" subtitle="Pessoas vinculadas à família no cadastro.">
        <Stack spacing={1} sx={{ minWidth: 0 }}>
          {family.composicao_familiar.map((member) => {
            const orientadorMembro = getOrientadorLabel(`${family.id}-${member.nome}`)

            return (
              <Paper key={`${family.id}-${member.nome}`} elevation={0} variant="outlined" sx={{ p: 1.5, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25} justifyContent="space-between" sx={{ minWidth: 0 }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body1" fontWeight={800} sx={cardTextSx}>
                      {member.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={cardTextSx}>
                      {member.parentesco} • {member.idade} anos
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ minWidth: 0 }}>
                    <Chip
                      label={orientadorMembro.id}
                      size="small"
                      sx={{
                        maxWidth: '100%',
                        backgroundColor: orientadorMembro.backgroundColor,
                        color: orientadorMembro.color,
                        fontWeight: 700,
                      }}
                    />
                    <Chip label={`Renda ${member.renda === '—' ? 'não informada' : `R$ ${member.renda}`}`} size="small" variant="outlined" sx={{ maxWidth: '100%' }} />
                    <Chip label={member.fator} size="small" variant="outlined" sx={{ maxWidth: '100%' }} />
                  </Stack>
                </Stack>
              </Paper>
            )
          })}
        </Stack>
      </SectionBlock>

      <SectionBlock title="Leitura rápida" subtitle="Campos de apoio para decisão e acompanhamento.">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
          <DetailItem label="Escola" value={family.escola} icon={<SchoolOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Saúde" value={family.saude} icon={<LocalHospitalOutlinedIcon fontSize="small" color="primary" />} />
          <DetailItem label="Vulnerabilidade" value={family.vulnerabilidade} icon={<ReportOutlinedIcon fontSize="small" color="primary" />} />
        </Box>
      </SectionBlock>
    </Stack>
  )
}

function InfoGrid({ family }) {
  const items = [
    ['Sexo', family.sexo],
    ['Data de matrícula', family.data_matricula],
    ['Data de nascimento', family.data_nascimento],
    ['Última atualização', formatDate(family.ultima_atualizacao)],
    ['Naturalidade', family.naturalidade],
    ['Cor/raça', family.cor_raca],
    ['Pessoa com deficiência', family.pessoa_deficiencia],
    ['CPF', family.cpf],
    ['RG / Órgão emissor', `${family.rg} • ${family.orgao_emissor}`],
    ['UF / CTPS', `${family.uf} • ${family.ctps_numero}/${family.ctps_serie}`],
    ['Emissão CTPS', family.ctps_emissao],
    ['Mãe / Pai', `${family.mae} • ${family.pai}`],
    ['Estado civil', family.estado_civil],
    ['Grau de instrução', family.grau_instrucao],
    ['Profissão', family.profissao],
    ['Ocupação', family.ocupacao_descricao],
    ['Situação ocupacional', family.ocupacao_situacao],
    ['Renda', `R$ ${family.renda}`],
    ['Desligamento', family.data_desligamento || 'Em acompanhamento'],
  ]

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
      {items.map(([label, value]) => (
        <DetailItem key={label} label={label} value={value} icon={<BadgeOutlinedIcon fontSize="small" color="primary" />} />
      ))}
    </Box>
  )
}

function SectionBlock({ title, subtitle, children }) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0 }}>
      <Stack spacing={1.25} sx={{ minWidth: 0 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom sx={{ minWidth: 0 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={cardTextSx}>
            {subtitle}
          </Typography>
        </Box>
        {children}
      </Stack>
    </Paper>
  )
}

function FamiliesDetailDrawer({ family, open, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: '100%', maxWidth: 560, p: 2 } }}>
      <Stack spacing={2} sx={{ minWidth: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ minWidth: 0 }}>
          <Typography variant="h6" fontWeight={800} sx={cardTextSx}>
            Detalhes da família
          </Typography>
          <IconButton onClick={onClose} aria-label="Fechar detalhes">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        {family && <FamilyDetailPanel family={family} />}
      </Stack>
    </Drawer>
  )
}

function FamiliesPage() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todas')
  const [priorityFilter, setPriorityFilter] = useState('Todas')
  const [districtFilter, setDistrictFilter] = useState('Todos')
  const [benefitFilter, setBenefitFilter] = useState('Todos')
  const [streetFilter, setStreetFilter] = useState('')
  const [updatedAtFilter, setUpdatedAtFilter] = useState('')
  const [selectedId, setSelectedId] = useState(families[0]?.id)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [labelsDialogOpen, setLabelsDialogOpen] = useState(false)

  const filteredFamilies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return families.filter((family) => {
      const matchesQuery =
        !normalizedQuery ||
        [family.nome_representante, family.endereco, family.bairro, family.cras, family.cas, family.tags.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      const matchesStatus = statusFilter === 'Todas' || family.status === statusFilter
      const matchesPriority = priorityFilter === 'Todas' || family.prioridade === priorityFilter
      const matchesDistrict = districtFilter === 'Todos' || family.distrito === districtFilter
      const normalizedStreetFilter = streetFilter.trim().toLowerCase()
      const matchesStreet =
        !normalizedStreetFilter ||
        [family.endereco, family.numero, family.complemento, family.bairro]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedStreetFilter)
      const matchesUpdatedAt = !updatedAtFilter || family.ultima_atualizacao === updatedAtFilter
      const matchesBenefit =
        benefitFilter === 'Todos' ||
        (benefitFilter === 'Sem benefício'
          ? family.programa_transferencia_renda.includes('Não recebe') && family.beneficio_prestacao_continuada.includes('Não recebe')
          : family.tags.includes(benefitFilter) || family.programa_transferencia_renda.includes(benefitFilter) || family.beneficio_prestacao_continuada.includes(benefitFilter))

      return matchesQuery && matchesStatus && matchesPriority && matchesDistrict && matchesStreet && matchesUpdatedAt && matchesBenefit
    })
  }, [benefitFilter, districtFilter, priorityFilter, query, statusFilter, streetFilter, updatedAtFilter])

  const selectedFamily = filteredFamilies.find((family) => family.id === selectedId) ?? filteredFamilies[0] ?? families[0]

  const allLabels = useMemo(() => {
    const labels = new Set()
    families.forEach((family) => family.tags.forEach((tag) => labels.add(tag)))
    return Array.from(labels)
  }, [])

  const handleSelectFamily = (familyId) => {
    setSelectedId(familyId)
    if (!isDesktop) {
      setMobileDrawerOpen(true)
    }
  }

  return (
    <Stack spacing={2.5} sx={{ minWidth: 0 }}>
      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0 }}>
        <Stack spacing={2} direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', lg: 'center' }} sx={{ minWidth: 0 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" color="primary" letterSpacing={1.8} sx={cardTextSx}>
              Famílias
            </Typography>
            <Typography variant="h4" fontWeight={800} gutterBottom sx={cardTextSx}>
              Página de acompanhamento por família
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 820, ...cardTextSx }}>
              Mock completo com os campos da ficha cadastral da família, organizado para busca rápida, leitura por etiquetas e análise por filtros.
            </Typography>
          </Box>

          <Chip label={`${families.length} famílias mockadas`} sx={{ backgroundColor: '#edf5f0', color: 'primary.dark', fontWeight: 700, maxWidth: '100%' }} />
        </Stack>
      </Paper>

      <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0 }}>
        <Stack spacing={1.5} sx={{ minWidth: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
            <FilterAltOutlinedIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" color="primary" fontWeight={800} sx={cardTextSx}>
              Filtros e labels
            </Typography>
          </Stack>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))', xl: 'repeat(7, minmax(0, 1fr))' }, gap: 1.25, minWidth: 0 }}>
            <TextField label="Buscar" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome, bairro, CRAS..." />

            <TextField label="Rua" value={streetFilter} onChange={(event) => setStreetFilter(event.target.value)} placeholder="Ex.: Santa Cruz" />

            <TextField
              label="Última atualização"
              type="text"
              value={updatedAtFilter}
              onChange={(event) => setUpdatedAtFilter(event.target.value)}
              placeholder=""
              inputMode="numeric"
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(event) => setStatusFilter(event.target.value)}>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Prioridade</InputLabel>
              <Select value={priorityFilter} label="Prioridade" onChange={(event) => setPriorityFilter(event.target.value)}>
                {priorityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Distrito</InputLabel>
              <Select value={districtFilter} label="Distrito" onChange={(event) => setDistrictFilter(event.target.value)}>
                {districtOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Benefício</InputLabel>
              <Select value={benefitFilter} label="Benefício" onChange={(event) => setBenefitFilter(event.target.value)}>
                {benefitOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 0, flex: 1 }}>
              As etiquetas do mock estão agrupadas em uma visão rápida.
            </Typography>
            <Chip
              icon={<InfoOutlinedIcon />}
              label="Ver labels"
              clickable
              onClick={() => setLabelsDialogOpen(true)}
              variant="outlined"
              sx={{ flexShrink: 0 }}
            />
          </Stack>
        </Stack>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'minmax(300px, 0.92fr) minmax(0, 1.08fr)' }, gap: 1.5, alignItems: 'start', minWidth: 0 }}>
        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, borderColor: 'divider', backgroundColor: '#ffffff', minWidth: 0, overflow: 'hidden' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" color="primary" fontWeight={800} sx={cardTextSx}>
                Famílias encontradas
              </Typography>
              <Chip label={`${filteredFamilies.length}`} size="small" variant="outlined" />
            </Stack>
          </Box>

          <Stack spacing={1.25} sx={{ p: 1.5, maxHeight: { xs: 'none', lg: 760 }, overflow: 'auto' }}>
            {filteredFamilies.map((family) => (
              <FamilyPreviewCard
                key={family.id}
                family={family}
                selected={selectedFamily?.id === family.id}
                onSelect={() => handleSelectFamily(family.id)}
              />
            ))}

            {filteredFamilies.length === 0 && (
              <Box sx={{ p: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Nenhuma família encontrada com os filtros atuais.
                </Typography>
              </Box>
            )}
          </Stack>
        </Paper>

        {isDesktop ? <FamilyDetailPanel family={selectedFamily} /> : null}
      </Box>

      <FamiliesDetailDrawer
        family={selectedFamily}
        open={mobileDrawerOpen && !isDesktop}
        onClose={() => setMobileDrawerOpen(false)}
      />

      <Dialog open={labelsDialogOpen} onClose={() => setLabelsDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>Labels disponíveis</DialogTitle>
        <DialogContent dividers>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {allLabels.map((label) => (
              <Chip key={label} label={label} variant="outlined" sx={{ maxWidth: '100%' }} />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

export default FamiliesPage
