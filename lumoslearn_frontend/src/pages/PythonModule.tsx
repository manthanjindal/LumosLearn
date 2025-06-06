import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Terminal, Play, RotateCcw, ChevronRight, Star, Trophy } from 'lucide-react';

// Extended Python lessons with story-driven approach
const pythonLessons = [
  {
    id: 'py_what_is_python',
    title: 'What is Python?',
    description: 'Understand the fundamentals of the Python language.',
    story: "Welcome, new coder! You're about to meet Python, one of the most popular and friendly programming languages in the world. Think of it as a magical spellbook that lets you talk to computers. It's used for everything from building websites to creating AI!",
    defaultCode: '# Python is known for its simple syntax.\n# Below is a "print" statement, which displays text.\n\nprint("Hello, Python!")',
    difficulty: 'Beginner',
    xpReward: 50
  },
  {
    id: 'py_uses_of_python',
    title: 'What is Python Used For?',
    description: 'Discover the real-world applications of Python.',
    story: "Python isn't just for abstract spells! It's a tool used by modern-day wizards at places like Google, Netflix, and NASA. It's the language behind data science, machine learning, web development, and much more. Your journey starts with the same tool the pros use.",
    defaultCode: '# Python can be used for many things.\n# Here, we use it for a simple calculation.\n\nlaptops_made = 15\nlaptops_sold = 7\n\nlaptops_in_stock = laptops_made - laptops_sold\n\nprint("Laptops in stock:")\nprint(laptops_in_stock)',
    difficulty: 'Beginner',
    xpReward: 50
  },
  {
    id: 'py_setup',
    title: 'Setting Up Your Environment',
    description: 'Learn about Python environments and IDEs.',
    story: "Every wizard needs a workshop! For a programmer, this is your 'Integrated Development Environment' (IDE). It's a special editor that helps you write, test, and debug your code. This page is a basic version of an IDE! For larger projects, developers use tools like VS Code or PyCharm.",
    defaultCode: '# This online editor is a simple IDE.\n# You can write your Python code here.\n# And click "Run" to see what it does in the output below!\n\nmessage = "I am writing Python code!"\nprint(message)',
    difficulty: 'Beginner',
    xpReward: 50
  },
  {
    id: 'py_intro',
    title: 'The Beginning of Your Journey',
    description: 'Start your coding adventure by learning the basics of Python',
    story: "Welcome, brave adventurer! You're about to embark on an exciting journey into the world of programming. Python, your trusty companion, is known for its friendliness to beginners and its powerful abilities. Let's take our first steps together!",
    defaultCode: '# Your first line of magic!\nprint("Hello, fellow adventurer!")\n\n# Let\'s perform our first calculation spell\nresult = 10 + 5\nprint(f"The power of numbers: 10 + 5 = {result}")',
    difficulty: 'Beginner',
    xpReward: 100
  },
  {
    id: 'py_variables',
    title: 'Gathering Your Equipment',
    description: 'Learn how to store different types of treasures (data) in variables',
    story: "Every adventurer needs a way to carry their equipment! In Python, we use variables as magical containers that can hold different types of treasures - numbers, text, and even true/false values. Let's learn how to use them!",
    defaultCode: '# Creating our inventory\nweapon = "Magic Staff"\npower_level = 100\nis_ready = True\n\n# Checking our equipment\nprint(f"Weapon: {weapon}")\nprint(f"Power Level: {power_level}")\nprint(f"Ready for adventure? {is_ready}")',
    difficulty: 'Beginner',
    xpReward: 150
  },
  {
    id: 'py_numbers',
    title: 'Mastering the Art of Numbers',
    description: 'Learn to manipulate numbers and perform calculations',
    story: "In your quest, you'll need to calculate damage, manage resources, and solve puzzles. Numbers are your tools for these tasks. Let's master the art of mathematical operations!",
    defaultCode: '# Basic arithmetic spells\nattack = 25\ndefense = 15\n\n# Calculate total damage\ndamage = attack - defense\nprint(f"Damage dealt: {damage}")\n\n# Power multiplier\ncritical_hit = damage * 2\nprint(f"Critical hit damage: {critical_hit}")',
    difficulty: 'Beginner',
    xpReward: 150
  },
  {
    id: 'py_strings',
    title: 'The Power of Words',
    description: 'Master string manipulation and text processing',
    story: "Words have power in our world, and the same is true in programming. Learn to manipulate text to create messages, process information, and even cast powerful string manipulation spells!",
    defaultCode: '# Creating magical messages\nspell_name = "Fireball"\nspell_power = "high"\n\n# String concatenation\nmessage = spell_name + " is a " + spell_power + " power spell!"\nprint(message)\n\n# Using f-strings (modern magic)\nprint(f"{spell_name.upper()} CAST!")',
    difficulty: 'Beginner',
    xpReward: 150
  },
  {
    id: 'py_lists',
    title: 'Building Your Inventory',
    description: 'Learn to work with collections of items using lists',
    story: "Every adventurer needs an inventory to store their items. In Python, lists are like magical bags that can hold multiple items. Let's learn how to manage our collection of tools and treasures!",
    defaultCode: '# Creating our inventory\ninventory = ["Health Potion", "Magic Scroll", "Golden Key"]\n\n# Adding new items\ninventory.append("Magic Wand")\n\n# Checking our items\nprint("Your inventory contains:")\nfor item in inventory:\n    print(f"- {item}")',
    difficulty: 'Beginner',
    xpReward: 200
  },
  {
    id: 'py_conditions',
    title: 'Making Wise Decisions',
    description: 'Learn to make decisions in your code using if statements',
    story: "Every adventure requires making important decisions. In Python, we use conditions to help our program make choices. Let's learn how to create smart decision-making logic!",
    defaultCode: '# Check if we can defeat the dragon\nplayer_level = 10\ndragon_level = 15\n\nif player_level >= dragon_level:\n    print("You are strong enough to face the dragon!")\nelse:\n    print("You need more training before facing the dragon.")',
    difficulty: 'Beginner',
    xpReward: 200
  },
  {
    id: 'py_loops',
    title: 'The Art of Repetition',
    description: 'Master loops to automate repetitive tasks',
    story: "Sometimes an adventurer needs to perform the same action multiple times. Loops are like magical scrolls that can repeat actions automatically. Let's discover how to harness this power!",
    defaultCode: '# Training routine\nfor day in range(1, 8):\n    print(f"Day {day} of training:")\n    print("- 100 sword swings")\n    print("- 50 magic spells")\n    print("- 20 potion brewing")\n    print("")',
    difficulty: 'Intermediate',
    xpReward: 250
  },
  {
    id: 'py_functions',
    title: 'Crafting Magical Spells',
    description: 'Create reusable code blocks using functions',
    story: "Just as wizards create spells they can cast multiple times, programmers create functions to reuse code. Let's learn how to craft our own magical functions!",
    defaultCode: 'def cast_spell(spell_name, power):\n    print(f"Casting {spell_name}...")\n    return power * 2\n\n# Using our spell\nfireball_damage = cast_spell("Fireball", 50)\nprint(f"Spell dealt {fireball_damage} damage!")',
    difficulty: 'Intermediate',
    xpReward: 250
  },
  {
    id: 'py_dictionaries',
    title: 'The Magical Encyclopedia',
    description: 'Store and retrieve information using dictionaries',
    story: "Every adventurer needs a way to store and quickly look up information. Dictionaries are like magical encyclopedias that can instantly find what you're looking for!",
    defaultCode: '# Creating our spell book\nspell_book = {\n    "Fireball": {"damage": 50, "mana_cost": 30},\n    "Heal": {"healing": 40, "mana_cost": 25},\n    "Shield": {"defense": 35, "mana_cost": 20}\n}\n\n# Looking up spell information\nspell = "Fireball"\nprint(f"{spell} spell:")\nprint(f"Damage: {spell_book[spell]["damage"]}")\nprint(f"Mana Cost: {spell_book[spell]["mana_cost"]}")',
    difficulty: 'Intermediate',
    xpReward: 300
  },
  {
    id: 'py_classes',
    title: 'Creating Magical Beings',
    description: 'Learn object-oriented programming with classes',
    story: "In our magical world, we can create new types of beings and objects. Classes are like blueprints for creating magical entities. Let's learn how to bring new things into existence!",
    defaultCode: 'class Wizard:\n    def __init__(self, name, power):\n        self.name = name\n        self.power = power\n        self.health = 100\n    \n    def cast_spell(self, spell_name):\n        print(f"{self.name} casts {spell_name}!")\n\n# Create a new wizard\nmerlin = Wizard("Merlin", 95)\nmerlin.cast_spell("Time Stop")',
    difficulty: 'Intermediate',
    xpReward: 350
  },
  {
    id: 'py_inheritance',
    title: 'The Legacy of Magic',
    description: 'Understand inheritance and extend existing classes',
    story: "Just as magical abilities can be passed down through generations, classes can inherit properties from other classes. Let's explore how to create new classes based on existing ones!",
    defaultCode: 'class Character:\n    def __init__(self, name, health):\n        self.name = name\n        self.health = health\n\nclass Warrior(Character):\n    def __init__(self, name, health, strength):\n        super().__init__(name, health)\n        self.strength = strength\n\n# Create a warrior\nhero = Warrior("Aragorn", 100, 85)\nprint(f"{hero.name} has {hero.health} HP and {hero.strength} strength")',
    difficulty: 'Advanced',
    xpReward: 400
  },
  {
    id: 'py_exceptions',
    title: 'Handling Magical Mishaps',
    description: 'Learn to handle errors and exceptions gracefully',
    story: "Even the most skilled wizards sometimes face unexpected problems. Let's learn how to handle errors and mishaps in our code with grace and style!",
    defaultCode: 'def divide_treasures(gold, adventurers):\n    try:\n        share = gold / adventurers\n        print(f"Each adventurer gets {share} gold")\n    except ZeroDivisionError:\n        print("Error: Need at least one adventurer!")\n    except TypeError:\n        print("Error: Invalid input types!")\n\n# Test our function\ndivide_treasures(100, 4)  # Works fine\ndivide_treasures(100, 0)  # Handles zero division\ndivide_treasures("lots", 4)  # Handles type error',
    difficulty: 'Advanced',
    xpReward: 400
  },
  {
    id: 'py_modules',
    title: 'The Grand Library',
    description: 'Learn to use Python modules and create your own',
    story: "A wizard's library contains many spell books (modules) with pre-written magic. Let's learn how to use Python's built-in modules and create our own!",
    defaultCode: 'import random\nimport math\n\n# Using random module\nprint("Rolling a magical 20-sided die...")\nresult = random.randint(1, 20)\nprint(f"You rolled: {result}")\n\n# Using math module\nspell_power = 10\namplified = math.pow(spell_power, 2)\nprint(f"Spell power amplified: {amplified}")',
    difficulty: 'Advanced',
    xpReward: 450
  },
  {
    id: 'py_files',
    title: 'The Ancient Scrolls',
    description: 'Learn to read and write files',
    story: "Ancient scrolls contain valuable information that must be preserved. Let's learn how to read from and write to files, storing our magical knowledge for future use!",
    defaultCode: '# Writing to a scroll\nwith open("spell_log.txt", "w") as scroll:\n    scroll.write("Day 1: Learned Fireball\\n")\n    scroll.write("Day 2: Mastered Shield Spell\\n")\n\n# Reading from the scroll\nwith open("spell_log.txt", "r") as scroll:\n    contents = scroll.read()\n    print("Scroll contents:")\n    print(contents)',
    difficulty: 'Advanced',
    xpReward: 450
  },
  {
    id: 'py_list_comprehension',
    title: 'Advanced Magical Formulas',
    description: 'Master list comprehensions for elegant code',
    story: "Ancient wizards discovered ways to write more elegant and powerful spells. List comprehensions are Python's way of writing sophisticated code in a beautiful and concise manner!",
    defaultCode: '# Traditional way\nspells = ["Fireball", "Ice Shard", "Lightning Bolt", "Heal"]\npower_spells = []\nfor spell in spells:\n    if "bolt" in spell.lower():\n        power_spells.append(spell)\n\n# List comprehension way\npower_spells = [spell for spell in spells if "bolt" in spell.lower()]\nprint("Power spells:", power_spells)',
    difficulty: 'Advanced',
    xpReward: 500
  },
  {
    id: 'py_decorators',
    title: 'Enchanting Functions',
    description: 'Learn to modify function behavior with decorators',
    story: "Sometimes we need to enhance our spells with additional powers. Decorators are like magical enhancements that can modify how our functions work!",
    defaultCode: 'def log_spell(func):\n    def wrapper(*args, **kwargs):\n        print(f"Casting spell: {func.__name__}")\n        result = func(*args, **kwargs)\n        print("Spell complete!")\n        return result\n    return wrapper\n\n@log_spell\ndef fireball(target):\n    print(f"Launching fireball at {target}")\n\nfireball("dragon")',
    difficulty: 'Expert',
    xpReward: 550
  },
  {
    id: 'py_generators',
    title: 'Infinite Magic Stream',
    description: 'Create efficient sequences with generators',
    story: "Some magical effects continue indefinitely, like a never-ending stream of sparks. Generators help us create sequences that can go on forever without consuming all our magical energy!",
    defaultCode: 'def magic_numbers():\n    n = 0\n    while True:\n        yield n * n\n        n += 1\n\n# Create a generator of magic numbers\nmagic = magic_numbers()\n\n# Get the first 5 magic numbers\nprint("First 5 magic numbers:")\nfor _ in range(5):\n    print(next(magic))',
    difficulty: 'Expert',
    xpReward: 550
  },
  {
    id: 'py_context_managers',
    title: 'Magical Resource Management',
    description: 'Learn to manage resources with context managers',
    story: "Powerful magic requires careful management of magical resources. Context managers help us ensure our resources are properly handled and released when we're done!",
    defaultCode: 'class MagicPortal:\n    def __init__(self, destination):\n        self.destination = destination\n    \n    def __enter__(self):\n        print(f"Opening portal to {self.destination}...")\n        return self\n    \n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print("Closing portal...")\n\nwith MagicPortal("Mystic Realm") as portal:\n    print("Traveling through portal...")',
    difficulty: 'Expert',
    xpReward: 600
  },
  {
    id: 'py_async',
    title: 'Time Magic',
    description: 'Introduction to asynchronous programming',
    story: "The most powerful wizards can perform multiple spells simultaneously. Async programming lets us handle multiple tasks at once, just like a master of time magic!",
    defaultCode: 'import asyncio\n\nasync def cast_spell(spell_name, cast_time):\n    print(f"Beginning to cast {spell_name}...")\n    await asyncio.sleep(cast_time)\n    print(f"{spell_name} cast complete!")\n\nasync def main():\n    await asyncio.gather(\n        cast_spell("Fireball", 2),\n        cast_spell("Ice Shield", 1),\n        cast_spell("Lightning Storm", 3)\n    )\n\n# Run the async spells\nawait main()',
    difficulty: 'Expert',
    xpReward: 650
  },
  {
    id: 'py_optimization',
    title: 'Perfecting Your Craft',
    description: 'Learn code optimization and best practices',
    story: "A true master knows not just how to cast spells, but how to cast them efficiently. Let's learn how to optimize our code for maximum performance!",
    defaultCode: '# Original spell\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\n# Optimized spell using memoization\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fast_fibonacci(n):\n    if n <= 1:\n        return n\n    return fast_fibonacci(n-1) + fast_fibonacci(n-2)\n\n# Compare performance\nimport time\n\nstart = time.time()\nprint(fibonacci(30))\nprint(f"Regular spell took: {time.time() - start:.2f} seconds")\n\nstart = time.time()\nprint(fast_fibonacci(30))\nprint(f"Optimized spell took: {time.time() - start:.2f} seconds")',
    difficulty: 'Expert',
    xpReward: 700
  },
  {
    id: 'py_final_challenge',
    title: 'The Ultimate Test',
    description: 'Combine everything you\'ve learned in a final project',
    story: "The time has come to prove yourself as a true Python Master! This final challenge will test everything you've learned on your journey. Create a magical battle system that combines all your knowledge!",
    defaultCode: 'class Spell:\n    def __init__(self, name, power, mana_cost):\n        self.name = name\n        self.power = power\n        self.mana_cost = mana_cost\n\nclass Wizard:\n    def __init__(self, name):\n        self.name = name\n        self.health = 100\n        self.mana = 100\n        self.spells = {}\n    \n    def learn_spell(self, spell):\n        self.spells[spell.name] = spell\n    \n    def cast_spell(self, spell_name, target):\n        if spell_name not in self.spells:\n            raise ValueError(f"You haven\'t learned {spell_name} yet!")\n        \n        spell = self.spells[spell_name]\n        if self.mana < spell.mana_cost:\n            raise ValueError("Not enough mana!")\n        \n        self.mana -= spell.mana_cost\n        damage = spell.power\n        target.health -= damage\n        \n        return f"{self.name} casts {spell_name} on {target.name} for {damage} damage!"\n\n# Create wizards and spells\nmerlin = Wizard("Merlin")\nmorgan = Wizard("Morgan")\n\nfireball = Spell("Fireball", 30, 25)\niceblast = Spell("Ice Blast", 25, 20)\n\n# Battle simulation\nmerlin.learn_spell(fireball)\nmorgan.learn_spell(iceblast)\n\nprint(merlin.cast_spell("Fireball", morgan))\nprint(f"Morgan\'s health: {morgan.health}")\n\nprint(morgan.cast_spell("Ice Blast", merlin))\nprint(f"Merlin\'s health: {merlin.health}")',
    difficulty: 'Master',
    xpReward: 1000
  }
];

const PythonModule: React.FC = () => {
  const { t } = useLanguage();
  const [selectedLesson, setSelectedLesson] = useState(pythonLessons[0]);
  const [code, setCode] = useState(selectedLesson.defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showStory, setShowStory] = useState(true);
  
  const pyodide = useRef<any>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      setIsRunning(true);
      setOutput(t('pythonModule.loading'));
      try {
        const { loadPyodide } = await import('pyodide');
        const pyodideInstance = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
        });
        
        pyodideInstance.setStdout({
            batched: (msg: string) => {
                setOutput(prev => prev + msg + '\\n');
            }
        });
        pyodideInstance.setStderr({
            batched: (msg: string) => {
                setOutput(prev => prev + msg + '\\n');
            }
        });

        pyodide.current = pyodideInstance as any;
        setOutput(t('pythonModule.ready'));
      } catch (error) {
        setOutput(`Error loading Python environment: ${error}`);
      } finally {
        setIsRunning(false);
      }
    };
    loadPyodide();
  }, [t]);

  const runCode = async () => {
    if (!pyodide.current) {
      setOutput('Pyodide is not ready yet.');
      return;
    }
    setIsRunning(true);
    setOutput('');
    
    try {
      await pyodide.current.loadPackagesFromImports(code);
      const result = await pyodide.current.runPythonAsync(code);
      if (result !== undefined) {
        setOutput(prev => prev + String(result));
      }
    } catch (error) {
        setOutput(prev => prev + String(error));
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(selectedLesson.defaultCode);
    setOutput('');
  };

  const handleLessonChange = (lesson: typeof pythonLessons[0]) => {
    setSelectedLesson(lesson);
    setCode(lesson.defaultCode);
    setOutput('');
    setShowStory(true);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar with lessons */}
      <aside className="w-1/4 bg-gray-800 p-6 overflow-y-auto">
        <div className="flex items-center mb-6">
          <Trophy className="text-yellow-400 mr-3 h-8 w-8" />
          <h1 className="text-2xl font-bold text-gray-100">{t('pythonModule.title')}</h1>
        </div>
        <p className="text-gray-400 mb-6">{t('pythonModule.subtitle')}</p>
        <nav>
          <ul>
            {pythonLessons.map((lesson) => (
              <li key={lesson.id}>
                <button
                  onClick={() => handleLessonChange(lesson)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                    selectedLesson.id === lesson.id
                      ? 'bg-[#264f78] text-white'
                      : 'hover:bg-[#2d2d2d] text-[#cccccc]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-opacity-20 bg-yellow-500 text-yellow-300">
                      {lesson.difficulty}
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">
                    {lesson.description}
                  </p>
                  <div className="flex items-center mt-2 text-xs">
                    <Trophy className="w-3 h-3 mr-1" />
                    <span>{lesson.xpReward} XP</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="w-3/4 p-6 overflow-y-auto">
        {/* Story section */}
        {showStory && (
          <div className="bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden border border-[#323232] mb-6">
            <div className="px-6 py-4 border-b border-[#323232] flex justify-between items-center">
              <h2 className="font-bold text-xl text-[#cccccc] flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                {t('pythonModule.chapterIntro')}
              </h2>
              <button
                onClick={() => setShowStory(false)}
                className="text-[#cccccc] hover:text-white transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-[#cccccc] leading-relaxed">
                {selectedLesson.story}
              </p>
            </div>
          </div>
        )}

        {/* Code editor and output */}
        <div className="bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden border border-[#323232]">
          <div className="px-6 py-4 border-b border-[#323232] flex justify-between items-center">
            <h2 className="font-bold text-xl text-[#cccccc]">
              {selectedLesson.title}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={resetCode}
                className="px-3 py-1.5 border border-[#323232] rounded-lg text-sm font-medium text-[#cccccc] hover:bg-[#2d2d2d] transition-colors duration-200 flex items-center"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                {t('pythonModule.resetCode')}
              </button>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-3 py-1.5 bg-[#0e639c] text-white rounded-lg text-sm font-medium hover:bg-[#1177bb] transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="h-4 w-4 mr-1" />
                {isRunning ? t('pythonModule.running') : t('pythonModule.run')}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
            {/* Code editor */}
            <div className="border-r border-[#323232] relative">
              <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-[#252526] text-xs font-medium text-[#cccccc]">
                Python Editor
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full pt-10 px-4 pb-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] resize-none focus:outline-none"
                spellCheck="false"
              ></textarea>
            </div>
            
            {/* Output console */}
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-[#252526] text-xs font-medium text-[#cccccc] flex items-center">
                <Terminal className="h-3.5 w-3.5 mr-1.5" />
                Console Output
              </div>
              <div className="w-full h-full pt-10 px-4 pb-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] overflow-auto whitespace-pre-wrap">
                {output || 'Click "Run Code" to see the output here.'}
              </div>
            </div>
          </div>
        </div>

        {/* Output section */}
        <div className="h-1/3 bg-gray-900 border-t border-gray-700 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-300">{t('pythonModule.output')}</h3>
            <button
              onClick={() => setOutput('')}
              className="text-xs text-gray-400 hover:text-white"
            >
              {t('pythonModule.clear')}
            </button>
          </div>
          <pre className="text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      </main>
    </div>
  );
};

export default PythonModule;