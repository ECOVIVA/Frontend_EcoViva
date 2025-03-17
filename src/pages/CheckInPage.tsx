import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Award, TrendingUp, Leaf, ArrowRight, CheckCircle2, X, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { Progress } from "../components/ui/progress";

// Lista de missões diárias
const dailyMissions = [
  { title: "Plante 2 mudas de girassóis hoje", description: "Traga mais cor e vida para seu jardim!" },
  { title: "Faça um boneco com tampinhas de leite", description: "Dê uma nova vida às tampinhas recicladas" },
  { title: "Crie um vaso de plantas com garrafa PET", description: "Transforme resíduos em um lindo jardim vertical" },
  { title: "Separe o lixo orgânico para compostagem", description: "Ajude a criar adubo natural" },
  { title: "Monte um comedouro de pássaros reciclado", description: "Atraia a natureza para perto de você" },
  { title: "Faça arte com rolhas de vinho", description: "Transforme rolhas em peças decorativas" },
  { title: "Crie um porta-lápis com latas", description: "Organize seu material de forma sustentável" },
  { title: "Monte um mini jardim em potes de vidro", description: "Dê um novo propósito aos potes vazios" },
  { title: "Faça um regador com garrafa PET", description: "Cuide das suas plantas de forma sustentável" },
  { title: "Crie brinquedos com caixas de papelão", description: "Estimule a criatividade com reciclagem" },
  { title: "Monte um minhocário caseiro", description: "Aprenda sobre decomposição natural" },
  { title: "Faça decorações com jornais velhos", description: "Transforme papel em arte" },
  { title: "Crie um porta-trecos com latas", description: "Organize com consciência ambiental" },
  { title: "Monte um terrário em vidros reciclados", description: "Crie um mini ecossistema" },
  { title: "Faça um espantalho com materiais reciclados", description: "Proteja sua horta de forma criativa" }
];

const Index = () => {
  // State for managing check-ins and UI
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userId, setUserId] = useState('user123');
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [streak, setStreak] = useState(12);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rippleEffect, setRippleEffect] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [waterAnimating, setWaterAnimating] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  
  // Estado para as missões diárias
  const [dailyMissionPair, setDailyMissionPair] = useState<typeof dailyMissions>([]);

  // Função para selecionar duas missões aleatórias
  const selectRandomMissions = () => {
    const shuffled = [...dailyMissions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  // Atualiza as missões diárias
  useEffect(() => {
    setDailyMissionPair(selectRandomMissions());
  }, []);

  // Calculate water fill level based on streak (out of 30 days)
  const calculateWaterFillLevel = () => {
    return Math.min((streak / 30) * 100, 100);
  };

  // Set water fill level as a CSS variable
  useEffect(() => {
    if (bubbleRef.current) {
      bubbleRef.current.style.setProperty('--fill-height', `${calculateWaterFillLevel()}%`);
    }
  }, [streak]);

  // Simulate API calls that will be replaced with actual axios calls
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        setTimeout(() => {
          setIsAuthenticated(true);
          setUserId('user123');
          loadUserCheckIns();
        }, 500);
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkUserStatus();
  }, []);

  const loadUserCheckIns = async () => {
    try {
      setTimeout(() => {
        setHasCheckedInToday(false);
        setStreak(12);
        setTimeout(() => {
          setWaterAnimating(true);
        }, 500);
      }, 500);
    } catch (error) {
      console.error('Error loading check-ins:', error);
    }
  };

  const handleCheckIn = async () => {
    if (!userId || hasCheckedInToday || isLoading) return;

    setIsLoading(true);
    setRippleEffect(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStreak(prev => prev + 1);
      setHasCheckedInToday(true);
      setShowSuccess(true);
      
      if (bubbleRef.current) {
        const newLevel = calculateWaterFillLevel() + (100/30);
        bubbleRef.current.style.setProperty('--fill-height', `${Math.min(newLevel, 100)}%`);
      }
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error during check-in:', error);
    } finally {
      setIsLoading(false);
      setRippleEffect(false);
    }
  };

  // Trigger animations on page load
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Calculate sustainability level based on streak
  const getSustainabilityLevel = () => {
    if (streak >= 30) return 'Mestre Ecológico';
    if (streak >= 15) return 'Guardião da Natureza';
    if (streak >= 7) return 'Defensor Ambiental';
    return 'Iniciante Verde';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white bg-pattern overflow-hidden">
      {/* Success notification */}
      {showSuccess && (
        <div className="success-alert animate-slide-down flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Check-in Realizado com Sucesso!</h4>
            <p className="text-sm text-gray-600">Continue fazendo a diferença!</p>
          </div>
          <button 
            onClick={() => setShowSuccess(false)}
            className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-down opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <div className="inline-block px-3 py-1 rounded-full bg-white bg-opacity-70 backdrop-blur-sm text-primary text-sm font-medium mb-3 shadow-sm">
            <span className="flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              <span>Sustentabilidade Diária</span>
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Registre Sua Reciclagem</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Cada check-in representa seu compromisso com um planeta mais limpo e sustentável.
            Complete 30 dias de check-ins para encher sua bolha ecológica!
          </p>
        </div>

        {/* Centered main content with bubble in center */}
        <div className="flex flex-col items-center">
          {/* Progress bar for 30-day challenge */}
          <div className="w-full max-w-md mb-6 animate-slide-down opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progresso do Desafio</span>
              <span className="text-sm font-medium text-primary">{streak}/30 dias</span>
            </div>
            <Progress value={calculateWaterFillLevel()} className="h-2" />
          </div>

          {/* Centered check-in bubble */}
          <div className="mb-12 animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div 
              ref={bubbleRef}
              className={`checkin-bubble ${hasCheckedInToday ? 'glow-effect' : ''} ${rippleEffect ? 'animate-pulse-soft' : ''}`}
              onClick={handleCheckIn}
            >
              {/* Water filling effect */}
              <div className="water-fill-container">
                <div className={`water-fill ${waterAnimating ? 'animate' : ''} ${hasCheckedInToday ? 'filled' : ''}`}></div>
                <div className="water-surface"></div>
                <div className="water-surface-2"></div>
                <div className="water-ripples"></div>
                <div className="water-bubbles"></div>
                <div className="water-bubbles-2"></div>
              </div>
              
              <div className="checkin-content flex flex-col items-center justify-center text-center">
                {hasCheckedInToday ? (
                  <>
                    <CheckCircle2 className="h-16 w-16 text-primary mb-2 animate-scale-up" />
                    <h3 className="text-xl font-bold text-gray-800">Check-in Realizado</h3>
                    <p className="text-sm text-gray-600 mt-1">Volte amanhã para continuar sua jornada</p>
                  </>
                ) : isLoading ? (
                  <>
                    <RefreshCw className="h-16 w-16 text-primary mb-2 animate-rotate-360" />
                    <h3 className="text-xl font-bold text-gray-800">Processando...</h3>
                  </>
                ) : (
                  <>
                    <Leaf className="h-16 w-16 text-primary mb-2 animate-float" />
                    <h3 className="text-xl font-bold text-gray-800">Faça seu Check-in</h3>
                    <p className="text-sm text-gray-600 mt-1">Toque para registrar sua reciclagem de hoje</p>
                  </>
                )}
              </div>
              
              {rippleEffect && (
                <div className="absolute inset-0 rounded-full border-2 border-primary animate-ripple"></div>
              )}
            </div>
          </div>

          {/* Surrounding stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Stats card */}
            <div className="info-card p-6 animate-slide-in-right opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                Suas Conquistas
              </h2>
              <div className="space-y-4">
                {[
                  { 
                    icon: Calendar, 
                    label: "Check-ins Consecutivos", 
                    value: `${streak} dias`,
                    color: "text-blue-500",
                    delay: 0.5
                  },
                  { 
                    icon: Award, 
                    label: "Nível de Sustentabilidade", 
                    value: getSustainabilityLevel(),
                    color: "text-purple-500",
                    delay: 0.7
                  }
                ].map(({ icon: Icon, label, value, color, delay }, index) => (
                  <div 
                    key={index} 
                    className="impact-item animate-fade-in opacity-0" 
                    style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
                  >
                    <div className={`stat-icon p-3 ${color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-600 text-sm">{label}</h4>
                      <p className="text-xl font-bold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Missions */}
            <div className="info-card p-6 animate-slide-in-right opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Missões do Dia
              </h2>
              <div className="space-y-4">
                {dailyMissionPair.map((mission, index) => (
                  <div 
                    key={index}
                    className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in opacity-0"
                    style={{ animationDelay: `${0.7 + index * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-primary bg-opacity-10 rounded-full p-2 mt-1">
                        <Leaf className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{mission.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{mission.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-sm text-gray-500 text-center mt-4">
                  Estas missões são sugestões para inspirar suas ações sustentáveis diárias.
                  Não é obrigatório completá-las!
                </p>
              </div>
            </div>

            {/* Tips section */}
            <div className="tips-card p-6 relative overflow-hidden animate-slide-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-4">Dicas para Reciclagem</h2>
                
                <div className="bg-white bg-opacity-10 backdrop-blur-2xs p-5 rounded-xl border border-white border-opacity-20 animate-fade-in opacity-0" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">Dica em Destaque</h3>
                    <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs text-white">
                      #{tipIndex + 1}
                    </div>
                  </div>
                  <p className="text-white text-opacity-90 mt-2">{tips[tipIndex]}</p>
                  <div className="flex justify-end mt-3">
                    <button 
                      onClick={() => setTipIndex(prev => (prev + 1) % tips.length)}
                      className="flex items-center text-white text-opacity-80 text-sm hover:text-opacity-100 transition-all"
                    >
                      <span>Próxima dica</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-24 h-24 bg-white bg-opacity-5 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Explanation text */}
        <div className="text-center mt-8 mb-12 px-4 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <p className="text-sm text-gray-500">
            Ao fazer check-in, você confirma que separou e destinou corretamente seus resíduos recicláveis hoje,
            contribuindo diretamente para um planeta mais sustentável.
          </p>
        </div>
        
        {/* Footer section */}
        <div className="text-center mt-12 text-sm text-gray-500 animate-fade-in opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
          <p>Conecte-se com a comunidade e acompanhe seu progresso sustentável.</p>
          <p className="mt-1">Juntos por um planeta mais limpo! 🌱</p>
        </div>
      </div>
    </div>
  );
};

export default Index;