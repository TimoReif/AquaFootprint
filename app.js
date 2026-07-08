// AI Water Footprint Calculator - Application Script
// Question Database (Expanded)
const QUESTIONS = [
    // --- CATEGORY 1: KI-NUTZUNG ---
    {
        id: 'text',
        category: 'KI-Nutzung',
        title: 'KI-Textgenerierung',
        desc: 'Wie viele Text-Prompts (z.B. Fragen in ChatGPT, Zusammenfassungen in Claude, Aufsätze schreiben) sendest du durchschnittlich pro Tag?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 7h8M8 11h5"></path></svg>`,
        type: 'slider',
        min: 0,
        max: 100,
        default: 10,
        unit: 'Prompts / Tag',
        getFeedback: (val) => {
            if (val === 0) return 'KI-Abstinent';
            if (val <= 5) return 'Gelegenheitsnutzer';
            if (val <= 20) return 'Regelmäßiger Nutzer';
            if (val <= 50) return 'Power-User';
            return 'Dauer-Prompter';
        }
    },
    {
        id: 'image',
        category: 'KI-Nutzung',
        title: 'KI-Bildgenerierung',
        desc: 'Wie viele KI-Bilder generierst du durchschnittlich pro Woche (z.B. mit Midjourney, DALL-E, Stable Diffusion)?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
        type: 'slider',
        min: 0,
        max: 50,
        default: 5,
        unit: 'Bilder / Woche',
        getFeedback: (val) => {
            if (val === 0) return 'Keine KI-Bilder';
            if (val <= 2) return 'Sehr selten';
            if (val <= 10) return 'Hobby-Künstler';
            return 'Profi-Bilddesigner';
        }
    },
    {
        id: 'search',
        category: 'KI-Nutzung',
        title: 'KI-Suchanfragen',
        desc: 'Wie oft nutzt du KI-gestützte Suchen (z.B. Google AI Overviews, Perplexity) anstelle einer klassischen Suchmaschine pro Tag?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><path d="M11 8v6M8 11h6"></path></svg>`,
        type: 'slider',
        min: 0,
        max: 80,
        default: 15,
        unit: 'Suchen / Tag',
        getFeedback: (val) => {
            if (val === 0) return 'Klassischer Sucher';
            if (val <= 5) return 'Vorsichtiger Tester';
            if (val <= 25) return 'Info-Optimierer';
            return 'KI-Rechercheur';
        }
    },
    {
        id: 'voice',
        category: 'KI-Nutzung',
        title: 'KI-Sprachassistenten',
        desc: 'Wie oft nutzt du KI-Sprachassistenten (Siri, Google Assistant, Alexa) auf dem Smartphone oder Smart Speaker pro Tag?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"></path></svg>`,
        type: 'slider',
        min: 0,
        max: 40,
        default: 5,
        unit: 'Sprachbefehle / Tag',
        getFeedback: (val) => {
            if (val === 0) return 'Tastatur-Tipper';
            if (val <= 5) return 'Seltene Sprachsteuerung';
            if (val <= 15) return 'Smart-Home-Nutzer';
            return 'Sprachsteuerungs-Fanatiker';
        }
    },
    {
        id: 'code',
        category: 'KI-Nutzung',
        title: 'KI-Codegenerierung',
        desc: 'Wie viele Stunden pro Woche nutzt du KI-Programmierassistenten (z.B. GitHub Copilot, Cursor, Replit)?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
        type: 'slider',
        min: 0,
        max: 40,
        default: 0,
        unit: 'Stunden / Woche',
        getFeedback: (val) => {
            if (val === 0) return 'Keine KI-Entwicklung';
            if (val <= 5) return 'Gelegentliche Hilfe';
            if (val <= 15) return 'Teilzeit-Coder';
            return 'Vollzeit-KI-Coder';
        }
    },
    {
        id: 'media',
        category: 'KI-Nutzung',
        title: 'KI-Video & Musikgenerierung',
        desc: 'Wie viele Minuten KI-generiertes Video oder Audio (Runway, Suno, Udio) lässt du wöchentlich erstellen?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"></path></svg>`,
        type: 'slider',
        min: 0,
        max: 60,
        default: 0,
        unit: 'Minuten / Woche',
        getFeedback: (val) => {
            if (val === 0) return 'Keine Medien-KI';
            if (val <= 5) return 'Kurze Clips';
            if (val <= 20) return 'Hobby-Produzent';
            return 'Regisseur der Zukunft';
        }
    },
    {
        id: 'filters',
        category: 'KI-Nutzung',
        title: 'Social Media KI-Filter',
        desc: 'Nutzt du KI-basierte Filter oder Beauty-Filter auf TikTok, Instagram oder Snapchat? Wie oft pro Woche?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20M12 2v20"></path></svg>`,
        type: 'slider',
        min: 0,
        max: 100,
        default: 10,
        unit: 'Filternutzungen / Woche',
        getFeedback: (val) => {
            if (val === 0) return 'Filterlos schön';
            if (val <= 10) return 'Gelegentliche Filter';
            if (val <= 40) return 'Regelmäßige Effekte';
            return 'Filter-Dauernutzer';
        }
    },
    {
        id: 'training',
        category: 'KI-Nutzung',
        title: 'Eigenes Modell-Training',
        desc: 'Trainierst oder verfeinerst (Fine-Tuning) du eigene KI-Modelle (z.B. Llama, Stable Diffusion Loras)?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 1 14 16h8m-6-8a4 4 0 1 0-8 0v8a4 4 0 1 0 8 0V8z"></path></svg>`,
        type: 'select',
        options: [
            { value: 'nie', label: 'Nein, nie' },
            { value: 'selten', label: 'Selten (ca. 1x im Monat ein kleines Lora)' },
            { value: 'gelegentlich', label: 'Gelegentlich (ca. 1x pro Woche)' },
            { value: 'haeufig', label: 'Häufig (täglich / professionelles Training)' }
        ],
        default: 'nie',
        getFeedback: (val) => {
            if (val === 'nie') return 'Kein Trainingsverbrauch';
            if (val === 'selten') return 'Geringer Trainingsbedarf';
            if (val === 'gelegentlich') return 'Fortgeschrittener Verbrauch';
            return 'Extrem hoher Trainingsverbrauch!';
        }
    },
    // --- CATEGORY 2: DIGITALER LEBENSSTIL ---
    {
        id: 'tabs',
        category: 'Digitaler Lebensstil',
        title: 'Offene Browser-Tabs',
        desc: 'Wie viele offene Tabs hast du normalerweise gleichzeitig im Browser auf PC oder Handy?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>`,
        type: 'slider',
        min: 1,
        max: 100,
        default: 15,
        unit: 'Tabs parallel',
        getFeedback: (val) => {
            if (val <= 5) return 'Minimalist';
            if (val <= 20) return 'Ordentlicher Surfer';
            if (val <= 50) return 'Tab-Messie';
            return 'Extreme Tab-Flut (Leistungsschlucker)';
        }
    },
    {
        id: 'history',
        category: 'Digitaler Lebensstil',
        title: 'KI-Chatverläufe',
        desc: 'Was passiert mit deinen alten KI-Chatverläufen (z.B. in ChatGPT oder Gemini)?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path></svg>`,
        type: 'select',
        options: [
            { value: 'nie_loeschen', label: 'Ich speichere alles (werden nie gelöscht)' },
            { value: 'ab_und_zu', label: 'Ich lösche sie ab und zu manuell' },
            { value: 'sofort_loeschen', label: 'Ich lösche sie sofort nach der Unterhaltung' }
        ],
        default: 'nie_loeschen',
        getFeedback: (val) => {
            if (val === 'nie_loeschen') return 'Hoher Daten-Müll (+ Speicherstrom)';
            if (val === 'ab_und_zu') return 'Bewusster Umgang';
            return 'Optimale Datenhygiene (Spargrad)';
        }
    },
    // --- CATEGORY 3: SCHÄTZFRAGEN (EDUCATIONAL GUESSES) ---
    {
        id: 'guess_prompt',
        category: 'Schätzfragen',
        title: 'Wasser pro Prompt',
        desc: 'Was schätzt du: Wie viel Milliliter Wasser verbraucht eine einzige Textanfrage bei ChatGPT (inklusive Kühlung der Server & Stromerzeugung)?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
        type: 'slider',
        min: 0,
        max: 100,
        default: 50,
        unit: 'ml Wasser geschätzt',
        getFeedback: (val) => {
            return `Deine Schätzung: ${val} ml`;
        }
    },
    {
        id: 'guess_training',
        category: 'Schätzfragen',
        title: 'Wasser für Training',
        desc: 'Was schätzt du: Wie viel Liter Wasser verbrauchte das einmalige Training des großen KI-Modells GPT-3 im Rechenzentrum?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
        type: 'select',
        options: [
            { value: '7k', label: '7.000 Liter (ca. 175 Duschen)' },
            { value: '70k', label: '70.000 Liter (ca. 1.750 Duschen)' },
            { value: '700k', label: '700.000 Liter (ca. 17.500 Duschen) - Richtige Antwort' },
            { value: '7m', label: '7.000.000 Liter (ca. 175.000 Duschen)' }
        ],
        default: '7k',
        getFeedback: (val) => {
            if (val === '700k') return 'Gute Schätzung!';
            return 'Überprüfe das Ergebnis am Ende!';
        }
    },
    // --- CATEGORY 4: MEINUNGEN & VERHALTEN ---
    {
        id: 'rechenzentrum_img',
        category: 'Meinungen',
        title: 'Bild des Rechenzentrums',
        desc: 'Welches Bild hast du im Kopf, wenn du an ein "Rechenzentrum" denkst?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
        type: 'select',
        options: [
            { value: 'serverhalle', label: 'Eine saubere, sterile Serverhalle mit blauem Licht' },
            { value: 'industriebau', label: 'Ein unscheinbares Industriegebäude im Gewerbegebiet' },
            { value: 'fabrik', label: 'Eine rauchende Fabrik mit riesigen Kühltürmen' },
            { value: 'unsichtbar', label: 'Die "Cloud" ist für mich unsichtbar - ich habe kein Bild vor Augen' }
        ],
        default: 'serverhalle',
        getFeedback: (val) => 'Gleich gibt es dazu ein paar spannende Fakten!'
    },
    {
        id: 'island_server',
        category: 'Meinungen',
        title: 'Warten für Umweltschutz?',
        desc: 'Würdest du 5 Sekunden länger auf eine Antwort der KI warten, wenn die Server dafür umweltschonend mit Geothermie gekühlt in Island stehen?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
        type: 'select',
        options: [
            { value: 'ja', label: 'Ja, absolut! Die Umwelt geht vor.' },
            { value: 'ja_bedingt', label: 'Ja, aber nur bei längeren / komplexen Aufgaben.' },
            { value: 'nein', label: 'Nein, Schnelligkeit und Effizienz sind mir am wichtigsten.' }
        ],
        default: 'ja',
        getFeedback: (val) => 'Eine zukunftsweisende Einstellung!'
    },
    {
        id: 'short_prompts',
        category: 'Meinungen',
        title: 'Kürzere Prompts schreiben?',
        desc: 'Würdest du deine Prompts an KI-Systeme extra kürzer oder präziser formulieren, um Serverleistung und damit Wasser zu sparen?',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>`,
        type: 'select',
        options: [
            { value: 'ja', label: 'Ja, wenn es hilft, fasse ich mich kürzer.' },
            { value: 'teilweise', label: 'Nur bei unwichtigen Abfragen.' },
            { value: 'nein', label: 'Nein, ich chatte lieber ganz natürlich und ausführlich.' }
        ],
        default: 'ja',
        getFeedback: (val) => 'Auch kleine Worte sparen Energie!'
    }
];
// Calculation Constants
const WATER_COEFFICIENTS = {
    // Quelle: Li et al. 2023, UC Riverside (Communications of the ACM) – 500ml per 20-50 prompts
    text: 0.015,      // 15 ml per prompt (Mittelwert aus 10-25ml Spanne)
    // Quelle: UNU (United Nations University) 2024 – ~29ml per image; 3-12 Wh × ~5 L/kWh
    image: 0.029,     // 29 ml per image
    // Quelle: Google 2025 Sustainability Report – median Gemini text prompt ~0.26ml direct + lifecycle
    search: 0.003,    // 3 ml per AI search
    // Quelle: Extrapoliert aus Google/Amazon Smart Speaker Energiestudien
    voice: 0.003,     // 3 ml per voice command
    // Quelle: Continuous inference ~33 prompts/hour × 15ml (GitHub Copilot Daten)
    code: 0.5,        // 500 ml per hour of AI coding
    // Quelle: IEA 2024 – Video-KI ~30× mehr Compute als Bildgenerierung
    media: 1.5,       // 1.5 L per minute of AI video/music
    // Quelle: On-device Inference mit partiellem Cloud-Processing
    filters: 0.002,   // 2 ml per social media filter usage
    training: {
        nie: 0,
        // Quelle: Cloud-GPU-Stunde ~2L Wasser × geschätzte Nutzung
        selten: 100,        // ~100 L/Jahr (gelegentliches LoRA-Finetuning)
        gelegentlich: 2400, // ~2.400 L/Jahr (wöchentliche Trainingsessions)
        haeufig: 50000      // ~50.000 L/Jahr (tägliches professionelles Training)
    },
    // Konservative Schätzung basierend auf Chrome Energie-Profilstudien
    tabs: 0.05,       // 0.05 L per open tab per year
    history: {
        // Data-Center Speicherenergie für persistente Cloud-Daten
        nie_loeschen: 5,
        ab_und_zu: 1,
        sofort_loeschen: 0
    }
};
// Application State
let state = {
    currentStep: 0,
    answers: {}
};
// Chart.js global instance
let categoryChartInstance = null;
// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const btnStart = document.getElementById('btn-start');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
const currentStepNum = document.getElementById('current-step-num');
const totalStepsNum = document.getElementById('total-steps-num');
const stepCategoryName = document.getElementById('step-category-name');
const progressBarFill = document.getElementById('progress-bar-fill');
const questionContainer = document.getElementById('quiz-question-container');
// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Set total steps number
    totalStepsNum.textContent = QUESTIONS.length;
    
    // Initialize answers with defaults
    QUESTIONS.forEach(q => {
        state.answers[q.id] = q.default;
    });
    // Event Listeners
    btnStart.addEventListener('click', startQuiz);
    btnPrev.addEventListener('click', prevStep);
    btnNext.addEventListener('click', nextStep);
    btnRestart.addEventListener('click', restartQuiz);
    // Tips Simulator Checkboxes
    document.querySelectorAll('.tip-checkbox').forEach(box => {
        box.addEventListener('change', updateSimulator);
    });
});
// View Navigation Functions
function startQuiz() {
    welcomeScreen.classList.remove('active');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        setTimeout(() => {
            quizScreen.classList.add('active');
            state.currentStep = 0;
            renderQuestion();
        }, 50);
    }, 400);
}
function renderQuestion() {
    const q = QUESTIONS[state.currentStep];
    
    // Update progress indicator
    currentStepNum.textContent = state.currentStep + 1;
    stepCategoryName.textContent = `Kategorie: ${q.category}`;
    progressBarFill.style.width = `${((state.currentStep + 1) / QUESTIONS.length) * 100}%`;
    
    // Disable/Enable Back button
    if (state.currentStep === 0) {
        btnPrev.classList.add('disabled');
        btnPrev.disabled = true;
    } else {
        btnPrev.classList.remove('disabled');
        btnPrev.disabled = false;
    }
    
    // Change Next button text on last question
    if (state.currentStep === QUESTIONS.length - 1) {
        btnNext.querySelector('span').textContent = 'Ergebnis berechnen';
    } else {
        btnNext.querySelector('span').textContent = 'Weiter';
    }
    // Build Question HTML
    questionContainer.innerHTML = '';
    
    // Question header & icon
    const headerRow = document.createElement('div');
    headerRow.className = 'q-icon-title-row';
    headerRow.innerHTML = `
        <div class="q-icon-box">${q.icon}</div>
        <h2 class="q-title">${q.title}</h2>
    `;
    
    const desc = document.createElement('p');
    desc.className = 'q-desc';
    desc.textContent = q.desc;
    
    questionContainer.appendChild(headerRow);
    questionContainer.appendChild(desc);
    // Render based on question type
    if (q.type === 'slider') {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        
        const currentVal = state.answers[q.id];
        
        sliderContainer.innerHTML = `
            <div class="slider-values-row">
                <div>
                    <span class="slider-val-current" id="slider-val-display">${currentVal}</span>
                    <span class="slider-unit">${q.unit}</span>
                </div>
                <span class="slider-badge-feedback" id="slider-feedback-badge">${q.getFeedback(currentVal)}</span>
            </div>
            <input type="range" class="custom-range-slider" id="question-slider" 
                   min="${q.min}" max="${q.max}" value="${currentVal}">
            <div class="slider-limits">
                <span>${q.min}</span>
                <span>${q.max}+</span>
            </div>
        `;
        
        questionContainer.appendChild(sliderContainer);
        
        // Attach interactive events
        const slider = document.getElementById('question-slider');
        const valDisplay = document.getElementById('slider-val-display');
        const feedbackBadge = document.getElementById('slider-feedback-badge');
        
        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            state.answers[q.id] = val;
            valDisplay.textContent = val;
            feedbackBadge.textContent = q.getFeedback(val);
        });
        
    } else if (q.type === 'select') {
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'options-grid';
        
        q.options.forEach(opt => {
            const isChecked = state.answers[q.id] === opt.value ? 'checked' : '';
            
            optionsGrid.innerHTML += `
                <label class="option-card-label">
                    <input type="radio" name="${q.id}" value="${opt.value}" ${isChecked}>
                    <div class="option-card-design">
                        <span>${opt.label}</span>
                    </div>
                </label>
            `;
        });
        
        questionContainer.appendChild(optionsGrid);
        
        // Attach interactive events
        optionsGrid.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                state.answers[q.id] = e.target.value;
            });
        });
    }
}
function nextStep() {
    if (state.currentStep < QUESTIONS.length - 1) {
        state.currentStep++;
        questionContainer.style.opacity = 0;
        setTimeout(() => {
            renderQuestion();
            questionContainer.style.opacity = 1;
        }, 150);
    } else {
        showResults();
    }
}
// Back navigation
function prevStep() {
    if (state.currentStep > 0) {
        state.currentStep--;
        questionContainer.style.opacity = 0;
        setTimeout(() => {
            renderQuestion();
            questionContainer.style.opacity = 1;
        }, 150);
    }
}
// Result Calculation
function calculateFootprint() {
    const rawAnswers = state.answers;
    
    // Annualized calculations in liters
    const textLiters = rawAnswers.text * 365 * WATER_COEFFICIENTS.text;
    const imageLiters = rawAnswers.image * 52 * WATER_COEFFICIENTS.image;
    const searchLiters = rawAnswers.search * 365 * WATER_COEFFICIENTS.search;
    const voiceLiters = rawAnswers.voice * 365 * WATER_COEFFICIENTS.voice;
    const codeLiters = rawAnswers.code * 52 * WATER_COEFFICIENTS.code;
    const mediaLiters = rawAnswers.media * 52 * WATER_COEFFICIENTS.media;
    const filtersLiters = rawAnswers.filters * 52 * WATER_COEFFICIENTS.filters;
    const trainingLiters = WATER_COEFFICIENTS.training[rawAnswers.training] || 0;
    
    // Digital Life factors
    const tabsLiters = rawAnswers.tabs * WATER_COEFFICIENTS.tabs;
    const historyLiters = WATER_COEFFICIENTS.history[rawAnswers.history] || 0;
    
    return {
        text: Math.round(textLiters),
        image: Math.round(imageLiters),
        search: Math.round(searchLiters),
        voice: Math.round(voiceLiters),
        code: Math.round(codeLiters),
        media: Math.round(mediaLiters),
        filters: Math.round(filtersLiters),
        training: Math.round(trainingLiters),
        digitalLife: Math.round(tabsLiters + historyLiters)
    };
}
function showResults() {
    quizScreen.classList.remove('active');
    
    // Reset simulator checkboxes
    document.querySelectorAll('.tip-checkbox').forEach(box => {
        box.checked = false;
    });
    document.getElementById('simulator-savings-banner').classList.add('hidden');
    setTimeout(() => {
        quizScreen.style.display = 'none';
        resultsScreen.style.display = 'block';
        setTimeout(() => {
            resultsScreen.classList.add('active');
            updateResultsUI();
        }, 50);
    }, 400);
}
function updateResultsUI() {
    const rawBreakdown = calculateFootprint();
    updateDashboardWithData(rawBreakdown);
    renderGuessesComparison();
    renderBehavioralInsights();
}
function updateDashboardWithData(breakdown) {
    // Exclude digitalLife from core KI chart breakdown if we want, or combine. Let's combine for the total!
    const totalLiters = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
    
    // Update count-up value
    const valTotalLiters = document.getElementById('val-total-liters');
    animateValueCount(valTotalLiters, 0, totalLiters, 1200);
    
    // Update radial gauge
    const maxExpected = 5000;
    const percent = Math.min(100, (totalLiters / maxExpected) * 100);
    const ring = document.getElementById('gauge-fill-ring');
    const offset = 283 - (283 * percent) / 100;
    ring.style.strokeDashoffset = offset;
    // Update feedback text & badge
    const summaryText = document.getElementById('result-summary-text');
    const impactBadge = document.getElementById('val-impact-level');
    
    impactBadge.className = 'impact-level-badge';
    
    if (totalLiters === 0) {
        summaryText.innerHTML = `Fantastisch! Du hast <strong>keinen messbaren KI-Wasserfußabdruck</strong>. Deine Umweltleistung ist perfekt!`;
        impactBadge.textContent = 'Minimaler Abdruck';
        impactBadge.classList.add('impact-low');
    } else if (totalLiters < 250) {
        summaryText.innerHTML = `Dein KI-Wasserverbrauch liegt bei sehr umweltfreundlichen <strong>${totalLiters.toLocaleString('de-DE')} Litern</strong> pro Jahr. Vorbildliche digitale Hygiene!`;
        impactBadge.textContent = 'Geringer Verbrauch';
        impactBadge.classList.add('impact-low');
    } else if (totalLiters < 1800) {
        summaryText.innerHTML = `Dein KI-Wasserverbrauch beträgt ca. <strong>${totalLiters.toLocaleString('de-DE')} Liter</strong> pro Jahr. Damit liegst du im grünen Durchschnitt der Digital-Nutzung.`;
        impactBadge.textContent = 'Mittlerer Verbrauch';
        impactBadge.classList.add('impact-medium');
    } else {
        summaryText.innerHTML = `Dein KI-Wasserverbrauch ist mit ca. <strong>${totalLiters.toLocaleString('de-DE')} Litern</strong> pro Jahr erhöht. Wirf unten einen Blick auf die Tipps!`;
        impactBadge.textContent = 'Hoher Verbrauch';
        impactBadge.classList.add('impact-high');
    }
    // Update daily equivalents
    document.getElementById('comp-bottles').textContent = Math.round(totalLiters / 0.5).toLocaleString('de-DE');
    document.getElementById('comp-flushes').textContent = Math.round(totalLiters / 6).toLocaleString('de-DE');
    document.getElementById('comp-showers').textContent = Math.round(totalLiters / 40).toLocaleString('de-DE');
    const drinkingPercent = Math.round((totalLiters / 730) * 100);
    document.getElementById('comp-drinking').textContent = `${drinkingPercent.toLocaleString('de-DE')} %`;
    // Render category breakdown chart
    renderBreakdownChart(breakdown);
}
// Chart rendering
function renderBreakdownChart(breakdown) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    // Group categories
    const chartLabels = ['Text- & Sprach-KI', 'Bild- & Video-KI', 'Suchen & Filter', 'Modell-Training', 'Coding', 'Digital Life'];
    const chartData = [
        breakdown.text + breakdown.voice,
        breakdown.image + breakdown.media,
        breakdown.search + breakdown.filters,
        breakdown.training,
        breakdown.code,
        breakdown.digitalLife
    ];
    
    const colors = [
        '#2a9d8f', // Text/Voice: Seafoam
        '#f4a261', // Image/Video: Warm Gold
        '#e9c46a', // Search/Filter: Sand
        '#e76f51', // Training: Coral
        '#264653', // Coding: Deep Ocean
        '#8ab17d'  // Digital Life: Sage Green
    ];
    if (categoryChartInstance) {
        categoryChartInstance.data.datasets[0].data = chartData;
        categoryChartInstance.update();
    } else {
        categoryChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartLabels,
                datasets: [{
                    data: chartData,
                    backgroundColor: colors,
                    borderWidth: 1,
                    borderColor: 'rgba(10,46,60,0.6)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(254,250,224,0.65)',
                            font: { family: 'Plus Jakarta Sans', size: 11 },
                            padding: 10
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: ${context.raw.toLocaleString('de-DE')} Liter`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}
// Render Estimation Comparisons (Schätzungen vs Realität)
function renderGuessesComparison() {
    const guessPrompt = state.answers.guess_prompt;
    const guessTraining = state.answers.guess_training;
    
    const promptGuessResult = document.getElementById('prompt-guess-result');
    const trainingGuessResult = document.getElementById('training-guess-result');
    // Prompt estimate analysis (Actual: 15ml – Li et al. 2023, UC Riverside)
    const promptDiff = Math.abs(guessPrompt - 15);
    let promptFeedbackClass = 'feedback-orange';
    let promptFeedbackText = '';
    if (promptDiff <= 5) {
        promptFeedbackClass = 'feedback-green';
        promptFeedbackText = `Hervorragend geschätzt! Eine KI-Anfrage verbraucht tatsächlich ca. 15 ml Wasser (Li et al. 2023, UC Riverside). Das klingt wenig, summiert sich aber schnell!`;
    } else if (guessPrompt < 15) {
        promptFeedbackText = `Du hast den Verbrauch unterschätzt. Mit deiner Schätzung von ${guessPrompt} ml lagst du unter den tatsächlichen ca. 15 ml (Li et al. 2023, UC Riverside).`;
    } else {
        promptFeedbackText = `Du hast den Verbrauch etwas überschätzt. Mit deiner Schätzung von ${guessPrompt} ml lagst du über den tatsächlichen ca. 15 ml (Li et al. 2023, UC Riverside).`;
    }
    promptGuessResult.className = `guess-comparison-box ${promptFeedbackClass}`;
    promptGuessResult.innerHTML = `
        <div class="guess-row">
            <div>Deine Schätzung: <strong>${guessPrompt} ml</strong></div>
            <div>Realität: <strong>15 ml</strong></div>
        </div>
        <p class="guess-explanation-text">${promptFeedbackText}</p>
    `;
    // Training estimate analysis (Actual: 700k Liters)
    let trainingFeedbackClass = 'feedback-orange';
    let trainingFeedbackText = '';
    if (guessTraining === '700k') {
        trainingFeedbackClass = 'feedback-green';
        trainingFeedbackText = `Absolut richtig! Das Training von GPT-3 verschlang rund 700.000 Liter Süßwasser, was der Füllung des Kühlturms eines Kernkraftwerks entspricht.`;
    } else {
        const labelsMap = {
            '7k': '7.000 Liter (zu niedrig)',
            '70k': '70.000 Liter (zu niedrig)',
            '7m': '7.000.000 Liter (zu hoch)'
        };
        trainingFeedbackText = `Leider nicht ganz richtig. Deine Wahl (${labelsMap[guessTraining] || guessTraining}) weicht von den tatsächlichen 700.000 Litern ab. Das Training verbrauchte gigantische Mengen Wasser!`;
    }
    trainingGuessResult.className = `guess-comparison-box ${trainingFeedbackClass}`;
    trainingGuessResult.innerHTML = `
        <div class="guess-row">
            <div>Deine Wahl: <strong>${guessTraining === '700k' ? '700.000 L' : 'Andere Option'}</strong></div>
            <div>Realität: <strong>700.000 Liter</strong></div>
        </div>
        <p class="guess-explanation-text">${trainingFeedbackText}</p>
    `;
}
// Render Behavioral & Attitude Insights
function renderBehavioralInsights() {
    const rzImage = state.answers.rechenzentrum_img;
    const island = state.answers.island_server;
    const shorten = state.answers.short_prompts;
    const tabs = state.answers.tabs;
    const history = state.answers.history;
    const imgBox = document.getElementById('rz-image-insight');
    const behaviorBox = document.getElementById('behavior-attitude-insight');
    // RZ conceptual explanation
    let rzHtml = '';
    if (rzImage === 'serverhalle' || rzImage === 'unsichtbar') {
        rzHtml = `
            <div class="insight-num">💡</div>
            <p><strong>Faktencheck Rechenzentren:</strong> Du hast das Bild einer sauberen Serverhalle oder der „unsichtbaren Cloud“ im Kopf. Tatsächlich ähneln viele moderne Großrechenzentren mit ihren gigantischen Verdunstungskühltürmen und Notstromaggregaten eher klassischen Fabrikanlagen und beanspruchen lokale Wasserquellen stark.
            </p>
        `;
    } else {
        rzHtml = `
            <div class="insight-num">💡</div>
            <p><strong>Stimmt genau!</strong> Du assoziierst Rechenzentren bereits mit industriellen Bauten oder Fabriken. Die riesigen Kühlanlagen verdampfen sekündlich literweise Wasser in die Atmosphäre, um die Server vor dem Überhitzen zu schützen.
            </p>
        `;
    }
    imgBox.innerHTML = rzHtml;
    // Wait time willingness & prompt shortening analysis
    let attitudeText = '';
    if (island === 'ja' && shorten === 'ja') {
        attitudeText = `Du zeigst eine **sehr hohe Bereitschaft zur digitalen Nachhaltigkeit**. 5 Sekunden Latenzzeit für klimaneutrales Hosting in Island und kürzere Abfragen sind für dich kein Problem. Dies spart direkt Rechenleistung und somit Kühlung ein!`;
    } else if (island === 'nein' || shorten === 'nein') {
        attitudeText = `Für dich stehen **Geschwindigkeit und Komfort** im Vordergrund. Das ist verständlich! Du kannst dennoch sparen, indem du z.B. unnötige Bildgenerierungen reduzierst oder einfache Suchen ohne KI durchführst.`;
    } else {
        attitudeText = `Du bist **kompromissbereit**. Du würdest unter Umständen warten oder kürzere Sätze formulieren. Jedes eingesparte Wort verringert die Rechenlast der KI-Chips um einige Millisekunden, was sich in der Masse extrem summiert!`;
    }
    // Include digital life info
    let digitalLifeInfo = '';
    if (tabs > 30) {
        digitalLifeInfo = `<br><br>⚠️ **Tab-Überlastung**: Mit über ${tabs} offenen Tabs läuft dein lokaler Arbeitsspeicher heiß. Das zwingt deinen Browser, ständig im Hintergrund Daten abzugleichen, was deinen lokalen Strombedarf und die Serverlast erhöht.`;
    }
    behaviorBox.innerHTML = `
        <div class="insight-num">🌱</div>
        <p><strong>Deine Umwelteinstellung:</strong> ${attitudeText}${digitalLifeInfo}</p>
    `;
}
// Tips Simulator Checkbox handler
function updateSimulator() {
    const originalBreakdown = calculateFootprint();
    const modifiedBreakdown = { ...originalBreakdown };
    
    const checkboxes = document.querySelectorAll('.tip-checkbox');
    const originalTotal = Object.values(originalBreakdown).reduce((sum, val) => sum + val, 0);
    checkboxes.forEach(box => {
        if (box.checked) {
            const reduction = parseFloat(box.dataset.reduction);
            const categoryAttr = box.dataset.category;
            const isAll = box.dataset.all === 'true';
            if (isAll) {
                for (const cat in modifiedBreakdown) {
                    modifiedBreakdown[cat] = Math.round(modifiedBreakdown[cat] * (1 - reduction));
                }
            } else if (categoryAttr) {
                const categories = categoryAttr.split(',');
                categories.forEach(cat => {
                    if (modifiedBreakdown[cat] !== undefined) {
                        modifiedBreakdown[cat] = Math.round(modifiedBreakdown[cat] * (1 - reduction));
                    }
                    // Handle specific subcategory mapping
                    if (cat === 'text' && modifiedBreakdown.voice !== undefined) {
                        modifiedBreakdown.voice = Math.round(modifiedBreakdown.voice * (1 - reduction));
                    }
                    if (cat === 'search' && modifiedBreakdown.filters !== undefined) {
                        modifiedBreakdown.filters = Math.round(modifiedBreakdown.filters * (1 - reduction));
                    }
                });
            }
        }
    });
    const newTotal = Object.values(modifiedBreakdown).reduce((sum, val) => sum + val, 0);
    const totalSavings = originalTotal - newTotal;
    updateDashboardWithData(modifiedBreakdown);
    // Update savings banner
    const savingsBanner = document.getElementById('simulator-savings-banner');
    const valSavedLiters = document.getElementById('val-saved-liters');
    if (totalSavings > 0) {
        valSavedLiters.textContent = totalSavings.toLocaleString('de-DE');
        savingsBanner.classList.remove('hidden');
    } else {
        savingsBanner.classList.add('hidden');
    }
}
// Animation utility for values
function animateValueCount(element, start, end, duration) {
    if (start === end) {
        element.textContent = end.toLocaleString('de-DE');
        return;
    }
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.max(Math.abs(Math.floor(duration / range)), 15);
    
    const timer = setInterval(() => {
        current += Math.ceil(range / (duration / stepTime));
        if ((increment === 1 && current >= end) || (increment === -1 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current).toLocaleString('de-DE');
    }, stepTime);
}
// Restart Quiz
function restartQuiz() {
    resultsScreen.classList.remove('active');
    setTimeout(() => {
        resultsScreen.style.display = 'none';
        welcomeScreen.style.display = 'block';
        setTimeout(() => {
            welcomeScreen.classList.add('active');
            state.currentStep = 0;
            // Reset state answers to default
            QUESTIONS.forEach(q => {
                state.answers[q.id] = q.default;
            });
        }, 50);
    }, 400);
}
