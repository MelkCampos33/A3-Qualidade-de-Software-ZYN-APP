import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './art.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='container'>
      <form>

       <div className='welcome'>
        <h1 className='title'> Acesse sua conta </h1>
        <p> Olá! Seja bem vindo de volta </p>
       </div>

        <input placeholder='email' email='email' type='text' />

        <div className="password-wrapper">
          <input
            placeholder='Senha'
            name='password'
            type={showPassword ? 'text' : 'password'}
          />
          <button
            className="show-passoword"
            type='button'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'esconder' : 'mostrar'}
          </button>
        </div>

        <div className="button-group">
          <button type='button' onClick={() => navigate('/Home')}>Entrar</button>
          <button type='button' onClick={() => navigate('/Register')}>Cadastrar</button>
        </div>

          <div className="social-login">
          <p className="social-text">Ou acesse usando</p>

          <div className="social-icons">
            <button className="social-btn apple" aria-label="Entrar com Apple">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
            </button>

            <button className="social-btn facebook" aria-label="Entrar com Facebook">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
            </button>
          </div>
        </div>
      </form>
    </div>
    
  );
}

export default Login;
