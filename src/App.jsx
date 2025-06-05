import React, { useState, useEffect } from 'react';
import {
  Home, Package, Users, ShoppingCart, BarChart3, Settings,
  Bell, User, AlertTriangle, TrendingUp, Clock, Eye, Edit, Trash2,
  Plus, Filter, Download, Search, CheckCircle, XCircle, Star,
  Timer, AlertCircle, FileText, Calendar
} from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date()); // Maintained, though not used in JSX yet

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data
  const stockData = [
    { id: 1, name: 'Leite Integral', quantity: 15, expiry: '2025-06-02', criticality: 'high', location: 'Geladeira 1' },
    { id: 2, name: 'Pão Francês', quantity: 50, expiry: '2025-05-30', criticality: 'critical', location: 'Padaria' },
    { id: 3, name: 'Tomate', quantity: 30, expiry: '2025-06-05', criticality: 'medium', location: 'Hortifrúti' },
    { id: 4, name: 'Frango', quantity: 8, expiry: '2025-06-01', criticality: 'high', location: 'Freezer 1' },
  ];
  const suppliers = [
    { id: 1, name: 'Laticínios São João', score: 95, grade: 'A', returns: 2, quality: 4.8 },
    { id: 2, name: 'Padaria Central', score: 78, grade: 'B', returns: 5, quality: 4.2 },
    { id: 3, name: 'Hortifrúti Verde', score: 62, grade: 'C', returns: 8, quality: 3.8 },
    { id: 4, name: 'Frigorífico Bom Gosto', score: 88, grade: 'A', returns: 3, quality: 4.6 },
  ];
  const purchases = [
    { id: 1, product: 'Arroz 5kg', quantity: 20, supplier: 'Grãos & Cia', status: 'pendente', seasonal: false },
    { id: 2, product: 'Manga', quantity: 15, supplier: 'Hortifrúti Verde', status: 'aprovada', seasonal: true },
    { id: 3, product: 'Carne Bovina', quantity: 12, supplier: 'Frigorífico Bom Gosto', status: 'pendente', seasonal: false },
  ];
  const buffetItems = [
    { id: 1, name: 'Lasanha de Carne', timeElapsed: 45, maxTime: 120, status: 'good' },
    { id: 2, name: 'Salada Caesar', timeElapsed: 95, maxTime: 120, status: 'warning' },
    { id: 3, name: 'Frango Grelhado', timeElapsed: 130, maxTime: 120, status: 'critical' },
    { id: 4, name: 'Risotto de Camarão', timeElapsed: 30, maxTime: 120, status: 'good' },
  ];

  const Sidebar = () => (
    <div className="w-64 bg-slate-900 text-white p-4 h-screen fixed left-0 top-0 z-10">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Stock Management</h1>
      </div>
      <nav className="space-y-2">
        {[
          { id: 'dashboard', icon: Home, label: 'Dashboard' },
          { id: 'inventory', icon: Package, label: 'Estoque' },
          { id: 'suppliers', icon: Users, label: 'Fornecedores' },
          { id: 'purchasing', icon: ShoppingCart, label: 'Compras' },
          { id: 'buffet', icon: Timer, label: 'Buffet/Exposição' },
          { id: 'reports', icon: BarChart3, label: 'Relatórios' },
          { id: 'settings', icon: Settings, label: 'Configurações' },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === id ? 'bg-blue-600' : 'hover:bg-slate-800'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const Header = () => (
    // Removed ml-64 from here as the parent div will handle the margin
    <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {activeSection === 'dashboard' && 'Dashboard Principal'}
          {activeSection === 'inventory' && 'Gestão de Estoque'}
          {activeSection === 'suppliers' && 'Avaliação de Fornecedores'}
          {activeSection === 'purchasing' && 'Compras'}
          {activeSection === 'buffet' && 'Buffet/Exposição'}
          {activeSection === 'reports' && 'Relatórios e Previsões'}
          {activeSection === 'settings' && 'Configurações'}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:text-gray-800">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center space-x-2">
          <User size={20} className="text-gray-600" />
          <span className="text-gray-700">Admin User</span>
        </div>
      </div>
    </div>
  );

  const SummaryCard = ({ title, value, icon: Icon, color, alert = false }) => (
    <div className={`p-6 rounded-lg shadow-md ${color} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="relative">
          <Icon size={32} />
          {alert && (
            <AlertTriangle size={16} className="absolute -top-1 -right-1 text-yellow-300" />
          )}
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Produtos próximos do vencimento"
          value="12"
          icon={AlertTriangle}
          color="bg-red-500"
          alert={true}
        />
        <SummaryCard
          title="Itens em excesso"
          value="8"
          icon={Package}
          color="bg-orange-500"
        />
        <SummaryCard
          title="Avaliação média fornecedores"
          value="4.2"
          icon={Star}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Demanda prevista (semana)"
          value="R$ 15.8k"
          icon={TrendingUp}
          color="bg-green-500"
        />
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Variação de Estoque</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
              <span className="text-gray-500">Gráfico de Linha - Demanda vs Estoque</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Classificação de Fornecedores</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-4"></div>
              <span className="text-gray-500">Gráfico de Pizza - A:40% B:30% C:20% D:10%</span>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Últimas Movimentações</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Data</th>
                <th className="text-left py-2">Produto</th>
                <th className="text-left py-2">Ação</th>
                <th className="text-left py-2">Quantidade</th>
                <th className="text-left py-2">Usuário</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">29/05 14:30</td>
                <td className="py-2">Leite Integral</td>
                <td className="py-2"><span className="text-green-600">Entrada</span></td>
                <td className="py-2">+20</td>
                <td className="py-2">João Silva</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">29/05 12:15</td>
                <td className="py-2">Pão Francês</td>
                <td className="py-2"><span className="text-red-600">Saída</span></td>
                <td className="py-2">-15</td>
                <td className="py-2">Maria Santos</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const InventoryView = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4">
          <select className="px-3 py-2 border rounded-lg">
            <option>Todas as categorias</option>
            <option>Laticínios</option>
            <option>Padaria</option>
            <option>Hortifrúti</option>
          </select>
          <input type="date" className="px-3 py-2 border rounded-lg" />
          <select className="px-3 py-2 border rounded-lg">
            <option>Todos os fornecedores</option>
            <option>Laticínios São João</option>
            <option>Padaria Central</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus size={16} />
            <span>Adicionar Produto</span>
          </button>
        </div>
      </div>
      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Nome do Produto</th>
              <th className="text-left p-4">Quantidade</th>
              <th className="text-left p-4">Data de Validade</th>
              <th className="text-left p-4">Criticidade</th>
              <th className="text-left p-4">Localização</th>
              <th className="text-left p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">{new Date(item.expiry).toLocaleDateString('pt-BR')}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.criticality === 'critical' ? 'bg-red-100 text-red-800' :
                    item.criticality === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.criticality === 'critical' ? 'Crítico' :
                     item.criticality === 'high' ? 'Alto' : 'Médio'}
                  </span>
                </td>
                <td className="p-4">{item.location}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={16} />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SuppliersView = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4">
          <select className="px-3 py-2 border rounded-lg">
            <option>Todas as pontuações</option>
            <option>90-100</option>
            <option>80-89</option>
            <option>70-79</option>
          </select>
          <select className="px-3 py-2 border rounded-lg">
            <option>Todos os produtos</option>
            <option>Laticínios</option>
            <option>Carnes</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus size={16} />
            <span>Novo Fornecedor</span>
          </button>
        </div>
      </div>
      {/* Suppliers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Nome do Fornecedor</th>
              <th className="text-left p-4">Pontuação</th>
              <th className="text-left p-4">Classificação</th>
              <th className="text-left p-4">Nº Devoluções</th>
              <th className="text-left p-4">Qualidade Média</th>
              <th className="text-left p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{supplier.name}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                         className="bg-blue-500 h-2 rounded-full"
                         style={{ width: `${supplier.score}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{supplier.score}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    supplier.grade === 'A' ? 'bg-green-100 text-green-800' :
                    supplier.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {supplier.grade}
                  </span>
                </td>
                <td className="p-4">{supplier.returns}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 mr-1" />
                    <span>{supplier.quality}</span>
                  </div>
                </td>
                <td className="p-4">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                    Adicionar Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const PurchasingView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lista de Compras</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus size={16} />
          <span>Nova Solicitação</span>
        </button>
      </div>
      <div className="grid gap-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-lg">{purchase.product}</h4>
                <p className="text-gray-600">Quantidade: {purchase.quantity}</p>
                <p className="text-gray-600">Fornecedor: {purchase.supplier}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    purchase.status === 'aprovada' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {purchase.status}
                  </span>
                  {purchase.seasonal && (
                    <span className="flex items-center text-orange-600 text-sm">
                      <AlertTriangle size={14} className="mr-1" />
                      Fora de temporada
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye size={16} />
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <CheckCircle size={16} />
                </button>
              </div>
            </div>
            {purchase.seasonal && (
              <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  Sugestão: Substituir por produto da estação
                </p>
                <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm mt-2">
                  Aceitar Sugestão
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const BuffetView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Pratos em Exposição</h3>
            <div className="grid gap-4">
        {buffetItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-medium text-lg">{item.name}</h4>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-sm">
                      {Math.floor(item.timeElapsed / 60)}h {item.timeElapsed % 60}m expostos
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'good' ? 'bg-green-100 text-green-800' :
                    item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status === 'good' ? 'Bom' :
                     item.status === 'warning' ? 'Atenção' : 'Crítico'}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                     className={`h-2 rounded-full ${
                      item.status === 'good' ? 'bg-green-500' :
                      item.status === 'warning' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((item.timeElapsed / item.maxTime) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Remover do Buffet
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Log de Ações */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold mb-4">Log de Ações</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center py-2 border-b">
            <span>29/05 15:30 - Lasanha de Carne removida por João Silva</span>
            <span className="text-gray-500">Motivo: Tempo limite</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span>29/05 14:45 - Frango Grelhado adicionado por Maria Santos</span>
            <span className="text-green-600">Novo prato</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ReportsView = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4">
          <input type="date" className="px-3 py-2 border rounded-lg" />
          <select className="px-3 py-2 border rounded-lg">
            <option>Todos os setores</option>
            <option>Cozinha</option>
            <option>Buffet</option>
          </select>
          <select className="px-3 py-2 border rounded-lg">
            <option>Todos os produtos</option>
            <option>Perecíveis</option>
            <option>Não perecíveis</option>
          </select>
          <div className="flex space-x-2">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Download size={16} />
              <span>PDF</span>
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Download size={16} />
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold mb-4">Evolução do Estoque</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-gray-400 mx-auto mb-2" />
              <span className="text-gray-500">Gráfico de Barras - Estoque por Categoria</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold mb-4">Previsão de Demanda (ML)</h4>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp size={48} className="text-gray-400 mx-auto mb-2" />
              <span className="text-gray-500">Linha de Tendência - Próximos 30 dias</span>
            </div>
          </div>
        </div>
      </div>
      {/* Data Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold mb-4">Dados Detalhados</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Produto</th>
                <th className="text-left py-2">Data</th>
                <th className="text-left py-2">Movimentação</th>
                <th className="text-left py-2">Valor</th>
                <th className="text-left py-2">Observações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Leite Integral</td>
                <td className="py-2">29/05/2025</td>
                <td className="py-2">Entrada</td>
                <td className="py-2">R$ 240,00</td>
                <td className="py-2">Compra programada</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Pão Francês</td>
                <td className="py-2">29/05/2025</td>
                <td className="py-2">Saída</td>
                <td className="py-2">R$ 45,00</td>
                <td className="py-2">Consumo buffet</td> {/* Corrected text here */}
              </tr>
              <tr className="border-b">
                <td className="py-2">Tomate</td>
                <td className="py-2">30/05/2025</td>
                <td className="py-2">Ajuste</td>
                <td className="py-2">- R$ 5,00</td>
                <td className="py-2">Perda por validade</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Configurações do Sistema</h3>
      <p className="text-gray-600 mb-6">Ajuste as preferências e configurações do sistema.</p>

      <div className="space-y-8">
        {/* Perfil do Usuário */}
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-3">Perfil do Usuário</h4>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
              <input type="text" name="username" id="username" defaultValue="Admin User" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" defaultValue="admin@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800">Alterar Senha</button>
          </div>
        </div>

        {/* Notificações */}
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-3">Notificações</h4>
          <div className="space-y-3">
            <label htmlFor="email-notifications" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="email-notifications" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </div>
              <div className="ml-3 text-sm text-gray-700">
                Notificações por Email
              </div>
            </label>
            <label htmlFor="inapp-notifications" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="inapp-notifications" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </div>
              <div className="ml-3 text-sm text-gray-700">
                Notificações no Aplicativo
              </div>
            </label>
          </div>
        </div>

        {/* Preferências da Interface */}
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-3">Preferências da Interface</h4>
          <div className="space-y-4">
            <div>
              <label htmlFor="theme-select" className="block text-sm font-medium text-gray-700">Tema</label>
              <select id="theme-select" name="theme-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>Claro</option>
                <option>Escuro (em breve)</option>
                <option>Sistema</option>
              </select>
            </div>
            <div>
              <label htmlFor="language-select" className="block text-sm font-medium text-gray-700">Idioma</label>
              <select id="language-select" name="language-select" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>Português (Brasil)</option>
                <option>English (US)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-gray-200">
        <div className="flex justify-end">
          <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancelar
          </button>
          <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      {/* Main content area: Header + Page Content */}
      <div className="flex-1 flex flex-col ml-64"> {/* ml-64 offsets the fixed sidebar width */}
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-gray-100">
          {activeSection === 'dashboard' && <DashboardView />}
          {activeSection === 'inventory' && <InventoryView />}
          {activeSection === 'suppliers' && <SuppliersView />}
          {activeSection === 'purchasing' && <PurchasingView />}
          {activeSection === 'buffet' && <BuffetView />}
          {activeSection === 'reports' && <ReportsView />}
          {activeSection === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

export default App;
