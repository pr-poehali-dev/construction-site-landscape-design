import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  const [area, setArea] = useState([100]);
  const [buildingType, setBuildingType] = useState('house');
  const [foundation, setFoundation] = useState('slab');
  const [roofType, setRoofType] = useState('flat');
  const [landscaping, setLandscaping] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Кирпич керамический',
      category: 'brick',
      price: 18,
      unit: 'шт',
      image: 'https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/7cd71345-7c50-4b73-9561-2b37ed49ad8d.jpg',
      description: 'Прочный керамический кирпич для строительства стен'
    },
    {
      id: 2,
      name: 'Цемент М500',
      category: 'cement',
      price: 450,
      unit: 'мешок 50кг',
      image: 'https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/20d757b8-0963-480e-b487-75fa480f13b4.jpg',
      description: 'Портландцемент высшего качества для любых работ'
    },
    {
      id: 3,
      name: 'Утеплитель минеральный',
      category: 'insulation',
      price: 890,
      unit: 'уп (5 м²)',
      image: 'https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/c732dbbe-69b3-4b6c-ab68-584751cd08b9.jpg',
      description: 'Минеральная вата для теплоизоляции стен и кровли'
    },
    {
      id: 4,
      name: 'Металлочерепица',
      category: 'roofing',
      price: 650,
      unit: 'м²',
      image: 'https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/260b2a9f-ffda-4bbc-9d6e-d3d9aebdf7a2.jpg',
      description: 'Кровельное покрытие с полимерным слоем'
    },
    {
      id: 5,
      name: 'Газобетон D500',
      category: 'brick',
      price: 4200,
      unit: 'м³',
      image: 'https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/20d757b8-0963-480e-b487-75fa480f13b4.jpg',
      description: 'Легкие блоки для быстрого строительства'
    },
    {
      id: 6,
      name: 'Песок строительный',
      category: 'cement',
      price: 1500,
      unit: 'тонна',
      image: 'https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/c732dbbe-69b3-4b6c-ab68-584751cd08b9.jpg',
      description: 'Мытый песок для строительных растворов'
    },
    {
      id: 7,
      name: 'Пенопласт ПСБ-С-25',
      category: 'insulation',
      price: 320,
      unit: 'лист',
      image: 'https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/7cd71345-7c50-4b73-9561-2b37ed49ad8d.jpg',
      description: 'Утеплитель для фасадов и фундаментов'
    },
    {
      id: 8,
      name: 'Профнастил С-8',
      category: 'roofing',
      price: 380,
      unit: 'м²',
      image: 'https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/260b2a9f-ffda-4bbc-9d6e-d3d9aebdf7a2.jpg',
      description: 'Профилированный лист для кровли и заборов'
    },
    {
      id: 9,
      name: 'Гипсокартон 12.5мм',
      category: 'other',
      price: 420,
      unit: 'лист',
      image: 'https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/20d757b8-0963-480e-b487-75fa480f13b4.jpg',
      description: 'Стандартный ГКЛ для внутренних работ'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Package' },
    { id: 'brick', name: 'Кирпич и блоки', icon: 'Box' },
    { id: 'cement', name: 'Цемент и смеси', icon: 'Boxes' },
    { id: 'insulation', name: 'Утеплители', icon: 'Shield' },
    { id: 'roofing', name: 'Кровля', icon: 'Home' },
    { id: 'other', name: 'Прочее', icon: 'MoreHorizontal' }
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const calculateCost = () => {
    const basePrice = buildingType === 'house' ? 50000 : buildingType === 'cottage' ? 70000 : 40000;
    const foundationCost = foundation === 'slab' ? 0 : foundation === 'strip' ? 15000 : 25000;
    const roofCost = roofType === 'flat' ? 0 : roofType === 'gable' ? 10000 : 20000;
    const landscapeCost = landscaping ? 30000 : 0;
    
    return (basePrice * area[0] / 100) + foundationCost + roofCost + landscapeCost;
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Building2" size={32} className="text-accent" />
            <span className="text-2xl font-bold text-primary">СтройДом</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-accent transition-colors">Главная</button>
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-accent transition-colors">О компании</button>
            <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-accent transition-colors">Услуги</button>
            <button onClick={() => scrollToSection('materials')} className="text-foreground hover:text-accent transition-colors">Материалы</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-foreground hover:text-accent transition-colors">Портфолио</button>
            <button onClick={() => scrollToSection('calculator')} className="text-foreground hover:text-accent transition-colors">Калькулятор</button>
            <button onClick={() => scrollToSection('reviews')} className="text-foreground hover:text-accent transition-colors">Отзывы</button>
            <button onClick={() => scrollToSection('contacts')} className="text-foreground hover:text-accent transition-colors">Контакты</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {getCartCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-accent text-white">
                      {getCartCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {getCartCount() > 0 ? `Товаров в корзине: ${getCartCount()}` : 'Корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Добавьте товары в корзину</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                        {cart.map(item => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">{item.price} ₽ / {item.unit}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button 
                                      size="icon" 
                                      variant="outline" 
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-12 text-center">{item.quantity}</span>
                                    <Button 
                                      size="icon" 
                                      variant="outline" 
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button 
                                      size="icon" 
                                      variant="ghost" 
                                      className="h-8 w-8 ml-auto"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Итого:</span>
                          <span className="text-accent">{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90" size="lg" onClick={() => { setCartOpen(false); scrollToSection('contacts'); }}>
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Button onClick={() => scrollToSection('contacts')} className="bg-accent hover:bg-accent/90">
              Связаться
            </Button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden bg-white border-t border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('home')} className="text-left text-foreground hover:text-accent transition-colors">Главная</button>
              <button onClick={() => scrollToSection('about')} className="text-left text-foreground hover:text-accent transition-colors">О компании</button>
              <button onClick={() => scrollToSection('services')} className="text-left text-foreground hover:text-accent transition-colors">Услуги</button>
              <button onClick={() => scrollToSection('materials')} className="text-left text-foreground hover:text-accent transition-colors">Материалы</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-left text-foreground hover:text-accent transition-colors">Портфолио</button>
              <button onClick={() => scrollToSection('calculator')} className="text-left text-foreground hover:text-accent transition-colors">Калькулятор</button>
              <button onClick={() => scrollToSection('reviews')} className="text-left text-foreground hover:text-accent transition-colors">Отзывы</button>
              <button onClick={() => scrollToSection('contacts')} className="text-left text-foreground hover:text-accent transition-colors">Контакты</button>
              <Button onClick={() => setCartOpen(true)} variant="outline" className="flex items-center justify-between">
                <span>Корзина</span>
                {getCartCount() > 0 && (
                  <Badge className="ml-2 bg-accent text-white">{getCartCount()}</Badge>
                )}
              </Button>
              <Button onClick={() => scrollToSection('contacts')} className="bg-accent hover:bg-accent/90">
                Связаться с нами
              </Button>
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                Строительство домов под ключ
              </h1>
              <p className="text-lg text-muted-foreground">
                Профессиональное строительство загородных домов и разработка ландшафтного дизайна. 
                Более 15 лет на рынке. Гарантия качества и соблюдение сроков.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToSection('calculator')} size="lg" className="bg-accent hover:bg-accent/90">
                  Рассчитать стоимость
                </Button>
                <Button onClick={() => scrollToSection('portfolio')} size="lg" variant="outline">
                  Наши проекты
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-accent">500+</div>
                  <div className="text-sm text-muted-foreground">Построенных домов</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">15+</div>
                  <div className="text-sm text-muted-foreground">Лет на рынке</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">98%</div>
                  <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/20d757b8-0963-480e-b487-75fa480f13b4.jpg" 
                alt="Современный дом" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">О компании</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              СтройДом — надежный партнер в строительстве вашего дома мечты
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Icon name="Award" size={48} className="text-accent mb-4" />
                <CardTitle>Качество</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Используем только сертифицированные материалы и современные технологии строительства
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="Clock" size={48} className="text-accent mb-4" />
                <CardTitle>Сроки</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Соблюдаем договорные сроки. Строительство дома под ключ от 4 до 8 месяцев
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="Shield" size={48} className="text-accent mb-4" />
                <CardTitle>Гарантия</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Предоставляем гарантию на все виды работ до 5 лет и послегарантийное обслуживание
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Наши услуги</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Полный цикл строительных и ландшафтных работ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Home" size={40} className="text-accent mb-2" />
                <CardTitle>Строительство домов</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Возведение загородных домов и коттеджей под ключ с полной отделкой
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Проектирование</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Фундамент</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Коробка и кровля</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Внутренняя отделка</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Trees" size={40} className="text-accent mb-2" />
                <CardTitle>Ландшафтный дизайн</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Создание уникальных ландшафтных решений для вашего участка
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>3D визуализация</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Озеленение</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Дорожки и площадки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Системы полива</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Hammer" size={40} className="text-accent mb-2" />
                <CardTitle>Реконструкция</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Модернизация и ремонт существующих строений
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Капитальный ремонт</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Перепланировка</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Утепление фасадов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Замена кровли</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="Wrench" size={40} className="text-accent mb-2" />
                <CardTitle>Инженерные системы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Установка и обслуживание инженерных коммуникаций
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Отопление</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Водоснабжение</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Канализация</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Электрика</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="PenTool" size={40} className="text-accent mb-2" />
                <CardTitle>Дизайн интерьера</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Разработка уникального дизайна внутренних помещений
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Концепция интерьера</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Планировки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Подбор материалов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Авторский надзор</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon name="FileText" size={40} className="text-accent mb-2" />
                <CardTitle>Документация</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Оформление всей необходимой документации
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Разрешения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Согласования</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Техплан</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1" />
                    <span>Регистрация</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="materials" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Строительные материалы</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Качественные материалы по выгодным ценам с доставкой
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map(cat => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                className={selectedCategory === cat.id ? 'bg-accent hover:bg-accent/90' : ''}
              >
                <Icon name={cat.icon as any} size={18} className="mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-accent">{product.price.toLocaleString('ru-RU')} ₽</div>
                      <div className="text-sm text-muted-foreground">за {product.unit}</div>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90"
                    onClick={() => {
                      addToCart(product);
                      setCartOpen(true);
                    }}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Товары не найдены</p>
            </div>
          )}
        </div>
      </section>

      <section id="portfolio" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Портфолио</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Примеры наших реализованных проектов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/20d757b8-0963-480e-b487-75fa480f13b4.jpg" 
                alt="Проект 1" 
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle>Загородный дом в Подмосковье</CardTitle>
                <CardDescription>Площадь: 250 м² • Срок: 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Современный двухэтажный дом с панорамными окнами и террасой
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/c732dbbe-69b3-4b6c-ab68-584751cd08b9.jpg" 
                alt="Проект 2" 
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle>Ландшафтный проект</CardTitle>
                <CardDescription>Площадь: 15 соток • Срок: 2 месяца</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Комплексное благоустройство с газоном, цветниками и зоной отдыха
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://cdn.poehali.dev/projects/990b5346-ebc5-4458-b4c3-63f267fb0b2b/files/260b2a9f-ffda-4bbc-9d6e-d3d9aebdf7a2.jpg" 
                alt="Проект 3" 
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle>Коттедж премиум-класса</CardTitle>
                <CardDescription>Площадь: 380 м² • Срок: 8 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Эксклюзивный проект с бассейном, гаражом на 3 машины и сауной
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Калькулятор стоимости</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Рассчитайте предварительную стоимость строительства вашего дома
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Параметры строительства</CardTitle>
              <CardDescription>Заполните данные для расчета стоимости</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Площадь дома: {area[0]} м²</Label>
                <Slider 
                  value={area} 
                  onValueChange={setArea}
                  min={50}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>50 м²</span>
                  <span>500 м²</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Тип строения</Label>
                <Select value={buildingType} onValueChange={setBuildingType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">Дом одноэтажный</SelectItem>
                    <SelectItem value="cottage">Коттедж двухэтажный</SelectItem>
                    <SelectItem value="townhouse">Таунхаус</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Тип фундамента</Label>
                <Select value={foundation} onValueChange={setFoundation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slab">Плитный</SelectItem>
                    <SelectItem value="strip">Ленточный</SelectItem>
                    <SelectItem value="pile">Свайный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Тип кровли</Label>
                <Select value={roofType} onValueChange={setRoofType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Плоская</SelectItem>
                    <SelectItem value="gable">Двускатная</SelectItem>
                    <SelectItem value="complex">Сложная</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="landscaping"
                  checked={landscaping}
                  onChange={(e) => setLandscaping(e.target.checked)}
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded focus:ring-accent"
                />
                <Label htmlFor="landscaping" className="cursor-pointer">
                  Ландшафтный дизайн участка
                </Label>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Предварительная стоимость:</span>
                  <span className="text-3xl font-bold text-accent">
                    {calculateCost().toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  * Итоговая стоимость может отличаться в зависимости от выбранных материалов и сложности проекта
                </p>
                <Button onClick={() => scrollToSection('contacts')} className="w-full bg-accent hover:bg-accent/90" size="lg">
                  Получить точный расчет
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="reviews" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Отзывы клиентов</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Что говорят о нас наши клиенты
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-accent">АС</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Александр Смирнов</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Отличная компания! Построили дом точно в срок, качество работ на высшем уровне. 
                  Особенно порадовало внимание к деталям и профессионализм бригады.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-accent">МП</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Мария Петрова</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Заказывали ландшафтный дизайн участка. Результат превзошел все ожидания! 
                  Дизайнеры учли все наши пожелания и создали настоящий райский уголок.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-accent">ДК</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Дмитрий Козлов</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Рекомендую! Прозрачное ценообразование, никаких скрытых платежей. 
                  Все этапы работ согласовывались, контроль качества на каждом шаге.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Контакты</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами для консультации и расчета стоимости проекта
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Оставьте заявку</CardTitle>
                <CardDescription>Мы свяжемся с вами в течение 30 минут</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input id="name" placeholder="Иван Иванов" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="example@mail.ru" />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90" size="lg">
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Адрес офиса</h3>
                      <p className="text-muted-foreground">г. Москва, ул. Строителей, д. 15, офис 301</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-68</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@stroydom.ru</p>
                      <p className="text-muted-foreground">sales@stroydom.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Режим работы</h3>
                      <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                      <p className="text-muted-foreground">Сб-Вс: 10:00 - 16:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Building2" size={32} />
                <span className="text-2xl font-bold">СтройДом</span>
              </div>
              <p className="text-sm opacity-80">
                Профессиональное строительство домов под ключ с 2009 года
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Строительство домов</li>
                <li>Ландшафтный дизайн</li>
                <li>Реконструкция</li>
                <li>Дизайн интерьера</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>О нас</li>
                <li>Портфолио</li>
                <li>Отзывы</li>
                <li>Контакты</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>+7 (495) 123-45-67</li>
                <li>info@stroydom.ru</li>
                <li>г. Москва, ул. Строителей, 15</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>© 2024 СтройДом. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;