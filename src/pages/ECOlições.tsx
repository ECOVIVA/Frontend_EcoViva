import React from 'react';
import { Book, Leaf, TreePine, Recycle, Wind, Sprout, Bird, Fish } from 'lucide-react';
import Lesson1 from '../components/Lesson1';
import Lesson2 from '../components/Lesson2';
import Lesson3 from '../components/Lesson3';
import Lesson4 from '../components/Lesson4';
import Lesson5 from '../components/Lesson5';
import Lesson6 from '../components/Lesson6';
import Lesson7 from '../components/Lesson7';
import Lesson8 from '../components/Lesson8';


function App() {
  const [selectedLesson, setSelectedLesson] = React.useState<number | null>(null);

  const lessons = [
    {
      id: 1,
      title: "Reciclagem Básica",
      icon: <Recycle className="w-8 h-8" />,
      description: "Aprenda os fundamentos da separação de resíduos",
      difficulty: "Iniciante",
      duration: "20 min",
      background: "from-green-400 to-emerald-600",
    },
    {
      id: 2,
      title: "Jogo da Memória Reciclável",
      icon: <Leaf className="w-8 h-8" />,
      description: "Teste sua memória enquanto aprende sobre reciclagem",
      difficulty: "Iniciante",
      duration: "15 min",
      background: "from-blue-400 to-cyan-600",
    },
    {
      id: 3,
      title: "Compostagem Básica",
      icon: <Sprout className="w-8 h-8" />,
      description: "Aprenda a transformar resíduos em adubo natural",
      difficulty: "Intermediário",
      duration: "25 min",
      background: "from-yellow-400 to-amber-600",
    },
    {
      id: 4,
      title: "Biodiversidade",
      icon: <Bird className="w-8 h-8" />,
      description: "Entenda a importância da diversidade biológica",
      difficulty: "Intermediário",
      duration: "25 min",
      background: "from-purple-400 to-fuchsia-600",
    },
    {
      id: 5,
      title: "Agricultura Sustentável",
      icon: <Sprout className="w-8 h-8" />,
      description: "Práticas agrícolas eco-friendly",
      difficulty: "Avançado",
      duration: "35 min",
      background: "from-lime-400 to-green-600",
    },
    {
      id: 6,
      title: "Ecossistemas Marinhos",
      icon: <Fish className="w-8 h-8" />,
      description: "Explore a vida nos oceanos",
      difficulty: "Intermediário",
      duration: "30 min",
      background: "from-sky-400 to-blue-600",
    },
    {
      id: 7,
      title: "Florestas e Clima",
      icon: <TreePine className="w-8 h-8" />,
      description: "O papel das florestas no clima global",
      difficulty: "Avançado",
      duration: "40 min",
      background: "from-emerald-400 to-teal-600",
    },
    {
      id: 8,
      title: "Qualidade do Ar",
      icon: <Wind className="w-8 h-8" />,
      description: "Monitoramento e preservação do ar",
      difficulty: "Intermediário",
      duration: "25 min",
      background: "from-cyan-400 to-sky-600",
    },
    {
      id: 9,
      title: "Botânica Básica",
      icon: <Leaf className="w-8 h-8" />,
      description: "Introdução ao mundo das plantas",
      difficulty: "Iniciante",
      duration: "20 min",
      background: "from-teal-400 to-emerald-600",
    },
    {
      id: 10,
      title: "Literatura Ambiental",
      icon: <Book className="w-8 h-8" />,
      description: "Obras essenciais sobre meio ambiente",
      difficulty: "Iniciante",
      duration: "15 min",
      background: "from-indigo-400 to-violet-600",
    },
  ];

  if (selectedLesson === 1) {
    return <Lesson1 onBack={() => setSelectedLesson(null)} />;
  }

  if (selectedLesson === 2) {
    return <Lesson2 onBack={() => setSelectedLesson(null)} />;
  }

  if (selectedLesson === 3) {
    return <Lesson3 onBack={() => setSelectedLesson(null)} />;
  }

  if (selectedLesson === 4) {
    return <Lesson4 onBack={() => setSelectedLesson(null)} />;
  }
  
  if (selectedLesson === 5) {
    // @ts-ignore
    return <Lesson5 onBack={() => setSelectedLesson(null)} />;
  }

  if (selectedLesson === 6) {
    
    return <Lesson6 onBack={() => setSelectedLesson(null)} />;
  }
  if (selectedLesson === 7) {
     // @ts-ignore
    return <Lesson7 onBack={() => setSelectedLesson(null)} />;
  }
  if (selectedLesson === 8) {
   // @ts-ignore
    return <Lesson8 onBack={() => setSelectedLesson(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-36 px-36">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="h-12 w-12" />
            <h1 className="text-4xl font-bold">EcoStudy</h1>
          </div>
          <p className="text-center text-xl text-green-50 max-w-2xl mx-auto">
            Explore o mundo da sustentabilidade através de lições interativas e envolventes
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols -2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson.id)}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${lesson.background} opacity-90`} />
              <div className="relative p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    {lesson.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {lesson.difficulty}
                    </span>
                    <span className="text-sm mt-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {lesson.duration}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{lesson.title}</h3>
                <p className="text-white/90">{lesson.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {lesson.id <= 3 ? 'Disponível' : 'Em breve'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-green-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-green-200">
            © 2025 EcoStudy - Aprendizagem Ambiental Interativa
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;