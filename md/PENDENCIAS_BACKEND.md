# Pendências do Backend — Sprint Atual

Documentação baseada em testes reais com token válido em 2026-06-03.

---

## Status dos endpoints (atualizado)

| Endpoint | Método | Status | Situação |
|---|---|---|---|
| `/api/familia` | POST | ✅ 200 | Funcionando |
| `/api/prontuario` | POST/PUT | ✅ 200 | Funcionando |
| `/api/membro` | POST | ✅ 200 | Funcionando |
| `/api/fichavisita` | POST | ✅ 200 | Funcionando |
| `/api/endereco` | POST | ✅ 200 | Funcionando |
| `/api/representante` | POST | ✅ 200 | Funcionando |
| `/api/fichacadastral` | POST | ✅ 200 | Funcionando |
| `/api/usuario/login` | POST | ✅ 200 | Funcionando |
| `/api/usuario/{id}` | GET/PUT | ✅ 200 | Funcionando |
| `/api/registroprosseguimento` | POST | ❌ 500 | **Fix necessário** |

---

## Fluxo de cadastro — integração atual

O fluxo completo de cadastro de família está integrado e testado. Ao salvar
o formulário `ficha_cadastral_familia`, o frontend executa em sequência:

```
1. POST /api/familia                → familiaId
2. POST /api/prontuario             → prontuarioId
3. POST /api/membro                 → membroId (representante como membro, garante nome na listagem)
4. POST /api/endereco               → enderecoId
5. POST /api/representante          → representanteId (usa enderecoId)
6. POST /api/fichacadastral         → fichaCadastralId (usa prontuarioId + representanteId)
7. PUT  /api/prontuario/{id}        → vincula fichaCadastralId ao prontuário
8. POST /api/fichavisita            → na etapa de visita domiciliar
```

Todos os passos retornam 200. A família aparece na listagem com nome correto
imediatamente após o cadastro.

---

## Pendência restante

### `POST /api/registroprosseguimento` — 500

**Erro nos logs:**
```
NullPointerException: Cannot invoke "...RegistroProsseguimentoService.criar(...)"
because "this.registroProsseguimentoService" is null
at RegistroProsseguimentoController.criar(RegistroProsseguimentoController.java:22)
```

**Causa:** service não injetado no controller (mesmo padrão que EnderecoController
e RepresentanteController tinham — provavelmente o `@RequiredArgsConstructor` +
`private final` está faltando ou o Lombok não está processando esse arquivo).

**Fix:**
```java
@RestController
@RequestMapping("/api/registroprosseguimento")
@RequiredArgsConstructor  // ← adicionar
public class RegistroProsseguimentoController {
    private final RegistroProsseguimentoService registroProsseguimentoService; // ← final
}
```

**Impacto no frontend:** a demanda/encaminhamentos do formulário "Ficha Cadastral
— Informações Complementares" não é persistida. O frontend já tem try/catch,
então o fluxo continua normalmente sem travar.
