import type { FlashCurriculum, FlashLesson } from '../types/lesson';

// Massive, lazy curriculum generator: 1000+ lessons, each 7 cards, 6–8 minutes.

type DomainDef = { domain: string; subdomains: string[] };


// Hybrid target: expand breadth (more subdomains) and depth (8 lessons each)
const DOMAINS: DomainDef[] = [
  { domain: 'AI Fundamentals', subdomains: [
    'Foundations', 'History of AI', 'AI Applications', 'Responsible AI',
    // additions (+2)
    'AI System Design', 'Human-in-the-loop AI'
  ] },
  { domain: 'Mathematical Foundations', subdomains: [
    'Linear Algebra', 'Calculus for ML', 'Probability', 'Statistics', 'Optimization', 'Information Theory', 'Numerical Methods',
    // additions (+4)
    'Matrix Calculus', 'Convex Optimization', 'Probability Distributions', 'Multivariate Statistics'
  ] },
  { domain: 'Learning Theory', subdomains: [
    'Bias–Variance', 'VC Dimension & PAC', 'Generalization Bounds', 'Regularization Theory', 'PAC-Bayes', 'Rademacher Complexity', 'Stability & Generalization',
    // additions (+3)
    'Capacity Control & Margins', 'Generalization in Deep Nets', 'Uniform Convergence & Stability'
  ] },
  { domain: 'Machine Learning', subdomains: ['Supervised Learning', 'Unsupervised Learning', 'Feature Engineering', 'Model Evaluation', 'Kernel Methods', 'Support Vector Machines', 'Logistic Regression', 'Decision Trees', 'Random Forests', 'Gradient Boosting', 'k-NN', 'Naive Bayes'] },
  { domain: 'Probabilistic ML', subdomains: ['Bayesian Inference', 'Probabilistic Graphical Models', 'Variational Inference', 'MCMC', 'Mixture Models & EM', 'Bayesian Nonparametrics'] },
  { domain: 'Deep Learning', subdomains: ['Neural Networks', 'Initialization & Normalization', 'Optimization in DL', 'Transformers', 'Regularization in DL', 'Self-Supervised Learning', 'Distillation'] },
  { domain: 'Generative Models', subdomains: ['VAEs', 'GANs', 'Diffusion Models', 'Normalizing Flows', 'Autoregressive Models', 'Energy-Based Models'] },
  { domain: 'Reinforcement Learning', subdomains: ['Dynamic Programming', 'Monte Carlo & TD', 'Policy Gradients', 'Actor–Critic', 'Exploration Strategies', 'Offline & Batch RL', 'Model-based RL', 'Imitation Learning', 'Safe Reinforcement Learning'] },
  { domain: 'NLP & LLMs', subdomains: ['Language Modeling', 'Tokenization', 'Embeddings & Vectorization', 'Attention & Transformers', 'Pretraining & Finetuning', 'Safety & Alignment', 'Instruction Tuning', 'Evaluation of LLMs', 'Multilingual NLP', 'Summarization', 'Speech Recognition (ASR)'] },
  { domain: 'Computer Vision', subdomains: ['Image Basics', 'Image Classification', 'Object Detection', 'Segmentation', 'Data Augmentation', 'Keypoint Detection', 'Multi-Object Tracking', 'OCR', 'Self-Supervised Vision'] },
  { domain: 'Graph ML', subdomains: [
    'Graph Theory for ML', 'Graph Neural Networks', 'Spectral Methods', 'Knowledge Graphs', 'Temporal Graphs',
    // additions (+3)
    'Graph Embeddings', 'Heterogeneous Graphs', 'Graph Contrastive Learning'
  ] },
  { domain: 'Time Series', subdomains: [
    'Forecasting Basics', 'State-Space Models', 'Kalman & Particle Filters', 'Anomaly Detection', 'Causal Time Series',
    // additions (+3)
    'Time Series Decomposition', 'Multivariate Forecasting', 'Advanced Anomaly Detection'
  ] },
  { domain: 'Information Retrieval & RAG', subdomains: [
    'Retrieval Models', 'Vector Indexes', 'Reranking', 'RAG Systems', 'Query Planning', 'Retrieval Evaluation',
    // additions (+3)
    'Dense Retrieval', 'Hybrid Retrieval', 'Multi-hop RAG'
  ] },
  { domain: 'Recommender Systems', subdomains: [
    'Collaborative Filtering', 'Matrix Factorization', 'Bandits for Recs', 'Sequence-aware Recs', 'Diversity & Fairness in Recs', 'Explainable Recs',
    // additions (+2)
    'Graph-based Recommendations', 'Contextual Bandit Recs'
  ] },
  { domain: 'Data Science', subdomains: [
    'Data Wrangling', 'Data Visualization', 'Experiment Design & A/B Testing', 'Data Versioning', 'Feature Stores', 'Labeling Operations',
    // additions (+3)
    'Data Validation & Testing', 'Feature Selection & Drift', 'Experiment Pitfalls in A/B Testing'
  ] },
  { domain: 'MLOps', subdomains: [
    'Experiment Tracking', 'Model Deployment', 'Monitoring & Drift', 'Evaluation Platforms', 'Prompt Security', 'Serving & Scaling', 'Observability',
    // additions (+2)
    'Model Registry & Versioning', 'LLM Evaluation Pipelines'
  ] },
  { domain: 'Robustness & Security', subdomains: [
    'Distribution Shift & OOD', 'Adversarial Robustness', 'Differential Privacy', 'Data Poisoning', 'Watermarking', 'Jailbreaks & Prompt Injection',
    // additions (+3)
    'Red Teaming & Adversarial Testing', 'Prompt Injection Defenses', 'Watermark Robustness'
  ] },
  { domain: 'Explainability', subdomains: [
    'Feature Importance', 'Shapley Values & SHAP', 'Probing & Attribution', 'Counterfactual Explanations', 'Causal Interpretability',
    // additions (+3)
    'Causal Feature Attribution', 'Global vs Local Explanations', 'Concept Activation Vectors'
  ] },
  { domain: 'Causality', subdomains: [
    'Causal Graphs & Do-Calculus', 'Counterfactuals', 'Causal Discovery', 'Instrumental Variables', 'Uplift Modeling',
    // additions (+3)
    'Mediation Analysis', 'Causal Front-door & Back-door', 'Instrumental Variable Pitfalls'
  ] },
  { domain: 'Quantum Computing', subdomains: [
    'Qubits & Gates', 'Quantum Circuits', 'Quantum Algorithms', 'Noise & Error Correction', 'Error Mitigation', 'NISQ Algorithms', 'Quantum Advantage Criteria',
    // additions (+3)
    'Quantum Circuits: Measurement', 'Quantum Noise Characterization (T1/T2)', 'Variational Quantum Algorithms'
  ] },
  { domain: 'Quantum Machine Learning', subdomains: [
    'Quantum Kernels', 'Variational Quantum Circuits', 'Hybrid QML', 'Data Encoding', 'QAOA & Optimization', 'Quantum Optimizers', 'Quantum Regularization',
    // additions (+3)
    'Quantum Data Encoding Tricks', 'VQC Training Pathologies', 'Quantum Kernel Alignment'
  ] },
  { domain: 'AI Consciousness', subdomains: [
    'Philosophical Foundations', 'Theories (IIT, GWT)', 'Sentience & Ethics', 'Measurement & Tests', 'Deception & Agency Tests', 'Misalignment Behaviors',
    // additions (+2)
    'Consciousness Benchmarks', 'Operationalizing Sentience'
  ] },
  { domain: 'Ethics & Safety', subdomains: [
    'Bias & Fairness', 'Privacy', 'Safety & Robustness', 'Governance & Policy', 'AI Auditing', 'Regulation & Policy',
    // additions (+3)
    'AI Red Teaming', 'Model Cards & Datasheets', 'Fairness Audits at Scale'
  ] }
];

// Helpers to create longer, readable sections for teens/young adults
function paragraph(...lines: string[]) {
  return lines.join(' ');
}
function bullets(lines: string[]) {
  return lines.map(l => `• ${l}`).join('\n');
}

// Topic categories for tailored content
type TopicCategory =
  | 'ai-foundations' | 'ai-history' | 'ai-apps' | 'ai-ethics'
  | 'supervised' | 'unsupervised' | 'feature-eng' | 'eval' | 'kernel' | 'svm'
  | 'nn' | 'cnn' | 'transformers' | 'init-norm' | 'optim-dl'
  | 'text-prep' | 'embeddings' | 'prompting' | 'language-modeling' | 'pretrain-finetune' | 'alignment'
  | 'cv-basics' | 'classification' | 'detection' | 'segmentation'
  | 'wrangling' | 'viz' | 'exp'
  | 'math-la' | 'math-calc' | 'math-prob' | 'math-stats' | 'optim' | 'info-theory' | 'numerical'
  | 'learn-theory' | 'regularization'
  | 'bayesian' | 'pgm' | 'vi' | 'mcmc'
  | 'vae' | 'gan' | 'diffusion' | 'flow'
  | 'rl' 
  | 'graph-ml' | 'spectral-graph'
  | 'time-series' | 'state-space' | 'kalman'
  | 'ir' | 'rag' | 'rerank' | 'indexing'
  | 'recsys' | 'mf' | 'bandits'
  | 'robust' | 'adv-ml' | 'privacy-dp'
  | 'xai' | 'shapley' | 'attribution'
  | 'causal' | 'counterfactuals' | 'causal-discovery'
  | 'quantum' | 'q-algorithms' | 'q-error' | 'qml' | 'qml-kernels' | 'vqc' | 'qml-hybrid' | 'qml-encoding'
  | 'consciousness' | 'consciousness-theories' | 'sentience-ethics' | 'measurement-tests';

function getCategory(subdomain: string): TopicCategory {
  const s = subdomain.toLowerCase();
  // Core + ethics
  if (s.includes('foundation')) return 'ai-foundations';
  if (s.includes('history')) return 'ai-history';
  if (s.includes('application')) return 'ai-apps';
  if (s.includes('responsible') || s.includes('ethic')) return 'ai-ethics';
  // Math & theory
  if (s.includes('linear algebra')) return 'math-la';
  if (s.includes('calculus')) return 'math-calc';
  if (s.includes('probability')) return 'math-prob';
  if (s.includes('statistics')) return 'math-stats';
  if (s.includes('optimization')) return 'optim';
  if (s.includes('information theory')) return 'info-theory';
  if (s.includes('numerical')) return 'numerical';
  if (s.includes('bias–variance') || s.includes('bias-variance') || s.includes('vc') || s.includes('pac') || s.includes('generalization') || s.includes('rademacher') || s.includes('uniform convergence') || s.includes('stability') || s.includes('margin')) return 'learn-theory';
  if (s.includes('regularization')) return 'regularization';
  // ML classical
  if (s.includes('supervised')) return 'supervised';
  if (s.includes('unsupervised')) return 'unsupervised';
  if (s.includes('feature')) return 'feature-eng';
  if (s.includes('evaluation')) return 'eval';
  if (s.includes('kernel')) return 'kernel';
  if (s.includes('support vector')) return 'svm';
  if (s.includes('tree') || s.includes('forest') || s.includes('boost') || s.includes('knn')) return 'supervised';
  if (s.includes('naive') || s.includes('bayes')) return 'bayesian';
  if (s.includes('anomaly')) return 'unsupervised';
  // DL + generative
  if (s.includes('neural')) return 'nn';
  if (s.includes('initialization') || s.includes('normalization')) return 'init-norm';
  if (s.includes('optimization in dl')) return 'optim-dl';
  if (s.includes('convolution') || s.includes('cnn')) return 'cnn';
  if (s.includes('transformer')) return 'transformers';
  if (s.includes('vae') || s.includes('autoenc')) return 'vae';
  if (s.includes('gan')) return 'gan';
  if (s.includes('diffusion')) return 'diffusion';
  if (s.includes('flow')) return 'flow';
  // NLP
  if (s.includes('language modeling')) return 'language-modeling';
  if (s.includes('pretraining') || s.includes('finetuning') || s.includes('fine')) return 'pretrain-finetune';
  if (s.includes('alignment')) return 'alignment';
  if (s.includes('preprocessing') || s.includes('text') || s.includes('tokenization') || s.includes('tokenize')) return 'text-prep';
  if (s.includes('embedding') || s.includes('vector') || s.includes('contrastive')) return 'embeddings';
  if (s.includes('prompt')) return 'prompting';
  // CV
  if (s.includes('image basics') || (s.includes('image') && !s.includes('classification') && !s.includes('detection') && !s.includes('segmentation'))) return 'cv-basics';
  if (s.includes('classification')) return 'classification';
  if (s.includes('detection')) return 'detection';
  if (s.includes('segmentation')) return 'segmentation';
  // Data science
  if (s.includes('wrangling')) return 'wrangling';
  if (s.includes('visual')) return 'viz';
  if (s.includes('experiment')) return 'exp';
  // Graph / Time series
  if ((s.includes('graph') && s.includes('theory')) || s.includes('graph neural') || s.includes('knowledge graph') || (s.includes('graph') && s.includes('recs'))) return 'graph-ml';
  if (s.includes('spectral')) return 'spectral-graph';
  if (s.includes('forecasting') || s.includes('time series')) return 'time-series';
  if (s.includes('state-space')) return 'state-space';
  if (s.includes('kalman') || s.includes('particle')) return 'kalman';
  // IR / RAG / Recsys
  if (s.includes('retrieval')) return 'ir';
  if (s.includes('index')) return 'indexing';
  if (s.includes('rerank')) return 'rerank';
  if (s.includes('rag')) return 'rag';
  if (s.includes('recommender') || s.includes('recommend') || s.includes('collaborative')) return 'recsys';
  if (s.includes('matrix factor')) return 'mf';
  if (s.includes('bandit')) return 'bandits';
  // Robustness & XAI
  if (s.includes('distribution shift') || s.includes('ood')) return 'robust';
  if (s.includes('adversarial') || s.includes('poison')) return 'adv-ml';
  if (s.includes('differential privacy') || s.includes('privacy')) return 'privacy-dp';
  if (s.includes('shapley')) return 'shapley';
  if (s.includes('feature importance')) return 'xai';
  if (s.includes('probing') || s.includes('attribution') || s.includes('concept')) return 'attribution';
  // Causality
  if ((s.includes('causal') && s.includes('graph')) || s.includes('instrumental') || s.includes('uplift')) return 'causal';
  if (s.includes('counterfactual')) return 'counterfactuals';
  if (s.includes('causal discovery') || (s.includes('causal') && s.includes('discovery'))) return 'causal-discovery';
  // RL
  if (s.includes('reinforcement') || s.includes('dynamic programming') || s.includes('policy') || s.includes('actor') || s.includes('critic') || s.includes('exploration') || s.includes('offline') || s.includes('imitation')) return 'rl';
  // Quantum + QML
  if (s.includes('quantum') && (s.includes('qubit') || s.includes('gate') || s.includes('circuit') || s.includes('algorithm') || s.includes('error') || s.includes('noise'))) {
    if (s.includes('algorithm')) return 'q-algorithms';
    if (s.includes('error') || s.includes('noise')) return 'q-error';
    return 'quantum';
  }
  if (s.includes('quantum') && (s.includes('kernel') || s.includes('vqc') || s.includes('variational') || s.includes('hybrid') || s.includes('encoding'))) {
    if (s.includes('kernel')) return 'qml-kernels';
    if (s.includes('vqc') || s.includes('variational')) return 'vqc';
    if (s.includes('hybrid')) return 'qml-hybrid';
    if (s.includes('encoding')) return 'qml-encoding';
    return 'qml';
  }
  // Consciousness
  if (s.includes('conscious') || s.includes('sentience') || s.includes('measurement') || s.includes('philosoph')) {
    if (s.includes('theories') || s.includes('iit') || s.includes('gwt')) return 'consciousness-theories';
    if (s.includes('sentience') || s.includes('ethics')) return 'sentience-ethics';
    if (s.includes('measurement') || s.includes('test')) return 'measurement-tests';
    return 'consciousness';
  }
  return 'ai-foundations';
}

const contentSeeds: Record<TopicCategory, { overview: string[]; pitfalls: string[]; walkthrough: string[]; q1: {question:string;options:string[];answer:number}[]; q2: {question:string;options:string[];answer:number}[]; q3: {question:string;options:string[];answer:number}[]; } > = {
  'ai-foundations': {
    overview: [
      'AI learns patterns from data rather than hard-coded rules',
      'Inputs → model → outputs is the core loop',
      'Evaluation and iteration make systems useful'
    ],
    pitfalls: [
      'Confusing correlation with causation',
      'Assuming more data always fixes everything',
      'Not testing on realistic scenarios'
    ],
    walkthrough: [
      'Define goal and success metric',
      'Collect small starter dataset',
      'Train, evaluate, and iterate'
    ],
    q1: [
      { question: 'AI primarily learns by…', options: ['Random guessing', 'Patterns in data', 'Magic rules', 'Manual if-else'], answer: 1 },
      { question: 'A core loop is…', options: ['Inputs → model → outputs', 'Code → compile → ship', 'Plan → do → review', 'Chat → answer → done'], answer: 0 }
    ],
    q2: [
      { question: 'A small first step is…', options: ['Perfect dataset', 'Start with a tiny sample', 'Skip evaluation', 'Ignore labels'], answer: 1 }
    ],
    q3: [
      { question: 'A good habit is…', options: ['Assume it works', 'Iterate with feedback', 'Avoid testing', 'Hide errors'], answer: 1 }
    ]
  },
  'ai-history': {
    overview: ['1956 Dartmouth workshop coined “AI”', 'Winters and booms shaped research', 'Modern deep learning fueled breakthroughs'],
    pitfalls: ['Overhyping cycles repeat', 'Underestimating compute needs', 'Ignoring data quality'],
    walkthrough: ['Timeline: symbolic → ML → deep learning', 'Key milestones: ImageNet, Go, LLMs', 'Link history to practice today'],
    q1: [
      { question: 'The term “AI” was coined around…', options: ['1956', '1972', '1995', '2015'], answer: 0 },
      { question: 'Recent progress was driven by…', options: ['Luck', 'Compute + data + algorithms', 'Only compute', 'Only algorithms'], answer: 1 }
    ],
    q2: [{ question: 'A helpful lens on AI history is…', options: ['Ignore it', 'Learn patterns across cycles', 'Only memorize dates', 'Only read opinions'], answer: 1 }],
    q3: [{ question: 'A lesson from winters is…', options: ['Hype forever', 'Balance expectations', 'Avoid research', 'Only small models'], answer: 1 }]
  },
  'ai-apps': {
    overview: ['Personalization (feeds, recs)', 'Perception (vision, speech)', 'Automation (assistants, workflows)'],
    pitfalls: ['Ignoring users and context', 'One-size-fits-all models', 'No human-in-the-loop'],
    walkthrough: ['Map user task', 'Choose data + model', 'Ship, measure, iterate'],
    q1: [
      { question: 'An example of personalization is…', options: ['Random order', 'Recommended videos', 'Static pages', 'Manual curation only'], answer: 1 },
      { question: 'A good launch plan includes…', options: ['No metrics', 'Measure and iterate', 'Ignore users', 'Only big model'], answer: 1 }
    ],
    q2: [{ question: 'Automation helps when…', options: ['Task never repeats', 'Task repeats and has data', 'No data exists', 'Only humans decide'], answer: 1 }],
    q3: [{ question: 'Human-in-the-loop means…', options: ['Remove humans', 'Humans guide and verify', 'Robots only', 'No QA'], answer: 1 }]
  },
  'ai-ethics': {
    overview: ['Fairness (avoid bias)', 'Privacy (protect data)', 'Safety (robustness, misuse)'],
    pitfalls: ['No audits', 'Using sensitive data carelessly', 'Ignoring failure modes'],
    walkthrough: ['Define harms', 'Mitigate (data, model, UX)', 'Monitor post-launch'],
    q1: [
      { question: 'Fairness means…', options: ['Same outputs always', 'Avoid unjust bias', 'No randomness', 'Only accuracy matters'], answer: 1 },
      { question: 'Privacy includes…', options: ['Sharing raw data', 'Minimizing sensitive data', 'Posting logs', 'Ignoring consent'], answer: 1 }
    ],
    q2: [{ question: 'Safety work includes…', options: ['No tests', 'Adversarial checks', 'Ignore issues', 'Only uptime'], answer: 1 }],
    q3: [{ question: 'Post-launch you should…', options: ['Stop monitoring', 'Track impact and drift', 'Hide metrics', 'Ignore users'], answer: 1 }]
  },
  'supervised': {
    overview: ['Labeled data drives learning', 'Loss functions guide optimization', 'Generalization is the goal'],
    pitfalls: ['Leakage from test to train', 'Overfitting small datasets', 'Mis-specified labels'],
    walkthrough: ['Split data (train/val/test)', 'Train baseline', 'Tune and compare'],
    q1: [
      { question: 'Supervised uses…', options: ['Unlabeled data', 'Labeled examples', 'Only rewards', 'No data'], answer: 1 },
      { question: 'Overfitting is…', options: ['Great generalization', 'Memorizing train data', 'Too little training', 'Perfect fairness'], answer: 1 }
    ],
    q2: [{ question: 'A solid split is…', options: ['Train=100%', 'Train/Val/Test', 'Only test', 'Only train'], answer: 1 }],
    q3: [{ question: 'A simple baseline helps because…', options: ['It’s perfect', 'It sets a reference', 'It replaces testing', 'It avoids labels'], answer: 1 }]
  },
  'unsupervised': {
    overview: ['No labels; discover structure', 'Clustering and dimensionality reduction', 'Use for exploration and pre-processing'],
    pitfalls: ['Forcing clusters', 'Over-reading noisy groupings', 'No validation'],
    walkthrough: ['Pick features', 'Try clustering + silhouette', 'Interpret carefully'],
    q1: [
      { question: 'Unsupervised focuses on…', options: ['Labels', 'Structure in data', 'Only rewards', 'No math'], answer: 1 },
      { question: 'A classic method is…', options: ['K-means', 'Linear regression', 'Q-learning', 'Logistic regression'], answer: 0 }
    ],
    q2: [{ question: 'Dimensionality reduction helps by…', options: ['Adding noise', 'Simplifying features', 'Hiding patterns', 'Duplicating data'], answer: 1 }],
    q3: [{ question: 'Validation can use…', options: ['Silhouette score', 'Only vibes', 'No metrics', 'Coin flips'], answer: 0 }]
  },
  'feature-eng': {
    overview: ['Quality features matter', 'Domain signals beat guesswork', 'Avoid leakage'],
    pitfalls: ['Using target in features', 'Duplicating information', 'Ignoring missingness'],
    walkthrough: ['Audit columns', 'Create candidates', 'Select and validate'],
    q1: [
      { question: 'Leakage is when…', options: ['Train equals test', 'Future info in training', 'No labels', 'Only strings'], answer: 1 },
      { question: 'A good habit is…', options: ['Skip EDA', 'Feature audits', 'Random features only', 'Ignore domain'], answer: 1 }
    ],
    q2: [{ question: 'Handling missing values includes…', options: ['Drop/Impute', 'Ignore', 'Replace with 0 always', 'Fail build'], answer: 0 }],
    q3: [{ question: 'Feature selection helps…', options: ['Overfit more', 'Reduce noise', 'Increase bugs', 'Break labels'], answer: 1 }]
  },
  'eval': {
    overview: ['Choose metrics by problem', 'Precision/Recall trade-offs', 'Calibration and robustness'],
    pitfalls: ['Optimizing wrong metric', 'No holdout/bootstrapping', 'Cherry-picking'],
    walkthrough: ['Define metric + threshold', 'Cross-validate', 'Report with confidence'],
    q1: [
      { question: 'For imbalanced classes, prefer…', options: ['Accuracy only', 'Precision/Recall/F1', 'BLEU', 'MSE'], answer: 1 },
      { question: 'Calibration checks…', options: ['Runtime', 'Probability accuracy', 'File size', 'Docs'], answer: 1 }
    ],
    q2: [{ question: 'A robust report includes…', options: ['One metric', 'Multiple metrics + CIs', 'Only anecdotes', 'No plots'], answer: 1 }],
    q3: [{ question: 'Cross-validation helps…', options: ['Leak info', 'Estimate generalization', 'Slow only', 'Overfit test'], answer: 1 }]
  },
  // Math & theory
  'math-la': { overview: ['Vectors, matrices, tensors', 'Eigenvalues/eigenvectors', 'SVD and PCA connections'], pitfalls: ['Mismatched shapes', 'Ignoring conditioning', 'Treating SVD as magic'], walkthrough: ['Review vector ops', 'Matrix factorizations', 'Apply to PCA'], q1: [{question:'PCA relates to…', options:['LU','SVD','QR','Cholesky'], answer:1}], q2: [{question:'Condition number indicates…', options:['Stability','Speed','Accuracy always','Batch size'], answer:0}], q3: [{question:'An eigenvector is…', options:['Zero vector','Scaled by matrix','Random vector','Orthogonal always'], answer:1}] },
  'math-calc': { overview: ['Derivatives and gradients', 'Chain rule powers backprop', 'Taylor approximations'], pitfalls: ['Ignoring non-differentiability', 'Wrong derivative shapes', 'Finite-diff precision'], walkthrough: ['Differentiate simple comps', 'Use chain rule', 'Check numerical grads'], q1: [{question:'Backprop relies on…', options:['Chain rule','FFT','QR','SVD'], answer:0}], q2: [{question:'Numerical gradient issues include…', options:['Round-off & step size','None','Always exact','Faster than autodiff'], answer:0}], q3: [{question:'Gradient points…', options:['Max','Min','Steepest ascent','Random'], answer:2}] },
  'math-prob': { overview: ['Random variables', 'Expectations & variance', 'Bayes rule'], pitfalls: ['Confusing independence with disjoint', 'Forgetting conditioning', 'Assuming Gaussian always'], walkthrough: ['Define variables', 'Compute expectations', 'Use Bayes rule'], q1: [{question:'Bayes rule uses…', options:['P(A|B)','P(B|A)','P(A)','All of these'], answer:3}], q2: [{question:'Variance measures…', options:['Spread','Center','Skew','Tail'], answer:0}], q3: [{question:'Independence implies…', options:['P(A,B)=P(A)P(B)','P(A)=P(B)','Mutual exclusivity','Equality'], answer:0}] },
  'math-stats': { overview: ['Estimators & bias', 'Confidence intervals', 'Hypothesis testing'], pitfalls: ['P-hacking', 'Peeking early', 'Misinterpreting p-values'], walkthrough: ['Define estimator', 'CI computation', 'Test with power'], q1: [{question:'p-value is…', options:['Pr(null true)','Pr(data|null)','Effect size','CI'], answer:1}], q2: [{question:'Power increases with…', options:['Sample size','Noise','Lower alpha','Randomness'], answer:0}], q3: [{question:'Bias is…', options:['Variance','Systematic error','Random error','None'], answer:1}] },
  'optim': { overview: ['Convex vs non-convex', 'GD/SGD/Adam families', 'Constraints & duality'], pitfalls: ['Too high LR', 'Ignoring constraints', 'No convergence checks'], walkthrough: ['Choose optimizer', 'Schedule LR', 'Monitor objective'], q1: [{question:'SGD uses…', options:['Full batch','Mini-batches','No gradient','Second order'], answer:1}], q2: [{question:'Convex problems have…', options:['Local minima only','Global minimum','No minima','Chaos'], answer:1}], q3: [{question:'Duality helps with…', options:['Randomness','Constraints','Data loading','Plotting'], answer:1}] },
  'info-theory': { overview: ['Entropy measures uncertainty', 'KL divergence compares dists', 'Mutual information links vars'], pitfalls: ['Symmetry assumptions', 'Units confusion (bits/nats)', 'Overusing MI'], walkthrough: ['Compute entropy', 'KL examples', 'MI in features'], q1: [{question:'Entropy of fair coin is…', options:['0','1 bit','2 bits','log n'], answer:1}], q2: [{question:'KL(P||Q) equals…', options:['KL(Q||P)','0 if P=Q','Always > 1','Entropy'], answer:1}], q3: [{question:'MI is…', options:['Unrelated to entropy','I(X;Y)','KL only','Variance'], answer:1}] },
  'numerical': { overview: ['Stability & conditioning', 'Floating point pitfalls', 'Iterative solvers'], pitfalls: ['Catastrophic cancellation', 'No tolerance checks', 'Ignoring scaling'], walkthrough: ['Scale inputs', 'Pick tolerances', 'Use stable algos'], q1: [{question:'Double precision has ~…', options:['7 digits','16 digits','32 digits','64 digits'], answer:1}], q2: [{question:'Cancellation occurs when…', options:['Adding big+small','Subtracting near-equals','Multiplying ints','Dividing by 2'], answer:1}], q3: [{question:'Stability relates to…', options:['Algorithm error amplification','Data size','GPU count','Libraries'], answer:0}] },
  'learn-theory': { overview: ['Capacity and generalization', 'VC dimension & PAC', 'Regularization controls complexity'], pitfalls: ['Overfitting', 'Data leakage', 'Weak baselines'], walkthrough: ['Bound risk', 'Control capacity', 'Validate with holdout'], q1: [{question:'VC dimension quantifies…', options:['Runtime','Capacity','Bias','Variance'], answer:1}], q2: [{question:'PAC stands for…', options:['Probably Approximately Correct','Partial Accuracy Constraint','Probabilistic Accuracy Curve','Prior Approximate Confidence'], answer:0}], q3: [{question:'Regularization reduces…', options:['Bias','Variance/overfitting','Data size','Noise'], answer:1}] },
  'regularization': { overview: ['L1 vs L2', 'Early stopping', 'Dropout'], pitfalls: ['Too strong penalty', 'Zeroing useful weights', 'Mismatch with features'], walkthrough: ['Pick penalty', 'Tune strength', 'Monitor val loss'], q1: [{question:'L1 promotes…', options:['Sparsity','Smoothness','Instability','Overfit'], answer:0}], q2: [{question:'Early stopping uses…', options:['Train loss','Val loss','Test loss','Random'], answer:1}], q3: [{question:'Dropout acts as…', options:['Ensemble effect','LR schedule','BatchNorm','Optimizer'], answer:0}] },
  'bayesian': { overview: ['Prior + likelihood → posterior', 'Uncertainty quantification', 'Predictive distributions'], pitfalls: ['Improper priors', 'Intractable posteriors', 'Conjugacy assumptions'], walkthrough: ['Choose prior', 'Compute/approx posterior', 'Posterior predictive'], q1: [{question:'Bayes theorem updates…', options:['Data','Priors to posteriors','Loss','Gradients'], answer:1}], q2: [{question:'Posterior predictive averages over…', options:['Parameters','Data only','Noise only','Labels only'], answer:0}], q3: [{question:'Conjugate priors…', options:['Never exist','Simplify updates','Increase bias','Break math'], answer:1}] },
  'pgm': { overview: ['Graphs encode factorization', 'Bayes nets vs Markov nets', 'Inference via message passing'], pitfalls: ['Cycles in DAGs', 'Wrong conditional independencies', 'Approx inference errors'], walkthrough: ['Build graph', 'Factorize joint', 'Infer with BP'], q1: [{question:'A DAG must be…', options:['Acyclic','Cyclic','Fully connected','Random'], answer:0}], q2: [{question:'Belief propagation passes…', options:['Nodes','Messages','Edges','Labels'], answer:1}], q3: [{question:'Markov blanket includes…', options:['Parents & children & co-parents','Only parents','Only children','Neighbors only'], answer:0}] },
  'vi': { overview: ['Approximate posteriors', 'ELBO objective', 'Amortized inference'], pitfalls: ['Too simple family', 'Collapsed variance', 'Optimization traps'], walkthrough: ['Choose family', 'Optimize ELBO', 'Check calibration'], q1: [{question:'ELBO stands for…', options:['Evidence Lower Bound','Expected Likelihood Bound','Entropy Lower Bound','Evidence Log Bound'], answer:0}], q2: [{question:'Amortized inference uses…', options:['Global params','Neural nets','No params','Exact sums'], answer:1}], q3: [{question:'VI trades bias for…', options:['Variance','Speed','Nothing','Labels'], answer:1}] },
  'mcmc': { overview: ['Sampling from posterior', 'Markov chains', 'Metropolis-Hastings/HMC'], pitfalls: ['Poor mixing', 'Burn-in ignored', 'Auto-correlation'], walkthrough: ['Choose kernel', 'Tune steps', 'Check ESS'], q1: [{question:'MCMC draws…', options:['Exact samples','Correlated samples','Independent always','MAP only'], answer:1}], q2: [{question:'HMC uses…', options:['Momentum','No gradients','Pure random walk','No tuning'], answer:0}], q3: [{question:'Effective sample size reflects…', options:['Mixing quality','Batch size','Model size','Prior'], answer:0}] },
  'kernel': { overview: ['Feature maps', 'Kernel trick', 'Common kernels (RBF, poly)'], pitfalls: ['Wrong bandwidth', 'Scaling issues', 'No validation'], walkthrough: ['Pick kernel', 'Tune hyperparams', 'Evaluate gen'], q1: [{question:'Kernel trick avoids…', options:['Nonlinearity','Explicit features','Training','Loss'], answer:1}], q2: [{question:'RBF bandwidth controls…', options:['Smoothness','Noise','Labels','Classes'], answer:0}], q3: [{question:'Mercer’s theorem relates to…', options:['Positive semidefinite', 'Convexity', 'Causality', 'Entropy'], answer:0}] },
  'svm': { overview: ['Margins and support vectors', 'Soft vs hard margin', 'Kernels for nonlinear'], pitfalls: ['C cost extremes', 'Unscaled features', 'Imbalanced data'], walkthrough: ['Scale data', 'Tune C and kernel', 'Inspect support vectors'], q1: [{question:'SVM aims to…', options:['Min loss','Max margin','Min entropy','Max variance'], answer:1}], q2: [{question:'Support vectors are…', options:['All points','Points on/near boundary','Random subset','Outliers only'], answer:1}], q3: [{question:'Slack variable allows…', options:['Perfect separation','Misclassification','No regularization','No kernel'], answer:1}] },
  // DL specifics
  'init-norm': { overview: ['Xavier/He init', 'BatchNorm/LayerNorm', 'Stabilize training'], pitfalls: ['Wrong variance', 'Stat mismatches', 'Train/test drift'], walkthrough: ['Choose init', 'Apply normalization', 'Monitor activations'], q1: [{question:'BatchNorm normalizes…', options:['Over batch','Per channel','Per weight','Entire dataset only'], answer:0}], q2: [{question:'He init suits…', options:['Tanh','ReLU','Sigmoid','Linear only'], answer:1}], q3: [{question:'LayerNorm normalizes over…', options:['Batch','Features','Time','Nothing'], answer:1}] },
  'optim-dl': { overview: ['SGD with momentum', 'Adam/AdamW', 'Schedules (cosine, warmup)'], pitfalls: ['Too much momentum', 'No weight decay', 'Bad schedule'], walkthrough: ['Pick optimizer', 'Set schedule', 'Track loss & gen'], q1: [{question:'AdamW fixes…', options:['Noisy grads','Weight decay decoupling','LR explosion','Batch size'], answer:1}], q2: [{question:'Warmup helps when…', options:['Large LR/Transformer training','Small models only','Conv nets only','Never'], answer:0}], q3: [{question:'Momentum accelerates…', options:['Convergence along valleys','Overfitting','Data loading','Regularization'], answer:0}] },
  // CV/NLP add-ons
  'segmentation': { overview: ['Pixel-wise prediction', 'IoU/Dice metrics', 'UNet/DeepLab'], pitfalls: ['Class imbalance', 'Boundary errors', 'Resolution trade-offs'], walkthrough: ['Augment & balance', 'Tune thresholds', 'Measure IoU/Dice'], q1: [{question:'Segmentation predicts…', options:['Boxes','Classes per pixel','Keypoints','Clusters'], answer:1}], q2: [{question:'Common metric is…', options:['BLEU','IoU/Dice','F1 only','mAP'], answer:1}], q3: [{question:'A popular architecture is…', options:['UNet','RNN','Naive Bayes','KNN'], answer:0}] },
  'language-modeling': { overview: ['Next-token prediction', 'Perplexity', 'Scaling laws (brief)'], pitfalls: ['Data contamination', 'Tokenization mismatches', 'Context limits'], walkthrough: ['Tokenize', 'Train/finetune', 'Evaluate ppl'], q1: [{question:'Perplexity measures…', options:['Diversity','Cross-entropy exp','Latency','Size'], answer:1}], q2: [{question:'Context windows are…', options:['Unlimited','Token-limited','Unrelated','Bytes only'], answer:1}], q3: [{question:'Scaling laws imply…', options:['No gains with compute','Predictable returns','Random behavior','Only data matters'], answer:1}] },
  'pretrain-finetune': { overview: ['Pretrain on broad data', 'Finetune on task', 'Adapters/LoRA'], pitfalls: ['Catastrophic forgetting', 'Domain shift', 'Overfitting'], walkthrough: ['Choose base', 'Select finetune method', 'Evaluate transfer'], q1: [{question:'LoRA updates…', options:['All weights','Low-rank adapters','Only bias','Embeddings only'], answer:1}], q2: [{question:'Finetuning risk is…', options:['Better transfer','Forgetting base knowledge','Zero-shot only','No drift'], answer:1}], q3: [{question:'Adapters help by…', options:['Freezing base model','Increasing params hugely','Removing layers','Changing tokenizer'], answer:0}] },
  'alignment': { overview: ['Safety objectives', 'RLHF/RLAIF', 'Guardrails & evals'], pitfalls: ['Spec gaps', 'Over-optimization', 'Prompt injection'], walkthrough: ['Define policies', 'Collect feedback', 'Evaluate harms'], q1: [{question:'RLHF uses…', options:['Human preferences','Only labels','No feedback','Randomness'], answer:0}], q2: [{question:'Prompt injection is…', options:['Harmless','Adversarial instruction', 'Tokenization bug', 'Latency issue'], answer:1}], q3: [{question:'Guardrails include…', options:['No filters','Policies & classifiers', 'Random prompts', 'Ignoring context'], answer:1}] },
  // Graph/Time series/IR/Recsys
  'graph-ml': { overview: ['Graphs: nodes/edges', 'Message passing', 'Homophily/heterophily'], pitfalls: ['Over-smoothing', 'Noisy edges', 'Train/test leakage'], walkthrough: ['Build graph', 'GNN layers', 'Evaluate per-split'], q1: [{question:'Message passing aggregates…', options:['Labels','Neighbor features','Random noise','Pixels'], answer:1}], q2: [{question:'Over-smoothing causes…', options:['Distinct features','Indistinguishable nodes','Faster training','Better gen'], answer:1}], q3: [{question:'Homophily means…', options:['Similar nodes connect','Opposites attract','Random edges','Directed only'], answer:0}] },
  'spectral-graph': { overview: ['Laplacian eigenvectors', 'Spectral clustering', 'Cut objectives'], pitfalls: ['Choosing k', 'Scale sensitivity', 'Interpretation'], walkthrough: ['Compute Laplacian', 'Eigen-decompose', 'Cluster in eigenspace'], q1: [{question:'Graph Laplacian relates to…', options:['Adjacency inverse','Degree - adjacency','Only adjacency', 'Random'], answer:1}], q2: [{question:'Spectral clustering uses…', options:['Random init only','Eigenvectors of Laplacian','No eigens', 'Gradients'], answer:1}], q3: [{question:'Normalized cut balances…', options:['Within-only','Cut/association', 'Degrees only','None'], answer:1}] },
  'time-series': { overview: ['Autocorrelation', 'Stationarity', 'ARIMA basics'], pitfalls: ['Non-stationarity', 'Leakage over time', 'Over-differencing'], walkthrough: ['Check ACF/PACF', 'Difference if needed', 'Validate temporally'], q1: [{question:'Temporal split should…', options:['Shuffle','Respect time order','Random by class','K-fold only'], answer:1}], q2: [{question:'ARIMA combines…', options:['AR+I+MA','AUC+ROC','ACF+PACF','FFT only'], answer:0}], q3: [{question:'Stationarity roughly means…', options:['Constant mean/variance', 'No outliers', 'Gaussian', 'IID'], answer:0}] },
  'state-space': { overview: ['Latent state + observations', 'Transition and emission', 'Control (LQR) basics'], pitfalls: ['Unobservable states', 'Bad noise models', 'Smoothing errors'], walkthrough: ['Specify model', 'Filter/smooth', 'Estimate params'], q1: [{question:'State-space models include…', options:['Hidden states','Only observations','No noise','Only IID'], answer:0}], q2: [{question:'LQR solves…', options:['Control optimization','Classification', 'Clustering', 'RAG'], answer:0}], q3: [{question:'Smoothing uses…', options:['Future data','Noisy labels','No filters','Random walk'], answer:0}] },
  'kalman': { overview: ['Kalman filter assumptions', 'Prediction-update cycle', 'Extended/Unscented variants'], pitfalls: ['Nonlinearities', 'Wrong noise covariances', 'Divergence'], walkthrough: ['Initialize', 'Predict/update', 'Tune Q/R'], q1: [{question:'Kalman assumes…', options:['Linear-Gaussian','Nonlinear', 'No noise','Poisson'], answer:0}], q2: [{question:'Update step fuses…', options:['Prior + measurement','Only prior','Only measurement','Neither'], answer:0}], q3: [{question:'EKF handles…', options:['Nonlinear dynamics','No dynamics','IID data','No control'], answer:0}] },
  'ir': { overview: ['BM25 and neural retrievers', 'Recall/precision trade-off', 'Index quality matters'], pitfalls: ['Poor tokenization', 'Bad stemming', 'Shallow ranking'], walkthrough: ['Choose retriever', 'Tune BM25/dual encoders', 'Measure recall@k'], q1: [{question:'BM25 is a…', options:['Neural model','Term weighting scheme','Loss function','Tokenizer'], answer:1}], q2: [{question:'Recall@k measures…', options:['Fraction relevant retrieved','Probability error','Calibration','Latency'], answer:0}], q3: [{question:'Dual encoders use…', options:['Two towers','One tower','No embeddings','Rules'], answer:0}] },
  'indexing': { overview: ['HNSW/IVF/Flat indexes', 'Trade accuracy/latency', 'Vector normalization'], pitfalls: ['Wrong efSearch/efConst', 'No PQ training', 'Memory blowup'], walkthrough: ['Pick index', 'Train PQ (if any)', 'Tune params'], q1: [{question:'HNSW is…', options:['Graph-based ANN','Tree index','Hash index','Brute force'], answer:0}], q2: [{question:'IVF clusters vectors then…', options:['Exhaustive search','Search within lists','No search','Hashing'], answer:1}], q3: [{question:'PQ compresses by…', options:['Product quantization','Principal quantization','Post quantization','Priority queue'], answer:0}] },
  'rerank': { overview: ['Cross-encoders for precision', 'Trade cost vs quality', 'Cascade ranking'], pitfalls: ['Too slow', 'No caching', 'Mismatched metrics'], walkthrough: ['Select model', 'Set cutoff', 'Evaluate NDCG'], q1: [{question:'Cross-encoders score…', options:['Pairs jointly','Individually','By BM25','Random'], answer:0}], q2: [{question:'NDCG measures…', options:['Ranking quality','Classification', 'Segmentation','Clustering'], answer:0}], q3: [{question:'Cascades try to…', options:['Increase latency','Reduce cost while accurate','Remove recall','Avoid retrievers'], answer:1}] },
  'rag': { overview: ['Retrieve → Read pipeline', 'Context windows/limits', 'Grounding reduces hallucinations'], pitfalls: ['Poor retrieval', 'No citation formatting', 'Stale indexes'], walkthrough: ['Build index', 'Tune retriever', 'Format answers with sources'], q1: [{question:'RAG stands for…', options:['Retrieval-Augmented Generation','Random Answer Generator','Robust AI Guidance','Ranking And Generation'], answer:0}], q2: [{question:'Grounding aims to…', options:['Increase hallucinations','Tie outputs to sources','Hide citations','Speed training'], answer:1}], q3: [{question:'A bottleneck often is…', options:['Retriever quality','Tokenizer', 'CSS', 'Navbar'], answer:0}] },
  'recsys': { overview: ['Explicit vs implicit feedback', 'Cold start challenges', 'Evaluation pitfalls'], pitfalls: ['Popularity bias', 'Feedback loops', 'Train/test leakage'], walkthrough: ['Collect signals', 'Matrix factorization/baselines', 'A/B test carefully'], q1: [{question:'Implicit feedback example…', options:['Ratings','Clicks','Text reviews','Coupons'], answer:1}], q2: [{question:'Feedback loops can…', options:['Improve fairness','Reinforce bias','Fix drift','Stop ASAP'], answer:1}], q3: [{question:'MAP@k is…', options:['Mean Average Precision@k','Maximum Average Probability','Model Average Performance','Mean Active Preference'], answer:0}] },
  'mf': { overview: ['Latent factors', 'User×Item matrices', 'Regularization'], pitfalls: ['Sparse data', 'Overfitting', 'No cold-start plan'], walkthrough: ['Factorize', 'Tune ranks', 'Hybrid with content'], q1: [{question:'Matrix factorization decomposes…', options:['A×B','User-item matrix','Covariance only','Graph Laplacian'], answer:1}], q2: [{question:'Rank controls…', options:['Number of factors','Learning rate','Loss type','Batch size'], answer:0}], q3: [{question:'Cold start mitigation includes…', options:['Do nothing','Content features','Remove users','Random items'], answer:1}] },
  'bandits': { overview: ['Explore–exploit trade-off', 'UCB/Thompson sampling', 'Contextual bandits'], pitfalls: ['Greedy only', 'No uncertainty', 'Non-stationarity'], walkthrough: ['Pick algorithm', 'Track regret', 'Update policy'], q1: [{question:'UCB selects by…', options:['Mean only','Upper confidence bounds','Lower bounds','Random'], answer:1}], q2: [{question:'Thompson sampling samples…', options:['From posterior','From prior','Uniformly','From noise only'], answer:0}], q3: [{question:'Contextual bandits use…', options:['No features','Features/context','Labels only','Graph edges'], answer:1}] },
  // Robustness & XAI
  'robust': { overview: ['Distro shift types', 'OOD detection', 'Calibration'], pitfalls: ['Train/test mismatch', 'Hidden confounders', 'No monitoring'], walkthrough: ['Stress tests', 'OOD detectors', 'Calibrate'], q1: [{question:'OOD means…', options:['Out-of-data','Out-of-distribution','Out-of-date','Over-on-data'], answer:1}], q2: [{question:'Temperature scaling is for…', options:['Calibration','Speed','Memory','Batching'], answer:0}], q3: [{question:'Robustness testing should include…', options:['Only happy path','Stress & adversarial cases','Docs only','Small samples'], answer:1}] },
  'adv-ml': { overview: ['Adversarial examples', 'Attack/defense taxonomy', 'Certified robustness (brief)'], pitfalls: ['Gradient masking', 'Security by obscurity', 'No threat model'], walkthrough: ['Define threat', 'Test attacks', 'Defend/measure'], q1: [{question:'Projected Gradient Descent is…', options:['Defense','Attack','Optimizer','Metric'], answer:1}], q2: [{question:'Gradient masking can…', options:['Hide vulnerabilities','Improve robustness','Reduce memory','Speed up'], answer:0}], q3: [{question:'Threat model clarifies…', options:['Attacker capability','Color scheme','UI layout','GPU brand'], answer:0}] },
  'privacy-dp': { overview: ['(ε,δ)-DP notion', 'Noise addition', 'Privacy–utility trade-off'], pitfalls: ['Too small ε claim', 'Untracked privacy budget', 'Composition ignored'], walkthrough: ['Choose ε,δ', 'Mechanism (Laplace/Gauss)', 'Account composition'], q1: [{question:'DP roughly bounds…', options:['Change from one record','Runtime','Loss','Size'], answer:0}], q2: [{question:'Composition…', options:['Adds privacy loss','Adds compute only','Unrelated','Removes noise'], answer:0}], q3: [{question:'Smaller ε means…', options:['Stronger privacy','Weaker privacy','No change','More data'], answer:0}] },
  'xai': { overview: ['Permutation/feature importance', 'Partial dependence', 'Counterfactuals'], pitfalls: ['Correlated features', 'Extrapolation', 'Spurious attributions'], walkthrough: ['Choose method', 'Validate causally', 'Communicate limits'], q1: [{question:'Permutation importance measures…', options:['Model accuracy drop','Speed','Latency','Memory'], answer:0}], q2: [{question:'PDP assumes…', options:['Feature independence','Strong correlation','Causality','Graphical models'], answer:0}], q3: [{question:'Counterfactual asks…', options:['What changed?', 'What if?', 'Why logs?', 'Which GPU?'], answer:1}] },
  'shapley': { overview: ['Game-theoretic Shapley values', 'Additivity and symmetry', 'SHAP approximations'], pitfalls: ['High compute', 'Misinterpretation', 'Correlation issues'], walkthrough: ['Background dataset', 'Approx method', 'Explain with care'], q1: [{question:'Shapley values originate in…', options:['Game theory','Topology','RL','Number theory'], answer:0}], q2: [{question:'SHAP explains…', options:['Global only','Local predictions','Only training data','Embeddings'], answer:1}], q3: [{question:'Axioms include…', options:['Efficiency','Asymmetry','Randomness','Causality'], answer:0}] },
  'attribution': { overview: ['Integrated gradients', 'Saliency maps', 'Probing internals'], pitfalls: ['Saturation', 'Noise sensitivity', 'Over-claiming causality'], walkthrough: ['Pick method', 'Smooth or average', 'Validate qualitatively'], q1: [{question:'Integrated gradients integrate…', options:['Loss','Gradients along path','Weights','Time'], answer:1}], q2: [{question:'Saliency can be…', options:['Noisy','Always perfect','Causal proof','Deterministic only'], answer:0}], q3: [{question:'Probing tests…', options:['Representations','Latency','Tokenization','Hardware'], answer:0}] },
  // RL
  'rl': { overview: ['Markov decision processes', 'Value and policy functions', 'Exploration–exploitation'], pitfalls: ['Reward hacking', 'Sparse rewards', 'Function approximation instability'], walkthrough: ['Define MDP', 'Choose algorithm (DP/TD/PG)', 'Tune and eval returns'], q1: [{question:'Bellman equation relates to…', options:['Values','Embeddings','Losses','Images'], answer:0}], q2: [{question:'Policy gradient optimizes…', options:['Value function','Expected return','Entropy only','Replay buffer'], answer:1}], q3: [{question:'Reward hacking is…', options:['Optimizing proxy badly','Great generalization','Regularization','Noise'], answer:0}] },
  // Causality
  'causal': { overview: ['Directed acyclic graphs', 'Backdoor/frontdoor', 'Do-operator'], pitfalls: ['Omitted variables', 'Collider bias', 'Bad adjustment sets'], walkthrough: ['Draw DAG', 'Pick adjustment set', 'Estimate causal effect'], q1: [{question:'Backdoor criterion blocks…', options:['Confounding paths','Mediators','Colliders','Outcomes'], answer:0}], q2: [{question:'Do(X=x) means…', options:['Conditioning','Intervening','Observing','Marginalizing'], answer:1}], q3: [{question:'Collider bias happens when…', options:['Condition on collider','Adjust confounders','Randomize', 'Block backdoors'], answer:0}] },
  'counterfactuals': { overview: ['Potential outcomes', 'Individual-level effects', 'Fairness links'], pitfalls: ['Unobservability', 'Strong assumptions', 'Transportability'], walkthrough: ['Define SCM', 'Counterfactual query', 'Sensitivity analysis'], q1: [{question:'Counterfactual asks…', options:['What happened?','What if different action?', 'Why random?', 'When train?'], answer:1}], q2: [{question:'Ignorability assumes…', options:['No unmeasured confounding','Perfect data','IID','Gaussian'], answer:0}], q3: [{question:'SCM stands for…', options:['Structural Causal Model','Stochastic Controlled Model','Sequential Causal Method','Sampled Causal Map'], answer:0}] },
  'causal-discovery': { overview: ['Constraint-based vs score-based', 'PC/FCI, GES', 'Assumptions matter'], pitfalls: ['Latent confounders', 'Weak signals', 'Faithfulness violations'], walkthrough: ['Choose method', 'Test constraints', 'Validate against domain knowledge'], q1: [{question:'PC algorithm is…', options:['Constraint-based','Score-based','Hybrid','Bayesian net only'], answer:0}], q2: [{question:'Latent confounders can…', options:['Help discovery','Mislead structure learning','Always harmless','Speed up'], answer:1}], q3: [{question:'Faithfulness links…', options:['Graph & independencies','Time & drift','Labels & noise','Loss & LR'], answer:0}] },
  // Quantum
  'quantum': { overview: ['Qubits (superposition)', 'Gates & circuits', 'Measurement collapses state'], pitfalls: ['Decoherence', 'Noisy devices', 'Classical analogies that mislead'], walkthrough: ['Build simple circuits', 'Simulate', 'Reason about measurement'], q1: [{question:'A qubit can be…', options:['0 or 1 only','Superposition of 0 and 1','Only 1','Continuous only'], answer:1}], q2: [{question:'Hadamard gate creates…', options:['Entanglement','Superposition','Measurement','Noise'], answer:1}], q3: [{question:'Measurement…', options:['Preserves state','Collapses state','Creates entanglement','Optimizes loss'], answer:1}] },
  'q-algorithms': { overview: ['Grover’s search', 'Shor’s factoring', 'Amplitude amplification'], pitfalls: ['Qubit counts', 'Depth limits', 'Noise'], walkthrough: ['Map problem to oracle', 'Analyze complexity', 'Compare to classical'], q1: [{question:'Grover offers ~…', options:['Quadratic speedup','Exponential','Linear','None'], answer:0}], q2: [{question:'Shor solves…', options:['Sorting','Factoring','Graph search','Clustering'], answer:1}], q3: [{question:'Algorithms are limited by…', options:['Decoherence/noise','CSS','HTTP','GPU RAM only'], answer:0}] },
  'q-error': { overview: ['Noise sources', 'Quantum error correction codes', 'Fault tolerance'], pitfalls: ['Ignoring thresholds', 'Overhead underestimation', 'Noisy qubits'], walkthrough: ['Characterize noise', 'Pick code', 'Estimate overhead'], q1: [{question:'QEC combats…', options:['Latency','Decoherence/errors','Classical bugs','Overflow'], answer:1}], q2: [{question:'Fault tolerance requires…', options:['Logical qubits','More RAM','More GPUs','Bigger batch'], answer:0}], q3: [{question:'Surface codes are…', options:['A QEC code family','Optimization method','Loss function','Activation'], answer:0}] },
  'qml': { overview: ['Hybrid quantum-classical', 'Parameterized circuits', 'Data re-uploading'], pitfalls: ['Barren plateaus', 'Encoding limits', 'Hardware constraints'], walkthrough: ['Encode data', 'Optimize circuit', 'Evaluate kernels'], q1: [{question:'VQC stands for…', options:['Variational Quantum Circuit','Vector Quantization Code','Variable Quantum Control','Verified Quantum Compiler'], answer:0}], q2: [{question:'Barren plateaus are…', options:['Flat loss landscapes','Fast convergence','Hardware bugs','Tokenizer issues'], answer:0}], q3: [{question:'Hybrid models combine…', options:['Quantum + classical parts','Only quantum','Only classical','Neither'], answer:0}] },
  'qml-kernels': { overview: ['Quantum feature maps', 'Kernel methods', 'Expressivity trade-offs'], pitfalls: ['Noisy embeddings', 'Poor generalization', 'Scaling'], walkthrough: ['Choose feature map', 'Estimate kernel', 'Train SVM/kernel reg'], q1: [{question:'Quantum kernels are used with…', options:['CNNs','SVMs/Kernel methods','Tree models','Bandits only'], answer:1}], q2: [{question:'Feature maps embed data into…', options:['Hilbert space','Graph space','Pixel grid','Token IDs'], answer:0}], q3: [{question:'Noise typically…', options:['Helps generalization','Hurts kernel estimates','No effect','Always helps'], answer:1}] },
  'vqc': { overview: ['Parameterized gates', 'Cost functions', 'Gradient estimation (param-shift)'], pitfalls: ['Vanishing gradients', 'Hardware noise', 'Depth limits'], walkthrough: ['Design ansatz', 'Train with param-shift', 'Validate on task'], q1: [{question:'Param-shift estimates…', options:['Hessians','Gradients','Entropy','KL'], answer:1}], q2: [{question:'Ansatz means…', options:['Model architecture','Optimizer','Loss','Dataset'], answer:0}], q3: [{question:'Depth increase can…', options:['Always improve','Cause barren plateaus','Remove noise','Fix tokens'], answer:1}] },
  'qml-hybrid': { overview: ['Classical pre/post processing', 'Quantum layer within NN', 'Differentiable programming'], pitfalls: ['Interface overhead', 'Gradient mismatch', 'Latency'], walkthrough: ['Build pipeline', 'Ensure differentiability', 'Profile runtime'], q1: [{question:'Hybrid models place quantum…', options:['Everywhere','As layers/modules','Only at end','Nowhere'], answer:1}], q2: [{question:'Autodiff across quantum ops requires…', options:['Parameter-shift/estimators','No gradients','Manual tuning','Backprop off'], answer:0}], q3: [{question:'Latency comes from…', options:['Shots/executions','CSS','Routing','Fonts'], answer:0}] },
  'qml-encoding': { overview: ['Angle and amplitude encoding', 'Data normalization', 'Expressivity vs width'], pitfalls: ['Large dimension needs', 'Noisy encodings', 'Unclear inductive bias'], walkthrough: ['Pick encoding', 'Normalize/scale', 'Test expressivity'], q1: [{question:'Angle encoding uses…', options:['Rotation gates','Amplitudes only','Entanglement only','Noise'], answer:0}], q2: [{question:'Amplitude encoding needs…', options:['2^n amplitudes','n amplitudes','1 amplitude','No amplitudes'], answer:0}], q3: [{question:'Expressivity trades with…', options:['Generalization','Latency only','Fonts','Tokens'], answer:0}] },
  // AI Consciousness
  'consciousness': { overview: ['Definitions and scope', 'Differentiating sentience vs intelligence', 'Operational vs philosophical lenses'], pitfalls: ['Anthropomorphism', 'Category errors', 'Overclaiming'], walkthrough: ['Define terms', 'Frame questions', 'Use careful language'], q1: [{question:'Sentience refers to…', options:['Raw experience/feelings','High intelligence','Parameter count','Speed'], answer:0}], q2: [{question:'Anthropomorphism is…', options:['Attributing human traits', 'Measuring accuracy','Estimating gradients','Compressing data'], answer:0}], q3: [{question:'Operationalization means…', options:['Defining measurable criteria','Changing model weights','Deploying models','Writing prompts'], answer:0}] },
  'consciousness-theories': { overview: ['Global Workspace Theory', 'Integrated Information Theory', 'Higher-order thought'], pitfalls: ['Equating theory with test', 'Measurement issues', 'Scope mismatch'], walkthrough: ['Compare theories', 'Map to AI systems', 'Identify testable claims'], q1: [{question:'IIT centers on…', options:['Integrated information Φ','Sparse coding','Bayesian belief','Tokenizers'], answer:0}], q2: [{question:'GWT involves…', options:['Broadcast workspace', 'Quantum effects', 'Noisy channels', 'Weight decay'], answer:0}], q3: [{question:'A challenge is…', options:['Operationalizing tests','Training speed','GPU count','Tokenizer bugs'], answer:0}] },
  'sentience-ethics': { overview: ['Moral status debates', 'Rights and welfare', 'Risk of over/under-ascribing'], pitfalls: ['Premature claims', 'Neglecting harms', 'Ignoring uncertainty'], walkthrough: ['Set thresholds', 'Define safeguards', 'Review governance'], q1: [{question:'Moral status implies…', options:['Ethical consideration','Higher accuracy', 'Faster models', 'Larger datasets'], answer:0}], q2: [{question:'Over-ascribing can…', options:['Raise unnecessary alarms','Always be safe','Improve evals','Speed dev'], answer:0}], q3: [{question:'Safeguards include…', options:['Ethics review','Ignore concerns','Only speed', 'Secrets'], answer:0}] },
  'measurement-tests': { overview: ['Behavioral tests', 'Self-report vs competence', 'Adversarial probing'], pitfalls: ['Confounds', 'Anthropomorphic prompts', 'Cherry-picking'], walkthrough: ['Design blinded tasks', 'Use controls', 'Report limits'], q1: [{question:'A pitfall is…', options:['Controlled trials','Confounds and bias','Randomization','Power analysis'], answer:1}], q2: [{question:'Self-report may reflect…', options:['True inner states','Training artifacts', 'Instruction following','Hardware'], answer:2}], q3: [{question:'Adversarial probing helps…', options:['Surface failure modes','Hide issues','Prove consciousness','Increase params'], answer:0}] },
  'nn': {
    overview: ['Layers and activations', 'Weights updated by backprop', 'Nonlinearity enables complex functions'],
    pitfalls: ['Vanishing gradients', 'Over-parameterization', 'Poor initialization'],
    walkthrough: ['Start shallow', 'Tune learning rate', 'Add regularization'],
    q1: [
      { question: 'Backprop updates…', options: ['Data', 'Weights', 'Labels', 'Loss only'], answer: 1 },
      { question: 'ReLU is an…', options: ['Optimizer', 'Activation', 'Layer type', 'Loss'], answer: 1 }
    ],
    q2: [{ question: 'To combat overfitting, try…', options: ['Dropout', 'No val set', 'Leak labels', 'Bigger LR only'], answer: 0 }],
    q3: [{ question: 'Initialization matters because…', options: ['Does nothing', 'Affects gradient flow', 'Avoids data', 'Removes activations'], answer: 1 }]
  },
  'cnn': {
    overview: ['Convolutions capture local patterns', 'Pooling adds invariance', 'Useful for images'],
    pitfalls: ['Too small receptive fields', 'Overfitting small datasets', 'Ignoring augmentation'],
    walkthrough: ['Start with pretrained', 'Augment data', 'Fine-tune carefully'],
    q1: [
      { question: 'Convolutions are good for…', options: ['Text only', 'Grid data like images', 'Audio only', 'Random'], answer: 1 },
      { question: 'Pooling provides…', options: ['Overfitting', 'Invariance', 'More params', 'Labels'], answer: 1 }
    ],
    q2: [{ question: 'A strong start is…', options: ['Train from scratch always', 'Use pretrained backbones', 'Avoid augmentation', 'Tiny models only'], answer: 1 }],
    q3: [{ question: 'Data augmentation helps…', options: ['Reduce variance', 'Add leakage', 'Break labels', 'Add noise only'], answer: 0 }]
  },
  'transformers': {
    overview: ['Self-attention weighs tokens', 'Parallelization speeds training', 'Great for language and more'],
    pitfalls: ['Context limits', 'Data contamination', 'Hallucination risks'],
    walkthrough: ['Tokenize', 'Embed', 'Attend and decode'],
    q1: [
      { question: 'Self-attention lets a model…', options: ['Forget context', 'Weight relationships', 'Avoid tokens', 'Ignore order'], answer: 1 },
      { question: 'Transformers scale by…', options: ['Sequential steps only', 'Parallel operations', 'Random search', 'No GPUs'], answer: 1 }
    ],
    q2: [{ question: 'A risk is…', options: ['Perfect truth', 'Hallucinations', 'Zero drift', 'No bias'], answer: 1 }],
    q3: [{ question: 'Basic pipeline starts with…', options: ['Compile', 'Tokenize', 'Ship', 'Forget'], answer: 1 }]
  },
  // Generative Models
  'vae': { overview: ['Latent variable models', 'Encoder–decoder with stochastic layer', 'ELBO objective'], pitfalls: ['Posterior collapse', 'Poor prior choice', 'Blurry reconstructions'], walkthrough: ['Design encoder/decoder', 'Optimize ELBO', 'Balance KL/recon'], q1: [{question:'VAE optimizes…', options:['Cross-entropy only','ELBO','MSE only','BLEU'], answer:1}], q2: [{question:'Posterior collapse occurs when…', options:['Decoder too strong','KL too small','Noisy inputs','Batch small'], answer:0}], q3: [{question:'Latent variable z is…', options:['Observed','Unobserved (latent)','Label','Loss'], answer:1}] },
  'gan': { overview: ['Generator vs discriminator', 'Minimax objective', 'Adversarial training'], pitfalls: ['Mode collapse', 'Training instability', 'Non-convergence'], walkthrough: ['Balance updates', 'Use tricks (labels, spectral norm)', 'Monitor FID'], q1: [{question:'GANs pit…', options:['Two generators','Generator vs discriminator','Two discriminators','Autoencoders'], answer:1}], q2: [{question:'Mode collapse means…', options:['Diverse outputs','Limited variety','Faster training','Better FID'], answer:1}], q3: [{question:'A stabilization trick is…', options:['No regularization','Spectral norm/gradient penalty','High LR only','No labels'], answer:1}] },
  'diffusion': { overview: ['Forward noise process', 'Reverse denoising process', 'Score matching / DDPM'], pitfalls: ['Long sampling chains', 'Poor noise schedule', 'Compute costs'], walkthrough: ['Define schedule', 'Train noise predictor', 'Sampler (DDIM/etc)'], q1: [{question:'Diffusion adds…', options:['Signal each step','Noise progressively','Labels','Gates'], answer:1}], q2: [{question:'Reverse process learns…', options:['To add noise','To remove noise','To segment images','To rank docs'], answer:1}], q3: [{question:'Sampling can be sped up by…', options:['Fewer steps (DDIM)','More steps only','Randomness','CSS'], answer:0}] },
  'flow': { overview: ['Invertible transforms', 'Change-of-variables', 'Exact likelihoods'], pitfalls: ['Expensive Jacobians', 'Expressivity trade-offs', 'Numerical issues'], walkthrough: ['Design coupling layers', 'Ensure invertibility', 'Train by MLE'], q1: [{question:'Normalizing flows allow…', options:['Exact likelihood','Only sampling','No invertibility','No gradients'], answer:0}], q2: [{question:'RealNVP uses…', options:['Additive/multiplicative coupling','Attention only','CNN only','Transformers'], answer:0}], q3: [{question:'Change-of-variables involves…', options:['Jacobian determinant','KL only','Entropy only','No math'], answer:0}] },
  'text-prep': {
    overview: ['Normalize text (case, punctuation)', 'Handle stopwords wisely', 'Keep meaning while cleaning'],
    pitfalls: ['Over-cleaning', 'Losing emojis/numbers info', 'Inconsistent tokenization'],
    walkthrough: ['Define goals', 'Choose tokenizer', 'Keep reproducible steps'],
    q1: [
      { question: 'Over-cleaning can…', options: ['Improve meaning', 'Remove important signal', 'Never matter', 'Fix labels'], answer: 1 },
      { question: 'Tokenization splits…', options: ['Weights', 'Text into units', 'Loss into parts', 'Layers'], answer: 1 }
    ],
    q2: [{ question: 'Good preprocessing is…', options: ['Ad-hoc', 'Documented & consistent', 'Hidden', 'Random'], answer: 1 }],
    q3: [{ question: 'Stopwords should be…', options: ['Always removed', 'Considered case-by-case', 'Never used', 'Always kept'], answer: 1 }]
  },
  'embeddings': {
    overview: ['Vectors capture meaning', 'Similar texts near in space', 'Power search and clustering'],
    pitfalls: ['Bias in embeddings', 'Poor normalization', 'No evaluation'],
    walkthrough: ['Pick model', 'Index vectors', 'Evaluate retrieval'],
    q1: [
      { question: 'Embeddings are…', options: ['Scalars', 'Vectors', 'Images', 'Labels'], answer: 1 },
      { question: 'Similarity often uses…', options: ['Cosine', 'Random', 'BLEU', 'MSE'], answer: 0 }
    ],
    q2: [{ question: 'To evaluate, try…', options: ['No metrics', 'Recall@k', 'Randomization only', 'Guess'], answer: 1 }],
    q3: [{ question: 'Bias mitigation can include…', options: ['Audits', 'Ignoring it', 'Hiding data', 'Only scaling'], answer: 0 }]
  },
  'prompting': {
    overview: ['Clear instructions matter', 'Provide context and examples', 'Constrain outputs when needed'],
    pitfalls: ['Vague prompts', 'No constraints', 'Leaking sensitive data'],
    walkthrough: ['State role', 'Give task + examples', 'Define format'],
    q1: [
      { question: 'A better prompt is…', options: ['Vague', 'Specific with examples', 'Hidden', 'Unbounded'], answer: 1 },
      { question: 'Safety includes…', options: ['Sharing secrets', 'Redacting sensitive info', 'Posting tokens', 'Open prompts only'], answer: 1 }
    ],
    q2: [{ question: 'Output control can use…', options: ['No format', 'JSON schemas', 'Random text', 'Only emojis'], answer: 1 }],
    q3: [{ question: 'Context windows mean…', options: ['Infinite memory', 'Limited tokens', 'No limits', 'File storage'], answer: 1 }]
  },
  'cv-basics': {
    overview: ['Pixels → features', 'Preprocess (resize, normalize)', 'Augment data for robustness'],
    pitfalls: ['Wrong aspect ratios', 'Color space confusion', 'Label mismatch'],
    walkthrough: ['Load correctly', 'Normalize consistently', 'Split carefully'],
    q1: [
      { question: 'Normalization helps…', options: ['Break inputs', 'Stabilize training', 'Add labels', 'Store metadata'], answer: 1 },
      { question: 'Augmentation can…', options: ['Improve robustness', 'Remove signal', 'Delete labels', 'Always hurt'], answer: 0 }
    ],
    q2: [{ question: 'Aspect ratio matters because…', options: ['No reason', 'Distortion changes info', 'Only color matters', 'It’s random'], answer: 1 }],
    q3: [{ question: 'Label mismatch leads to…', options: ['Better accuracy', 'Evaluation errors', 'Faster training', 'Less data'], answer: 1 }]
  },
  'classification': {
    overview: ['Predict categories', 'Softmax + cross-entropy', 'Calibrate probabilities'],
    pitfalls: ['Imbalance ignored', 'Thresholds not tuned', 'Data leakage'],
    walkthrough: ['Baseline majority', 'Tune thresholds', 'Report PR curves'],
    q1: [
      { question: 'Cross-entropy pairs with…', options: ['Regression', 'Classification', 'Clustering', 'RL'], answer: 1 },
      { question: 'Imbalance suggests…', options: ['Accuracy only', 'F1/PR metrics', 'BLEU', 'MSE'], answer: 1 }
    ],
    q2: [{ question: 'Calibration checks…', options: ['Confusion matrix only', 'Probabilities vs outcomes', 'Latency only', 'Data size'], answer: 1 }],
    q3: [{ question: 'A baseline is…', options: ['Unhelpful', 'A reference to beat', 'Final model', 'Always random'], answer: 1 }]
  },
  'detection': {
    overview: ['Bounding boxes & anchors', 'IoU measures overlap', 'MAP summarizes performance'],
    pitfalls: ['Poor NMS tuning', 'Tiny object recall', 'Bad labels'],
    walkthrough: ['Start with pretrained detector', 'Tune NMS/thresholds', 'Measure mAP'],
    q1: [
      { question: 'IoU measures…', options: ['Speed', 'Overlap', 'Color', 'Size'], answer: 1 },
      { question: 'NMS removes…', options: ['Good boxes', 'Duplicate boxes', 'Data', 'Labels'], answer: 1 }
    ],
    q2: [{ question: 'Small objects need…', options: ['Bigger stride', 'Higher resolution or FPNs', 'Less data', 'Random anchors'], answer: 1 }],
    q3: [{ question: 'mAP is…', options: ['Mean average precision', 'Maximum average pixels', 'Mean area per box', 'Model average performance'], answer: 0 }]
  },
  'wrangling': {
    overview: ['Clean, merge, reshape data', 'Document assumptions', 'Reproducible pipelines'],
    pitfalls: ['Silent type casts', 'Bad joins', 'Time leakage'],
    walkthrough: ['Profile dataset', 'Fix types', 'Version data'],
    q1: [
      { question: 'A safe merge uses…', options: ['Ambiguous keys', 'Clear keys + checks', 'No checks', 'Random joins'], answer: 1 },
      { question: 'Time leakage is…', options: ['Fine', 'Future info in train', 'Helpful', 'Rare'], answer: 1 }
    ],
    q2: [{ question: 'Reproducibility uses…', options: ['Manual steps', 'Pipelines and logs', 'Memory only', 'Screenshots'], answer: 1 }],
    q3: [{ question: 'Type issues cause…', options: ['No bugs', 'Silent errors', 'Faster code', 'Better docs'], answer: 1 }]
  },
  'viz': {
    overview: ['Choose chart for question', 'Avoid chartjunk', 'Tell a clear story'],
    pitfalls: ['Misleading axes', 'Too many colors', 'No annotations'],
    walkthrough: ['Pick metric', 'Choose chart', 'Annotate takeaways'],
    q1: [
      { question: 'A clear viz uses…', options: ['Decorations', 'Minimalism & clarity', 'Random colors', '3D always'], answer: 1 },
      { question: 'Axes should…', options: ['Mislead', 'Be appropriate and labeled', 'Be hidden', 'Be flipped randomly'], answer: 1 }
    ],
    q2: [{ question: 'Storytelling means…', options: ['One-off plots', 'Guided insights', 'Only tables', 'Only code'], answer: 1 }],
    q3: [{ question: 'Color choice should…', options: ['Ignore accessibility', 'Consider contrast', 'Be random', 'Use neon only'], answer: 1 }]
  },
  'exp': {
    overview: ['Define hypothesis', 'Choose metric and sample size', 'Randomize and control'],
    pitfalls: ['Peeking early', 'P-hacking', 'Ignoring ethics'],
    walkthrough: ['Pre-register plan', 'Run to completion', 'Analyze with CIs'],
    q1: [
      { question: 'A/B tests need…', options: ['No randomization', 'Random assignment', 'Only anecdotes', 'No metrics'], answer: 1 },
      { question: 'Peeking risks…', options: ['Inflated errors', 'Better power', 'Perfect results', 'No change'], answer: 0 }
    ],
    q2: [{ question: 'Power depends on…', options: ['Sample size', 'Font size', 'URL', 'Logo'], answer: 0 }],
    q3: [{ question: 'Confidence intervals…', options: ['Are useless', 'Express uncertainty', 'Equal p-values', 'Replace data'], answer: 1 }]
  }
};

function longInfoBody(section: string, cat: TopicCategory): string {
  const c = contentSeeds[cat] ?? contentSeeds['ai-foundations'];
  const para = paragraph(
    `${section}:`,
    'Focus on inputs → steps → outputs and keep it concrete.',
  );
  const list = bullets(c.overview);
  const tip = 'Tip: start small, test quickly, and improve step by step.';
  return `${para}\n\n${list}\n\n${tip}`;
}

function makeLesson7Cards(idBase: string, idx: number, titleBase: string): FlashLesson {
  const title = `${titleBase} — Lesson ${idx + 1}`;
  const lid = `${idBase}-l${idx + 1}`;
  const est = 6 + (idx % 3); // 6–8 minutes
  const cat = getCategory(titleBase);
  const pool = contentSeeds[cat] ?? contentSeeds['ai-foundations'];
  const pick = <T,>(arr: T[], i: number) => arr[i % arr.length];
  return {
    id: lid,
    title,
    estMinutes: est,
    cards: [
      { id: `${lid}-c1`, kind: 'info', title: `Overview — Part ${idx + 1}`, body: longInfoBody('Overview', cat) },
      { id: `${lid}-c2`, kind: 'info', title: 'Key ideas', body: longInfoBody('Key ideas', cat) },
      { id: `${lid}-q1`, kind: 'quiz', title: 'Check 1', questions: [ pick(pool.q1, idx), pick(pool.q1, idx + 1) ] },
      { id: `${lid}-c3`, kind: 'info', title: 'Mini walkthrough', body: bullets((contentSeeds[cat]?.walkthrough) ?? contentSeeds['ai-foundations'].walkthrough) },
      { id: `${lid}-q2`, kind: 'quiz', title: 'Check 2', questions: [ pick(pool.q2, idx) ] },
      { id: `${lid}-c4`, kind: 'info', title: 'Pitfalls & fixes', body: bullets((contentSeeds[cat]?.pitfalls) ?? contentSeeds['ai-foundations'].pitfalls) },
      { id: `${lid}-q3`, kind: 'quiz', title: 'Final check', questions: [ pick(pool.q3, idx) ] }
    ]
  };
}

// Domain → subdomain directory
export function getDomainMap() {
  const map: Record<string, string[]> = {};
  for (const d of DOMAINS) {
    map[d.domain] = d.subdomains;
  }
  return map;
}

// Lazily generate lessons for a topic (domain::subdomain)
export function getLessonsForTopic(topicKey: string): FlashLesson[] {
  const [domain, subdomain] = topicKey.split('::');
  const d = DOMAINS.find(x => x.domain === domain);
  if (!d || !d.subdomains.includes(subdomain)) return [];
  const idBase = `${domain.replace(/\s+/g, '-').toLowerCase()}-${subdomain.replace(/\s+/g, '-').toLowerCase()}`;
  // Split: core tracks get 10 lessons, others 8
  const TEN_LESSON_DOMAINS = new Set([
    'Machine Learning', 'Deep Learning', 'NLP & LLMs', 'Computer Vision', 'Probabilistic ML', 'Generative Models', 'Reinforcement Learning'
  ]);
  const LESSONS_PER_SUBDOMAIN = TEN_LESSON_DOMAINS.has(domain) ? 10 : 8;
  const lessons: FlashLesson[] = [];
  for (let i = 0; i < LESSONS_PER_SUBDOMAIN; i++) lessons.push(makeLesson7Cards(idBase, i, subdomain));
  return lessons;
}

// Backward-compatible lazy curriculum object (generates lessons on access)
export const flashCurriculum: FlashCurriculum = new Proxy({}, {
  get(_target, prop: string) {
    return getLessonsForTopic(prop);
  },
  ownKeys() {
    return DOMAINS.flatMap(d => d.subdomains.map(sd => `${d.domain}::${sd}`));
  },
  getOwnPropertyDescriptor() {
    return { enumerable: true, configurable: true } as PropertyDescriptor;
  }
}) as unknown as FlashCurriculum;
