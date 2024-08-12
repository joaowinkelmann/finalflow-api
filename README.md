# api-nest-kurt
API para controle de Trabalhos de Conclusão de Curso (TCC)

# Requisitos
## O que precisamos:
- Cadastro de alunos que estão matriculados no TC
- Cadastro de professores
- Definir a relação Aluno / Orientador
- Definição pelo coordenador do cronograma de entregas 
- Coordenador define os 2 professores que compõem a banca
- Lançar notas por critérios para Proposta, Reelaboração Proposta, TC e Reelaboração de TC
- Registro de reuniões de orientações com upload de documentos
- Controle dos prazos para entrega de Proposta, Reelaboração Proposta, TC e Reelaboração de TC  
- Controle dos tempos para Avaliação de Proposta, Reelaboração Proposta, TC e Reelaboração de TC
- Alerta de atrasos para prazos de entrega e tempos para Avaliação de Proposta, Reelaboração Proposta, TC e Reelaboração de TC
- A aplicação precisa saber quem está logado e quais lançamentos cada usuário pode realizar. Ex: Só o coordenador pode atribuir professores na banca. Um professor só lança notas para seus alunos.



## Instalar Bun
curl -fsSL https://bun.sh/install | bash

## Instalar e rodar o projeto
Instalar dependências

```bun install```

Dev/watch

```bun run dev```

Build

```bun run build```

Start/prod

```bun run start```