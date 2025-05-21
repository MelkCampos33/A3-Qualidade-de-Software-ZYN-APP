import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './art.css';

// Estado que armazena os dados do formulário de registro
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    peso: '',
    altura: '',
    gordura_corporal: '',
    faz_exercicio: '',
    meta_perda_peso: ''
  });

  // atualiza o estado do formulário sempre que um campo for alterado
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  // é executada ao submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Trim e verificações básicas
    if (!form.nome || !form.email || !form.senha || !form.peso || !form.altura) {
      alert('Preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    // Validação de senha
    const senhaFraca = ['123456', 'senha', 'admin', 'abcdef'];
    if (form.senha.length < 6 || senhaFraca.includes(form.senha.toLowerCase())) {
      alert('Escolha uma senha mais segura (mínimo 6 caracteres, evite senhas fracas).');
      setLoading(false);
      return;
    }

    // Bloquear caracteres invalidos
    const invalido = /[<>"';]/;
    if (invalido.test(form.nome) || invalido.test(form.email)) {
      alert('Caracteres inválidos detectados em nome ou email.');
      setLoading(false);
      return;
    }

    // Validar números positivos
    const valoresNumericos = ['peso', 'altura', 'gordura_corporal', 'meta_perda_peso'];
    for (const campo of valoresNumericos) {
      const valor = parseFloat(form[campo]);
      if (isNaN(valor) || valor <= 0) {
        alert(`O campo "${campo.replace('_', ' ')}" deve conter um número positivo.`);
        setLoading(false);
        return;
      }
    }

    // Verificar conexão
    if (!navigator.onLine) {
      alert('Você está offline. Verifique sua conexão com a internet.');
      setLoading(false);
      return;
    }


    try {
      const res = await fetch('/api/users/resgiter-full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome.trim(),
          email: form.email.trim(),
          senha: form.senha,
          peso: parseFloat(form.peso),
          altura: parseFloat(form.altura),
          gordura_corporal: form.gordura_corporal ? parseFloat(form.gordura_corporal) : null,
          faz_exercicio: form.faz_exercicio,
          meta_perda_peso: form.meta_perda_peso ? parseFloat(form.meta_perda_peso) : null
        })
      });

      const data = await res.json();

     
      if (resposta.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/');

      } else {
        alert(dados.erro || 'Erro ao cadastrar usuário. Tente novamente.');
      }

    } catch (err) {
      alert('Erro ao conectar com a API. Verifique se o servidor está rodando.');
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-register">
      <form onSubmit={handleSubmit}>
        <div className="welcome-register">
          <h1 className="title">Cadastro</h1>
          <p>Preencha os campos abaixo para criar sua conta</p>
        </div>

        <input
          placeholder="Nome de usuário"
          name="nome"
          type="text"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <input
          placeholder="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="password-wrapper">
          <input
            placeholder="Senha"
            name="senha"
            type={showPassword ? 'text' : 'password'}
            value={form.senha}
            onChange={handleChange}
            required
          />
          <button
            className="show-password"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'esconder' : 'mostrar'}
          </button>
        </div>

        <input
          placeholder="Peso (kg)"
          name="peso"
          type="number"
          step="0.1"
          value={form.peso}
          onChange={handleChange}
          required
        />

        <input
          placeholder="Altura (m)"
          name="altura"
          type="number"
          step="0.01"
          value={form.altura}
          onChange={handleChange}
          required
        />

        <input
          placeholder="Gordura corporal (%)"
          name="gordura_corporal"
          type="number"
          step="0.1"
          value={form.gordura_corporal}
          onChange={handleChange}
          required
        />

        <select
          name="faz_exercicio"
          value={form.faz_exercicio}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Você tem o hábito de realizar exercícios?</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>

        <input
          placeholder="Meta de peso a perder (kg)"
          name="meta_perda_peso"
          type="number"
          step="0.1"
          min="0"
          value={form.meta_perda_peso}
          onChange={handleChange}
          required
        />

        <div className="button-group">
          <button type='submit' disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          <button type='button' onClick={() => navigate('/')}> Voltar </button>
        </div>
      </form>
    </div>
  );
}

export default Register;