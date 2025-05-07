import { useState } from 'react';
import './art.css';

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container-register">
      <form>
        <div className="welcome-register">
          <h1 className="title">Cadastro</h1>
          <p>Preencha os campos abaixo para criar sua conta</p>
        </div>
        
        <input placeholder="Nome de usuário" name="username" type="text" />
        <input placeholder="Email" name="email" type="email" />

        <div className="password-wrapper">
          <input
            placeholder="Senha"
            name="password"
            type={showPassword ? 'text' : 'password'}
          />
          <button
            className="show-password"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'esconder' : 'mostrar'}
          </button>
        </div>

        <input placeholder="Peso (kg)" name="peso" type="number" step="0.1" />
        <input placeholder="Altura (cm)" name="altura" type="number" step="1" />
        <input
          placeholder="Gordura corporal (%)"
          name="gordura"
          type="number"
          step="0.1"
        />

        <select name="habito" defaultValue="">
          <option value="" disabled>Você tem o hábito de realizar exercícios?</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>

        <input
          placeholder="Meta de peso a perder (kg)"
          name="meta"
          type="number"
          step="0.1"
        />

        <div className="button-group">
          <button type="submit">Registrar</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
