"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Info, ShoppingCart, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Produtos para o jogo de consumo consciente
const products = [
  {
    id: 1,
    name: "Camiseta de Algodão Orgânico",
    price: 89.9,
    image: "👕",
    sustainability: 9,
    badges: ["Orgânico", "Comércio Justo"],
    description: "Produzida com algodão orgânico certificado, sem uso de pesticidas e com práticas de comércio justo.",
  },
  {
    id: 2,
    name: "Camiseta Comum",
    price: 39.9,
    image: "👕",
    sustainability: 3,
    badges: [],
    description: "Camiseta comum de algodão convencional, produzida com métodos tradicionais.",
  },
  {
    id: 3,
    name: "Sabão em Pó Biodegradável",
    price: 28.9,
    image: "🧼",
    sustainability: 8,
    badges: ["Biodegradável", "Sem Fosfatos"],
    description: "Sabão em pó biodegradável, sem fosfatos e com embalagem reciclável.",
  },
  {
    id: 4,
    name: "Sabão em Pó Comum",
    price: 18.9,
    image: "🧼",
    sustainability: 2,
    badges: [],
    description: "Sabão em pó convencional com componentes químicos que podem prejudicar o meio ambiente.",
  },
  {
    id: 5,
    name: "Garrafa Reutilizável",
    price: 59.9,
    image: "🍶",
    sustainability: 10,
    badges: ["Reutilizável", "Livre de BPA"],
    description: "Garrafa de aço inoxidável, durável e reutilizável, livre de BPA e outros componentes tóxicos.",
  },
  {
    id: 6,
    name: "Garrafa de Água Descartável",
    price: 2.5,
    image: "🍶",
    sustainability: 1,
    badges: [],
    description: "Garrafa de plástico descartável que contribui para a poluição por plásticos.",
  },
  {
    id: 7,
    name: "Frutas Orgânicas Locais",
    price: 15.9,
    image: "🍎",
    sustainability: 9,
    badges: ["Orgânico", "Local"],
    description: "Frutas cultivadas organicamente por produtores locais, reduzindo a pegada de carbono do transporte.",
  },
  {
    id: 8,
    name: "Frutas Importadas",
    price: 25.9,
    image: "🍎",
    sustainability: 4,
    badges: ["Importado"],
    description: "Frutas importadas de outros países, com maior pegada de carbono devido ao transporte.",
  },
  {
    id: 9,
    name: "Lâmpada LED",
    price: 12.9,
    image: "💡",
    sustainability: 8,
    badges: ["Econômica", "Durável"],
    description: "Lâmpada LED de baixo consumo energético e longa duração, reduzindo o desperdício.",
  },
  {
    id: 10,
    name: "Lâmpada Incandescente",
    price: 3.9,
    image: "💡",
    sustainability: 2,
    badges: [],
    description: "Lâmpada incandescente tradicional com alto consumo de energia e vida útil curta.",
  },
  {
    id: 11,
    name: "Detergente Concentrado",
    price: 15.9,
    image: "🧴",
    sustainability: 7,
    badges: ["Concentrado", "Menos Embalagem"],
    description: "Detergente concentrado que usa menos água e menos embalagem por lavagem.",
  },
  {
    id: 12,
    name: "Detergente Comum",
    price: 8.9,
    image: "🧴",
    sustainability: 3,
    badges: [],
    description: "Detergente comum com mais água em sua composição e mais embalagem por uso.",
  },
]

// Categorias de produtos
const categories = [
  { id: 1, name: "Vestuário", icon: "👕" },
  { id: 2, name: "Limpeza", icon: "🧼" },
  { id: 3, name: "Utensílios", icon: "🍶" },
  { id: 4, name: "Alimentos", icon: "🍎" },
  { id: 5, name: "Iluminação", icon: "💡" },
]

export default function Lesson7() {
  const [cart, setCart] = useState<number[]>([])
  const [budget, setBudget] = useState(200)
  const [remainingBudget, setRemainingBudget] = useState(200)
  const [sustainabilityScore, setSustainabilityScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  // Calcular orçamento restante e pontuação de sustentabilidade
  useEffect(() => {
    const totalCost = cart.reduce((total, productId) => {
      const product = products.find((p) => p.id === productId)
      return total + (product?.price || 0)
    }, 0)

    setRemainingBudget(budget - totalCost)

    const sustainabilityTotal = cart.reduce((total, productId) => {
      const product = products.find((p) => p.id === productId)
      return total + (product?.sustainability || 0)
    }, 0)

    // Média de sustentabilidade (0-10)
    const avgSustainability = cart.length > 0 ? sustainabilityTotal / cart.length : 0
    setSustainabilityScore(avgSustainability)

    // Verificar se a lição foi completada
    if (cart.length >= 5 && avgSustainability >= 7 && !isCompleted) {
      setIsCompleted(true)
      localStorage.setItem("lesson7Completed", "true")

      // Calcular pontuação final
      const finalScore = Math.round(avgSustainability * 10)
      setScore(finalScore)

      toast({
        title: "Parabéns!",
        description: "Você completou suas compras de forma consciente e sustentável!",
        variant: "default",
      })
    }
  }, [cart, budget, isCompleted])

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId)

    if (!product) return

    // Verificar se há orçamento suficiente
    if (product.price > remainingBudget) {
      toast({
        title: "Orçamento insuficiente!",
        description: "Você não tem orçamento suficiente para este produto.",
        variant: "destructive",
      })
      return
    }

    setCart([...cart, productId])

    // Feedback baseado na sustentabilidade do produto
    if (product.sustainability >= 7) {
      toast({
        title: "Ótima escolha!",
        description: "Este é um produto com alta sustentabilidade.",
        variant: "default",
      })
    } else if (product.sustainability >= 4) {
      toast({
        title: "Escolha moderada",
        description: "Este produto tem sustentabilidade média.",
        variant: "default",
      })
    } else {
      toast({
        title: "Escolha pouco sustentável",
        description: "Existem alternativas mais sustentáveis para este produto.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromCart = (productId: number) => {
    setCart(cart.filter((id) => id !== productId))
  }

  const handleReset = () => {
    setCart([])
    setRemainingBudget(budget)
    setSustainabilityScore(0)
    setIsCompleted(false)
    setScore(0)
  }

  const getFilteredProducts = () => {
    if (selectedCategory === null) {
      return products
    }

    const categoryIcon = categories.find((c) => c.id === selectedCategory)?.icon
    return products.filter((product) => product.image === categoryIcon)
  }

  const getSustainabilityColor = (value: number) => {
    if (value >= 8) return "text-green-600"
    if (value >= 6) return "text-green-500"
    if (value >= 4) return "text-yellow-500"
    if (value >= 2) return "text-orange-500"
    return "text-red-500"
  }

  const getSustainabilityStars = (value: number) => {
    const fullStars = Math.floor(value / 2)
    const halfStar = value % 2 >= 1
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {halfStar && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <Toaster />
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            <h1 className="text-xl font-bold">EcoAprendiz</h1>
          </div>
          <div className="flex items-center gap-2">
            <span>Pontos: {score}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-700">Lição 7: Consumo Consciente</h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowInfo(!showInfo)}
                aria-label="Informações sobre consumo consciente"
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>

            {showInfo && (
              <div className="bg-green-50 p-4 rounded-lg mb-4 text-green-800">
                <h3 className="font-semibold mb-2">Sobre Consumo Consciente</h3>
                <p className="mb-2">
                  Consumo consciente significa fazer escolhas de compra considerando o impacto ambiental, social e
                  econômico dos produtos. Isso inclui avaliar a origem dos materiais, o processo de produção, a
                  durabilidade e o descarte.
                </p>
                <p>
                  Nesta atividade, você aprenderá a fazer escolhas de consumo mais sustentáveis, comparando produtos
                  similares com diferentes impactos ambientais.
                </p>
              </div>
            )}

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Orçamento Restante</span>
                <span className="text-sm font-medium">
                  R$ {remainingBudget.toFixed(2)} de R$ {budget.toFixed(2)}
                </span>
              </div>
              <Progress value={(remainingBudget / budget) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div>
                  <h3 className="font-semibold mb-3 text-green-700">Escolha produtos sustentáveis</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Todos
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="flex items-center gap-1"
                      >
                        <span role="img" aria-hidden="true">
                          {category.icon}
                        </span>
                        {category.name}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getFilteredProducts().map((product) => (
                      <div
                        key={product.id}
                        className={`p-3 rounded-lg border-2 ${
                          selectedProduct === product.id
                            ? "border-green-400 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl" role="img" aria-hidden="true">
                            {product.image}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <div className="text-sm text-gray-600">R$ {product.price.toFixed(2)}</div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs">Sustentabilidade:</span>
                                {getSustainabilityStars(product.sustainability)}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {product.badges.map((badge, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product.id)}
                            disabled={product.price > remainingBudget || cart.includes(product.id)}
                          >
                            {cart.includes(product.id) ? "No Carrinho" : "Adicionar"}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                          >
                            Detalhes
                          </Button>
                        </div>

                        {selectedProduct === product.id && (
                          <div className="mt-3 p-2 bg-gray-50 rounded text-sm">{product.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-green-700">Seu Carrinho</h3>
                    <span className="text-sm">{cart.length} itens</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <ShoppingCart className="h-10 w-10 mx-auto mb-2 opacity-30" />
                      <p>Seu carrinho está vazio</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {cart.map((productId) => {
                        const product = products.find((p) => p.id === productId)
                        if (!product) return null

                        return (
                          <div
                            key={productId}
                            className="flex items-center justify-between p-2 bg-white rounded border border-gray-200"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xl" role="img" aria-hidden="true">
                                {product.image}
                              </span>
                              <div>
                                <div className="text-sm font-medium">{product.name}</div>
                                <div className="text-xs text-gray-600">R$ {product.price.toFixed(2)}</div>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleRemoveFromCart(productId)}
                              className="h-7 w-7"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-green-200">
                    <div className="flex justify-between mb-1">
                      <span>Subtotal:</span>
                      <span>R$ {(budget - remainingBudget).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Sustentabilidade:</span>
                      <span className={getSustainabilityColor(sustainabilityScore)}>
                        {sustainabilityScore.toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-green-700">Impacto das suas escolhas</h3>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm mb-1 flex justify-between">
                        <span>Pegada de Carbono</span>
                        <span>{Math.max(0, 10 - sustainabilityScore).toFixed(1)} kg CO₂</span>
                      </div>
                      <Progress
                        value={Math.max(0, 100 - sustainabilityScore * 10)}
                        className="h-2"
                        indicatorClassName="bg-red-500"
                      />
                    </div>

                    <div>
                      <div className="text-sm mb-1 flex justify-between">
                        <span>Economia de Água</span>
                        <span>{(sustainabilityScore * 50).toFixed(0)} litros</span>
                      </div>
                      <Progress value={sustainabilityScore * 10} className="h-2" indicatorClassName="bg-blue-500" />
                    </div>

                    <div>
                      <div className="text-sm mb-1 flex justify-between">
                        <span>Redução de Resíduos</span>
                        <span>{(sustainabilityScore * 0.3).toFixed(1)} kg</span>
                      </div>
                      <Progress value={sustainabilityScore * 10} className="h-2" indicatorClassName="bg-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isCompleted && (
              <div className="mt-8 p-4 bg-green-100 rounded-lg border border-green-300 text-center">
                <h3 className="text-xl font-bold text-green-700 mb-2">Parabéns! Você completou a Lição 7</h3>
                <p className="mb-4">Você aprendeu a fazer escolhas de consumo mais conscientes e sustentáveis.</p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={handleReset}>
                    Tentar Novamente
                  </Button>
                  <Link href="/licoes/8">
                    <Button className="bg-green-600 hover:bg-green-700">Avançar para Lição 8</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">Dicas de Acessibilidade</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Use Tab para navegar entre os produtos e Enter para selecionar.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Todos os produtos têm descrições detalhadas acessíveis por leitores de tela.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>As informações de sustentabilidade são fornecidas tanto visualmente quanto em texto.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

