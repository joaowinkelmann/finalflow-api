# Finalflow
API para controle de Trabalhos de Conclusão de Curso (TCC)

# Requisitos
## O que precisamos:
- Cadastro de alunos que estão matriculados no TC ✅
- Cadastro de professores ✅
- Definir a relação Aluno / Orientador ✅
- Definição pelo coordenador do cronograma de entregas ✅
- Coordenador define os 2 professores que compõem a banca ✅
- Lançar notas por critérios para Proposta, Reelaboração Proposta, TC e Reelaboração de TC
- Registro de reuniões de orientações com upload de documentos ✅
- Controle dos prazos para entrega de Proposta, Reelaboração Proposta, TC e Reelaboração de TC
- Controle dos tempos para Avaliação de Proposta, Reelaboração Proposta, TC e Reelaboração de TC
- Alerta de atrasos para prazos de entrega e tempos para Avaliação de Proposta, Reelaboração Proposta, TC e Reelaboração de TC
- A aplicação precisa saber quem está logado e quais lançamentos cada usuário pode realizar. Ex: Só o coordenador pode atribuir professores na banca. Um professor só lança notas para seus alunos. ✅


To do:
- Controle de prazos => E-mail/template de alteração nos prazos/ ao chamar o prazo.service->update()
- Atrasos => Serviço no alerta.service + template


## Instalar Bun

Linux/MacOS

```curl -fsSL https://bun.sh/install | bash```

Windows

```powershell -c "irm bun.sh/install.ps1 | iex"```


## Instalar e rodar o projeto
Instalar dependências

```bun install```

Dev/watch

```bun run dev```

Build

```bun run build```

Start/prod

```bun run start```


## Prisma
### Realizar o Seed do Banco de Dados
```bunx prisma db seed``` ou ```npx prisma db seed```

### Migrar alterações no banco
```bunx prisma migrate dev``` ou ```npx prisma migrate dev```

### Gerar o Prisma Client
```bunx prisma generate``` ou ```npx prisma generate```
