const LearningSystem = {
    data: null,
    searchIndex: [],
    tocVisible: false,
    currentView: 'home',
    currentBook: null,
    currentDocId: null,
    expandedChapters: new Set(),
    tocScrollObserver: null,
    
    async init() {
        await this.loadData();
        this.renderHomePage();
        this.bindEvents();
        this.setupMarked();
        this.setupHistoryHandler();
        this.handleHashChange();
    },
    
    async loadData() {
        try {
            const response = await fetch('./src/data/index.json');
            this.data = await response.json();
            this.buildSearchIndex();
            this.loadDocumentContents();
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    },
    
    async loadDocumentContents() {
        this.documentCache = {};
        
        const loadPromises = this.searchIndex.slice(0, 30).map(async (item) => {
            try {
                const response = await fetch(item.path);
                if (response.ok) {
                    const content = await response.text();
                    // 提取文档中的关键内容（前1000字符和标题）
                    const lines = content.split('\n');
                    const previewLines = [];
                    let inCodeBlock = false;
                    
                    for (const line of lines) {
                        if (line.startsWith('```')) {
                            inCodeBlock = !inCodeBlock;
                            continue;
                        }
                        if (!inCodeBlock && line.trim() && !line.startsWith('#')) {
                            previewLines.push(line.trim());
                        }
                        if (previewLines.length >= 10) break;
                    }
                    
                    this.documentCache[item.id] = {
                        content: content.toLowerCase(),
                        preview: previewLines.join(' ').substring(0, 300)
                    };
                }
            } catch (e) {
                // 忽略加载失败的文档
            }
        });
        
        await Promise.all(loadPromises);
    },
    
    buildSearchIndex() {
        this.searchIndex = [];
        const tagsSet = new Set();
        let totalDocs = 0;
        
        this.data.books.forEach(book => {
            book.chapters.forEach(chapter => {
                chapter.items.forEach(item => {
                    this.searchIndex.push({
                        ...item,
                        type: 'document',
                        bookId: book.id,
                        bookTitle: book.title,
                        chapterId: chapter.id,
                        chapterName: chapter.name
                    });
                    totalDocs++;
                    
                    if (item.tags) {
                        item.tags.forEach(tag => tagsSet.add(tag));
                    }
                });
            });
        });
        
        document.getElementById('totalBooks').textContent = this.data.books.length;
        document.getElementById('totalDocs').textContent = totalDocs;
        document.getElementById('totalTags').textContent = tagsSet.size;
    },
    
    renderHomePage() {
        const grid = document.getElementById('booksGrid');
        if (!grid || !this.data) return;
        
        grid.innerHTML = this.data.books.map(book => {
            const chapterCount = book.chapters.length;
            const docCount = book.chapters.reduce((sum, ch) => sum + ch.items.length, 0);
            
            return `
                <div class="book-card" data-book="${book.id}">
                    <div class="book-icon">${book.icon}</div>
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-desc">${book.description}</p>
                    <div class="book-meta">
                        <span class="book-chapters">${chapterCount} 章节</span>
                        <span class="book-docs">${docCount} 文档</span>
                    </div>
                    <div class="book-author">作者：${book.author}</div>
                </div>
            `;
        }).join('');
    },
    
    renderNavigation() {
        const container = document.getElementById('chapterList');
        const titleEl = document.getElementById('navBookTitle');
        const currentBookEl = document.getElementById('currentBook');
        
        if (!container || !this.currentBook) return;
        
        const book = this.data.books.find(b => b.id === this.currentBook);
        if (!book) return;
        
        titleEl.textContent = book.title;
        currentBookEl.innerHTML = `<span class="book-badge">${book.icon} ${book.title}</span>`;
        
        container.innerHTML = book.chapters.map(chapter => `
            <li class="nav-chapter">
                <div class="nav-chapter-header" data-chapter="${chapter.id}">
                    <span class="nav-chapter-title">${chapter.icon} ${chapter.name}</span>
                    <span class="nav-chapter-count">${chapter.items.length}</span>
                </div>
                <ul class="nav-items ${this.expandedChapters.has(chapter.id) ? 'expanded' : ''}">
                    ${chapter.items.map(item => `
                        <li class="nav-item ${this.currentDocId === item.id ? 'active' : ''}" data-id="${item.id}" data-path="${item.path}">
                            ${item.title}
                        </li>
                    `).join('')}
                </ul>
            </li>
        `).join('');
    },
    
    setupHistoryHandler() {
        window.addEventListener('popstate', (e) => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                const item = this.searchIndex.find(i => i.id === hash);
                if (item) {
                    if (this.currentBook !== item.bookId) {
                        this.openBookView(item.bookId, false);
                        setTimeout(() => {
                            this.expandedChapters.add(item.chapterId);
                            this.renderNavigation();
                            this.loadDocument(item.id, item.path, false);
                        }, 100);
                    } else {
                        this.expandedChapters.add(item.chapterId);
                        this.renderNavigation();
                        this.loadDocument(item.id, item.path, false);
                    }
                }
            } else {
                this.showHomeView(false);
            }
        });
    },
    
    bindEvents() {
        document.getElementById('booksGrid').addEventListener('click', (e) => {
            const card = e.target.closest('.book-card');
            if (card) {
                this.openBookView(card.dataset.book);
            }
        });
        
        document.getElementById('totalBooks').addEventListener('click', () => {
            this.showBooksModal();
        });
        
        document.getElementById('totalDocs').addEventListener('click', () => {
            this.showDocsModal();
        });
        
        document.getElementById('totalTags').addEventListener('click', () => {
            this.showTagsModal();
        });
        
        document.getElementById('homeSearchBtn').addEventListener('click', () => {
            const query = document.getElementById('homeSearchInput').value;
            this.openSearchModal(query);
        });
        
        document.getElementById('homeSearchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value;
                this.openSearchModal(query);
            }
        });
        
        document.getElementById('backToHome').addEventListener('click', (e) => {
            e.preventDefault();
            this.showHomeView();
        });
        
        document.getElementById('sidebarBackHome').addEventListener('click', (e) => {
            e.preventDefault();
            this.showHomeView();
        });
        
        document.getElementById('chapterList').addEventListener('click', (e) => {
            const header = e.target.closest('.nav-chapter-header');
            const item = e.target.closest('.nav-item');
            
            if (header) {
                this.toggleChapter(header.dataset.chapter);
            } else if (item) {
                this.loadDocument(item.dataset.id, item.dataset.path);
            }
        });
        
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.openSearchModal();
        });
        
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.openSearchModal();
            }
        });
        
        document.getElementById('searchInput').addEventListener('focus', () => {
            this.openSearchModal();
        });
        
        document.getElementById('closeSearchModal').addEventListener('click', () => {
            this.closeSearchModal();
        });
        
        document.getElementById('searchModal').addEventListener('click', (e) => {
            if (e.target.id === 'searchModal') {
                this.closeSearchModal();
            }
        });
        
        let searchTimeout;
        document.getElementById('modalSearchInput').addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
        
        document.getElementById('toggleToc').addEventListener('click', () => {
            this.toggleToc();
        });
        
        document.getElementById('backTop').addEventListener('click', () => {
            document.getElementById('contentBody').scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            this.toggleSidebar();
        });
        
        document.getElementById('sidebarOverlay').addEventListener('click', () => {
            this.closeSidebar();
        });
        
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSearchModal();
                this.closeListModal();
                this.closeDemoModal();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearchModal();
            }
        });
    },
    
    showHomeView(pushState = true) {
        document.getElementById('homeView').classList.remove('hidden');
        document.getElementById('bookView').classList.add('hidden');
        this.currentView = 'home';
        this.currentBook = null;
        if (pushState) {
            history.pushState(null, '', '#');
        }
    },
    
    openBookView(bookId, pushState = true) {
        document.getElementById('homeView').classList.add('hidden');
        document.getElementById('bookView').classList.remove('hidden');
        this.currentView = 'book';
        this.currentBook = bookId;
        
        this.expandedChapters.clear();
        this.renderNavigation();
        
        const book = this.data.books.find(b => b.id === bookId);
        if (book && book.chapters.length > 0 && book.chapters[0].items.length > 0) {
            const firstItem = book.chapters[0].items[0];
            this.expandedChapters.add(book.chapters[0].id);
            this.renderNavigation();
            this.loadDocument(firstItem.id, firstItem.path, pushState);
        }
    },
    
    toggleChapter(chapterId) {
        if (this.expandedChapters.has(chapterId)) {
            this.expandedChapters.delete(chapterId);
        } else {
            this.expandedChapters.add(chapterId);
        }
        this.renderNavigation();
    },
    
    async loadDocument(id, path, pushState = true, searchQuery = null) {
        const contentBody = document.getElementById('contentBody');
        contentBody.innerHTML = '<div class="loading"></div>';
        
        this.currentDocId = id;
        
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
        });
        const activeItem = document.querySelector(`.nav-item[data-id="${id}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        this.closeSidebar();
        
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error('Document not found');
            const markdown = await response.text();
            this.renderDocument(markdown, id, searchQuery);
            this.updateBreadcrumb(id);
            if (pushState) {
                history.pushState({ docId: id }, '', `#${id}`);
            }
        } catch (error) {
            console.error('Failed to load document:', error);
            this.showError('文档加载失败，请检查文件是否存在');
        }
    },
    
    renderDocument(markdown, id, searchQuery = null) {
        const contentBody = document.getElementById('contentBody');
        
        const processedMarkdown = markdown.replace(/^(#{1,6}\s+.+?)\s*\{#([a-zA-Z0-9_-]+)\}\s*$/gm, (match, heading, anchorId) => {
            return `${heading}\n<a id="${anchorId.toLowerCase()}"></a>`;
        });
        
        const processedMarkdown2 = processedMarkdown.replace(/([^\n])\{#([a-zA-Z0-9_-]+)\}/g, (match, prefix, anchorId) => {
            return `${prefix}<a id="${anchorId.toLowerCase()}"></a>`;
        });
        
        const html = marked.parse(processedMarkdown2);
        
        contentBody.innerHTML = `<div class="article-content">${html}</div>`;
        
        this.processCodeBlocks();
        this.generateToc();
        this.processInternalLinks();
        this.processAnchorLinks();
        this.initInteractiveDemos();
        
        if (searchQuery) {
            setTimeout(() => {
                this.scrollToSearchResult(searchQuery);
            }, 100);
        }
    },
    
    scrollToSearchResult(query) {
        const contentBody = document.getElementById('contentBody');
        const queryLower = query.toLowerCase();
        
        // 查找所有文本节点
        const walker = document.createTreeWalker(
            contentBody,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let firstMatch = null;
        let node;
        
        while (node = walker.nextNode()) {
            if (node.textContent.toLowerCase().includes(queryLower)) {
                firstMatch = node;
                break;
            }
        }
        
        if (firstMatch) {
            const range = document.createRange();
            range.selectNode(firstMatch);
            
            const rect = range.getBoundingClientRect();
            const containerRect = contentBody.getBoundingClientRect();
            
            // 计算相对位置并滚动
            const scrollTop = rect.top - containerRect.top + contentBody.scrollTop - 100;
            contentBody.scrollTo({ top: scrollTop, behavior: 'smooth' });
            
            // 高亮匹配的元素
            const parentElement = firstMatch.parentElement;
            if (parentElement) {
                parentElement.style.backgroundColor = '#fef08a';
                parentElement.style.transition = 'background-color 0.5s';
                setTimeout(() => {
                    parentElement.style.backgroundColor = '';
                }, 2000);
            }
        }
    },
    
    processCodeBlocks() {
        document.querySelectorAll('.article-content pre code').forEach(block => {
            if (!block.closest('.demo-container')) {
                hljs.highlightElement(block);
            }
        });
    },
    
    generateToc() {
        const tocList = document.getElementById('tocList');
        const headings = document.querySelectorAll('.article-content h2, .article-content h3, .article-content h4');
        
        if (headings.length === 0) {
            this.hideToc();
            return;
        }
        
        tocList.innerHTML = Array.from(headings).map((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            const level = heading.tagName.toLowerCase();
            return `
                <div class="toc-item">
                    <a href="#${id}" class="toc-link ${level}" data-heading-id="${id}">${heading.textContent}</a>
                </div>
            `;
        }).join('');
        
        this.setupTocScrollSync();
        
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            this.showToc();
        }
    },
    
    setupTocScrollSync() {
        if (this.tocScrollObserver) {
            this.tocScrollObserver.disconnect();
        }
        
        const tocList = document.getElementById('tocList');
        const tocLinks = tocList.querySelectorAll('.toc-link');
        const contentBody = document.getElementById('contentBody');
        const headings = document.querySelectorAll('.article-content h2, .article-content h3, .article-content h4');
        
        if (headings.length === 0) return;
        
        const observerOptions = {
            root: contentBody,
            rootMargin: '-80px 0px -70% 0px',
            threshold: 0
        };
        
        let currentActiveId = null;
        
        this.tocScrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (currentActiveId !== id) {
                        currentActiveId = id;
                        this.highlightTocItem(id);
                    }
                }
            });
        }, observerOptions);
        
        headings.forEach(heading => {
            this.tocScrollObserver.observe(heading);
        });
        
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const headingId = link.dataset.headingId;
                const heading = document.getElementById(headingId);
                if (heading) {
                    const contentBody = document.getElementById('contentBody');
                    const headingRect = heading.getBoundingClientRect();
                    const containerRect = contentBody.getBoundingClientRect();
                    const scrollTop = contentBody.scrollTop + headingRect.top - containerRect.top - 80;
                    contentBody.scrollTo({ top: scrollTop, behavior: 'smooth' });
                    this.highlightTocItem(headingId);
                    
                    if (window.innerWidth <= 768) {
                        this.hideToc();
                    }
                }
            });
        });
        
        contentBody.addEventListener('scroll', () => {
            this.syncTocScroll();
        }, { passive: true });
    },
    
    highlightTocItem(headingId) {
        const tocList = document.getElementById('tocList');
        tocList.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = tocList.querySelector(`.toc-link[data-heading-id="${headingId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            this.syncTocScroll();
        }
    },
    
    syncTocScroll() {
        const tocPanel = document.getElementById('tocPanel');
        const tocList = document.getElementById('tocList');
        const activeLink = tocList.querySelector('.toc-link.active');
        if (activeLink && tocPanel) {
            const panelRect = tocPanel.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            
            if (linkRect.top < panelRect.top + 50) {
                tocPanel.scrollTo({
                    top: activeLink.offsetTop - 50,
                    behavior: 'smooth'
                });
            } else if (linkRect.bottom > panelRect.bottom - 20) {
                tocPanel.scrollTo({
                    top: activeLink.offsetTop - panelRect.height + linkRect.height + 20,
                    behavior: 'smooth'
                });
            }
        }
    },
    
    processInternalLinks() {
        document.querySelectorAll('.article-content a[href^="../"]').forEach(link => {
            const href = link.getAttribute('href');
            const newPath = href.replace(/^\.\.\//, '');
            
            const item = this.searchIndex.find(i => i.path === newPath || i.path.endsWith(newPath));
            if (item) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (item.bookId !== this.currentBook) {
                        this.openBookView(item.bookId);
                        setTimeout(() => {
                            this.loadDocument(item.id, item.path);
                        }, 100);
                    } else {
                        this.loadDocument(item.id, item.path);
                    }
                });
            }
        });
    },
    
    processAnchorLinks() {
        document.querySelectorAll('.article-content a[href^="#"]').forEach(link => {
            const href = link.getAttribute('href');
            const anchorId = href.substring(1).toLowerCase();
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // 尝试多种方式查找锚点
                let anchor = document.getElementById(anchorId);
                
                // 如果找不到，尝试查找包含该文本的标题
                if (!anchor) {
                    const headings = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6');
                    for (const heading of headings) {
                        const headingText = heading.textContent.toLowerCase().replace(/\s*\{#[^}]+\}\s*$/, '').trim();
                        if (headingText.includes(anchorId) || anchorId.includes(headingText.replace('@', ''))) {
                            anchor = heading;
                            break;
                        }
                    }
                }
                
                if (anchor) {
                    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // 高亮一下目标元素
                    anchor.style.backgroundColor = '#fef08a';
                    setTimeout(() => {
                        anchor.style.backgroundColor = '';
                        anchor.style.transition = 'background-color 0.5s';
                    }, 1000);
                } else {
                    console.warn('Anchor not found:', anchorId);
                }
            });
        });
    },
    
    initInteractiveDemos() {
        document.querySelectorAll('.demo-container').forEach(container => {
            const runBtn = container.querySelector('.demo-run-btn');
            const resetBtn = container.querySelector('.demo-reset-btn');
            const preEl = container.querySelector('.demo-code pre');
            const previewEl = container.querySelector('.demo-preview');
            
            if (runBtn && preEl) {
                runBtn.onclick = null;
                runBtn.addEventListener('click', () => {
                    const code = preEl.textContent || preEl.innerText;
                    const previewHtml = previewEl ? previewEl.innerHTML : '';
                    this.openDemoModal(code, previewHtml);
                });
            }
            
            if (resetBtn && previewEl) {
                resetBtn.onclick = null;
                resetBtn.addEventListener('click', () => {
                    this.resetDemoPreview(container, previewEl);
                });
            }
        });
        
        this.addRunButtonsToCodeBlocks();
    },
    
    addRunButtonsToCodeBlocks() {
        document.querySelectorAll('.article-content pre code.language-javascript').forEach(codeEl => {
            if (codeEl.closest('.demo-container')) return;
            if (codeEl.closest('.demo-modal-code')) return;
            
            const preEl = codeEl.closest('pre');
            if (!preEl) return;
            
            if (preEl.querySelector('.code-run-btn')) return;
            
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            preEl.parentNode.insertBefore(wrapper, preEl);
            wrapper.appendChild(preEl);
            
            const runBtn = document.createElement('button');
            runBtn.className = 'code-run-btn';
            runBtn.textContent = '▶ 运行';
            runBtn.onclick = () => {
                const code = preEl.textContent || preEl.innerText;
                const previewHtml = this.generatePreviewElements(code);
                this.openDemoModal(code, previewHtml);
            };
            wrapper.appendChild(runBtn);
        });
    },
    
    generatePreviewElements(code) {
        const selectors = new Set();
        
        const classMatches = code.match(/\.([a-zA-Z_][a-zA-Z0-9_-]*)/g) || [];
        classMatches.forEach(m => selectors.add(m));
        
        const idMatches = code.match(/#([a-zA-Z_][a-zA-Z0-9_-]*)/g) || [];
        idMatches.forEach(m => selectors.add(m));
        
        const ignoredSelectors = ['.gsap', '.to', '.from', '.fromTo', '.set', '.timeline', 
            '.play', '.pause', '.resume', '.reverse', '.restart', '.kill', '.progress',
            '.duration', '.timeScale', '.repeat', '.yoyo', '.ease', '.stagger', '.call',
            '.then', '.invalidate', '.clear', '.isActive', '.time', '.totalTime',
            '.totalDuration', '.repeatDelay', '.delay', '.eventCallback', '.tweenTo',
            '.tweenFromTo', '.seek', '.startTime', '.endTime', '.paused', '.reversed',
            '.each', '.from', '.amount', '.grid', '.axis', '.text', '.split', '.map',
            '.join', '.innerHTML', '.textContent', '.querySelector', '.querySelectorAll',
            '.addEventListener', '.length', '.push', '.forEach', '.filter',
            '.ScrollTrigger', '.batch', '.matchMedia', '.add', '.invalidate',
            '.getTotalLength', '.strokeDasharray', '.strokeDashoffset', '.attr',
            '.drawSVG', '.motionPath', '.align', '.alignOrigin', '.path'];
        
        const elements = [];
        const addedSelectors = new Set();
        
        const hasStagger = /\bstagger\s*[,:]/i.test(code);
        const hasTextAnimation = /\.text\s*(span|\.span)/i.test(code) || /text\.textContent\.split/i.test(code);
        const hasGrid = /\bgrid\s*:\s*\[/i.test(code);
        const hasScrollTrigger = /ScrollTrigger/i.test(code);
        const hasBatch = /\.batch\s*\(/i.test(code);
        const hasSVG = /svg|circle|rect|path|line|polygon|ellipse|stroke|fill|attr\s*:|motionPath|drawSVG/i.test(code);
        
        if (hasTextAnimation) {
            elements.push('<div class="demo-text" id="text">Hello GSAP</div>');
        }
        
        if (hasSVG && !hasTextAnimation) {
            const svgElements = this.generateSVGElements(code);
            if (svgElements) {
                elements.push(svgElements);
            }
        }
        
        selectors.forEach(selector => {
            if (ignoredSelectors.some(ignored => selector.startsWith(ignored))) return;
            if (hasTextAnimation && selector === '.span') return;
            if (addedSelectors.has(selector)) return;
            if (hasSVG && (selector === '#path' || selector === '.path')) return;
            
            const className = selector.startsWith('.') ? selector.slice(1) : null;
            const id = selector.startsWith('#') ? selector.slice(1) : null;
            
            if (className || id) {
                addedSelectors.add(selector);
                
                let count = 1;
                if (hasStagger || hasBatch) {
                    if (hasGrid) {
                        const gridMatch = code.match(/grid\s*:\s*\[\s*(\d+)\s*,\s*(\d+)\s*\]/);
                        if (gridMatch) {
                            count = parseInt(gridMatch[1]) * parseInt(gridMatch[2]);
                        } else {
                            count = 12;
                        }
                    } else {
                        count = 5;
                    }
                }
                
                if (count > 1 && className) {
                    for (let i = 1; i <= count; i++) {
                        elements.push(`<div class="demo-box ${className}">${i}</div>`);
                    }
                } else if (!hasSVG) {
                    const classAttr = className ? `class="demo-box ${className}"` : 'class="demo-box"';
                    const idAttr = id ? `id="${id}"` : '';
                    elements.push(`<div ${classAttr} ${idAttr}>GSAP</div>`);
                }
            }
        });
        
        if (elements.length === 0 && !hasSVG) {
            elements.push('<div class="demo-box" id="demo-box">GSAP</div>');
        }
        
        const has3D = /\b(z|rotationX|rotationY|rotationZ|perspective|transformOrigin|transformPerspective)\s*[,:]/i.test(code);
        const styleAttr = has3D ? 'style="perspective: 800px;"' : '';
        
        const hasControls = /\b(pause|play|reverse|restart|seek|timeScale)\s*\(/i.test(code) && !hasScrollTrigger;
        const controlButtons = hasControls ? `
            <div class="demo-control-buttons">
                <button onclick="window.demoTween?.play()">▶ 播放</button>
                <button onclick="window.demoTween?.pause()">⏸ 暂停</button>
                <button onclick="window.demoTween?.reverse()">↺ 反向</button>
                <button onclick="window.demoTween?.restart()">↻ 重播</button>
            </div>` : '';
        
        const scrollTriggerNote = hasScrollTrigger ? '<div class="demo-note">⚠️ ScrollTrigger 需要滚动容器才能完整演示</div>' : '';
        const svgNote = hasSVG ? '<div class="demo-note">💡 SVG 动画演示 - 元素已自动生成</div>' : '';
        
        return `<div class="demo-boxes" ${styleAttr}>${elements.join('\n    ')}</div>${controlButtons}${scrollTriggerNote}${svgNote}`;
    },
    
    generateSVGElements(code) {
        let svgContent = '';
        
        if (/circle/i.test(code)) {
            svgContent += `<circle id="circle" cx="60" cy="60" r="40" fill="#667eea" stroke="#764ba2" stroke-width="2"/>`;
        }
        
        if (/rect/i.test(code)) {
            svgContent += `<rect id="rect" x="20" y="20" width="80" height="80" fill="#667eea" stroke="#764ba2" stroke-width="2" rx="5"/>`;
        }
        
        if (/\bpath\b/i.test(code) || /motionPath/i.test(code)) {
            svgContent += `
            <path id="path" d="M 20 80 Q 100 20 180 80" fill="none" stroke="#764ba2" stroke-width="2" stroke-dasharray="5,5"/>
            <circle class="motion-dot" cx="20" cy="80" r="8" fill="#667eea"/>`;
        }
        
        if (/line/i.test(code)) {
            svgContent += `<line id="line" x1="20" y1="100" x2="180" y2="20" stroke="#667eea" stroke-width="3"/>`;
        }
        
        if (/ellipse/i.test(code)) {
            svgContent += `<ellipse id="ellipse" cx="100" cy="60" rx="80" ry="40" fill="#667eea" stroke="#764ba2" stroke-width="2"/>`;
        }
        
        if (/polygon/i.test(code)) {
            svgContent += `<polygon id="polygon" points="100,20 180,80 100,140 20,80" fill="#667eea" stroke="#764ba2" stroke-width="2"/>`;
        }
        
        if (!svgContent) {
            svgContent = `<circle id="circle" cx="60" cy="60" r="40" fill="#667eea" stroke="#764ba2" stroke-width="2"/>`;
        }
        
        return `<svg id="svg" viewBox="0 0 200 140" width="200" height="140" style="background: rgba(255,255,255,0.1); border-radius: 8px;">${svgContent}</svg>`;
    },
    
    openDemoModal(code, previewHtml) {
        let modal = document.getElementById('demoModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'demoModal';
            modal.className = 'demo-modal';
            modal.innerHTML = `
                <div class="demo-modal-content">
                    <div class="demo-modal-header">
                        <h3>GSAP 动画演示</h3>
                        <button class="demo-modal-close" onclick="LearningSystem.closeDemoModal()">×</button>
                    </div>
                    <div class="demo-modal-preview" id="demoModalPreview"></div>
                    <div class="demo-modal-code">
                        <pre><code id="demoModalCode"></code></pre>
                    </div>
                    <div class="demo-modal-controls">
                        <button class="demo-modal-run" onclick="LearningSystem.runDemoModalCode()">▶ 运行代码</button>
                        <button class="demo-modal-reset" onclick="LearningSystem.resetDemoModal()">↺ 重置</button>
                    </div>
                    <div class="demo-modal-console" id="demoModalConsole"></div>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeDemoModal();
                }
            });
        }
        
        const previewEl = document.getElementById('demoModalPreview');
        const codeEl = document.getElementById('demoModalCode');
        
        previewEl.innerHTML = previewHtml;
        codeEl.textContent = code;
        
        modal.classList.add('visible');
        
        this.resetDemoModal();
    },
    
    closeDemoModal() {
        const modal = document.getElementById('demoModal');
        if (modal) {
            this.resetDemoModal();
            modal.classList.remove('visible');
        }
    },
    
    runDemoModalCode() {
        const codeEl = document.getElementById('demoModalCode');
        const previewEl = document.getElementById('demoModalPreview');
        const consoleEl = document.getElementById('demoModalConsole');
        
        if (!codeEl || !previewEl) return;
        
        this.resetDemoModal();
        
        let code = codeEl.textContent.trim();
        
        if (/\btarget\b/.test(code) && !/\btarget\s*=/.test(code) && !/["']#?target["']/.test(code) && !/["']\.?target["']/.test(code)) {
            this.logDemoModalMessage('这是语法示例，不可执行', 'error');
            return;
        }
        
        if (!/gsap\.(to|from|fromTo|set|timeline)/i.test(code)) {
            if (/^\s*stagger\s*:/i.test(code) || /^\s*\{[\s\S]*stagger[\s\S]*\}/i.test(code)) {
                this.logDemoModalMessage('这是配置片段，请查看完整示例', 'error');
                return;
            }
            if (/^\s*\w+\s*:\s*[\s\S]*$/i.test(code) && !/function|const|let|var/.test(code)) {
                this.logDemoModalMessage('这是配置片段，请查看完整示例', 'error');
                return;
            }
        }
        
        if (/ScrollTrigger/i.test(code) && !/scrollTrigger\s*:/i.test(code)) {
            this.logDemoModalMessage('⚠️ ScrollTrigger 需要页面滚动才能触发', 'info');
        }
        
        const hasTweenAssignment = /\b(const|let|var)\s+tween\s*=/i.test(code);
        const hasTimelineAssignment = /\b(const|let|var)\s+tl\s*=/i.test(code);
        const hasPausedTimeline = /paused\s*:\s*true/i.test(code);
        const hasMultipleGSAPCalls = (code.match(/gsap\.(to|from|fromTo|set)\s*\(/g) || []).length > 1;
        
        if (!hasTweenAssignment && !hasTimelineAssignment) {
            const gsapCallMatch = code.match(/gsap\.(to|from|fromTo|timeline)\s*\(/);
            if (gsapCallMatch && !hasMultipleGSAPCalls) {
                code = `window.demoTween = ${code}`;
            }
        } else {
            code = code.replace(/\b(const|let|var)\s+(tween|tl)\s*=/gi, 'window.demoTween =');
        }
        
        try {
            if (typeof gsap !== 'undefined' && gsap.registerPlugin && typeof MotionPathPlugin !== 'undefined') {
                gsap.registerPlugin(MotionPathPlugin);
            }
            
            const func = new Function(code);
            func.call(window);
            
            if (hasPausedTimeline && window.demoTween && window.demoTween.play) {
                setTimeout(() => {
                    window.demoTween.play();
                }, 100);
            }
            
            this.logDemoModalMessage('代码执行成功!', 'success');
        } catch (error) {
            this.logDemoModalMessage('错误: ' + error.message, 'error');
        }
    },
    
    resetDemoModal() {
        const previewEl = document.getElementById('demoModalPreview');
        const consoleEl = document.getElementById('demoModalConsole');
        
        if (window.demoTween) {
            if (typeof gsap !== 'undefined') {
                gsap.killTweensOf(window.demoTween);
            }
            window.demoTween = null;
        }
        
        if (previewEl) {
            const boxes = previewEl.querySelectorAll('.demo-box');
            boxes.forEach(box => {
                if (typeof gsap !== 'undefined') {
                    gsap.killTweensOf(box);
                    gsap.set(box, {
                        clearProps: 'all',
                        x: 0,
                        y: 0,
                        z: 0,
                        rotation: 0,
                        rotationX: 0,
                        rotationY: 0,
                        scale: 1,
                        opacity: 1
                    });
                }
            });
        }
        
        if (consoleEl) {
            consoleEl.innerHTML = '';
        }
    },
    
    logDemoModalMessage(message, type = 'info') {
        const consoleEl = document.getElementById('demoModalConsole');
        if (!consoleEl) return;
        
        const line = document.createElement('div');
        line.className = 'demo-console-line' + (type === 'error' ? ' error' : type === 'success' ? ' success' : ' info');
        line.textContent = '> ' + message;
        consoleEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.scrollHeight;
    },
    
    updateBreadcrumb(id) {
        const breadcrumb = document.getElementById('breadcrumb');
        const item = this.searchIndex.find(i => i.id === id);
        
        if (item) {
            breadcrumb.innerHTML = `
                <a href="#" class="breadcrumb-item" id="breadcrumbHome">书架</a>
                <span class="breadcrumb-item">${item.bookTitle}</span>
                <span class="breadcrumb-item">${item.chapterName}</span>
                <span class="breadcrumb-item">${item.title}</span>
            `;
            
            document.getElementById('breadcrumbHome').addEventListener('click', (e) => {
                e.preventDefault();
                this.showHomeView();
            });
        }
    },
    
    handleHashChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const item = this.searchIndex.find(i => i.id === hash);
            if (item) {
                if (item.bookId !== this.currentBook) {
                    this.openBookView(item.bookId, false);
                    setTimeout(() => {
                        this.expandedChapters.add(item.chapterId);
                        this.renderNavigation();
                        this.loadDocument(item.id, item.path, false);
                    }, 100);
                } else {
                    this.expandedChapters.add(item.chapterId);
                    this.renderNavigation();
                    this.loadDocument(item.id, item.path, false);
                }
            }
        }
    },
    
    showBooksModal() {
        const modal = this.createListModal('书籍列表');
        const content = modal.querySelector('.list-modal-content');
        
        content.innerHTML = this.data.books.map(book => `
            <div class="list-item book-list-item" data-book="${book.id}">
                <span class="list-icon">${book.icon}</span>
                <div class="list-info">
                    <div class="list-title">${book.title}</div>
                    <div class="list-desc">${book.description}</div>
                </div>
                <span class="list-count">${book.chapters.reduce((sum, ch) => sum + ch.items.length, 0)} 文档</span>
            </div>
        `).join('');
        
        content.querySelectorAll('.book-list-item').forEach(el => {
            el.addEventListener('click', () => {
                this.closeListModal();
                this.openBookView(el.dataset.book);
            });
        });
    },
    
    showDocsModal() {
        const modal = this.createListModal('文档列表');
        const content = modal.querySelector('.list-modal-content');
        
        const allDocs = this.searchIndex.slice(0, 50);
        
        content.innerHTML = allDocs.map(item => `
            <div class="list-item doc-list-item" data-id="${item.id}" data-path="${item.path}" data-book="${item.bookId}">
                <span class="list-icon">📄</span>
                <div class="list-info">
                    <div class="list-title">${item.title}</div>
                    <div class="list-desc">${item.bookTitle} / ${item.chapterName}</div>
                </div>
            </div>
        `).join('');
        
        content.querySelectorAll('.doc-list-item').forEach(el => {
            el.addEventListener('click', () => {
                this.closeListModal();
                if (el.dataset.book !== this.currentBook) {
                    this.openBookView(el.dataset.book);
                    setTimeout(() => {
                        this.loadDocument(el.dataset.id, el.dataset.path);
                    }, 100);
                } else {
                    this.loadDocument(el.dataset.id, el.dataset.path);
                }
            });
        });
    },
    
    showTagsModal() {
        const modal = this.createListModal('标签列表');
        const content = modal.querySelector('.list-modal-content');
        
        const tagsMap = {};
        this.searchIndex.forEach(item => {
            if (item.tags) {
                item.tags.forEach(tag => {
                    if (!tagsMap[tag]) {
                        tagsMap[tag] = [];
                    }
                    tagsMap[tag].push(item);
                });
            }
        });
        
        const sortedTags = Object.entries(tagsMap).sort((a, b) => b[1].length - a[1].length);
        
        content.innerHTML = sortedTags.map(([tag, items]) => `
            <div class="list-item tag-list-item" data-tag="${tag}">
                <span class="list-icon">🏷️</span>
                <div class="list-info">
                    <div class="list-title">${tag}</div>
                    <div class="list-desc">相关文档：${items.slice(0, 3).map(i => i.title).join('、')}${items.length > 3 ? '...' : ''}</div>
                </div>
                <span class="list-count">${items.length}</span>
            </div>
        `).join('');
        
        content.querySelectorAll('.tag-list-item').forEach(el => {
            el.addEventListener('click', () => {
                const tag = el.dataset.tag;
                this.closeListModal();
                this.openSearchModal(tag);
            });
        });
    },
    
    createListModal(title) {
        const existing = document.querySelector('.list-modal');
        if (existing) existing.remove();
        
        const modal = document.createElement('div');
        modal.className = 'list-modal';
        modal.innerHTML = `
            <div class="list-modal-box">
                <div class="list-modal-header">
                    <h3>${title}</h3>
                    <button class="close-list-modal">×</button>
                </div>
                <div class="list-modal-content"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-list-modal').addEventListener('click', () => {
            this.closeListModal();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeListModal();
            }
        });
        
        return modal;
    },
    
    closeListModal() {
        const modal = document.querySelector('.list-modal');
        if (modal) modal.remove();
    },
    
    openSearchModal(initialQuery = '') {
        const modal = document.getElementById('searchModal');
        const input = document.getElementById('modalSearchInput');
        const sidebarInput = document.getElementById('searchInput');
        const homeInput = document.getElementById('homeSearchInput');
        
        modal.classList.add('visible');
        input.value = initialQuery || (sidebarInput ? sidebarInput.value : '') || (homeInput ? homeInput.value : '');
        input.focus();
        
        if (input.value) {
            this.performSearch(input.value);
        } else {
            this.showSearchDefault();
        }
    },
    
    closeSearchModal() {
        const modal = document.getElementById('searchModal');
        modal.classList.remove('visible');
        document.getElementById('searchResults').innerHTML = '';
    },
    
    showSearchDefault() {
        const resultsContainer = document.getElementById('searchResults');
        
        if (this.currentView === 'book' && this.currentBook) {
            const book = this.data.books.find(b => b.id === this.currentBook);
            if (book) {
                const allDocs = [];
                book.chapters.forEach(chapter => {
                    chapter.items.forEach(item => {
                        allDocs.push({
                            ...item,
                            bookId: book.id,
                            bookTitle: book.title,
                            chapterId: chapter.id,
                            chapterName: chapter.name
                        });
                    });
                });
                
                resultsContainer.innerHTML = `
                    <div class="search-section">
                        <div class="search-section-title">📖 当前书籍</div>
                        <div class="search-result-item book-result" data-book="${book.id}">
                            <span class="result-type-badge book-badge">书籍</span>
                            <div class="search-result-title">${book.icon} ${book.title}</div>
                            <div class="search-result-preview">${book.description}</div>
                        </div>
                    </div>
                    <div class="search-section">
                        <div class="search-section-title">📄 文档 (${allDocs.length})</div>
                        ${allDocs.slice(0, 10).map(item => `
                            <div class="search-result-item doc-result" data-id="${item.id}" data-path="${item.path}" data-book="${item.bookId}">
                                <span class="result-type-badge doc-badge">文档</span>
                                <div class="search-result-title">${item.title}</div>
                                <div class="search-result-path">${item.chapterName}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                this.bindSearchResults();
                return;
            }
        }
        
        const recentBooks = this.data.books.slice(0, 3);
        
        resultsContainer.innerHTML = `
            <div class="search-section">
                <div class="search-section-title">📚 书籍</div>
                ${recentBooks.map(book => `
                    <div class="search-result-item book-result" data-book="${book.id}">
                        <span class="result-type-badge book-badge">书籍</span>
                        <div class="search-result-title">${book.icon} ${book.title}</div>
                        <div class="search-result-preview">${book.description}</div>
                    </div>
                `).join('')}
            </div>
            <div class="search-section">
                <div class="search-section-title">📄 最近文档</div>
                ${this.searchIndex.slice(0, 5).map(item => `
                    <div class="search-result-item doc-result" data-id="${item.id}" data-path="${item.path}" data-book="${item.bookId}">
                        <span class="result-type-badge doc-badge">文档</span>
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-path">${item.bookTitle} / ${item.chapterName}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.bindSearchResults();
    },
    
    performSearch(query) {
        const resultsContainer = document.getElementById('searchResults');
        
        if (!query.trim()) {
            this.showSearchDefault();
            return;
        }
        
        const queryLower = query.toLowerCase();
        
        let bookResults = [];
        let docResults = [];
        
        if (this.currentView === 'book' && this.currentBook) {
            const book = this.data.books.find(b => b.id === this.currentBook);
            if (book) {
                bookResults = [{
                    type: 'book',
                    id: book.id,
                    title: book.title,
                    description: book.description,
                    icon: book.icon,
                    score: 100
                }];
                
                book.chapters.forEach(chapter => {
                    chapter.items.forEach(item => {
                        let score = 0;
                        const titleMatch = item.title.toLowerCase().includes(queryLower);
                        const descMatch = item.description.toLowerCase().includes(queryLower);
                        const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(queryLower));
                        
                        // 检查文档内容
                        const cached = this.documentCache[item.id];
                        const contentMatch = cached && cached.content.includes(queryLower);
                        
                        if (titleMatch) score += 100;
                        if (descMatch) score += 60;
                        if (tagsMatch) score += 40;
                        if (contentMatch) score += 30;
                        
                        if (score > 0) {
                            docResults.push({
                                ...item,
                                type: 'document',
                                bookId: book.id,
                                bookTitle: book.title,
                                chapterId: chapter.id,
                                chapterName: chapter.name,
                                score: score,
                                contentPreview: cached?.preview
                            });
                        }
                    });
                });
            }
        } else {
            bookResults = this.data.books.filter(book => {
                const searchText = `${book.title} ${book.description} ${book.author}`.toLowerCase();
                return searchText.includes(queryLower);
            }).map(book => ({
                type: 'book',
                id: book.id,
                title: book.title,
                description: book.description,
                icon: book.icon,
                score: book.title.toLowerCase().includes(queryLower) ? 100 : 50
            }));
            
            docResults = this.searchIndex.filter(item => {
                let score = 0;
                const titleMatch = item.title.toLowerCase().includes(queryLower);
                const descMatch = item.description.toLowerCase().includes(queryLower);
                const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(queryLower));
                
                // 检查文档内容
                const cached = this.documentCache[item.id];
                const contentMatch = cached && cached.content.includes(queryLower);
                
                if (titleMatch) score += 100;
                if (descMatch) score += 60;
                if (tagsMatch) score += 40;
                if (contentMatch) score += 30;
                
                return score > 0;
            }).map(item => {
                let score = 0;
                if (item.title.toLowerCase().includes(queryLower)) score += 100;
                if (item.description.toLowerCase().includes(queryLower)) score += 60;
                if (item.tags?.some(tag => tag.toLowerCase().includes(queryLower))) score += 40;
                const cached = this.documentCache[item.id];
                if (cached && cached.content.includes(queryLower)) score += 30;
                
                return {
                    ...item,
                    type: 'document',
                    score: score,
                    contentPreview: cached?.preview
                };
            });
        }
        
        const allResults = [...bookResults, ...docResults].sort((a, b) => b.score - a.score);
        
        if (allResults.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">未找到相关内容</div>';
            return;
        }
        
        resultsContainer.innerHTML = allResults.map(item => {
            if (item.type === 'book') {
                return `
                    <div class="search-result-item book-result" data-book="${item.id}">
                        <span class="result-type-badge book-badge">书籍</span>
                        <div class="search-result-title">${this.highlightText(item.icon + ' ' + item.title, query)}</div>
                        <div class="search-result-preview">${this.highlightText(item.description, query)}</div>
                    </div>
                `;
            } else {
                // 如果有内容预览，提取包含关键词的片段
                let contentSnippet = '';
                if (item.contentPreview) {
                    const queryIndex = item.contentPreview.toLowerCase().indexOf(queryLower);
                    if (queryIndex !== -1) {
                        const start = Math.max(0, queryIndex - 50);
                        const end = Math.min(item.contentPreview.length, queryIndex + query.length + 50);
                        contentSnippet = (start > 0 ? '...' : '') + 
                            item.contentPreview.substring(start, end) + 
                            (end < item.contentPreview.length ? '...' : '');
                    } else {
                        contentSnippet = item.contentPreview.substring(0, 100) + '...';
                    }
                }
                
                return `
                    <div class="search-result-item doc-result" data-id="${item.id}" data-path="${item.path}" data-book="${item.bookId}" data-query="${query}">
                        <span class="result-type-badge doc-badge">文档</span>
                        <div class="search-result-title">${this.highlightText(item.title, query)}</div>
                        <div class="search-result-path">${item.bookTitle} / ${item.chapterName}</div>
                        <div class="search-result-preview">${this.highlightText(item.description, query)}</div>
                        ${contentSnippet ? `<div class="search-result-content">${this.highlightText(contentSnippet, query)}</div>` : ''}
                    </div>
                `;
            }
        }).join('');
        
        this.bindSearchResults(query);
    },
    
    bindSearchResults(query) {
        document.querySelectorAll('.book-result').forEach(el => {
            el.addEventListener('click', () => {
                this.closeSearchModal();
                this.openBookView(el.dataset.book);
            });
        });
        
        document.querySelectorAll('.doc-result').forEach(el => {
            el.addEventListener('click', () => {
                const queryText = el.dataset.query;
                this.closeSearchModal();
                if (el.dataset.book !== this.currentBook) {
                    this.openBookView(el.dataset.book);
                    setTimeout(() => {
                        this.loadDocument(el.dataset.id, el.dataset.path, true, queryText);
                    }, 100);
                } else {
                    this.loadDocument(el.dataset.id, el.dataset.path, true, queryText);
                }
            });
        });
    },
    
    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    },
    
    showToc() {
        document.getElementById('tocPanel').classList.add('visible');
        this.tocVisible = true;
    },
    
    hideToc() {
        document.getElementById('tocPanel').classList.remove('visible');
        this.tocVisible = false;
    },
    
    toggleToc() {
        if (this.tocVisible) {
            this.hideToc();
        } else {
            const headings = document.querySelectorAll('.article-content h2, .article-content h3, .article-content h4');
            if (headings.length > 0) {
                this.showToc();
            }
        }
    },
    
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        sidebar.classList.toggle('open');
        overlay.classList.toggle('visible');
    },
    
    closeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    },
    
    showError(message) {
        const contentBody = document.getElementById('contentBody');
        contentBody.innerHTML = `
            <div class="article-content">
                <h1>⚠️ 错误</h1>
                <p>${message}</p>
            </div>
        `;
    },
    
    setupMarked() {
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });
        
        const renderer = new marked.Renderer();
        const originalHtml = renderer.html.bind(renderer);
        renderer.html = function(text) {
            return text;
        };
        marked.use({ renderer });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    LearningSystem.init();
});
