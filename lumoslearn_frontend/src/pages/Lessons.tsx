import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Star } from 'lucide-react';

export const lessonsByTopic = {
  'AI Fundamentals': [
    'Introduction to AI',
    'What is Artificial Intelligence?',
    'Importance of AI',
    'History of AI',
    'Key Milestones in AI',
    'Types of AI: Narrow, General, Super',
    'Capabilities of Different AI Types',
    'AI vs Human Intelligence',
    'Cognitive Computing vs AI',
    'Turing Test',
    'AI Benchmarks',
    'AI in Everyday Life',
    'AI Myths',
    'AI Facts',
    'Limitations of AI',
    'AI and the 4th Industrial Revolution',
    'AI Hardware Overview (CPUs vs GPUs)',
    'Ethics in AI',
    'Bias in AI',
    'AI Safety',
    'Risks of AI',
    'Explainable AI',
    'Responsible AI Design',
    'Trustworthy AI Systems',
  ],
  'AI in the Real World': [
    'AI in Healthcare',
    'AI in Education',
    'AI in Finance',
    'AI in Agriculture',
    'AI in Transportation',
    'AI in Entertainment',
    'AI in Security',
    'AI in Social Media',
    'AI in Smart Homes',
    'AI in Robotics',
    'AI in E-commerce',
    'AI in Manufacturing',
    'AI in Legal Tech',
    'AI in Human Resources',
    'AI in Journalism',
    'AI in Crisis Response',
    'AI in Disaster Management',
    'AI in Urban Planning',
  ],
  'Machine Learning': [
    'What is Machine Learning?',
    'Introduction to ML',
    'Supervised Learning',
    'Unsupervised Learning',
    'Reinforcement Learning',
    'ML Workflow Overview',
    'Data Collection',
    'Data Preparation',
    'Data Cleaning',
    'Feature Engineering',
    'Feature Scaling & Normalization',
    'Model Training',
    'Model Testing',
    'Overfitting',
    'Underfitting',
    'Cross-Validation',
    'Accuracy, Precision, Recall, F1 Score',
    'ROC-AUC & Confusion Matrix',
    'Choosing Evaluation Metrics',
    'Bias-Variance Tradeoff',
    'Hyperparameter Tuning',
    'ML Project Lifecycle',
    'ML Model Deployment',
    'Online vs Batch Learning',
    'Handling Imbalanced Datasets',
    'Interpretability in ML',
    'Linear Regression',
    'Logistic Regression',
    'Decision Trees',
    'Random Forests',
    'Support Vector Machines',
    'K-Nearest Neighbors',
    'Naive Bayes',
    'K-Means Clustering',
    'Hierarchical Clustering',
    'Principal Component Analysis (PCA)',
    'Ensemble Methods',
    'Gradient Boosting Machines',
    'XGBoost',
    'LightGBM',
    'CatBoost',
  ],
  'Deep Learning': [
    'What is Deep Learning?',
    'History of Deep Learning',
    'Neural Network Structure',
    'Perceptron Model',
    'Activation Functions',
    'Loss Functions',
    'Forward Propagation',
    'Backward Propagation',
    'Training Neural Networks',
    'Regularization',
    'Dropout Techniques',
    'Batch Size, Epochs, Learning Rate',
    'Multi-Task Learning',
    'Deep Learning vs Traditional ML',
    'CNNs: Theory',
    'CNNs: Applications',
    'RNNs: Theory',
    'RNNs: Applications',
    'LSTM: Theory',
    'LSTM: Applications',
    'GRU: Theory',
    'GRU: Applications',
    'Autoencoders',
    'GANs: Theory',
    'GANs: Applications',
    'Transfer Learning',
    'Attention Mechanisms',
    'Self-Attention',
    'Transformers: Theory',
    'Transformers: Applications',
    'Residual Networks',
    'Hyperparameter Search',
    'DL for Time Series',
    'Batch & Layer Normalization',
  ],
  'Natural Language Processing (NLP)': [
    'What is NLP?',
    'Text Preprocessing',
    'Tokenization',
    'Stop Words Removal',
    'Lemmatization',
    'Stemming',
    'Bag of Words',
    'TF-IDF',
    'Word2Vec',
    'GloVe',
    'Contextual Embeddings (e.g., BERT)',
    'Pretraining vs Fine-Tuning',
    'Prompt Engineering',
    'Zero/Few-Shot Learning',
    'Sentiment Analysis',
    'Named Entity Recognition',
    'Text Classification',
    'Machine Translation',
    'Chatbots',
    'Text Summarization',
    'Question Answering',
    'Speech Recognition',
    'NLP in Healthcare',
    'NLP in Social Media',
    'NLP in Customer Support',
    'NLP in Legal Tech',
    'NLP Ethics & Bias',
    'Rule-Based vs Statistical NLP',
    'Evaluating NLP Models',
    'Large Language Models (LLMs)',
  ],
  'Computer Vision': [
    'What is Computer Vision?',
    'Image Processing Basics',
    'Image Classification',
    'Object Detection',
    'Image Segmentation',
    'Face Recognition',
    'OCR (Optical Character Recognition)',
    'Image Generation with GANs',
    'CV in Healthcare',
    'CV in Security',
    'CV for Autonomous Vehicles',
    'CV in Retail',
    'CV for Accessibility',
    'CV in Manufacturing',
  ],
  'Data Science & Analytics': [
    'What is Data Science?',
    'Data Collection',
    'Data Cleaning Techniques',
    'Data Preprocessing',
    'Data Visualization Tools',
    'Exploratory Data Analysis (EDA)',
    'Statistical Analysis',
    'Standard Deviation & Variance',
    'Correlation vs Causation',
    'Outlier Detection',
    'Feature Selection',
    'A/B Testing',
    'Time Series Forecasting',
    'SQL for Data',
    'Python Libraries (Pandas, NumPy)',
    'Dashboards (Power BI/Tableau)',
    'Business Analytics',
    'Healthcare Analytics',
    'Finance Analytics',
    'Social Media Analytics',
    'Data Ethics',
    'Data Science Challenges',
    'Responsible Data Practices',
    'Presenting Data Insights',
  ],
  'Robotics & AI': [
    'What is Robotics?',
    'Types of Robots',
    'Sensors & Perception',
    'Path Planning',
    'Role of AI in Robotics',
    'Robot Learning',
    'Human-Robot Interaction',
    'Robotics in Industry',
    'Robotics in Healthcare',
    'Robotics in Agriculture',
    'Swarm Robotics',
    'Simulation for Robotics',
    'Robotics Challenges',
    'Safety & Ethics in Robotics',
  ],
  'AI in Society & the Future': [
    'AI for Social Good',
    'AI in Art & Creativity',
    'AI and Privacy',
    'AI and Jobs',
    'AI Policy & Regulation',
    'The Future of AI',
    'AI in Smart Cities',
    'AI and Climate Change',
    'AI in Sports',
    'AI in Law',
    'AI in Marketing',
    'AI in Customer Service',
    'AI in Logistics',
    'AI in Gaming',
    'AI in Space',
    'AI for Accessibility',
    'AI and Digital Divide',
    'AI for Crisis Response',
    'Ethical AI Case Studies',
    'Tech for Good',
  ],
  'Advanced AI Topics': [
    'Reinforcement Learning Basics',
    'RL Applications',
    'Markov Decision Processes',
    'Q-Learning',
    'Policy Gradient Methods',
    'Multi-Agent Systems',
    'Swarm Intelligence',
    'Federated Learning',
    'Edge AI & TinyML',
    'AI Hardware (TPUs, GPUs)',
    'Quantum ML',
    'AI + IoT',
    'AI Security',
    'Adversarial Attacks',
    'Model Compression',
    'Explainable AI Techniques',
    'Fairness in AI',
    'Robustness Testing',
    'Meta Learning',
    'Curriculum Learning',
    'Continual Learning',
    'Neural Architecture Search',
    'Contrastive Learning',
    'Diffusion Models',
    'AI for Drug Discovery',
    'Scalable AI',
  ],
  'AI Explorers & Project Pathways for Teens': [
    'Discovering AI Roles',
    'Knowing Your Strengths',
    'Finding Your Path',
    'Mentors & Role Models',
    'Project Brainstorming',
    'Your First ML Model',
    'Hackathons & Competitions',
    'Building Your Portfolio',
    'Show & Tell',
    'Writing for Others',
    'Teamwork & Peer Learning',
    'Next Steps & Opportunities',
  ],
};

// Place aiFundamentalsLessons array outside of lessonsByTopic and not inside any object or function
// This array is for future use and does not affect the current UI
export const aiFundamentalsLessons = [
  {
    title: 'Introduction to AI',
    content: `<b>Artificial Intelligence (AI)</b> is the <span style="color:#A3F7BF"><b>science and engineering</b></span> of creating machines that can perform tasks that typically require <b>human intelligence</b>. These tasks include <b>learning</b>, <b>reasoning</b>, <b>problem-solving</b>, <b>perception</b>, and <b>language understanding</b>.<br><br>
    <i>Imagine a world where your phone understands your voice, your car drives itself, and your favorite apps recommend exactly what you want to watch or listen to!</i> That's AI in action.<br><br>
    <b>AI is everywhere:</b> From the <span style="color:#A3F7BF">voice assistants</span> in our phones to the <span style="color:#A3F7BF">recommendation systems</span> on streaming platforms, AI is making life easier, smarter, and more fun.<br><br>
    The field of AI combines <b>computer science</b>, <b>mathematics</b>, <b>psychology</b>, and more to build systems that can <b>adapt and improve over time</b>. As technology advances, AI is becoming an <b>essential part of our daily lives</b>, helping us work more efficiently, make better decisions, and even entertain ourselves.<br><br>
    <span style="color:#A3F7BF"><b>Fun Fact:</b></span> Did you know that AI can beat world chess champions, but it still can't fold your laundry? <i>Yet!</i><br><br>
    <b>Why learn AI?</b> Understanding AI is crucial for anyone interested in the <span style="color:#A3F7BF">future of technology</span>, as it continues to shape the way we live and interact with the world. <i>Are you ready to explore the amazing world of AI?</i>`,
    quiz: [
      {
        question: 'What is the main goal of Artificial Intelligence?',
        options: [
          'To create machines that can perform tasks requiring human intelligence',
          'To make computers run faster',
          'To replace all human jobs',
          'To build only robots'
        ],
        answer: 0
      },
      {
        question: 'Which of the following is an example of AI in daily life?',
        options: [
          'Using a calculator',
          'Unlocking your phone with your face',
          'Reading a book',
          'Riding a bicycle'
        ],
        answer: 1
      },
      {
        question: 'AI combines which of the following fields?',
        options: [
          'Computer Science',
          'Mathematics',
          'Psychology',
          'All of the above'
        ],
        answer: 3
      }
    ]
  },
  {
    title: 'What is Artificial Intelligence?',
    content: `<b>Artificial Intelligence</b>, or <b>AI</b>, refers to the ability of a machine or computer program to perform tasks that typically require <b>human intelligence</b>. This includes things like <b>understanding language</b>, <b>recognizing images</b>, <b>solving problems</b>, and <b>making decisions</b>.<br><br>
    <i>Think of AI as a super-smart assistant that can learn from data, spot patterns, and help us in ways we never imagined before!</i><br><br>
    <b>How does AI work?</b> AI systems are designed to <b>mimic human thinking and behavior</b>, but they do so using <span style="color:#A3F7BF">algorithms</span> and <span style="color:#A3F7BF">data</span> rather than emotions or intuition.<br><br>
    <b>Examples:</b> A simple example of AI is a <i>spam filter</i> in your email. It learns to recognize which messages are unwanted and moves them to your spam folder. More advanced AI can be found in <b>self-driving cars</b>, which use sensors and data to navigate roads safely. AI is also used in <span style="color:#A3F7BF">voice assistants</span>, like Google Assistant, which can understand your speech and respond to your questions.<br><br>
    <b>In summary:</b> AI is about <b>making machines smart</b>, so they can help us in our daily lives, work, and even solve complex problems that were once thought to be possible only for humans. <i>Welcome to the future!</i>`,
    quiz: [
      {
        question: 'What does Artificial Intelligence (AI) mean?',
        options: [
          'A machine that can perform tasks requiring human intelligence',
          'A machine that only stores data',
          'A robot that looks like a human',
          'A computer virus'
        ],
        answer: 0
      },
      {
        question: 'Which of these is an example of narrow AI?',
        options: [
          'A self-driving car',
          'A human brain',
          'A calculator',
          'A book'
        ],
        answer: 0
      },
      {
        question: 'What is the main difference between narrow AI and general AI?',
        options: [
          'Narrow AI is for specific tasks, general AI can do any intellectual task',
          'Narrow AI is smarter than general AI',
          'General AI is only for games',
          'There is no difference'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Importance of AI',
    content: `<b>Artificial Intelligence (AI)</b> is <span style="color:#A3F7BF">transforming the world</span> in ways that were once unimaginable. Its importance lies in its ability to <b>automate tasks</b>, <b>analyze vast amounts of data</b>, and <b>make decisions faster and more accurately</b> than humans in many cases.<br><br>
    <i>AI is not just a technological trend; it is a <b>fundamental shift</b> in how we approach problem-solving and innovation across industries.</i><br><br>
    <b>Real-world impact:</b><br>
    <ul style="margin-left:1em;">
      <li><b>Healthcare:</b> AI helps doctors diagnose diseases earlier and more accurately, leading to better patient outcomes.</li>
      <li><b>Finance:</b> AI algorithms detect fraudulent transactions and help manage investments.</li>
      <li><b>Education:</b> AI personalizes learning experiences for students, adapting to their strengths and weaknesses.</li>
      <li><b>Everyday life:</b> AI powers virtual assistants, smart home devices, and recommendation systems that make our lives more convenient.</li>
    </ul>
    <br>
    <span style="color:#A3F7BF"><b>Why does this matter?</b></span> Understanding the importance of AI is essential for anyone who wants to be prepared for the future, as it will continue to shape the way we live, work, and interact with technology. <i>Get ready to be part of the AI revolution!</i>`,
    quiz: [
      {
        question: "Why is AI considered important in today's world?",
        options: [
          'It can automate tasks and analyze large amounts of data',
          'It can only play games',
          'It is a passing trend',
          'It replaces all humans'
        ],
        answer: 0
      },
      {
        question: 'How does AI help in healthcare?',
        options: [
          'By cooking food',
          'By analyzing X-rays and helping doctors spot diseases',
          'By playing music',
          'By growing crops'
        ],
        answer: 1
      },
      {
        question: 'Which industry is NOT mentioned as being impacted by AI in the content?',
        options: [
          'Healthcare',
          'Finance',
          'Education',
          'Construction'
        ],
        answer: 3
      }
    ]
  },
  {
    title: 'History of AI',
    content: `The history of Artificial Intelligence (AI) dates back to the 1950s, when scientists and mathematicians first began to explore the idea of creating machines that could think and learn like humans. Alan Turing, a British mathematician, is often credited as one of the pioneers of AI, thanks to his work on the concept of a "universal machine" and the famous Turing Test. In the early years, AI research focused on solving simple problems and playing games like chess. Over time, advances in computer hardware, algorithms, and data availability led to significant breakthroughs. The 1980s saw the rise of expert systems, while the 21st century has been marked by the development of machine learning and deep learning. Today, AI is a rapidly evolving field, with new discoveries and applications emerging every year.`,
    quiz: [
      {
        question: 'Who is considered a pioneer of AI and created the Turing Test?',
        options: [
          'Isaac Newton',
          'Alan Turing',
          'Albert Einstein',
          'Ada Lovelace'
        ],
        answer: 1
      },
      {
        question: 'What was a major focus of early AI research?',
        options: [
          'Playing games like chess',
          'Building rockets',
          'Cooking food',
          'Designing clothes'
        ],
        answer: 0
      },
      {
        question: 'Which decade saw the rise of expert systems in AI?',
        options: [
          '1950s',
          '1980s',
          '2000s',
          '2020s'
        ],
        answer: 1
      }
    ]
  },
  {
    title: 'Key Milestones in AI',
    content: `Artificial Intelligence has achieved several key milestones since its inception. In 1956, the term "Artificial Intelligence" was coined at the Dartmouth Conference, marking the official birth of the field. In 1997, IBM's Deep Blue defeated world chess champion Garry Kasparov, showcasing the power of AI in strategic games. The 2010s saw the rise of deep learning, with AI systems surpassing human performance in image recognition and language translation. In 2016, Google's AlphaGo defeated the world champion in the game of Go, a feat previously thought impossible for machines. These milestones demonstrate the rapid progress of AI and its growing impact on society. Each achievement has paved the way for new innovations and applications, making AI an exciting and dynamic field.`,
    quiz: [
      {
        question: 'When was the term "Artificial Intelligence" first coined?',
        options: [
          '1945',
          '1956',
          '1980',
          '2001'
        ],
        answer: 1
      },
      {
        question: 'Which AI defeated Garry Kasparov in chess?',
        options: [
          'Deep Blue',
          'AlphaGo',
          'Watson',
          'Siri'
        ],
        answer: 0
      },
      {
        question: 'What was a major AI achievement in 2016?',
        options: [
          'AlphaGo defeated the world champion in Go',
          'Deep Blue played checkers',
          'Watson won a cooking contest',
          'Siri learned to sing'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Types of AI: Narrow, General, Super',
    content: `AI can be categorized into three main types: Narrow AI, General AI, and Super AI. Narrow AI, also known as Weak AI, is designed to perform a specific task, such as voice recognition or playing chess. Most of the AI we use today is narrow AI. General AI, or Strong AI, would have the ability to understand, learn, and apply knowledge across a wide range of tasks, much like a human. Super AI refers to a level of intelligence that surpasses human capabilities in every aspect. While narrow AI is already a reality, general and super AI remain theoretical concepts. Understanding these types helps us appreciate the current state of AI and the possibilities for the future.`,
    quiz: [
      {
        question: 'What is another name for Narrow AI?',
        options: [
          'Strong AI',
          'Weak AI',
          'Super AI',
          'General AI'
        ],
        answer: 1
      },
      {
        question: 'Which type of AI is currently in use today?',
        options: [
          'Narrow AI',
          'General AI',
          'Super AI',
          'All of the above'
        ],
        answer: 0
      },
      {
        question: 'What would Super AI be capable of?',
        options: [
          'Surpassing human intelligence in every aspect',
          'Only playing games',
          'Simple calculations',
          'Nothing special'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Capabilities of Different AI Types',
    content: `Different types of AI have varying capabilities. Narrow AI excels at specific tasks, such as image recognition or language translation, but cannot perform tasks outside its programmed domain. General AI would be able to reason, solve problems, and learn across multiple domains, similar to a human. Super AI would possess intelligence far beyond human abilities, potentially revolutionizing every aspect of society. Currently, only narrow AI exists, powering applications like search engines, recommendation systems, and autonomous vehicles. Understanding the capabilities and limitations of each AI type helps us set realistic expectations and guides future research and development in the field.`,
    quiz: [
      {
        question: 'Which type of AI can only perform specific tasks?',
        options: [
          'Narrow AI',
          'General AI',
          'Super AI',
          'All of the above'
        ],
        answer: 0
      },
      {
        question: 'What is a potential capability of Super AI?',
        options: [
          'Revolutionizing every aspect of society',
          'Only playing chess',
          'Simple arithmetic',
          'None of the above'
        ],
        answer: 0
      },
      {
        question: 'Which type of AI is currently powering search engines and recommendation systems?',
        options: [
          'Narrow AI',
          'General AI',
          'Super AI',
          'None'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'AI vs Human Intelligence',
    content: `AI and human intelligence have similarities and differences. While AI can process vast amounts of data quickly and perform repetitive tasks without fatigue, it lacks the creativity, emotional understanding, and common sense that humans possess. Human intelligence is flexible and can adapt to new situations, learn from experience, and understand complex emotions. AI, on the other hand, relies on data and algorithms to function. Although AI can outperform humans in specific tasks, such as playing chess or analyzing large datasets, it cannot replicate the full range of human abilities. Understanding the strengths and limitations of both AI and human intelligence is important for developing effective collaborations between humans and machines.`,
    quiz: [
      {
        question: 'What is one advantage of AI over human intelligence?',
        options: [
          'Processing large amounts of data quickly',
          'Creativity',
          'Emotional understanding',
          'Common sense'
        ],
        answer: 0
      },
      {
        question: 'What is a unique strength of human intelligence?',
        options: [
          'Learning from experience and adapting',
          'Performing repetitive tasks without fatigue',
          'Analyzing large datasets',
          'None of the above'
        ],
        answer: 0
      },
      {
        question: 'Can AI currently replicate the full range of human abilities?',
        options: [
          'No',
          'Yes',
          'Sometimes',
          'Only in games'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Cognitive Computing vs AI',
    content: `Cognitive computing and AI are related fields, but they are not the same. Cognitive computing aims to simulate human thought processes in a computerized model, often focusing on mimicking the way the human brain works. AI, on the other hand, is a broader field that includes any technique that enables machines to solve problems or perform tasks that require intelligence. Cognitive computing systems are designed to assist humans in decision-making by understanding natural language, recognizing patterns, and learning from data. While all cognitive computing is a form of AI, not all AI is cognitive computing. The distinction helps clarify the goals and applications of each field.`,
    quiz: [
      {
        question: 'What is the main focus of cognitive computing?',
        options: [
          'Simulating human thought processes',
          'Building robots',
          'Playing games',
          'Simple calculations'
        ],
        answer: 0
      },
      {
        question: 'Is all AI considered cognitive computing?',
        options: [
          'No',
          'Yes',
          'Only in some cases',
          'Only in robotics'
        ],
        answer: 0
      },
      {
        question: 'What is a key application of cognitive computing?',
        options: [
          'Assisting humans in decision-making',
          'Cooking food',
          'Driving cars',
          'Playing chess'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Turing Test',
    content: `The Turing Test, proposed by Alan Turing in 1950, is a method for determining whether a machine can exhibit intelligent behavior indistinguishable from that of a human. In the test, a human judge interacts with both a machine and a human without knowing which is which. If the judge cannot reliably tell the machine from the human, the machine is said to have passed the Turing Test. While the test has been influential in the philosophy of AI, it has also been criticized for its limitations. Passing the Turing Test does not necessarily mean a machine is truly intelligent, but it remains a landmark concept in the history of AI.`,
    quiz: [
      {
        question: 'Who proposed the Turing Test?',
        options: [
          'Alan Turing',
          'Isaac Newton',
          'Ada Lovelace',
          'John McCarthy'
        ],
        answer: 0
      },
      {
        question: 'What does the Turing Test aim to determine?',
        options: [
          'If a machine can exhibit intelligent behavior indistinguishable from a human',
          'If a machine can play chess',
          'If a machine can solve math problems',
          'If a machine can drive a car'
        ],
        answer: 0
      },
      {
        question: 'Does passing the Turing Test mean a machine is truly intelligent?',
        options: [
          'Not necessarily',
          'Yes, always',
          'Only if it can speak',
          'Only if it can see'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'AI Benchmarks',
    content: `AI benchmarks are standardized tests and datasets used to evaluate the performance of artificial intelligence systems. These benchmarks help researchers and developers compare different AI models and track progress in the field. Common benchmarks include image recognition datasets like ImageNet, natural language processing tasks such as the GLUE benchmark, and game-playing challenges like Atari or Go. By using benchmarks, the AI community can identify strengths and weaknesses in current approaches, set goals for future research, and ensure that new models are making meaningful improvements. Benchmarks also promote transparency and reproducibility, as results can be independently verified. However, it is important to remember that benchmarks are not perfect and may not fully capture real-world complexity. They are a useful tool, but should be complemented with practical testing and ethical considerations.`,
    quiz: [
      {
        question: 'What is the main purpose of AI benchmarks?',
        options: [
          'To evaluate and compare AI systems',
          'To replace human workers',
          'To create new programming languages',
          'To build robots only'
        ],
        answer: 0
      },
      {
        question: 'Which of the following is an example of an AI benchmark?',
        options: [
          'ImageNet',
          'Chess',
          'Cooking',
          'Driving a car'
        ],
        answer: 0
      },
      {
        question: 'Why should benchmarks be complemented with practical testing?',
        options: [
          'Because benchmarks may not capture real-world complexity',
          'Because benchmarks are always perfect',
          'Because practical testing is unnecessary',
          'Because benchmarks are only for games'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'AI in Everyday Life',
    content: `Artificial Intelligence is increasingly present in our daily routines. From voice assistants like Siri and Alexa to personalized recommendations on streaming platforms, AI is making life more convenient and efficient. Smart home devices use AI to learn your preferences and automate tasks such as adjusting the thermostat or turning off lights. In transportation, AI powers navigation apps and helps optimize traffic flow. Even online shopping is enhanced by AI, which suggests products based on your browsing history. As AI becomes more integrated into society, it is important to understand both its benefits and potential challenges, such as privacy concerns and job displacement. By staying informed, we can make the most of AI's positive impact while addressing its risks.`,
    quiz: [
      {
        question: 'Which of the following is an example of AI in everyday life?',
        options: [
          'Voice assistants',
          'Manual typewriters',
          'Chalkboards',
          'Paper maps'
        ],
        answer: 0
      },
      {
        question: 'How does AI help in transportation?',
        options: [
          'By optimizing traffic flow',
          'By building roads',
          'By painting cars',
          'By making fuel'
        ],
        answer: 0
      },
      {
        question: 'What is a potential challenge of AI in society?',
        options: [
          'Privacy concerns',
          'Better recommendations',
          'Faster computers',
          'More TV shows'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'AI Myths',
    content: `There are many myths and misconceptions about artificial intelligence. Some people believe that AI will soon surpass human intelligence and take over the world, while others think AI is only about robots. In reality, most AI systems today are designed for specific tasks and cannot think or feel like humans. Another common myth is that AI will eliminate all jobs, but in practice, AI often creates new opportunities and helps people work more efficiently. It is important to separate fact from fiction and understand what AI can and cannot do. By learning the truth about AI, we can make better decisions about how to use and regulate this powerful technology.`,
    quiz: [
      {
        question: 'Which of the following is a myth about AI?',
        options: [
          'AI will take over the world soon',
          'AI is used in voice assistants',
          'AI can help doctors',
          'AI can play chess'
        ],
        answer: 0
      },
      {
        question: 'What is the reality about most AI systems today?',
        options: [
          'They are designed for specific tasks',
          'They can think and feel like humans',
          'They are all robots',
          'They can do everything humans can do'
        ],
        answer: 0
      },
      {
        question: 'Does AI always eliminate jobs?',
        options: [
          'No, it often creates new opportunities',
          'Yes, it eliminates all jobs',
          'It only creates robots',
          'It never changes work'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'AI Facts',
    content: `AI is already a part of our lives in many ways. For example, AI helps doctors diagnose diseases, assists farmers in monitoring crops, and enables self-driving cars to navigate roads. AI can analyze large amounts of data quickly and find patterns that humans might miss. It is also used in fraud detection, language translation, and even in creating art and music. While AI is powerful, it is not infallible—mistakes can happen, especially if the data used to train AI is biased or incomplete. Understanding the real capabilities and limitations of AI helps us use it more effectively and responsibly.`,
    quiz: [
      {
        question: 'Which of the following is a fact about AI?',
        options: [
          'AI helps doctors diagnose diseases',
          'AI never makes mistakes',
          'AI is only used in games',
          'AI cannot analyze data'
        ],
        answer: 0
      },
      {
        question: 'What is a limitation of AI?',
        options: [
          'It can make mistakes if trained on biased data',
          'It is always perfect',
          'It never needs data',
          'It can do everything a human can do'
        ],
        answer: 0
      },
      {
        question: 'In which field is AI NOT mentioned as being used?',
        options: [
          'Cooking',
          'Healthcare',
          'Agriculture',
          'Self-driving cars'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Limitations of AI',
    content: `While AI is a powerful tool, it has limitations. AI systems rely on data to learn and make decisions, so if the data is incomplete or biased, the results can be flawed. AI cannot truly understand emotions, context, or common sense the way humans do. It may struggle with tasks that require creativity or adaptability. Additionally, AI can be expensive to develop and maintain, and there are ethical concerns about privacy and fairness. Recognizing these limitations helps us use AI more wisely and avoid overestimating its abilities.`,
    quiz: [
      {
        question: 'What is a limitation of AI?',
        options: [
          'It relies on data and can be biased',
          'It understands emotions perfectly',
          'It is always creative',
          'It never makes mistakes'
        ],
        answer: 0
      },
      {
        question: 'Why might AI results be flawed?',
        options: [
          'Because of incomplete or biased data',
          'Because AI is always perfect',
          'Because AI never uses data',
          'Because AI is human'
        ],
        answer: 0
      },
      {
        question: 'What is an ethical concern related to AI?',
        options: [
          'Privacy and fairness',
          'Faster computers',
          'More TV shows',
          'Better weather'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'AI and the 4th Industrial Revolution',
    content: `The 4th Industrial Revolution is characterized by the fusion of technologies that blur the lines between the physical, digital, and biological worlds. AI is a key driver of this revolution, enabling automation, smart manufacturing, and new business models. AI-powered robots and systems are transforming industries such as healthcare, logistics, and finance. This revolution brings many opportunities, but also challenges, such as the need for new skills and the risk of job displacement. By understanding the role of AI in the 4th Industrial Revolution, we can better prepare for the changes ahead and harness the benefits of this technological transformation.`,
    quiz: [
      {
        question: 'What is the 4th Industrial Revolution characterized by?',
        options: [
          'The fusion of physical, digital, and biological technologies',
          'The invention of the steam engine',
          'The discovery of electricity',
          'The rise of agriculture'
        ],
        answer: 0
      },
      {
        question: 'How is AI contributing to the 4th Industrial Revolution?',
        options: [
          'By enabling automation and smart manufacturing',
          'By making food',
          'By building roads',
          'By painting houses'
        ],
        answer: 0
      },
      {
        question: 'What is a challenge of the 4th Industrial Revolution?',
        options: [
          'The need for new skills and risk of job displacement',
          'More TV shows',
          'Better weather',
          'Faster computers'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'AI Hardware Overview (CPUs vs GPUs)',
    content: `AI hardware refers to the physical components that power artificial intelligence systems. The two most common types are CPUs (Central Processing Units) and GPUs (Graphics Processing Units). CPUs are general-purpose processors found in most computers, while GPUs are specialized for handling large amounts of data in parallel, making them ideal for AI tasks like deep learning. Modern AI systems often use GPUs to train and run complex models quickly and efficiently. Understanding the differences between CPUs and GPUs helps in choosing the right hardware for different AI applications.`,
    quiz: [
      {
        question: 'What is the main difference between CPUs and GPUs?',
        options: [
          'CPUs are general-purpose, GPUs handle parallel data processing',
          'CPUs are only for gaming',
          'GPUs are slower than CPUs',
          'CPUs are used for deep learning only'
        ],
        answer: 0
      },
      {
        question: 'Why are GPUs preferred for deep learning?',
        options: [
          'They can process large amounts of data in parallel',
          'They are cheaper',
          'They use less electricity',
          'They are smaller in size'
        ],
        answer: 0
      },
      {
        question: 'What does AI hardware refer to?',
        options: [
          'The physical components powering AI systems',
          'Software programs',
          'Internet connections',
          'Cloud storage'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Ethics in AI',
    content: `Ethics in AI is about ensuring that artificial intelligence is developed and used in ways that are fair, transparent, and beneficial to society. Key ethical concerns include bias in algorithms, privacy, accountability, and the potential for misuse. Developers and organizations must consider the impact of AI on individuals and communities, and strive to create systems that respect human rights and values. Ethical AI also involves being transparent about how decisions are made and allowing for human oversight. By prioritizing ethics, we can build trust in AI and ensure it serves the common good.`,
    quiz: [
      {
        question: 'What is a key concern in AI ethics?',
        options: [
          'Bias in algorithms',
          'Faster computers',
          'More TV shows',
          'Better weather'
        ],
        answer: 0
      },
      {
        question: 'Why is transparency important in AI?',
        options: [
          'It helps people understand how decisions are made',
          'It makes AI slower',
          'It increases costs',
          'It reduces accuracy'
        ],
        answer: 0
      },
      {
        question: 'What is the goal of ethical AI?',
        options: [
          'To ensure AI is fair, transparent, and beneficial to society',
          'To make AI faster',
          'To replace all humans',
          'To create more robots'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Bias in AI',
    content: `Bias in AI occurs when algorithms produce results that are systematically prejudiced due to flawed data or assumptions. This can lead to unfair outcomes, such as discrimination in hiring, lending, or law enforcement. Addressing bias requires careful selection and preparation of training data, ongoing monitoring, and diverse development teams. By recognizing and mitigating bias, we can create AI systems that are more accurate, fair, and trustworthy.`,
    quiz: [
      {
        question: 'What causes bias in AI?',
        options: [
          'Flawed data or assumptions',
          'Perfect data',
          'Random chance',
          'Too much computing power'
        ],
        answer: 0
      },
      {
        question: 'What is a consequence of bias in AI?',
        options: [
          'Unfair outcomes',
          'Faster computers',
          'More TV shows',
          'Better weather'
        ],
        answer: 0
      },
      {
        question: 'How can bias in AI be addressed?',
        options: [
          'Careful data selection and monitoring',
          'Ignoring the problem',
          'Using only one type of data',
          'Making AI slower'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'AI Safety',
    content: `AI safety is about ensuring that artificial intelligence systems operate reliably and do not cause unintended harm. This includes designing systems that can handle unexpected situations, are robust to errors, and can be controlled or shut down if necessary. Safety is especially important in high-stakes applications like healthcare, transportation, and finance. Ongoing research in AI safety aims to develop techniques for verifying, validating, and monitoring AI systems. By prioritizing safety, we can build trust in AI and prevent accidents or misuse.`,
    quiz: [
      {
        question: 'Why is AI safety important?',
        options: [
          'To prevent unintended harm and build trust',
          'To make AI faster',
          'To create more robots',
          'To reduce costs'
        ],
        answer: 0
      },
      {
        question: 'What is a key aspect of AI safety?',
        options: [
          'Being able to control or shut down systems if needed',
          'Making AI slower',
          'Using only one type of data',
          'Ignoring errors'
        ],
        answer: 0
      },
      {
        question: 'In which applications is AI safety especially important?',
        options: [
          'Healthcare, transportation, and finance',
          'TV shows',
          'Cooking',
          'Painting'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Risks of AI',
    content: `AI brings many benefits, but also potential risks. These include job displacement, privacy violations, security threats, and the possibility of AI being used for malicious purposes. There are also concerns about the concentration of power among a few organizations that control advanced AI systems. Addressing these risks requires thoughtful regulation, transparency, and collaboration between governments, industry, and the public. By understanding and managing the risks, we can maximize the benefits of AI while minimizing potential harms.`,
    quiz: [
      {
        question: 'What is a potential risk of AI?',
        options: [
          'Job displacement',
          'Faster computers',
          'More TV shows',
          'Better weather'
        ],
        answer: 0
      },
      {
        question: 'How can AI risks be managed?',
        options: [
          'Through regulation, transparency, and collaboration',
          'By ignoring them',
          'By making AI slower',
          'By using only one type of data'
        ],
        answer: 0
      },
      {
        question: 'Who should be involved in addressing AI risks?',
        options: [
          'Governments, industry, and the public',
          'Only programmers',
          'Only companies',
          'Only users'
        ],
        answer: 0
      }
    ]
  },
  {
    title: 'Explainable AI',
    content: `Explainable AI (XAI) refers to methods and techniques that make the decisions and actions of AI systems understandable to humans. XAI is important for building trust, ensuring accountability, and meeting regulatory requirements. Techniques for explainability include visualizations, simplified models, and natural language explanations. By making AI more transparent, we can better understand how it works, identify potential biases, and improve its performance. Explainable AI is especially important in fields like healthcare and finance, where decisions can have significant consequences.`,
    quiz: [
      {
        question: 'What is the goal of explainable AI?',
        options: [
          'To make AI decisions understandable to humans',
          'To make AI faster',
          'To create more robots',
          'To reduce costs'
        ],
        answer: 0
      },
      {
        question: 'Why is explainability important in AI?',
        options: [
          'For trust, accountability, and regulation',
          'To make AI slower',
          'To increase costs',
          'To reduce accuracy'
        ],
        answer: 0
      },
      {
        question: 'In which fields is explainable AI especially important?',
        options: [
          'Healthcare and finance',
          'TV shows',
          'Cooking',
          'Painting'
        ],
        answer: 0
      }
    ]
  },
];

const Lessons: React.FC = () => {
  const [openTopics, setOpenTopics] = useState<{ [topic: string]: boolean }>({});
  const navigate = useNavigate();

  const toggleTopic = (topic: string) => {
    setOpenTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  return (
    <div className="bg-[#0D1117] min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">All Lesson Topics</h1>
      <div className="max-w-4xl mx-auto">
        {Object.entries(lessonsByTopic).map(([topic, lessons]) => {
          const isOpen = openTopics[topic];
          return (
            <div
              key={topic}
              className="bg-gray-800/30 backdrop-blur-md rounded-2xl mb-8 border border-gray-700"
            >
              <div
                className="flex items-center justify-between cursor-pointer p-6"
                onClick={() => toggleTopic(topic)}
              >
                <span className="text-2xl font-bold">{topic}</span>
                <ChevronRight
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                  size={28}
                />
              </div>
              {isOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 pt-0">
                  {lessons.map((lesson, idx) => {
                    const durations = [4, 5, 6];
                    const hash = lesson.split('').reduce((acc, c) => acc + c.charCodeAt(0), idx);
                    const duration = durations[hash % durations.length];
                    const handleClick = () => navigate(`/lessons/${topic}/${idx}`);
                    return (
                      <div
                        key={lesson}
                        className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 transition-all duration-300 hover:border-[#38BDF8] hover:scale-105 cursor-pointer"
                        onClick={handleClick}
                      >
                        <h3 className="text-lg font-bold mb-3">{lesson}</h3>
                        <div className="text-gray-400 text-sm flex items-center justify-between">
                          <div className="flex items-center">
                            <Star size={16} className="mr-2 text-yellow-400" />
                            <span>Beginner</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-2" />
                            <span>{duration} min</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lessons; 