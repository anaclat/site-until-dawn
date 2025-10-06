# 🎬 Until Dawn - Site do Filme

![Until Dawn Banner](./images/filme/until%20dawn.jpg)

> **"Cada escolha tem uma consequência."**  
> Um projeto acadêmico front-end desenvolvido para a disciplina de Front-End I, criando um site imersivo para a adaptação cinematográfica do aclamado jogo de terror *Until Dawn*.

---

## 🎯 Sobre o Projeto

Este projeto consiste em um website completo e responsivo para promover o filme *Until Dawn*, baseado no jogo de terror interativo da Supermassive Games. O site oferece uma experiência imersiva com tema de terror psicológico, apresentando informações sobre o filme, elenco completo e detalhes sobre o jogo original.

### ✨ Características Principais

- 🎨 **Design Imersivo**: Tema de terror psicológico com elementos visuais assustadores
- 📱 **Totalmente Responsivo**: Adaptado para todos os dispositivos
- ⚡ **Performance Otimizada**: Carregamento rápido e animações suaves
- ♿ **Acessível**: Suporte a preferências de redução de movimento
- 🎬 **Conteúdo Rico**: Trailer oficial, elenco completo e informações técnicas

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos avançados com Grid e Flexbox
- **JavaScript (ES6+)** - Interatividade e efeitos especiais

### Recursos Externos
- **Google Fonts** - Tipografia (Cinzel, Playfair Display, Source Sans Pro)
- **YouTube API** - Player de vídeo integrado
- **Web Audio API** - Efeitos sonoros ambiente

### Ferramentas de Desenvolvimento
- **Git** - Controle de versão
- **VS Code** - Editor de código
- **Live Server** - Desenvolvimento local

---

## 📁 Estrutura do Projeto

```
until-dawn-website/
│
├── index.html              # Página inicial - Sobre o Filme
├── elenco.html             # Página do Elenco Completo
├── extras.html             # Página de Extras - Sobre o Jogo
│
├── style/
│   ├── style.css           # Estilos principais
│   └── script.js           # JavaScript com todos os efeitos
│
└── images/
    ├── elenco/             # Fotos do elenco
    │   ├── Ella.jpg
    │   ├── Peter.jpg
    │   └── ...
    ├── filme/              # Imagens do filme
```

---

## 🎨 Design e Experiência do Usuário

### Paleta de Cores
```css
:root {
    --blood-red: #8b0000;      /* Sangue - Destaque principal */
    --dark-blood: #5a0000;     /* Sangue escuro */
    --deep-black: #000000;     /* Preto profundo */
    --gold: #d4af37;          /* Dourado - Elementos premium */
    --silver: #c0c0c0;        /* Prata - Texto secundário */
    --moonlight: #e8e8e8;     /* Luz lunar - Texto principal */
}
```

### Tipografia
- **Cinzel** - Títulos e elementos de destaque
- **Playfair Display** - Textos em itálico e citações
- **Source Sans Pro** - Corpo de texto e conteúdo

### Efeitos Visuais
- 🩸 **Glitch Effect** - Textos com efeito de distorção
- 🌫️ **Parallax Scrolling** - Camadas com movimento
- 💀 **Blood Drips** - Respingos de sangue animados
- 👻 **Hover Effects** - Interações suaves e temáticas

---

## ⚡ Funcionalidades

### 🏠 Página Inicial (`index.html`)
- ✅ Sinopse do filme
- ✅ Informações técnicas
- ✅ Trailer oficial integrado
- ✅ Protagonistas em destaque
- ✅ Curiosidades e segredos

### 👥 Página do Elenco (`elenco.html`)
- ✅ Elenco completo com fotos
- ✅ Informações dos personagens
- ✅ Detalhes dos atores
- ✅ Layout responsivo em grid

### 🎮 Página de Extras (`extras.html`)
- ✅ História do jogo original
- ✅ Mecânicas de gameplay
- ✅ Elenco do jogo em tabela
- ✅ Legado e impacto cultural

### 🎬 Sistema de Trailer
- ✅ Player do YouTube integrado
- ✅ Loading states
- ✅ Tratamento de erros
- ✅ Estatísticas de engajamento
- ✅ Design customizado

---

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (recomendado para desenvolvimento)

### Execução Local
1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/until-dawn-website.git
   cd until-dawn-website
   ```

2. **Execute com um servidor local**
   ```bash
   # Com Python 3
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   
   # Com PHP
   php -S localhost:8000
   ```

3. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

### Estrutura de Desenvolvimento
```html
<!-- Desenvolvimento Local -->
<link rel="stylesheet" href="./style/style.css">
<script src="./style/script.js"></script>

<!-- Produção (exemplo) -->
<link rel="stylesheet" href="./style/style.min.css">
<script src="./style/script.min.js"></script>
```

---

## 📱 Responsividade

O site é totalmente responsivo com breakpoints estratégicos:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px  
- **Mobile Large**: 480px - 768px
- **Mobile Small**: < 480px

### Características Responsivas
- ✅ Layout adaptativo com CSS Grid e Flexbox
- ✅ Imagens otimizadas com `loading="lazy"`
- ✅ Tipografia escalável
- ✅ Menu de navegação mobile-friendly
- ✅ Touch gestures para dispositivos móveis

---

## ♿ Acessibilidade

### Recursos Implementados
- **Redução de Movimento**: Suporte a `prefers-reduced-motion`
- **Navegação por Teclado**: Estados `:focus` visíveis
- **Contraste de Cores**: Texto legível em todos os fundos
- **HTML Semântico**: Estrutura significativa para leitores de tela
- **Alt Text**: Descrições para todas as imagens

### Exemplo de Implementação
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 🎯 Otimizações de Performance

### Técnicas Aplicadas
1. **Lazy Loading**: Imagens carregam sob demanda
2. **Debounced Events**: Scroll e resize otimizados
3. **CSS Will-Change**: Animações aceleradas por GPU
4. **Minificação**: Código otimizado para produção
5. **Caching Estratégico**: Recursos estáticos cacheados

### Métricas Alvo
- ⏱️ **First Contentful Paint**: < 1.5s
- ⚡ **Largest Contentful Paint**: < 2.5s  
- 🔄 **Time to Interactive**: < 3s
- 📊 **Performance Score**: > 90/100

---

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Imagens não carregam**
   - Verifique os caminhos no diretório `images/`
   - Confirme os nomes dos arquivos (case-sensitive)

2. **Efeitos não funcionam**
   - Certifique-se que o JavaScript está habilitado
   - Verifique o console do navegador por erros

3. **Layout quebrado em mobile**
   - Limpe o cache do navegador
   - Verifique as media queries no CSS

4. **Trailer não carrega**
   - Verifique conexão com internet
   - YouTube pode estar bloqueado em algumas redes

### Debugging
```javascript
// Ative o modo debug no console
localStorage.setItem('debug', 'true');

// Métricas disponíveis no console
console.log('🔮 Until Dawn - Debug Mode Activated');
```

---

## 📈 Próximas Melhorias

### Planejadas para V2.0
- [ ] **Sistema de Comentários**: Integração com API
- [ ] **Galeria de Imagens**: Lightbox e carousel
- [ ] **Modo Escuro/Claro**: Toggle de temas
- [ ] **Internacionalização**: Suporte a múltiplos idiomas
- [ ] **PWA**: Funcionalidades offline
- [ ] **Blog Integrado**: Notícias e atualizações

### Melhorias Técnicas
- [ ] **WebP Images**: Formatos modernos de imagem
- [ ] **Service Worker**: Cache avançado
- [ ] **Analytics**: Tracking de usuários
- [ ] **CDN**: Entrega otimizada de recursos

---

## 👨‍💻 Desenvolvimento

### Autora
**Ana**  
📧 ana.ct2006@aluno.ifsc.edu.br  
📍 São José, SC - Brasil

### Disciplina
**Front-End I**  
Instituto Federal de Santa Catarina (IFSC)  
2025 - Segundo Semestre

### Créditos
- **Jogo Original**: Supermassive Games
- **Produção**: PlayStation Productions  
- **Design Inspirado**: Estética de terror psicológico
- **Imagens**: Unsplash e materiais promocionais

---

## 📄 Licença

Este projeto é desenvolvido para fins **acadêmicos** como parte da disciplina de Front-End I. Todo o conteúdo sobre *Until Dawn* é propriedade de seus respectivos detentores de direitos autorais.

### Direitos Autorais
- ⚠️ **Until Dawn**™ é uma marca registrada da **Supermassive Games**
- 🎮 Conteúdo do jogo usado para fins educacionais
- 🎬 Adaptação cinematográfica é uma criação fictícia para este projeto

### Uso Educacional
Este projeto pode ser usado como referência para:
- Estudos de desenvolvimento front-end
- Exemplos de HTML5, CSS3 e JavaScript
- Padrões de design responsivo
- Boas práticas de acessibilidade


<div align="center">


[🏠 Página Inicial](./index.html) • 
[👥 Elenco](./elenco.html) • 
[🎮 Extras](./extras.html)

</div>