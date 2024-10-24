import Button from "@/components/Button_Home/Button"
import BigLogo from '../../../components/BigLogo/BigLogo'; 
import './style.scss';
export default function login() {
   return (
      <div className="container">
         
         <div className="logo">
            <BigLogo />
         </div>
         <div className="texto-login">
            <h1><span>Faça Login</span> abaixo!</h1>
            <p>Entre na sua conta inserindo os dados abaixo:</p>
         </div>
         <div className="dados">
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password" />
            <Button text= {"Login"}href='/login'/>
         </div>
         <div className="footer">
            <p>Ainda não possui conta?</p>
            <button>Registre-se</button>
         </div>
         <div className="motivacional">
            <p>"Você precisa conquistar aquilo que o dinheiro não compra. Caso contrário, será um miserável, ainda que seja um milionário." <br />Augusto Cury</p>
         </div>
      </div>

   )
}
