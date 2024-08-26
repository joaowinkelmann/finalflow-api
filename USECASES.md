Para assegurar o bom funcionamento do sistema e garantir que os diferentes tipos de usuários (coordenador, professor e aluno) possam interagir de maneira eficaz, aqui está um conjunto de **use cases** detalhados para cada um dos papéis:

---

### **1. Coordenador**
**Objetivo:** Gerenciar cronogramas, bancas, orientações e supervisionar o progresso dos alunos e professores.

#### **Use Cases:**

- **Gerenciamento de Cronogramas:**
  - **Criar Cronograma:** O coordenador pode criar um novo cronograma para o ciclo de TCC, especificando as datas de início e fim, e os eventos importantes.
  - **Atualizar Cronograma:** O coordenador pode editar cronogramas existentes para ajustar prazos ou adicionar novas atividades.
  - **Visualizar Cronogramas:** O coordenador pode ver todos os cronogramas ativos e passados, incluindo detalhes sobre as atividades programadas.

- **Gerenciamento de Bancas:**
  - **Designar Banca:** O coordenador pode designar professores para compor as bancas de avaliação, vinculando-os a alunos e cronogramas específicos.
  - **Atualizar Banca:** O coordenador pode substituir membros da banca ou ajustar a composição de uma banca existente.
  - **Visualizar Avaliações:** O coordenador pode ver as notas e comentários de todas as bancas, monitorando o desempenho dos alunos.

- **Supervisão de Orientações:**
  - **Acompanhar Orientações:** O coordenador pode ver quais professores estão orientando quais alunos e o status atual de cada orientação (em andamento, finalizada, etc.).
  - **Intervir em Orientações:** O coordenador pode intervir se houver problemas na orientação, como conflitos de agenda ou falta de progresso.

- **Gestão de Alertas e Prazos:**
  - **Enviar Alertas:** O coordenador pode enviar alertas personalizados para alunos e professores sobre prazos importantes ou mudanças no cronograma.
  - **Gerenciar Prazos:** O coordenador pode criar, atualizar e deletar prazos associados a um cronograma, garantindo que todos estejam cientes das datas limites.

- **Apontar próximo coordenador:**
  - **Definir Próximo Coordenador:** O coordenador atual pode indicar quem será o próximo coordenador do curso
  - **Poderá existir somente um coordenador por vez:** O coordenador atual terá que indicar um novo coordenador antes de sair do cargo.

---

### **2. Professor**
**Objetivo:** Orientar alunos em seus TCCs, participar de bancas e acompanhar o progresso de seus orientandos.

#### **Use Cases:**

- **Orientação de Alunos:**
  - **Aceitar Orientação:** O professor pode aceitar ser orientador de um aluno, vinculando-se formalmente ao aluno no sistema.
  - **Acompanhar Progresso:** O professor pode visualizar e registrar o progresso do aluno, adicionando notas de reuniões e avaliando entregas parciais do TCC.
  - **Marcar Reuniões:** O professor pode agendar reuniões com o aluno, definindo datas e horários e anexando documentos relevantes.

- **Participação em Bancas:**
  - **Avaliar Trabalhos:** O professor, como membro da banca, pode avaliar os trabalhos dos alunos, inserindo notas e comentários que ficarão registrados no sistema.
  - **Visualizar Agendas de Bancas:** O professor pode ver a agenda das bancas nas quais ele foi designado, garantindo que esteja preparado para cada avaliação.

- **Comunicação e Feedback:**
  - **Enviar Feedback:** O professor pode enviar feedback diretamente para os alunos após reuniões ou revisões de documentos.
  - **Receber Alertas:** O professor pode receber alertas do coordenador sobre prazos ou mudanças no cronograma, garantindo que está alinhado com as expectativas institucionais.

---

### **3. Aluno**
**Objetivo:** Desenvolver o TCC sob a orientação de um professor, cumprir prazos e submeter-se à avaliação de bancas.

#### **Use Cases:**

- **Escolha de Orientador:**
  - **Solicitar Orientação:** O aluno pode solicitar a orientação de um professor específico, aguardando a confirmação do professor para iniciar formalmente o trabalho.
  
- **Gestão do Trabalho de Conclusão:**
  - **Submeter Propostas:** O aluno pode submeter propostas de temas ou capítulos do TCC para a aprovação do orientador.
  - **Receber Feedback:** O aluno pode visualizar feedback e comentários enviados pelo professor ou membros da banca.
  - **Acompanhar Cronograma:** O aluno pode visualizar o cronograma geral e seus prazos específicos, garantindo que está em conformidade com as expectativas.

- **Participação em Reuniões e Bancas:**
  - **Marcar Reuniões:** O aluno pode solicitar reuniões com o orientador para discutir o andamento do TCC ou esclarecer dúvidas.
  - **Preparação para Bancas:** O aluno pode ver as datas das bancas e se preparar conforme os requisitos definidos, como a entrega de uma versão final do trabalho.

- **Recebimento de Notas e Avaliações:**
  - **Visualizar Notas:** Após a realização da banca, o aluno pode visualizar suas notas e comentários da avaliação.
  - **Receber Alertas:** O aluno recebe alertas sobre prazos importantes, feedback de reuniões e outros avisos críticos.

---

### **4. Integração entre os Papéis**
- **Fluxo de Trabalho:**
  - O **Coordenador** define cronogramas e bancas, gerando alertas e monitorando o progresso geral.
  - O **Professor** orienta os alunos, avalia entregas, participa de bancas e fornece feedback contínuo.
  - O **Aluno** trabalha em seu TCC, submete entregas conforme os prazos e recebe orientação e avaliação.

---

Estes **use cases** garantem que cada papel dentro do sistema tenha um conjunto claro de responsabilidades e ferramentas para realizar suas tarefas, assegurando o bom funcionamento do sistema e a eficácia na gestão do processo de TCC.