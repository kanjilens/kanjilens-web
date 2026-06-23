<p align="center">
  <img src="./src/assets/icons/logo.svg" alt="Kanjilens Logo" width="120" />
</p>

<h1 align="center">Kanjilens</h1>

<p align="center">
  Discover, manage and learn Kanji through an intuitive platform.
</p>
---

# Kanjilens

Kanjilens é uma aplicação web desenvolvida para descoberta, gerenciamento e aprendizado de coleções de Kanji. O projeto utiliza uma arquitetura baseada em **Feature-Sliced Design (Feature-First)** para garantir escalabilidade, manutenibilidade e uma clara separação de responsabilidades.

Este projeto faz parte do Trabalho Final da disciplina de Programação Mobile 2026.1.

---

## 📱 Aplicações Disponíveis

Atualmente o ecossistema Kanjilens possui:

| Plataforma | Status |
|------------|---------|
| 🌐 Web | MVP |
| 📱 Mobile | Desenvolvimento |

### Aplicativo Mobile

O Kanjilens também possui uma versão mobile desenvolvida para dispositivos Android.

🔗 **Repositório Mobile:**  
[Kanjilens Mobile](https://github.com/kanjilens/kanjilens-mobile)

🔗 **Download / Release:**  
Em breve...

---

## ✨ Features

| Funcionalidade | Web | Mobile |
|---------------|-----|---------|
| Login | ✅ | ✅ |
| Cadastro | ✅ | ✅ |
| Autenticação Firebase | ✅ | ✅ |
| Visualização de Kanji | ✅ | ✅ |
| Descoberta de Kanji | 🚧 | 🚧 |
| Filtros | ✅ | ✅ |
| Internacionalização | 🚧 | 🚧 |
| Acessibilidade | 🚧 | 🚧 |
| Comentários | ✅ | ✅ |
| Modo Offline | 🚧 | 🚧 |

**Legenda**

- ✅ Implementado
- 🚧 Em desenvolvimento
- ❌ Não disponível

---

## 🌐 External APIs

O projeto utiliza a API [kanjiapi.dev](https://kanjiapi.dev/) como sua principal fonte de dados para informações de Kanji. Esta API gratuita e aberta fornece dados essenciais como significados, leituras e níveis escolares, que são consumidos pela nossa camada de Repositório para preencher as coleções de Kanji e visualizações detalhadas.

---

## 📁 Estrutura do Projeto

O projeto segue uma arquitetura **Feature-First (Vertical Slicing)**. Em vez de agrupar arquivos por função técnica (componentes, hooks, serviços), eles são organizados por domínio de negócio.

```text
src/
├── app/                # Montagem da aplicação (Router, Providers, Páginas Raiz)
├── assets/             # Recursos estáticos (Ícones, Imagens, Fontes)
├── features/           # Domínios de negócio
│   ├── iam/            # Identidade e Acesso
│   ├── kanji/          # Domínio Kanji
│   └── dashboard/      # Dashboard do usuário
├── shared/             # Recursos compartilhados
│   ├── components/     # Componentes reutilizáveis
│   ├── hooks/          # Hooks globais
│   ├── lib/            # Configurações de bibliotecas
│   ├── services/       # Serviços base
│   ├── types/          # Tipagens globais
│   └── utils/          # Utilitários
├── styles/             # Configurações CSS/Tailwind
└── types/              # Tipagens de ambiente
```

---

## 🏛️ Padrões do Projeto

### 1. Vertical Slicing (Feature-First)

Ao adicionar uma nova funcionalidade:

- Crie uma pasta em `src/features/{feature_name}`.
- Mantenha componentes, hooks e serviços relacionados dentro da feature.
- Mova algo para `shared` apenas quando for reutilizado por duas ou mais features.

### 2. Arquitetura em Camadas

Fluxo recomendado:

```text
UI Component
      ↓
 Custom Hook
      ↓
    Service
      ↓
 Repository/API
```

#### Components

Responsáveis apenas pela apresentação e interação do usuário.

#### Hooks

Responsáveis pelo gerenciamento de estado local e orquestração.

#### Services

Responsáveis pelas regras de negócio.

#### Repositories

Responsáveis pela comunicação com APIs ou banco de dados.

### 3. Padrões de Código

- TypeScript com tipagem estrita.
- Evitar uso de `any`.
- Tailwind CSS para estilização.
- Context API para estado global.
- `useState` e `useReducer` para estado local.

#### Convenções de Nome

| Tipo | Convenção | Exemplo |
|--------|-----------|----------|
| Hook | `use{Feature}{Action}` | `useKanjiDetails` |
| Service | `{Domain}Service` | `kanji.service.ts` |
| Component | PascalCase | `KanjiCard.tsx` |

### 4. Estratégia de Testes

- Testes unitários utilizando Jest.
- React Testing Library para componentes React.
- Arquivos de teste próximos ao código testado.

Exemplo:

```text
KanjiCard.tsx
KanjiCard.test.tsx
```

---

## 🚀 Como Executar

### Instalar dependências

```bash
npm install
```

### Executar ambiente de desenvolvimento

```bash
npm run dev
```

### Executar lint

```bash
npm run lint
```

### Executar testes

```bash
npm test
```

### Gerar build de produção

```bash
npm run build
```

---

## 👥 Colaboradores



---

## 🤝 Contribuindo

1. Faça um Fork do projeto.
2. Crie uma branch para sua feature.
3. Faça seus commits.
4. Envie um Pull Request.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.